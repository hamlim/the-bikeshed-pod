# How to add an episode:

There's a few things involved when releasing new episodes, this doc assumes that you already have a fully produced episode audio file (e.g. `.mp3`) and already generated captions for the episode.

See TODO for generating the audio file and TODO for generation the captions!

Once those are ready, you can do the following:

## Add assets to the bucket

Right now only Matt can do this - I'm (matt) not sure how to make this more flexible for others to do this (it's limited because the domain and bucket in Cloudflare are both under my personal account).

However, what you need to do is:

### 1. Locally

- Create a folder named the same as the episode id
  - e.g. `episode-23/`
- Move the audio file into this new directory
  - The file **must** be named `audio.mp3`
- Move the captions file into this new directory
  - The file **must** be named `captions.vtt`

You should now have something like this locally:

```sh
episode-23/
  audio.mp3
  captions.vtt
```

Now you can go to the next step!

### 2. Bucket

- Load up the Cloudflare dashboard
  - Navigate to R2 Object Storage in the side nav
  - Go to `the-bikeshed-pod` bucket
- Dive into `episodes/` directory
- Drag and drop the above created directory into the page
  - Make sure you're already within the `episodes/` directory when you do this
  - There should be other folders in there for other episodes also!

Done!

## Adding the episode to the site / RSS feed:

This is the final step in releasing the new episode!

- Go to the app in your terminal, e.g. `cd ./apps/site-v2`
- Run `bun ./scripts/new-episode.ts <episode-id>`
  - `<episode-id>` **must** match the directory name that you uploaded into the bucket above!
  - This will generate the new page for the episode within `src/app/epsiodes/<episode-id>/`
- Open the generated `episode-<episode-id>.mdx` file
- Fill in all the fields within the frontmatter
  - Every field is **required**
    - `fileSizeBytes` can be collected by going to the audio.mp3 file on your computer, right clicking and selecting `Get info`, and then seeing the filesize
    - `captionURL` needs to be the fully qualified URL to the asset, usually starting with `https://assets.bikeshedpod.com/episodes/<episode-id>/captions.vtt`
    - `audioURL` needs to be the fully qualified URL to the asset, usually starting with `https://assets.bikeshedpod.com/episodes/<episode-id>/audio.mp3`
    - `duration` should be the runtime of the episode **in seconds**
    - `publishTime` should be already filled in for you, but it's just a fresh `Date.now()`
    - `metadata` is an array of tags, it's used during search / and may in the future be used for filtering episodes down to specific topics
    - `hosts` is an array of host names (e.g. keys within the `hosts.ts` `hosts` object)
    - `shortDescription` is exactly what it sounds like - it **does not** support markdown/html/etc
    - `title` same as above - it's the episode title, no markdown/html/etc
    - `episodeId` is the same as the `<episode-id>` used above
- Run `build` or `dev` to regenerate `episode-metadata.json` - which powers listing the episodes on the site and also the RSS feed
- Check the episode page in local development, make sure everything works as expected

Finally, merge the changes into `main` to kick off a deploy!