import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export type WhoLeadsMember = {
  name: string;
};

type WhoLeadsSectionProps = {
  title: string;
  paragraph: string;
  imageSrc: string;
  imageAlt: string;
  members: WhoLeadsMember[];
};

export function WhoLeadsSection({ title, paragraph, imageSrc, imageAlt, members }: WhoLeadsSectionProps) {
  return (
    <Reveal
      as="section"
      className="relative  bg-black/80 px-section-s h-screen md:h-full md:px-section-x lg:pt-24 items-center"
    >
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 ">
        <div className="flex w-full flex-col gap-6 lg:w-5/12">
          <h1 className="font-heading font-light text-h-01 text-brand-forest-200">{title}</h1>
          <p className="font-body text-para-sm font-light text-white/80 lg:w-10/12">{paragraph}</p>
        </div>
        <div className="relative w-full lg:w-7/12">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card">
            <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3 lg:absolute lg:inset-x-6 lg:top-4 lg:mt-0 lg:justify-around">
            {members.map((member, index) => (
              <span
                key={`${member.name}-${index}`}
                className="rounded-full bg-white/90 px-3 py-1 font-body text-para-xxxs font-light text-brand-forest-900 shadow-card"
              >
                {member.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
