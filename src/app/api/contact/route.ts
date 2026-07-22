import { NextResponse } from "next/server";
import { sendContactEmail, type ContactSubmission } from "@/lib/mailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactSubmission>;

    if (!body.fullName?.trim() || !body.email?.trim()) {
      return NextResponse.json({ error: "Full name and email are required" }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(body.email.trim())) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    await sendContactEmail({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone ?? "",
      interestedIn: body.interestedIn ?? "",
      message: body.message ?? "",
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us via WhatsApp." },
      { status: 500 }
    );
  }
}
