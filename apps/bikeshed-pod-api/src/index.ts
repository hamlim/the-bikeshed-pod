import { Hono } from "hono";
import type { Context, Next } from "hono";

type Variables = {
  path: string;
};

type Bindings = {
  BUCKET: R2Bucket;
  API_TOKEN: string;
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

app.get(`/__info`, async function handler(context) {
  return context.json({
    name: "bikeshed-pod-api",
    version: "0.0.1",
  });
});

app.get("/audio/__list", async function audioListHanlder(context) {
  if (
    !context.req.query("token") ||
    context.req.query("token") !== context.env.API_TOKEN
  ) {
    return context.text("Unauthorized", 401);
  }
  let episodes = await context.env.BUCKET.list();
  let episodeKeys = episodes.objects.map((episode) => episode.key);
  return context.json(episodeKeys);
});

function getEpisodeName(episodeId: string) {
  return `episodes/${episodeId}.mp3`;
}

app.get(`/audio/:episodeId`, async function handler(context) {
  console.log(
    "GET /audio/:episodeId",
    context.get("path"),
    context.req.param("episodeId"),
  );
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

app.get(`*`, async function handler(context) {
  console.log("GET *", context.get("path"));
  // teapot
  return context.text("This is not the route you're looking for!", 418);
});

export default app;
