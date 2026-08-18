import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getLayoutImageById, updateLayoutImage } from "@/db/queries/residenceLayoutImages";
import { getResidenceDir, writeResidenceFile, archiveResidenceFile } from "@/lib/residenceFiles";
import { readImageDimensions, resolveUniqueFilename } from "@/lib/galleryFiles";

const ACCEPTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId)) {
      return NextResponse.json({ error: "Invalid layout image id" }, { status: 400 });
    }

    const existing = await getLayoutImageById(numericId);
    if (!existing) {
      return NextResponse.json({ error: "Layout image not found" }, { status: 404 });
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
    const newFilename = resolveUniqueFilename(getResidenceDir(existing.residenceSlug), "layout", extension);

    writeResidenceFile(existing.residenceSlug, newFilename, buffer);

    try {
      archiveResidenceFile(existing.residenceSlug, existing.filename);
    } catch (archiveError) {
      fs.unlinkSync(path.join(getResidenceDir(existing.residenceSlug), newFilename));
      throw archiveError;
    }

    await updateLayoutImage(numericId, { filename: newFilename, width, height });

    const updated = await getLayoutImageById(numericId);
    return NextResponse.json(
      {
        id: updated!.id,
        src: `/images/residences/${existing.residenceSlug}/${updated!.filename}`,
        width: updated!.width,
        height: updated!.height,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Residence layout image replace API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
