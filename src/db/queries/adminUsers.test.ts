import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAdminUserByEmail, touchLastLogin, upsertAdminUser } from "./adminUsers";
import { getDb } from "../client";

vi.mock("../client");

describe("getAdminUserByEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the matching row when found", async () => {
    const limit = vi.fn().mockResolvedValue([{ id: 1, email: "admin@example.com", passwordHash: "hash" }]);
    const where = vi.fn().mockReturnValue({ limit });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getAdminUserByEmail("admin@example.com");

    expect(select).toHaveBeenCalled();
    expect(result).toEqual({ id: 1, email: "admin@example.com", passwordHash: "hash" });
  });

  it("returns null when no row matches", async () => {
    const limit = vi.fn().mockResolvedValue([]);
    const where = vi.fn().mockReturnValue({ limit });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getAdminUserByEmail("nobody@example.com");
    expect(result).toBeNull();
  });
});

describe("touchLastLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates last_login_at for the given id", async () => {
    const where = vi.fn().mockResolvedValue(undefined);
    const set = vi.fn().mockReturnValue({ where });
    const update = vi.fn().mockReturnValue({ set });
    vi.mocked(getDb).mockReturnValue({ update } as never);

    await touchLastLogin(1);

    expect(update).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith(expect.objectContaining({ lastLoginAt: expect.any(Date) }));
  });
});

describe("upsertAdminUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates the password hash when the email already exists", async () => {
    const selectLimit = vi.fn().mockResolvedValue([{ id: 1, email: "admin@example.com", passwordHash: "old" }]);
    const selectWhere = vi.fn().mockReturnValue({ limit: selectLimit });
    const selectFrom = vi.fn().mockReturnValue({ where: selectWhere });
    const select = vi.fn().mockReturnValue({ from: selectFrom });

    const updateWhere = vi.fn().mockResolvedValue(undefined);
    const set = vi.fn().mockReturnValue({ where: updateWhere });
    const update = vi.fn().mockReturnValue({ set });

    vi.mocked(getDb).mockReturnValue({ select, update } as never);

    await upsertAdminUser("admin@example.com", "new-hash");

    expect(update).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith({ passwordHash: "new-hash" });
  });

  it("inserts a new row when the email does not exist", async () => {
    const selectLimit = vi.fn().mockResolvedValue([]);
    const selectWhere = vi.fn().mockReturnValue({ limit: selectLimit });
    const selectFrom = vi.fn().mockReturnValue({ where: selectWhere });
    const select = vi.fn().mockReturnValue({ from: selectFrom });

    const values = vi.fn().mockResolvedValue(undefined);
    const insert = vi.fn().mockReturnValue({ values });

    vi.mocked(getDb).mockReturnValue({ select, insert } as never);

    await upsertAdminUser("new@example.com", "hash-1");

    expect(insert).toHaveBeenCalled();
    expect(values).toHaveBeenCalledWith({ email: "new@example.com", passwordHash: "hash-1" });
  });
});
