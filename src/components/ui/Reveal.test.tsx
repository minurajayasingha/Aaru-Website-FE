import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(<Reveal>Visible content</Reveal>);
    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });

  it("renders as a section element when as='section'", () => {
    render(<Reveal as="section">Section content</Reveal>);
    expect(screen.getByText("Section content").tagName).toBe("SECTION");
  });
});
