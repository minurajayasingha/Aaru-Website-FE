import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { footerLinkGroups } from "@/content/nav";

export function Footer() {
  return (
    <footer className="bg-brand-forest-900 text-white">
      <div className="flex flex-col gap-12 px-section-x py-16 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="relative h-20 w-20">
              <Image src="/images/logo/aaru-mark-white.svg" alt="Aaru Living" fill className="object-contain" />
            </div>
            <span className="font-heading text-3xl text-white">aaru</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-heading text-2xl text-white">Aaru Living</span>
            <p className="font-body text-sm text-white/70">
              Developed By <span className="text-white">{siteConfig.legalDeveloper}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
          {footerLinkGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h4 className="font-heading text-lg text-white">{group.title}</h4>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-body text-body-sm text-white/80 hover:text-brand-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <h4 className="font-heading text-lg text-white">Contact</h4>
            <div className="flex items-center gap-2">
              <div className="relative h-4 w-4 shrink-0">
                <Image src="/images/icons/email.svg" alt="" fill className="object-contain" />
              </div>
              <span className="font-body text-body-sm text-white/80">{siteConfig.contactEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-4 w-4 shrink-0">
                <Image src="/images/icons/whatsapp.svg" alt="" fill className="object-contain" />
              </div>
              <span className="font-body text-body-sm text-white/80">{siteConfig.contactPhone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center font-body text-xs text-white/60">
        © {new Date().getFullYear()} Aaru Living. All Rights Reserved.
      </div>
    </footer>
  );
}
