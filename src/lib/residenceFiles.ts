import fs from "fs";
import path from "path";

const RESIDENCES_ROOT = path.join(process.cwd(), "public", "images", "residences");
const ARCHIVE_ROOT = path.join(process.cwd(), "storage", "residence-archive");

export function getResidenceDir(slug: string, baseDir: string = RESIDENCES_ROOT): string {
  return path.join(baseDir, slug);
}

export function writeResidenceFile(
  slug: string,
  filename: string,
  buffer: Buffer,
  baseDir: string = RESIDENCES_ROOT
): void {
  const dir = getResidenceDir(slug, baseDir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, filename), buffer);
}

export function archiveResidenceFile(
  slug: string,
  filename: string,
  baseDir: string = RESIDENCES_ROOT,
  archiveDir: string = ARCHIVE_ROOT
): void {
  const sourcePath = path.join(getResidenceDir(slug, baseDir), filename);
  const targetSlugDir = path.join(archiveDir, slug);
  fs.mkdirSync(targetSlugDir, { recursive: true });

  let targetPath = path.join(targetSlugDir, filename);
  if (fs.existsSync(targetPath)) {
    const ext = path.extname(filename);
    const base = filename.slice(0, filename.length - ext.length);
    targetPath = path.join(targetSlugDir, `${base}-${Date.now()}${ext}`);
  }

  fs.renameSync(sourcePath, targetPath);
}
