import fs from "fs";
import path from "path";

export type GalleryImage = { src: string; alt: string; category: GalleryCategory };
export type GalleryCategory = "residential" | "interior" | "lifestyle" | "maps";

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "residential", label: "Residential" },
  { id: "interior", label: "Interior" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "maps", label: "Maps & Plans" },
];

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function toTitleCase(input: string): string {
  return input
    .replace(/[-_]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function buildAltText(fileName: string, categoryLabel: string): string {
  const baseName = fileName.slice(0, fileName.length - path.extname(fileName).length);
  const titleCased = toTitleCase(baseName);
  const description = `Aaru ${categoryLabel} Gallery`;
  return titleCased ? `${titleCased} — ${description}` : description;
}

export function getGalleryImages(baseDir: string = path.join(process.cwd(), "public", "images", "gallery")): GalleryImage[] {
  const images: GalleryImage[] = [];

  for (const category of galleryCategories) {
    const categoryDir = path.join(baseDir, category.id);

    let fileNames: string[];
    try {
      fileNames = fs.readdirSync(categoryDir);
    } catch {
      continue;
    }

    const imageFileNames = fileNames
      .filter((fileName) => IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
      .sort((a, b) => a.localeCompare(b));

    for (const fileName of imageFileNames) {
      images.push({
        src: `/images/gallery/${category.id}/${fileName}`,
        alt: buildAltText(fileName, category.label),
        category: category.id,
      });
    }
  }

  return images;
}
