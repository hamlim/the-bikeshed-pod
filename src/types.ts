export type SocialNetwork = "bluesky" | "twitter" | "github" | "website";

type OptionalSocialNetworks = Exclude<SocialNetwork, "website">;

export type Host = {
  name: string;
  socials: { website: string } & Partial<
    Record<OptionalSocialNetworks, string>
  >;
};

export type SearchEpisodeMetadata = {
  episodeId: string;
  title: string;
  shortDescription: string;
  hosts: Array<string>;
  metadata: Array<string>;
  publishTime: number;
  duration: number;
  audioURL: string;
  captionURL: string;
  longDescription: string;
  slug: string;
};

export interface EpisodeMetadata {
  episodeId: string;
  title: string;
  shortDescription: string;
  hosts: Array<Host>;
  metadata: Array<string>;
  publishTime: number;
  duration: number;
  audioURL: string;
  captionURL: string;
  longDescription: string;
  // Required for enclosure
  fileSizeBytes: number;
  slug: string;
}

// Frontmatter types
// longDescription is added manually (it's the content of the mdx file)
// Raw only sees the names of the hosts
// Hydrated maps the hosts against the hosts.ts `hosts` object
export interface RawFrontmatter {
  episodeId: string;
  title: string;
  shortDescription: string;
  // just an array of host names, remapped by `hosts.ts` `hosts` object
  hosts: Array<string>;
  metadata: Array<string>;
  publishTime: number;
  duration: number;
  audioURL: string;
  captionURL: string;
  fileSizeBytes: number;
  slug: string;
}

export interface HydratedFrontmatter {
  episodeId: string;
  title: string;
  shortDescription: string;
  hosts: Array<Host>;
  metadata: Array<string>;
  publishTime: number;
  duration: number;
  audioURL: string;
  captionURL: string;
  fileSizeBytes: number;
  slug: string;
}
