# Bikeshed Pod API

The API for the Bikeshed Pod.

## Routes

### `GET /api/episode/audio/:episodeId`

Public route to respond with the mp3 audio for the specified episode

- `:episodeId` should map to the episode name within the `episodes/` dir

### `GET /api/episode/metadata/:episodeId`

Public route to respond with the metadata (see [metadata](#metadata) for more details on the shape)

- `:episodeId` should map to the episode name within the `episodes/` dir

### `PUT /api/episode/metadata/:episodeId`

Public route to add/update metadata for the specified episode (see [metadata](#metadata) for more details on the shape)

- `:episodeId` should map to the episode name within the `episodes/` dir

### `GET /api/episodes/list`

Public route to list all current episodes

## Bucket

We're using an R2 bucket from cloudflare for hosting the episode metadata and the audio files as well.

The rough structure is:

```sh
episodes/
  {episodeID}/
    audio.mp3
    metadata.json
    transcription.srt # @TODO: will this be an srt file?
```

### Metadata:

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

