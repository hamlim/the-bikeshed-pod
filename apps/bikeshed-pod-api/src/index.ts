import { Hono } from "hono";

let app = new Hono();

app.get("/__info", async function handler(context) {
  return context.json({
    name: "bikeshed-pod-api",
    version: "0.0.1",
  });
});

app.get("*", async function handler(context) {
  return context.text(context.req.path, 200);
});

export default app;
