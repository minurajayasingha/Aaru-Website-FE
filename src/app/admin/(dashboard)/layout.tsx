import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminDashboardGroupLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
