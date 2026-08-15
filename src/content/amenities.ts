export type Amenity = {
  id: string;
  name: string;
  description: string;
  icon: "clubhouse" | "dining" | "yoga" | "wellness" | "gym" | "coworking" | "connectivity";
};

export const commercialAmenities: Amenity[] = [
  { id: "clubhouse", name: "Pool & Pool side Bar", description: "Relax & Unwind", icon: "clubhouse" },
  { id: "dining", name: "Signature Dining", description: "Coastal Fusion", icon: "dining" },
  { id: "yoga", name: "Yoga Shala", description: "Yoga and Pilates", icon: "yoga" },
  { id: "wellness", name: "Wellness & SPA", description: "Treatment Room", icon: "wellness" },
  { id: "gym", name: "Fitness Centre", description: "Cardio & Resistance", icon: "gym" },
  { id: "coworking", name: "Co-working Spaces", description: "Work Remotely", icon: "coworking" },
  { id: "connectivity", name: "24/7 Connectivity", description: "Starlink & Fiber", icon: "connectivity" },
];
