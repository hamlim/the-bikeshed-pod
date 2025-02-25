import type { Host } from "./types";

export let hosts: Record<string, Host> = {
  scott: {
    name: "Scott Kaye",
    socials: {
      bluesky: "https://bsky.app/profile/scottykaye.com",
      twitter: "https://x.com/scottykaye",
      github: "https://github.com/scottykaye/",
      website: "https://scottykaye.com/",
    },
  },
  dillon: {
    name: "Dillon Curry",
    socials: {
      github: "https://github.com/illourr",
      website: "https://dilloncurry.vercel.app/",
    },
  },
  matt: {
    name: "Matt Hamlin",
    socials: {
      bluesky: "https://bsky.app/profile/matthamlin.me",
      github: "https://github.com/hamlim/",
      website: "https://matthamlin.me/",
    },
  },
} as const;
