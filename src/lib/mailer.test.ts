import { describe, it, expect, vi, beforeEach } from "vitest";
import nodemailer from "nodemailer";
import { sendContactEmail } from "./mailer";

vi.mock("nodemailer");

describe("sendContactEmail", () => {
  beforeEach(() => {
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_PORT = "587";
    process.env.SMTP_USER = "user@example.com";
    process.env.SMTP_PASS = "secret";
    process.env.CONTACT_TO_EMAIL = "sales@aaruliving.com";
  });

  it("sends an email via a Nodemailer transport built from env vars", async () => {
    const sendMail = vi.fn().mockResolvedValue({ messageId: "1" });
    vi.mocked(nodemailer.createTransport).mockReturnValue({ sendMail } as never);

    await sendContactEmail({
      firstName: "Jane",
      lastName: "Doe",
      dialCode: "+94",
      phone: "771234567",
      email: "jane@example.com",
      countryOfResidence: "Sri Lanka",
      interestedIn: "garden-condos",
      message: "I'm interested in Garden Condos.",
      hearAboutUs: "social-media",
    });

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: "smtp.example.com",
      port: 587,
      auth: { user: "user@example.com", pass: "secret" },
    });
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "sales@aaruliving.com",
        subject: expect.stringContaining("Jane Doe"),
      })
    );
  });
});
