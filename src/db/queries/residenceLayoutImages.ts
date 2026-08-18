import { asc, eq } from "drizzle-orm";
import { getDb } from "../client";
import { residenceLayoutImages, type ResidenceLayoutImage, type NewResidenceLayoutImage } from "../schema";

export async function createResidenceLayoutImage(
  input: Omit<NewResidenceLayoutImage, "id" | "updatedAt">
): Promise<ResidenceLayoutImage> {
  const db = getDb();
  const [{ id }] = await db.insert(residenceLayoutImages).values(input).$returningId();
  const row = await getLayoutImageById(id);
  if (!row) throw new Error("Failed to read back newly created residence layout image");
  return row;
}

export async function getLayoutImagesBySlug(slug: string): Promise<ResidenceLayoutImage[]> {
  const db = getDb();
  return db
    .select()
    .from(residenceLayoutImages)
    .where(eq(residenceLayoutImages.residenceSlug, slug))
    .orderBy(asc(residenceLayoutImages.displayOrder));
}

export async function getAllLayoutImages(): Promise<ResidenceLayoutImage[]> {
  const db = getDb();
  return db
    .select()
    .from(residenceLayoutImages)
    .orderBy(asc(residenceLayoutImages.residenceSlug), asc(residenceLayoutImages.displayOrder));
}

export async function getLayoutImageById(id: number): Promise<ResidenceLayoutImage | null> {
  const db = getDb();
  const rows = await db.select().from(residenceLayoutImages).where(eq(residenceLayoutImages.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function updateLayoutImage(
  id: number,
  changes: Partial<Pick<ResidenceLayoutImage, "filename" | "width" | "height">>
): Promise<void> {
  const db = getDb();
  await db.update(residenceLayoutImages).set(changes).where(eq(residenceLayoutImages.id, id));
}

export async function setLayoutImageOrder(orderedIds: number[]): Promise<void> {
  const db = getDb();
  await Promise.all(
    orderedIds.map((id, index) =>
      db.update(residenceLayoutImages).set({ displayOrder: index }).where(eq(residenceLayoutImages.id, id))
    )
  );
}
