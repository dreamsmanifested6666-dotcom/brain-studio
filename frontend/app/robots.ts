import type { MetadataRoute } from "next";

/**
 * Robots policy for crawlers. Allows all user agents to crawl every
 * route except the dev-only `/test-*` sandboxes; points crawlers at
 * the generated sitemap.
 */

const BASE = "https://brain-studio-kappa.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/test-atmospherics", "/test-brain", "/test-scroll"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
