import { AdminShell } from "@/components/admin/AdminShell";
import { getNewInquiries } from "@/db/queries/inquiries";
import { toAdminInquiries } from "@/content/admin/inquiries";

export default async function AdminDashboardGroupLayout({ children }: { children: React.ReactNode }) {
  const newInquiries = toAdminInquiries(await getNewInquiries());

  return <AdminShell newInquiries={newInquiries}>{children}</AdminShell>;
}
