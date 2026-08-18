import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiriesView } from "@/components/admin/InquiriesView";
import { getAllInquiries } from "@/db/queries/inquiries";
import { toAdminInquiries } from "@/content/admin/inquiries";

export const metadata: Metadata = {
  title: "Inquiries",
};

export default async function AdminInquiriesPage() {
  const inquiries = toAdminInquiries(await getAllInquiries());

  return (
    <Suspense>
      <InquiriesView initialInquiries={inquiries} />
    </Suspense>
  );
}
