import { describe, it, expect, vi, beforeEach } from "vitest";
import { createResidenceStats, getResidenceStats, getAllResidenceStats, updateResidenceStats } from "./residenceStats";
import { getDb } from "../client";

vi.mock("../client");

const sampleRow = {
  slug: "private-villas",
  unitsAvailableLabel: "3 Units",
  sizeLabel: "5,700+ sqft",
  priceLabel: "1,734,000 USD",
  updatedAt: new Date(),
};

describe("createResidenceStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inserts a new residence_stats row", async () => {
    const values = vi.fn().mockResolvedValue(undefined);
    const insert = vi.fn().mockReturnValue({ values });
    vi.mocked(getDb).mockReturnValue({ insert } as never);

    const input = {
      slug: "private-villas",
      unitsAvailableLabel: "3 Units",
      sizeLabel: "5,700+ sqft",
      priceLabel: "1,734,000 USD",
    };
    await createResidenceStats(input);

    expect(insert).toHaveBeenCalled();
    expect(values).toHaveBeenCalledWith(input);
  });
});

describe("getResidenceStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the matching row when found", async () => {
    const limit = vi.fn().mockResolvedValue([sampleRow]);
    const where = vi.fn().mockReturnValue({ limit });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getResidenceStats("private-villas");
    expect(result).toEqual(sampleRow);
  });

  it("returns null when no row matches", async () => {
    const limit = vi.fn().mockResolvedValue([]);
    const where = vi.fn().mockReturnValue({ limit });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getResidenceStats("unknown-slug");
    expect(result).toBeNull();
  });
});

describe("getAllResidenceStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns every residence_stats row", async () => {
    const from = vi.fn().mockResolvedValue([sampleRow]);
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getAllResidenceStats();

    expect(select).toHaveBeenCalled();
    expect(result).toEqual([sampleRow]);
  });
});

describe("updateResidenceStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates the given fields for the given slug", async () => {
    const where = vi.fn().mockResolvedValue(undefined);
    const set = vi.fn().mockReturnValue({ where });
    const update = vi.fn().mockReturnValue({ set });
    vi.mocked(getDb).mockReturnValue({ update } as never);

    await updateResidenceStats("private-villas", { unitsAvailableLabel: "2 Units" });

    expect(update).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith({ unitsAvailableLabel: "2 Units" });
  });
});
