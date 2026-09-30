export interface GeoPoint {
  lat: number;
  lng: number;
  label: string;
  slug: string;
  image: string;
  tagline: string;
}

export const destinationCoordinates: GeoPoint[] = [
  {
    lat: 40.6333,
    lng: 14.6,
    label: "Amalfi Coast",
    slug: "amalfi-coast",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&q=80",
    tagline: "Where the Mediterranean kisses the sky",
  },
  {
    lat: 36.3932,
    lng: 25.4615,
    label: "Santorini",
    slug: "santorini",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d434?w=400&q=80",
    tagline: "The island that dreams painted blue and white",
  },
  {
    lat: -8.3405,
    lng: 115.092,
    label: "Bali",
    slug: "balinese-retreat",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
    tagline: "Where spirit meets paradise",
  },
  {
    lat: 43.2195,
    lng: 11.2717,
    label: "Tuscany",
    slug: "tuscan-countryside",
    image: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=400&q=80",
    tagline: "The soul of Italy, rolled across gentle hills",
  },
  {
    lat: 3.2028,
    lng: 73.2207,
    label: "Maldives",
    slug: "maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80",
    tagline: "Luxury suspended above aquamarine dreams",
  },
  {
    lat: 43.9493,
    lng: 5.0442,
    label: "Provence",
    slug: "provence",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=80",
    tagline: "Fields of lavender, light that inspired masters",
  },
];

export function getPointOnGlobe(
  lat: number,
  lng: number,
  width: number,
  height: number
): { x: number; y: number } {
  // Simple equirectangular projection for illustrative SVG map
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}