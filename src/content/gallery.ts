import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

export type GalleryCategory = "residential" | "interior" | "lifestyle" | "maps";

export type GalleryImage = { src: string; alt: string; width: number; height: number };

export type GallerySection = {
  slug: string;
  heading: string | null;
  images: GalleryImage[];
};

export type GalleryCategoryContent = {
  id: GalleryCategory;
  label: string;
  icon: string;
  sections: GallerySection[];
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
 * Folders/files can be prefixed with a number to control display order
 * independently of alphabetical sort, e.g. "1-suit-view", "2-suit-room".
 * The prefix is stripped before it's turned into a heading or alt text.
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

function buildAltText(fileName: string, contextLabel: string): string {
  const baseName = stripOrderPrefix(fileName.slice(0, fileName.length - path.extname(fileName).length));
  const titleCased = toTitleCase(baseName);
  return titleCased ? `${titleCased} — ${contextLabel}` : contextLabel;
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

function readImagesInFolder(folderPath: string, urlPrefix: string, altContext: string): GalleryImage[] {
  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(folderPath);
  } catch {
    return [];
  }

  return fileNames
    .filter(isImageFile)
    .sort(compareBySortPrefix)
    .map((fileName) => ({
      src: `${urlPrefix}/${fileName}`,
      alt: buildAltText(fileName, altContext),
      ...readImageDimensions(path.join(folderPath, fileName)),
    }));
}

/**
 * Each category folder can contain subfolders (e.g. "suit-view", "suit-room"),
 * each rendered as its own labeled section. Loose image files directly in the
 * category folder (no subfolder) still render, grouped as a single unheaded
 * section, for backward compatibility with categories not yet reorganized.
 *
 * Subfolders (and loose files) sort alphabetically by default. Prefix a name
 * with a number — "1-suit-view", "2-suit-room" — to control the order
 * manually; the number is stripped from the displayed heading/alt text.
 */
export function getGalleryCategories(
  baseDir: string = path.join(process.cwd(), "public", "images", "gallery"),
): GalleryCategoryContent[] {
  return galleryCategories.map((category) => {
    const categoryDir = path.join(baseDir, category.id);
    const sections: GallerySection[] = [];

    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(categoryDir, { withFileTypes: true });
    } catch {
      return { ...category, sections };
    }

    const looseImages = readImagesInFolder(
      categoryDir,
      `/images/gallery/${category.id}`,
      `Aaru ${category.label} Gallery`,
    );
    if (looseImages.length > 0) {
      sections.push({ slug: "_root", heading: null, images: looseImages });
    }

    const subfolderSlugs = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort(compareBySortPrefix);

    for (const slug of subfolderSlugs) {
      const heading = toTitleCase(stripOrderPrefix(slug));
      const images = readImagesInFolder(
        path.join(categoryDir, slug),
        `/images/gallery/${category.id}/${slug}`,
        `${heading} — Aaru ${category.label} Gallery`,
      );
      if (images.length > 0) {
        sections.push({ slug, heading, images });
      }
    }

    return { ...category, sections };
  });
}
