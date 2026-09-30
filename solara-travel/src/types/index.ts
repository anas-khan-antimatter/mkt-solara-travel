export interface Destination {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  heroImage: string;
  images: string[];
  description: string;
  highlights: string[];
  cuisine: string;
  bestTimeToVisit: string;
  curatedBy: string;
}

export interface DayActivity {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
  image: string;
}

export interface Itinerary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  location: string;
  price: string;
  heroImage: string;
  overview: string;
  includes: string[];
  excludes: string[];
  days: DayActivity[];
  destinationSlug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  avatar: string;
  quote: string;
  rating: number;
  destination: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; emoji?: string }[];
}

export interface QuizResult {
  slug: string;
  title: string;
  description: string;
  image: string;
  matchScore?: number;
  matchLabel?: string;
  highlights?: string[];
}