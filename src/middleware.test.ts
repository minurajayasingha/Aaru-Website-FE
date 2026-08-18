import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";
import * as session from "@/lib/auth/session";

describe("middleware", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("allows /admin/login through without checking the session", async () => {
    const request = new NextRequest("http://localhost/admin/login");
    const response = await middleware(request);
    expect(response.status).toBe(200);
  });

  it("redirects to /admin/login when there is no session cookie", async () => {
    const request = new NextRequest("http://localhost/admin");
    const response = await middleware(request);
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/admin/login");
  });

  it("redirects to /admin/login when the session token is invalid", async () => {
    vi.spyOn(session, "verifySessionToken").mockResolvedValue(null);
    const request = new NextRequest("http://localhost/admin", {
      headers: { cookie: "aaru_admin_session=bad-token" },
    });
    const response = await middleware(request);
    expect(response.status).toBe(307);
  });

  it("allows the request through when the session is valid", async () => {
    vi.spyOn(session, "verifySessionToken").mockResolvedValue({ sub: "1", email: "admin@example.com" });
    const request = new NextRequest("http://localhost/admin", {
      headers: { cookie: "aaru_admin_session=good-token" },
    });
    const response = await middleware(request);
    expect(response.status).toBe(200);
  });

  it("allows /api/admin/auth/login through without checking the session", async () => {
    const request = new NextRequest("http://localhost/api/admin/auth/login", { method: "POST" });
    const response = await middleware(request);
    expect(response.status).toBe(200);
  });

  it("allows /api/admin/auth/logout through without checking the session", async () => {
    const request = new NextRequest("http://localhost/api/admin/auth/logout", { method: "POST" });
    const response = await middleware(request);
    expect(response.status).toBe(200);
  });

  it("redirects requests to /api/admin/inquiries/1 when there is no session cookie", async () => {
    const request = new NextRequest("http://localhost/api/admin/inquiries/1", { method: "PATCH" });
    const response = await middleware(request);
    expect(response.status).toBe(307);
  });

  it("allows requests to /api/admin/inquiries/1 through when the session is valid", async () => {
    vi.spyOn(session, "verifySessionToken").mockResolvedValue({ sub: "1", email: "admin@example.com" });
    const request = new NextRequest("http://localhost/api/admin/inquiries/1", {
      method: "PATCH",
      headers: { cookie: "aaru_admin_session=good-token" },
    });
    const response = await middleware(request);
    expect(response.status).toBe(200);
  });
});
