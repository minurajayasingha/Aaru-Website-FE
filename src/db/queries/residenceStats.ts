import { eq } from "drizzle-orm";
import { getDb } from "../client";
import { residenceStats, type ResidenceStats, type NewResidenceStats } from "../schema";

export async function createResidenceStats(input: Omit<NewResidenceStats, "updatedAt">): Promise<void> {
  const db = getDb();
  await db.insert(residenceStats).values(input);
}

export async function getResidenceStats(slug: string): Promise<ResidenceStats | null> {
  const db = getDb();
  const rows = await db.select().from(residenceStats).where(eq(residenceStats.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getAllResidenceStats(): Promise<ResidenceStats[]> {
  const db = getDb();
  return db.select().from(residenceStats);
}

export async function updateResidenceStats(
  slug: string,
  changes: Partial<Pick<ResidenceStats, "unitsAvailableLabel" | "sizeLabel" | "priceLabel">>
): Promise<void> {
  const db = getDb();
  await db.update(residenceStats).set(changes).where(eq(residenceStats.slug, slug));
}
