"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Card } from "./ui/Card";
import { TabBar } from "./ui/TabBar";
import { SearchIcon, PencilIcon, UploadIcon, TrashIcon } from "./icons";
import { GalleryDetailModal } from "./GalleryDetailModal";
import type { GalleryCategory } from "@/content/gallery";
import type { AdminGalleryImage } from "@/content/admin/gallery";

type CategoryFilter = GalleryCategory | "all";

type GalleryViewProps = {
  initialImages: AdminGalleryImage[];
  categories: { id: GalleryCategory; label: string }[];
};

export function GalleryView({ initialImages, categories }: GalleryViewProps) {
  const [images, setImages] = useState(initialImages);
  const filterOptions: { label: string; value: CategoryFilter }[] = [
    { label: "All", value: "all" },
    ...categories.map((category) => ({ label: category.label, value: category.id })),
  ];
  const categoryLabels = Object.fromEntries(categories.map((category) => [category.id, category.label])) as Record<
    GalleryCategory,
    string
  >;
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const cancelledEditRef = useRef(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const selectedImage = images.find((image) => image.id === selectedId) ?? null;

  useEffect(() => {
    if (!selectedImage) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedId(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const filteredImages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return images.filter((image) => {
      const matchesCategory = categoryFilter === "all" || image.category === categoryFilter;
      const matchesQuery = query.length === 0 || image.name.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [images, categoryFilter, searchQuery]);

  function startEditing(image: AdminGalleryImage) {
    setDraftName(image.name);
    setEditingId(image.id);
  }

  function renameImage(id: string, name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setImages((current) => current.map((image) => (image.id === id ? { ...image, name: trimmed } : image)));
  }

  function commitEdit() {
    if (editingId) renameImage(editingId, draftName);
    setEditingId(null);
  }

  function cancelEdit() {
    cancelledEditRef.current = true;
    setEditingId(null);
  }

  function handleBlur() {
    if (cancelledEditRef.current) {
      cancelledEditRef.current = false;
      return;
    }
    commitEdit();
  }

  function handleReplaceImage(id: string, file: File | undefined) {
    if (!file) return;
    const nextSrc = URL.createObjectURL(file);
    setImages((current) =>
      current.map((image) => {
        if (image.id !== id) return image;
        if (image.src.startsWith("blob:")) URL.revokeObjectURL(image.src);
        return { ...image, src: nextSrc };
      }),
    );
  }

  function handleDelete(id: string) {
    if (!window.confirm("Remove this image from the gallery?")) return;
    setImages((current) => current.filter((image) => image.id !== id));
  }

  function toggleStatus(id: string) {
    setImages((current) =>
      current.map((image) =>
        image.id === id ? { ...image, status: image.status === "active" ? "inactive" : "active" } : image,
      ),
    );
  }

  const actionButtonClasses =
    "rounded-lg border border-brand-forest-200 bg-white p-1.5 text-brand-forest-400 transition-colors hover:border-brand-forest-300 hover:bg-brand-forest-50 hover:text-brand-forest-700";

  function renderActions(image: AdminGalleryImage) {
    return (
      <div className="flex items-center justify-end gap-1.5" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={() => fileInputRefs.current[image.id]?.click()}
          title="Replace image"
          aria-label="Replace image"
          className={actionButtonClasses}
        >
          <UploadIcon className="h-4 w-4" />
        </button>
        <input
          ref={(el) => {
            fileInputRefs.current[image.id] = el;
          }}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => handleReplaceImage(image.id, event.target.files?.[0])}
        />
        <button type="button" onClick={() => startEditing(image)} title="Rename" aria-label="Rename" className={actionButtonClasses}>
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => handleDelete(image.id)}
          title="Delete"
          aria-label="Delete"
          className={cn(actionButtonClasses, "hover:border-red-200 hover:bg-red-50 hover:text-red-600")}
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  function renderStatusBadge(image: AdminGalleryImage) {
    return (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          toggleStatus(image.id);
        }}
        className={cn(
          "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
          image.status === "active"
            ? "bg-brand-forest-600 text-white"
            : "border border-brand-forest-200 bg-brand-forest-100 text-brand-forest-600",
        )}
      >
        {image.status === "active" ? "Active" : "Inactive"}
      </button>
    );
  }

  function renderName(image: AdminGalleryImage) {
    if (editingId !== image.id) {
      return <span className="truncate">{image.name}</span>;
    }
    return (
      <input
        autoFocus
        type="text"
        value={draftName}
        onClick={(event) => event.stopPropagation()}
        onChange={(event) => setDraftName(event.target.value)}
        onBlur={handleBlur}
        onKeyDown={(event) => {
          if (event.key === "Enter") commitEdit();
          if (event.key === "Escape") cancelEdit();
        }}
        className="w-full rounded-md border border-brand-forest-200 bg-white px-2 py-1 text-sm text-brand-forest-900 focus:outline-none focus:ring-2 focus:ring-brand-gold"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-brand-forest-900">Gallery</h2>
        <p className="mt-1 text-sm text-brand-forest-400">Images shown in each gallery category on the public site.</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar options={filterOptions} value={categoryFilter} onChange={(value) => setCategoryFilter(value as CategoryFilter)} />

        <div className="relative w-full sm:w-64">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-forest-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search gallery..."
            aria-label="Search gallery"
            className="w-full rounded-full border border-brand-forest-100 bg-brand-forest-50 py-2 pl-9 pr-4 text-sm text-brand-forest-900 placeholder:text-brand-forest-400 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <Card>
          <p className="text-center text-sm text-brand-forest-400">No images match your filters.</p>
        </Card>
      ) : (
        <>
          <Card className="hidden overflow-hidden p-0 md:block">
            <table className="w-full table-fixed text-left text-sm">
              <thead className="bg-brand-forest-50 text-xs uppercase tracking-wide text-brand-forest-400">
                <tr>
                  <th className="w-24 px-6 py-3 font-medium">Image</th>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="w-28 px-6 py-3 font-medium">Status</th>
                  <th className="w-36 px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-forest-100">
                {filteredImages.map((image) => (
                  <tr
                    key={image.id}
                    onClick={() => setSelectedId(image.id)}
                    className="cursor-pointer transition-colors hover:bg-brand-forest-50"
                  >
                    <td className="px-6 py-3">
                      <div className="h-12 w-12 overflow-hidden rounded-lg border border-brand-forest-100 bg-brand-forest-50">
                        {/* Blob URLs from URL.createObjectURL can't go through next/image's optimizer, so this stays a plain img. */}
                        <img src={image.src} alt={image.name} className="h-full w-full object-cover" />
                      </div>
                    </td>
                    <td className="truncate px-6 py-3 font-medium text-brand-forest-900">{renderName(image)}</td>
                    <td className="px-6 py-3">{renderStatusBadge(image)}</td>
                    <td className="px-6 py-3">{renderActions(image)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="flex flex-col gap-4 md:hidden">
            {filteredImages.map((image) => (
              <Card key={image.id} onClick={() => setSelectedId(image.id)} className="flex cursor-pointer flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-brand-forest-100 bg-brand-forest-50">
                    <img src={image.src} alt={image.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <div className="truncate text-sm font-medium text-brand-forest-900">{renderName(image)}</div>
                    <div>{renderStatusBadge(image)}</div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1.5 border-t border-brand-forest-100 pt-3">
                  {renderActions(image)}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {selectedImage && (
        <GalleryDetailModal
          image={selectedImage}
          categoryLabel={categoryLabels[selectedImage.category]}
          onClose={() => setSelectedId(null)}
          onRename={renameImage}
          onReplace={handleReplaceImage}
          onDelete={handleDelete}
          onToggleStatus={toggleStatus}
        />
      )}
    </div>
  );
}
