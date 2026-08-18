import fs from "fs";
import os from "os";
import path from "path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  sanitizeFileBaseName,
  resolveUniqueFilename,
  writeGalleryFile,
  renameGalleryFile,
  archiveGalleryFile,
  readImageDimensions,
} from "./galleryFiles";

describe("sanitizeFileBaseName", () => {
  it("lowercases and hyphenates a display name", () => {
    expect(sanitizeFileBaseName("Sunset View 01")).toBe("sunset-view-01");
  });

  it("strips unsafe characters", () => {
    expect(sanitizeFileBaseName("Garden Condo (Unit #3)!")).toBe("garden-condo-unit-3");
  });

  it("falls back to a default when nothing usable remains", () => {
    expect(sanitizeFileBaseName("***")).toBe("image");
  });
});

describe("resolveUniqueFilename", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gallery-files-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("returns the base name unchanged when there is no collision", () => {
    expect(resolveUniqueFilename(tempDir, "sunset-view", ".jpg")).toBe("sunset-view.jpg");
  });

  it("appends a numeric suffix when the file already exists", () => {
    fs.writeFileSync(path.join(tempDir, "sunset-view.jpg"), "fake");
    expect(resolveUniqueFilename(tempDir, "sunset-view", ".jpg")).toBe("sunset-view-2.jpg");
  });

  it("keeps incrementing past multiple collisions", () => {
    fs.writeFileSync(path.join(tempDir, "sunset-view.jpg"), "fake");
    fs.writeFileSync(path.join(tempDir, "sunset-view-2.jpg"), "fake");
    expect(resolveUniqueFilename(tempDir, "sunset-view", ".jpg")).toBe("sunset-view-3.jpg");
  });
});

describe("writeGalleryFile and renameGalleryFile", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gallery-files-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("writes a file into the category folder, creating it if needed", () => {
    writeGalleryFile("residential", "new-photo.jpg", Buffer.from("fake"), tempDir);
    const written = fs.readFileSync(path.join(tempDir, "residential", "new-photo.jpg"), "utf-8");
    expect(written).toBe("fake");
  });

  it("renames a file within its category folder", () => {
    writeGalleryFile("residential", "old-name.jpg", Buffer.from("fake"), tempDir);
    renameGalleryFile("residential", "old-name.jpg", "new-name.jpg", tempDir);

    expect(fs.existsSync(path.join(tempDir, "residential", "old-name.jpg"))).toBe(false);
    expect(fs.existsSync(path.join(tempDir, "residential", "new-name.jpg"))).toBe(true);
  });
});

describe("archiveGalleryFile", () => {
  let tempDir: string;
  let archiveDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gallery-files-test-"));
    archiveDir = fs.mkdtempSync(path.join(os.tmpdir(), "gallery-archive-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.rmSync(archiveDir, { recursive: true, force: true });
  });

  it("moves a file out of the gallery folder into the archive folder", () => {
    writeGalleryFile("residential", "old-photo.jpg", Buffer.from("fake"), tempDir);
    archiveGalleryFile("residential", "old-photo.jpg", tempDir, archiveDir);

    expect(fs.existsSync(path.join(tempDir, "residential", "old-photo.jpg"))).toBe(false);
    expect(fs.existsSync(path.join(archiveDir, "residential", "old-photo.jpg"))).toBe(true);
  });

  it("disambiguates when a same-named file is already archived", () => {
    fs.mkdirSync(path.join(archiveDir, "residential"), { recursive: true });
    fs.writeFileSync(path.join(archiveDir, "residential", "dup.jpg"), "already archived");
    writeGalleryFile("residential", "dup.jpg", Buffer.from("fake"), tempDir);

    archiveGalleryFile("residential", "dup.jpg", tempDir, archiveDir);

    expect(fs.existsSync(path.join(tempDir, "residential", "dup.jpg"))).toBe(false);
    const archivedFiles = fs.readdirSync(path.join(archiveDir, "residential"));
    expect(archivedFiles.length).toBe(2);
  });
});

describe("readImageDimensions", () => {
  it("returns a fallback aspect ratio for an unreadable buffer", () => {
    expect(readImageDimensions(Buffer.from("not a real image"))).toEqual({ width: 4, height: 3 });
  });
});
