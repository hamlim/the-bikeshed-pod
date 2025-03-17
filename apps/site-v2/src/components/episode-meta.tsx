import type { Host, HydratedFrontmatter } from "../types";

let dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format;

export function EpisodeMeta({
  frontmatter,
}: {
  frontmatter: HydratedFrontmatter;
}) {
  return (
    <>
      <meta name="description" content={frontmatter.shortDescription} />
      <meta property="og:title" content={frontmatter.title} />
      <meta property="og:description" content={frontmatter.shortDescription} />
      <meta property="og:image" content="/bikeshed-pod-square.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://bikeshedpod.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="/bikeshed-pod-square.png" />
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
      <meta property="of:episodeNumber" content={frontmatter.episodeId} />
      <meta property="of:duration" content={frontmatter.duration.toString()} />
    </>
  );
}
