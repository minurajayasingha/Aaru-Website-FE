import type { Metadata } from "next";
import { InquiriesView } from "@/components/admin/InquiriesView";
import { sampleInquiries } from "@/content/admin/inquiries";

export const metadata: Metadata = {
  title: "Inquiries",
};

export default function AdminInquiriesPage() {
  return <InquiriesView initialInquiries={sampleInquiries} />;
}
