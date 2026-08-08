import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

export type GalleryCategory = "residential" | "interior" | "lifestyle" | "maps";

export type GalleryImage = { src: string; alt: string; width: number; height: number };

export type GalleryCategoryContent = {
  id: GalleryCategory;
  label: string;
  icon: string;
  images: GalleryImage[];
};

export const galleryCategories: { id: GalleryCategory; label: string; icon: string }[] = [
  { id: "residential", label: "Residential", icon: "/images/icons/gallery/residential.svg" },
  { id: "interior", label: "Interior", icon: "/images/icons/gallery/interior.svg" },
  { id: "lifestyle", label: "Lifestyle", icon: "/images/icons/gallery/lifestyle.svg" },
  { id: "maps", label: "Maps & Plans", icon: "/images/icons/gallery/maps.svg" },
];

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const DEFAULT_ASPECT = { width: 4, height: 3 };

function isImageFile(fileName: string): boolean {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

/**
 * Files can be prefixed with a number to control display order independently
 * of alphabetical sort, e.g. "1-poolside.jpg", "2-aerial.jpg". The prefix is
 * stripped before it's turned into alt text.
 */
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

function buildAltText(fileName: string, categoryLabel: string): string {
  const baseName = stripOrderPrefix(fileName.slice(0, fileName.length - path.extname(fileName).length));
  const titleCased = toTitleCase(baseName);
  return titleCased ? `${titleCased} — Aaru ${categoryLabel} Gallery` : `Aaru ${categoryLabel} Gallery`;
}

function readImageDimensions(filePath: string): { width: number; height: number } {
  try {
    const buffer = fs.readFileSync(filePath);
    const { width, height } = imageSize(buffer);
    return width && height ? { width, height } : DEFAULT_ASPECT;
  } catch {
    return DEFAULT_ASPECT;
  }
}

type FoundImage = { relativePath: string; absolutePath: string };

/**
 * Walks a category folder recursively and collects every image file inside
 * it, however deep. Dropping photos straight into the category folder is
 * all that's needed; any leftover subfolders from before still get picked
 * up too, just flattened into the same list.
 */
function findImagesRecursively(dir: string, relativeDir = ""): FoundImage[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const found: FoundImage[] = [];
  for (const entry of entries) {
    const relativePath = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      found.push(...findImagesRecursively(path.join(dir, entry.name), relativePath));
    } else if (isImageFile(entry.name)) {
      found.push({ relativePath, absolutePath: path.join(dir, entry.name) });
    }
  }
  return found;
}

/**
 * Each of the 4 fixed categories is a single flat gallery — drop photos
 * straight into `public/images/gallery/<category>/` and they show up
 * automatically, each sized to its own real aspect ratio (via `image-size`)
 * so landscape and portrait/square photos lay out correctly instead of
 * being forced into a mismatched crop. Sorts by file name; prefix a
 * filename with a number ("1-hero.jpg") to control the order manually.
 */
export function getGalleryCategories(
  baseDir: string = path.join(process.cwd(), "public", "images", "gallery"),
): GalleryCategoryContent[] {
  return galleryCategories.map((category) => {
    const categoryDir = path.join(baseDir, category.id);
    const images = findImagesRecursively(categoryDir)
      .sort((a, b) => compareBySortPrefix(a.relativePath, b.relativePath))
      .map(({ relativePath, absolutePath }) => ({
        src: `/images/gallery/${category.id}/${relativePath}`,
        alt: buildAltText(path.basename(relativePath), category.label),
        ...readImageDimensions(absolutePath),
      }));

    return { ...category, images };
  });
}
