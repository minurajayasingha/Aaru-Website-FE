import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createGalleryImage,
  getActiveGalleryImages,
  getAllGalleryImages,
  getGalleryImageById,
  updateGalleryImage,
  deleteGalleryImage,
} from "./galleryImages";
import { getDb } from "../client";

vi.mock("../client");

const sampleInput = {
  category: "residential" as const,
  filename: "sunset-view.jpg",
  displayName: "Sunset View",
  width: 1600,
  height: 1200,
};

const sampleRow = {
  id: 1,
  ...sampleInput,
  status: "active" as const,
  uploadedAt: new Date(),
};

describe("createGalleryImage", () => {
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

    const result = await createGalleryImage(sampleInput);

    expect(insert).toHaveBeenCalled();
    expect(values).toHaveBeenCalledWith(sampleInput);
    expect(result).toEqual(sampleRow);
  });
});

describe("getActiveGalleryImages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns only active images ordered by id", async () => {
    const orderBy = vi.fn().mockResolvedValue([sampleRow]);
    const where = vi.fn().mockReturnValue({ orderBy });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getActiveGalleryImages();

    expect(select).toHaveBeenCalled();
    expect(result).toEqual([sampleRow]);
  });
});

describe("getAllGalleryImages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns every image ordered by id", async () => {
    const orderBy = vi.fn().mockResolvedValue([sampleRow]);
    const from = vi.fn().mockReturnValue({ orderBy });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getAllGalleryImages();

    expect(select).toHaveBeenCalled();
    expect(result).toEqual([sampleRow]);
  });
});

describe("getGalleryImageById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the matching row when found", async () => {
    const limit = vi.fn().mockResolvedValue([sampleRow]);
    const where = vi.fn().mockReturnValue({ limit });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getGalleryImageById(1);
    expect(result).toEqual(sampleRow);
  });

  it("returns null when no row matches", async () => {
    const limit = vi.fn().mockResolvedValue([]);
    const where = vi.fn().mockReturnValue({ limit });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    vi.mocked(getDb).mockReturnValue({ select } as never);

    const result = await getGalleryImageById(999);
    expect(result).toBeNull();
  });
});

describe("updateGalleryImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates the given fields for the given id", async () => {
    const where = vi.fn().mockResolvedValue(undefined);
    const set = vi.fn().mockReturnValue({ where });
    const update = vi.fn().mockReturnValue({ set });
    vi.mocked(getDb).mockReturnValue({ update } as never);

    await updateGalleryImage(1, { displayName: "New Name", status: "inactive" });

    expect(update).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith({ displayName: "New Name", status: "inactive" });
  });
});

describe("deleteGalleryImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deletes the row with the given id", async () => {
    const where = vi.fn().mockResolvedValue(undefined);
    const del = vi.fn().mockReturnValue({ where });
    vi.mocked(getDb).mockReturnValue({ delete: del } as never);

    await deleteGalleryImage(1);

    expect(del).toHaveBeenCalled();
    expect(where).toHaveBeenCalled();
  });
});
