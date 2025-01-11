import { Calendar, Clock, PlayCircle, Share2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

interface EpisodePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const id = (await params).id;

  // @TODO: fetch episode data and what not

  return (
    <div className="container mx-auto max-w-3xl py-12">
      <Card>
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-4">
            Episode {id}: The Great Tabs vs Spaces Debate
          </h1>

          <div className="flex gap-4 text-sm text-slate-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              March 15, 2024
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              45 minutes
            </span>
          </div>

          <Button size="lg" className="gap-2 mb-8">
            <PlayCircle className="w-5 h-5" />
            Play Episode
          </Button>

          <div className="prose prose-slate max-w-none">
            <h2>Episode Description</h2>
            <p>
              In this episode, we dive deep into one of programming's most
              contentious debates: tabs versus spaces. Our hosts explore the
              historical context, practical implications, and team dynamics
              surrounding this age-old discussion.
            </p>

            <h2>Show Notes</h2>
            <ul>
              <li>The history of indentation in programming</li>
              <li>How different IDEs handle tabs and spaces</li>
              <li>The impact on code readability and maintenance</li>
              <li>Team standardization and tooling considerations</li>
            </ul>
          </div>

          <div className="flex justify-between items-center mt-8 pt-8 border-t">
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share Episode
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
