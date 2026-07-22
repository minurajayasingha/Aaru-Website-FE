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
});
