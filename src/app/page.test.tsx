import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the h1 tagline and links to Contact", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Arugam Bay's First Luxury Residential Real Estate Experience/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Contact Us" })[0]).toHaveAttribute("href", "/contact");
  });

  it("renders a ResidenceCard for each residence type", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("heading", { level: 3, name: "Garden Condos" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3, name: "Condos" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3, name: "Private Villas" })[0]).toBeInTheDocument();
  });
});
