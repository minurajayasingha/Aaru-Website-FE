import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("renders children inside a div by default", () => {
    render(<Container>content</Container>);
    expect(screen.getByText("content").tagName).toBe("DIV");
  });

  it("caps content width at 1600px and centers it", () => {
    render(<Container>content</Container>);
    expect(screen.getByText("content")).toHaveClass("max-w-[1600px]", "mx-auto");
  });

  it('renders as a nav element when as="nav" is passed', () => {
    render(<Container as="nav">content</Container>);
    expect(screen.getByText("content").tagName).toBe("NAV");
  });

  it("forwards extra props such as role and merges extra classNames", () => {
    render(
      <Container role="tablist" className="flex gap-4">
        content
      </Container>,
    );
    const el = screen.getByRole("tablist");
    expect(el).toHaveClass("flex", "gap-4", "max-w-[1600px]");
  });
});
