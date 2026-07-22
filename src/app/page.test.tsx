import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "./page";

describe("HomePage placeholder", () => {
  it("renders the Aaru Living text", () => {
    render(<HomePage />);
    expect(screen.getByText("Aaru Living")).toBeInTheDocument();
  });
});
