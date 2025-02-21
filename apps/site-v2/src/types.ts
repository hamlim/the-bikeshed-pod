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

export type Host = {
  name: string;
  socials: Array<Social>;
};

export type EpisodeMetadata = {
  episodeId: string;
  title: string;
  shortDescription: string;
  hosts: Array<Host>;
  metadata: Array<string>;
  publishTime: number;
  duration: number;
  audioURL: string;
  longDescription: string;
};
