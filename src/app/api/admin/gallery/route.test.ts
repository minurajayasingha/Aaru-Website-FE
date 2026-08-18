// @vitest-environment node
// jsdom's built-in FormData/Request/File implementations don't correctly round-trip
// multipart bodies (Request.formData() throws even on a request built from a real
// FormData instance), so this file needs the real Node environment instead — same
// class of issue as jose needing this for session.test.ts.
import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import * as galleryQueries from "@/db/queries/galleryImages";
import * as galleryFiles from "@/lib/galleryFiles";

const sampleRow = {
  id: 1,
  category: "residential" as const,
  filename: "sunset-view.jpg",
  displayName: "Sunset View",
  status: "active" as const,
  width: 1600,
  height: 1200,
  uploadedAt: new Date(),
};

function makeUploadRequest(fields: Record<string, string | File>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.append(key, value);
  }
  return new Request("http://localhost/api/admin/gallery", { method: "POST", body: formData });
}

describe("POST /api/admin/gallery", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(galleryFiles, "readImageDimensions").mockReturnValue({ width: 1600, height: 1200 });
    vi.spyOn(galleryFiles, "resolveUniqueFilename").mockReturnValue("sunset-view.jpg");
    vi.spyOn(galleryFiles, "writeGalleryFile").mockImplementation(() => undefined);
    vi.spyOn(galleryQueries, "createGalleryImage").mockResolvedValue(sampleRow);
    vi.spyOn(galleryQueries, "deleteGalleryImage").mockResolvedValue();
  });

  it("returns 400 for an invalid category", async () => {
    const file = new File(["fake"], "photo.jpg", { type: "image/jpeg" });
    const request = makeUploadRequest({ category: "not-a-category", file });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 when no file is provided", async () => {
    const request = makeUploadRequest({ category: "residential" });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 400 for an unsupported file extension", async () => {
    const file = new File(["fake"], "notes.txt", { type: "text/plain" });
    const request = makeUploadRequest({ category: "residential", file });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("creates the DB row and writes the file, returning 200 with the created image", async () => {
    const file = new File(["fake"], "sunset-view.jpg", { type: "image/jpeg" });
    const request = makeUploadRequest({ category: "residential", file });
    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(galleryQueries.createGalleryImage).toHaveBeenCalledWith(
      expect.objectContaining({ category: "residential", filename: "sunset-view.jpg", width: 1600, height: 1200 })
    );
    expect(galleryFiles.writeGalleryFile).toHaveBeenCalledWith("residential", "sunset-view.jpg", expect.any(Buffer));
    const json = await response.json();
    expect(json).toEqual({
      id: "1",
      src: "/images/gallery/residential/sunset-view.jpg",
      name: "Sunset View",
      category: "residential",
      width: 1600,
      height: 1200,
      status: "active",
    });
  });

  it("deletes the DB row if the file write fails, and returns 500", async () => {
    vi.spyOn(galleryFiles, "writeGalleryFile").mockImplementation(() => {
      throw new Error("disk full");
    });
    const file = new File(["fake"], "sunset-view.jpg", { type: "image/jpeg" });
    const request = makeUploadRequest({ category: "residential", file });
    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(galleryQueries.deleteGalleryImage).toHaveBeenCalledWith(1);
  });
});
