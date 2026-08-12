import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { residences } from "@/content/residences";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/commercial-space", "/gallery", "/contact"];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const residenceEntries: MetadataRoute.Sitemap = residences.map((residence) => ({
    url: `${siteConfig.url}/residences/${residence.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...residenceEntries];
}
