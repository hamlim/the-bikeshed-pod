import { create, insert, search } from "@orama/orama";
import type {
  Orama,
  Result as OramaResult,
  Results as OramaResults,
} from "@orama/orama";
import { Search } from "lucide-react";
import type { PageProps } from "waku/router";
import { EpisodeCard } from "#components/episode-card.js";
import { Heading } from "#components/heading";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import episodeMetadata from "#episode-metadata";
import { Button } from "#ui/button";
import { hosts } from "../../hosts";
import type { EpisodeMetadata, Host, SearchEpisodeMetadata } from "../../types";

function stringifyHosts(hosts: Array<Host>): Array<string> {
  // return something like: `${hostName}<${hostBlueSkyURL}:${hostTwitterURL}:${hostXURL}>`
  // not perfect because if you search for `github`, you may end up getting weird results
  // TBD....
  // maybe we don't index their socials?
  // for now we'll not index the socials
  // if we want to add it back we can do something like this:
  // <${Object.values(host.socials).join(":")}>
  return hosts.map((host) => {
    return host.name;
  });
}

let schema = {
  episodeId: "string",
  title: "string",
  shortDescription: "string",
  // unfortunately orama doesn't support an array of objects
  // so we'll stringify the Host type and search on the whole string
  hosts: "string[]",
  metadata: "string[]",
  publishTime: "number",
  duration: "number",
  longDescription: "string",
  audioURL: "string",
  captionURL: "string",
  slug: "string",
  fileSizeBytes: "number",
} as const;

let index: Orama<typeof schema>;

function makeIndex(
  episodeMetadata: Array<EpisodeMetadata>,
): Orama<typeof schema> {
  if (!index) {
    index = create({
      schema,
    }) as Orama<typeof schema>;

    for (let episode of episodeMetadata) {
      insert(index, {
        episodeId: episode.episodeId,
        title: episode.title,
        shortDescription: episode.shortDescription,
        hosts: stringifyHosts(episode.hosts),
        metadata: episode.metadata,
        publishTime: episode.publishTime,
        duration: episode.duration,
        longDescription: episode.longDescription,
        audioURL: episode.audioURL,
        slug: episode.slug,
        fileSizeBytes: episode.fileSizeBytes,
      });
    }
  }

  return index as Orama<typeof schema>;
}

let searchIndex = makeIndex(episodeMetadata as Array<EpisodeMetadata>);

export default async function SearchPage({
  query: queryString,
}: PageProps<"/search">) {
  let searchParams = new URLSearchParams(queryString);
  let query = searchParams.get("query") || "";

  let results: Array<EpisodeMetadata> = [];

  if (query) {
    let res = search(searchIndex, {
      term: query,
      tolerance: 2,
    }) as OramaResults<SearchEpisodeMetadata>;

    results = res.hits.map(
      (result: OramaResult<SearchEpisodeMetadata>): EpisodeMetadata => {
        return {
          ...result.document,
          hosts: result.document.hosts
            .map((host: string): Host | undefined => hosts[host])
            .filter(Boolean) as Array<Host>,
        };
      },
    ) || [];
  }

  return (
    <>
      <meta
        name="description"
        content="Where developers debate the small stuff that matters"
      />
      <title>Search The Bikeshed Pod Episodes</title>
      <meta property="og:title" content="Search The Bikeshed Pod Episodes" />
      <meta
        property="og:description"
        content="Where developers debate the small stuff that matters"
      />
      <meta property="og:image" content="/bikeshed-metadata-lm.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://bikeshedpod.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="/bikeshed-metadata-lm.png" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <main className="container mx-auto max-w-[90vw] md:max-w-4xl py-12 grow">
        <Heading level={2}>Search</Heading>
        <search>
          <form className="flex gap-4 my-8" action="/search">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
              <Label>
                <span className="sr-only">
                  Search episodes by title, description, or keywords
                </span>
                <Input
                  name="query"
                  placeholder="Search episodes..."
                  className="pl-10"
                  defaultValue={query}
                />
              </Label>
            </div>
            <Button type="submit">Search</Button>
          </form>
        </search>

        <div className="grid gap-6">
          {query
            ? (
              <>
                {results.length > 0
                  ? (
                    results.map((episode) => (
                      <EpisodeCard key={episode.episodeId} episode={episode} />
                    ))
                  )
                  : (
                    <div className="text-center text-stone-500">
                      No results found for "{query}"
                    </div>
                  )}
              </>
            )
            : (
              <div className="text-center text-stone-500">
                Search for episodes by title, description, or keywords
              </div>
            )}
        </div>
      </main>
    </>
  );
}

export function getConfig() {
  return {
    render: "dynamic",
  } as const;
}
