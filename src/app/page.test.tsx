import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HomePage from "./page";
import * as residencesQueries from "@/db/queries/residences";
import { residences } from "@/content/residences";

vi.mock("@/db/queries/residences");

describe("HomePage", () => {
  beforeEach(() => {
    vi.mocked(residencesQueries.getResidencesWithOverrides).mockResolvedValue(residences);
  });

  it("renders the h1 tagline and links to Contact", async () => {
    render(await HomePage());
    expect(
      screen.getByRole("heading", { level: 1, name: /Arugam Bay's First Luxury Residential Real Estate Experience/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Contact Us" })[0]).toHaveAttribute("href", "/contact");
  });

  it("renders a ResidenceCard for each residence type", async () => {
    render(await HomePage());
    expect(screen.getAllByRole("heading", { level: 3, name: "Garden Condos" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3, name: "Condos" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3, name: "Private Villas" })[0]).toBeInTheDocument();
  });
});
