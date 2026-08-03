import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders the Navbar, children, and Footer", () => {
    render(
      <RootLayout>
        <p>Page content</p>
      </RootLayout>
    );
    // Both the Navbar and the Footer legitimately render a "Home" link
    // (per the Task 8 content data), so assert on the collection rather
    // than a single unique match.
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByText(/© \d{4} Aaru/)).toBeInTheDocument();
  });
});
