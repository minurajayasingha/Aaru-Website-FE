import type { Inquiry } from "@/db/schema";

export type AdminInquiryStatus = "new" | "in-progress" | "closed";

export type AdminInquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  status: AdminInquiryStatus;
};

export function toAdminInquiries(rows: Inquiry[]): AdminInquiry[] {
  return rows.map((row) => ({
    id: String(row.id),
    name: `${row.firstName} ${row.lastName}`,
    email: row.email,
    message: row.message,
    submittedAt: row.submittedAt.toISOString().slice(0, 10),
    status: row.status,
  }));
}
