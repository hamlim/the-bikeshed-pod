import { Heading } from "@local/components/heading";
import { Link } from "waku";
import { Card, CardContent } from "#components/ui/card";
import { Button } from "#ui/button";
import type { EpisodeMetadata } from "../types";

export function EpisodeCard({ episode }: { episode: EpisodeMetadata }) {
  return (
    <Card>
      <CardContent className="p-6">
        <Heading level={4}>
          {episode.episodeId} - {episode.title}
        </Heading>
        <div className="flex justify-between items-start pt-4">
          <div>
            <p className="mb-4">{episode.shortDescription}</p>
            <div className="flex gap-2 justify-end">
              <Button asChild variant="outline" size="sm">
                <Link
                  to={
                    `/episodes/${episode.episodeId.toLowerCase()}/${episode.slug}` as Parameters<
                      typeof Link
                    >[0]["to"]
                  }
                >
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
