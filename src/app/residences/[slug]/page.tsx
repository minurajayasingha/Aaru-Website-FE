import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { residences, getResidenceBySlug } from "@/content/residences";
import { buildMetadata } from "@/lib/metadata";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
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

      <section className="relative flex h-[60vh] items-center justify-center text-center text-brand-cream">
        <Image src={residence.heroImage.src} alt={residence.heroImage.alt} fill priority className="object-cover" />
        <h1 className="relative z-10 font-display text-4xl md:text-6xl">{residence.name}</h1>
      </section>

      <Reveal as="section" className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <SectionHeader eyebrow={residence.floorLabel} title={residence.name} level="h2" description={residence.description} />
          <div className="flex gap-4">
            <Button href="/contact" variant="primary">
              Contact Us
            </Button>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-card">
          <Image src={residence.layoutImage.src} alt={residence.layoutImage.alt} fill className="object-cover" />
        </div>
      </Reveal>

      <Reveal as="section" className="bg-brand-forest-800 py-16 text-brand-cream">
        <h2 className="mb-10 text-center font-display text-3xl">Unit Amenities</h2>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 md:grid-cols-5">
          {residence.amenities.map((item) => (
            <p key={item} className="text-center font-body text-sm">
              {item}
            </p>
          ))}
        </div>
      </Reveal>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-10 font-display text-3xl">Suite View</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {residence.gallery.map((image) => (
            <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-card">
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {otherResidences.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="mb-10 font-display text-3xl">Other Condos</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {otherResidences.map((other) => (
              <Button key={other.slug} href={`/residences/${other.slug}`} variant="secondary">
                {other.name}
              </Button>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
