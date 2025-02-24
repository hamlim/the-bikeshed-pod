import { Heading } from "@local/components/heading";
import { hosts } from "../hosts";
import type { HydratedFrontmatter } from "../types";
import type { Host, Social } from "../types";
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

export function EpisodeContainer({
  children,
  rawMetadata,
}: { children: React.ReactNode; rawMetadata: any }) {
  let frontmatter = {
    ...rawMetadata,
    hosts: rawMetadata.hosts
      .map((host: string): Host | undefined => hosts[host])
      .filter(Boolean) as Array<Host>,
  } satisfies HydratedFrontmatter;

  return (
    <article className="prose lg:prose-xl mx-auto pt-10">
      <EpisodeMeta frontmatter={frontmatter} />
      <hgroup>
        <Heading level={1}>
          {frontmatter.episodeId} - {frontmatter.title}
        </Heading>
        <p>{frontmatter.shortDescription}</p>
        <p>Hosts:</p>
        <ul>
          {frontmatter.hosts.map((host: Host) => {
            let preferredSocial = getPreferredSocial(host);
            return (
              <li key={host.name}>
                {host.name} -{" "}
                <a target="_blank" href={preferredSocial.url} rel="noreferrer">
                  {preferredSocial.network}
                </a>
              </li>
            );
          })}
        </ul>
      </hgroup>
      <audio controls className="w-full">
        <source src={frontmatter.audioURL} type="audio/mpeg" />
        <track kind="captions" src={frontmatter.captionsURL} />
      </audio>
      {children}
    </article>
  );
}
