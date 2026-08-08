import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GalleryGrid } from "./GalleryGrid";
import type { GalleryCategoryContent } from "@/content/gallery";

const testCategories: GalleryCategoryContent[] = [
  {
    id: "residential",
    label: "Residential",
    icon: "/images/icons/gallery/residential.svg",
    images: [
      {
        src: "/images/gallery/residential/sunset.jpg",
        alt: "Aaru residences at sunset by the lagoon",
        width: 4,
        height: 3,
      },
    ],
  },
  {
    id: "interior",
    label: "Interior",
    icon: "/images/icons/gallery/interior.svg",
    images: [
      {
        src: "/images/gallery/interior/bedroom.jpg",
        alt: "Suite bedroom with lagoon view",
        width: 4,
        height: 3,
      },
    ],
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    icon: "/images/icons/gallery/lifestyle.svg",
    images: [],
  },
  {
    id: "maps",
    label: "Maps & Plans",
    icon: "/images/icons/gallery/maps.svg",
    images: [],
  },
];

describe("GalleryGrid", () => {
  it("shows only the first category's images by default", () => {
    render(<GalleryGrid categories={testCategories} />);
    expect(screen.getByAltText("Aaru residences at sunset by the lagoon")).toBeInTheDocument();
    expect(screen.queryByAltText("Suite bedroom with lagoon view")).not.toBeInTheDocument();
  });

  it("switches to another category's images when its tab is clicked", () => {
    render(<GalleryGrid categories={testCategories} />);
    fireEvent.click(screen.getByText("Interior"));
    expect(screen.getByAltText("Suite bedroom with lagoon view")).toBeInTheDocument();
    expect(screen.queryByAltText("Aaru residences at sunset by the lagoon")).not.toBeInTheDocument();
  });

  it("shows a fallback message for a category with no images yet", () => {
    render(<GalleryGrid categories={testCategories} />);
    fireEvent.click(screen.getByText("Lifestyle"));
    expect(screen.getByText("More photos coming soon.")).toBeInTheDocument();
  });

  it("opens a lightbox with the full image when a thumbnail is clicked", () => {
    render(<GalleryGrid categories={testCategories} />);
    fireEvent.click(screen.getByRole("button", { name: /View larger image: Aaru residences at sunset/ }));

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByAltText("Aaru residences at sunset by the lagoon")).toBeInTheDocument();
  });

  it("closes the lightbox when the close button is clicked", async () => {
    render(<GalleryGrid categories={testCategories} />);
    fireEvent.click(screen.getByRole("button", { name: /View larger image: Aaru residences at sunset/ }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close image" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("closes the lightbox when the Escape key is pressed", async () => {
    render(<GalleryGrid categories={testCategories} />);
    fireEvent.click(screen.getByRole("button", { name: /View larger image: Aaru residences at sunset/ }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
