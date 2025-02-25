/*

{
    "episodeId": "some episode id",
    "title": "some title",
    "shortDescription": "Short (< some num of chars) description",
    "hosts": [
        {
            "name": "Host Name",
            "socials": [
                {
                    "network": "bluesky | github | twitter | website",
                    "url": "some url"
                }
            ]
        }
    ],
    "metadata": ["tag-1", "tag-2", "some-other-thing"],
    "publishTime": 12345,
    "duration": 12345,
    "longDescription": "Long form description/show notes - supports MDX",
    "audioURL": "https://bikeshedpod.com/api/audio/{episodeId}"
}
    */
export type Social = {
  network: string;
  url: string;
};

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
}
