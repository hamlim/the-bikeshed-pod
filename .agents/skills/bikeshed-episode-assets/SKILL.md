---
name: bikeshed-episode-assets
description: Prepare a Bikeshed Podcast episode from an edited audio file, VTT captions, or a transcript. Create named speaker captions, a title, summary, tweet, tags, and show notes. For audio input, prepare ignored local media, use the repo episode generator, and prepare an episode branch. Use for Bikeshed episode assets, transcription, or new episode preparation.
---

# Bikeshed Episode Assets

Use this skill for the complete audio-to-episode workflow. Audio input starts the
full workflow unless the user requests a smaller task. It also accepts existing
captions or a transcript. For existing text input with a request for assets only,
skip media conversion, page creation, and branch creation. For a request for
transcription only, stop after the caption checks.

Use the supplied file path or attachment path. Do not assume an uploads directory.
If more than one file can be the edited episode, ask which file to use.

## 1. Prepare the episode branch and local folder

Read the repo instructions. Check `git status`, the current branch, `package.json`,
`scripts/new-episode.ts`, `src/hosts.ts`, and the latest episode MDX files.

For a new episode, use its supplied number. Otherwise, get the highest numeric
episode directory from `src/pages/episodes/` and add one. Check for an existing
page or local bundle for that number. Reuse work for the same episode. Ask before
replacing files or assigning a number when there is conflicting episode work.

Fetch the default remote branch. From a clean checkout, create `episode-<number>`
from the current remote `main`. Reuse the current branch if it already contains
work for this episode. Preserve required unpublished work and user changes. Do
not reset, stash, or switch away from unrelated changes without resolving which
checkout to use. Do not create a worktree unless requested.

Keep all media and intermediate files in the repo's ignored folder:

```text
.episode-assets/<number>/
  audio.mp3
  captions.vtt
  work/
  speaker-clips/
  speaker-review.json
  speakers.json
  assets.md
```

The two files for R2 are `audio.mp3` and `captions.vtt`. Other files are local
working files. Keep the source audio intact. Confirm `/.episode-assets/` is in
`.gitignore` before creating files. Do not force-add this folder to Git.

## 2. Create and check named captions

For audio input, follow [references/audio.md](references/audio.md). It gives the
local transcription commands, speaker review process, and caption export steps.
Use [scripts/bundle.py](scripts/bundle.py) for MP3 preparation, speaker clips,
and the final `captions.vtt` file. It needs Python 3, Git, ffmpeg, and ffprobe.

For existing VTT input, read the whole file. Preserve its timing and named voice
labels. If labels are unknown, ask for the names with transcript quotes and audio
clips when audio is available. Do not invent timings for a plain text transcript.
Ask for the audio if timed captions are required.

Before export, inspect `captionURL` in recent episode MDX files and fetch at least
two published caption files. Examples checked on 2026-11-06:

- https://assets.bikeshedpod.com/episodes/36/captions.vtt
- https://assets.bikeshedpod.com/episodes/35/captions.vtt

Both use UTF-8 WebVTT, a `WEBVTT` header, blank lines between cues, millisecond
timestamps, and a named voice prefix on every cue:

```text
WEBVTT

00:00:12.200 --> 00:00:13.420
<v Scott>Welcome to the Bikeshed Podcast,
```

Keep the original episode time offset, including an intro with no speech. Use
`Scott`, `Matt`, and `Dillon` only for confirmed speakers. Allow guests and absent
hosts. A detected speaker number is not a person's identity. Never infer identity
from job, topic, pitch, or a fixed speaker order. Use self-introductions, direct
address, and supplied names as evidence for a suggested mapping. Ask the user to
confirm or correct the mapping for every detected speaker before final export.
One person can have more than one detected label.

Check the full transcript for missing speech, false speech during music, mixed
speaker cues, and incorrect technical names. Check excerpts near the start,
middle, end, and speaker changes against the audio. A successful process exit
does not establish transcript accuracy. Fix mixed speaker segments at the actual
speaker change; do not assign a whole mixed segment to its longest speaker.

## 3. Write the episode assets

Read [references/assets.md](references/assets.md). Read the complete transcript.
Write the title, short summary, tweet, tags, and detailed summary in that format.
Keep the short title, Matt last in the short summary, no URL in the tweet, plain
tag lines, and `## Summary` as the first heading of the detailed summary.

Save the assets to `.episode-assets/<number>/assets.md` for a full episode bundle.
For a request for assets only, return them in chat without creating files unless
requested. Count the tweet characters and keep the count below 280. Use transcript
evidence for claims and quotations. Include life updates when present. Do not add
events or speakers that are absent.

## 4. Generate and fill the episode page

Run the existing package script from the repo root:

```bash
bun run new <number> "<title>"
```

Pass the actual title as one quoted argument. The current generator only converts
spaces to hyphens and lowercases the title. If punctuation makes an unsuitable
slug, rename the generated directory and update its `slug` field together. Keep
the display title. The generator refuses only an existing exact title directory;
check all of `src/pages/episodes/<number>/` first to prevent duplicate pages.
It also runs the repo-wide formatter. Inspect its diff for unrelated changes.

Fill `src/pages/episodes/<number>/<slug>/episode-<number>.mdx`:

- Set `title`, plain text `shortDescription`, and `metadata` from the assets.
- Use the confirmed host keys from `src/hosts.ts` for `hosts`. Do not invent keys
  for guests. Ask how to credit a guest if the current schema cannot represent them.
- Set `duration` to the MP3 duration in whole seconds, rounded up, and set
  `fileSizeBytes` to the size of the final `audio.mp3`. Use the bundle helper output.
- Use `https://assets.bikeshedpod.com/episodes/<number>/audio.mp3` and
  `https://assets.bikeshedpod.com/episodes/<number>/captions.vtt` for the media URLs.
- Use the requested release time for `publishTime` in Unix milliseconds. If no
  time was given, keep the generator's current time and state this draft assumption.

Keep `blueskyPostUri` empty unless the user supplies an existing post URI. Replace
the placeholder body with the detailed summary, without its outer code fence.
Escape YAML strings correctly. Check `episodeId`, `slug`, and the generated
`index.tsx` import. Keep the tweet in the local assets file; do not invent a new
frontmatter field for it.

Run `bun run prebuild` to update `src/episode-metadata.json`,
`src/rss-feed-data.json`, and `public/rss.xml`. Run the formatter on changed files,
then `bun run build` and `git diff --check`. Check the new entry in both metadata
files and RSS. Report any failed checks. Do not run deploy scripts.

## 5. Deliver the branch and media

Verify that both media files exist, the MP3 opens, the captions have confirmed
names and valid times, and Git ignores the complete local bundle. Check the diff
for unrelated changes and ensure the branch is the episode branch. Leave the
episode changes on that branch for review. Commit, push, or open a PR only when
the user's request includes that action.

Report the branch, episode page path, absolute paths to both media files, checks,
speaker confirmation state, and any remaining work. Show the five assets using
the asset reference format. Provide a local audio link for each review clip when
speaker confirmation is pending; do not claim that the interface played a clip
unless playback was observed.

The user can copy the numbered folder elsewhere. For R2, upload only the two final
files to bucket `the-bikeshed-pod` at `episodes/<number>/audio.mp3` and
`episodes/<number>/captions.vtt`. Uploads are a separate action unless requested.
Do not upload working transcripts, speaker clips, or assets notes. When an upload
is requested, use the current Cloudflare tool instructions, set `audio/mpeg` and
`text/vtt` content types, and verify the public URLs. A local bundle or a prepared
branch does not mean the episode is published.
