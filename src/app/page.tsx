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
import { SplitSection } from "@/components/ui/SplitSection";

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

      <SplitSection
        eyebrow="A New Standard For"
        title="Arugam Bay"
        paragraphs={[
          "Aaru is a landmark residential estate where refined architecture meets the raw natural beauty of Sri Lanka's East Coast.",
          "Designed around lagoon views, wellness, privacy and coastal living — this is your definitive claim on the East.",
        ]}
        ctaLabel="Contact Us"
        ctaHref="/contact"
        imageSrc="/images/home/beach.png"
        imageAlt="Aerial view of Arugam Bay's coastline"
        imagePosition="right"
      />


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
      
      <SplitSection
        eyebrow="Map"
        title="Prime Location"
        paragraphs={[
          "Set on Sri Lanka's eastern frontier, Aaru places you between the raw energy of Arugam Bay's world-class surf coast and the calm beauty of the lagoon. With the beach only 250m away, the estate connects ocean, wetlands, wildlife, wellness, and refined residential living in one rare coastal address.",
        ]}
        ctaLabel="See Location"
        ctaHref={`https://www.google.com/maps?q=${siteConfig.location.latitude},${siteConfig.location.longitude}`}
        ctaTarget="_blank"
        imageSrc="/images/home/map.png"
        imageAlt="Map showing Aaru's location in Arugam Bay relative to the lagoon and nearby cities"
        imagePosition="left"
        imageFit="contain"
      />
    </>
  );
}
