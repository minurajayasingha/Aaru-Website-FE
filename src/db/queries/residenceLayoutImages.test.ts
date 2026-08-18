import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createResidenceLayoutImage,
  getLayoutImagesBySlug,
  getAllLayoutImages,
  getLayoutImageById,
  updateLayoutImage,
  setLayoutImageOrder,
} from "./residenceLayoutImages";
import { getDb } from "../client";

vi.mock("../client");

const sampleInput = {
  residenceSlug: "private-villas",
  filename: "layout-1.png",
  displayOrder: 0,
  width: 1200,
  height: 900,
};

const sampleRow = {
  id: 1,
  ...sampleInput,
  updatedAt: new Date(),
};

describe("createResidenceLayoutImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inserts a row and returns the newly created row", async () => {
    const returningId = vi.fn().mockResolvedValue([{ id: 1 }]);
    const values = vi.fn().mockReturnValue({ $returningId: returningId });
    const insert = vi.fn().mockReturnValue({ values });

    const limit = vi.fn().mockResolvedValue([sampleRow]);
    const where = vi.fn().mockReturnValue({ limit });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });

    vi.mocked(getDb).mockReturnValue({ insert, select } as never);

    const result = await createResidenceLayoutImage(sampleInput);

    expect(insert).toHaveBeenCalled();
    expect(values).toHaveBeenCalledWith(sampleInput);
    expect(result).toEqual(sampleRow);
  });
});

describe("getLayoutImagesBySlug", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns images for the given slug ordered by displayOrder", async () => {
    const orderBy = vi.fn().mockResolvedValue([sampleRow]);
    const where = vi.fn().mockReturnValue({ orderBy });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getLayoutImagesBySlug("private-villas");

    expect(select).toHaveBeenCalled();
    expect(result).toEqual([sampleRow]);
  });
});

describe("getAllLayoutImages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns every layout image ordered by slug then displayOrder", async () => {
    const orderBy = vi.fn().mockResolvedValue([sampleRow]);
    const from = vi.fn().mockReturnValue({ orderBy });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getAllLayoutImages();

    expect(select).toHaveBeenCalled();
    expect(result).toEqual([sampleRow]);
  });
});

describe("getLayoutImageById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the matching row when found", async () => {
    const limit = vi.fn().mockResolvedValue([sampleRow]);
    const where = vi.fn().mockReturnValue({ limit });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getLayoutImageById(1);
    expect(result).toEqual(sampleRow);
  });

  it("returns null when no row matches", async () => {
    const limit = vi.fn().mockResolvedValue([]);
    const where = vi.fn().mockReturnValue({ limit });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getLayoutImageById(999);
    expect(result).toBeNull();
  });
});

describe("updateLayoutImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates the given fields for the given id", async () => {
    const where = vi.fn().mockResolvedValue(undefined);
    const set = vi.fn().mockReturnValue({ where });
    const update = vi.fn().mockReturnValue({ set });
    vi.mocked(getDb).mockReturnValue({ update } as never);

    await updateLayoutImage(1, { filename: "layout.jpg", width: 2000, height: 1500 });

    expect(update).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith({ filename: "layout.jpg", width: 2000, height: 1500 });
  });
});

describe("setLayoutImageOrder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sets displayOrder to each id's index in the array", async () => {
    const where = vi.fn().mockResolvedValue(undefined);
    const set = vi.fn().mockReturnValue({ where });
    const update = vi.fn().mockReturnValue({ set });
    vi.mocked(getDb).mockReturnValue({ update } as never);

    await setLayoutImageOrder([30, 10, 20]);

    expect(update).toHaveBeenCalledTimes(3);
    expect(set).toHaveBeenNthCalledWith(1, { displayOrder: 0 });
    expect(set).toHaveBeenNthCalledWith(2, { displayOrder: 1 });
    expect(set).toHaveBeenNthCalledWith(3, { displayOrder: 2 });
  });
});
