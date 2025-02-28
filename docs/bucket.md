# R2 Bucket Info

We host the audio files and the transcriptions all in a Cloudflare R2 bucket.

This bucket is bound in the website under the `the-bikeshed-pod` name ([code here](../apps/site-v2/wrangler.jsonc)).

## Structure:

The general strucutre within the bucket should follow the below conventions:

```
episodes/
  {episodeId}/
    audio.mp3
    transcriptions.srt
```

