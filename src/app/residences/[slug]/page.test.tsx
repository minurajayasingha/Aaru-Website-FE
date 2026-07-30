import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ResidenceDetailPage, { generateStaticParams } from "./page";

describe("ResidenceDetailPage", () => {
  it("renders the residence name as h1 and its amenities", async () => {
    const Page = await ResidenceDetailPage({ params: Promise.resolve({ slug: "garden-condos" }) });
    render(Page);
    expect(screen.getByRole("heading", { level: 1, name: "Garden Condos" })).toBeInTheDocument();
    expect(screen.getAllByText("Private Pool").length).toBeGreaterThan(0);
  });

  it("generates static params for all three residence slugs", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual(
      expect.arrayContaining([
        { slug: "garden-condos" },
        { slug: "condos" },
        { slug: "private-villas" },
      ])
    );
  });
});
