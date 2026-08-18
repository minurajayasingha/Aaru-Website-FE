import { describe, it, expect } from "vitest";
import { toAdminInquiries } from "./inquiries";
import type { Inquiry } from "@/db/schema";

describe("toAdminInquiries", () => {
  it("maps DB rows to the AdminInquiry shape", () => {
    const rows: Inquiry[] = [
      {
        id: 1,
        firstName: "Jane",
        lastName: "Doe",
        dialCode: "+94",
        phone: "771234567",
        email: "jane@example.com",
        countryOfResidence: "Sri Lanka",
        interestedIn: "garden-condos",
        hearAboutUs: "social-media",
        message: "Interested",
        status: "new",
        submittedAt: new Date("2026-08-01T12:00:00Z"),
      },
    ];

    const result = toAdminInquiries(rows);

    expect(result).toEqual([
      {
        id: "1",
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Interested",
        submittedAt: "2026-08-01",
        status: "new",
      },
    ]);
  });
});
