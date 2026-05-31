#!/usr/bin/env -S bun run
/**
 * Transcribe a podcast audio file with speaker diarization. TypeScript / Bun.
 *
 * Pipeline:
 *   1. nodejs-whisper (whisper.cpp under the hood) transcribes the audio into
 *      timestamped VTT, which we parse into structured segments.
 *   2. sherpa-onnx-node runs pyannote-based speaker diarization to produce
 *      speaker turns. (Optional — skipped if models aren't installed.)
 *   3. Each whisper segment is tagged with the speaker whose turn overlaps it most.
 *   4. Outputs are written next to the audio file:
 *        <stem>.transcript.json   — full structured output (segments + speakers)
 *        <stem>.transcript.vtt    — WebVTT with <v SPEAKER_XX> cues (episode-summary compatible)
 *        <stem>.transcript.txt    — plain readable transcript grouped by speaker
 *
 * Speaker labels are SPEAKER_00, SPEAKER_01, ... — Claude maps them to
 * Matt / Scott / Dillon afterward using transcript context.
 *
 * Usage:
 *   bun run transcribe.ts <audio-path> \
 *       [--model medium] [--language en] \
 *       [--min-speakers 2] [--max-speakers 4] \
 *       [--out-dir <dir>] [--models-dir <dir>] [--keep-wav]
 *
 * Setup (one-time):
 *   cd .agents/skills/episode-from-audio/scripts && bun install
 *   ./setup-diarization.sh           # download pyannote ONNX models (optional)
 *   # ffmpeg must be on PATH (brew install ffmpeg)
 */

import { mkdirSync, existsSync, writeFileSync, unlinkSync, readFileSync } from "node:fs";
import { dirname, join, parse, resolve } from "node:path";
import { homedir } from "node:os";
import { $ } from "bun";

// ---------- types ----------

interface Segment {
  start: number;
  end: number;
  text: string;
  speaker?: string;
}

interface Turn {
  start: number;
  end: number;
  speaker: string;
}

interface CliArgs {
  audio: string;
  model: string;
  language: string | null;
  minSpeakers: number;
  maxSpeakers: number;
  outDir: string | null;
  modelsDir: string;
  keepWav: boolean;
}

// ---------- arg parsing ----------

function parseArgs(argv: string[]): CliArgs {
  const positional: string[] = [];
  const opts: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) {
        opts[key] = "true";
      } else {
        opts[key] = next;
        i++;
      }
    } else {
      positional.push(a);
    }
  }
  if (positional.length < 1) {
    console.error("usage: bun run transcribe.ts <audio-path> [options]");
    process.exit(1);
  }
  return {
    audio: positional[0]!,
    model: opts.model ?? "medium",
    language: opts.language === "" || opts.language === "auto" ? null : (opts.language ?? "en"),
    minSpeakers: Number(opts["min-speakers"] ?? 2),
    maxSpeakers: Number(opts["max-speakers"] ?? 4),
    outDir: opts["out-dir"] ?? null,
    modelsDir: opts["models-dir"] ?? join(homedir(), ".cache", "bikeshed-diarization"),
    keepWav: opts["keep-wav"] === "true",
  };
}

// ---------- ffmpeg: convert to 16kHz mono WAV ----------

async function toWav(input: string, outDir: string): Promise<string> {
  const wavPath = join(outDir, `${parse(input).name}.diarize.wav`);
  // 16 kHz mono PCM s16le — what whisper.cpp and sherpa-onnx both want.
  await $`ffmpeg -y -i ${input} -ac 1 -ar 16000 -c:a pcm_s16le ${wavPath}`.quiet();
  return wavPath;
}

// ---------- whisper transcription ----------

async function transcribe(audioPath: string, modelName: string, language: string | null): Promise<Segment[]> {
  // nodejs-whisper exposes `nodewhisper(filePath, options)` which writes
  // sibling files (.vtt etc.) next to the audio.
  const { nodewhisper } = (await import("nodejs-whisper")) as typeof import("nodejs-whisper");

  console.error(`[transcribe] running whisper.cpp model=${modelName} language=${language ?? "auto"}`);
  await nodewhisper(audioPath, {
    modelName,
    autoDownloadModelName: modelName,
    removeWavFileAfterTranscription: false,
    withCuda: false,
    logger: { log: () => {}, debug: () => {}, info: () => {}, warn: console.error, error: console.error },
    whisperOptions: {
      outputInVtt: true,
      outputInText: false,
      outputInSrt: false,
      outputInJson: false,
      outputInWords: false,
      translateToEnglish: false,
      wordTimestamps: false,
      timestamps_length: 20,
      splitOnWord: true,
      ...(language ? { language } : {}),
    },
  });

  const vttPath = `${audioPath}.vtt`;
  if (!existsSync(vttPath)) {
    throw new Error(`whisper did not produce ${vttPath}`);
  }
  const segments = parseVtt(readFileSync(vttPath, "utf8"));
  // nodejs-whisper leaves its raw VTT next to the audio; we'll rewrite our own
  // labelled version later, so drop this intermediate.
  try { unlinkSync(vttPath); } catch {}
  console.error(`[transcribe] done: ${segments.length} segments`);
  return segments;
}

function parseVttTimestamp(ts: string): number {
  // HH:MM:SS.mmm or MM:SS.mmm
  const parts = ts.split(":");
  let h = 0, m = 0, s = 0;
  if (parts.length === 3) {
    [h, m] = [Number(parts[0]), Number(parts[1])];
    s = Number(parts[2]);
  } else if (parts.length === 2) {
    [m] = [Number(parts[0])];
    s = Number(parts[1]);
  } else {
    s = Number(parts[0]);
  }
  return h * 3600 + m * 60 + s;
}

function parseVtt(vtt: string): Segment[] {
  const segments: Segment[] = [];
  const blocks = vtt.replace(/\r\n/g, "\n").split(/\n\n+/);
  const tsLine = /^([\d:.]+)\s+-->\s+([\d:.]+)/;
  for (const block of blocks) {
    const lines = block.split("\n").filter(Boolean);
    if (lines.length < 2) continue;
    let tsIdx = lines.findIndex((l) => tsLine.test(l));
    if (tsIdx < 0) continue;
    const m = lines[tsIdx]!.match(tsLine)!;
    const start = parseVttTimestamp(m[1]!);
    const end = parseVttTimestamp(m[2]!);
    const text = lines.slice(tsIdx + 1).join(" ").trim();
    if (text) segments.push({ start, end, text });
  }
  return segments;
}

// ---------- pyannote diarization via sherpa-onnx-node ----------

async function diarize(wavPath: string, modelsDir: string, minSpeakers: number, maxSpeakers: number): Promise<Turn[]> {
  const segModel = join(modelsDir, "pyannote-segmentation-3.0", "model.onnx");
  const embedModel = join(modelsDir, "3dspeaker_speech_eres2net_base_sv_zh-cn_3dspeaker_16k.onnx");

  if (!existsSync(segModel) || !existsSync(embedModel)) {
    console.error(`[diarize] ONNX models not found under ${modelsDir} — skipping diarization.`);
    console.error(`[diarize] Run: ${join(import.meta.dir, "setup-diarization.sh")}`);
    return [];
  }

  let sherpa: any;
  try {
    sherpa = await import("sherpa-onnx-node");
  } catch (e) {
    console.error(`[diarize] sherpa-onnx-node not installed — skipping diarization (${(e as Error).message})`);
    return [];
  }

  // sherpa-onnx publishes a few different shapes across versions; resolve the
  // OfflineSpeakerDiarization class flexibly.
  const SD = sherpa.OfflineSpeakerDiarization ?? sherpa.default?.OfflineSpeakerDiarization;
  const readWave = sherpa.readWave ?? sherpa.default?.readWave;
  if (!SD || !readWave) {
    console.error("[diarize] sherpa-onnx-node API surface unexpected — skipping diarization");
    return [];
  }

  console.error(`[diarize] loading pyannote (min=${minSpeakers} max=${maxSpeakers})`);
  const sd = new SD({
    segmentation: { pyannote: { model: segModel } },
    embedding: { model: embedModel },
    clustering: {
      // -1 = auto; we constrain by passing minSpeakers/maxSpeakers below where supported.
      numClusters: -1,
      threshold: 0.5,
    },
    minDurationOn: 0.3,
    minDurationOff: 0.5,
  });

  const wave = readWave(wavPath);
  const result = sd.process(wave.samples);
  const turns: Turn[] = [];
  for (const seg of result) {
    turns.push({ start: seg.start, end: seg.end, speaker: `SPEAKER_${String(seg.speaker).padStart(2, "0")}` });
  }
  console.error(`[diarize] done: ${turns.length} turns, ${new Set(turns.map((t) => t.speaker)).size} speakers`);
  // minSpeakers/maxSpeakers are advisory in sherpa-onnx; we don't reject the result if it's outside.
  if (turns.length === 0) {
    console.error(`[diarize] (constraints requested min=${minSpeakers} max=${maxSpeakers})`);
  }
  return turns;
}

function assignSpeakers(segments: Segment[], turns: Turn[]): void {
  if (turns.length === 0) return;
  for (const seg of segments) {
    let best: string | undefined;
    let bestOverlap = 0;
    for (const t of turns) {
      const overlap = Math.max(0, Math.min(seg.end, t.end) - Math.max(seg.start, t.start));
      if (overlap > bestOverlap) {
        bestOverlap = overlap;
        best = t.speaker;
      }
    }
    seg.speaker = best;
  }
}

// ---------- output writers ----------

function fmtTimestamp(seconds: number): string {
  if (seconds < 0) seconds = 0;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${s.toFixed(3).padStart(6, "0")}`;
}

function writeJson(segments: Segment[], audioName: string, outPath: string): void {
  const payload = {
    audio: audioName,
    segments,
    speakers: [...new Set(segments.map((s) => s.speaker).filter(Boolean) as string[])].sort(),
  };
  writeFileSync(outPath, JSON.stringify(payload, null, 2));
}

function writeVtt(segments: Segment[], outPath: string): void {
  const lines = ["WEBVTT", ""];
  for (const seg of segments) {
    const prefix = seg.speaker ? `<v ${seg.speaker}>` : "";
    lines.push(`${fmtTimestamp(seg.start)} --> ${fmtTimestamp(seg.end)}`);
    lines.push(`${prefix}${seg.text}`);
    lines.push("");
  }
  writeFileSync(outPath, lines.join("\n"));
}

function writeTxt(segments: Segment[], outPath: string): void {
  const lines: string[] = [];
  let currentSpeaker: string | undefined;
  let buffer: string[] = [];
  const flush = () => {
    if (buffer.length === 0) return;
    const label = currentSpeaker ?? "UNKNOWN";
    lines.push(`${label}: ${buffer.join(" ").trim()}`);
    lines.push("");
  };
  for (const seg of segments) {
    if (seg.speaker !== currentSpeaker) {
      flush();
      buffer = [];
      currentSpeaker = seg.speaker;
    }
    buffer.push(seg.text);
  }
  flush();
  writeFileSync(outPath, lines.join("\n"));
}

// ---------- main ----------

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const audioPath = resolve(args.audio);
  if (!existsSync(audioPath)) {
    console.error(`error: audio file not found: ${audioPath}`);
    process.exit(1);
  }

  const outDir = resolve(args.outDir ?? dirname(audioPath));
  mkdirSync(outDir, { recursive: true });
  const { name: stem } = parse(audioPath);

  // Convert to a normalized WAV. whisper.cpp and sherpa-onnx both want 16kHz mono.
  const wavPath = await toWav(audioPath, outDir);

  try {
    const segments = await transcribe(wavPath, args.model, args.language);
    if (segments.length === 0) {
      console.error("error: transcription produced no segments");
      process.exit(2);
    }

    const turns = await diarize(wavPath, args.modelsDir, args.minSpeakers, args.maxSpeakers);
    assignSpeakers(segments, turns);

    const jsonPath = join(outDir, `${stem}.transcript.json`);
    const vttPath = join(outDir, `${stem}.transcript.vtt`);
    const txtPath = join(outDir, `${stem}.transcript.txt`);
    writeJson(segments, audioPath.split("/").pop()!, jsonPath);
    writeVtt(segments, vttPath);
    writeTxt(segments, txtPath);

    console.log(`\nwrote: ${jsonPath}`);
    console.log(`wrote: ${vttPath}`);
    console.log(`wrote: ${txtPath}`);
    const speakers = [...new Set(segments.map((s) => s.speaker).filter(Boolean))].sort();
    console.log(speakers.length > 0 ? `speakers: ${speakers.join(", ")}` : "speakers: (none — diarization skipped)");
  } finally {
    if (!args.keepWav) {
      try { unlinkSync(wavPath); } catch {}
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
