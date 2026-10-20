import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Necesario para la exportación estática (output: "export").
export const dynamic = "force-static";

/** Landing page de una sola URL. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.url, changeFrequency: "monthly", priority: 1 }];
}
