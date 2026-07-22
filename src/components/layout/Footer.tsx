import Link from "next/link";
import { siteConfig } from "@/content/site";
import { footerLinkGroups } from "@/content/nav";

export function Footer() {
  return (
    <footer className="bg-brand-forest-800 text-brand-cream">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-display text-3xl">aaru</span>
          <p className="font-body text-sm text-brand-cream/80">{siteConfig.name}</p>
          <p className="font-body text-xs text-brand-cream/60">Develop By {siteConfig.legalDeveloper}</p>
        </div>

        {footerLinkGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h4 className="font-display text-lg">{group.title}</h4>
            <ul className="flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-brand-cream/80 hover:text-brand-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-3">
          <h4 className="font-display text-lg">Contact</h4>
          <span className="font-body text-sm text-brand-cream/80">{siteConfig.contactEmail}</span>
          <span className="font-body text-sm text-brand-cream/80">{siteConfig.contactPhone}</span>
        </div>
      </div>

      <div className="border-t border-brand-cream/10 py-6 text-center font-body text-xs text-brand-cream/60">
        © {new Date().getFullYear()} Aaru Living. All Rights Reserved.
      </div>
    </footer>
  );
}
