import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows a validation error when submitting with an empty first name", async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByText("First name is required")).toBeInTheDocument();
  });

  it("submits the form data to /api/contact and shows a success message", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("First Name*"), { target: { value: "Jane" } });
    fireEvent.change(screen.getByLabelText("Second Name*"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText("Phone*"), { target: { value: "771234567" } });
    fireEvent.change(screen.getByLabelText("Email*"), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText("Country Of Residents*"), { target: { value: "Sri Lanka" } });
    fireEvent.change(screen.getByLabelText("Where did you hear Us*"), { target: { value: "social-media" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" })
    ));

    const [, requestInit] = fetchMock.mock.calls[0];
    const body = JSON.parse(requestInit.body as string);
    expect(body).toMatchObject({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      countryOfResidence: "Sri Lanka",
      hearAboutUs: "social-media",
    });
    expect(body.dialCode).toMatch(/^\+94/);

    expect(await screen.findByText(/Thank you/i)).toBeInTheDocument();
  });
});
