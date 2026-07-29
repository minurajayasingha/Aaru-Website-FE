import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HomeFeatureSection } from "./HomeFeatureSection";

describe("HomeFeatureSection", () => {
  it("renders the title, paragraph, image, and both CTAs", () => {
    render(
      <HomeFeatureSection
        title="More Than a Home, It's a Way of Life"
        paragraph="Clubhouse, wellness, dining, co-working and connectivity."
        ctaLabel="Commercial Space"
        ctaHref="/commercial-space"
        secondaryCtaLabel="Contact Us"
        secondaryCtaHref="/contact"
        imageSrc="/images/home/lifestyle.png"
        imageAlt="Aaru's clubhouse and pool deck at sunset"
      />,
    );

    expect(screen.getByRole("heading", { name: "More Than a Home, It's a Way of Life" })).toBeInTheDocument();
    expect(screen.getByAltText("Aaru's clubhouse and pool deck at sunset")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Commercial Space" })).toHaveAttribute("href", "/commercial-space");
    expect(screen.getByRole("link", { name: "Contact Us" })).toHaveAttribute("href", "/contact");
  });

  it("omits the secondary CTA when none is given", () => {
    render(
      <HomeFeatureSection
        title="More Than a Home, It's a Way of Life"
        paragraph="Clubhouse, wellness, dining, co-working and connectivity."
        ctaLabel="Commercial Space"
        ctaHref="/commercial-space"
        imageSrc="/images/home/lifestyle.png"
        imageAlt="Aaru's clubhouse and pool deck at sunset"
      />,
    );

    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});
