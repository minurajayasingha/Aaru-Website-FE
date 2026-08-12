import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Image from "next/image";
import { commercialAmenities } from "@/content/amenities";
import { commercialAmenityIcons } from "@/content/commercialAmenityIcons";
import { PageHero } from "@/components/ui/PageHero";
import { FeatureSection } from "@/components/ui/FeatureSection";
import { IconAmenityRow } from "@/components/ui/IconAmenityRow";
import { wellnessAmenities } from "@/content/wellnessAmenities";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { CommercialSpaceIntro } from "@/components/commercial-space/CommercialSpaceIntro";
import { CommercialFeatureGrid } from "@/components/commercial-space/CommercialFeatureGrid";

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
        imageSrc="/images/hero/commercial-space.png"
        mobileImageSrc="/images/hero/mobile/commercial-space.jpg"
        imageAlt="Aaru's clubhouse and lagoon at dusk"
        height="lg"
      />

      <CommercialSpaceIntro
        eyebrow="Lifestyle Experiences At Aaru"
        title="Clubhouse "
        description="Aaru brings together premium commercial and lifestyle spaces for dining, leisure, wellness and productivity."
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />

      <IconAmenityRow
        heading="Sanctuary Of Wellness"
        paragraph="Wellness at Aaru is a daily ritual - curated spaces for stillness, recovery and care, all just steps from home."
        items={wellnessAmenities}
        theme="dark"
      />

      <FeatureSection
        title="A World of Leisure"
        paragraph="From sunrise swims to sunset gatherings, Aaru is curated for moments that matter. Beautifully designed spaces for relaxation, recreation and connection—made for residents, members and the wider community."
        ctaLabel="Contact Us"
        ctaHref="/contact"
        imageSrc="/images/commercial/leisure.jpg"
        imageAlt="Aaru clubhouse pool deck at sunset"
        imagePosition="right"
      />

      <FeatureSection
        title="Clubhouse & Pool"
        paragraph="Our 21,000+ sqft residence is the social heart of Aaru. Enjoy the resort-style pool, open-air lounge, shaded decks and lush gardens—perfect for relaxed days, family time and memorable gatherings."
        ctaLabel="Contact Us"
        ctaHref="/contact"
        imageSrc="/images/commercial/clubhouse-pool.jpg"
        imageAlt="Aaru clubhouse and resort-style pool"
        imagePosition="left"
      />

      <FeatureSection
        title="Bar & Rooftop Sunset Deck"
        paragraph="Sip, socialise and watch the sky transform. Our rooftop bar and sunset deck offer signature cocktails, light bites and panoramic views across Arugam Bay."
        ctaLabel="Contact Us"
        ctaHref="/contact"
        imageSrc="/images/commercial/bar.jpg"
        imageAlt="Aaru's rooftop bar at sunset with panoramic ocean views"
        imagePosition="right"
      />

      <FeatureSection
        title="Signature Restaurant"
        paragraph="A sophisticated fusion of Sri Lankan heritage and contemporary refinement, developed with acclaimed chef Shehan ‘Juppè’ Setunga. The menu evolves with the seasonal yield of the coast and the daily harvest of local fishermen, framed by expansive glass and views across the lagoon"
        ctaLabel="Contact Us"
        ctaHref="/contact"
        imageSrc="/images/commercial/restaurant.jpg"
        imageAlt="Signature seafood platter at Aaru's restaurant"
        imagePosition="left"
      />

      <CommercialFeatureGrid
        items={[
          {
            id: "spa",
            title: "Spa & Wellness",
            paragraph:
              "A secluded space for Ayurvedic and modern therapies, developed with a specialist spa operator, designed for the gaze to turn inward.",
            imageSrc: "/images/commercial/spa.jpg",
            imageAlt: "Aaru spa treatment room with candles and hot stones",
          },
          {
            id: "fitness",
            title: "Fitness Center",
            paragraph:
              "A high-specification facility equipped for both functional and traditional training, so performance stays part of the coastal lifestyle.",
            imageSrc: "/images/commercial/fitness.jpg",
            imageAlt: "Aaru's fully equipped fitness center",
          },
          {
            id: "yoga",
            title: "Yoga Shala",
            paragraph:
              "An open-air pavilion for yoga and Pilates, with access to dedicated on-site practitioners for private, guided sessions inspired by the lagoon.",
            imageSrc: "/images/commercial/yoga.jpg",
            imageAlt: "Aaru's yoga shala overlooking the lagoon",
          },
          {
            id: "coworking",
            title: "Co-working Spaces",
            paragraph:
              "A general-access hub with dedicated meeting rooms, high-speed connectivity and professional amenities for deep focus and collaboration.",
            imageSrc: "/images/commercial/coworking.jpg",
            imageAlt: "Aaru's co-working space with lounge seating",
          },
        ]}
      />

    </>
  );
}
