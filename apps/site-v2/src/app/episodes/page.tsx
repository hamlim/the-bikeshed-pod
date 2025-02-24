import { Heading } from "@local/components/heading";
import { Link } from "waku";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { Button } from "#ui/button";

import episodes from "../../episode-metadata.json";

export default function EpisodesPage() {
  return (
    <div className="py-10 prose lg:prose-xl mx-auto">
      <Heading level={2}>All Episodes</Heading>
      <div className="grid gap-6 not-prose">
        {episodes.map((episode) => (
          <Card key={episode.episodeId}>
            <CardContent className="p-6">
              <Heading level={4}>
                {episode.episodeId} - {episode.title}
              </Heading>
              <div className="flex justify-between items-start pt-4">
                <div>
                  <p className="text-slate-600 mb-4">
                    {episode.shortDescription}
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/episodes/${episode.episodeId}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
