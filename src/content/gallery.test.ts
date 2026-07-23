import fs from "fs";
import os from "os";
import path from "path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getGalleryImages, galleryCategories } from "./gallery";

describe("getGalleryImages", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gallery-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("reads images from category folders and builds src/alt/category", () => {
    const residentialDir = path.join(tempDir, "residential");
    const interiorDir = path.join(tempDir, "interior");
    fs.mkdirSync(residentialDir, { recursive: true });
    fs.mkdirSync(interiorDir, { recursive: true });
    fs.writeFileSync(path.join(residentialDir, "poolside-sunset-01.jpg"), "fake");
    fs.writeFileSync(path.join(residentialDir, "aerial-view.png"), "fake");
    fs.writeFileSync(path.join(interiorDir, "suite-bedroom.webp"), "fake");

    const images = getGalleryImages(tempDir);

    expect(images).toEqual([
      {
        src: "/images/gallery/residential/aerial-view.png",
        alt: "Aerial View — Aaru Residential Gallery",
        category: "residential",
      },
      {
        src: "/images/gallery/residential/poolside-sunset-01.jpg",
        alt: "Poolside Sunset 01 — Aaru Residential Gallery",
        category: "residential",
      },
      {
        src: "/images/gallery/interior/suite-bedroom.webp",
        alt: "Suite Bedroom — Aaru Interior Gallery",
        category: "interior",
      },
    ]);
  });

  it("sorts filenames alphabetically within a category", () => {
    const lifestyleDir = path.join(tempDir, "lifestyle");
    fs.mkdirSync(lifestyleDir, { recursive: true });
    fs.writeFileSync(path.join(lifestyleDir, "c-image.jpg"), "fake");
    fs.writeFileSync(path.join(lifestyleDir, "a-image.jpg"), "fake");
    fs.writeFileSync(path.join(lifestyleDir, "b-image.jpg"), "fake");

    const images = getGalleryImages(tempDir).filter((image) => image.category === "lifestyle");

    expect(images.map((image) => image.src)).toEqual([
      "/images/gallery/lifestyle/a-image.jpg",
      "/images/gallery/lifestyle/b-image.jpg",
      "/images/gallery/lifestyle/c-image.jpg",
    ]);
  });

  it("returns no images for a category whose folder doesn't exist", () => {
    // tempDir has no subfolders at all
    const images = getGalleryImages(tempDir);
    expect(images).toEqual([]);
  });

  it("returns no images for a category folder that exists but is empty", () => {
    const mapsDir = path.join(tempDir, "maps");
    fs.mkdirSync(mapsDir, { recursive: true });

    const images = getGalleryImages(tempDir);
    expect(images.filter((image) => image.category === "maps")).toEqual([]);
  });

  it("filters out non-image files like .DS_Store or .txt", () => {
    const interiorDir = path.join(tempDir, "interior");
    fs.mkdirSync(interiorDir, { recursive: true });
    fs.writeFileSync(path.join(interiorDir, "real-photo.jpg"), "fake");
    fs.writeFileSync(path.join(interiorDir, ".DS_Store"), "fake");
    fs.writeFileSync(path.join(interiorDir, "notes.txt"), "fake");

    const images = getGalleryImages(tempDir).filter((image) => image.category === "interior");

    expect(images).toHaveLength(1);
    expect(images[0].src).toBe("/images/gallery/interior/real-photo.jpg");
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
