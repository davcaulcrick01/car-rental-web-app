export interface FleetCategory {
  name: string;
  description: string;
  image: string;
  link: string;
}

export const fleetCategories: FleetCategory[] = [
  {
    name: "Classic Cars",
    description: "Timeless elegance and vintage charm",
    image: "/images/fleet/classic.jpg",
    link: "/fleet/cars/classic"
  },
  {
    name: "Luxury Cars",
    description: "Experience ultimate comfort and sophistication",
    image: "/images/fleet/luxury.jpg",
    link: "/fleet/cars/luxury"
  },
  {
    name: "Sports Cars",
    description: "Feel the thrill of high-performance vehicles",
    image: "/images/fleet/sports.jpg",
    link: "/fleet/cars/sport"
  },
  {
    name: "SUVs",
    description: "Spacious and versatile luxury SUVs",
    image: "/images/fleet/suv.jpg",
    link: "/fleet/cars/suv"
  },
  {
    name: "Convertibles",
    description: "Open-top driving experience",
    image: "/images/fleet/convertible.jpg",
    link: "/fleet/cars/convertible"
  },
  {
    name: "Sedans",
    description: "Comfortable and elegant sedans",
    image: "/images/fleet/sedan.jpg",
    link: "/fleet/cars/sedan"
  },
  {
    name: "Super Cars",
    description: "Ultimate performance and exclusivity",
    image: "/images/fleet/super.jpg",
    link: "/fleet/cars/super"
  },
  {
    name: "Exotic Cars",
    description: "Rare and extraordinary vehicles",
    image: "/images/fleet/exotic.jpg",
    link: "/fleet/cars/exotic"
  }
] 