import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StyleGuidePage, { metadata } from "./page";

describe("StyleGuidePage", () => {
  it("renders without crashing and includes key section headings", () => {
    render(<StyleGuidePage />);
    expect(screen.getByRole("heading", { name: "Colors" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Buttons" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Form Fields" })).toBeInTheDocument();
  });

  it("sets metadata to noindex, nofollow so the page is excluded from search engines", () => {
    expect(metadata.robots).toEqual(
      expect.objectContaining({ index: false, follow: false })
    );
  });
});
