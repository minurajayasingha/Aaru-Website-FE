import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GalleryGrid } from "./GalleryGrid";
import { galleryCategories } from "@/content/gallery";
import type { GalleryImage } from "@/content/gallery";

const testImages: GalleryImage[] = [
  { src: "/images/gallery/residential/sunset.jpg", alt: "Aaru residences at sunset by the lagoon", category: "residential" },
  { src: "/images/gallery/residential/reflection.jpg", alt: "Lagoon reflecting palm trees at Aaru", category: "residential" },
  { src: "/images/gallery/interior/bedroom.jpg", alt: "Suite bedroom with lagoon view", category: "interior" },
];

describe("GalleryGrid", () => {
  it("shows only residential images by default", () => {
    render(<GalleryGrid images={testImages} categories={galleryCategories} />);
    expect(screen.getByAltText("Aaru residences at sunset by the lagoon")).toBeInTheDocument();
    expect(screen.queryByAltText("Suite bedroom with lagoon view")).not.toBeInTheDocument();
  });

  it("switches to interior images when the Interior tab is clicked", () => {
    render(<GalleryGrid images={testImages} categories={galleryCategories} />);
    fireEvent.click(screen.getByText("Interior"));
    expect(screen.getByAltText("Suite bedroom with lagoon view")).toBeInTheDocument();
    expect(screen.queryByAltText("Aaru residences at sunset by the lagoon")).not.toBeInTheDocument();
  });
});
