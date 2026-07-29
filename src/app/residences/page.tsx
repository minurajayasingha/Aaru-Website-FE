import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { residences } from "@/content/residences";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ResidenceListingCard } from "@/components/residences/ResidenceListingCard";
import { Reveal } from "@/components/ui/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Residences",
  description:
    "Explore Aaru's three residence types in Arugam Bay: Garden Condos, Elevated Condos, and Private Villas.",
  path: "/residences",
});

export default function ResidencesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Residences", path: "/residences" }]} />

      <PageHero
        title="Residences"
        subtitle="Explore Aaru's three residence types in Arugam Bay"
        imageSrc="/images/hero/residences.png"
        imageAlt="Aaru's residences along the coastline at sunset"
        height="lg"
      />
      
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Residences For Sale"
          title="Three Ways to Call Aaru Home"
          level="h2"
          description="Low-density living designed for privacy, comfort and elevated coastal lifestyle."
          className="mb-12 text-center items-center"
        />
        <div className="grid gap-8 md:grid-cols-3">
          {residences.map((residence, index) => (
            <Reveal key={residence.slug} delay={index * 0.1}>
              <ResidenceListingCard
                slug={residence.slug}
                name={residence.name}
                floorLabel={residence.floorLabel}
                unitBadge={residence.unitBadge}
                bedroomLabel={residence.bedroomLabel}
                sizeLabel={residence.sizeLabel}
                cardAmenities={residence.cardAmenities}
                imageSrc={residence.cardImage.src}
                imageAlt={residence.cardImage.alt}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
