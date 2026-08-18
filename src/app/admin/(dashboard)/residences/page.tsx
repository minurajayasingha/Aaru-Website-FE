import type { Metadata } from "next";
import { getAllResidenceStats } from "@/db/queries/residenceStats";
import { getAllLayoutImages } from "@/db/queries/residenceLayoutImages";
import { toAdminResidences } from "@/content/admin/residences";
import { ResidencesView } from "@/components/admin/ResidencesView";

export const metadata: Metadata = {
  title: "Residences",
};

export default async function AdminResidencesPage() {
  const [statsRows, layoutImageRows] = await Promise.all([getAllResidenceStats(), getAllLayoutImages()]);
  const residences = toAdminResidences(statsRows, layoutImageRows);

  return <ResidencesView residences={residences} />;
}
