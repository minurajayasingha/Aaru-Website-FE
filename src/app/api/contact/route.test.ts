import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import * as mailer from "@/lib/mailer";
import * as inquiriesQueries from "@/db/queries/inquiries";

const validBody = {
  firstName: "Jane",
  lastName: "Doe",
  dialCode: "+94",
  phone: "771234567",
  email: "jane@example.com",
  countryOfResidence: "Sri Lanka",
  interestedIn: "garden-condos",
  message: "Interested",
  hearAboutUs: "social-media",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(mailer, "sendContactEmail").mockResolvedValue();
    vi.spyOn(inquiriesQueries, "createInquiry").mockResolvedValue();
  });

  it("returns 400 when a required field is missing", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ ...validBody, firstName: "" }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
    expect(inquiriesQueries.createInquiry).not.toHaveBeenCalled();
  });

  it("saves the inquiry, sends the email, and returns 200 for a valid submission", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(validBody),
    });
    const response = await POST(request);
    expect(response.status).toBe(200);
    expect(inquiriesQueries.createInquiry).toHaveBeenCalledWith(
      expect.objectContaining({ firstName: "Jane", lastName: "Doe", email: "jane@example.com" })
    );
    expect(mailer.sendContactEmail).toHaveBeenCalledWith(
      expect.objectContaining({ firstName: "Jane", lastName: "Doe", email: "jane@example.com" })
    );
  });

  it("returns 400 when email is non-empty but invalid format", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ ...validBody, email: "not-an-email" }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBeTruthy();
  });

  it("still saves the inquiry and returns 200 when sendContactEmail throws", async () => {
    vi.spyOn(mailer, "sendContactEmail").mockRejectedValue(new Error("SMTP failure"));
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(validBody),
    });
    const response = await POST(request);
    expect(response.status).toBe(200);
    expect(inquiriesQueries.createInquiry).toHaveBeenCalled();
  });

  it("returns 500 and never attempts the email when createInquiry throws", async () => {
    vi.spyOn(inquiriesQueries, "createInquiry").mockRejectedValue(new Error("DB failure"));
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(validBody),
    });
    const response = await POST(request);
    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.error).toBeTruthy();
    expect(mailer.sendContactEmail).not.toHaveBeenCalled();
  });

  it("returns 500 with a JSON error body for malformed JSON in the request body", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: "{ this is not valid json",
    });
    const response = await POST(request);
    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.error).toBeTruthy();
  });
});
