import { Link } from "waku";
import {
  Card,
  CardContent,
  // , CardHeader, CardTitle
} from "#components/ui/card";
import { Button } from "#ui/button";

import episodes from "../../episode-metadata.json";

export default function EpisodesPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12">
      <h1 className="text-4xl font-bold mb-8 mx-6">All Episodes</h1>
      <div className="grid gap-6">
        {episodes.map((episode) => (
          <Card key={episode.episodeId}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Episode {episode.episodeId}: {episode.title}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {episode.shortDescription}
                  </p>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/episodes/${episode.episodeId}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-slate-500">{episode.duration}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
