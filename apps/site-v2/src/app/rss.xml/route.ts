import episodeMetadata from "../../episode-metadata.json";

export default async function RSSRoute() {
  return Response.json(episodeMetadata);
}
