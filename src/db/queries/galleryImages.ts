import { eq } from "drizzle-orm";
import { getDb } from "../client";
import { galleryImages, type GalleryImage, type NewGalleryImage } from "../schema";

export async function createGalleryImage(
  input: Omit<NewGalleryImage, "id" | "status" | "uploadedAt">
): Promise<GalleryImage> {
  const db = getDb();
  const [{ id }] = await db.insert(galleryImages).values(input).$returningId();
  const row = await getGalleryImageById(id);
  if (!row) throw new Error("Failed to read back newly created gallery image");
  return row;
}

export async function getActiveGalleryImages(): Promise<GalleryImage[]> {
  const db = getDb();
  return db.select().from(galleryImages).where(eq(galleryImages.status, "active")).orderBy(galleryImages.id);
}

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  const db = getDb();
  return db.select().from(galleryImages).orderBy(galleryImages.id);
}

export async function getGalleryImageById(id: number): Promise<GalleryImage | null> {
  const db = getDb();
  const rows = await db.select().from(galleryImages).where(eq(galleryImages.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function updateGalleryImage(
  id: number,
  changes: Partial<Pick<GalleryImage, "filename" | "displayName" | "status" | "width" | "height">>
): Promise<void> {
  const db = getDb();
  await db.update(galleryImages).set(changes).where(eq(galleryImages.id, id));
}

export async function deleteGalleryImage(id: number): Promise<void> {
  const db = getDb();
  await db.delete(galleryImages).where(eq(galleryImages.id, id));
}
