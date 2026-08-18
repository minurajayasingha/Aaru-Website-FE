import { describe, it, expect, vi, beforeEach } from "vitest";
import { getSiteSettings, updateSiteSettings } from "./siteSettings";
import { getDb } from "../client";
import { siteConfig } from "@/content/site";

vi.mock("../client");

describe("getSiteSettings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the stored contact details when a row exists", async () => {
    const rows = [{ id: 1, contactPhone: "+94 77 000 0000", contactEmail: "hello@example.com", updatedAt: new Date() }];
    const limit = vi.fn().mockResolvedValue(rows);
    const from = vi.fn().mockReturnValue({ limit });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getSiteSettings();

    expect(result).toEqual({ contactPhone: "+94 77 000 0000", contactEmail: "hello@example.com" });
  });

  it("falls back to the static site config when no row exists yet", async () => {
    const limit = vi.fn().mockResolvedValue([]);
    const from = vi.fn().mockReturnValue({ limit });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getSiteSettings();

    expect(result).toEqual({ contactPhone: siteConfig.contactPhone, contactEmail: siteConfig.contactEmail });
  });
});

describe("updateSiteSettings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const input = { contactPhone: "+94 77 111 1111", contactEmail: "sales@example.com" };

  it("updates the existing row when one is present", async () => {
    const existing = [{ id: 1, contactPhone: "old", contactEmail: "old@example.com", updatedAt: new Date() }];
    const limit = vi.fn().mockResolvedValue(existing);
    const from = vi.fn().mockReturnValue({ limit });
    const select = vi.fn().mockReturnValue({ from });
    const where = vi.fn().mockResolvedValue(undefined);
    const set = vi.fn().mockReturnValue({ where });
    const update = vi.fn().mockReturnValue({ set });
    vi.mocked(getDb).mockReturnValue({ select, update } as never);

    await updateSiteSettings(input);

    expect(update).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith(input);
  });

  it("inserts a new row when none exists", async () => {
    const limit = vi.fn().mockResolvedValue([]);
    const from = vi.fn().mockReturnValue({ limit });
    const select = vi.fn().mockReturnValue({ from });
    const values = vi.fn().mockResolvedValue(undefined);
    const insert = vi.fn().mockReturnValue({ values });
    vi.mocked(getDb).mockReturnValue({ select, insert } as never);

    await updateSiteSettings(input);

    expect(insert).toHaveBeenCalled();
    expect(values).toHaveBeenCalledWith({ id: 1, ...input });
  });
});
