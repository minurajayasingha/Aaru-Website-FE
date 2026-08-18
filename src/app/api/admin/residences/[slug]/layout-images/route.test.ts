import { describe, it, expect, vi, beforeEach } from "vitest";
import { PATCH } from "./route";
import * as layoutImageQueries from "@/db/queries/residenceLayoutImages";

function makeParams(slug: string) {
  return { params: Promise.resolve({ slug }) };
}

const existingImages = [
  { id: 1, residenceSlug: "private-villas", filename: "layout-1.png", displayOrder: 0, width: 1, height: 1, updatedAt: new Date() },
  { id: 2, residenceSlug: "private-villas", filename: "layout-2.png", displayOrder: 1, width: 1, height: 1, updatedAt: new Date() },
];

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/admin/residences/private-villas/layout-images", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

describe("PATCH /api/admin/residences/[slug]/layout-images", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(layoutImageQueries, "getLayoutImagesBySlug").mockResolvedValue(existingImages);
    vi.spyOn(layoutImageQueries, "setLayoutImageOrder").mockResolvedValue();
  });

  it("returns 404 for an unknown slug", async () => {
    const response = await PATCH(makeRequest({ orderedIds: [1, 2] }), makeParams("not-a-slug"));
    expect(response.status).toBe(404);
  });

  it("returns 400 when orderedIds is missing", async () => {
    const response = await PATCH(makeRequest({}), makeParams("private-villas"));
    expect(response.status).toBe(400);
  });

  it("returns 400 when orderedIds doesn't match this residence's images", async () => {
    const response = await PATCH(makeRequest({ orderedIds: [1, 999] }), makeParams("private-villas"));
    expect(response.status).toBe(400);
    expect(layoutImageQueries.setLayoutImageOrder).not.toHaveBeenCalled();
  });

  it("persists the new order and returns the reordered images", async () => {
    vi.spyOn(layoutImageQueries, "getLayoutImagesBySlug")
      .mockResolvedValueOnce(existingImages)
      .mockResolvedValueOnce([existingImages[1], existingImages[0]]);

    const response = await PATCH(makeRequest({ orderedIds: [2, 1] }), makeParams("private-villas"));

    expect(response.status).toBe(200);
    expect(layoutImageQueries.setLayoutImageOrder).toHaveBeenCalledWith([2, 1]);
  });
});
