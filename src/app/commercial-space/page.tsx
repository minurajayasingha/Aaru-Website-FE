import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { commercialAmenities } from "@/content/amenities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Commercial Spaces",
  description:
    "Curated venues, wellness, and lifestyle experiences at Aaru: clubhouse, spa, signature dining, and co-working spaces.",
  path: "/commercial-space",
});

export default function CommercialSpacePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Commercial Space", path: "/commercial-space" }]} />

      <PageHero
        title="Commercial Spaces"
        subtitle="Curated venues, wellness, and lifestyle experiences at Aaru"
        imageSrc="/images/hero/commercial-space.jpg"
        imageAlt="Aaru's clubhouse and lagoon at dusk"
        height="sm"
      />

      <Reveal as="section" className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          eyebrow="Lifestyle Experiences At Aaru"
          title="Clubhouse & Lifestyle Amenities"
          level="h2"
          description="Aaru brings together premium commercial and lifestyle spaces for dining, leisure, wellness and productivity."
          className="mb-12"
        />
        <div className="grid gap-6 md:grid-cols-5">
          {commercialAmenities.map((amenity) => (
            <div key={amenity.id} className="flex flex-col items-center gap-2 text-center">
              <p className="font-display text-sm text-brand-forest-900">{amenity.name}</p>
              <p className="font-body text-xs text-brand-forest-700">{amenity.description}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-3xl text-brand-forest-900">A World of Leisure</h2>
          <p className="font-body text-brand-forest-700">
            From sunrise swims to sunset gatherings, Aaru is curated for moments that matter.
          </p>
          <Button href="/contact" variant="primary" className="w-fit">
            Contact Us
          </Button>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-card">
          <Image src="/images/commercial/leisure.jpg" alt="Aaru clubhouse pool deck at sunset" fill className="object-cover" />
        </div>
      </Reveal>
    </>
  );
}
