import { NextResponse } from "next/server";
import path from "path";
import { createGalleryImage, deleteGalleryImage } from "@/db/queries/galleryImages";
import { toAdminGalleryImages } from "@/content/admin/gallery";
import {
  sanitizeFileBaseName,
  resolveUniqueFilename,
  getCategoryDir,
  writeGalleryFile,
  readImageDimensions,
} from "@/lib/galleryFiles";
import { galleryCategories, type GalleryCategory } from "@/content/gallery";

const VALID_CATEGORIES = galleryCategories.map((category) => category.id);
const ACCEPTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const category = formData.get("category");
    const file = formData.get("file");
    const displayNameInput = formData.get("displayName");

    if (typeof category !== "string" || !VALID_CATEGORIES.includes(category as GalleryCategory)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "An image file is required" }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: "Image must be under 10MB" }, { status: 400 });
    }
    const extension = path.extname(file.name).toLowerCase();
    if (!ACCEPTED_EXTENSIONS.has(extension)) {
      return NextResponse.json({ error: "Unsupported image format" }, { status: 400 });
    }

    const typedCategory = category as GalleryCategory;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { width, height } = readImageDimensions(buffer);

    const rawDisplayName =
      typeof displayNameInput === "string" && displayNameInput.trim()
        ? displayNameInput.trim()
        : path.basename(file.name, extension);
    const baseName = sanitizeFileBaseName(rawDisplayName);
    const filename = resolveUniqueFilename(getCategoryDir(typedCategory), baseName, extension);

    const created = await createGalleryImage({
      category: typedCategory,
      filename,
      displayName: rawDisplayName,
      width,
      height,
    });

    try {
      writeGalleryFile(typedCategory, filename, buffer);
    } catch (writeError) {
      await deleteGalleryImage(created.id);
      throw writeError;
    }

    return NextResponse.json(toAdminGalleryImages([created])[0], { status: 200 });
  } catch (error) {
    console.error("Gallery upload API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
