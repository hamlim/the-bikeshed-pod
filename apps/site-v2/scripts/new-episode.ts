import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
let id = process.argv[2];

if (!id) {
  console.warn(`⚠️ Please make sure to provide the id of the new episode!`);
  process.exit(1);
}

let folderPath = `./src/app/episodes/${id}`;
let mdxFilePath = `${folderPath}/episode-${id}.mdx`;
let pageFilePath = `${folderPath}/page.tsx`;

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
title: "TODO"
shortDescription: "TODO"
hosts: []
metadata: []
publishTime: ${Date.now()}
duration: TODO
audioURL: "TODO"
---

Long description here...
`,
  ),
  writeFile(
    pageFilePath,
    `import Content, {frontmatter} from "./episode-${id}.mdx";

export default function EpisodePage() {
  return (
    <article>
      
      <Content />
    </article>
  )
}
`,
  ),
]);

console.log(`✅ Episode ${id} created successfully!`);
