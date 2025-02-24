import { Heading } from "@local/components/heading";
import { EpisodeCard } from "#components/episode-card";
import episodeMetadata from "#episode-metadata";

export default function EpisodesPage() {
  return (
    <article className="py-10 container max-w-4xl mx-auto">
      <Heading level={2}>All Episodes</Heading>
      <div className="grid gap-6 mt-8">
        {episodeMetadata.map((episode) => (
          <EpisodeCard key={episode.episodeId} episode={episode} />
        ))}
      </div>
    </article>
  );
}
