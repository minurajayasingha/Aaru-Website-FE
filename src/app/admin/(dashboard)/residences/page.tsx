import type { Metadata } from "next";
import { residences } from "@/content/residences";
import { ResidenceLayoutCard } from "@/components/admin/ResidenceLayoutCard";

export const metadata: Metadata = {
  title: "Residences",
};

export default function AdminResidencesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-brand-forest-900">Residences</h2>
        <p className="mt-1 text-sm text-brand-forest-400">Manage each residence&apos;s unit layout gallery and stats.</p>
      </div>

      <div className="flex flex-col gap-6">
        {residences.map((residence) => (
          <ResidenceLayoutCard key={residence.slug} residence={residence} />
        ))}
      </div>
    </div>
  );
}
