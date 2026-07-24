import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site";
import { residences } from "@/content/residences";
import { commercialAmenities } from "@/content/amenities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ResidenceCard } from "@/components/ui/ResidenceCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Aaru Living | Luxury Residences in Arugam Bay",
  description:
    "Aaru is Arugam Bay's first luxury residential real estate experience — 19 condo units and 3 private villas, 250m from the beach.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="relative flex h-screen items-center justify-center text-center text-brand-cream">
        <Image
          src="/images/hero/home.jpg"
          alt="Aaru's residences beside a lagoon in Arugam Bay"
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-10 flex flex-col items-center gap-6 px-6">
          <h1 className="font-heading text-heading-sm md:text-heading-md max-w-2xl">{siteConfig.tagline}</h1>
          <div className="flex gap-4">
            <Button href="/residences" variant="primary">
              Explore Residences
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Reveal as="section" className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center">
        <SectionHeader
          eyebrow="A New Standard For"
          title="Arugam Bay"
          level="h2"
          size="md"
          description="Aaru is a landmark residential estate where refined architecture meets the raw natural beauty of Sri Lanka's East Coast."
        />
        <div className="relative aspect-video overflow-hidden rounded-card">
          <Image src="/images/home/beach.jpg" alt="Aerial view of Arugam Bay's coastline" fill className="object-cover" />
        </div>
      </Reveal>

      <Reveal as="section" className="bg-brand-forest-800 py-16 text-brand-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-5">
          <div>
            <p className="font-heading text-heading-sm">{siteConfig.stats.totalSiteAcres}</p>
          </div>
          <div>
            <p className="font-heading text-heading-sm">{siteConfig.stats.totalPerches}</p>
          </div>
          <div>
            <p className="font-heading text-heading-sm">{siteConfig.stats.condoUnits}</p>
          </div>
          <div>
            <p className="font-heading text-heading-sm">{siteConfig.stats.privateVillas}</p>
          </div>
          <div>
            <p className="font-heading text-heading-sm">{siteConfig.stats.distanceToBeach}</p>
          </div>
        </div>
      </Reveal>

      <section className="mx-auto max-w-7xl px-6 py-24">
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

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-5">
          {commercialAmenities.map((amenity) => (
            <div key={amenity.id} className="flex flex-col items-center gap-2 text-center">
              <p className="font-subheading uppercase text-subheading-sm text-brand-forest-900">{amenity.name}</p>
              <p className="font-body text-xs text-brand-forest-700">{amenity.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
