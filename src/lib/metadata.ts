import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

type BuildMetadataArgs = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
};

export function buildMetadata({ title, description, path, imagePath }: BuildMetadataArgs): Metadata {
  const image = imagePath ?? "/images/og/default.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
