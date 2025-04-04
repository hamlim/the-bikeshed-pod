"use client";

import { Share } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "#components/ui/button";
import { Anchor } from "./anchor";
import { Bluesky } from "./bluesky";

export function ShareToBluesky({
  children,
  title,
}: { children: ReactNode; title: string }) {
  let [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <Anchor
      href={`https://bsky.app/intent/compose?text=${encodeURIComponent(`${title}: ${url}`)}`}
    >
      <Share className="w-4 h-4 mr-2" />
      {children}
    </Anchor>
  );
}

export function SeeDiscussionOnBluesky({ children }: { children: ReactNode }) {
  let [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <Button asChild variant="link">
      <a
        href={`https://bsky.app/search?q=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
      >
        <Bluesky className="w-4 h-4 mr-2" />
        {children}
      </a>
    </Button>
  );
}
