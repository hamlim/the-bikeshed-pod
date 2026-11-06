# Audio and speaker review

Run commands from the repo root. Replace `<number>` and `<source-audio>` with the
actual values. Use quoted paths or structured process arguments for user input.

## Prepare MP3 audio

```bash
python3 .agents/skills/bikeshed-episode-assets/scripts/bundle.py stage <number> "<source-audio>"
```

The helper copies a valid MP3 without changing its bytes. For other formats, it
uses ffmpeg to encode MP3 audio. It preserves the source, refuses to replace an
existing output, checks the MP3, and reports its size and duration. If preparation
fails, inspect any `audio.partial.mp3` before removing or reusing it.

## Transcribe and detect speakers

The repo has a local Bun transcription helper at
`.agents/skills/episode-from-audio/scripts/transcribe.ts`. This is an explicit
dependency of this skill. Read that script and its `package.json` before use.
It uses whisper.cpp through `nodejs-whisper` and detects speaker turns through
`sherpa-onnx-node`. Keep this work local unless the user requests a remote service.

Check for Bun, ffmpeg, ffprobe, installed script dependencies, and models first.
Install missing script dependencies with `bun install` in that script directory.
If models are missing, run `bash .agents/skills/episode-from-audio/scripts/setup-diarization.sh`.
The models normally go in `~/.cache/bikeshed-diarization`. The first Whisper run
can download a large model. State this before starting. Do not run setup again
when the dependencies and models are already available.

```bash
bun run .agents/skills/episode-from-audio/scripts/transcribe.ts ".episode-assets/<number>/audio.mp3" \
  --model medium --language en \
  --out-dir ".episode-assets/<number>/work"
```

The outputs are `work/audio.transcript.json`, `work/audio.transcript.vtt`, and
`work/audio.transcript.txt`. All times must use the original MP3 time axis.
The JSON format is:

```json
{
  "segments": [
    {"start": 12.2, "end": 13.42, "text": "Welcome to the Bikeshed Podcast,", "speaker": "SPEAKER_00"}
  ],
  "speakers": ["SPEAKER_00"]
}
```

Known limits of the current helper:

- Missing models or an incompatible speaker API can cause it to skip speaker
  detection and still exit successfully. Check the JSON and stderr. Do not export
  unnamed captions or claim that speaker detection succeeded in that case.
- `--min-speakers` and `--max-speakers` do not enforce the number of speakers in
  the current implementation. Inspect the detected turns; do not force three hosts.
- It assigns each transcript segment to the speaker with the longest time overlap.
  Check mixed speaker segments and split them using the audio before final export.

If the helper fails, inspect the actual error. Fix a local setup issue within the
task scope, or use an available local transcription tool that can export timed,
speaker-labeled segments. Preserve absolute timestamps if processing chunks.
Do not substitute invented text or names. If no working local tool is available,
report the missing dependency and keep the episode work as a draft.

## Ask the user to identify speakers

Generate a review clip for every detected label:

```bash
python3 .agents/skills/bikeshed-episode-assets/scripts/bundle.py review <number> \
  ".episode-assets/<number>/work/audio.transcript.json"
```

The helper writes clips under `speaker-clips/` and a `speaker-review.json` report.
It prefers a 3–15 second cue with no other labeled speaker overlapping it. Listen
or inspect the selection where supported. Choose another span manually if it has
music, more than one voice, or too little speech to identify the person. Put
replacement clips in the same ignored folder. Do not play the full episode merely
to ask for speaker names.

For each label, show the local playable clip link, original timestamp, exact
transcript quote, and any suggested name with its evidence. Example:

```text
SPEAKER_00 — 00:00:32.540–00:00:33.020
Quote: "I'm Scott Kaye."
Suggested name: Scott. The speaker gives his name.
```

Ask one question that covers all labels: “Confirm or correct these speaker names.”
Use the host application question tool if available. Keep each clip and quote
visible beside the question. If the interface cannot play local audio, link the
MP3 clip so the user can open it. Continue reading the transcript and drafting
assets while waiting. Do not finalize named captions until the user replies.
If the user already supplied a complete label-to-name mapping, use it directly.
For an uncertain label, say it is unknown. Context can support a guess; a guess
is not confirmation.

Save the confirmed mapping as `.episode-assets/<number>/speakers.json`:

```json
{"SPEAKER_00": "Scott", "SPEAKER_01": "Matt", "SPEAKER_02": "Dillon"}
```

This is an example only. Use the actual labels, guests, and confirmed names.
Use the same mapping in working JSON and TXT exports if you also provide named
versions of them. Keep the original detection JSON for later corrections.

## Export final captions

```bash
python3 .agents/skills/bikeshed-episode-assets/scripts/bundle.py captions <number> \
  ".episode-assets/<number>/work/audio.transcript.json" \
  ".episode-assets/<number>/speakers.json"
```

The helper rejects missing names, unknown labels, empty segments, invalid times,
and replacement of an existing `captions.vtt`. It escapes caption text and writes
the published `<v Name>` format. The helper cannot check whether the user confirmed
the mapping or whether the words match the audio; those checks remain your task.

For a correction, compare the existing captions first. Preserve or move the old
file within the ignored folder before export. Check that the final cue stays
within the audio duration and that speech near the end is present. Silence or
music at the end does not need a cue.
