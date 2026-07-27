import { describe, it, expect } from "vitest";
import { getAmenityIcon } from "./amenityIcons";

describe("getAmenityIcon", () => {
  it("matches bedroom labels regardless of the count", () => {
    expect(getAmenityIcon("2 Bedrooms")).toBe("/images/icons/amenities/bed.svg");
    expect(getAmenityIcon("4 Bedrooms")).toBe("/images/icons/amenities/bed.svg");
  });

  it("matches sqft labels regardless of formatting", () => {
    expect(getAmenityIcon("+2000 sqft")).toBe("/images/icons/amenities/size.svg");
    expect(getAmenityIcon("1,600-1,800 sqft")).toBe("/images/icons/amenities/size.svg");
  });

  it("returns undefined for a label with no matching rule", () => {
    expect(getAmenityIcon("Something Unmapped")).toBeUndefined();
  });
});
