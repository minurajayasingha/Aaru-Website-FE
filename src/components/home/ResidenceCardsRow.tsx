import { Reveal } from "@/components/ui/Reveal";
import { ResidenceCard } from "@/components/ui/ResidenceCard";
import type { Residence } from "@/content/residences";

export function ResidenceCardsRow({ residences }: { residences: Residence[] }) {
  return (
    <>
      <Reveal once={false} className="hidden justify-between gap-4 md:flex">
        {residences.map((residence) => (
          <div key={residence.slug} className="min-w-0 flex-1">
            <ResidenceCard
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
          </div>
        ))}
      </Reveal>

      <Reveal once={false} className="grid gap-6 md:hidden">
        {residences.map((residence) => (
          <ResidenceCard
            key={residence.slug}
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
        ))}
      </Reveal>
    </>
  );
}
