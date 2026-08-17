import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export type WhoLeadsMember = {
  name: string;
  /** Position of the name label, as a percentage of the photo's bounding box. */
  position: { x: number; y: number };
};

type WhoLeadsSectionProps = {
  title: string;
  titleAccent: string;
  paragraph: string;
  imageSrc: string;
  imageAlt: string;
  members: WhoLeadsMember[];
};

export function WhoLeadsSection({ title, titleAccent, paragraph, imageSrc, imageAlt, members }: WhoLeadsSectionProps) {
  return (
    <Reveal
      as="section"
      className="relative overflow-hidden bg-black px-section-s h-screen md:h-full md:px-section-x pt-24 pb-10 md:pb-0 items-center"
    >
      <Image
        src="/images/hero/about-us.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 hidden object-cover md:block"
      />
      <Image
        src="/images/hero/mobile/about-us.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover md:hidden"
      />
      {/* h-full + justify-center (mobile only) groups title/image/names/para
          together in the middle of this h-screen section instead of
          stretching them apart with a big empty gap; lg:h-auto and
          lg:justify-start reset that once the layout goes side-by-side. */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center gap-10 lg:h-auto lg:flex-row lg:items-center lg:justify-start lg:gap-16 ">
        {/* `contents` splits the title/paragraph apart on mobile so the
            image (ordered between them) can sit above the paragraph;
            at lg+ this becomes a real flex column again, same as before. */}
        <div className="contents lg:flex lg:w-5/12 lg:flex-col lg:gap-6">
          <h1 className="order-2 text-center font-heading font-light leading-tight text-7xl text-white lg:text-left">
            {title}
            <br />
            <span className="text-green-500">{titleAccent}</span>
          </h1>
          </div>
        <div className="relative order-1 aspect-[955/676] w-screen ml-[calc(50%-50vw)] lg:order-2 lg:ml-0 lg:mx-0 lg:w-7/12 lg:max-w-none">
          <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-contain object-bottom" />
          {members.map((member, index) => (
            <span
              key={`${member.name}-${index}`}
              className="absolute -translate-x-1/2 -translate-y-full whitespace-nowrap font-body text-para-xxxs font-light tracking-wide text-white"
              style={{ left: `${member.position.x}%`, top: `calc(${member.position.y}% - 14px)` }}
            >
              {member.name}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
