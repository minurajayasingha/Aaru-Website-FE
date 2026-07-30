import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the h1 tagline and links to Residences and Contact", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Arugam Bay's first luxury residential real estate experience/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore Residences" })).toHaveAttribute("href", "/residences");
    expect(screen.getAllByRole("link", { name: "Contact Us" })[0]).toHaveAttribute("href", "/contact");
  });

  it("renders a ResidenceCard for each residence type", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("heading", { level: 3, name: "Garden Condos" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3, name: "Condos" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3, name: "Private Villas" })[0]).toBeInTheDocument();
  });
});
