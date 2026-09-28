import { EpisodeContainer } from "#components/episode-container";

import Content, { frontmatter as rawMetadata } from "./episode-34.mdx";

export default function Page() {
  return (
    <EpisodeContainer rawMetadata={rawMetadata}>
      <Content />
    </EpisodeContainer>
  );
}

export function getConfig() {
  return {
    render: "dynamic",
  };
}
