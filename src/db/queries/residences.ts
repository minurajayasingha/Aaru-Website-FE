import { residences as staticResidences, resolveLayoutImageAlt, type Residence } from "@/content/residences";
import { getAllResidenceStats } from "./residenceStats";
import { getAllLayoutImages } from "./residenceLayoutImages";

export async function getResidencesWithOverrides(): Promise<Residence[]> {
  const [statsRows, layoutImageRows] = await Promise.all([getAllResidenceStats(), getAllLayoutImages()]);

  return staticResidences.map((residence) => {
    const stats = statsRows.find((row) => row.slug === residence.slug);
    const layoutImagesForSlug = layoutImageRows
      .filter((row) => row.residenceSlug === residence.slug)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    return {
      ...residence,
      unitsAvailableLabel: stats?.unitsAvailableLabel ?? residence.unitsAvailableLabel,
      sizeLabel: stats?.sizeLabel ?? residence.sizeLabel,
      priceLabel: stats?.priceLabel ?? residence.priceLabel,
      layoutGallery:
        layoutImagesForSlug.length > 0
          ? layoutImagesForSlug.map((row, index) => ({
              src: `/images/residences/${residence.slug}/${row.filename}`,
              alt: resolveLayoutImageAlt(residence, index),
            }))
          : residence.layoutGallery,
    };
  });
}
