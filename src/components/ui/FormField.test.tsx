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
    const errorEl = screen.getByText("Email is required");
    expect(errorEl).toBeInTheDocument();
    const field = screen.getByLabelText("Email");
    expect(field).toHaveClass("border-red-500");
    expect(field).toHaveAttribute("aria-describedby", errorEl.id);
  });
});

describe("Textarea", () => {
  it("renders a labeled textarea", () => {
    render(<Textarea label="Message" id="message" name="message" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Message").tagName).toBe("TEXTAREA");
  });

  it("shows an error message and error styling when error is provided", () => {
    render(
      <Textarea
        label="Message"
        id="message"
        name="message"
        value=""
        onChange={() => {}}
        error="Message is required"
      />
    );
    const errorEl = screen.getByText("Message is required");
    expect(errorEl).toBeInTheDocument();
    const field = screen.getByLabelText("Message");
    expect(field).toHaveClass("border-red-500");
    expect(field).toHaveAttribute("aria-describedby", errorEl.id);
  });

  it("shows a live character counter when maxLength is provided", () => {
    render(
      <Textarea
        label="Message"
        id="message"
        name="message"
        value="Hello"
        onChange={() => {}}
        maxLength={150}
      />
    );
    expect(screen.getByText("5/150 characters")).toBeInTheDocument();
  });

  it("does not render a counter when maxLength is not provided", () => {
    render(<Textarea label="Message" id="message" name="message" value="Hello" onChange={() => {}} />);
    expect(screen.queryByText(/characters$/)).not.toBeInTheDocument();
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
          { value: "condos", label: "Condo" },
        ]}
      />
    );
    expect(screen.getByLabelText("Interested In")).toHaveValue("garden-condos");
  });

  it("shows an error message and error styling when error is provided", () => {
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
          { value: "condos", label: "Condo" },
        ]}
        error="Please select an option"
      />
    );
    const errorEl = screen.getByText("Please select an option");
    expect(errorEl).toBeInTheDocument();
    const field = screen.getByLabelText("Interested In");
    expect(field).toHaveClass("border-red-500");
    expect(field).toHaveAttribute("aria-describedby", errorEl.id);
  });
});
