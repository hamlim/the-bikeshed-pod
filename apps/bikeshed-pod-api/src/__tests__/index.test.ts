import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import app from "../index";

let logs = {
  info: [],
  error: [],
  warn: [],
  log: [],
};
let originalConsoleLog = console.log;
let originalConsoleInfo = console.info;
let originalConsoleError = console.error;
let originalConsoleWarn = console.warn;

beforeEach(() => {
  logs = {
    info: [],
    error: [],
    warn: [],
    log: [],
  };
  console.log = (...args) => {
    logs.log.push(args);
  };
  console.info = (...args) => {
    logs.info.push(args);
  };
  console.error = (...args) => {
    logs.error.push(args);
  };
  console.warn = (...args) => {
    logs.warn.push(args);
  };
});

afterEach(() => {
  logs = {
    info: [],
    error: [],
    warn: [],
    log: [],
  };
  console.log = originalConsoleLog;
  console.info = originalConsoleInfo;
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

describe("app", () => {
  it("sets up the app", () => {
    expect(app).toBeDefined();
  });
  it("responds with a 418 for a non-existent route", async () => {
    let response = await app.request("/api/non-existent");
    expect(response.status).toBe(418);
  });
});

describe("GET /episode/audio:episodeId", () => {
  it("bails on audio requests without an episodeId", async () => {
    let response = await app.request("/api/episode/audio/");
    // falls through
    expect(response.status).toBe(418);
    let body = await response.json();
    expect(body).toEqual({
      message: "This is not the route you're looking for!",
    });
  });

  it("responds with a 404 for a non-existent episode", async () => {
    let response = await app.request(
      "/api/episode/audio/non-existent",
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
    let body = await response.json();
    expect(body).toEqual({
      message:
        "These are not the droids you're looking for. (Could not find the episode, if you expect this to work please contact us at bikeshedpod@gmail.com)",
    });
  });
});
describe("GET /episode/metadata:episodeId", () => {
  it("responds with a 200 for an existent episode", async () => {
    let response = await app.request(
      "/api/episode/metadata/1",
      {},
      {
        BUCKET: {
          async get(_key: string) {
            return {
              episodeId: "1",
            };
          },
        },
      },
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      episodeId: "1",
    });
  });
});
describe("PUT /episode/metadata:episodeId", () => {
  it("responds with a 200 for a valid episode", async () => {
    let response = await app.request(
      "/api/episode/metadata/1",
      {
        method: "PUT",
        body: JSON.stringify({
          episodeId: "1",
        }),
      },
      {
        BUCKET: {
          async put(_key: string, _body: string) {
            expect(_body).toEqual(
              JSON.stringify({
                episodeId: "1",
              }),
            );
            return;
          },
        },
      },
    );
    expect(response.status).toBe(200);
    let body = await response.json();
    expect(body).toEqual({
      message: "Episode metadata updated",
    });
  });
});

describe("GET /episodes/list", () => {
  it("responds with a 200 for a valid list", async () => {
    let response = await app.request(
      "/api/episodes/list",
      {},
      {
        BUCKET: {
          async list() {
            return {
              objects: [
                { key: "episodes/1" },
                { key: "episodes/2" },
                { key: "episodes/3" },
              ],
            };
          },
        },
      },
    );
    expect(response.status).toBe(200);
    let body = await response.json();
    expect(body).toEqual(["episodes/1", "episodes/2", "episodes/3"]);
  });
  it("responds with a 500 for a list error", async () => {
    let response = await app.request(
      "/api/episodes/list",
      {},
      {
        BUCKET: {
          async list() {
            throw new Error("test");
          },
        },
      },
    );
    expect(response.status).toBe(500);
    let body = await response.json();
    expect(body).toEqual({
      message: "Internal server error",
    });
  });
});

describe("GET /episodes/metadata", () => {
  it("responds with a 200 with the episode metadata", async () => {
    let response = await app.request(
      "/api/episodes/metadata",
      {},
      {
        BUCKET: {
          async list() {
            return {
              objects: [
                { key: "episodes/1" },
                { key: "episodes/2" },
                { key: "episodes/3" },
              ],
            };
          },
          async get(key: string) {
            return {
              episodeId: key.split("/")[2],
              json() {
                return this;
              },
            };
          },
        },
      },
    );
    expect(response.status).toBe(200);
    let body = await response.json();
    expect(body).toEqual([
      { episodeId: "1" },
      { episodeId: "2" },
      { episodeId: "3" },
    ]);
  });
  it("responds with a 500 for a metadata error", async () => {
    let response = await app.request(
      "/api/episodes/metadata",
      {},
      {
        BUCKET: {
          async list() {
            throw new Error("test");
          },
        },
      },
    );
    expect(response.status).toBe(500);
    let body = await response.json();
    expect(body).toEqual({
      message: "Internal server error",
    });
  });
});
