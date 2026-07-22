import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GalleryGrid } from "./GalleryGrid";
import { galleryImages, galleryCategories } from "@/content/gallery";

describe("GalleryGrid", () => {
  it("shows only residential images by default", () => {
    render(<GalleryGrid images={galleryImages} categories={galleryCategories} />);
    expect(screen.getByAltText("Aaru residences at sunset by the lagoon")).toBeInTheDocument();
    expect(screen.queryByAltText("Suite bedroom with lagoon view")).not.toBeInTheDocument();
  });

  it("switches to interior images when the Interior tab is clicked", () => {
    render(<GalleryGrid images={galleryImages} categories={galleryCategories} />);
    fireEvent.click(screen.getByText("Interior"));
    expect(screen.getByAltText("Suite bedroom with lagoon view")).toBeInTheDocument();
    expect(screen.queryByAltText("Aaru residences at sunset by the lagoon")).not.toBeInTheDocument();
  });
});
