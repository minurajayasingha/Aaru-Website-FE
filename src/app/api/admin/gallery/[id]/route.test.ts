import { describe, it, expect, vi, beforeEach } from "vitest";
import { PATCH, DELETE } from "./route";
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

describe("PATCH /api/admin/gallery/[id]", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(galleryQueries, "getGalleryImageById").mockResolvedValue(existingRow);
    vi.spyOn(galleryQueries, "updateGalleryImage").mockResolvedValue();
  });

  it("returns 400 for a non-numeric id", async () => {
    const request = new Request("http://localhost/api/admin/gallery/abc", {
      method: "PATCH",
      body: JSON.stringify({ status: "inactive" }),
    });
    const response = await PATCH(request, makeParams("abc"));
    expect(response.status).toBe(400);
  });

  it("returns 404 when the image doesn't exist", async () => {
    vi.spyOn(galleryQueries, "getGalleryImageById").mockResolvedValue(null);
    const request = new Request("http://localhost/api/admin/gallery/999", {
      method: "PATCH",
      body: JSON.stringify({ status: "inactive" }),
    });
    const response = await PATCH(request, makeParams("999"));
    expect(response.status).toBe(404);
  });

  it("returns 400 for an invalid status value", async () => {
    const request = new Request("http://localhost/api/admin/gallery/1", {
      method: "PATCH",
      body: JSON.stringify({ status: "archived" }),
    });
    const response = await PATCH(request, makeParams("1"));
    expect(response.status).toBe(400);
  });

  it("returns 400 when no changes are provided", async () => {
    const request = new Request("http://localhost/api/admin/gallery/1", {
      method: "PATCH",
      body: JSON.stringify({}),
    });
    const response = await PATCH(request, makeParams("1"));
    expect(response.status).toBe(400);
  });

  it("toggles status without touching any file", async () => {
    vi.spyOn(galleryQueries, "getGalleryImageById")
      .mockResolvedValueOnce(existingRow)
      .mockResolvedValueOnce({ ...existingRow, status: "inactive" });
    const renameSpy = vi.spyOn(galleryFiles, "renameGalleryFile");

    const request = new Request("http://localhost/api/admin/gallery/1", {
      method: "PATCH",
      body: JSON.stringify({ status: "inactive" }),
    });
    const response = await PATCH(request, makeParams("1"));

    expect(response.status).toBe(200);
    expect(galleryQueries.updateGalleryImage).toHaveBeenCalledWith(1, { status: "inactive" });
    expect(renameSpy).not.toHaveBeenCalled();
  });

  it("renames the underlying file when displayName actually changes", async () => {
    vi.spyOn(galleryFiles, "sanitizeFileBaseName").mockReturnValue("new-name");
    vi.spyOn(galleryFiles, "resolveUniqueFilename").mockReturnValue("new-name.jpg");
    const renameSpy = vi.spyOn(galleryFiles, "renameGalleryFile").mockImplementation(() => undefined);
    vi.spyOn(galleryQueries, "getGalleryImageById")
      .mockResolvedValueOnce(existingRow)
      .mockResolvedValueOnce({ ...existingRow, filename: "new-name.jpg", displayName: "New Name" });

    const request = new Request("http://localhost/api/admin/gallery/1", {
      method: "PATCH",
      body: JSON.stringify({ displayName: "New Name" }),
    });
    const response = await PATCH(request, makeParams("1"));

    expect(response.status).toBe(200);
    expect(renameSpy).toHaveBeenCalledWith("residential", "sunset-view.jpg", "new-name.jpg");
    expect(galleryQueries.updateGalleryImage).toHaveBeenCalledWith(1, {
      filename: "new-name.jpg",
      displayName: "New Name",
    });
  });

  it("does not rename the file when the sanitized name is unchanged", async () => {
    vi.spyOn(galleryFiles, "sanitizeFileBaseName").mockReturnValue("sunset-view");
    const renameSpy = vi.spyOn(galleryFiles, "renameGalleryFile");
    vi.spyOn(galleryQueries, "getGalleryImageById")
      .mockResolvedValueOnce(existingRow)
      .mockResolvedValueOnce({ ...existingRow, displayName: "Sunset View" });

    const request = new Request("http://localhost/api/admin/gallery/1", {
      method: "PATCH",
      body: JSON.stringify({ displayName: "Sunset View" }),
    });
    const response = await PATCH(request, makeParams("1"));

    expect(response.status).toBe(200);
    expect(renameSpy).not.toHaveBeenCalled();
    expect(galleryQueries.updateGalleryImage).toHaveBeenCalledWith(1, { displayName: "Sunset View" });
  });
});

describe("DELETE /api/admin/gallery/[id]", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(galleryQueries, "getGalleryImageById").mockResolvedValue(existingRow);
    vi.spyOn(galleryQueries, "deleteGalleryImage").mockResolvedValue();
    vi.spyOn(galleryFiles, "archiveGalleryFile").mockImplementation(() => undefined);
  });

  it("returns 400 for a non-numeric id", async () => {
    const response = await DELETE(new Request("http://localhost/api/admin/gallery/abc"), makeParams("abc"));
    expect(response.status).toBe(400);
  });

  it("returns 404 when the image doesn't exist", async () => {
    vi.spyOn(galleryQueries, "getGalleryImageById").mockResolvedValue(null);
    const response = await DELETE(new Request("http://localhost/api/admin/gallery/999"), makeParams("999"));
    expect(response.status).toBe(404);
  });

  it("archives the file and deletes the row on success", async () => {
    const response = await DELETE(new Request("http://localhost/api/admin/gallery/1"), makeParams("1"));

    expect(response.status).toBe(200);
    expect(galleryFiles.archiveGalleryFile).toHaveBeenCalledWith("residential", "sunset-view.jpg");
    expect(galleryQueries.deleteGalleryImage).toHaveBeenCalledWith(1);
  });

  it("does not delete the row if archiving the file fails", async () => {
    vi.spyOn(galleryFiles, "archiveGalleryFile").mockImplementation(() => {
      throw new Error("permission denied");
    });
    const response = await DELETE(new Request("http://localhost/api/admin/gallery/1"), makeParams("1"));

    expect(response.status).toBe(500);
    expect(galleryQueries.deleteGalleryImage).not.toHaveBeenCalled();
  });
});
