import { Link } from "waku";
import { Anchor } from "#components/anchor.js";
import { ApplePodcasts } from "#components/apple-podcasts.js";
import { Logo } from "#components/logo";
import { Spotify } from "#components/spotify.js";
import { Button } from "#components/ui/button";

export function Nav() {
  return (
    <header className="container mx-auto max-w-4xl p-4">
      <nav className="flex justify-between items-center gap-6">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-2 text-xl">
          <Anchor href="/about">About</Anchor>
          <Anchor href="/search">Search</Anchor>
          <Anchor href="/episodes">All Episodes</Anchor>
          <Anchor href="https://open.spotify.com/show/7njrdM3LvNPnqSftswTkjn?si=5cc424416eaa4b35">
            <Spotify className="w-6 h-6" />{" "}
            <span className="sr-only">Find us on Spotify</span>
          </Anchor>
          <Anchor href="https://podcasts.apple.com/us/podcast/the-bikeshed-pod/id1802688284">
            <ApplePodcasts className="w-6 h-6" />{" "}
            <span className="sr-only">Find us on Apple Podcasts</span>
          </Anchor>
        </div>
      </nav>
    </header>
  );
}
