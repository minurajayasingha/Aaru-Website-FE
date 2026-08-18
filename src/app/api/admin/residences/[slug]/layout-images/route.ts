import { NextResponse } from "next/server";
import { getLayoutImagesBySlug, setLayoutImageOrder } from "@/db/queries/residenceLayoutImages";
import { residences } from "@/content/residences";

const VALID_SLUGS = new Set(residences.map((residence) => residence.slug));

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    if (!VALID_SLUGS.has(slug)) {
      return NextResponse.json({ error: "Residence not found" }, { status: 404 });
    }

    const body = (await request.json()) as { orderedIds?: number[] };
    if (!Array.isArray(body.orderedIds) || body.orderedIds.length === 0) {
      return NextResponse.json({ error: "orderedIds is required" }, { status: 400 });
    }

    const existing = await getLayoutImagesBySlug(slug);
    const existingIds = new Set(existing.map((row) => row.id));
    const isValidSet =
      body.orderedIds.length === existingIds.size && body.orderedIds.every((id) => existingIds.has(id));
    if (!isValidSet) {
      return NextResponse.json({ error: "orderedIds must match this residence's layout images" }, { status: 400 });
    }

    await setLayoutImageOrder(body.orderedIds);
    const updated = await getLayoutImagesBySlug(slug);
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Residence layout image reorder API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
