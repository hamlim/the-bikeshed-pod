import { Heading } from "@local/components/heading";
import { Button } from "#ui/button";
import { hosts } from "../hosts";
import type { HydratedFrontmatter } from "../types";
import type { Host, Social } from "../types";
import { SeeDiscussionOnBluesky, ShareToBluesky } from "./bluesky-social";
import { EpisodeMeta } from "./episode-meta";

function getPreferredSocial(host: Host): Social {
  let websiteSocial = host.socials.find(
    (socialInfo) => socialInfo.network === "website",
  );
  if (websiteSocial) {
    return websiteSocial;
  }
  return host.socials[0];
}

let formatDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: "America/New_York",
}).format;

function formatTime(time: number) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = Math.floor(time % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

export function EpisodeContainer({
  children,
  rawMetadata,
}: { children: React.ReactNode; rawMetadata: any }) {
  let frontmatter: HydratedFrontmatter = {
    ...rawMetadata,
    hosts: rawMetadata.hosts
      .map((host: string): Host | undefined => hosts[host])
      .filter(Boolean) as Array<Host>,
  };

  return (
    <article className="py-10 container max-w-4xl mx-auto">
      <EpisodeMeta frontmatter={frontmatter} />
      <div className="p-6 bg-[var(--uchu-yin-1)] dark:bg-[var(--uchu-yin-9)] rounded-md space-y-4">
        <hgroup className="space-y-4">
          <Heading level={1}>
            {frontmatter.episodeId} - {frontmatter.title}
          </Heading>
          <p>{frontmatter.shortDescription}</p>
          <p>Hosts:</p>
          <ul className="list-disc list-inside">
            {frontmatter.hosts.map((host: Host) => {
              let preferredSocial = getPreferredSocial(host);
              return (
                <li key={host.name}>
                  {host.name} -{" "}
                  <Button asChild variant="link">
                    <a
                      target="_blank"
                      href={preferredSocial.url}
                      rel="noreferrer"
                    >
                      {preferredSocial.network}
                    </a>
                  </Button>
                </li>
              );
            })}
          </ul>
          <p>
            Released: <time>{formatDate(frontmatter.publishTime)}</time>
          </p>
          <p>Episode length: {formatTime(frontmatter.duration)}</p>
        </hgroup>
        <audio controls className="w-full">
          <source src={frontmatter.audioURL} type="audio/mpeg" />
          <track kind="captions" src={frontmatter.captionURL} />
        </audio>
        <div className="flex gap-2 justify-center">
          <ShareToBluesky
            title={`The Bikeshed Podcast episode: ${frontmatter.episodeId} - ${frontmatter.title}`}
          >
            Share this episode on Bluesky
          </ShareToBluesky>
          <SeeDiscussionOnBluesky>
            See discussion on Bluesky
          </SeeDiscussionOnBluesky>
        </div>
      </div>
      <hr className="my-8" />
      <section className="prose dark:prose-invert container max-w-4xl mx-auto">
        {children}
      </section>
    </article>
  );
}
