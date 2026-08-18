import { config } from "dotenv";
config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import { galleryCategories } from "../src/content/gallery";
import { createGalleryImage } from "../src/db/queries/galleryImages";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const DEFAULT_ASPECT = { width: 4, height: 3 };

function isImageFile(fileName: string): boolean {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function stripOrderPrefix(input: string): string {
  return input.replace(/^\d+[-_.\s]+/, "");
}

function compareBySortPrefix(a: string, b: string): number {
  const aNum = a.match(/^\d+/);
  const bNum = b.match(/^\d+/);
  if (aNum && bNum) {
    const diff = parseInt(aNum[0], 10) - parseInt(bNum[0], 10);
    if (diff !== 0) return diff;
  }
  return a.localeCompare(b);
}

function toTitleCase(input: string): string {
  return input
    .replace(/[-_]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function deriveDisplayName(fileName: string): string {
  const baseName = stripOrderPrefix(fileName.slice(0, fileName.length - path.extname(fileName).length));
  const titleCased = toTitleCase(baseName);
  return titleCased.length > 0 ? titleCased : "Untitled";
}

function readDimensions(filePath: string): { width: number; height: number } {
  try {
    const buffer = fs.readFileSync(filePath);
    const { width, height } = imageSize(buffer);
    return width && height ? { width, height } : DEFAULT_ASPECT;
  } catch {
    return DEFAULT_ASPECT;
  }
}

function findImagesRecursively(dir: string, relativeDir = ""): string[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const found: string[] = [];
  for (const entry of entries) {
    const relativePath = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      found.push(...findImagesRecursively(path.join(dir, entry.name), relativePath));
    } else if (isImageFile(entry.name)) {
      found.push(relativePath);
    }
  }
  return found;
}

async function main() {
  const baseDir = path.join(process.cwd(), "public", "images", "gallery");
  let totalCreated = 0;

  for (const category of galleryCategories) {
    const categoryDir = path.join(baseDir, category.id);
    const relativePaths = findImagesRecursively(categoryDir).sort(compareBySortPrefix);

    for (const relativePath of relativePaths) {
      const absolutePath = path.join(categoryDir, relativePath);
      const { width, height } = readDimensions(absolutePath);
      const displayName = deriveDisplayName(path.basename(relativePath));

      await createGalleryImage({
        category: category.id,
        filename: relativePath,
        displayName,
        width,
        height,
      });
      totalCreated += 1;
      console.log(`Backfilled: ${category.id}/${relativePath}`);
    }
  }

  console.log(`Done. Backfilled ${totalCreated} image(s).`);
  process.exit(0);
}

main().catch((error) => {
  console.error("Backfill failed:", error);
  process.exit(1);
});
