import { NextResponse } from "next/server";
import { updateSiteSettings } from "@/db/queries/siteSettings";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as { contactPhone?: string; contactEmail?: string };

    if (!body.contactPhone?.trim() || !body.contactEmail?.trim()) {
      return NextResponse.json({ error: "Phone number and email are required" }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(body.contactEmail.trim())) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    await updateSiteSettings({
      contactPhone: body.contactPhone.trim(),
      contactEmail: body.contactEmail.trim(),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Update site settings API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
