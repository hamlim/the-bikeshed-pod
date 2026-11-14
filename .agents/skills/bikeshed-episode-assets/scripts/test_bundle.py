"""Run with: python3 -B -m unittest discover -s <this directory> -p 'test_*.py'."""

import json
import subprocess
import sys
import tempfile
import unittest
import wave
from pathlib import Path

SCRIPT = Path(__file__).with_name("bundle.py")


class BundleTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name).resolve()
        subprocess.run(["git", "init", "--quiet", str(self.root)], check=True)
        (self.root / ".gitignore").write_text("/.episode-assets/\n")
        self.source = self.root / "edited audio.wav"
        with wave.open(str(self.source), "wb") as audio:
            audio.setnchannels(1)
            audio.setsampwidth(2)
            audio.setframerate(16000)
            audio.writeframes(b"\0\0" * 16000 * 8)
        self.folder = self.root / ".episode-assets/37"

    def command(self, *args, success=True):
        result = subprocess.run(
            [sys.executable, str(SCRIPT), "--root", str(self.root), *map(str, args)],
            capture_output=True,
            text=True,
            check=False,
        )
        if success:
            self.assertEqual(result.returncode, 0, result.stderr)
            return json.loads(result.stdout)
        self.assertNotEqual(result.returncode, 0)
        return result.stderr

    def stage(self):
        return self.command("stage", 37, self.source)

    def transcript(self):
        path = self.folder / "work/transcript.json"
        path.parent.mkdir()
        path.write_text(
            json.dumps(
                {
                    "segments": [
                        {
                            "start": 0.3,
                            "end": 3.4,
                            "text": "A & B <tools>",
                            "speaker": "SPEAKER_00",
                        },
                        {
                            "start": 4,
                            "end": 7.5,
                            "text": "Second voice.",
                            "speaker": "SPEAKER_01",
                        },
                    ]
                }
            )
        )
        return path

    def test_stage_converts_audio_and_preserves_source(self):
        original = self.source.read_bytes()
        result = self.stage()
        self.assertEqual(self.source.read_bytes(), original)
        self.assertGreater(result["fileSizeBytes"], 0)
        self.assertGreaterEqual(result["duration"], 8)
        self.assertEqual(
            result["fileSizeBytes"], (self.folder / "audio.mp3").stat().st_size
        )
        other = self.command("stage", 38, self.folder / "audio.mp3")
        self.assertEqual(
            Path(other["audio"]).read_bytes(), (self.folder / "audio.mp3").read_bytes()
        )
        self.command("stage", 37, self.source, success=False)

    def test_review_clips_have_audio_and_matching_quotes(self):
        self.stage()
        review = self.command("review", 37, self.transcript())
        self.assertEqual(len(review), 2)
        self.assertEqual(review[0]["text"], "A & B <tools>")
        for entry in review:
            duration = float(
                subprocess.check_output(
                    [
                        "ffprobe",
                        "-v",
                        "error",
                        "-show_entries",
                        "format=duration",
                        "-of",
                        "default=noprint_wrappers=1:nokey=1",
                        entry["clip"],
                    ],
                    text=True,
                )
            )
            self.assertAlmostEqual(duration, entry["end"] - entry["start"], delta=0.15)

    def test_captions_require_complete_names_and_escape_text(self):
        self.stage()
        transcript = self.transcript()
        mapping = self.folder / "speakers.json"
        mapping.write_text(json.dumps({"SPEAKER_00": "Scott"}))
        self.command("captions", 37, transcript, mapping, success=False)
        self.assertFalse((self.folder / "captions.vtt").exists())
        mapping.write_text(json.dumps({"SPEAKER_00": "Scott", "SPEAKER_01": "Dillon"}))
        self.command("captions", 37, transcript, mapping)
        captions = (self.folder / "captions.vtt").read_text()
        self.assertTrue(captions.startswith("WEBVTT\n\n"))
        self.assertIn(
            "00:00:00.300 --> 00:00:03.400\n<v Scott>A &amp; B &lt;tools&gt;", captions
        )
        self.assertIn("<v Dillon>Second voice.", captions)
        self.assertNotIn("SPEAKER_", captions)
        self.command("captions", 37, transcript, mapping, success=False)
        self.assertEqual((self.folder / "captions.vtt").read_text(), captions)

    def test_missing_speakers_and_out_of_range_times_fail(self):
        self.stage()
        transcript = self.transcript()
        data = json.loads(transcript.read_text())
        del data["segments"][0]["speaker"]
        transcript.write_text(json.dumps(data))
        self.command("review", 37, transcript, success=False)
        data["segments"][0]["speaker"] = "SPEAKER_00"
        data["segments"][1]["end"] = 100
        transcript.write_text(json.dumps(data))
        self.command("review", 37, transcript, success=False)

    def delivery(self):
        self.stage()
        mapping = self.folder / "speakers.json"
        mapping.write_text(json.dumps({"SPEAKER_00": "Scott", "SPEAKER_01": "Dillon"}))
        self.command("captions", 37, self.transcript(), mapping)
        episodes = self.root / "Dropbox/the-bikeshed-pod/episodes"
        episodes.mkdir(parents=True)
        return episodes

    def test_copy_checks_bytes_preserves_sources_and_refuses_existing_folder(self):
        episodes = self.delivery()
        originals = {name: (self.folder / name).read_bytes()
                     for name in ("audio.mp3", "captions.vtt")}
        args = ["copy-media", 37, "--dropbox-episodes", episodes, "--review-confirmed"]
        preview = self.command(*args, "--dry-run")
        destination = Path(preview["destination"])
        self.assertFalse(destination.exists())
        self.assertFalse(preview["localCopy"])
        result = self.command(*args)
        self.assertTrue(result["localCopy"])
        self.assertEqual(result["dropboxSync"], "not verified")
        for name, content in originals.items():
            self.assertEqual((self.folder / name).read_bytes(), content)
            self.assertEqual((destination / name).read_bytes(), content)
        self.assertEqual(sorted(p.name for p in destination.iterdir()), sorted(originals))
        (destination / "captions.vtt").write_text("existing file")
        self.command(*args, success=False)
        self.assertEqual((destination / "captions.vtt").read_text(), "existing file")

    def test_copy_rejects_missing_review_wrong_root_and_invalid_captions(self):
        episodes = self.delivery()
        args = ["copy-media", 37, "--dropbox-episodes", episodes]
        self.command(*args, success=False)
        self.command("copy-media", 37, "--dropbox-episodes", self.root,
                     "--review-confirmed", success=False)
        (self.folder / "captions.vtt").write_text("not captions")
        self.command(*args, "--review-confirmed", success=False)
        self.assertEqual(list(episodes.iterdir()), [])

    def test_copy_uses_eastern_date_and_rejects_link_destination(self):
        import bundle
        from datetime import datetime, timezone
        from unittest.mock import patch
        from argparse import Namespace

        episodes = self.delivery()
        args = Namespace(dropbox_episodes=episodes, episode=37,
                         review_confirmed=True, dry_run=True)
        for instant, expected in (("2026-11-14T02:00:00", "2026-11-13"),
                                  ("2026-07-02T03:00:00", "2026-07-01")):
            with patch.object(bundle, "datetime") as clock:
                clock.now.side_effect = lambda zone: datetime.fromisoformat(
                    instant).replace(tzinfo=timezone.utc).astimezone(zone)
                result = bundle.copy_media(args, self.folder)
                destination = Path(result["destination"])
                self.assertEqual(destination.parent.name,
                                 "the-bikeshed-podcast-ep-" + expected)
                destination.parent.symlink_to(self.root, target_is_directory=True)
                with self.assertRaises(ValueError):
                    bundle.copy_media(args, self.folder)
                destination.parent.unlink()

    def test_unignored_media_is_rejected_before_writing(self):
        (self.root / ".gitignore").write_text("")
        self.command("stage", 37, self.source, success=False)
        self.assertFalse(self.folder.exists())


if __name__ == "__main__":
    unittest.main()
