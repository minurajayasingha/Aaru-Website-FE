import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { CtaBannerContent } from "@/content/ctaBanner";

export function CtaBanner({ imageSrc, imageAlt, heading, paragraph }: CtaBannerContent) {
  return (
    <section className="relative flex h-[60vh] sm:h-[30vh] xl:h-[55vh] min-h-[420px] items-center justify-center overflow-hidden text-center">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      <div className="absolute inset-0 bg-brand-forest-900/5" />
      <div className="relative z-10 flex flex-col items-center gap-4 md:gap-2 px-6">
        <h2 className="font-heading font-light text-h-02 text-white">{heading}</h2>
        <p className="font-body text-para-sm font-thin tracking-wide text-white/90 pb-4">{paragraph}</p>
        <Button href="/contact" variant="primary" size="md">
          Contact Us
        </Button>
      </div>
    </section>
  );
}
