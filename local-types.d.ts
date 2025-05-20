declare module "*.mdx" {
  import type { RawFrontmatter } from "./src/types";
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
  export const frontmatter: RawFrontmatter;
}

declare module "#episode-metadata" {
  import type { EpisodeMetadata } from "./src/types";
  let episodeMetadata: Array<EpisodeMetadata>;
  export default episodeMetadata;
}

// Hydrated content with raw html
declare module "#rss-feed-data" {
  import type { EpisodeMetadata } from "./src/types";
  let rssFeedData: Array<EpisodeMetadata>;
  export default rssFeedData;
}
