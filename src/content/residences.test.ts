import { describe, it, expect } from "vitest";
import { residences } from "./residences";

describe("residences content", () => {
  it("has exactly three residence types with unique slugs", () => {
    expect(residences).toHaveLength(3);
    const slugs = residences.map((r) => r.slug);
    expect(new Set(slugs).size).toBe(3);
  });

  it("includes Garden Condos, Condos, and Private Villas", () => {
    const names = residences.map((r) => r.name);
    expect(names).toEqual(
      expect.arrayContaining(["Garden Condos", "Condos", "Private Villas"])
    );
  });
});
