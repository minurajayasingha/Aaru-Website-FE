import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ResidencesPage from "./page";

describe("ResidencesPage", () => {
  it("renders a heading and a ResidenceCard link for each residence", () => {
    render(<ResidencesPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /View More/i })).toHaveLength(3);
    expect(screen.getByText("Garden Condos")).toBeInTheDocument();
    expect(screen.getByText("Condos")).toBeInTheDocument();
    expect(screen.getByText("Private Villas")).toBeInTheDocument();
  });
});
