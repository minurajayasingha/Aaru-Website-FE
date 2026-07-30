import Image from "next/image";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { getAmenityIcon } from "@/content/amenityIcons";

type ResidenceCardProps = {
  slug: string;
  name: string;
  floorLabel: string;
  unitBadge: string;
  bedroomLabel: string;
  sizeLabel: string;
  /**
   * Icon+label items shown on the card, in display order. `"bed"` and `"size"`
   * are special keys that use `bedroomLabel`/`sizeLabel` with their fixed
   * icons; any other string is matched against `amenityIcons.ts` (must equal
   * one of that residence's `amenities` entries, e.g. "Private Pool"). Omit
   * "bed"/"size" entirely to leave them off the card.
   */
  cardAmenities?: string[];
  imageSrc: string;
  imageAlt: string;
};

function resolveCardAmenity(
  item: string,
  bedroomLabel: string,
  sizeLabel: string,
): { icon: string; label: string } | null {
  if (item === "bed") return { icon: "/images/icons/amenities/bed.svg", label: bedroomLabel };
  if (item === "size") return { icon: "/images/icons/amenities/size.svg", label: sizeLabel };
  const icon = getAmenityIcon(item);
  return icon ? { icon, label: item } : null;
}

export function ResidenceCard({
  slug,
  name,
  floorLabel,
  unitBadge,
  bedroomLabel,
  sizeLabel,
  cardAmenities = [],
  imageSrc,
  imageAlt,
}: ResidenceCardProps) {
  return (
    <Card className="group transition-colors duration-700 ease-out hover:bg-white">
      <div className="relative aspect-square">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="rounded-xl object-cover transition-transform duration-700 ease-out group-hover:scale-95"
        />
        <Badge className="absolute top-4 right-4">{unitBadge}</Badge>
      </div>
      <div className="flex flex-col gap-2 px-4 pt-2 lg:pt-3 pb-4">
        <div className="flex flex-col md:flex-row justify-start justify-items-end items-baseline gap-2 md:gap-4">
          <h3 className="font-heading font-light text-h-04 text-black">{name}</h3>
          <p className="font-body text-para-xxxs font-light text-brand-forest-700">{floorLabel}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 pb-2">
          {cardAmenities.map((item) => {
            const resolved = resolveCardAmenity(item, bedroomLabel, sizeLabel);
            if (!resolved) return null;
            return (
              <span key={item} className="flex items-center gap-1">
                <Image  src={resolved.icon} alt="" width={16} height={16} />
                <span className="font-body text-para-xxxs font-thin text-black pt-1 ">{resolved.label}</span>
              </span>
            );
          })}
        </div>
        <Button href={`/residences/${slug}`} variant="primary" size="sm" className=" w-5/6 md:w-3/5 self-center">
          View More
        </Button>
      </div>
    </Card>
  );
}
