import type { MiddlewareHandler } from "hono";
import { contextStorage } from "hono/context-storage";
import { fsRouter } from "waku";
import adapter from "waku/adapters/cloudflare";

// Workaround https://github.com/cloudflare/workers-sdk/issues/6577
function isWranglerDev(headers?: Headers): boolean {
  // This header seems to only be set for production cloudflare workers
  return !headers?.get("cf-visitor");
}

let rscPattern = /\/RSC\//;

let cloudflareMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    await next();
    // no index RSC requests/responses
    if (rscPattern.test(c.req.path)) {
      c.header("X-Robots-Tag", "noindex");
    }
    if (!import.meta.env?.PROD) {
      return;
    }
    if (!isWranglerDev(c.req.raw.headers)) {
      return;
    }
    let contentType = c.res.headers.get("content-type");
    if (
      !contentType ||
      contentType.includes("text/html") ||
      contentType.includes("text/plain")
    ) {
      c.res.headers.set("content-encoding", "Identity");
    }
  };
};

function httpsUpgradeMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    // Redirect HTTP to HTTPS in production
    if (import.meta.env?.PROD) {
      // In Cloudflare Workers, check the cf-visitor header to determine the original scheme
      let cfVisitor = c.req.header("cf-visitor");
      let isHttp = false;

      console.log("cfVisitor", cfVisitor);

      if (cfVisitor) {
        try {
          let visitor = JSON.parse(cfVisitor);
          isHttp = visitor.scheme === "http";
        } catch {
          // Fallback to x-forwarded-proto header if cf-visitor is not valid JSON
          let proto = c.req.header("x-forwarded-proto");
          isHttp = proto === "http";
        }
      } else {
        // Fallback to x-forwarded-proto header
        let proto = c.req.header("x-forwarded-proto");
        isHttp = proto === "http";
      }

      console.log("isHttp", isHttp);
      console.log("c.req.url", c.req.url);

      if (isHttp) {
        let url = new URL(c.req.url);
        url.protocol = "https:";
        console.log("redirecting http traffic to https, url:", url.toString());
        return c.redirect(url.toString(), 301);
      }
    }
    await next();
  };
}

export default adapter(
  fsRouter(import.meta.glob("./**/*.{tsx,ts}", { base: "./pages" })),
  {
    middlewareFns: [
      contextStorage,
      cloudflareMiddleware,
      httpsUpgradeMiddleware,
    ],
  },
);
