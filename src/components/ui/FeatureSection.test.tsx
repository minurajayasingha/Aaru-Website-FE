import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FeatureSection } from "./FeatureSection";

describe("FeatureSection", () => {
  it("renders the title, paragraph, image, and CTA", () => {
    render(
      <FeatureSection
        title="A World of Leisure"
        paragraph="From sunrise swims to sunset gatherings."
        ctaLabel="Contact Us"
        ctaHref="/contact"
        imageSrc="/images/commercial/leisure.jpg"
        imageAlt="Aaru clubhouse pool deck at sunset"
      />,
    );

    expect(screen.getByRole("heading", { name: "A World of Leisure" })).toBeInTheDocument();
    expect(screen.getByText("From sunrise swims to sunset gatherings.")).toBeInTheDocument();
    expect(screen.getByAltText("Aaru clubhouse pool deck at sunset")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact Us" })).toHaveAttribute("href", "/contact");
  });

  it("omits the CTA button when no ctaLabel/ctaHref is given", () => {
    render(
      <FeatureSection
        title="Clubhouse & Pool"
        paragraph="Our 21,000+ sqft residence is the social heart of Aaru."
        imageSrc="/images/commercial/clubhouse-pool.jpg"
        imageAlt="Aaru clubhouse and pool"
        imagePosition="left"
      />,
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
