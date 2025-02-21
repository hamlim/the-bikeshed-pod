import { Action } from "@local/components/action";
import { Search } from "lucide-react";
import { Link } from "waku";

export function Nav() {
  return (
    <nav className="border-b">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-xl font-bold hover:text-slate-600 transition-colors"
              aria-label="The Bikeshed Podcast"
            >
              <img
                src="/logo.png"
                alt="The Bikeshed Podcast"
                width={125}
                height={125}
                aria-hidden="true"
              />
            </Link>
            <div className="flex gap-4">
              <Link
                to="/episodes"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Episodes
              </Link>
              <Link
                to="/about"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
          {/* <Button variant="ghost" size="sm" asChild> */}
          <Action variant="ghost" is={Link} to="/search" className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </Action>
          {/* </Button> */}
        </div>
      </div>
    </nav>
  );
}
