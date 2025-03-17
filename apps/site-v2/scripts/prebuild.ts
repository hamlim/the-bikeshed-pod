import fs from "node:fs/promises";
import glob from "fast-glob";
import matter from "gray-matter";
import { hosts } from "../src/hosts";
import type { EpisodeMetadata, Host } from "../src/types";

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

let episodeMetadata: Array<EpisodeMetadata> = [];

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
}

console.log("Writing episode metadata...");
await fs.writeFile(
  "./src/episode-metadata.json",
  JSON.stringify(episodeMetadata),
);
