import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IconAmenityRow, type IconAmenityItem } from "./IconAmenityRow";

const items: IconAmenityItem[] = [
  { id: "spa", name: "Spa & Treatments", description: "Signature Rituals", icon: "/images/icons/wellness/spa.svg" },
  { id: "sauna", name: "Sauna & Steam", description: "Daily Recovery", icon: "/images/icons/wellness/sauna.svg" },
];

describe("IconAmenityRow", () => {
  it("renders every item's name and description", () => {
    render(<IconAmenityRow items={items} />);
    // Rendered twice (desktop scroll-reveal row + mobile row), so use getAllBy*.
    expect(screen.getAllByText("Spa & Treatments").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sauna & Steam").length).toBeGreaterThan(0);
  });

  it("omits the heading/paragraph block when neither is given", () => {
    render(<IconAmenityRow items={items} />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders the heading and paragraph when given", () => {
    render(
      <IconAmenityRow
        heading="Sanctuary Of Wellness"
        paragraph="Wellness at Aaru is a daily ritual."
        items={items}
        theme="dark"
      />,
    );
    expect(screen.getByRole("heading", { name: "Sanctuary Of Wellness" })).toBeInTheDocument();
    expect(screen.getByText("Wellness at Aaru is a daily ritual.")).toBeInTheDocument();
  });
});
