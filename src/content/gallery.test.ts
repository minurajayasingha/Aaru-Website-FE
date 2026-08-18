import { describe, it, expect, vi, beforeEach } from "vitest";
import { getGalleryCategories, galleryCategories } from "./gallery";
import * as galleryImagesQueries from "@/db/queries/galleryImages";
import type { GalleryImage as GalleryImageRow } from "@/db/schema";

describe("getGalleryCategories", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns images grouped into their matching category, mapped to the public shape", async () => {
    const rows: GalleryImageRow[] = [
      {
        id: 1,
        category: "residential",
        filename: "aerial-view.png",
        displayName: "Aerial View",
        status: "active",
        width: 1600,
        height: 1200,
        uploadedAt: new Date(),
      },
    ];
    vi.spyOn(galleryImagesQueries, "getActiveGalleryImages").mockResolvedValue(rows);

    const categories = await getGalleryCategories();
    const residential = categories.find((category) => category.id === "residential");

    expect(residential?.images).toEqual([
      {
        src: "/images/gallery/residential/aerial-view.png",
        alt: "Aerial View — Aaru Residential Gallery",
        width: 1600,
        height: 1200,
      },
    ]);
  });

  it("returns an empty images array for every category when there are no active images", async () => {
    vi.spyOn(galleryImagesQueries, "getActiveGalleryImages").mockResolvedValue([]);

    const categories = await getGalleryCategories();

    expect(categories.every((category) => category.images.length === 0)).toBe(true);
  });

  it("only places each image under its own category", async () => {
    const rows: GalleryImageRow[] = [
      {
        id: 2,
        category: "interior",
        filename: "lobby.jpg",
        displayName: "Lobby",
        status: "active",
        width: 800,
        height: 600,
        uploadedAt: new Date(),
      },
    ];
    vi.spyOn(galleryImagesQueries, "getActiveGalleryImages").mockResolvedValue(rows);

    const categories = await getGalleryCategories();
    const interior = categories.find((category) => category.id === "interior");
    const residential = categories.find((category) => category.id === "residential");

    expect(interior?.images).toHaveLength(1);
    expect(residential?.images).toHaveLength(0);
  });

  it("covers all four fixed categories", () => {
    expect(galleryCategories.map((category) => category.id)).toEqual([
      "residential",
      "interior",
      "lifestyle",
      "maps",
    ]);
  });
});
