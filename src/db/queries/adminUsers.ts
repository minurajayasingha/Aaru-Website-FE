import { eq } from "drizzle-orm";
import { getDb } from "../client";
import { adminUsers, type AdminUser } from "../schema";

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  const db = getDb();
  const rows = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  return rows[0] ?? null;
}

export async function touchLastLogin(id: number): Promise<void> {
  const db = getDb();
  await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, id));
}

export async function upsertAdminUser(email: string, passwordHash: string): Promise<void> {
  const db = getDb();
  const existing = await getAdminUserByEmail(email);
  if (existing) {
    await db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.id, existing.id));
  } else {
    await db.insert(adminUsers).values({ email, passwordHash });
  }
}
