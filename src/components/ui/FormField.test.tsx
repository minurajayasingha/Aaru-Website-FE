import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select } from "./Select";

describe("Input", () => {
  it("renders a labeled text input", () => {
    render(<Input label="Full Name" id="fullName" name="fullName" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
  });

  it("shows an error message and error styling when error is provided", () => {
    render(
      <Input label="Email" id="email" name="email" value="" onChange={() => {}} error="Email is required" />
    );
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveClass("border-red-500");
  });
});

describe("Textarea", () => {
  it("renders a labeled textarea", () => {
    render(<Textarea label="Message" id="message" name="message" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Message").tagName).toBe("TEXTAREA");
  });
});

describe("Select", () => {
  it("renders a labeled select with options", () => {
    const onChange = vi.fn();
    render(
      <Select
        label="Interested In"
        id="interest"
        name="interest"
        value="garden-condos"
        onChange={onChange}
        options={[
          { value: "garden-condos", label: "Garden Condo" },
          { value: "elevated-condos", label: "Elevated Condo" },
        ]}
      />
    );
    expect(screen.getByLabelText("Interested In")).toHaveValue("garden-condos");
  });
});
