import type { Host } from "./types";

export let hosts: Record<string, Host> = {
  scott: {
    name: "Scott Kaye",
    socials: [
      {
        network: "bluesky",
        url: "https://bsky.app/profile/scottykaye.com",
      },
      {
        network: "twitter",
        url: "https://x.com/scottykaye",
      },
      {
        network: "github",
        url: "https://github.com/scottykaye/",
      },
      {
        network: "website",
        url: "https://scottykaye.com/",
      },
    ],
  },
  dillon: {
    name: "Dillon Curry",
    socials: [
      {
        network: "github",
        url: "https://github.com/illourr",
      },
      {
        network: "website",
        url: "https://dilloncurry.vercel.app/",
      },
    ],
  },
  matt: {
    name: "Matt Hamlin",
    socials: [
      {
        network: "bluesky",
        url: "https://bsky.app/profile/matthamlin.me",
      },
      {
        network: "github",
        url: "https://github.com/hamlim/",
      },
      {
        network: "website",
        url: "https://matthamlin.me/",
      },
    ],
  },
} as const;
