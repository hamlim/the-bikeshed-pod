# The Bikeshed Podcast Website!

This website is built using:
- [Garbanzo](https://github.com/hamlim/garbanzo)
- [Waku](https://waku.gg)
- [Orama](https://docs.orama.com/open-source) (powers the search feature)

## Development:

From the root of the repo, run:

- `bun install`
- `bun run dev`

## Adding new Episodes:

Run `bun ./scripts/new-episode.ts "episode-id"` to create a new episode mdx and page.tsx file

Episode ID's should follow the format of `${number}`

Then fill out the frontmatter in the `mdx` file

## How does ....

### Search Work?

In a `predev` and `prebuild` script, we build up an [Orama](https://docs.orama.com/open-source) index based on the frontmatter within each `episode-${id}.mdx` file.

At runtime/request time:

When a visitor loads the `/search` route, if they have a `query` query param, we load the `search-index.json` file, hydrate a new orama index, and then perform a search on it.

Relavant files:

- [Search page](./src/pages/search/index.tsx)