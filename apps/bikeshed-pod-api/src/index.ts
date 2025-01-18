import { Hono } from "hono";
import type { Context, Next } from "hono";

// small little helper to ensure paths are prefixed with the base path

function withBasePath(basePath: string) {
  return function path(strings: TemplateStringsArray, ...values: Array<any>) {
    let interpolated = String.raw({ raw: strings }, ...values);
    return `/api${interpolated.startsWith("/") ? "" : "/"}${interpolated}`;
  };
}

let path = withBasePath("/api");

type CustomContext = Context<{ Variables: { path: string } }>;

let app = new Hono<{ Variables: { path: string } }>().basePath("/api");

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

app.get(path`*`, async function handler(context) {
  return context.text(context.get("path"), 200);
});

export default app;
