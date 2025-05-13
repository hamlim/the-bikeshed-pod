import fs from "node:fs/promises";
import glob from "fast-glob";
import matter from "gray-matter";
import { transformMarkdown } from "mdxlite";
import { renderToString } from "react-dom/server";
import { hosts } from "../src/hosts";
import type { EpisodeMetadata, Host } from "../src/types";

let components = {
  Anchor({ href, children }: { href: string; children: React.ReactNode }) {
    return <a href={href}>{children}</a>;
  },
  img({ src, alt }: { src: string; alt: string }) {
    return <img src={`https://bikeshedpod.com${src}`} alt={alt} />;
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

// find all `*.mdx` files within `src/pages/episodes/` and collect the frontmatter
// along with the contents
let episodeMDXFiles = await glob("./src/pages/episodes/**/*.mdx");

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

await fs.writeFile(
  "./public/rss.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/rss.xsl"?>
    <rss version="2.0"
         xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
         xmlns:podcast="https://podcastindex.org/namespace/1.0"
         xmlns:atom="http://www.w3.org/2005/Atom"
         xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>The Bikeshed Pod</title>
        <description>The Bikeshed Pod is a weekly show where developers dive deep into the small but important details of software development that we all love to debate.</description>
        <link>https://bikeshedpod.com</link>
        <language>en-us</language>
        <atom:link href="https://bikeshedpod.com/rss.xml" rel="self" type="application/rss+xml"/>
        <itunes:category text="Technology"/>
        <itunes:explicit>true</itunes:explicit>
        <itunes:image href="https://bikeshedpod.com/bikeshed-episode-lm.png"/>

        <!-- Recommended Channel Elements -->
        <podcast:locked>no</podcast:locked>
        <podcast:guid>bikeshed-podcast</podcast:guid>
        <itunes:author>Matt Hamlin, Dillon Curry &amp; Scott Kaye</itunes:author>
        <itunes:owner>
          <itunes:name><![CDATA[Matt Hamlin]]></itunes:name>
          <itunes:email>hi@bikeshedpod.com</itunes:email>
        </itunes:owner>

        <!-- Optional Channel Elements -->
        <copyright>© ${new Date().getFullYear()} The Bikeshed Pod</copyright>
        <itunes:type>episodic</itunes:type>

        ${rssFeedData
          .map(
            (episode) => `
          <item>
            <!-- Required Item Elements -->
            <title>${episode.title}</title>
            <enclosure url="${episode.audioURL}"
                      type="audio/mpeg"
                      length="${episode.fileSizeBytes}"/>
            <guid isPermaLink="false">${episode.episodeId.toLowerCase()}</guid>

            <!-- Recommended Item Elements -->
            <link>https://bikeshedpod.com/episodes/${episode.episodeId.toLowerCase()}/${episode.slug}</link>
            <pubDate>${new Date(episode.publishTime).toUTCString()}</pubDate>
            <description><![CDATA[${episode.shortDescription}]]></description>
            <content:encoded><![CDATA[${episode.longDescription}]]></content:encoded>
            <itunes:duration>${episode.duration}</itunes:duration>
            ${episode.captionURL ? `<podcast:transcript url="${episode.captionURL}" type="text/vtt"/>` : ""}
            <itunes:explicit>true</itunes:explicit>
          </item>
        `,
          )
          .join("\n")}
      </channel>
    </rss>`,
);
await fs.writeFile("./src/rss-feed-data.json", JSON.stringify(rssFeedData));
