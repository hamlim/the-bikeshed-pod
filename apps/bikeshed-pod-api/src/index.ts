import { Hono } from "hono";
import type { Context, Next } from "hono";

// small little helper to ensure paths are prefixed with the base path
function withBasePath(basePath: string) {
  return function path(strings: TemplateStringsArray, ...values: Array<any>) {
    let interpolated = String.raw({ raw: strings }, ...values);
    return `${basePath}${interpolated.startsWith("/") ? "" : "/"}${interpolated}`;
  };
}

let path = withBasePath("/api");

type Variables = {
  path: string;
};

type Bindings = {
  BUCKET: R2Bucket;
};

type CustomContext = Context<{ Variables: Variables; Bindings: Bindings }>;

let app = new Hono<{ Variables: Variables; Bindings: Bindings }>().basePath(
  "/api",
);

app.use(function pathMiddleware(
  context: CustomContext,
  next: Next,
): ReturnType<Next> {
  context.set("path", context.req.path.replace("/api", ""));
  return next();
});

app.get(path`/__info`, async function handler(context) {
  return context.json({
    name: "bikeshed-pod-api",
    version: "0.0.1",
  });
});

function getEpisodeName(episodeId: string) {
  return `episodes/${episodeId}.mp3`;
}

app.get(path`/audio/:episodeId`, async function handler(context) {
  let episodeId = context.req.param("episodeId");
  if (!episodeId) {
    return context.text("The episodeId is required", 400);
  }
  let episode = await context.env.BUCKET.get(getEpisodeName(episodeId));
  if (!episode) {
    return context.text(
      "These are not the droids you're looking for. (Could not find the episode, if you expect this to work please contact us at bikeshedpod@gmail.com)",
      404,
      {
        headers: ["Content-Type: text/plain"],
      },
    );
  }
  let responseHeaders = new Headers();
  episode.writeHttpMetadata(responseHeaders);
  responseHeaders.set("etag", episode.httpEtag);
  return new Response(episode.body, {
    headers: responseHeaders,
    status: 200,
  });
});

let TEAPOT = 418;

app.get(path`*`, async function handler(context) {
  return context.text("This is not the route you're looking for!", TEAPOT);
});

export default app;
