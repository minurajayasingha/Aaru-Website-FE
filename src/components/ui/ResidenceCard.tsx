import Image from "next/image";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";

type ResidenceCardProps = {
  slug: string;
  name: string;
  floorLabel: string;
  unitBadge: string;
  bedroomLabel: string;
  sizeLabel: string;
  imageSrc: string;
  imageAlt: string;
};

export function ResidenceCard({
  slug,
  name,
  floorLabel,
  unitBadge,
  bedroomLabel,
  sizeLabel,
  imageSrc,
  imageAlt,
}: ResidenceCardProps) {
  return (
    <Card>
      <div className="relative aspect-[4/3]">
        <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <Badge className="absolute top-4 right-4">{unitBadge}</Badge>
      </div>
      <div className="flex flex-col gap-3 p-6">
        <div>
          <h3 className="font-display text-2xl text-brand-forest-900">{name}</h3>
          <p className="font-body text-sm text-brand-forest-700">{floorLabel}</p>
        </div>
        <p className="font-body text-sm text-brand-forest-700">
          {bedroomLabel} · {sizeLabel}
        </p>
        <Button href={`/residences/${slug}`} variant="primary" size="sm" className="w-full">
          View More
        </Button>
      </div>
    </Card>
  );
}
