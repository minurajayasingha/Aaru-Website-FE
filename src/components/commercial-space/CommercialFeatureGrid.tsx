import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export type CommercialFeatureGridItem = {
  id: string;
  title: string;
  paragraph: string;
  imageSrc: string;
  imageAlt: string;
};

type CommercialFeatureGridProps = {
  items: CommercialFeatureGridItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export function CommercialFeatureGrid({ items, ctaLabel, ctaHref }: CommercialFeatureGridProps) {
  return (
    <Reveal as="section" className="bg-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 ">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading font-light text-h-04 text-black">{item.title}</h3>
              <p className="font-body text-para-xxs font-light text-black">{item.paragraph}</p>
            </div>
          ))}
        </div>
        {ctaLabel && ctaHref && (
          <div className="mt-12 flex justify-center">
            <Button href={ctaHref} variant="primary">
              {ctaLabel}
            </Button>
          </div>
        )}
      </Container>
    </Reveal>
  );
}
