import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/**
 * Global response headers. Vercel already sets HSTS at the edge, so
 * we layer on the remaining defensive headers here.
 *
 * Deliberately NOT enabled:
 *   - Content-Security-Policy. An earlier attempt at CSP-Report-Only
 *     correlated with Brave failing to render the page (see git
 *     history around 8f30c38). A real CSP needs careful per-directive
 *     tuning and report-only soak time before going live.
 */
const securityHeaders = [
  // Browsers can't sniff the response into a different MIME type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Refuse to be embedded in iframes (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Trim referrer information sent to other origins.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Deny all powerful features we don't use; the few we might want
  // later (e.g. fullscreen) can be opted back in by name.
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "midi=()",
      "magnetometer=()",
      "accelerometer=()",
      "gyroscope=()",
      "interest-cohort=()",
    ].join(", "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
