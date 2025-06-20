import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
let id = process.argv[2];

if (!id) {
  console.warn(`⚠️ Please make sure to provide the id of the new episode!`);
  process.exit(1);
}

let title = process.argv[3];

if (!title) {
  console.warn(`⚠️ Please make sure to provide the title of the new episode!`);
  process.exit(1);
}
// @todo: make this more robust
let titleSlug = title.toLowerCase().replace(/ /g, "-");

let folderPath = `./src/pages/episodes/${id}/${titleSlug}`;
let mdxFilePath = `${folderPath}/episode-${id}.mdx`;
let pageFilePath = `${folderPath}/index.tsx`;

if (existsSync(folderPath)) {
  console.warn(`⚠️ Episode ${id} already exists!`);
  process.exit(1);
}

await mkdir(folderPath, { recursive: true });

await Promise.all([
  writeFile(
    mdxFilePath,
    `---
episodeId: "${id}"
slug: "${titleSlug}"
title: "${title}"
shortDescription: "TODO"
hosts: []
metadata: []
publishTime: ${Date.now()}
duration: 123
audioURL: "TODO"
captionURL: "TODO"
fileSizeBytes: 123
blueskyPostUri: ""
---

Long description here...
`,
  ),
  writeFile(
    pageFilePath,
    `import { EpisodeContainer } from "#components/episode-container";
import Content, { frontmatter as rawMetadata } from "./episode-${id}.mdx";

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
`,
  ),
]);

console.log(`✅ Episode ${id} created successfully!`);
