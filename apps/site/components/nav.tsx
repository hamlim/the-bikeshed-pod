import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export function Nav() {
  return (
    <nav className="border-b">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xl font-bold hover:text-slate-600 transition-colors"
            >
              Bikeshed Pod
            </Link>
            <div className="flex gap-4">
              <Link
                href="/episodes"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Episodes
              </Link>
              <Link
                href="/about"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/search" className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
