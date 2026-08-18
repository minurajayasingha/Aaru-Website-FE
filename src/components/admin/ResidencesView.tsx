"use client";

import { useState } from "react";
import { TabBar } from "./ui/TabBar";
import { ResidenceLayoutCard } from "./ResidenceLayoutCard";
import type { AdminResidence } from "@/content/admin/residences";

type ResidencesViewProps = {
  residences: AdminResidence[];
};

export function ResidencesView({ residences }: ResidencesViewProps) {
  const [activeSlug, setActiveSlug] = useState(residences[0].slug);
  const activeResidence = residences.find((residence) => residence.slug === activeSlug) ?? residences[0];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-brand-forest-900">Residences</h2>
        <p className="mt-1 text-sm text-brand-forest-400">Manage each residence&apos;s unit layout gallery and stats.</p>
      </div>

      <TabBar
        options={residences.map((residence) => ({ label: residence.name, value: residence.slug }))}
        value={activeSlug}
        onChange={setActiveSlug}
      />

      <ResidenceLayoutCard key={activeResidence.slug} residence={activeResidence} />
    </div>
  );
}
