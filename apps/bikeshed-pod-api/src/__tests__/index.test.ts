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

describe("/audio", () => {
  it("bails on audio requests without an episodeId", async () => {
    let response = await app.request("/api/audio/");
    // falls through
    expect(response.status).toBe(418);
  });

  it("responds with a 404 for a non-existent episode", async () => {
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

  describe("/__list", () => {
    it("list bails without a token", async () => {
      let response = await app.request("/api/audio/__list");
      expect(response.status).toBe(401);
    });

    it("list bails with an invalid token", async () => {
      let response = await app.request(
        "/api/audio/__list?token=foo",
        {},
        {
          API_TOKEN: "test",
        },
      );
      expect(response.status).toBe(401);
    });

    it("list works with a valid token", async () => {
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
  });
});

describe("/episode", () => {
  it("responds with a 200 for an existent episode", async () => {
    let response = await app.request("/api/episode/1");
    expect(response.status).toBe(200);
  });
});
