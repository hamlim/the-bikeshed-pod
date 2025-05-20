import { EpisodeCard } from "#components/episode-card";
import { Heading } from "#components/heading";
import episodeMetadata from "#episode-metadata";

export default function EpisodesPage() {
  return (
    <>
      <title>The Bikeshed Pod - All Episodes</title>
      <meta
        name="description"
        content="Where developers debate the small stuff that matters"
      />
      <meta property="og:title" content="The Bikeshed Pod - All Episodes" />
      <meta
        property="og:description"
        content="Where developers debate the small stuff that matters"
      />
      <meta property="og:image" content="/bikeshed-metadata-lm.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://bikeshedpod.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="/bikeshed-metadata-lm.png" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <main className="py-10 container max-w-[90vw] md:max-w-4xl mx-auto grow">
        <Heading level={2}>All Episodes</Heading>
        <div className="grid gap-6 mt-8">
          {episodeMetadata.map((episode) => (
            <EpisodeCard key={episode.episodeId} episode={episode} />
          ))}
        </div>
      </main>
    </>
  );
}
