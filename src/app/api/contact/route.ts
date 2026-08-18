import { NextResponse } from "next/server";
import { sendContactEmail, type ContactSubmission } from "@/lib/mailer";
import { createInquiry } from "@/db/queries/inquiries";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactSubmission>;

    if (
      !body.firstName?.trim() ||
      !body.lastName?.trim() ||
      !body.phone?.trim() ||
      !body.email?.trim() ||
      !body.countryOfResidence?.trim() ||
      !body.hearAboutUs?.trim()
    ) {
      return NextResponse.json(
        { error: "First name, second name, phone, email, country of residence and how you heard about us are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(body.email.trim())) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    const submission: ContactSubmission = {
      firstName: body.firstName,
      lastName: body.lastName,
      dialCode: body.dialCode ?? "+94",
      phone: body.phone,
      email: body.email,
      countryOfResidence: body.countryOfResidence,
      interestedIn: body.interestedIn ?? "",
      message: body.message ?? "",
      hearAboutUs: body.hearAboutUs,
    };

    await createInquiry(submission);

    try {
      await sendContactEmail(submission);
    } catch (emailError) {
      console.error("Contact email send failed (inquiry was saved):", emailError);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us via WhatsApp." },
      { status: 500 }
    );
  }
}
