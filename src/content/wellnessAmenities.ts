import type { IconAmenityItem } from "@/components/ui/IconAmenityRow";

// Content for the Commercial Space page's dark "Sanctuary Of Wellness"
// section. Icon paths point at /images/icons/wellness/ — swap the files
// there with real icons; nothing else depends on these exact values.
export const wellnessAmenities: IconAmenityItem[] = [
  { id: "clubhouse", name: "Clubhouse & Pool", description: "Clubhouse & Pool ", icon: "/images/icons/wellness/clubhouse-pool.svg" },
  { id: "dining", name: "Signature Dining", description: "Coastal Fusion", icon: "/images/icons/wellness/dining.svg" },
  { id: "yoga", name: "Yoga Shala", description: "Yoga and Pilates", icon: "/images/icons/wellness/yoga.svg" },
  { id: "wellness", name: "Wellness & Spa", description: "Meditation deck", icon: "/images/icons/wellness/wellness-spa.svg" },
  { id: "gym", name: "Gym", description: "Fitness Centre", icon: "/images/icons/wellness/gym.svg" },
  { id: "coworking", name: "Co-working Spaces", description: "Work Remotely", icon: "/images/icons/wellness/coworking.svg" },
  { id: "connectivity", name: "24/7 Connectivity", description: "Starlink & Fiber", icon: "/images/icons/wellness/connectivity.svg" },
];
