import fs from "fs";
import os from "os";
import path from "path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { writeResidenceFile, archiveResidenceFile } from "./residenceFiles";

describe("writeResidenceFile", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "residence-files-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("writes a file into the residence's folder, creating it if needed", () => {
    writeResidenceFile("private-villas", "layout.jpg", Buffer.from("fake"), tempDir);
    const written = fs.readFileSync(path.join(tempDir, "private-villas", "layout.jpg"), "utf-8");
    expect(written).toBe("fake");
  });
});

describe("archiveResidenceFile", () => {
  let tempDir: string;
  let archiveDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "residence-files-test-"));
    archiveDir = fs.mkdtempSync(path.join(os.tmpdir(), "residence-archive-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.rmSync(archiveDir, { recursive: true, force: true });
  });

  it("moves a file out of the residence folder into the archive folder", () => {
    writeResidenceFile("private-villas", "layout-1.png", Buffer.from("fake"), tempDir);
    archiveResidenceFile("private-villas", "layout-1.png", tempDir, archiveDir);

    expect(fs.existsSync(path.join(tempDir, "private-villas", "layout-1.png"))).toBe(false);
    expect(fs.existsSync(path.join(archiveDir, "private-villas", "layout-1.png"))).toBe(true);
  });

  it("disambiguates when a same-named file is already archived", () => {
    fs.mkdirSync(path.join(archiveDir, "private-villas"), { recursive: true });
    fs.writeFileSync(path.join(archiveDir, "private-villas", "dup.jpg"), "already archived");
    writeResidenceFile("private-villas", "dup.jpg", Buffer.from("fake"), tempDir);

    archiveResidenceFile("private-villas", "dup.jpg", tempDir, archiveDir);

    expect(fs.existsSync(path.join(tempDir, "private-villas", "dup.jpg"))).toBe(false);
    const archivedFiles = fs.readdirSync(path.join(archiveDir, "private-villas"));
    expect(archivedFiles.length).toBe(2);
  });
});
