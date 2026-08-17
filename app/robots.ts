import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/pricing", "/disclaimer"],
      disallow: [
        "/admin/",
        "/api/",
        "/auth/",
        "/data-entry/",
        "/portal/",
        "/sign-in",
      ],
    },
    sitemap: "https://precisionperformance.com.au/sitemap.xml",
    host: "https://precisionperformance.com.au",
  };
}
