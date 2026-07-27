import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UnitLayoutGallery } from "./UnitLayoutGallery";

const images = [
  { src: "/images/residences/garden-condos/layout-1.jpg", alt: "Garden Condos ground floor unit layout plan" },
  { src: "/images/residences/garden-condos/layout-2.jpg", alt: "Garden Condos unit layout, alternate view" },
];

describe("UnitLayoutGallery", () => {
  it("shows the first image as active by default", () => {
    render(<UnitLayoutGallery images={images} />);
    expect(screen.getByAltText("Garden Condos ground floor unit layout plan")).toBeInTheDocument();
  });

  it("switches the main image when a thumbnail is clicked", () => {
    render(<UnitLayoutGallery images={images} />);
    fireEvent.click(screen.getByRole("button", { name: "Show layout image 2" }));
    expect(screen.getByAltText("Garden Condos unit layout, alternate view")).toBeInTheDocument();
  });
});
