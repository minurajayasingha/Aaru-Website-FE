import { describe, it, expect } from "vitest";
import { buildMetadata } from "./metadata";

describe("buildMetadata", () => {
  it("builds title, description, canonical, and OG fields", () => {
    const metadata = buildMetadata({
      title: "Residences",
      description: "Explore Aaru's residences: Garden Condos, Condos, and Private Villas.",
      path: "/residences",
    });

    expect(metadata.title).toBe("Residences");
    expect(metadata.description).toBe(
      "Explore Aaru's residences: Garden Condos, Condos, and Private Villas."
    );
    expect(metadata.alternates?.canonical).toBe("/residences");
    expect(metadata.openGraph?.url).toBe("/residences");
    expect(metadata.openGraph?.images).toEqual([{ url: "/images/og/default.jpg" }]);
  });

  it("uses a custom OG image when imagePath is provided", () => {
    const metadata = buildMetadata({
      title: "Gallery",
      description: "Discover Aaru through stunning visual stories.",
      path: "/gallery",
      imagePath: "/images/og/gallery.jpg",
    });

    expect(metadata.openGraph?.images).toEqual([{ url: "/images/og/gallery.jpg" }]);
  });
});
