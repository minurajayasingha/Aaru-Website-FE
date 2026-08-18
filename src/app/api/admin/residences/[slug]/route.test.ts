import { describe, it, expect, vi, beforeEach } from "vitest";
import { PATCH } from "./route";
import * as statsQueries from "@/db/queries/residenceStats";

function makeParams(slug: string) {
  return { params: Promise.resolve({ slug }) };
}

const existingRow = {
  slug: "private-villas",
  unitsAvailableLabel: "3 Units",
  sizeLabel: "5,700+ sqft",
  priceLabel: "1,734,000 USD",
  updatedAt: new Date(),
};

describe("PATCH /api/admin/residences/[slug]", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(statsQueries, "updateResidenceStats").mockResolvedValue();
    vi.spyOn(statsQueries, "getResidenceStats").mockResolvedValue({ ...existingRow, unitsAvailableLabel: "2 Units" });
  });

  it("returns 404 for an unknown slug", async () => {
    const request = new Request("http://localhost/api/admin/residences/not-a-slug", {
      method: "PATCH",
      body: JSON.stringify({ unitsAvailableLabel: "2 Units" }),
    });
    const response = await PATCH(request, makeParams("not-a-slug"));
    expect(response.status).toBe(404);
  });

  it("returns 400 when no changes are provided", async () => {
    const request = new Request("http://localhost/api/admin/residences/private-villas", {
      method: "PATCH",
      body: JSON.stringify({}),
    });
    const response = await PATCH(request, makeParams("private-villas"));
    expect(response.status).toBe(400);
  });

  it("updates the given fields and returns the updated row", async () => {
    const request = new Request("http://localhost/api/admin/residences/private-villas", {
      method: "PATCH",
      body: JSON.stringify({ unitsAvailableLabel: "2 Units" }),
    });
    const response = await PATCH(request, makeParams("private-villas"));

    expect(response.status).toBe(200);
    expect(statsQueries.updateResidenceStats).toHaveBeenCalledWith("private-villas", { unitsAvailableLabel: "2 Units" });
    const json = await response.json();
    expect(json.unitsAvailableLabel).toBe("2 Units");
  });
});
