# Bikeshed Pod API

The API for the Bikeshed Pod.

## Routes

### `/api/audio/:episodeId`

Public route to respond with the mp3 audio for the specified episode

- `:episodeId` should map to the episode name within the `episodes/` dir, **without** the extension

### `/api/audio/__list`

"Private" route for listing all available episode "keys" (e.g. paths within the bucket).

You **need** to provide a `token` query parameter with the `API_TOKEN` value from your `.env.dev` file.

> [!NOTE]
> If you don't have the `API_TOKEN` yet, reach out to Matt to get it!