export type NavLink = { label: string; href: string; children?: NavLink[] };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Residences",
    href: "/residences",
    children: [
      { label: "Private Villas", href: "/residences/private-villas" },
      { label: "Garden Condos", href: "/residences/garden-condos" },
      { label: "Condos", href: "/residences/condos" },
    ],
  },

  { label: "Commercial Space", href: "/commercial-space" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
  { label: "About Us", href: "/about" },
];

export const footerLinkGroups: { title: string; links: NavLink[] }[] = [
  {
    title: "Residences",
    links: [
      { label: "Private Villas", href: "/residences/private-villas" },
      { label: "Garden Condos", href: "/residences/garden-condos" },
      { label: "Condos", href: "/residences/condos" },
    ],
  },
  {
    title: "Useful Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Residences", href: "/residences/private-villas" },
      { label: "Commercial Space", href: "/commercial-space" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact Us", href: "/contact" },
      { label: "About Us", href: "/about" }
    ],
  },
];
