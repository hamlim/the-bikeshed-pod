import { Hono } from "hono";

let app = new Hono();

app.all("*", async function handler(context) {
  return context.text("hello world", 418);
});

export default app;
