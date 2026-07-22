import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children as a button by default", () => {
    render(<Button>Contact Us</Button>);
    expect(screen.getByRole("button", { name: "Contact Us" })).toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    render(<Button href="/contact">Contact Us</Button>);
    const link = screen.getByRole("link", { name: "Contact Us" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("applies the disabled attribute", () => {
    render(<Button disabled>Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  it("applies secondary variant classes", () => {
    render(<Button variant="secondary">Explore</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-brand-cream");
  });
});
