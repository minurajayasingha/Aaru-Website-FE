// @vitest-environment node
// jsdom's built-in FormData/Request/File implementations don't correctly round-trip
// multipart bodies, so this file needs the real Node environment instead.
import fs from "fs";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import * as layoutImageQueries from "@/db/queries/residenceLayoutImages";
import * as residenceFiles from "@/lib/residenceFiles";
import * as galleryFiles from "@/lib/galleryFiles";

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

const existingRow = {
  id: 1,
  residenceSlug: "private-villas",
  filename: "layout-1.png",
  displayOrder: 0,
  width: 1200,
  height: 900,
  updatedAt: new Date(),
};

function makeReplaceRequest(file?: File) {
  const formData = new FormData();
  if (file) formData.append("file", file);
  return new Request("http://localhost/api/admin/residences/layout-images/1/replace", { method: "POST", body: formData });
}

describe("POST /api/admin/residences/layout-images/[id]/replace", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(layoutImageQueries, "getLayoutImageById")
      .mockResolvedValueOnce(existingRow)
      .mockResolvedValueOnce({ ...existingRow, filename: "layout.jpg", width: 2000, height: 1500 });
    vi.spyOn(layoutImageQueries, "updateLayoutImage").mockResolvedValue();
    vi.spyOn(residenceFiles, "writeResidenceFile").mockImplementation(() => undefined);
    vi.spyOn(residenceFiles, "archiveResidenceFile").mockImplementation(() => undefined);
    vi.spyOn(galleryFiles, "readImageDimensions").mockReturnValue({ width: 2000, height: 1500 });
    vi.spyOn(galleryFiles, "resolveUniqueFilename").mockReturnValue("layout.jpg");
  });

  it("returns 400 for a non-numeric id", async () => {
    const response = await POST(makeReplaceRequest(new File(["fake"], "x.jpg")), makeParams("abc"));
    expect(response.status).toBe(400);
  });

  it("returns 404 when the layout image doesn't exist", async () => {
    vi.spyOn(layoutImageQueries, "getLayoutImageById").mockReset().mockResolvedValue(null);
    const response = await POST(makeReplaceRequest(new File(["fake"], "x.jpg")), makeParams("999"));
    expect(response.status).toBe(404);
  });

  it("returns 400 when no file is provided", async () => {
    const response = await POST(makeReplaceRequest(undefined), makeParams("1"));
    expect(response.status).toBe(400);
  });

  it("returns 400 for an unsupported file extension", async () => {
    const response = await POST(makeReplaceRequest(new File(["fake"], "notes.txt")), makeParams("1"));
    expect(response.status).toBe(400);
  });

  it("writes the new file, archives the old one, and updates the row", async () => {
    const response = await POST(makeReplaceRequest(new File(["fake"], "whatever.jpg")), makeParams("1"));

    expect(response.status).toBe(200);
    expect(residenceFiles.writeResidenceFile).toHaveBeenCalledWith("private-villas", "layout.jpg", expect.any(Buffer));
    expect(residenceFiles.archiveResidenceFile).toHaveBeenCalledWith("private-villas", "layout-1.png");
    expect(layoutImageQueries.updateLayoutImage).toHaveBeenCalledWith(1, {
      filename: "layout.jpg",
      width: 2000,
      height: 1500,
    });
    const json = await response.json();
    expect(json).toEqual({ id: 1, src: "/images/residences/private-villas/layout.jpg", width: 2000, height: 1500 });
  });

  it("removes the newly written file and returns 500 if archiving the old file fails", async () => {
    vi.spyOn(residenceFiles, "archiveResidenceFile").mockImplementation(() => {
      throw new Error("permission denied");
    });
    const unlinkSpy = vi.spyOn(fs, "unlinkSync").mockImplementation(() => undefined);

    const response = await POST(makeReplaceRequest(new File(["fake"], "whatever.jpg")), makeParams("1"));

    expect(response.status).toBe(500);
    expect(unlinkSpy).toHaveBeenCalled();
    expect(layoutImageQueries.updateLayoutImage).not.toHaveBeenCalled();
  });
});
