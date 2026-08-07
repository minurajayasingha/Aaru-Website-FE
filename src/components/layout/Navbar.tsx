"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/content/nav";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

function isLinkActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const whatsappHref = `https://wa.me/${siteConfig.contactPhone.replace(/\D/g, "")}`;

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResidencesOpen, setIsResidencesOpen] = useState(false);
  const [isMobileResidencesOpen, setIsMobileResidencesOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const firstDrawerLinkRef = useRef<HTMLAnchorElement>(null);
  const wasMenuOpenRef = useRef(false);

  useEffect(() => {
    function updateHeaderHeight() {
      setHeaderHeight(headerRef.current?.offsetHeight ?? 0);
    }
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      (firstDrawerLinkRef.current ?? drawerRef.current)?.focus();
    } else {
      document.body.style.overflow = "";
      if (wasMenuOpenRef.current) {
        toggleButtonRef.current?.focus();
      }
    }

    wasMenuOpenRef.current = isMenuOpen;

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 bg-gray-50/20 backdrop-blur-lg shadow-card2">
      <Container as="nav" className="flex items-center justify-between gap-6 py-3 lg:py-1">
        <Link href="/" className="relative h-10 w-10 shrink-0">
          <Image src="/images/logo/aaru-mark-color.svg" alt="Aaru Living" fill className="object-contain" />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((link) => {
            const active = isLinkActive(pathname, link.href);
            const linkClasses = cn(
              "relative inline-block pb-[0.2rem] font-body text-para-xs font-light text-brand-forest-900 transition-transform duration-500 ease-out hover:-translate-y-0.5 hover:text-brand-gold",
              active &&
                "after:absolute after:left-1/2 after:top-full after:w-4/5 after:-translate-x-1/2 after:border-b-2 after:border-brand-forest-900",
            );

            if (!link.children) {
              return (
                <li key={link.href} className="flex items-center self-stretch">
                  <Link href={link.href} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={link.href}
                className="relative flex items-center self-stretch"
                onMouseEnter={() => setIsResidencesOpen(true)}
                onMouseLeave={() => setIsResidencesOpen(false)}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isResidencesOpen}
                  onClick={() => setIsResidencesOpen((open) => !open)}
                  className="m-0 inline-flex items-center gap-1.5 border-0 bg-transparent p-0"
                >
                  <span className={linkClasses}>
                    {link.label}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 6"
                    className={cn("h-2.5 w-2.5 shrink-0 transition-transform", isResidencesOpen && "rotate-180")}
                  >
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isResidencesOpen && (
                  <ul className="absolute left-0 top-full min-w-[170px] rounded-card bg-white py-2 shadow-card ">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 font-body text-para-xs font-light text-brand-forest-900 hover:bg-brand-forest-50 hover:text-brand-gold"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <Link
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 items-center gap-2 rounded-md bg-[#25D366] px-4 py-1.5 text-black hover:bg-[#1EBE5A] lg:inline-flex"
        >
          <span className="relative h-3 w-3">
            <Image src="/images/icons/whatsapp-nav.svg" alt="" fill className="object-contain" />
          </span>
          <span className="font-body text-sm font-thin">WhatsApp</span>
        </Link>

        <button
          ref={toggleButtonRef}
          type="button"
          className="relative flex h-6 w-6 shrink-0 items-center justify-center lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span
            className={cn(
              "absolute h-0.5 w-6 rounded-full bg-brand-forest-900 transition-transform duration-300",
              isMenuOpen ? "rotate-45" : "-translate-y-2",
            )}
          />
          <span
            className={cn(
              "absolute h-0.5 w-6 rounded-full bg-brand-forest-900 transition-opacity duration-300",
              isMenuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute h-0.5 w-6 rounded-full bg-brand-forest-900 transition-transform duration-300",
              isMenuOpen ? "-rotate-45" : "translate-y-2",
            )}
          />
        </button>
      </Container>
      </header>

      {isMenuOpen && (
        <div
          id="mobile-nav-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          tabIndex={-1}
          style={{ top: headerHeight }}
          className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-gray-100/40 backdrop-blur-lg sm:bottom-auto sm:max-h-[80vh] sm:shadow-card lg:hidden"
        >
          <ul className="flex flex-col items-center gap-8 py-12">
            {navLinks.map((link, index) =>
              link.children ? (
                <li key={link.href} className="flex flex-col items-center gap-6">
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isMobileResidencesOpen}
                    onClick={() => setIsMobileResidencesOpen((open) => !open)}
                    className="m-0 inline-flex items-center gap-1.5 border-0 bg-transparent p-0"
                  >
                    <span className="font-body text-para-sm font-light text-brand-forest-900">{link.label}</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 10 6"
                      className={cn("h-3 w-3 shrink-0 transition-transform", isMobileResidencesOpen && "rotate-180")}
                    >
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {isMobileResidencesOpen && (
                    <ul className="flex min-w-[200px] flex-col rounded-card bg-white py-2 shadow-card">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 text-center font-body text-para-sm font-light text-brand-forest-900 hover:bg-brand-forest-50 hover:text-brand-gold"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    ref={index === 0 ? firstDrawerLinkRef : undefined}
                    className="font-body text-para-sm font-light text-brand-forest-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
            <li>
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2 text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative h-4 w-4">
                  <Image src="/images/icons/whatsapp-nav.svg" alt="" fill className="object-contain" />
                </span>
                <span className="font-body text-sm">WhatsApp</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
