import { EpisodeMeta } from "#components/episode-meta";
import Content, { frontmatter as rawMatter } from "./episode-bike-1.mdx";

export default function Page() {
  return (
    <article className="prose lg:prose-xl mx-auto">
      <EpisodeMeta rawMetadata={rawMatter} />
      <Content />
    </article>
  );
}
