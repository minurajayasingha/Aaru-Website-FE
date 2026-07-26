"use client";

import Image from "next/image";
import Link from "next/link";
import type { MotionValue } from "framer-motion";
import { siteConfig } from "@/content/site";
import { footerLinkGroups } from "@/content/nav";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type FooterProps = {
  progress: MotionValue<number>;
};

export function Footer({ progress }: FooterProps) {
  return (
    <footer className="bg-brand-forest-900 text-white">
      <ScrollReveal
        progress={progress}
        range={[0.2, 0.6]}
        y={56}
        scale
        className="flex flex-col gap-10 px-section-s md:px-section-x pb-4 pt-8 md:flex-row md:items-center md:justify-between lg:items-start"
      >
        <ScrollReveal
          progress={progress}
          range={[0.25, 0.6]}
          className="flex flex-col items-start gap-4 lg:flex-col xl:flex-row sm:items-center xl:gap-12 h-full lg:items-start lg:justify-start lg:w-auto w-full"
        >
          <div className="flex flex-col items-center justify-center md:items-start w-full ">
            <div className="relative h-40 w-40 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 justify-center items-center">
              <Image src="/images/logo/aaru-mark-white.svg" alt="Aaru Living" fill className="object-contain " />
            </div>
          </div>
          <div className="flex flex-col md:flex-col gap-3.5 items-center w-full lg:w-auto lg:items-start lg:pt-3">
            <span className="font-heading text-heading-sm text-white font-extralight w-full text-center md:text-left ">Aaru Living</span>
            <p className="font-body text-xs w-full text-center md:text-left xl:whitespace-nowrap text-white/70">
              Developed By <span className="text-white text-body-xs">{siteConfig.legalDeveloper}</span>
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-10 sm:flex-row sm:gap-10 lg:gap-16 xl:gap-18 lg:pt-4 xl:pt-0">
          {footerLinkGroups.map((group, index) => (
            <ScrollReveal
              key={group.title}
              progress={progress}
              range={[0.35 + index * 0.1, 0.65 + index * 0.1]}
              className="flex flex-col"
            >
              <h4 className="font-heading text-heading-sm text-white font-extralight pb-3">{group.title}</h4>
              <ul className="flex flex-col gap-0.2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-body text-body-xs font-thin text-white/90 tracking-wide hover:text-brand-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}

          <ScrollReveal
            progress={progress}
            range={[0.55, 0.85]}
            className="flex flex-col gap-2.5 pb-8 sm:pb-0"
          >
            <h4 className="font-heading text-heading-sm text-white font-extralight pb-3">Contact</h4>
            <div className="flex items-center gap-2">
              <div className="relative h-3 w-3 shrink-0">
                <Image src="/images/icons/email.svg" alt="" fill className="object-contain" />
              </div>
              <span className="font-body text-body-xs font-thin  text-white/80 tracking-wide">{siteConfig.contactEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-3 w-3 shrink-0">
                <Image src="/images/icons/whatsapp.svg" alt="" fill className="object-contain" />
              </div>
              <span className="font-body text-body-xs font-thin text-white/80 tracking-wide">{siteConfig.contactPhone}</span>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <ScrollReveal
        progress={progress}
        range={[0.75, 1]}
        className="pt-4 pb-4 md:pt-8  text-center font-body text-body-xs font-thin text-white/80 tracking-wide border-t border-white/10 md:border-t-0"
      >
        © {new Date().getFullYear()} Aaru Living. All Rights Reserved.
      </ScrollReveal>
    </footer>
  );
}
