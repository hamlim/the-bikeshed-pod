import { Search } from "lucide-react";
import { Link } from "waku";
import { Button } from "#ui/button";

export function Nav() {
  return (
    <nav className="border-b">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="link" asChild>
              <Link to="/" aria-label="The Bikeshed Podcast">
                <img
                  src="/logo.png"
                  alt="The Bikeshed Podcast"
                  width={125}
                  height={125}
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <div className="flex gap-4">
              <Button variant="link" asChild>
                <Link to="/episodes">Episodes</Link>
              </Button>
              <Button variant="link" asChild>
                <Link to="/about">About</Link>
              </Button>
            </div>
          </div>
          <Button variant="link" asChild className="gap-2">
            <Link to="/search">
              <Search className="h-4 w-4" />
              Search
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
