import { describe, it, expect, vi, beforeEach } from "vitest";
import { PATCH } from "./route";
import * as inquiriesQueries from "@/db/queries/inquiries";

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

describe("PATCH /api/admin/inquiries/[id]", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 400 for a non-numeric id", async () => {
    const request = new Request("http://localhost/api/admin/inquiries/abc", {
      method: "PATCH",
      body: JSON.stringify({ status: "closed" }),
    });
    const response = await PATCH(request, makeParams("abc"));
    expect(response.status).toBe(400);
  });

  it("returns 400 for an invalid status value", async () => {
    const request = new Request("http://localhost/api/admin/inquiries/1", {
      method: "PATCH",
      body: JSON.stringify({ status: "archived" }),
    });
    const response = await PATCH(request, makeParams("1"));
    expect(response.status).toBe(400);
  });

  it("updates the status and returns 200 for a valid request", async () => {
    vi.spyOn(inquiriesQueries, "updateInquiryStatus").mockResolvedValue();
    const request = new Request("http://localhost/api/admin/inquiries/1", {
      method: "PATCH",
      body: JSON.stringify({ status: "in-progress" }),
    });
    const response = await PATCH(request, makeParams("1"));
    expect(response.status).toBe(200);
    expect(inquiriesQueries.updateInquiryStatus).toHaveBeenCalledWith(1, "in-progress");
  });

  it("returns 500 with a JSON error body when updateInquiryStatus throws", async () => {
    vi.spyOn(inquiriesQueries, "updateInquiryStatus").mockRejectedValue(new Error("DB failure"));
    const request = new Request("http://localhost/api/admin/inquiries/1", {
      method: "PATCH",
      body: JSON.stringify({ status: "closed" }),
    });
    const response = await PATCH(request, makeParams("1"));
    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.error).toBeTruthy();
  });
});
