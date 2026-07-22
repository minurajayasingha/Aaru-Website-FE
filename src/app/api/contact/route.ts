import { NextResponse } from "next/server";
import { sendContactEmail, type ContactSubmission } from "@/lib/mailer";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactSubmission>;

  if (!body.fullName?.trim() || !body.email?.trim()) {
    return NextResponse.json({ error: "Full name and email are required" }, { status: 400 });
  }

  await sendContactEmail({
    fullName: body.fullName,
    email: body.email,
    phone: body.phone ?? "",
    interestedIn: body.interestedIn ?? "",
    message: body.message ?? "",
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
