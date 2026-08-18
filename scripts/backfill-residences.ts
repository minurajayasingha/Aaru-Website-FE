import { config } from "dotenv";
config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import { residences } from "../src/content/residences";
import { createResidenceStats } from "../src/db/queries/residenceStats";
import { createResidenceLayoutImage } from "../src/db/queries/residenceLayoutImages";

const DEFAULT_ASPECT = { width: 4, height: 3 };

function readDimensions(filePath: string): { width: number; height: number } {
  try {
    const buffer = fs.readFileSync(filePath);
    const { width, height } = imageSize(buffer);
    return width && height ? { width, height } : DEFAULT_ASPECT;
  } catch {
    return DEFAULT_ASPECT;
  }
}

async function main() {
  let totalImages = 0;

  for (const residence of residences) {
    await createResidenceStats({
      slug: residence.slug,
      unitsAvailableLabel: residence.unitsAvailableLabel,
      sizeLabel: residence.sizeLabel,
      priceLabel: residence.priceLabel,
    });
    console.log(`Backfilled stats: ${residence.slug}`);

    for (const [index, image] of residence.layoutGallery.entries()) {
      const filename = path.basename(image.src);
      const absolutePath = path.join(process.cwd(), "public", "images", "residences", residence.slug, filename);
      const { width, height } = readDimensions(absolutePath);

      await createResidenceLayoutImage({
        residenceSlug: residence.slug,
        filename,
        displayOrder: index,
        width,
        height,
      });
      totalImages += 1;
      console.log(`Backfilled layout image: ${residence.slug}/${filename}`);
    }
  }

  console.log(`Done. Backfilled stats for ${residences.length} residence(s) and ${totalImages} layout image(s).`);
  process.exit(0);
}

main().catch((error) => {
  console.error("Backfill failed:", error);
  process.exit(1);
});
