import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { residences } from "@/content/residences";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ResidenceCard } from "@/components/ui/ResidenceCard";
import { Reveal } from "@/components/ui/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

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
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          eyebrow="Residences For Sale"
          title="Three Ways to Call Aaru Home"
          level="h1"
          description="Low-density living designed for privacy, comfort and elevated coastal lifestyle."
          className="mb-12 text-center items-center"
        />
        <div className="grid gap-8 md:grid-cols-3">
          {residences.map((residence, index) => (
            <Reveal key={residence.slug} delay={index * 0.1}>
              <ResidenceCard
                slug={residence.slug}
                name={residence.name}
                floorLabel={residence.floorLabel}
                unitBadge={residence.unitBadge}
                bedroomLabel={residence.bedroomLabel}
                sizeLabel={residence.sizeLabel}
                imageSrc={residence.heroImage.src}
                imageAlt={residence.heroImage.alt}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
