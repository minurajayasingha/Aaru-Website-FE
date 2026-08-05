import type { Metadata } from "next";
import { residences } from "@/content/residences";
import { ResidencesView } from "@/components/admin/ResidencesView";

export const metadata: Metadata = {
  title: "Residences",
};

export default function AdminResidencesPage() {
  return <ResidencesView residences={residences} />;
}
