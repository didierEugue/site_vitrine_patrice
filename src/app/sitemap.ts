import type { MetadataRoute } from "next";

import { articles } from "@/content/articles";
import { site } from "@/content/site";

const STATIC_ROUTES: Array<{ path: string; priority: number; freq: "weekly" | "monthly" }> = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/cabinet", priority: 0.8, freq: "monthly" },
  { path: "/expertises", priority: 0.9, freq: "monthly" },
  { path: "/facturation-electronique", priority: 0.9, freq: "weekly" },
  { path: "/actualites", priority: 0.8, freq: "weekly" },
  { path: "/espace-client", priority: 0.7, freq: "monthly" },
  { path: "/contact", priority: 0.7, freq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/actualites/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
