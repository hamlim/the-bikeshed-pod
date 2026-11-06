#!/usr/bin/env python3
"""Prepare local episode media and export confirmed WebVTT captions."""

import argparse
import html
import json
import math
import shutil
import subprocess
from pathlib import Path


def run(*args):
    return subprocess.check_output(args, text=True).strip()


def probe(audio):
    info = json.loads(
        run(
            "ffprobe",
            "-v",
            "error",
            "-show_format",
            "-show_streams",
            "-of",
            "json",
            str(audio),
        )
    )
    streams = [
        s
        for s in info["streams"]
        if s["codec_type"] == "audio" and s.get("codec_name") != "unknown"
    ]
    duration = float(info["format"]["duration"])
    if not streams or not math.isfinite(duration) or duration <= 0:
        raise ValueError("The file must contain audio with a positive duration.")
    return streams[0]["codec_name"], duration


def read_segments(path, duration):
    segments = json.loads(path.read_text())["segments"]
    if not segments:
        raise ValueError("The transcript has no segments.")
    previous = -1
    for segment in segments:
        start, end = segment["start"], segment["end"]
        if not all(
            isinstance(t, (int, float)) and math.isfinite(t) for t in (start, end)
        ):
            raise ValueError("Segment timestamps must be finite numbers in seconds.")
        if not 0 <= start < end <= duration + 0.25 or start < previous:
            raise ValueError(
                "Segment times are invalid, out of order, or outside the audio."
            )
        if not isinstance(segment["text"], str) or not segment["text"].strip():
            raise ValueError("Each segment must contain text.")
        if (
            not isinstance(segment.get("speaker"), str)
            or not segment["speaker"].strip()
        ):
            raise ValueError(
                "A segment has no speaker. Complete speaker detection first."
            )
        previous = start
    return segments


def timestamp(seconds):
    milliseconds = round(seconds * 1000)
    hours, remainder = divmod(milliseconds, 3600000)
    minutes, remainder = divmod(remainder, 60000)
    seconds, milliseconds = divmod(remainder, 1000)
    return f"{hours:02}:{minutes:02}:{seconds:02}.{milliseconds:03}"


def write_new(path, content):
    with path.open("x") as output:
        output.write(content)


def stage(args, folder):
    source = args.audio.resolve(strict=True)
    codec, _ = probe(source)
    destination = folder / "audio.mp3"
    if destination.exists():
        raise ValueError("audio.mp3 already exists. Check it before you continue.")
    folder.mkdir(parents=True, exist_ok=True)
    temporary = folder / "audio.partial.mp3"
    if temporary.exists():
        raise ValueError(
            "audio.partial.mp3 already exists. Check the previous conversion."
        )
    if source.suffix.lower() == ".mp3" and codec == "mp3":
        shutil.copy2(source, temporary)
    else:
        subprocess.run(
            [
                "ffmpeg",
                "-v",
                "error",
                "-n",
                "-i",
                str(source),
                "-map",
                "0:a:0",
                "-vn",
                "-c:a",
                "libmp3lame",
                "-q:a",
                "2",
                str(temporary),
            ],
            check=True,
        )
    probe(temporary)
    temporary.rename(destination)
    return {"audio": str(destination), **metadata(destination)}


def metadata(audio):
    codec, duration = probe(audio)
    if codec != "mp3":
        raise ValueError("audio.mp3 must contain MP3 audio.")
    return {
        "duration": math.ceil(duration),
        "durationSeconds": duration,
        "fileSizeBytes": audio.stat().st_size,
    }


def review(args, folder):
    audio = folder / "audio.mp3"
    _, duration = probe(audio)
    segments = read_segments(args.transcript, duration)
    speakers = sorted({s["speaker"] for s in segments})
    clips = folder / "speaker-clips"
    clips.mkdir(exist_ok=True)
    result = []
    for index, speaker in enumerate(speakers):
        choices = [s for s in segments if s["speaker"] == speaker]
        clean = [
            s
            for s in choices
            if 3 <= s["end"] - s["start"] <= 15
            and not any(
                other["speaker"] != speaker
                and other["start"] < s["end"]
                and other["end"] > s["start"]
                for other in segments
            )
        ]
        selected = max(clean or choices, key=lambda s: s["end"] - s["start"])
        clip = clips / f"speaker-{index:02}.mp3"
        subprocess.run(
            [
                "ffmpeg",
                "-v",
                "error",
                "-n",
                "-ss",
                str(selected["start"]),
                "-i",
                str(audio),
                "-t",
                str(selected["end"] - selected["start"]),
                "-vn",
                "-c:a",
                "libmp3lame",
                "-q:a",
                "2",
                str(clip),
            ],
            check=True,
        )
        result.append(
            {
                "speaker": speaker,
                "clip": str(clip),
                "start": selected["start"],
                "end": selected["end"],
                "text": selected["text"],
            }
        )
    report = folder / "speaker-review.json"
    write_new(report, json.dumps(result, indent=2) + "\n")
    return result


def captions(args, folder):
    audio = folder / "audio.mp3"
    _, duration = probe(audio)
    segments = read_segments(args.transcript, duration)
    mapping = json.loads(args.speakers.read_text())
    labels = {s["speaker"] for s in segments}
    if set(mapping) != labels:
        raise ValueError(
            "The speaker map must contain every detected label, and no others."
        )
    for name in mapping.values():
        if (
            not isinstance(name, str)
            or not name.strip()
            or any(c in name for c in "<>\n\r")
        ):
            raise ValueError(
                "Each confirmed name must be nonempty and safe for WebVTT."
            )
        if name.upper().startswith(("SPEAKER_", "UNKNOWN")):
            raise ValueError("Replace unknown labels with confirmed speaker names.")
    lines = ["WEBVTT", ""]
    for segment in segments:
        start, end = timestamp(segment["start"]), timestamp(segment["end"])
        if start == end:
            raise ValueError("A cue has no duration after rounding to milliseconds.")
        text = html.escape(" ".join(segment["text"].split()), quote=False)
        name = html.escape(mapping[segment["speaker"]].strip(), quote=False)
        lines.extend([f"{start} --> {end}", f"<v {name}>{text}", ""])
    path = folder / "captions.vtt"
    write_new(path, "\n".join(lines) + "\n")
    return {"captions": str(path), "cues": len(segments), **metadata(audio)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--root", type=Path, default=Path(__file__).resolve().parents[4]
    )
    subcommands = parser.add_subparsers(dest="command", required=True)
    for name in ("stage", "review", "captions"):
        command = subcommands.add_parser(name)
        command.add_argument("episode", type=int)
        if name == "stage":
            command.add_argument("audio", type=Path)
        else:
            command.add_argument("transcript", type=Path)
        if name == "captions":
            command.add_argument("speakers", type=Path)
    args = parser.parse_args()
    if args.episode <= 0:
        parser.error("The episode number must be positive.")
    root = args.root.resolve()
    folder = root / ".episode-assets" / str(args.episode)
    for filename in ("audio.mp3", "captions.vtt"):
        result = subprocess.run(
            [
                "git",
                "-C",
                str(root),
                "check-ignore",
                "--quiet",
                "--no-index",
                str(folder / filename),
            ],
            check=False,
        )
        if result.returncode != 0:
            parser.error("Add /.episode-assets/ to the repo .gitignore first.")
    try:
        print(json.dumps(globals()[args.command](args, folder), indent=2))
    except (
        ValueError,
        OSError,
        KeyError,
        TypeError,
        subprocess.CalledProcessError,
    ) as error:
        parser.exit(1, f"Error: {error}\n")


if __name__ == "__main__":
    main()
