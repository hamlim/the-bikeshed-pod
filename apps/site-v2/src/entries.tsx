/* this file is automatically generated by garbanzo */
/* DO NOT MANUALLY EDIT THIS FILE */

import { createPages } from "waku";
import type { PathsForPages } from "waku/router";

import layout0 from "./app/@layout";
import root1 from "./app/@root";
import page2 from "./app/about/page";
import route3 from "./app/api/greet/route";
import page4 from "./app/episodes/bike-1/page";
import page5 from "./app/episodes/ignored/page";
import page6 from "./app/episodes/page";
import page7 from "./app/page";
import route8 from "./app/rss/route";
import page9 from "./app/search/page";

let pages = createPages(async ({ createPage, createLayout, createRoot, createApi }) => [
createLayout({
  render: "dynamic",
  path: "/",
  component: layout0,
}),
createRoot({
  render: "dynamic",
  component: root1,
}),
createPage({
  render: "dynamic",
  path: "/about",
  component: page2,
}),
createApi({
  render: "dynamic",
  path: "/api/greet",
  handlers: {
    GET: route3,
    POST: route3,
    PUT: route3,
    DELETE: route3,
    PATCH: route3,
  },
}),
createPage({
  render: "dynamic",
  path: "/episodes/bike-1",
  component: page4,
}),
createPage({
  render: "dynamic",
  path: "/episodes/ignored",
  component: page5,
}),
createPage({
  render: "dynamic",
  path: "/episodes",
  component: page6,
}),
createPage({
  render: "dynamic",
  path: "/",
  component: page7,
}),
createApi({
  render: "dynamic",
  path: "/rss",
  handlers: {
    GET: route8,
    POST: route8,
    PUT: route8,
    DELETE: route8,
    PATCH: route8,
  },
}),
createPage({
  render: "dynamic",
  path: "/search",
  component: page9,
}),
]);

declare module "waku/router" {
  interface RouteConfig {
    paths: PathsForPages<typeof pages>;
  }
  interface CreatePagesConfig {
    pages: typeof pages;
  }
}

export default pages;