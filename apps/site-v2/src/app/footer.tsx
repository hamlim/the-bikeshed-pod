import { Anchor } from "#components/anchor";
import { ApplePodcasts } from "#components/apple-podcasts.js";
import { Bluesky } from "#components/bluesky.js";
import { Discord } from "#components/discord.js";
import { Rss } from "#components/rss";
import { Spotify } from "#components/spotify.js";
import { hosts } from "../hosts";
import type { Host } from "../types";

function getPreferredSocial(host: Host): string {
  return host.socials.website;
}

export function Footer() {
  return (
    <footer className="container mx-auto max-w-4xl p-4 grid sm:grid-cols-[auto_auto] justify-between gap-8">
      {/* Left Column - Podcast Links */}
      <nav className="flex flex-col gap-2 items-start">
        <Anchor href="/rss.xml" target="_blank" rel="noreferrer">
          <Rss className="w-4 h-4 mr-2" /> RSS Feed
        </Anchor>
        <Anchor href="https://podcasts.apple.com/us/podcast/the-bikeshed-pod/id1802688284">
          <ApplePodcasts className="w-4 h-4 mr-2" /> Apple Podcasts
        </Anchor>
        <Anchor href="https://open.spotify.com/show/7njrdM3LvNPnqSftswTkjn?si=5cc424416eaa4b35">
          <Spotify className="w-4 h-4 mr-2" /> Spotify
        </Anchor>
      </nav>
      {/* Right Column - Info and Social */}
      <section className="flex flex-col gap-2 items-start">
        <p>&copy; 2025 The Bikeshed Podcast</p>
        <Anchor href="https://bsky.app/profile/bikeshedpod.com">
          <Bluesky className="w-4 h-4 mr-2" /> Follow us on Bluesky
        </Anchor>
        <Anchor href="https://discord.gg/djaZBjJJ">
          <Discord className="w-4 h-4 mr-2" /> Join our Discord
        </Anchor>
        <p>
          Created by{" "}
          <Anchor href={getPreferredSocial(hosts.scott as Host)}>Scott</Anchor>,{" "}
          <Anchor href={getPreferredSocial(hosts.dillon as Host)}>
            Dillon
          </Anchor>
          , and{" "}
          <Anchor href={getPreferredSocial(hosts.matt as Host)}>Matt</Anchor>
        </p>
      </section>
    </footer>
  );
}
