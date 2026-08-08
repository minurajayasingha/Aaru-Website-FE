import fs from "fs";
import os from "os";
import path from "path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getGalleryCategories, galleryCategories } from "./gallery";

describe("getGalleryCategories", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gallery-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("reads every image dropped directly into the category folder", () => {
    const residentialDir = path.join(tempDir, "residential");
    fs.mkdirSync(residentialDir, { recursive: true });
    fs.writeFileSync(path.join(residentialDir, "poolside-sunset-01.jpg"), "fake");
    fs.writeFileSync(path.join(residentialDir, "aerial-view.png"), "fake");

    const categories = getGalleryCategories(tempDir);
    const residential = categories.find((category) => category.id === "residential");

    expect(residential?.images).toEqual([
      {
        src: "/images/gallery/residential/aerial-view.png",
        alt: "Aerial View — Aaru Residential Gallery",
        width: 4,
        height: 3,
      },
      {
        src: "/images/gallery/residential/poolside-sunset-01.jpg",
        alt: "Poolside Sunset 01 — Aaru Residential Gallery",
        width: 4,
        height: 3,
      },
    ]);
  });

  it("sorts images alphabetically by default", () => {
    const residentialDir = path.join(tempDir, "residential");
    fs.mkdirSync(residentialDir, { recursive: true });
    fs.writeFileSync(path.join(residentialDir, "c.jpg"), "fake");
    fs.writeFileSync(path.join(residentialDir, "a.jpg"), "fake");
    fs.writeFileSync(path.join(residentialDir, "b.jpg"), "fake");

    const categories = getGalleryCategories(tempDir);
    const residential = categories.find((category) => category.id === "residential");

    expect(residential?.images.map((image) => image.src)).toEqual([
      "/images/gallery/residential/a.jpg",
      "/images/gallery/residential/b.jpg",
      "/images/gallery/residential/c.jpg",
    ]);
  });

  it("orders images by a leading number prefix instead of alphabetically, and strips it from alt text", () => {
    const residentialDir = path.join(tempDir, "residential");
    fs.mkdirSync(residentialDir, { recursive: true });
    fs.writeFileSync(path.join(residentialDir, "2-second.jpg"), "fake");
    fs.writeFileSync(path.join(residentialDir, "1-first.jpg"), "fake");

    const categories = getGalleryCategories(tempDir);
    const residential = categories.find((category) => category.id === "residential");

    expect(residential?.images.map((image) => image.alt)).toEqual([
      "First — Aaru Residential Gallery",
      "Second — Aaru Residential Gallery",
    ]);
  });

  it("still picks up images left over in subfolders, flattened into the same list", () => {
    const residentialDir = path.join(tempDir, "residential");
    fs.mkdirSync(path.join(residentialDir, "suit-view"), { recursive: true });
    fs.writeFileSync(path.join(residentialDir, "loose.jpg"), "fake");
    fs.writeFileSync(path.join(residentialDir, "suit-view", "nested.jpg"), "fake");

    const categories = getGalleryCategories(tempDir);
    const residential = categories.find((category) => category.id === "residential");

    expect(residential?.images.map((image) => image.src).sort()).toEqual([
      "/images/gallery/residential/loose.jpg",
      "/images/gallery/residential/suit-view/nested.jpg",
    ]);
  });

  it("returns no images for a category whose folder doesn't exist", () => {
    const categories = getGalleryCategories(tempDir);
    expect(categories.every((category) => category.images.length === 0)).toBe(true);
  });

  it("filters out non-image files like .DS_Store or .txt", () => {
    const residentialDir = path.join(tempDir, "residential");
    fs.mkdirSync(residentialDir, { recursive: true });
    fs.writeFileSync(path.join(residentialDir, "real-photo.jpg"), "fake");
    fs.writeFileSync(path.join(residentialDir, ".DS_Store"), "fake");
    fs.writeFileSync(path.join(residentialDir, "notes.txt"), "fake");

    const categories = getGalleryCategories(tempDir);
    const residential = categories.find((category) => category.id === "residential");

    expect(residential?.images).toHaveLength(1);
    expect(residential?.images[0].src).toBe("/images/gallery/residential/real-photo.jpg");
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
