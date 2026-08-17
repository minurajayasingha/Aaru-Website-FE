import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import * as adminUsers from "@/db/queries/adminUsers";
import * as password from "@/lib/auth/password";
import * as session from "@/lib/auth/session";

describe("POST /api/admin/auth/login", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 401 when email or password is missing", async () => {
    const request = new Request("http://localhost/api/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "", password: "" }),
    });
    const response = await POST(request);
    expect(response.status).toBe(401);
  });

  it("returns 401 with a generic message when the email is unknown", async () => {
    vi.spyOn(adminUsers, "getAdminUserByEmail").mockResolvedValue(null);
    const request = new Request("http://localhost/api/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "nobody@example.com", password: "whatever" }),
    });
    const response = await POST(request);
    expect(response.status).toBe(401);
    const json = await response.json();
    expect(json.error).toBe("Invalid email or password");
  });

  it("returns 401 with the same generic message when the password is wrong", async () => {
    vi.spyOn(adminUsers, "getAdminUserByEmail").mockResolvedValue({
      id: 1,
      email: "admin@example.com",
      passwordHash: "hash",
      createdAt: new Date(),
      lastLoginAt: null,
    });
    vi.spyOn(password, "verifyPassword").mockResolvedValue(false);
    const request = new Request("http://localhost/api/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "admin@example.com", password: "wrong" }),
    });
    const response = await POST(request);
    expect(response.status).toBe(401);
    const json = await response.json();
    expect(json.error).toBe("Invalid email or password");
  });

  it("sets a session cookie and returns 200 for valid credentials", async () => {
    vi.spyOn(adminUsers, "getAdminUserByEmail").mockResolvedValue({
      id: 1,
      email: "admin@example.com",
      passwordHash: "hash",
      createdAt: new Date(),
      lastLoginAt: null,
    });
    vi.spyOn(password, "verifyPassword").mockResolvedValue(true);
    vi.spyOn(session, "createSessionToken").mockResolvedValue("signed-token");
    vi.spyOn(adminUsers, "touchLastLogin").mockResolvedValue();

    const request = new Request("http://localhost/api/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "admin@example.com", password: "correct" }),
    });
    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(adminUsers.touchLastLogin).toHaveBeenCalledWith(1);
    const setCookie = response.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain("aaru_admin_session=signed-token");
    expect(setCookie.toLowerCase()).toContain("httponly");
  });

  it("returns 500 with a JSON error body for malformed JSON", async () => {
    const request = new Request("http://localhost/api/admin/auth/login", {
      method: "POST",
      body: "{ not valid json",
    });
    const response = await POST(request);
    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.error).toBeTruthy();
  });
});
