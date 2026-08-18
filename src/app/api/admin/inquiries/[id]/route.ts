import { NextResponse } from "next/server";
import { updateInquiryStatus } from "@/db/queries/inquiries";

const VALID_STATUSES = ["new", "in-progress", "closed"] as const;

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId)) {
      return NextResponse.json({ error: "Invalid inquiry id" }, { status: 400 });
    }

    const body = (await request.json()) as { status?: string };
    if (!body.status || !VALID_STATUSES.includes(body.status as (typeof VALID_STATUSES)[number])) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await updateInquiryStatus(numericId, body.status as (typeof VALID_STATUSES)[number]);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Update inquiry status API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
