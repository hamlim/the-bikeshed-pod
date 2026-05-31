---
name: episode-from-audio
description: End-to-end pipeline that takes an edited Bikeshed Podcast audio file (mp3/wav/m4a) and produces (1) a timestamped transcript with speaker labels, (2) a recommended title, (3) a short website description, (4) a tweet-length post, and (5) a full-length show-notes summary. Use whenever Matt uploads or points at a podcast audio file (anything under the-bikeshed-pod or named like an episode) and asks for transcription, episode assets, show notes, a title, a tweet, or "everything for the new episode". Supersedes the VTT-only `episode-summary` skill for the audio-first workflow; wraps it for the asset-generation half.
---

# Bikeshed Episode From Audio

Matt co-hosts The Bikeshed Podcast (bikeshedpod.com) with Scott and Dillon. After each recording he hands Claude the edited audio file and wants the full publishing bundle back: the transcript itself, plus the four promotional assets the `episode-summary` skill already knows how to produce.

This skill owns the audio-to-transcript half of the pipeline and then delegates the asset-generation half to `episode-summary`. Do not re-derive the asset format from scratch — read `episode-summary/SKILL.md` (in the same `.agents/skills/` directory, or via the `bikeshed-episode-assets` plugin skill) and follow its rules for title / short summary / tweet / detailed summary.

Five deliverables, in this order in the chat response:

1. **Transcript files written to disk** (paths reported in chat)
2. **Recommended title**
3. **Short summary** (the website description)
4. **Tweet** (ends with `bikeshedpod.com`, under 280 chars)
5. **Detailed summary** (fenced markdown block)

---

## Step 1: Locate the audio file

The audio is usually in one of:

- `/mnt/user-data/uploads/` (when uploaded in chat) — common filenames: `episode.mp3`, `bikeshed-NN.m4a`, anything ending in `.mp3 / .wav / .m4a / .mp4 / .flac / .ogg`
- The `the-bikeshed-pod` workspace folder, often under `public/` or a per-episode subdir

If the filename isn't given, list the most likely directory and pick the obvious audio file. If multiple candidates exist, ask which one.

## Step 2: Run the transcription script

The script lives at `.agents/skills/episode-from-audio/scripts/transcribe.ts`. It's a Bun script that uses `nodejs-whisper` (whisper.cpp under the hood) for transcription and `sherpa-onnx-node` for pyannote-based speaker diarization, then merges them so each segment has a `SPEAKER_XX` label.

### One-time setup (only if missing)

```bash
# JS deps for the transcription script
cd .agents/skills/episode-from-audio/scripts
bun install

# ffmpeg (audio normalization) — once per machine
brew install ffmpeg

# (Optional but recommended) download ONNX models for speaker diarization
./setup-diarization.sh
```

`nodejs-whisper` will auto-download the whisper.cpp model the first time it runs (~1.5 GB for `medium`). The diarization models are fetched from sherpa-onnx's GitHub releases — **no HuggingFace token required**, unlike the Python pyannote path.

If the diarization models aren't present, the script still produces a transcript — it just skips speaker labels. Warn Matt in that case so he can decide whether to run the setup script and re-run, or proceed without speakers.

### Run it

```bash
bun run .agents/skills/episode-from-audio/scripts/transcribe.ts <audio-path> \
    --model medium \
    --min-speakers 2 --max-speakers 4
```

Defaults are sane for a typical 3-host Bikeshed episode. Use `--model large-v3` for higher accuracy at the cost of time, or `--model small` for a faster draft. The script normalizes the input to 16 kHz mono WAV via ffmpeg before transcribing/diarizing.

Outputs are written next to the audio:

- `<stem>.transcript.json` — structured segments + speaker list (use this when programmatically reading)
- `<stem>.transcript.vtt` — WebVTT with `<v SPEAKER_XX>` cues; this is what `episode-summary` expects
- `<stem>.transcript.txt` — human-readable grouped-by-speaker transcript

Report the three paths back to Matt before moving on.

## Step 3: Map SPEAKER_XX labels to real names

Diarization produces opaque labels (`SPEAKER_00`, `SPEAKER_01`, ...). Read enough of the transcript to infer which label belongs to Matt, Scott, and Dillon:

- **Matt** — works at Anthropic, talks about Claude / Cowork / agent infrastructure, lives in NYC area, talks about his kids and Peloton
- **Scott** — frontend / React / Next.js leanings, often grounds the conversation in shipping product
- **Dillon** — infra / runtimes / OSS-governance angles, often the most chronically-online of the three

If two labels look ambiguous, surface your guess and ask Matt to confirm before publishing.

Once mapped, rewrite the `.vtt` and `.txt` files in place, replacing `SPEAKER_00` etc. with `Matt`, `Scott`, `Dillon`. This makes the files useful as published show transcripts too.

## Step 4: Generate the four promotional assets

Switch into `episode-summary` mode. Read `.agents/skills/episode-summary/SKILL.md` if you haven't already this session and follow its rules verbatim for:

- **Recommended title** — `[Memorable hook]: [Plain-English description]`, hook lifted from a phrase the hosts coined or repeated
- **Short summary** — 2-4 sentences, opens with "Matt, Scott, and Dillon...", optionally ends with a "Plus..." standup tease
- **Tweet** — opens with `New episode 🚲`, ends with `bikeshedpod.com`, under 280 chars
- **Detailed summary** — fenced markdown block, `#` title heading, `##` sections for main topic / side topics / Standup, **bold** key terms

When reading the transcript for hook candidates, scan the whole thing — the title-worthy phrase often shows up in the middle or end of the episode.

## Step 5: Reply format

Output the assets inline in chat (no file creation for the assets themselves — only the transcript files were written). Use this exact structure so it copy-pastes into the publishing flow:

````markdown
## Transcript
- JSON: `<path>`
- VTT: `<path>`
- TXT: `<path>`
- Detected speakers: Matt, Scott, Dillon

## Recommended Title
**[Title]**

## Short Summary
[2-4 sentences]

## Tweet
[Tweet copy ending in bikeshedpod.com]

## Detailed Summary

```markdown
# [Title]

[1-2 sentence framing paragraph]

## [Main topic section]
...

## [Side topic section]
...

## Standup / Life Updates
...
```
````

## Voice and editorial notes

Inherit everything from `episode-summary`: substantive on the tech without being dry, summarize the hosts' takes (don't add your own), a little wit is welcome, **bold** the terms that scan. If the title or tweet feels borderline, offer one alternative — don't pile on options unprompted.

## When to NOT use this skill

- Matt uploads a VTT or text transcript directly (no audio) → use `episode-summary` instead, skip the transcription step
- Matt wants only a transcript, no assets → run the script and stop after Step 3
- Matt wants only the assets from an existing transcript → use `episode-summary`
