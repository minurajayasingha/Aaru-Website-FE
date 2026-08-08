import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { residences, getResidenceBySlug } from "@/content/residences";
import { getAmenityIcon } from "@/content/amenityIcons";
import { enrichGallerySections } from "@/lib/residenceGalleryImages";
import { buildMetadata } from "@/lib/metadata";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ResidenceListingCard } from "@/components/residences/ResidenceListingCard";
import { UnitLayoutGallery } from "@/components/residences/UnitLayoutGallery";
import { ResidenceGallerySection } from "@/components/residences/ResidenceGallerySection";
import { ResidenceJsonLd } from "@/components/seo/ResidenceJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Container } from "@/components/ui/Container";

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

  const otherResidences = residence.otherResidencesOrder
    .map((slug) => getResidenceBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => r !== undefined && r.slug !== residence.slug);

  const gallerySections = enrichGallerySections(residence.gallerySections);

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

      <div className="relative h-[75vh]">
        <Image src={residence.heroImage.src} alt={residence.heroImage.alt} fill priority className="object-cover" />
      </div>

      <Reveal as="section" className="bg-white px-section-s py-16 md:px-section-x ">
        <SectionHeader
          eyebrow={residence.floorLabel}
          title={residence.name}
          level="h1"
          size="md"
          description={residence.description}
          className="mx-auto max-w-5xl items-center text-center"
        />
      </Reveal>

      <Reveal as="section" className="bg-brand-cream-dark/30">
        <Container className="flex flex-col lg:flex-row gap-12 py-12 lg:items-center">
          <UnitLayoutGallery images={residence.layoutGallery}  />
          <div className="flex flex-col w-full lg:w-5/12 h-full gap-6">
            <h2 className="font-heading font-normal lg:font-normal text-h-02 text-black pb-6 lg:pl-4 text-center lg:text-center">Unit Layout</h2>
            <div className="flex flex-row lg:flex-row divide-x divide-brand-forest-300">
              <div className="flex-1 px- py-6 lg:py-6 flex flex-col items-center gap-2">
                <p className="font-subheading text-para-lg lg:text-h-04 font-thin text-black">{residence.unitsAvailableLabel}</p>
                <p className="font-body text-para-xxs  tracking-wide text-brand-forest-700">
                  Available Units
                </p>
              </div>
              <div className="flex-1 px-1 py-6 lg:py-6 flex flex-col items-center gap-2">
                <p className="font-subheading text-para-lg lg:text-h-04 font-thin text-black">{residence.sizeLabel}</p>
                <p className="font-body text-para-xxs  tracking-wide text-brand-forest-700">Size</p>
              </div>
            </div>
            <div className="border-t border-brand-forest-300 px-2 py-6 flex flex-col items-center gap-2">
              <p className="font-subheading text-h-04 font-thin text-black">{residence.priceLabel}</p>
              <p className="font-body text-para-xxs  tracking-wide text-brand-forest-700">Upward</p>
            </div>
                    <div className="mt-6 flex justify-center">
          <Button href="/contact" variant="primary">
            Contact Us
          </Button>
        </div>
          </div>

        </Container>
      </Reveal>

      <Reveal as="section" className="bg-brand-forest-800 px-section-s py-16 text-brand-cream px-section-x ">
        <h2 className="mb-10 text-center font-heading font-normal lg:font-normal text-h-03 text-white md:text-h-02">
          {residence.amenitiesSectionTitle}
        </h2>
        <div className="mx-auto grid max-w-6xl grid-cols-2  gap-y-12 sm:grid-cols-3 md:grid-cols-5 md:divide-x divide-brand-cream/20 md:[&>*:nth-child(5n+1)]:!border-l-0">
          {residence.amenities.map((item) => {
            const icon = getAmenityIcon(item);
            return (
              <div key={item} className="flex flex-col items-center gap-3 text-center">
                {icon && (
                  <span className="relative h-18 w-18">
                    <Image src={icon} alt="" fill className="object-contain" />
                  </span>
                )}
                <p className="font-heading text-para-sm w-4/5 lgtext-para-md text-brand-cream/80 font-thin  ">{item}</p>
              </div>
            );
          })}
        </div>
      </Reveal>
      

      {gallerySections.length > 0 && (
        <Reveal as="section" once={false}>
          <Container className="flex flex-col gap-12 py-16 lg:py-16">
            {gallerySections.map((section) => (
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
          </Container>
        </Reveal>
      )}

      {otherResidences.length > 0 && (
        <Reveal as="section" once={false}>
          <Container className="py-12 lg:pb-16">
            <h2 className="mb-12 text-center font-heading font-light text-h-01 text-black">Other Residences</h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {otherResidences.map((other) => (
                <ResidenceListingCard
                  key={other.slug}
                  slug={other.slug}
                  name={other.name}
                  floorLabel={other.floorLabel}
                  unitBadge={other.unitBadge}
                  bedroomLabel={other.bedroomLabel}
                  sizeLabel={other.sizeLabel}
                  cardAmenities={other.cardAmenities}
                  imageSrc={other.cardImage.src}
                  imageAlt={other.cardImage.alt}
                />
              ))}
            </div>
          </Container>
        </Reveal>
      )}
    </>
  );
}
