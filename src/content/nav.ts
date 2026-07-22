export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Residences", href: "/residences" },
  { label: "Gallery", href: "/gallery" },
  { label: "Commercial Space", href: "/commercial-space" },
  { label: "Contact Us", href: "/contact" },
];

export const footerLinkGroups: { title: string; links: NavLink[] }[] = [
  {
    title: "Condors",
    links: [
      { label: "Garden Condos", href: "/residences/garden-condos" },
      { label: "Elevated Condos", href: "/residences/elevated-condos" },
      { label: "Private Villas", href: "/residences/private-villas" },
    ],
  },
  {
    title: "Use Full Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Gallery", href: "/gallery" },
      { label: "Commercial Space", href: "/commercial-space" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];
