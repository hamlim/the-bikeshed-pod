import fs from "node:fs/promises";
import { create, insert, save } from "@orama/orama";
import glob from "fast-glob";
import matter from "gray-matter";
import { hosts } from "../src/hosts";
import type { EpisodeMetadata, Host } from "../src/types";

let index = create({
  schema: {
    episodeId: "string",
    title: "string",
    shortDescription: "string",
    // unfortunately orama doesn't support an array of objects
    // so we'll stringify the Host type and search on the whole string
    hosts: "string[]",
    metadata: "string[]",
    publishTime: "number",
    duration: "number",
    longDescription: "string",
    audioURL: "string",
  },
});

function hydrateHosts(hostsArray: Array<string>): Array<Host> {
  return hostsArray.map((hostId) => {
    if (!hosts[hostId]) {
      throw new Error(`Host ${hostId} not found`);
    }
    return hosts[hostId];
  });
}

function stringifyHosts(hosts: Array<Host>): Array<string> {
  // return something like: `${hostName}<${hostBlueSkyURL}:${hostTwitterURL}:${hostXURL}>`
  // not perfect because if you search for `github`, you may end up getting weird results
  // TBD....
  // maybe we don't index thier socials?
  // for now we'll not index the socials
  // if we want to add it back we can do something like this:
  // <${host.socials.map((social) => `${social.url}`).join(":")}>
  return hosts.map((host) => {
    return host.name;
  });
}

// find all `*.mdx` files within `src/app/episodes/` and collect the frontmatter
// along with the contents
let episodeMDXFiles = await glob("./src/app/episodes/**/*.mdx");

let rssContent: Array<EpisodeMetadata> = [];

for (let episode of episodeMDXFiles) {
  let fileContent = await fs.readFile(episode, "utf8");

  // parse the frontmatter
  let { data, content } = matter(fileContent);

  rssContent.push({
    episodeId: data.episodeId,
    title: data.title,
    shortDescription: data.shortDescription,
    hosts: hydrateHosts(data.hosts),
    metadata: data.metadata,
    publishTime: data.publishTime,
    duration: data.duration,
    longDescription: content,
    audioURL: data.audioURL,
  });

  // insert the episode into the index
  insert(index, {
    episodeId: data.episodeId,
    title: data.title,
    shortDescription: data.shortDescription,
    hosts: stringifyHosts(hydrateHosts(data.hosts)),
    metadata: data.metadata,
    publishTime: data.publishTime,
    duration: data.duration,
    longDescription: content,
    audioURL: data.audioURL,
  });
}

// write rss content
console.log("Writing RSS content...");
await fs.writeFile(
  "./src/app/rss.xml/rss.json",
  JSON.stringify(rssContent, null, 2),
);

// write search index
let indexExport = save(index);

let jsonIndex = JSON.stringify(indexExport);
console.log("Writing search index...");
await fs.writeFile("./src/app/search/search-index.json", jsonIndex);
