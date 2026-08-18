// @vitest-environment node
// jsdom's built-in FormData/Request/File implementations don't correctly round-trip
// multipart bodies, so this file needs the real Node environment instead — same
// class of issue as jose needing this for session.test.ts.
import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import * as galleryQueries from "@/db/queries/galleryImages";
import * as galleryFiles from "@/lib/galleryFiles";

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

const existingRow = {
  id: 1,
  category: "residential" as const,
  filename: "sunset-view.jpg",
  displayName: "Sunset View",
  status: "active" as const,
  width: 1600,
  height: 1200,
  uploadedAt: new Date(),
};

function makeReplaceRequest(file?: File) {
  const formData = new FormData();
  if (file) formData.append("file", file);
  return new Request("http://localhost/api/admin/gallery/1/replace", { method: "POST", body: formData });
}

describe("POST /api/admin/gallery/[id]/replace", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(galleryQueries, "getGalleryImageById")
      .mockResolvedValueOnce(existingRow)
      .mockResolvedValueOnce({ ...existingRow, width: 2000, height: 1500 });
    vi.spyOn(galleryQueries, "updateGalleryImage").mockResolvedValue();
    vi.spyOn(galleryFiles, "writeGalleryFile").mockImplementation(() => undefined);
    vi.spyOn(galleryFiles, "readImageDimensions").mockReturnValue({ width: 2000, height: 1500 });
  });

  it("returns 400 for a non-numeric id", async () => {
    const response = await POST(makeReplaceRequest(new File(["fake"], "x.jpg")), makeParams("abc"));
    expect(response.status).toBe(400);
  });

  it("returns 404 when the image doesn't exist", async () => {
    vi.spyOn(galleryQueries, "getGalleryImageById").mockReset().mockResolvedValue(null);
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

  it("overwrites the file at its existing filename and updates stored dimensions", async () => {
    const response = await POST(makeReplaceRequest(new File(["fake"], "whatever-name.png")), makeParams("1"));

    expect(response.status).toBe(200);
    expect(galleryFiles.writeGalleryFile).toHaveBeenCalledWith("residential", "sunset-view.jpg", expect.any(Buffer));
    expect(galleryQueries.updateGalleryImage).toHaveBeenCalledWith(1, { width: 2000, height: 1500 });
    const json = await response.json();
    expect(json.width).toBe(2000);
    expect(json.src).toBe("/images/gallery/residential/sunset-view.jpg");
  });
});
