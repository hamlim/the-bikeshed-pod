import { expect, test } from "bun:test";
import { Replayer, setup } from "rereplay";
import { DataClient } from "../data-client";

// @TODO: add back when bun supports msw, or msw supports bun
// import { http, HttpResponse } from "msw";
// import { setupServer } from "msw/node";
// let handlers = [
//   http.get(`${endpointURL}/episodes/list`, () => {
//     return HttpResponse.json(mockData.episodes);
//   }),
//   http.get(`${endpointURL}/episode/1`, () => {
//     return HttpResponse.json(mockData.episode1);
//   }),
//   http.get(`${endpointURL}/episode/2`, () => {
//     return HttpResponse.text("Not found", { status: 404 });
//   }),
//   http.put(`${endpointURL}/episode/1`, () => {
//     return HttpResponse.text("OK", { status: 200 });
//   }),
//   http.put(`${endpointURL}/episode/2`, () => {
//     return HttpResponse.text("Internal server error", { status: 500 });
//   }),
// ];

// let server = setupServer(...handlers);

// // Establish API mocking before all tests
// beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// // Reset any request handlers that are declared during the tests
// afterEach(() => server.resetHandlers());

// // Clean up after the tests are finished
// afterAll(() => server.close());

let mockData = {
  episodes: ["1", "2", "3"],
  episode1: {
    title: "Episode 1",
    description: "Episode 1 description",
  },
};

class NoNetworkReplayer extends Replayer {
  async fetch(
    input: RequestInfo | URL | string,
    init?: RequestInit,
  ): Promise<Response> {
    let request = new Request(input, init);
    let { method, url } = request;
    let req = `${method} ${new URL(url).pathname}`;

    switch (req) {
      case "GET /api/episodes/list":
        return new Response(JSON.stringify(mockData.episodes), {
          status: 200,
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
      case "GET /api/episode/1":
        return new Response(JSON.stringify(mockData.episode1), {
          status: 200,
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
      case "GET /api/episode/2":
        return new Response("Not found", {
          status: 404,
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
      case "PUT /api/episode/1":
        return new Response("OK", {
          status: 200,
          headers: new Headers({
            "Content-Type": "text/plain",
          }),
        });
      case "PUT /api/episode/2":
        return new Response("Internal server error", {
          status: 500,
          headers: new Headers({
            "Content-Type": "text/plain",
          }),
        });
      default:
        return new Response(null, { status: 404 });
    }
  }
}

let { configure } = setup({
  cacheDir: "./.test-cache",
});

configure(new NoNetworkReplayer());

let endpointURL = "http://localhost:8787/api";

test("list episodes", async () => {
  const dataClient = new DataClient(endpointURL);
  const episodes = await dataClient.listEpisodes();
  expect(episodes).toEqual(mockData.episodes);
});

test("get episode metadata", async () => {
  const dataClient = new DataClient(endpointURL);
  const episode = await dataClient.getEpisodeMetadata("1");
  expect(episode).toEqual(mockData.episode1);
});

test("put episode metadata", async () => {
  const dataClient = new DataClient(endpointURL);
  const response = await dataClient.putEpisodeMetadata("1", mockData.episode1);
  expect(response).toEqual("OK");
});

test("get episode metadata not found", async () => {
  const dataClient = new DataClient(endpointURL);
  const episode = await dataClient.getEpisodeMetadata("2");
  expect(episode).toEqual("Not found");
});

test("put episode metadata error", async () => {
  const dataClient = new DataClient(endpointURL);
  const response = await dataClient.putEpisodeMetadata("2", mockData.episode1);
  expect(response).toEqual("Internal server error");
});
