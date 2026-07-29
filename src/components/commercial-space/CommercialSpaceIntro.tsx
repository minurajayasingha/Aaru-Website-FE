import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type CommercialSpaceIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export function CommercialSpaceIntro({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: CommercialSpaceIntroProps) {
  return (
    <Reveal as="section" className="bg-white px-section-s py-16 md:px-section-x">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        level="h2"
        size="md"
        description={description}
        className="mx-auto max-w-5xl items-center text-center"
      />
      <div className="mt-6 flex justify-center">
        <Button href={ctaHref} variant="primary">
          {ctaLabel}
        </Button>
      </div>
    </Reveal>
  );
}
