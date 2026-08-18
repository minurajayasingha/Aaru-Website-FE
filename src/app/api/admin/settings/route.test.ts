import { describe, it, expect, vi, beforeEach } from "vitest";
import { PUT } from "./route";
import * as siteSettingsQueries from "@/db/queries/siteSettings";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/admin/settings", {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

describe("PUT /api/admin/settings", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 400 when phone or email is missing", async () => {
    const response = await PUT(makeRequest({ contactPhone: "", contactEmail: "sales@example.com" }));
    expect(response.status).toBe(400);
  });

  it("returns 400 for an invalid email address", async () => {
    const response = await PUT(makeRequest({ contactPhone: "+94 77 000 0000", contactEmail: "not-an-email" }));
    expect(response.status).toBe(400);
  });

  it("updates the settings and returns 200 for a valid request", async () => {
    vi.spyOn(siteSettingsQueries, "updateSiteSettings").mockResolvedValue();
    const response = await PUT(makeRequest({ contactPhone: "+94 77 000 0000", contactEmail: "sales@example.com" }));
    expect(response.status).toBe(200);
    expect(siteSettingsQueries.updateSiteSettings).toHaveBeenCalledWith({
      contactPhone: "+94 77 000 0000",
      contactEmail: "sales@example.com",
    });
  });

  it("returns 500 with a JSON error body when updateSiteSettings throws", async () => {
    vi.spyOn(siteSettingsQueries, "updateSiteSettings").mockRejectedValue(new Error("DB failure"));
    const response = await PUT(makeRequest({ contactPhone: "+94 77 000 0000", contactEmail: "sales@example.com" }));
    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.error).toBeTruthy();
  });
});
