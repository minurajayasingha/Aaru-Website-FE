import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RootLayout from "./layout";

vi.mock("@/db/queries/siteSettings", () => ({
  getSiteSettings: vi.fn().mockResolvedValue({
    contactPhone: "+94 77 018 3334",
    contactEmail: "sales@aaruliving.com",
  }),
}));

describe("RootLayout", () => {
  it("renders the Navbar, children, and Footer", async () => {
    const Layout = await RootLayout({ children: <p>Page content</p> });
    render(Layout);
    // Both the Navbar and the Footer legitimately render a "Home" link
    // (per the Task 8 content data), so assert on the collection rather
    // than a single unique match.
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByText(/© \d{4} Aaru/)).toBeInTheDocument();
  });
});
