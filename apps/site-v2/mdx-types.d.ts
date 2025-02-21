declare module "*.mdx" {
  import type { RawFrontmatter } from "./src/types";
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
  export const frontmatter: RawFrontmatter;
}

// declare module "src/app/episodes/*.mdx" {
//   let MDXComponent: (props: any) => JSX.Element;
//   export default MDXComponent;
//   export const frontmatter: EpisodeMetadata;
// }
