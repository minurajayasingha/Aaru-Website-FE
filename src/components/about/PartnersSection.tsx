import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export type PartnerSpotlight = {
  name: string;
  paragraphs: string[];
  logoSrc: string;
  logoAlt: string;
};

type PartnersSectionProps = {
  partner: PartnerSpotlight;
};

export function PartnersSection({ partner }: PartnersSectionProps) {
  return (
    <Reveal as="section" className="bg-brand-cream px-section-s py-16 md:px-section-x">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex w-full flex-col gap-4 lg:w-6/12">
          <h3 className="font-heading font-light text-h-01 text-black">{partner.name}</h3>
          {partner.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-justify font-body text-para-sm font-light text-brand-forest-700">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-white lg:w-6/12">
          <Image src={partner.logoSrc} alt={partner.logoAlt} fill className="object-contain p-10" />
        </div>
      </div>
    </Reveal>
  );
}
