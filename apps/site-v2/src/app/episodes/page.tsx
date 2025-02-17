import { Action } from "@local/components/action";
import { PlayCircle } from "lucide-react";
import {
  Card,
  CardContent,
  // , CardHeader, CardTitle
} from "#components/ui/card";

export default function EpisodesPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12">
      <h1 className="text-4xl font-bold mb-8">All Episodes</h1>
      <div className="grid gap-6">
        {[1, 2, 3, 4, 5].map((episode) => (
          <Card key={episode}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Episode {episode}: The Great Tabs vs Spaces Debate
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Join us as we dive deep into the age-old developer debate:
                    tabs or spaces? We explore the pros and cons, tooling
                    implications, and team dynamics.
                  </p>
                  <div className="flex gap-2">
                    <Action
                      is="button"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Listen Now
                    </Action>
                    <Action
                      is="a"
                      href={`/episodes/${episode}`}
                      variant="ghost"
                      size="sm"
                    >
                      View Details
                    </Action>
                  </div>
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
