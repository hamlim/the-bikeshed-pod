import { Heading } from "@local/components/heading";
import { Github, Globe, Mic2, Twitter } from "lucide-react";
import { Bluesky } from "#components/bluesky";
import { Card, CardContent } from "#components/ui/card";
import { Button } from "#ui/button";
import { hosts } from "../../hosts";
import type { Host, SocialNetwork } from "../../types";

function SocialIcon({ network }: { network: SocialNetwork }) {
  switch (network) {
    case "bluesky":
      return <Bluesky className="w-4 h-4" />;
    case "twitter":
      return <Twitter className="w-4 h-4" />;
    case "github":
      return <Github className="w-4 h-4" />;
    case "website":
      return <Globe className="w-4 h-4" />;
  }
}

export default function AboutPage() {
  return (
    <>
      <title>About The Bikeshed Pod</title>
      <meta
        name="description"
        content="Where developers debate the small stuff that matters"
      />
      <meta property="og:title" content="About The Bikeshed Pod" />
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
        <Heading level={2}>About The Bikeshed Pod</Heading>

        <Card className="mt-8">
          <CardContent className="p-8">
            <div className="prose prose-stone max-w-none">
              <p className="text-lg">
                The Bikeshed Pod is a weekly show where developers dive deep
                into the small but important details of software development
                that we all love to debate.
              </p>

              <h2 className="flex items-center gap-2 mt-8 text-lg">
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
              <ul className="grid md:grid-cols-3 gap-6 my-6 not-prose">
                <li className="rounded-2xl border-gray-100 p-4 flex flex-col">
                  <div className="border-2 border-gray-300 relative grid w-32 h-32 overflow-hidden rounded-full mx-auto mb-4">
                    <img
                      className="absolute h-full w-full inset-0 text-transparent object-cover"
                      src="/matt.png"
                      alt="Matt Hamlin headshot"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div>
                      <h3 className="font-bold">Matt Hamlin</h3>
                      <p>50 years of experience bikeshedding.</p>
                    </div>
                    <div className="mt-auto pt-4">
                      {Object.entries((hosts.matt as Host).socials).map(
                        ([network, url]) => (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 w-full mb-2 last:mb-0"
                            asChild
                            key={network}
                          >
                            <a href={url} target="_blank" rel="noreferrer">
                              {network}{" "}
                              <SocialIcon network={network as SocialNetwork} />
                            </a>
                          </Button>
                        ),
                      )}
                    </div>
                  </div>
                </li>
                <li className="rounded-2xl border-gray-100 p-4 flex flex-col">
                  <div className="border-2 border-gray-300 relative grid w-32 h-32 overflow-hidden rounded-full mx-auto mb-4">
                    <img
                      className="absolute h-full w-full inset-0 text-transparent object-cover"
                      src="/scott.png"
                      alt="Scott Kaye headshot"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div>
                      <h3 className="font-bold">Scott Kaye</h3>
                      <p>Alacritous Pollyanna and frontend enthusiast.</p>
                    </div>
                    <div className="mt-auto pt-4">
                      {Object.entries((hosts.scott as Host).socials).map(
                        ([network, url]) => (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 w-full mb-2 last:mb-0"
                            asChild
                            key={network}
                          >
                            <a href={url} target="_blank" rel="noreferrer">
                              {network}{" "}
                              <SocialIcon network={network as SocialNetwork} />
                            </a>
                          </Button>
                        ),
                      )}
                    </div>
                  </div>
                </li>
                <li className="rounded-2xl border-gray-100 p-4 flex flex-col">
                  <div className="border-2 border-gray-300 relative grid w-32 h-32 overflow-hidden rounded-full mx-auto mb-4">
                    <img
                      className="absolute h-full w-full inset-0 text-transparent object-cover"
                      src="/dillon.jpg"
                      alt="Dillon Curry headshot"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div>
                      <h3 className="font-bold">Dillon Curry</h3>
                      <p>Spicy take Curry.</p>
                    </div>
                    <div className="mt-auto pt-4">
                      {Object.entries((hosts.dillon as Host).socials).map(
                        ([network, url]) => (
                          <Button
                            size="sm"
                            className="gap-2 w-full mb-2 last:mb-0"
                            asChild
                            variant="outline"
                            key={network}
                          >
                            <a href={url} target="_blank" rel="noreferrer">
                              {network}{" "}
                              <SocialIcon network={network as SocialNetwork} />
                            </a>
                          </Button>
                        ),
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
