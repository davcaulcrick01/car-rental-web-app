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
    image: "https://car-rental-web-app-bucket.s3.us-east-1.amazonaws.com/car_images/images/fleet/classic.jpg",
    link: "/fleet/cars/classic"
  },
  {
    name: "Luxury Cars", 
    description: "Experience ultimate comfort and sophistication",
    image: "https://car-rental-web-app-bucket.s3.us-east-1.amazonaws.com/car_images/images/fleet/luxury.jpg",
    link: "/fleet/cars/luxury"
  },
  {
    name: "Sports Cars",
    description: "Feel the thrill of high-performance vehicles",
    image: "https://car-rental-web-app-bucket.s3.us-east-1.amazonaws.com/car_images/images/fleet/sports.jpg",
    link: "/fleet/cars/sport"
  },
  {
    name: "SUVs",
    description: "Spacious and versatile luxury SUVs",
    image: "https://car-rental-web-app-bucket.s3.us-east-1.amazonaws.com/car_images/images/fleet/suv.jpg",
    link: "/fleet/cars/suv"
  },
  {
    name: "Convertibles",
    description: "Open-top driving experience",
    image: "https://car-rental-web-app-bucket.s3.us-east-1.amazonaws.com/car_images/images/fleet/convertible.jpg",
    link: "/fleet/cars/convertible"
  },
  {
    name: "Sedans",
    description: "Comfortable and elegant sedans",
    image: "https://car-rental-web-app-bucket.s3.us-east-1.amazonaws.com/car_images/images/fleet/sedan.jpg",
    link: "/fleet/cars/sedan"
  },
  {
    name: "Super Cars",
    description: "Ultimate performance and exclusivity",
    image: "https://car-rental-web-app-bucket.s3.us-east-1.amazonaws.com/car_images/images/fleet/super.jpg",
    link: "/fleet/cars/super"
  },
  {
    name: "Exotic Cars",
    description: "Rare and extraordinary vehicles",
    image: "https://car-rental-web-app-bucket.s3.us-east-1.amazonaws.com/car_images/images/fleet/exotic.jpg",
    link: "/fleet/cars/exotic"
  }
]

export const brandLogos = [
  // ... your brandLogos array
]

export const youtubeVideos = [
  // ... your youtubeVideos array
]

export const carGallery = [
  // ... your carGallery array
] 

// Create this new file for constants
export const BASE_PATH = "https://car-rental-web-app-bucket.s3.us-east-1.amazonaws.com/car_images";