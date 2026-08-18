import type { ResidenceStats, ResidenceLayoutImage } from "@/db/schema";
import { residences as staticResidences, resolveLayoutImageAlt } from "@/content/residences";

export type AdminLayoutImage = {
  id: number;
  src: string;
  alt: string;
};

export type AdminResidence = {
  slug: string;
  name: string;
  unitsAvailableLabel: string;
  sizeLabel: string;
  priceLabel: string;
  layoutImages: AdminLayoutImage[];
};

export function toAdminResidences(
  statsRows: ResidenceStats[],
  layoutImageRows: ResidenceLayoutImage[]
): AdminResidence[] {
  return staticResidences.map((residence) => {
    const stats = statsRows.find((row) => row.slug === residence.slug);
    const layoutImages = layoutImageRows
      .filter((row) => row.residenceSlug === residence.slug)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((row, index) => ({
        id: row.id,
        src: `/images/residences/${residence.slug}/${row.filename}`,
        alt: resolveLayoutImageAlt(residence, index),
      }));

    return {
      slug: residence.slug,
      name: residence.name,
      unitsAvailableLabel: stats?.unitsAvailableLabel ?? residence.unitsAvailableLabel,
      sizeLabel: stats?.sizeLabel ?? residence.sizeLabel,
      priceLabel: stats?.priceLabel ?? residence.priceLabel,
      layoutImages,
    };
  });
}
