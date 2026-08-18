import { describe, it, expect } from "vitest";
import { toAdminResidences } from "./residences";
import type { ResidenceStats, ResidenceLayoutImage } from "@/db/schema";

describe("toAdminResidences", () => {
  it("maps DB stats and layout image rows onto each static residence, ordered by displayOrder", () => {
    const statsRows: ResidenceStats[] = [
      { slug: "private-villas", unitsAvailableLabel: "2 Units", sizeLabel: "6,000+ sqft", priceLabel: "1,800,000 USD", updatedAt: new Date() },
    ];
    const layoutImageRows: ResidenceLayoutImage[] = [
      { id: 2, residenceSlug: "private-villas", filename: "layout-b.jpg", displayOrder: 1, width: 800, height: 600, updatedAt: new Date() },
      { id: 1, residenceSlug: "private-villas", filename: "layout-a.jpg", displayOrder: 0, width: 800, height: 600, updatedAt: new Date() },
    ];

    const result = toAdminResidences(statsRows, layoutImageRows);
    const villas = result.find((r) => r.slug === "private-villas")!;

    expect(villas.unitsAvailableLabel).toBe("2 Units");
    expect(villas.layoutImages).toEqual([
      { id: 1, src: "/images/residences/private-villas/layout-a.jpg", alt: "Private Villas unit layout plan" },
      { id: 2, src: "/images/residences/private-villas/layout-b.jpg", alt: "Private Villas unit layout, alternate view" },
    ]);
  });

  it("falls back to static stats when no DB row exists for a slug", () => {
    const result = toAdminResidences([], []);
    const villas = result.find((r) => r.slug === "private-villas")!;

    expect(villas.unitsAvailableLabel).toBe("3 Units");
    expect(villas.layoutImages).toEqual([]);
  });
});
