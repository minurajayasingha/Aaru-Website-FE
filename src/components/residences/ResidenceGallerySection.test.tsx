import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResidenceGallerySection } from "./ResidenceGallerySection";
import type { GallerySection } from "@/content/residences";

describe("ResidenceGallerySection", () => {
  it("renders the heading and every image in a row-layout section", () => {
    const section: GallerySection = {
      heading: "Suit View",
      layout: "row",
      images: [
        { src: "/a.jpg", alt: "Image A" },
        { src: "/b.jpg", alt: "Image B" },
      ],
    };
    render(<ResidenceGallerySection section={section} />);
    expect(screen.getByText("Suit View")).toBeInTheDocument();
    expect(screen.getByAltText("Image A")).toBeInTheDocument();
    expect(screen.getByAltText("Image B")).toBeInTheDocument();
  });

  it("renders every image in a banner-layout section", () => {
    const section: GallerySection = {
      heading: "Suit Room",
      layout: "banner",
      images: [{ src: "/c.jpg", alt: "Image C" }],
    };
    render(<ResidenceGallerySection section={section} />);
    expect(screen.getByText("Suit Room")).toBeInTheDocument();
    expect(screen.getByAltText("Image C")).toBeInTheDocument();
  });
});
