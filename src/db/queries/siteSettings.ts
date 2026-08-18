import { eq } from "drizzle-orm";
import { getDb } from "../client";
import { siteSettings } from "../schema";
import { siteConfig } from "@/content/site";

const SETTINGS_ID = 1;

export interface ContactDetails {
  contactPhone: string;
  contactEmail: string;
}

export async function getSiteSettings(): Promise<ContactDetails> {
  const db = getDb();
  const rows = await db.select().from(siteSettings).limit(1);
  const row = rows[0];

  if (!row) {
    return { contactPhone: siteConfig.contactPhone, contactEmail: siteConfig.contactEmail };
  }

  return { contactPhone: row.contactPhone, contactEmail: row.contactEmail };
}

export async function updateSiteSettings(input: ContactDetails): Promise<void> {
  const db = getDb();
  const rows = await db.select().from(siteSettings).limit(1);

  if (rows[0]) {
    await db.update(siteSettings).set(input).where(eq(siteSettings.id, rows[0].id));
  } else {
    await db.insert(siteSettings).values({ id: SETTINGS_ID, ...input });
  }
}
