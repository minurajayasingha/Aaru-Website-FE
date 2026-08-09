import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getAmenityIcon } from "@/content/amenityIcons";

type ResidenceListingCardProps = {
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

/**
 * Residence card used everywhere EXCEPT the home page row (which uses
 * `ResidenceCard` and must stay untouched). Currently an exact copy of that
 * layout — kept as its own component so its design can change independently.
 */
export function ResidenceListingCard({
  slug,
  name,
  floorLabel,
  unitBadge,
  bedroomLabel,
  sizeLabel,
  cardAmenities = [],
  imageSrc,
  imageAlt,
}: ResidenceListingCardProps) {
  return (
    <Card className="group transition-colors duration-700 ease-out hover:bg-white">
      <Link href={`/residences/${slug}`} className="relative block aspect-square md:aspect-[16/9]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="rounded-xl object-cover transition-transform duration-700 ease-out group-hover:scale-95"
        />
        <Badge className="absolute top-4 right-4">{unitBadge}</Badge>
      </Link>
      <div className="flex flex-row gap-2 px-4 pt-2 lg:pt-3 pb-4 justify-between">
        <div className="flex flex-col justify-start justify-items-end items-baseline gap-2">
          <h3 className="font-heading font-light text-h-04 text-black">{name}</h3>
          <p className="font-body text-para-xxxs font-light text-brand-forest-700">{floorLabel}</p>
        </div>
        <Button href={`/residences/${slug}`} variant="primary" size="sm" className=" w-4/6 md:w-2/5 self-center">
          View More
        </Button>
      </div>
    </Card>
  );
}
