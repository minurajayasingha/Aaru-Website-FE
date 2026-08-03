export type Amenity = {
  id: string;
  name: string;
  description: string;
  icon: "clubhouse" | "dining" | "yoga" | "wellness" | "gym" | "coworking" | "connectivity";
};

export const commercialAmenities: Amenity[] = [
  { id: "clubhouse", name: "Clubhouse & Pool", description: "", icon: "clubhouse" },
  { id: "dining", name: "Signature Dining", description: "", icon: "dining" },
  { id: "yoga", name: "Yoga Shala", description: "", icon: "yoga" },
  { id: "wellness", name: "Wellness & SPA", description: "", icon: "wellness" },
  { id: "gym", name: "GYM", description: "", icon: "gym" },
  { id: "coworking", name: "Co-working Spaces", description: "", icon: "coworking" },
  { id: "connectivity", name: "24/7 Connectivity", description: "", icon: "connectivity" },
];
