import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Necesario para la exportación estática (output: "export").
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/enviar-contacto.php" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
