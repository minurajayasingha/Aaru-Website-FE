import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { motionValue } from "framer-motion";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the contact email, phone, and copyright", () => {
    render(<Footer progress={motionValue(1)} />);
    expect(screen.getByText("sales@aaruliving.com")).toBeInTheDocument();
    expect(screen.getByText("+94 77 018 3334")).toBeInTheDocument();
    expect(screen.getByText(/Aaru Living\. All Rights Reserved\./)).toBeInTheDocument();
  });

  it("renders the footer link groups", () => {
    render(<Footer progress={motionValue(1)} />);
    expect(screen.getByRole("link", { name: "Garden Condos" })).toHaveAttribute(
      "href",
      "/residences/garden-condos"
    );
  });
});
