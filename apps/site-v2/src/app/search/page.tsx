import { create, insert, search } from "@orama/orama";
import type {
  Orama,
  Result as OramaResult,
  Results as OramaResults,
} from "@orama/orama";
import { PlayCircle, Search } from "lucide-react";
import type { PageProps } from "waku/router";
import { Card, CardContent } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Button } from "#ui/button";
import type { EpisodeMetadata, Host } from "../../types";

let episodeMetadata: Array<EpisodeMetadata>;

async function loadEpisodeMetadata() {
  if (!episodeMetadata) {
    episodeMetadata = (await import("../../episode-metadata.json")).default;
  }

  return episodeMetadata;
}

function stringifyHosts(hosts: Array<Host>): Array<string> {
  // return something like: `${hostName}<${hostBlueSkyURL}:${hostTwitterURL}:${hostXURL}>`
  // not perfect because if you search for `github`, you may end up getting weird results
  // TBD....
  // maybe we don't index thier socials?
  // for now we'll not index the socials
  // if we want to add it back we can do something like this:
  // <${host.socials.map((social) => `${social.url}`).join(":")}>
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
      });
    }
  }

  return index as Orama<typeof schema>;
}

export default async function SearchPage({
  query: queryString,
}: PageProps<"/search">) {
  let searchParams = new URLSearchParams(queryString);
  let query = searchParams.get("query") || "";

  let results: Array<EpisodeMetadata> = [];

  if (query) {
    let episodeMetadata = await loadEpisodeMetadata();
    let searchIndex = makeIndex(episodeMetadata);

    let res = search(searchIndex, {
      term: query,
      tolerance: 2,
    }) as OramaResults<EpisodeMetadata>;

    results =
      res.hits.map((result: OramaResult<EpisodeMetadata>) => result.document) ||
      [];
  }

  return (
    <div className="container mx-auto max-w-5xl py-12">
      <form className="flex gap-4 mb-8" action="/search">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
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

      <div className="grid gap-6">
        {query ? (
          <>
            {results.length > 0 ? (
              results.map((episode) => (
                <Card key={episode.episodeId}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Episode {episode.title}: Search Result Example
                        </h3>
                        <p className="text-slate-600 mb-4">
                          This episode matches your search for "{query}"...
                        </p>
                        <Button variant="outline" size="sm" className="gap-2">
                          <PlayCircle className="w-4 h-4" />
                          Listen Now
                        </Button>
                      </div>
                      <div className="text-sm text-slate-500">45 min</div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center text-slate-500">
                No results found for "{query}"
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-slate-500">
            Search for episodes by title, description, or keywords
          </div>
        )}
      </div>
    </div>
  );
}
