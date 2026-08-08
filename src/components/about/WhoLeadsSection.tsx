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
      className="relative  bg-black/80 px-section-s h-screen md:h-full md:px-section-x pt-24 pb-10 md:pb-0 items-center"
    >
      {/* h-full + justify-center (mobile only) groups title/image/names/para
          together in the middle of this h-screen section instead of
          stretching them apart with a big empty gap; lg:h-auto and
          lg:justify-start reset that once the layout goes side-by-side. */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center gap-10 lg:h-auto lg:flex-row lg:items-center lg:justify-start lg:gap-16 ">
        {/* `contents` splits the title/paragraph apart on mobile so the
            image (ordered between them) can sit above the paragraph;
            at lg+ this becomes a real flex column again, same as before. */}
        <div className="contents lg:flex lg:w-5/12 lg:flex-col lg:gap-6">
          <h1 className="order-1 text-center font-heading font-light text-h-01 text-brand-forest-200 lg:text-left">{title}</h1>
          <p className="order-3 font-body text-para-sm font-light text-white/80 lg:w-10/12">{paragraph}</p>
        </div>
        <div className="relative order-2 w-full lg:w-7/12">
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
