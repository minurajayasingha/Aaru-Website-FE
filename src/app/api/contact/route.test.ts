import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import * as mailer from "@/lib/mailer";

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.spyOn(mailer, "sendContactEmail").mockResolvedValue();
  });

  it("returns 400 when fullName or email is missing", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ fullName: "", email: "", phone: "", interestedIn: "", message: "" }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("sends the email and returns 200 for a valid submission", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        fullName: "Jane Doe",
        email: "jane@example.com",
        phone: "+94771234567",
        interestedIn: "garden-condos",
        message: "Interested",
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(200);
    expect(mailer.sendContactEmail).toHaveBeenCalledWith(
      expect.objectContaining({ fullName: "Jane Doe", email: "jane@example.com" })
    );
  });

  it("returns 400 when email is non-empty but invalid format", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        fullName: "Jane Doe",
        email: "not-an-email",
        phone: "",
        interestedIn: "",
        message: "",
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBeTruthy();
  });

  it("returns 500 with a JSON error body when sendContactEmail throws", async () => {
    vi.spyOn(mailer, "sendContactEmail").mockRejectedValue(new Error("SMTP failure"));
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        fullName: "Jane Doe",
        email: "jane@example.com",
        phone: "",
        interestedIn: "",
        message: "Interested",
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.error).toBeTruthy();
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
