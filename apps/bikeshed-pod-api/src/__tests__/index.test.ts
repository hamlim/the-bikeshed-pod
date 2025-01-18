import { expect, test } from "bun:test";
import app from "../index";

test("sets up the app", () => {
  expect(app).toBeDefined();
});

test("responds with a 418 for a non-existent route", async () => {
  let response = await app.request("/api/non-existent");
  expect(response.status).toBe(418);
});

test("bails on audio requests without an episodeId", async () => {
  let response = await app.request("/api/audio/");
  // falls through
  expect(response.status).toBe(418);
});

test("responds with a 404 for a non-existent episode", async () => {
  let response = await app.request(
    "/api/audio/non-existent",
    {},
    {
      BUCKET: {
        async get(_key: string) {
          return undefined;
        },
      },
    },
  );
  expect(response.status).toBe(404);
});

test("list bails without a token", async () => {
  let response = await app.request("/api/audio/__list");
  expect(response.status).toBe(401);
});

test("list bails with an invalid token", async () => {
  let response = await app.request(
    "/api/audio/__list?token=foo",
    {},
    {
      API_TOKEN: "test",
    },
  );
  expect(response.status).toBe(401);
});

test("list works with a valid token", async () => {
  let episodes = [
    { key: "episodes/1.mp3" },
    { key: "episodes/2.mp3" },
    { key: "episodes/3.mp3" },
  ];
  let response = await app.request(
    "/api/audio/__list?token=test",
    {},
    {
      API_TOKEN: "test",
      BUCKET: {
        async list() {
          return {
            objects: episodes,
          };
        },
      },
    },
  );
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual(episodes.map((e) => e.key));
});
