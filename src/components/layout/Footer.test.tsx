import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the contact email, phone, and copyright", () => {
    render(<Footer />);
    expect(screen.getByText("sales@aaruliving.com")).toBeInTheDocument();
    expect(screen.getByText("+94 77 018 3334")).toBeInTheDocument();
    expect(screen.getByText(/© \d{4} Aaru/)).toBeInTheDocument();
  });

  it("renders the footer link groups", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Garden Condos" })).toHaveAttribute(
      "href",
      "/residences/garden-condos"
    );
  });
});
