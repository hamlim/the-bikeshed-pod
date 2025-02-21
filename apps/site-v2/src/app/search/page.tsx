import { create, load, search } from "@orama/orama";
import type {
  Result as OramaResult,
  Results as OramaResults,
} from "@orama/orama";
import { PlayCircle, Search } from "lucide-react";
import type { PageProps } from "waku/router";
import { Card, CardContent } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Button } from "#ui/button";
import type { EpisodeMetadata } from "../../types";

let searchIndex: typeof import("./search-index.json");

async function loadIndex() {
  if (!searchIndex) {
    searchIndex = await import("./search-index.json");
  }

  return searchIndex;
}

export default async function SearchPage({
  query: queryString,
}: PageProps<"/search">) {
  let searchParams = new URLSearchParams(queryString);
  let query = searchParams.get("query") || "";

  let results: Array<EpisodeMetadata> = [];

  if (query) {
    let searchIndex = await loadIndex();

    let newQueryDB = create({
      schema: {
        __placeholder: "string",
      },
    });

    load(newQueryDB, searchIndex);

    let res = search(newQueryDB, {
      term: query,
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
