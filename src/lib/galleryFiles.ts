import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import type { GalleryCategory } from "@/content/gallery";

const GALLERY_ROOT = path.join(process.cwd(), "public", "images", "gallery");
const ARCHIVE_ROOT = path.join(process.cwd(), "storage", "gallery-archive");
const DEFAULT_ASPECT = { width: 4, height: 3 };

export function sanitizeFileBaseName(input: string): string {
  const slug = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug.length > 0 ? slug : "image";
}

export function resolveUniqueFilename(dir: string, baseName: string, extension: string): string {
  let candidate = `${baseName}${extension}`;
  let counter = 2;
  while (fs.existsSync(path.join(dir, candidate))) {
    candidate = `${baseName}-${counter}${extension}`;
    counter += 1;
  }
  return candidate;
}

export function getCategoryDir(category: GalleryCategory, baseDir: string = GALLERY_ROOT): string {
  return path.join(baseDir, category);
}

export function writeGalleryFile(
  category: GalleryCategory,
  filename: string,
  buffer: Buffer,
  baseDir: string = GALLERY_ROOT
): void {
  const categoryDir = getCategoryDir(category, baseDir);
  fs.mkdirSync(categoryDir, { recursive: true });
  fs.writeFileSync(path.join(categoryDir, filename), buffer);
}

export function renameGalleryFile(
  category: GalleryCategory,
  oldFilename: string,
  newFilename: string,
  baseDir: string = GALLERY_ROOT
): void {
  const categoryDir = getCategoryDir(category, baseDir);
  fs.renameSync(path.join(categoryDir, oldFilename), path.join(categoryDir, newFilename));
}

export function archiveGalleryFile(
  category: GalleryCategory,
  filename: string,
  baseDir: string = GALLERY_ROOT,
  archiveDir: string = ARCHIVE_ROOT
): void {
  const sourcePath = path.join(getCategoryDir(category, baseDir), filename);
  const targetCategoryDir = path.join(archiveDir, category);
  fs.mkdirSync(targetCategoryDir, { recursive: true });

  let targetPath = path.join(targetCategoryDir, filename);
  if (fs.existsSync(targetPath)) {
    const ext = path.extname(filename);
    const base = filename.slice(0, filename.length - ext.length);
    targetPath = path.join(targetCategoryDir, `${base}-${Date.now()}${ext}`);
  }

  fs.renameSync(sourcePath, targetPath);
}

export function readImageDimensions(buffer: Buffer): { width: number; height: number } {
  try {
    const { width, height } = imageSize(buffer);
    return width && height ? { width, height } : DEFAULT_ASPECT;
  } catch {
    return DEFAULT_ASPECT;
  }
}
