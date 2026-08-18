import { describe, it, expect } from "vitest";
import { toAdminGalleryImages } from "./gallery";
import type { GalleryImage } from "@/db/schema";

describe("toAdminGalleryImages", () => {
  it("maps DB rows to the AdminGalleryImage shape", () => {
    const rows: GalleryImage[] = [
      {
        id: 1,
        category: "residential",
        filename: "sunset-view.jpg",
        displayName: "Sunset View",
        status: "active",
        width: 1600,
        height: 1200,
        uploadedAt: new Date("2026-08-01T00:00:00Z"),
      },
    ];

    const result = toAdminGalleryImages(rows);

    expect(result).toEqual([
      {
        id: "1",
        src: "/images/gallery/residential/sunset-view.jpg",
        name: "Sunset View",
        category: "residential",
        width: 1600,
        height: 1200,
        status: "active",
      },
    ]);
  });
});
