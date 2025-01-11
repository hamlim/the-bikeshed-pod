import { Github, Mic2, Twitter } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12">
      <h1 className="text-4xl font-bold mb-8">About The Bikeshed Pod</h1>

      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="prose prose-slate max-w-none">
            <p className="text-xl text-slate-600">
              The Bikeshed Pod is a weekly show where developers dive deep into
              the small but important details of software development that we
              all love to debate.
            </p>

            <h2 className="flex items-center gap-2 mt-8">
              <Mic2 className="w-5 h-5" />
              About the Show
            </h2>
            <p>
              Every week, we tackle a new topic that developers can't help but
              have strong opinions about. From code formatting to naming
              conventions, from choice of tools to architectural decisions, we
              explore the reasons behind our preferences and practices.
            </p>

            <h2>The Hosts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3>Jane Developer</h3>
                <p className="text-slate-600">
                  Full-stack developer with 10 years of experience in
                  bikeshedding discussions.
                </p>
              </div>
              <div>
                <h3>John Coder</h3>
                <p className="text-slate-600">
                  Systems architect who has strong opinions about tabs vs
                  spaces.
                </p>
              </div>
            </div>

            <h2>Connect With Us</h2>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
