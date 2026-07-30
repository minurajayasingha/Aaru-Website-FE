import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
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
    expect(screen.getByRole("button")).toHaveClass("bg-white");
  });

  it("visually and functionally disables a Link-rendered button when href + disabled are both set", () => {
    render(
      <Button href="/somewhere" disabled>
        Go
      </Button>
    );
    const link = screen.getByRole("link", { name: "Go" });

    expect(link).toHaveClass("opacity-50");
    expect(link).toHaveClass("pointer-events-none");
    expect(link).toHaveAttribute("aria-disabled", "true");

    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    fireEvent(link, clickEvent);
    expect(clickEvent.defaultPrevented).toBe(true);
  });

  it("forwards the onClick prop when rendered as a Link", () => {
    const onClick = vi.fn();
    render(
      <Button href="/somewhere" onClick={onClick}>
        Go
      </Button>
    );
    const link = screen.getByRole("link", { name: "Go" });

    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when the Link-rendered button is disabled", () => {
    const onClick = vi.fn();
    render(
      <Button href="/somewhere" disabled onClick={onClick}>
        Go
      </Button>
    );
    const link = screen.getByRole("link", { name: "Go" });

    fireEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });
});
