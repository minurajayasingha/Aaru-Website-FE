import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Navbar } from "./Navbar";

const contactPhone = "+94 77 018 3334";

describe("Navbar", () => {
  it("renders all nav links", () => {
    render(<Navbar contactPhone={contactPhone} />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Residences" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Gallery" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Commercial Space" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact Us" })).toBeInTheDocument();
  });

  it("opens the mobile drawer when the menu button is clicked", () => {
    render(<Navbar contactPhone={contactPhone} />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
  });

  it("reflects aria-expanded state on the toggle button", () => {
    render(<Navbar contactPhone={contactPhone} />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("renders the drawer with role=dialog when open", () => {
    render(<Navbar contactPhone={contactPhone} />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(toggle);
    expect(screen.getByRole("dialog", { name: /mobile navigation/i })).toBeInTheDocument();
  });

  it("closes the drawer when Escape is pressed", () => {
    render(<Navbar contactPhone={contactPhone} />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(toggle);
    expect(screen.getByRole("dialog", { name: /mobile navigation/i })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog", { name: /mobile navigation/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute("aria-expanded", "false");
  });
});
