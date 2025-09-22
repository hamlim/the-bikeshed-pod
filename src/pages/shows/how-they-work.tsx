import { Mic2, PlayCircle, Rss } from "lucide-react";
import { Link } from "waku";
import { Anchor } from "#components/anchor";
import { EpisodeCard } from "#components/episode-card";
import { Logo } from "#components/logo";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/card";
// @HTW-TODO
import episodeMetadata from "#episode-metadata";
import { Button } from "#ui/button";

// @HTW-TODO
let latestEpisodes = episodeMetadata.slice(0, 3);

let latestEpisode = latestEpisodes[0];

export default function HowTheyWorkShow() {
  return (
    <>
      <meta name="description" content="Learn how the best do their work" />
      <meta property="og:title" content="How They Work from The Bikeshed" />
      <meta
        property="og:description"
        content="Learn how the best do their work"
      />
      <meta property="og:image" content="/how-they-work-metadata-lm.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://bikeshedpod.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="/how-they-work-metadata-lm.png" />
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
      <main className="flex grow flex-col">
        {/* Hero Section */}
        <section className="px-4 py-24 md:px-6 lg:px-8 bg-stone-900">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-base text-center">
                <Logo
                  className="inline-block mb-8"
                  attributes={{
                    role: "graphics-symbol",
                    width: "300",
                    height: "146",
                  }}
                />
              </h1>
              <p className="text-xl max-w-2xl mx-auto text-white dark:text-base">
                Learn how the <em className="font-bold">best</em> do their work.
                Join us for in-depth interviews with industry leaders about how
                they do their work, and learn how you can improve your own.
              </p>
              {latestEpisode ? (
                <div className="flex gap-4 justify-center pt-8">
                  <Button asChild size="lg" className="gap-2">
                    <Link
                      // @HTW-TODO
                      to={`/episodes/${latestEpisode.episodeId.toLowerCase()}/${latestEpisode.slug}`}
                    >
                      <PlayCircle className="w-5 h-5" />
                      Latest Episode
                    </Link>
                  </Button>
                </div>
              ) : null}
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
                    New episodes (usually) every week
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rss className="w-5 h-5" />
                    Available Everywhere
                  </CardTitle>
                  <CardDescription>
                    Listen on{" "}
                    <Anchor
                      // @HTW-TODO
                      href="https://open.spotify.com/show/7njrdM3LvNPnqSftswTkjn?si=5cc424416eaa4b35"
                    >
                      Spotify
                    </Anchor>
                    ,{" "}
                    <Anchor
                      // @HTW-TODO
                      href="https://podcasts.apple.com/us/podcast/the-bikeshed-pod/id1802688284"
                    >
                      Apple Podcasts
                    </Anchor>
                    , or{" "}
                    <Anchor
                      // @HTW-TODO
                      href="/htw-rss.xml"
                      target="_blank"
                      rel="noreferrer"
                    >
                      your favorite platform
                    </Anchor>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Latest Episodes Section */}
        {episodeMetadata.length ? (
          <section className="px-4 py-16 md:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Latest Episodes</h2>
                <Anchor href="/episodes">View All Episodes</Anchor>
              </div>
              <div className="grid gap-6">
                {
                  // @HTW-TODO
                  latestEpisodes.map((episode) => (
                    <EpisodeCard key={episode.id} episode={episode} />
                  ))
                }
                <Anchor href="/episodes">View All Episodes</Anchor>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
