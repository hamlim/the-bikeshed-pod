import episodeMetadata from "../../episode-metadata.json";

export default async function RSSRoute() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/rss.xsl"?>
    <rss version="2.0" 
         xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
         xmlns:podcast="https://podcastindex.org/namespace/1.0"
         xmlns:atom="http://www.w3.org/2005/Atom"
         xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>The Bikeshed Pod</title>
        <description>The Bikeshed Pod is a weekly show where developers dive deep into the small but important details of software development that we all love to debate.</description>
        <link>https://bikeshedpod.com</link>
        <language>en-us</language>
        <atom:link href="https://bikeshedpod.com/rss.xml" rel="self" type="application/rss+xml"/>
        <itunes:category text="Technology"/>
        <itunes:explicit>true</itunes:explicit>
        <itunes:image href="https://bikeshedpod.com/logo.png"/>

        <!-- Recommended Channel Elements -->
        <podcast:locked>no</podcast:locked>
        <podcast:guid>bikeshed-podcast</podcast:guid>
        <itunes:author>The Bikeshed Pod Team</itunes:author>

        <!-- Optional Channel Elements -->
        <copyright>© ${new Date().getFullYear()} The Bikeshed Pod</copyright>
        <itunes:type>episodic</itunes:type>

        ${episodeMetadata
          .map(
            (episode) => `
          <item>
            <!-- Required Item Elements -->
            <title>${episode.title}</title>
            <enclosure url="${episode.audioURL}" 
                      type="audio/mpeg" 
                      length="${episode.fileSizeBytes}"/>
            <guid isPermaLink="false">${episode.episodeId.toLowerCase()}</guid>

            <!-- Recommended Item Elements -->
            <link>https://bikeshedpod.com/episodes/${episode.episodeId.toLowerCase()}/${episode.slug}</link>
            <pubDate>${new Date(episode.publishTime).toUTCString()}</pubDate>
            <description><![CDATA[${episode.shortDescription}]]></description>
            <content:encoded><![CDATA[${episode.longDescription}]]></content:encoded>
            <itunes:duration>${episode.duration}</itunes:duration>
            ${episode.captionURL ? `<podcast:transcript url="${episode.captionURL}" type="text/vtt"/>` : ""}
            <itunes:explicit>true</itunes:explicit>
          </item>
        `,
          )
          .join("\n")}
      </channel>
    </rss>`,
    {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
