# Final media delivery

Run from the repo root. Replace `<number>` with the confirmed episode number.
These steps are part of a full episode request. Do not run them for a skill test
or a request for transcription or assets only.

## Copy to Dropbox

Complete speaker and unclear-word review first. Check that `audio.mp3` is the
final edited audio and that `captions.vtt` matches it. Check every cue's timing and
voice name. The helper checks MP3 metadata and the caption header, but it cannot
verify spoken words or user approval.

Find the user's actual Dropbox folder. On Matt's personal Mac, the established
path is `/Users/matt/Library/CloudStorage/Dropbox/the-bikeshed-pod/episodes`.
Check that it is the signed-in Dropbox account and the intended podcast folder.
Do not create a substitute Dropbox root if it is missing. Use an available
Dropbox connector to check account and folder identity if needed. Read its skill
instructions before use.

Preview the exact destination and source SHA-256 hashes without writing files:

```bash
python3 .agents/skills/bikeshed-episode-assets/scripts/bundle.py copy-media <number> \
  --dropbox-episodes "/Users/matt/Library/CloudStorage/Dropbox/the-bikeshed-pod/episodes" \
  --review-confirmed --dry-run
```

Check the number and current Eastern date in the output. Run the same command
without `--dry-run` to copy. The helper needs Python 3.9 or later for time zone
support. It uses the current `America/New_York` date,
creates a new numbered destination, copies both files without moving sources,
and checks SHA-256 hashes and sizes. `--review-confirmed` records your check of
existing user approval; it does not replace the review gate. Do not set it while
review is pending.

An existing destination, including a symbolic link, stops the helper. Compare
both existing files with the final sources. If they are identical, reuse them
and report that check. For different bytes or a partial copy, report the exact
conflict and get a decision before replacement. Do not delete or retry blindly.
A failed copy can leave a partial destination for inspection.

Check Dropbox sync separately for both files. Use a supported Dropbox connector
for remote file size/hash or download comparison when available. Otherwise, get
confirmed Dropbox UI sync status or user confirmation. Dropbox content hashes
are not plain SHA-256 hashes: compare like hash formats or download the remote
files and compare bytes. If no remote or sync check is available, report
“Local copy verified; Dropbox sync not verified.” Keep sources and local media.

## Upload to Cloudflare R2

Read the Cloudflare/wrangler skill before running its commands. Check the
installed version and current command help. Use the repo's installed Wrangler
and existing authorized account. Do not install apps or change accounts without
need. Never read or print token files. If authentication is missing, report the
required connection step through the host's secure authentication flow.

Confirm the account and bucket `the-bikeshed-pod` with read-only tools before
writes. Check both destination keys with remote object reads into new temporary
files. A not-found result must be distinct from an authentication, network, or
permission error. Stop on uncertain results. If objects already exist, compare
bytes and media types. Reuse identical objects with correct media types; get
approval before replacing different bytes or metadata. Do not treat a failed
read as permission to overwrite. Do not run concurrent delivery for one episode.

Wrangler supports the following commands. Confirm flags against current
[Cloudflare R2 command documentation](https://developers.cloudflare.com/workers/wrangler/commands/r2/)
and installed help. Use `--remote` for actual bucket objects:

```bash
bunx --no-install wrangler r2 object put "the-bikeshed-pod/episodes/<number>/audio.mp3" \
  --file ".episode-assets/<number>/audio.mp3" --content-type "audio/mpeg" --remote
bunx --no-install wrangler r2 object put "the-bikeshed-pod/episodes/<number>/captions.vtt" \
  --file ".episode-assets/<number>/captions.vtt" --content-type "text/vtt" --remote
```

Upload only these two files. If one upload fails, report each object's state.
Recheck remote objects before retrying. Do not upload transcripts, clips, speaker
maps, assets notes, or temporary files.

After upload, read each object back to a new temporary directory. Do not replace
local final media with a remote download:

```bash
r2_readback_dir=$(mktemp -d ".episode-assets/<number>/r2-readback.XXXXXX")
bunx --no-install wrangler r2 object get "the-bikeshed-pod/episodes/<number>/audio.mp3" \
  --file "$r2_readback_dir/audio.mp3" --remote
bunx --no-install wrangler r2 object get "the-bikeshed-pod/episodes/<number>/captions.vtt" \
  --file "$r2_readback_dir/captions.vtt" --remote
cmp ".episode-assets/<number>/audio.mp3" "$r2_readback_dir/audio.mp3"
cmp ".episode-assets/<number>/captions.vtt" "$r2_readback_dir/captions.vtt"
```

Check each command result. Record object keys, sizes, local SHA-256 hashes, and
byte comparison results. Use an authorized metadata read to check content types
where supported. Do not use an ETag alone as proof of the file hash; multipart
ETags need not be plain file hashes. If verification fails or is unavailable,
report upload and verification as separate states. Keep downloaded files ignored.

Check public reachability separately at:

- `https://assets.bikeshedpod.com/episodes/<number>/audio.mp3`
- `https://assets.bikeshedpod.com/episodes/<number>/captions.vtt`

Check successful responses and media types. Download and compare bytes if a
cached response could refer to older media. A public URL check does not replace
a remote bucket read, and media availability does not prove page publication.
Continue to `$make-pr` and `$track-pr` in the main skill. Include any delivery
limits in the draft PR and final report. Do not merge or deploy.
