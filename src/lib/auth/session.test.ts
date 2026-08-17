// @vitest-environment node

import { describe, it, expect, beforeEach } from "vitest";
import { createSessionToken, verifySessionToken } from "./session";

describe("session", () => {
  beforeEach(() => {
    process.env.AUTH_SECRET = "test-secret-at-least-32-characters-long";
  });

  it("round-trips a valid payload", async () => {
    const token = await createSessionToken({ sub: "1", email: "admin@example.com" });
    const payload = await verifySessionToken(token);
    expect(payload).toEqual({ sub: "1", email: "admin@example.com" });
  });

  it("rejects a tampered token", async () => {
    const token = await createSessionToken({ sub: "1", email: "admin@example.com" });
    const tampered = token.slice(0, -1) + (token.endsWith("A") ? "B" : "A");
    const payload = await verifySessionToken(tampered);
    expect(payload).toBeNull();
  });

  it("rejects a token signed with a different secret", async () => {
    const token = await createSessionToken({ sub: "1", email: "admin@example.com" });
    process.env.AUTH_SECRET = "a-completely-different-secret-value-here";
    const payload = await verifySessionToken(token);
    expect(payload).toBeNull();
  });

  it("throws when AUTH_SECRET is not set", async () => {
    delete process.env.AUTH_SECRET;
    await expect(createSessionToken({ sub: "1", email: "admin@example.com" })).rejects.toThrow(
      "AUTH_SECRET is not set"
    );
  });
});
