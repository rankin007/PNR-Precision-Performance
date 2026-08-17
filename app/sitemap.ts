import type { MetadataRoute } from "next";

const siteUrl = "https://precisionperformance.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/pricing`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
