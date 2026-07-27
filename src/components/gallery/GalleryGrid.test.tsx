import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GalleryGrid } from "./GalleryGrid";
import type { GalleryCategoryContent } from "@/content/gallery";

const testCategories: GalleryCategoryContent[] = [
  {
    id: "residential",
    label: "Residential",
    icon: "/images/icons/gallery/residential.svg",
    sections: [
      {
        slug: "suit-view",
        heading: "Suit View",
        images: [
          {
            src: "/images/gallery/residential/suit-view/sunset.jpg",
            alt: "Aaru residences at sunset by the lagoon",
            width: 4,
            height: 3,
          },
        ],
      },
    ],
  },
  {
    id: "interior",
    label: "Interior",
    icon: "/images/icons/gallery/interior.svg",
    sections: [
      {
        slug: "_root",
        heading: null,
        images: [
          {
            src: "/images/gallery/interior/bedroom.jpg",
            alt: "Suite bedroom with lagoon view",
            width: 4,
            height: 3,
          },
        ],
      },
    ],
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    icon: "/images/icons/gallery/lifestyle.svg",
    sections: [],
  },
  {
    id: "maps",
    label: "Maps & Plans",
    icon: "/images/icons/gallery/maps.svg",
    sections: [],
  },
];

describe("GalleryGrid", () => {
  it("shows only the first category's images by default, grouped under their section heading", () => {
    render(<GalleryGrid categories={testCategories} />);
    expect(screen.getByText("Suit View")).toBeInTheDocument();
    expect(screen.getByAltText("Aaru residences at sunset by the lagoon")).toBeInTheDocument();
    expect(screen.queryByAltText("Suite bedroom with lagoon view")).not.toBeInTheDocument();
  });

  it("switches to another category's images when its tab is clicked", () => {
    render(<GalleryGrid categories={testCategories} />);
    fireEvent.click(screen.getByText("Interior"));
    expect(screen.getByAltText("Suite bedroom with lagoon view")).toBeInTheDocument();
    expect(screen.queryByAltText("Aaru residences at sunset by the lagoon")).not.toBeInTheDocument();
  });

  it("shows a fallback message for a category with no sections yet", () => {
    render(<GalleryGrid categories={testCategories} />);
    fireEvent.click(screen.getByText("Lifestyle"));
    expect(screen.getByText("More photos coming soon.")).toBeInTheDocument();
  });
});
