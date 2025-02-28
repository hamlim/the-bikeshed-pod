import { Clock, Mic2, PlayCircle, Rss } from "lucide-react";
import { Link } from "waku";
import { EpisodeCard } from "#components/episode-card";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/card";
import episodeMetadata from "#episode-metadata";
import { Button } from "#ui/button";

let latestEpisodes = episodeMetadata.slice(0, 3);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="px-4 py-24 md:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-base">
              The Bikeshed Pod
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-white dark:text-base">
              Where developers debate the small stuff that <s>doesn't</s> matter
              <mark>(s)</mark>
              <span className="inline-block align-middle ml-0.5 w-[2px] h-[1.2em] bg-white animate-cursor" />
              . Join us for in-depth discussions about coding practices, tools,
              and tech decisions.
            </p>
            <div className="flex gap-4 justify-center pt-8">
              <Button asChild size="lg" className="gap-2">
                <Link to={`/episodes/${episodeMetadata[0].episodeId}`}>
                  <PlayCircle className="w-5 h-5" />
                  Latest Episode
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic2 className="w-5 h-5" />
                  <span>
                    Weekly<em>ish</em>
                  </span>{" "}
                  Episodes
                </CardTitle>
                <CardDescription>
                  New episodes (usually) every week discussing the latest in
                  tech
                </CardDescription>
              </CardHeader>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  30-Minute Format
                </CardTitle>
                <CardDescription>
                  Concise, focused discussions perfect for your commute
                </CardDescription>
              </CardHeader>
            </Card> */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rss className="w-5 h-5" />
                  Available Everywhere
                </CardTitle>
                <CardDescription>
                  Listen on Spotify, Apple Podcasts, or your favorite platform
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Episodes Section */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Latest Episodes</h2>
          <div className="grid gap-6">
            {latestEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
