import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders all nav links", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Residences" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Gallery" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Commercial Space" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact Us" })).toBeInTheDocument();
  });

  it("opens the mobile drawer when the menu button is clicked", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
  });
});
