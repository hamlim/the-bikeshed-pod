import fs from "node:fs/promises";
import glob from "fast-glob";
import matter from "gray-matter";
import { transformMarkdown } from "mdxlite";
import { renderToString } from "react-dom/server";
import { Anchor } from "#components/anchor";
import { hosts } from "../src/hosts";
import type { EpisodeMetadata, Host } from "../src/types";

let components = {
  Anchor({ href, children }: { href: string; children: React.ReactNode }) {
    return <a href={href}>{children}</a>;
  },
};
let imports = {
  "#/hosts": {
    hosts,
  },
  "#components/anchor": {
    Anchor: components.Anchor,
  },
};

function hydrateHosts(hostsArray: Array<string>): Array<Host> {
  return hostsArray.map((hostId) => {
    if (!hosts[hostId]) {
      throw new Error(`Host ${hostId} not found`);
    }
    return hosts[hostId];
  });
}

// find all `*.mdx` files within `src/app/episodes/` and collect the frontmatter
// along with the contents
let episodeMDXFiles = await glob("./src/app/episodes/**/*.mdx");

episodeMDXFiles.sort((a, b) => {
  // Lets just split on this path because we know its always a number
  let fileA = Number(a.split("/")[4]);
  let fileB = Number(b.split("/")[4]);

  return fileB - fileA;
});

let episodeMetadata: Array<EpisodeMetadata> = [];
let rssFeedData: Array<EpisodeMetadata> = [];
for (let episode of episodeMDXFiles) {
  let fileContent = await fs.readFile(episode, "utf8");
  // parse the frontmatter
  let { data, content } = matter(fileContent);

  episodeMetadata.push({
    episodeId: data.episodeId,
    title: data.title,
    shortDescription: data.shortDescription,
    hosts: hydrateHosts(data.hosts),
    metadata: data.metadata,
    publishTime: data.publishTime,
    duration: data.duration,
    longDescription: content,
    audioURL: data.audioURL,
    captionURL: data.captionURL,
    slug: data.slug,
    fileSizeBytes: data.fileSizeBytes,
  });

  rssFeedData.push({
    episodeId: data.episodeId,
    title: data.title,
    shortDescription: data.shortDescription,
    hosts: hydrateHosts(data.hosts),
    metadata: data.metadata,
    publishTime: data.publishTime,
    duration: data.duration,
    longDescription: renderToString(
      await transformMarkdown({
        markdown: content,
        imports,
        components,
      }),
    ),
    audioURL: data.audioURL,
    captionURL: data.captionURL,
    slug: data.slug,
    fileSizeBytes: data.fileSizeBytes,
  });
}

console.log("Writing episode metadata...");
await fs.writeFile(
  "./src/episode-metadata.json",
  JSON.stringify(episodeMetadata),
);
await fs.writeFile("./src/rss-feed-data.json", JSON.stringify(rssFeedData));
