"use client";

import { useRef, useState } from "react";
import { Card } from "./ui/Card";
import { PencilIcon } from "./icons";
import type { GalleryImage, Residence } from "@/content/residences";

type StatKey = "unitsAvailableLabel" | "sizeLabel" | "priceLabel";

type ResidenceLayoutCardProps = {
  residence: Residence;
};

const statFields: { key: StatKey; label: string }[] = [
  { key: "unitsAvailableLabel", label: "Available Units" },
  { key: "sizeLabel", label: "Size" },
  { key: "priceLabel", label: "Price" },
];

export function ResidenceLayoutCard({ residence }: ResidenceLayoutCardProps) {
  const [images, setImages] = useState<GalleryImage[]>(residence.layoutGallery);
  const [stats, setStats] = useState<Record<StatKey, string>>({
    unitsAvailableLabel: residence.unitsAvailableLabel,
    sizeLabel: residence.sizeLabel,
    priceLabel: residence.priceLabel,
  });
  const [editingField, setEditingField] = useState<StatKey | null>(null);
  const [draftValue, setDraftValue] = useState("");
  const cancelledEditRef = useRef(false);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleImageReplace(index: number, file: File | undefined) {
    if (!file) return;
    const nextSrc = URL.createObjectURL(file);
    setImages((current) => {
      const previous = current[index];
      if (previous.src.startsWith("blob:")) {
        URL.revokeObjectURL(previous.src);
      }
      const next = [...current];
      next[index] = { src: nextSrc, alt: previous.alt };
      return next;
    });
  }

  function startEditing(key: StatKey) {
    setDraftValue(stats[key]);
    setEditingField(key);
  }

  function commitEdit() {
    if (editingField) {
      setStats((current) => ({ ...current, [editingField]: draftValue }));
    }
    setEditingField(null);
  }

  function cancelEdit() {
    cancelledEditRef.current = true;
    setEditingField(null);
  }

  function handleBlur() {
    if (cancelledEditRef.current) {
      cancelledEditRef.current = false;
      return;
    }
    commitEdit();
  }

  return (
    <Card className="flex flex-col gap-4">
      <h3 className="text-base font-semibold text-brand-forest-900">{residence.name}</h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {statFields.map((field) => (
          <div key={field.key} className="rounded-lg border border-brand-forest-100 bg-brand-forest-50 px-4 py-3">
            <span className="text-xs font-medium uppercase tracking-wide text-brand-forest-400">{field.label}</span>
            {editingField === field.key ? (
              <input
                autoFocus
                type="text"
                value={draftValue}
                onChange={(event) => setDraftValue(event.target.value)}
                onBlur={handleBlur}
                onKeyDown={(event) => {
                  if (event.key === "Enter") commitEdit();
                  if (event.key === "Escape") cancelEdit();
                }}
                className="mt-1 w-full rounded-md border border-brand-forest-200 bg-white px-2 py-1 text-sm text-brand-forest-900 focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            ) : (
              <button
                type="button"
                onClick={() => startEditing(field.key)}
                className="mt-1 flex w-full items-center justify-between gap-2 rounded-md px-1 py-1 text-left hover:bg-brand-forest-100"
              >
                <span className="text-sm font-semibold text-brand-forest-900">{stats[field.key]}</span>
                <PencilIcon className="h-3.5 w-3.5 shrink-0 text-brand-forest-400" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-lg border border-brand-forest-100 bg-brand-forest-50"
          >
            {/* Blob URLs from URL.createObjectURL can't go through next/image's optimizer, so this stays a plain img. */}
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => fileInputRefs.current[index]?.click()}
              className="absolute inset-0 flex items-center justify-center bg-black/0 text-sm font-medium text-white opacity-0 transition-opacity group-hover:bg-black/40 group-hover:opacity-100"
            >
              Replace
            </button>
            <input
              ref={(el) => {
                fileInputRefs.current[index] = el;
              }}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleImageReplace(index, event.target.files?.[0])}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
