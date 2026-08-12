const rules: { pattern: RegExp; icon: string }[] = [
  { pattern: /bedroom/i, icon: "/images/icons/amenities/bed.svg" },
  { pattern: /sqft/i, icon: "/images/icons/amenities/size.svg" },
  { pattern: /garden deck/i, icon: "/images/icons/amenities/garden-deck.svg" },
  { pattern: /private pool/i, icon: "/images/icons/amenities/pool.svg" },
  { pattern: /balcony/i, icon: "/images/icons/amenities/balcony.svg" },
  { pattern: /sunset|lagoon view/i, icon: "/images/icons/amenities/sunset.svg" },
  { pattern: /elevated views/i, icon: "/images/icons/amenities/sunset.svg" },
  { pattern: /en-suite|bathroom/i, icon: "/images/icons/amenities/bathroom.svg" },
  { pattern: /spacious living/i, icon: "/images/icons/amenities/sofa.svg" },
  { pattern: /indoor.*outdoor/i, icon: "/images/icons/amenities/indoor-outdoor.svg" },
  { pattern: /premium finishes/i, icon: "/images/icons/amenities/premium.svg" },
  { pattern: /clubhouse/i, icon: "/images/icons/amenities/clubhouse.svg" },
  { pattern: /elevated views/i, icon: "/images/icons/amenities/elevated-views.svg" },
];

/** Matches a free-form amenity label (e.g. "2 Bedrooms", "+2000 sqft") to an icon path. */
export function getAmenityIcon(label: string): string | undefined {
  return rules.find((rule) => rule.pattern.test(label))?.icon;
}
