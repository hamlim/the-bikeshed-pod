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

    def test_unignored_media_is_rejected_before_writing(self):
        (self.root / ".gitignore").write_text("")
        self.command("stage", 37, self.source, success=False)
        self.assertFalse(self.folder.exists())


if __name__ == "__main__":
    unittest.main()
