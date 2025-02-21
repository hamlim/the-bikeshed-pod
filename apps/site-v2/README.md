# The Bikeshed Podcast Website!

This website is built using:
- [Garbanzo](https://github.com/hamlim/garbanzo)
- [Waku](https://waku.gg)
- [Orama](https://docs.orama.com/open-source) (powers the search feature)

## Development:

From the root of the repo, run:

- `bun install`
- `bun run dev --filter=site-v2...` (trailing `...`'s are required!)

## Adding new Episodes:

Run `bun ./scripts/new-episode.ts "episode-id"` to create a new episode mdx and page.tsx file

Episode ID's should follow the format of `bike-${number}`

Then fill out the frontmatter in the `mdx` file

## How does ....

### Search Work?

In a `predev` and `prebuild` script, we build up an [Orama](https://docs.orama.com/open-source) index based on the frontmatter within each `episode-${id}.mdx` file.

We serialize this index and store it within `./src/app/search/search-index.json`.

At runtime/request time:

When a visitor loads the `/search` route, if they have a `query` query param, we load the `search-index.json` file, hydrate a new orama index, and then perform a search on it.

Relavant files:

- [`build-search-index.ts`](./scripts/build-search-index.ts)
  - Run during `predev` and `prebuild` steps
  - Generates the `search-index.json` file
- [`search-index.json`](./src/app/search/search-index.json)
  - Probably not worth looking at
  - May get too large eventually - not sure how we can account for that
- [Search page](./src/app/search/page.tsx)