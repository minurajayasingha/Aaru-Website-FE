import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
  it("renders the title as an h1 when level is h1", () => {
    render(<SectionHeader title="Arugam Bay" level="h1" />);
    expect(screen.getByRole("heading", { level: 1, name: "Arugam Bay" })).toBeInTheDocument();
  });

  it("renders the title as an h2 when level is h2", () => {
    render(<SectionHeader title="Three Ways to Call Aaru Home" level="h2" />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders the eyebrow and description when provided", () => {
    render(
      <SectionHeader
        eyebrow="Residences For Sale"
        title="Three Ways to Call Aaru Home"
        level="h2"
        description="Low-density living designed for privacy, comfort and elevated coastal lifestyle."
      />
    );
    expect(screen.getByText("Residences For Sale")).toBeInTheDocument();
    expect(screen.getByText(/Low-density living/)).toBeInTheDocument();
  });
});
