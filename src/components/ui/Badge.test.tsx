import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its text", () => {
    render(<Badge>3 Unit</Badge>);
    expect(screen.getByText("3 Unit")).toBeInTheDocument();
  });
});
