import { hosts } from "../hosts";
import type { Host, HydratedFrontmatter, RawFrontmatter } from "../types";

let dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format;

export function EpisodeMeta({
  rawMetadata,
}: {
  rawMetadata: RawFrontmatter;
}) {
  let frontmatter = {
    ...rawMetadata,
    hosts: rawMetadata.hosts
      .map((host: string): Host | undefined => hosts[host])
      .filter(Boolean) as Array<Host>,
  } satisfies HydratedFrontmatter;

  return (
    <>
      <meta name="description" content={frontmatter.shortDescription} />
      {/* Bug in react IMO - title with interpolated values doesn't work */}
      <title>
        {`Bikeshed Podcast - ${frontmatter.episodeId} ${frontmatter.title}`}
      </title>
      <meta
        name="keywords"
        content={[
          "bikeshed-podcast",
          "podcast-episode",
          ...frontmatter.metadata,
        ].join(", ")}
      />
      <meta
        name="publishedDate"
        content={dateFormatter(frontmatter.publishTime)}
      />
      <meta
        name="author"
        content={frontmatter.hosts.map((host: Host) => host.name).join(", ")}
      />
      <meta property="of:type" content="podcast-episode" />
      <meta property="of:name" content={frontmatter.title} />
      <meta property="of:episode" content={frontmatter.episodeId} />
      {/* @TODO??? */}
      {/* <meta property="of:season" content={frontmatter.season} /> */}
      <meta
        property="of:episodeNumber"
        content={frontmatter.episodeId.split("bike-")[1]}
      />
      <meta property="of:duration" content={frontmatter.duration.toString()} />
    </>
  );
}
