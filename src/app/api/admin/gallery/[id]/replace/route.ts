import { NextResponse } from "next/server";
import path from "path";
import { getGalleryImageById, updateGalleryImage } from "@/db/queries/galleryImages";
import { toAdminGalleryImages } from "@/content/admin/gallery";
import { writeGalleryFile, readImageDimensions } from "@/lib/galleryFiles";

const ACCEPTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId)) {
      return NextResponse.json({ error: "Invalid gallery image id" }, { status: 400 });
    }

    const existing = await getGalleryImageById(numericId);
    if (!existing) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
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

    const buffer = Buffer.from(await file.arrayBuffer());
    const { width, height } = readImageDimensions(buffer);

    writeGalleryFile(existing.category, existing.filename, buffer);
    await updateGalleryImage(numericId, { width, height });

    const updated = await getGalleryImageById(numericId);
    return NextResponse.json(toAdminGalleryImages([updated!])[0], { status: 200 });
  } catch (error) {
    console.error("Gallery replace API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
