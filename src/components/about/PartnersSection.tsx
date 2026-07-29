import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export type PartnerItem = {
  id: string;
  name: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
};

type PartnersSectionProps = {
  items: PartnerItem[];
};

export function PartnersSection({ items }: PartnersSectionProps) {
  return (
    <Reveal as="section" className="bg-brand-cream px-section-s py-16 md:px-section-x">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-brand-forest-300/40 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-6 px-6 py-8 text-center">
            <span className="relative h-60 w-60">
              <Image src={item.logoSrc} alt={item.logoAlt} fill className="object-contain" />
            </span>
            <h3 className="font-heading font-normal text-h-03 text-black">{item.name}</h3>
            <p className="font-body text-para-sm font-light text-brand-forest-700 lg:w-9/12">{item.description}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
