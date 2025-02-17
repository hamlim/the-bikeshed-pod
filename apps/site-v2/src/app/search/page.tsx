import { Action } from "@local/components/action";
import { PlayCircle, Search } from "lucide-react";
import type { PageProps } from "waku/router";
import { Card, CardContent } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";

export default async function SearchPage({
  query: queryString,
}: PageProps<"/search">) {
  let searchParams = new URLSearchParams(queryString);
  let query = searchParams.get("query") || "";

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
        <Action is="button" type="submit" variant="primary">
          Search
        </Action>
      </form>

      <div className="grid gap-6">
        {/* Example search results */}
        {query &&
          [1, 2].map((episode) => (
            <Card key={episode}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Episode {episode}: Search Result Example
                    </h3>
                    <p className="text-slate-600 mb-4">
                      This episode matches your search for "{query}"...
                    </p>
                    <Action
                      is="button"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Listen Now
                    </Action>
                  </div>
                  <div className="text-sm text-slate-500">45 min</div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
