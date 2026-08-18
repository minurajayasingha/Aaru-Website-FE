import { describe, it, expect, vi, beforeEach } from "vitest";
import { getResidencesWithOverrides } from "./residences";
import * as statsQueries from "./residenceStats";
import * as layoutImageQueries from "./residenceLayoutImages";
import { residences as staticResidences } from "@/content/residences";

vi.mock("./residenceStats");
vi.mock("./residenceLayoutImages");

describe("getResidencesWithOverrides", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("overrides stats and layoutGallery for a residence with DB rows", async () => {
    vi.mocked(statsQueries.getAllResidenceStats).mockResolvedValue([
      {
        slug: "private-villas",
        unitsAvailableLabel: "2 Units",
        sizeLabel: "6,000+ sqft",
        priceLabel: "1,800,000 USD",
        updatedAt: new Date(),
      },
    ]);
    vi.mocked(layoutImageQueries.getAllLayoutImages).mockResolvedValue([
      { id: 2, residenceSlug: "private-villas", filename: "layout-b.jpg", displayOrder: 1, width: 800, height: 600, updatedAt: new Date() },
      { id: 1, residenceSlug: "private-villas", filename: "layout-a.jpg", displayOrder: 0, width: 800, height: 600, updatedAt: new Date() },
    ]);

    const result = await getResidencesWithOverrides();
    const villas = result.find((r) => r.slug === "private-villas")!;

    expect(villas.unitsAvailableLabel).toBe("2 Units");
    expect(villas.sizeLabel).toBe("6,000+ sqft");
    expect(villas.priceLabel).toBe("1,800,000 USD");
    expect(villas.layoutGallery).toEqual([
      { src: "/images/residences/private-villas/layout-a.jpg", alt: "Private Villas unit layout plan" },
      { src: "/images/residences/private-villas/layout-b.jpg", alt: "Private Villas unit layout, alternate view" },
    ]);
  });

  it("falls back to the static values when no DB rows exist for a slug", async () => {
    vi.mocked(statsQueries.getAllResidenceStats).mockResolvedValue([]);
    vi.mocked(layoutImageQueries.getAllLayoutImages).mockResolvedValue([]);

    const result = await getResidencesWithOverrides();
    const villas = result.find((r) => r.slug === "private-villas")!;
    const staticVillas = staticResidences.find((r) => r.slug === "private-villas")!;

    expect(villas.unitsAvailableLabel).toBe(staticVillas.unitsAvailableLabel);
    expect(villas.layoutGallery).toEqual(staticVillas.layoutGallery);
  });

  it("falls back to a generic alt when the DB has more layout images than the static array", async () => {
    vi.mocked(statsQueries.getAllResidenceStats).mockResolvedValue([]);
    vi.mocked(layoutImageQueries.getAllLayoutImages).mockResolvedValue([
      { id: 1, residenceSlug: "condos", filename: "a.jpg", displayOrder: 0, width: 1, height: 1, updatedAt: new Date() },
      { id: 2, residenceSlug: "condos", filename: "b.jpg", displayOrder: 1, width: 1, height: 1, updatedAt: new Date() },
      { id: 3, residenceSlug: "condos", filename: "c.jpg", displayOrder: 2, width: 1, height: 1, updatedAt: new Date() },
      { id: 4, residenceSlug: "condos", filename: "d.jpg", displayOrder: 3, width: 1, height: 1, updatedAt: new Date() },
      { id: 5, residenceSlug: "condos", filename: "e.jpg", displayOrder: 4, width: 1, height: 1, updatedAt: new Date() },
    ]);

    const result = await getResidencesWithOverrides();
    const condos = result.find((r) => r.slug === "condos")!;

    expect(condos.layoutGallery[4]).toEqual({ src: "/images/residences/condos/e.jpg", alt: "Condos unit layout plan" });
  });
});
