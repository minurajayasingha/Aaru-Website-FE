import { desc, eq } from "drizzle-orm";
import { getDb } from "../client";
import { inquiries, type Inquiry, type NewInquiry } from "../schema";

export async function createInquiry(input: Omit<NewInquiry, "id" | "status" | "submittedAt">): Promise<void> {
  const db = getDb();
  await db.insert(inquiries).values(input);
}

export async function getAllInquiries(): Promise<Inquiry[]> {
  const db = getDb();
  return db.select().from(inquiries).orderBy(desc(inquiries.submittedAt));
}

export async function getNewInquiries(): Promise<Inquiry[]> {
  const db = getDb();
  return db.select().from(inquiries).where(eq(inquiries.status, "new")).orderBy(desc(inquiries.submittedAt));
}

export async function updateInquiryStatus(id: number, status: Inquiry["status"]): Promise<void> {
  const db = getDb();
  await db.update(inquiries).set({ status }).where(eq(inquiries.id, id));
}
