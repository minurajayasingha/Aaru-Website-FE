import { describe, it, expect } from "vitest";
import { POST } from "./route";

describe("POST /api/admin/auth/logout", () => {
  it("clears the session cookie and returns 200", async () => {
    const response = await POST();
    expect(response.status).toBe(200);
    const setCookie = response.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain("aaru_admin_session=");
    expect(setCookie).toContain("Max-Age=0");
  });
});
