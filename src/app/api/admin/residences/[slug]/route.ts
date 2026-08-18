import { NextResponse } from "next/server";
import { getResidenceStats, updateResidenceStats } from "@/db/queries/residenceStats";
import { residences } from "@/content/residences";

const VALID_SLUGS = new Set(residences.map((residence) => residence.slug));

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    if (!VALID_SLUGS.has(slug)) {
      return NextResponse.json({ error: "Residence not found" }, { status: 404 });
    }

    const body = (await request.json()) as {
      unitsAvailableLabel?: string;
      sizeLabel?: string;
      priceLabel?: string;
    };
    const changes: Partial<{ unitsAvailableLabel: string; sizeLabel: string; priceLabel: string }> = {};
    if (body.unitsAvailableLabel !== undefined) changes.unitsAvailableLabel = body.unitsAvailableLabel;
    if (body.sizeLabel !== undefined) changes.sizeLabel = body.sizeLabel;
    if (body.priceLabel !== undefined) changes.priceLabel = body.priceLabel;

    if (Object.keys(changes).length === 0) {
      return NextResponse.json({ error: "No changes provided" }, { status: 400 });
    }

    await updateResidenceStats(slug, changes);
    const updated = await getResidenceStats(slug);
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Residence stats update API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
