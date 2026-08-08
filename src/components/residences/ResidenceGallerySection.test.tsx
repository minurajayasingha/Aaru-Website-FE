import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResidenceGallerySection } from "./ResidenceGallerySection";
import type { EnrichedGallerySection } from "@/lib/residenceGalleryImages";

describe("ResidenceGallerySection", () => {
  it("renders the heading and every image in a row-layout section", () => {
    const section: EnrichedGallerySection = {
      heading: "Suit View",
      layout: "row",
      images: [
        { src: "/a.jpg", alt: "Image A", width: 4, height: 5 },
        { src: "/b.jpg", alt: "Image B", width: 4, height: 5 },
      ],
    };
    render(<ResidenceGallerySection section={section} />);
    expect(screen.getByText("Suit View")).toBeInTheDocument();
    expect(screen.getByAltText("Image A")).toBeInTheDocument();
    expect(screen.getByAltText("Image B")).toBeInTheDocument();
  });

  it("renders every image in a banner-layout section", () => {
    const section: EnrichedGallerySection = {
      heading: "Suit Room",
      layout: "banner",
      images: [{ src: "/c.jpg", alt: "Image C", width: 21, height: 7 }],
    };
    render(<ResidenceGallerySection section={section} />);
    expect(screen.getByText("Suit Room")).toBeInTheDocument();
    expect(screen.getByAltText("Image C")).toBeInTheDocument();
  });

  it("opens a lightbox with the full image when a thumbnail is clicked", () => {
    const section: EnrichedGallerySection = {
      heading: "Suit View",
      layout: "row",
      images: [{ src: "/a.jpg", alt: "Image A", width: 4, height: 5 }],
    };
    render(<ResidenceGallerySection section={section} />);
    fireEvent.click(screen.getByRole("button", { name: "View larger image: Image A" }));

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByAltText("Image A")).toBeInTheDocument();
  });

  it("closes the lightbox when the close button is clicked", async () => {
    const section: EnrichedGallerySection = {
      heading: "Suit View",
      layout: "row",
      images: [{ src: "/a.jpg", alt: "Image A", width: 4, height: 5 }],
    };
    render(<ResidenceGallerySection section={section} />);
    fireEvent.click(screen.getByRole("button", { name: "View larger image: Image A" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close image" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
