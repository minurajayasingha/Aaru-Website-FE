import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CommercialSpacePage from "./page";

describe("CommercialSpacePage", () => {
  it("renders the page heading and all commercial amenities", () => {
    render(<CommercialSpacePage />);
    expect(screen.getByRole("heading", { level: 1, name: "Commercial Spaces" })).toBeInTheDocument();
    expect(screen.getByText("Clubhouse & Pool")).toBeInTheDocument();
    expect(screen.getByText("Co-working Spaces")).toBeInTheDocument();
  });
});
