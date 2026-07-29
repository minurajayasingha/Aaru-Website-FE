import { IconAmenityRow } from "@/components/ui/IconAmenityRow";
import type { Amenity } from "@/content/amenities";
import { commercialAmenityIcons } from "@/content/commercialAmenityIcons";

export function CommercialAmenitiesRow({ amenities }: { amenities: Amenity[] }) {
  return (
    <IconAmenityRow
      items={amenities.map((amenity) => ({
        id: amenity.id,
        name: amenity.name,
        description: amenity.description,
        icon: commercialAmenityIcons[amenity.icon],
      }))}
      columnsClassName="md:grid-cols-7"
    />
  );
}
