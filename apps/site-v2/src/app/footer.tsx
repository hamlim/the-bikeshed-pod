import { Button } from "#components/ui/button";
import { hosts } from "../hosts";
import type { Host } from "../types";

function getPreferredSocial(host: Host): string {
  return host.socials.website;
}

export function Footer() {
  return (
    <footer className="py-4">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex justify-between">
          <p>&copy; 2025 The Bikeshed Podcast</p>
          <p>
            Created by{" "}
            <Button variant="link" asChild>
              <a
                href={getPreferredSocial(hosts.scott as Host)}
                target="_blank"
                rel="noreferrer"
              >
                Scott
              </a>
            </Button>
            ,{" "}
            <Button variant="link" asChild>
              <a
                href={getPreferredSocial(hosts.dillon as Host)}
                target="_blank"
                rel="noreferrer"
              >
                Dillon
              </a>
            </Button>
            , and{" "}
            <Button variant="link" asChild>
              <a
                href={getPreferredSocial(hosts.matt as Host)}
                target="_blank"
                rel="noreferrer"
              >
                Matt
              </a>
            </Button>
          </p>
        </div>
      </div>
    </footer>
  );
}
