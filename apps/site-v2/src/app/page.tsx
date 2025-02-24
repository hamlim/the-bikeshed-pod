import { Clock, Mic2, PlayCircle, Rss } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/card";
import { Button } from "#ui/button";

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
              Where developers debate the small stuff that matters. Join us for
              in-depth discussions about coding practices, tools, and tech
              decisions.
            </p>
            <div className="flex gap-4 justify-center pt-8">
              <Button size="lg" className="gap-2">
                <PlayCircle className="w-5 h-5" />
                Latest Episode
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Rss className="w-5 h-5" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic2 className="w-5 h-5" />
                  Weekly Episodes
                </CardTitle>
                <CardDescription>
                  New episodes every week discussing the latest in tech
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  30-Minute Format
                </CardTitle>
                <CardDescription>
                  Concise, focused discussions perfect for your commute
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
            {[1, 2, 3].map((episode) => (
              <Card key={episode}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Episode {episode}: The Great Tabs vs Spaces Debate
                      </h3>
                      <p className="mb-4">
                        Join us as we dive deep into the age-old developer
                        debate: tabs or spaces? We explore the pros and cons,
                        tooling implications, and team dynamics.
                      </p>
                      <Button variant="outline" size="sm" className="gap-2">
                        <PlayCircle className="w-4 h-4" />
                        Listen Now
                      </Button>
                    </div>
                    <div className="text-sm">45 min</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
