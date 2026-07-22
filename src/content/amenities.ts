export type Amenity = {
  id: string;
  name: string;
  description: string;
  icon: "clubhouse" | "wellness" | "dining" | "coworking" | "connectivity";
};

export const commercialAmenities: Amenity[] = [
  { id: "clubhouse", name: "Clubhouse & Pool", description: "21,000 sqft", icon: "clubhouse" },
  { id: "wellness", name: "Wellness & SPA", description: "Yoga, Spa, Fitness", icon: "wellness" },
  { id: "dining", name: "Signature Dining", description: "Coastal Fusion", icon: "dining" },
  { id: "coworking", name: "Co-working Spaces", description: "Work Remotely", icon: "coworking" },
  { id: "connectivity", name: "24/7 Connectivity", description: "Starlink + Fibre", icon: "connectivity" },
];
