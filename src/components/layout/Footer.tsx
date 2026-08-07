import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { footerLinkGroups } from "@/content/nav";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-brand-forest-900 text-white">
      <Container className="flex flex-col gap-10 pb-4 pt-8 md:flex-row md:items-center md:justify-between lg:items-start">
        <div className="flex flex-col items-start gap-4 lg:flex-col xl:flex-col sm:items-center xl:gap-4 h-full lg:items-center lg:justify-center lg:w-auto w-full">
          <div className="flex flex-col items-center justify-center md:items-center w-full ">
            <div className="relative h-40 w-40 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 justify-center items-center">
              <Image src="/images/logo/aaru-mark-white.svg" alt="Aaru Living" fill className="object-contain " />
            </div>
          </div>
          <div className="flex flex-col md:flex-col gap-3.5 items-center w-full lg:w-auto lg:items-start lg:pt-3">
            <p className="font-body text-xs w-full text-center md:text-left xl:whitespace-nowrap text-white/70">
              Developed By <span className="text-white text-para-xxs">{siteConfig.Developer}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-10 sm:flex-row sm:gap-10 lg:gap-20 xl:gap-24 lg:pt-4 xl:pt-0">
          {footerLinkGroups.map((group) => (
            <div key={group.title} className="flex flex-col">
              <h4 className="font-heading text-para-lg text-white font-extralight pb-3">{group.title}</h4>
              <ul className="flex flex-col gap-0.2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block font-body text-para-xxs font-thin tracking-wide bg-gradient-to-r from-brand-gold from-50% to-white/90 to-50% bg-[length:200%_100%] bg-right bg-clip-text text-transparent transition-[background-position] duration-500 ease-out hover:bg-left"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-2.5 pb-8 sm:pb-0">
            <h4 className="font-heading text-para-lg text-white font-extralight pb-3">Contact</h4>
            <div className="flex items-center gap-2">
              <div className="relative h-3 w-3 shrink-0">
                <Image src="/images/icons/email.svg" alt="" fill className="object-contain" />
              </div>
              <span className="font-body text-para-xxs font-thin  text-white/80 tracking-wide">{siteConfig.contactEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-3 w-3 shrink-0">
                <Image src="/images/icons/whatsapp.svg" alt="" fill className="object-contain" />
              </div>
              <span className="font-body text-para-xxs font-thin text-white/80 tracking-wide">{siteConfig.contactPhone}</span>
            </div>
          </div>
        </div>
      </Container>

      <div className="pt-4 pb-4 md:pt-8  text-center font-body text-para-xxs font-thin text-white/80 tracking-wide border-t border-white/10 md:border-t-0">
        © {new Date().getFullYear()} Aaru
      </div>
    </footer>
  );
}
