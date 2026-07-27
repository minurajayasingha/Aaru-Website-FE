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

  it("reads subfolders as headed sections with src/alt built from the folder and file names", () => {
    const suitViewDir = path.join(tempDir, "residential", "suit-view");
    fs.mkdirSync(suitViewDir, { recursive: true });
    fs.writeFileSync(path.join(suitViewDir, "poolside-sunset-01.jpg"), "fake");
    fs.writeFileSync(path.join(suitViewDir, "aerial-view.png"), "fake");

    const categories = getGalleryCategories(tempDir);
    const residential = categories.find((category) => category.id === "residential");

    expect(residential?.sections).toEqual([
      {
        slug: "suit-view",
        heading: "Suit View",
        images: [
          {
            src: "/images/gallery/residential/suit-view/aerial-view.png",
            alt: "Aerial View — Suit View — Aaru Residential Gallery",
            width: 4,
            height: 3,
          },
          {
            src: "/images/gallery/residential/suit-view/poolside-sunset-01.jpg",
            alt: "Poolside Sunset 01 — Suit View — Aaru Residential Gallery",
            width: 4,
            height: 3,
          },
        ],
      },
    ]);
  });

  it("sorts subfolders alphabetically and images within each subfolder alphabetically", () => {
    const residentialDir = path.join(tempDir, "residential");
    fs.mkdirSync(path.join(residentialDir, "suit-room"), { recursive: true });
    fs.mkdirSync(path.join(residentialDir, "suit-view"), { recursive: true });
    fs.writeFileSync(path.join(residentialDir, "suit-room", "c.jpg"), "fake");
    fs.writeFileSync(path.join(residentialDir, "suit-room", "a.jpg"), "fake");
    fs.writeFileSync(path.join(residentialDir, "suit-view", "aerial.jpg"), "fake");

    const categories = getGalleryCategories(tempDir);
    const residential = categories.find((category) => category.id === "residential");

    expect(residential?.sections.map((section) => section.slug)).toEqual(["suit-room", "suit-view"]);
    expect(residential?.sections[0].images.map((image) => image.src)).toEqual([
      "/images/gallery/residential/suit-room/a.jpg",
      "/images/gallery/residential/suit-room/c.jpg",
    ]);
  });

  it("groups loose image files directly in the category folder into a single unheaded section", () => {
    const interiorDir = path.join(tempDir, "interior");
    fs.mkdirSync(interiorDir, { recursive: true });
    fs.writeFileSync(path.join(interiorDir, "bedroom.jpg"), "fake");

    const categories = getGalleryCategories(tempDir);
    const interior = categories.find((category) => category.id === "interior");

    expect(interior?.sections).toEqual([
      {
        slug: "_root",
        heading: null,
        images: [
          {
            src: "/images/gallery/interior/bedroom.jpg",
            alt: "Bedroom — Aaru Interior Gallery",
            width: 4,
            height: 3,
          },
        ],
      },
    ]);
  });

  it("returns no sections for a category whose folder doesn't exist", () => {
    const categories = getGalleryCategories(tempDir);
    expect(categories.every((category) => category.sections.length === 0)).toBe(true);
  });

  it("skips subfolders that contain no image files", () => {
    const emptySubfolder = path.join(tempDir, "lifestyle", "empty-folder");
    fs.mkdirSync(emptySubfolder, { recursive: true });
    fs.writeFileSync(path.join(emptySubfolder, "notes.txt"), "fake");

    const categories = getGalleryCategories(tempDir);
    const lifestyle = categories.find((category) => category.id === "lifestyle");

    expect(lifestyle?.sections).toEqual([]);
  });

  it("filters out non-image files like .DS_Store or .txt", () => {
    const suitRoomDir = path.join(tempDir, "residential", "suit-room");
    fs.mkdirSync(suitRoomDir, { recursive: true });
    fs.writeFileSync(path.join(suitRoomDir, "real-photo.jpg"), "fake");
    fs.writeFileSync(path.join(suitRoomDir, ".DS_Store"), "fake");
    fs.writeFileSync(path.join(suitRoomDir, "notes.txt"), "fake");

    const categories = getGalleryCategories(tempDir);
    const residential = categories.find((category) => category.id === "residential");

    expect(residential?.sections[0].images).toHaveLength(1);
    expect(residential?.sections[0].images[0].src).toBe("/images/gallery/residential/suit-room/real-photo.jpg");
  });

  it("orders subfolders by a leading number prefix instead of alphabetically, and strips it from the heading", () => {
    const residentialDir = path.join(tempDir, "residential");
    fs.mkdirSync(path.join(residentialDir, "2-suit-view"), { recursive: true });
    fs.mkdirSync(path.join(residentialDir, "1-suit-room"), { recursive: true });
    fs.writeFileSync(path.join(residentialDir, "2-suit-view", "a.jpg"), "fake");
    fs.writeFileSync(path.join(residentialDir, "1-suit-room", "a.jpg"), "fake");

    const categories = getGalleryCategories(tempDir);
    const residential = categories.find((category) => category.id === "residential");

    expect(residential?.sections.map((section) => section.heading)).toEqual(["Suit Room", "Suit View"]);
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
