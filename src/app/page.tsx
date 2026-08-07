import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site";
import { residences } from "@/content/residences";
import { commercialAmenities } from "@/content/amenities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { SplitSection } from "@/components/ui/SplitSection";
import { StatsSection } from "@/components/ui/StatsSection";
import { CommercialAmenitiesRow } from "@/components/home/CommercialAmenitiesRow";
import { HomeFeatureSection } from "@/components/home/HomeFeatureSection";
import { ResidenceCardsRow } from "@/components/home/ResidenceCardsRow";

export const metadata: Metadata = buildMetadata({
  title: "Aaru Living | Luxury Residences in Arugam Bay",
  description:
    "Aaru is Arugam Bay's first luxury residential real estate experience — 19 condo units and 3 private villas, 250m from the beach.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="relative flex h-screen items-end justify-center overflow-hidden text-center text-brand-cream px-section-s md:px-section-x">
        <Image
          src="/images/hero/home.png"
          alt="Aaru's residences beside a lagoon in Arugam Bay at sunset"
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-8 px-6 pb-[7vh]">
          <h1 className="font-heading text-h-03 max-w-3xl lg:max-w-5xl font-light">{siteConfig.tagline}</h1>
          <Button href="/residences" variant="primary" size="md">
            Explore Residences
          </Button>
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
        imageSrc="/images/home/beach.jpg"
        imageAlt="Aerial view of Arugam Bay's coastline"
        imagePosition="right"
        revealOnce={false}
      />


      <StatsSection stats={siteConfig.stats} />

      <Reveal as="section" once={false}>
        <Container className="py-12">
          <SectionHeader
            eyebrow="Residences For Sale"
            title="The Residences"
            level="h2"
            description="Low-density living designed for privacy, comfort and elevated coastal lifestyle."
            className="mb-12 text-center items-center"
          />
          <ResidenceCardsRow residences={residences} />
        </Container>
      </Reveal>

      <HomeFeatureSection
        title="More Than a Home, It's a Way of Life"
        paragraph="Clubhouse, wellness, dining, co-working and connectivity — all in one curated destination."
        ctaLabel="Commercial Space"
        ctaHref="/commercial-space"
        secondaryCtaLabel="Contact Us"
        secondaryCtaHref="/contact"
        imageSrc="/images/home/lifestyle.jpg"
        imageAlt="Aaru's clubhouse and pool deck at sunset"
        imagePosition="right"
      />

      <CommercialAmenitiesRow amenities={commercialAmenities} />
      
      <SplitSection
        eyebrow="Map"
        title="Prime Location"
        paragraphs={[
          "Set on Sri Lanka's eastern frontier, Aaru places you between the raw energy of Arugam Bay's world-class surf coast and the calm beauty of the lagoon. With the beach only 250m away, the estate connects ocean, wetlands, wildlife, wellness, and refined residential living in one rare coastal address.",
        ]}
        ctaLabel="See Location"
        ctaHref={`https://www.google.com/maps?q=${siteConfig.location.latitude},${siteConfig.location.longitude}`}
        ctaTarget="_blank"
        imageSrc="/images/home/map.jpg"
        imageAlt="Map showing Aaru's location in Arugam Bay relative to the lagoon and nearby cities"
        imagePosition="left"
        imageFit="contain"
        revealOnce={false}
      />
    </>
  );
}
