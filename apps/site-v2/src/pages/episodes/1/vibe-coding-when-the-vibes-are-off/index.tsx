import { EpisodeContainer } from "#components/episode-container";
import Content, { frontmatter as rawMetadata } from "./episode-1.mdx";

export default function Page() {
  return (
    <EpisodeContainer rawMetadata={rawMetadata}>
      <Content />
    </EpisodeContainer>
  );
}
