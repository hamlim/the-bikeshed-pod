import { Heading } from "@local/components/heading";
import { Github, Mic2 } from "lucide-react";
import { BlueSky } from "#components/bluesky";
import { Card, CardContent } from "#components/ui/card";
import { Button } from "#ui/button";

export default function AboutPage() {
  return (
    <article className="py-10 container max-w-4xl mx-auto">
      <Heading level={2}>About The Bikeshed Pod</Heading>

      <Card className="mt-8">
        <CardContent className="p-8">
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600">
              The Bikeshed Pod is a weekly show where developers dive deep into
              the small but important details of software development that we
              all love to debate.
            </p>

            <h2 className="flex items-center gap-2 mt-8">
              <Mic2 className="w-5 h-5" />
              About the Show
            </h2>
            <p>
              Every week, we tackle a new topic that developers can't help but
              have strong opinions about. From code formatting to naming
              conventions, from choice of tools to architectural decisions, we
              explore the reasons behind our preferences and practices.
            </p>

            <h2>The Hosts</h2>
            <ul className="grid md:grid-cols-3 gap-6 my-6">
              <li className="rounded-2xl bg-gray-100 p-4">
                <div className="border-2 border-gray-300 relative grid w-32 h-32 overflow-hidden rounded-full mx-auto mb-4">
                  <img
                    className="absolute h-full w-full inset-0 text-transparent object-cover"
                    src="/matt.png"
                    alt="Matt Hamlin headshot"
                  />
                </div>

                <div>
                  <h3 className="font-bold">Matt Hamlin</h3>
                  <p className="text-slate-600">
                    50 years of experience bikeshedding.
                  </p>
                </div>
              </li>
              <li className="rounded-2xl bg-gray-100 p-4">
                <div className="border-2 border-gray-300 relative grid w-32 h-32 overflow-hidden rounded-full mx-auto mb-4">
                  <img
                    className="absolute h-full w-full inset-0 text-transparent object-cover"
                    src="/scott.png"
                    alt="Scott Kaye headshot"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Scott Kaye</h3>
                  <p className="text-slate-600">
                    Alacritous Pollyanna and frontend enthusiast.
                  </p>
                </div>
              </li>
              <li className="rounded-2xl bg-gray-100 p-4">
                <div className="border-2 border-gray-300 relative grid w-32 h-32 overflow-hidden rounded-full mx-auto mb-4">
                  <img
                    className="absolute h-full w-full inset-0 text-transparent object-cover"
                    src="/dillon.jpg"
                    alt="Dillon Curry headshot"
                  />
                </div>

                <div>
                  <h3 className="font-bold">Dillon Curry</h3>
                  <p className="text-slate-600">Spicy take Curry.</p>
                </div>
              </li>
            </ul>

            <h2 className="mb-2">Connect With Us</h2>
            <div className="flex gap-4">
              <Button asChild variant="outline" size="sm" className="gap-2">
                <a href="#TODO">
                  <BlueSky className="w-4 h-4" />
                  Bluesky
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="gap-2">
                <a href="#TODO">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
