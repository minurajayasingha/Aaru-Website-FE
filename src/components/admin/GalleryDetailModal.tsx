"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { CloseIcon, PencilIcon, UploadIcon, TrashIcon } from "./icons";
import type { AdminGalleryImage } from "@/content/admin/gallery";

type GalleryDetailModalProps = {
  image: AdminGalleryImage;
  categoryLabel: string;
  onClose: () => void;
  onRename: (id: string, name: string) => void;
  onReplace: (id: string, file: File | undefined) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
};

const actionButtonClasses =
  "rounded-lg border border-brand-forest-200 bg-white p-1.5 text-brand-forest-400 transition-colors hover:border-brand-forest-300 hover:bg-brand-forest-50 hover:text-brand-forest-700";

export function GalleryDetailModal({
  image,
  categoryLabel,
  onClose,
  onRename,
  onReplace,
  onDelete,
  onToggleStatus,
}: GalleryDetailModalProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(image.name);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function startEditing() {
    setDraftName(image.name);
    setIsEditingName(true);
  }

  function commitEdit() {
    onRename(image.id, draftName);
    setIsEditingName(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-brand-forest-50">
          {/* Blob URLs from URL.createObjectURL can't go through next/image's optimizer, so this stays a plain img. */}
          <img src={image.src} alt={image.name} className="h-full w-full object-contain" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-lg bg-white/90 p-1.5 text-brand-forest-700 hover:bg-white"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-3">
            {isEditingName ? (
              <input
                autoFocus
                type="text"
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                onBlur={commitEdit}
                onKeyDown={(event) => {
                  if (event.key === "Enter") commitEdit();
                  if (event.key === "Escape") setIsEditingName(false);
                }}
                className="min-w-0 flex-1 rounded-md border border-brand-forest-200 bg-white px-2 py-1 text-lg font-semibold text-brand-forest-900 focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            ) : (
              <h3 className="min-w-0 flex-1 truncate text-lg font-semibold text-brand-forest-900">{image.name}</h3>
            )}

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Replace image"
                aria-label="Replace image"
                className={actionButtonClasses}
              >
                <UploadIcon className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => onReplace(image.id, event.target.files?.[0])}
              />
              <button type="button" onClick={startEditing} title="Rename" aria-label="Rename" className={actionButtonClasses}>
                <PencilIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(image.id)}
                title="Delete"
                aria-label="Delete"
                className={cn(actionButtonClasses, "hover:border-red-200 hover:bg-red-50 hover:text-red-600")}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-brand-forest-400">Category</dt>
            <dd className="text-brand-forest-900">{categoryLabel}</dd>
            <dt className="text-brand-forest-400">Status</dt>
            <dd>
              <button
                type="button"
                onClick={() => onToggleStatus(image.id)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
                  image.status === "active"
                    ? "bg-brand-forest-600 text-white"
                    : "border border-brand-forest-200 bg-brand-forest-100 text-brand-forest-600",
                )}
              >
                {image.status === "active" ? "Active" : "Inactive"}
              </button>
            </dd>
            <dt className="text-brand-forest-400">Dimensions</dt>
            <dd className="text-brand-forest-900">
              {image.width} × {image.height}px
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
