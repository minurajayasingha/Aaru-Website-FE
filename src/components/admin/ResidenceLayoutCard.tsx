"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Card } from "./ui/Card";
import { PencilIcon, DragHandleIcon } from "./icons";
import type { AdminResidence, AdminLayoutImage } from "@/content/admin/residences";

type StatKey = "unitsAvailableLabel" | "sizeLabel" | "priceLabel";

type ResidenceLayoutCardProps = {
  residence: AdminResidence;
};

const statFields: { key: StatKey; label: string }[] = [
  { key: "unitsAvailableLabel", label: "Available Units" },
  { key: "sizeLabel", label: "Size" },
  { key: "priceLabel", label: "Price" },
];

export function ResidenceLayoutCard({ residence }: ResidenceLayoutCardProps) {
  const [images, setImages] = useState<AdminLayoutImage[]>(residence.layoutImages);
  const [stats, setStats] = useState<Record<StatKey, string>>({
    unitsAvailableLabel: residence.unitsAvailableLabel,
    sizeLabel: residence.sizeLabel,
    priceLabel: residence.priceLabel,
  });
  const [editingField, setEditingField] = useState<StatKey | null>(null);
  const [draftValue, setDraftValue] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const cancelledEditRef = useRef(false);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dragStartOrderRef = useRef<AdminLayoutImage[]>(images);

  function handleDragStart(index: number) {
    dragStartOrderRef.current = images;
    setDraggedIndex(index);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>, index: number) {
    event.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setImages((current) => {
      const next = [...current];
      const [moved] = next.splice(draggedIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDraggedIndex(index);
  }

  async function persistOrder(orderedImages: AdminLayoutImage[]) {
    try {
      const response = await fetch(`/api/admin/residences/${residence.slug}/layout-images`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: orderedImages.map((image) => image.id) }),
      });
      if (!response.ok) throw new Error("Failed to persist layout image order");
    } catch (error) {
      console.error("Failed to persist layout image order:", error);
      setImages(dragStartOrderRef.current);
    }
  }

  function handleDragEnd() {
    setDraggedIndex(null);
    persistOrder(images);
  }

  async function handleImageReplace(index: number, file: File | undefined) {
    if (!file) return;
    const target = images[index];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/admin/residences/layout-images/${target.id}/replace`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to replace layout image");
      const updated = (await response.json()) as { id: number; src: string };
      // Cache-bust: the URL can repeat across replaces, so append a query param
      // to force the browser/next/image to fetch the new file instead of a cached copy.
      setImages((current) =>
        current.map((image, i) => (i === index ? { ...image, src: `${updated.src}?t=${Date.now()}` } : image))
      );
    } catch (error) {
      console.error("Failed to replace layout image:", error);
      window.alert("Failed to replace the image. Please try again.");
    }
  }

  function startEditing(key: StatKey) {
    setDraftValue(stats[key]);
    setEditingField(key);
  }

  async function commitEdit() {
    const key = editingField;
    setEditingField(null);
    if (!key) return;

    const previousValue = stats[key];
    const nextValue = draftValue;
    setStats((current) => ({ ...current, [key]: nextValue }));

    try {
      const response = await fetch(`/api/admin/residences/${residence.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: nextValue }),
      });
      if (!response.ok) throw new Error("Failed to update residence stat");
    } catch (error) {
      console.error("Failed to persist stat change:", error);
      setStats((current) => ({ ...current, [key]: previousValue }));
    }
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
            key={image.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(event) => handleDragOver(event, index)}
            onDrop={(event) => event.preventDefault()}
            onDragEnd={handleDragEnd}
            className={cn(
              "group relative aspect-square cursor-grab overflow-hidden rounded-lg border border-brand-forest-100 bg-brand-forest-50 active:cursor-grabbing",
              draggedIndex === index && "opacity-50",
            )}
          >
            {/* Blob-free now, but stays a plain img: cache-busting query params on repeated replaces don't play well with next/image's static optimizer. */}
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute left-1.5 top-1.5 rounded-md bg-black/40 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <DragHandleIcon className="h-3.5 w-3.5" />
            </div>
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
              aria-label={`Replace ${image.alt}`}
              className="hidden"
              onChange={(event) => handleImageReplace(index, event.target.files?.[0])}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
