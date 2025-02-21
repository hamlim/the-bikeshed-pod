import rssData from "./rss.json";

export default async function RSSRoute() {
  return Response.json(rssData);
}
