export type CtaBannerContent = {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  paragraph: string;
};

export const defaultCtaBanner: CtaBannerContent = {
  imageSrc: "/images/cta/banner.png",
  imageAlt: "Aerial view of Arugam Bay's coastline and lagoon",
  heading: "Your East Coast Legacy Awaits",
  paragraph: "Enquire now for availability, prices and investment details.",
};

/**
 * Route-specific overrides, keyed by path prefix (checked longest-first so a
 * more specific route wins over a shorter one). Anything not listed here
 * falls back to defaultCtaBanner. Each entry below has its own image path —
 * drop the real photo in and it shows automatically, no code change needed.
 */
export const ctaBannerByRoute: Record<string, CtaBannerContent> = {
  "/": {
    imageSrc: "/images/cta/home.png",
    imageAlt: "Aerial view of Arugam Bay's coastline and lagoon",
    heading: "Your East Coast Legacy Awaits",
    paragraph: "Enquire now for availability, prices and investment details.",
  },
  "/residences": {
    imageSrc: "/images/cta/residences.png",
    imageAlt: "Aerial view of Arugam Bay's coastline and lagoon",
    heading: "Your East Coast Legacy Awaits",
    paragraph: "Enquire now for availability, prices and investment details.",
  },
  "/residences/garden-condos": {
    imageSrc: "/images/cta/residences-garden-condos.png",
    imageAlt: "Aerial view of Arugam Bay's coastline and lagoon",
    heading: "Your East Coast Legacy Awaits",
    paragraph: "Enquire now for availability, prices and investment details.",
  },
  "/residences/elevated-condos": {
    imageSrc: "/images/cta/residences-elevated-condos.png",
    imageAlt: "Aerial view of Arugam Bay's coastline and lagoon",
    heading: "Your East Coast Legacy Awaits",
    paragraph: "Enquire now for availability, prices and investment details.",
  },
  "/residences/private-villas": {
    imageSrc: "/images/cta/residences-private-villas.png",
    imageAlt: "Aerial view of Arugam Bay's coastline and lagoon",
    heading: "Your East Coast Legacy Awaits",
    paragraph: "Enquire now for availability, prices and investment details.",
  },
  "/gallery": {
    imageSrc: "/images/cta/gallery.png",
    imageAlt: "Aerial view of Arugam Bay's coastline and lagoon",
    heading: "Your East Coast Legacy Awaits",
    paragraph: "Enquire now for availability, prices and investment details.",
  },
  "/commercial-space": {
    imageSrc: "/images/cta/commercial-space.png",
    imageAlt: "Aerial view of Arugam Bay's coastline and lagoon",
    heading: "Your East Coast Legacy Awaits",
    paragraph: "Enquire now for availability, prices and investment details.",
  },
};

export function getCtaBannerContent(pathname: string): CtaBannerContent {
  const match = Object.keys(ctaBannerByRoute)
    .sort((a, b) => b.length - a.length)
    .find((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  return match ? ctaBannerByRoute[match] : defaultCtaBanner;
}
