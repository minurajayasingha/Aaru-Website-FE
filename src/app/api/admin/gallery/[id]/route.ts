import { NextResponse } from "next/server";
import path from "path";
import { getGalleryImageById, updateGalleryImage, deleteGalleryImage } from "@/db/queries/galleryImages";
import { toAdminGalleryImages } from "@/content/admin/gallery";
import { sanitizeFileBaseName, resolveUniqueFilename, getCategoryDir, renameGalleryFile, archiveGalleryFile } from "@/lib/galleryFiles";

const VALID_STATUSES = ["active", "inactive"] as const;

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

    const body = (await request.json()) as { displayName?: string; status?: string };
    const changes: { displayName?: string; filename?: string; status?: "active" | "inactive" } = {};

    if (body.status !== undefined) {
      if (!VALID_STATUSES.includes(body.status as (typeof VALID_STATUSES)[number])) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      changes.status = body.status as "active" | "inactive";
    }

    if (body.displayName !== undefined) {
      const trimmed = body.displayName.trim();
      if (!trimmed) {
        return NextResponse.json({ error: "Display name cannot be empty" }, { status: 400 });
      }

      const extension = path.extname(existing.filename);
      const baseName = sanitizeFileBaseName(trimmed);
      const desiredFilename = `${baseName}${extension}`;

      if (desiredFilename !== existing.filename) {
        const newFilename = resolveUniqueFilename(getCategoryDir(existing.category), baseName, extension);
        renameGalleryFile(existing.category, existing.filename, newFilename);
        changes.filename = newFilename;
      }
      changes.displayName = trimmed;
    }

    if (Object.keys(changes).length === 0) {
      return NextResponse.json({ error: "No changes provided" }, { status: 400 });
    }

    await updateGalleryImage(numericId, changes);
    const updated = await getGalleryImageById(numericId);
    return NextResponse.json(toAdminGalleryImages([updated!])[0], { status: 200 });
  } catch (error) {
    console.error("Gallery update API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

    archiveGalleryFile(existing.category, existing.filename);
    await deleteGalleryImage(numericId);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Gallery delete API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
