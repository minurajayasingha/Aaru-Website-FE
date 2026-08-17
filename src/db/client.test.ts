import { describe, it, expect, vi, beforeEach } from "vitest";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

vi.mock("mysql2/promise", () => ({
  default: { createPool: vi.fn().mockReturnValue({}) },
}));
vi.mock("drizzle-orm/mysql2", () => ({
  drizzle: vi.fn().mockReturnValue({ mocked: true }),
}));

import { getDb } from "./client";

describe("getDb", () => {
  beforeEach(() => {
    delete process.env.DATABASE_URL;
    vi.clearAllMocks();
  });

  it("throws a clear error when DATABASE_URL is not set", () => {
    expect(() => getDb()).toThrow("DATABASE_URL is not set");
  });

  it("creates a pool from DATABASE_URL and returns a drizzle instance", () => {
    process.env.DATABASE_URL = "mysql://user:pass@localhost:3306/test";
    const db = getDb();
    expect(mysql.createPool).toHaveBeenCalledWith("mysql://user:pass@localhost:3306/test");
    expect(drizzle).toHaveBeenCalledWith(expect.objectContaining({ client: {} }));
    expect(db).toEqual({ mocked: true });
  });
});
