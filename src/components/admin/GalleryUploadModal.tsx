"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { CloseIcon } from "./icons";
import type { GalleryCategory } from "@/content/gallery";

type GalleryUploadModalProps = {
  categories: { id: GalleryCategory; label: string }[];
  defaultCategory: GalleryCategory;
  onClose: () => void;
  onUpload: (category: GalleryCategory, file: File, displayName: string) => Promise<void>;
};

export function GalleryUploadModal({ categories, defaultCategory, onClose, onUpload }: GalleryUploadModalProps) {
  const [category, setCategory] = useState<GalleryCategory>(defaultCategory);
  const [file, setFile] = useState<File | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!file) {
      setError("Please choose an image to upload");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await onUpload(category, file, displayName);
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg" onClick={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-forest-900">Upload image</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-brand-forest-400 hover:bg-brand-forest-50 hover:text-brand-forest-700"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="upload-category" className="text-sm font-medium text-brand-forest-900">
              Category
            </label>
            <select
              id="upload-category"
              value={category}
              onChange={(event) => setCategory(event.target.value as GalleryCategory)}
              className="rounded-lg border border-brand-forest-200 bg-white px-3 py-2.5 text-sm text-brand-forest-900 focus:outline-none focus:ring-2 focus:ring-brand-gold"
            >
              {categories.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="upload-file" className="text-sm font-medium text-brand-forest-900">
              Image file
            </label>
            <input
              id="upload-file"
              type="file"
              accept="image/*"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="text-sm text-brand-forest-700"
            />
          </div>

          <Input
            label="Display name (optional)"
            id="upload-name"
            name="upload-name"
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Defaults to the file name"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </div>
    </div>
  );
}
