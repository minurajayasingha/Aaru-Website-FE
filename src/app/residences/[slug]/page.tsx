import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { residences, getResidenceBySlug } from "@/content/residences";
import { getAmenityIcon } from "@/content/amenityIcons";
import { buildMetadata } from "@/lib/metadata";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ResidenceCard } from "@/components/ui/ResidenceCard";
import { UnitLayoutGallery } from "@/components/residences/UnitLayoutGallery";
import { ResidenceGallerySection } from "@/components/residences/ResidenceGallerySection";
import { ResidenceJsonLd } from "@/components/seo/ResidenceJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

type PageParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return residences.map((residence) => ({ slug: residence.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const residence = getResidenceBySlug(slug);
  if (!residence) return buildMetadata({ title: "Residence Not Found", description: "", path: `/residences/${slug}` });

  return buildMetadata({
    title: residence.name,
    description: residence.description.slice(0, 155),
    path: `/residences/${residence.slug}`,
    imagePath: residence.heroImage.src,
  });
}

export default async function ResidenceDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const residence = getResidenceBySlug(slug);
  if (!residence) notFound();

  const otherResidences = residences.filter((r) => r.slug !== residence.slug);

  return (
    <>
      <ResidenceJsonLd residence={residence} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Residences", path: "/residences" },
          { name: residence.name, path: `/residences/${residence.slug}` },
        ]}
      />

      <div className="relative h-[45vh] sm:h-[55vh] lg:h-[65vh]">
        <Image src={residence.heroImage.src} alt={residence.heroImage.alt} fill priority className="object-cover" />
      </div>

      <Reveal as="section" className="bg-white px-section-s py-16 md:px-section-x lg:py-20">
        <SectionHeader
          eyebrow={residence.floorLabel}
          title={residence.name}
          level="h1"
          size="md"
          description={residence.description}
          className="mx-auto max-w-3xl items-center text-center"
        />
        <div className="mt-8 flex justify-center">
          <Button href="/contact" variant="primary">
            Contact Us
          </Button>
        </div>
      </Reveal>

      <Reveal as="section" className="bg-brand-cream-dark/30 px-section-s py-16 md:px-section-x lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <UnitLayoutGallery images={residence.layoutGallery} />
          <div className="flex flex-col gap-8">
            <h2 className="font-heading font-bold text-heading-md text-black">Unit Layout</h2>
            <div className="flex divide-x divide-brand-forest-300">
              <div className="flex-1 pr-6">
                <p className="font-heading text-heading-sm text-black">{residence.unitsAvailableLabel}</p>
                <p className="font-body text-body-xs uppercase tracking-wide text-brand-forest-700">
                  Available Units
                </p>
              </div>
              <div className="flex-1 pl-6">
                <p className="font-heading text-heading-sm text-black">{residence.sizeLabel}</p>
                <p className="font-body text-body-xs uppercase tracking-wide text-brand-forest-700">Size</p>
              </div>
            </div>
            <div>
              <p className="font-heading text-heading-sm text-black">{residence.priceLabel}</p>
              <p className="font-body text-body-xs uppercase tracking-wide text-brand-forest-700">Upward</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="bg-brand-forest-800 px-section-s py-16 text-brand-cream md:px-section-x lg:py-20">
        <h2 className="mb-10 text-center font-heading font-bold text-heading-sm text-brand-cream md:text-heading-md">
          Unit Amenities
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
          {residence.amenities.map((item) => {
            const icon = getAmenityIcon(item);
            return (
              <div key={item} className="flex flex-col items-center gap-3 text-center">
                {icon && (
                  <span className="relative h-8 w-8">
                    <Image src={icon} alt="" fill className="object-contain" />
                  </span>
                )}
                <p className="font-body text-sm">{item}</p>
              </div>
            );
          })}
        </div>
      </Reveal>

      {residence.gallerySections.length > 0 && (
        <section className="mx-auto flex max-w-7xl flex-col gap-12 px-section-s py-16 md:px-section-x lg:py-20">
          {residence.gallerySections.map((section) => (
            <ResidenceGallerySection key={section.heading} section={section} />
          ))}
          <div className="flex justify-center gap-4">
            <Button href="/gallery" variant="secondary">
              View More
            </Button>
            <Button href="/contact" variant="primary">
              Contact Us
            </Button>
          </div>
        </section>
      )}

      {otherResidences.length > 0 && (
        <section className="mx-auto max-w-7xl px-section-s py-16 md:px-section-x lg:py-20">
          <h2 className="mb-10 text-center font-heading font-bold text-heading-md text-black">Other Residences</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {otherResidences.map((other) => (
              <ResidenceCard
                key={other.slug}
                slug={other.slug}
                name={other.name}
                floorLabel={other.floorLabel}
                unitBadge={other.unitBadge}
                bedroomLabel={other.bedroomLabel}
                sizeLabel={other.sizeLabel}
                imageSrc={other.heroImage.src}
                imageAlt={other.heroImage.alt}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
