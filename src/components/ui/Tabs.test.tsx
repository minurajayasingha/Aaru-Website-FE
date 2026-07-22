import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Tabs } from "./Tabs";

const tabs = [
  { id: "residential", label: "Residential" },
  { id: "interior", label: "Interior" },
];

describe("Tabs", () => {
  it("renders all tab labels", () => {
    render(<Tabs tabs={tabs} activeId="residential" onChange={() => {}} />);
    expect(screen.getByText("Residential")).toBeInTheDocument();
    expect(screen.getByText("Interior")).toBeInTheDocument();
  });

  it("marks the active tab with aria-selected", () => {
    render(<Tabs tabs={tabs} activeId="interior" onChange={() => {}} />);
    expect(screen.getByRole("tab", { name: "Interior" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Residential" })).toHaveAttribute("aria-selected", "false");
  });

  it("calls onChange with the clicked tab id", () => {
    const onChange = vi.fn();
    render(<Tabs tabs={tabs} activeId="residential" onChange={onChange} />);
    screen.getByText("Interior").click();
    expect(onChange).toHaveBeenCalledWith("interior");
  });
});
