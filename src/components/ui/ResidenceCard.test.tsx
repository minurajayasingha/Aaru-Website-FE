import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResidenceCard } from "./ResidenceCard";

describe("ResidenceCard", () => {
  it("renders the residence name, badge, and a link to its detail page", () => {
    render(
      <ResidenceCard
        slug="garden-condos"
        name="Garden Condos"
        floorLabel="Ground Floor"
        unitBadge="3 Unit"
        bedroomLabel="2 BD"
        sizeLabel="2,000 sqft"
        imageSrc="/images/residences/garden-condos.jpg"
        imageAlt="Garden Condos exterior with private pool"
      />
    );
    expect(screen.getByText("Garden Condos")).toBeInTheDocument();
    expect(screen.getByText("3 Unit")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View More/i })).toHaveAttribute(
      "href",
      "/residences/garden-condos"
    );
  });
});
