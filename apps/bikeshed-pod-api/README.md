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

## Bucket

We're using an R2 bucket from cloudflare for hosting the episode metadata and the audio files as well.

The rough structure is:

```sh
episodes/
  {episodeID}/
    audio.mp3
    metadata.json
```

### Show Metadata:

> [!WARNING]
> This is a WIP schema! There's no runtime validation yet

```json
{
    "episodeId": "some episode id",
    "title": "some title",
    "shortDescription": "Short (< some num of chars) description",
    "hosts": [
        {
            "name": "Host Name",
            "socials": [
                {
                    "network": "bluesky | github | twitter | website",
                    "url": "some url"
                }
            ]
        }
    ],
    "metadata": ["tag-1", "tag-2", "some-other-thing"],
    "publishTime": 12345,
    "duration": 12345,
    "longDescription": "Long form description/show notes - supports MDX",
    "audioURL": "https://bikeshedpod.com/api/audio/{episodeId}"
}
```

