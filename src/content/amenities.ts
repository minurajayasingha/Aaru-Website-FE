export type Amenity = {
  id: string;
  name: string;
  description: string;
  icon: "clubhouse" | "dining" | "yoga" | "wellness" | "gym" | "coworking" | "connectivity";
};

export const commercialAmenities: Amenity[] = [
  { id: "clubhouse", name: "Clubhouse & Pool", description: "21,000sqft", icon: "clubhouse" },
  { id: "dining", name: "Signature Dining", description: "Coastal Fusion", icon: "dining" },
  { id: "yoga", name: "Yoga Shala", description: "Yoga and Pilates", icon: "yoga" },
  { id: "wellness", name: "Wellness & SPA", description: "Meditation deck", icon: "wellness" },
  { id: "gym", name: "GYM", description: "Fitness Centre", icon: "gym" },
  { id: "coworking", name: "Co-working Spaces", description: "Work Remotely", icon: "coworking" },
  { id: "connectivity", name: "24/7 Connectivity", description: "Starlink & Fiber", icon: "connectivity" },
];
