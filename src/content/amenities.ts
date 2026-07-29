export type Amenity = {
  id: string;
  name: string;
  description: string;
  icon: "clubhouse" | "dining" | "yoga" | "wellness" | "gym" | "coworking" | "connectivity";
};

export const commercialAmenities: Amenity[] = [
  { id: "clubhouse", name: "Clubhouse & Pool", description: "21,000 sqft", icon: "clubhouse" },
  { id: "dining", name: "Signature Dining", description: "Coastal Fusion", icon: "dining" },
  { id: "yoga", name: "Yoga Shala", description: "Yoga", icon: "yoga" },
  { id: "wellness", name: "Wellness & SPA", description: "Spa", icon: "wellness" },
  { id: "gym", name: "GYM", description: "Fitters", icon: "gym" },
  { id: "coworking", name: "Co-working Spaces", description: "Work Remotely", icon: "coworking" },
  { id: "connectivity", name: "24/7 Connectivity", description: "Starlink + Fibre", icon: "connectivity" },
];
