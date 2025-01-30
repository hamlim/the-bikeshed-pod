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

function getEpisodeAudioKey(episodeId: string) {
  return `episodes/${episodeId}/audio.mp3`;
}

app.get(
  `/episode/audio/:episodeId`,
  async function episodeAudioGetHandler(context) {
    let episodeId = context.req.param("episodeId");
    let episode = await context.env.BUCKET.get(getEpisodeAudioKey(episodeId));
    if (!episode) {
      console.warn(
        `[GET /episode/audio/:episodeId] Could not find the episode: ${episodeId}`,
      );
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
  },
);

function getEpisodeMetadataKey(episodeId: string) {
  return `episodes/${episodeId}/metadata.json`;
}

app.get(
  `/episode/metadata/:episodeId`,
  async function episodeMetadataGetHandler(context) {
    let episodeId = context.req.param("episodeId");
    let episode = await context.env.BUCKET.get(
      getEpisodeMetadataKey(episodeId),
    );
    if (!episode) {
      return context.text("Not found", 404);
    }
    return context.json(episode);
  },
);

app.put(
  `/episode/metadata/:episodeId`,
  async function episodeMetadataPutHandler(context) {
    let episodeId = context.req.param("episodeId");

    let body = await context.req.json();

    try {
      await context.env.BUCKET.put(
        getEpisodeMetadataKey(episodeId),
        JSON.stringify(body),
      );
    } catch (error) {
      console.error(
        `[PUT /episode/metadata/:episodeId] Could not put episode metadata: ${error}`,
      );
      return context.text("Internal server error", 500);
    }

    return context.text("OK", 200);
  },
);

app.get("/episodes/list", async function listEpisodesHandler(context: Context) {
  try {
    let episodes = await context.env.BUCKET.list();
    let episodeKeys = episodes.objects.map((episode) => episode.key);
    return context.json(episodeKeys);
  } catch (error) {
    console.error(`[listEpisodesHandler] Could not list episodes: ${error}`);
    return context.text("Internal server error", 500);
  }
});

app.get(`*`, async function catchAllHandler(context) {
  return context.text(
    "This is not the route you're looking for!",
    // teapot
    418,
  );
});

export default app;
