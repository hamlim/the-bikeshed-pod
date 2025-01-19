export class DataClient {
  endpointURL: string;

  // map from episodeId to metadata
  metadataCache: Map<string, any> = new Map();
  // set of episodeIds
  episodesCache: Set<string> = new Set();

  constructor(endpointURL: string = process.env.API_URL) {
    this.endpointURL = endpointURL;
  }

  async getEpisodeMetadata(episodeId: string) {
    let metadata: any;
    if (this.metadataCache.has(episodeId)) {
      return this.metadataCache.get(episodeId);
    }
    const response = await fetch(`${this.endpointURL}/episode/${episodeId}`);
    if (response.status === 404) {
      return "Not found";
    }
    metadata = await response.json();
    this.metadataCache.set(episodeId, metadata);
    return metadata;
  }

  async putEpisodeMetadata(episodeId: string, metadata: any) {
    const response = await fetch(`${this.endpointURL}/episode/${episodeId}`, {
      method: "PUT",
      body: JSON.stringify(metadata),
    });
    return response.text();
  }

  async listEpisodes() {
    if (this.episodesCache.size > 0) {
      return Array.from(this.episodesCache);
    }
    let response = await fetch(`${this.endpointURL}/episodes/list`);
    let episodes = (await response.json()) as Array<string>;
    for (let episode of episodes) {
      this.episodesCache.add(episode);
    }
    return Array.from(this.episodesCache);
  }
}
