import nodeLoaderCloudflare from "@hiogawa/node-loader-cloudflare/vite";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import tailwindcss from "@tailwindcss/vite";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "waku/config";

const mdxPlugin = mdx({
  remarkPlugins: [
    remarkFrontmatter,
    [remarkMdxFrontmatter, { name: "frontmatter" }],
    remarkGfm,
    remarkFlexibleMarkers,
  ],
  rehypePlugins: [
    rehypeMdxCodeProps,
    [
      rehypeShiki,
      {
        themes: {
          light: "vitesse-light",
          dark: "vitesse-dark",
        },
      },
    ],
  ],
  providerImportSource: "#utils/mdx-components",
});

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "#/*": "./src/*",
      },
    },
    plugins: [
      mdxPlugin,
      tailwindcss(),
      nodeLoaderCloudflare({
        environments: ["rsc"],
        build: true,
        // https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy
        getPlatformProxyOptions: {
          persist: {
            path: ".wrangler/state/v3",
          },
        },
      }),
    ],
  },
});
