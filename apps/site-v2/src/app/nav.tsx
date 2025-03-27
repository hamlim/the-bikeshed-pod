import { Link } from "waku";
import { Logo } from "#components/logo";
import { Button } from "#components/ui/button";

export function Nav() {
  return (
    <header className="container mx-auto max-w-4xl p-4">
      <nav className="flex justify-between items-center gap-6">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-2 text-xl">
          <Button asChild variant="link">
            <Link to="/about">About</Link>
          </Button>
          <Button asChild variant="link">
            <Link to="/search">Search</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
