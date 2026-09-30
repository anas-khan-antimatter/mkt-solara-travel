import { QuizQuestion, QuizResult } from "@/types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What kind of landscape calls to you?",
    options: [
      { value: "coastal", label: "Dramatic coastlines & turquoise seas", emoji: "🌊" },
      { value: "countryside", label: "Rolling hills & vineyards", emoji: "🌿" },
      { value: "island", label: "Remote islands & volcanic beauty", emoji: "🏝️" },
      { value: "culture", label: "Ancient cities & artistic heritage", emoji: "🏛️" },
    ],
  },
  {
    id: "q2",
    question: "How do you want to travel?",
    options: [
      { value: "seamless", label: "Effortlessly — helicopters & private cars", emoji: "🚁" },
      { value: "immersive", label: "Slowly — walking, sailing, lingering", emoji: "⛵" },
      { value: "transformative", label: "With purpose — wellness & healing", emoji: "🧘" },
      { value: "adventurous", label: "Active — volcanoes, trails & discovery", emoji: "⛰️" },
    ],
  },
  {
    id: "q3",
    question: "What's your ideal dining experience?",
    options: [
      { value: "michelin", label: "Michelin-starred with wine pairings", emoji: "🍽️" },
      { value: "local", label: "Hidden trattorias & farm-to-table", emoji: "🍝" },
      { value: "water", label: "Dinner on the water's edge", emoji: "🌅" },
      { value: "cooking", label: "Learning to cook local recipes", emoji: "👨‍🍳" },
    ],
  },
  {
    id: "q4",
    question: "What makes a hotel unforgettable?",
    options: [
      { value: "cliff", label: "A room carved into a cliff overlooking the sea", emoji: "🏔️" },
      { value: "villa", label: "A private villa with an infinity pool", emoji: "🏡" },
      { value: "overwater", label: "An overwater villa with a glass floor", emoji: "🏝️" },
      { value: "heritage", label: "A restored monastery or historic estate", emoji: "⛪" },
    ],
  },
  {
    id: "q5",
    question: "What energy are you seeking?",
    options: [
      { value: "romance", label: "Romance & golden-hour magic", emoji: "✨" },
      { value: "peace", label: "Deep peace & spiritual renewal", emoji: "🕊️" },
      { value: "inspiration", label: "Artistic inspiration & beauty", emoji: "🎨" },
      { value: "celebration", label: "Celebration & unforgettable moments", emoji: "🥂" },
    ],
  },
];

export const quizResults: QuizResult[] = [
  {
    slug: "amalfi-coast-5-days",
    title: "La Dolce Vita: Amalfi Coast",
    description:
      "You dream of dramatic coastlines, the art of la dolce vita, and beauty that feels almost impossible. The Amalfi Coast awaits — with pastel villages, Michelin-starred seafood, and a helicopter landing that announces your arrival in style.",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=85",
  },
  {
    slug: "santorini-4-days",
    title: "Cycladic Romance: Santorini",
    description:
      "You are drawn to volcanic beauty, iconic sunsets, and the romance of the Aegean. Santorini's cliffside suites, private catamaran sails, and wines born of ancient soil are your perfect escape.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d434?w=800&q=85",
  },
  {
    slug: "bali-wellness-7-days",
    title: "Journey Within: Bali",
    description:
      "Your soul calls for transformation — healing waters, ancient temples, and the deep peace of the Indonesian jungle. Bali's wellness traditions, private villa sanctuaries, and spiritual richness will renew you from the inside out.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=85",
  },
  {
    slug: "tuscan-countryside",
    title: "Tuscan Countryside",
    description:
      "You are a romantic of the old world — rolling hills, cypress-lined roads, and the taste of truffle and Chianti. Tuscany's golden light, Renaissance villas, and farm-to-table soul are your ideal escape.",
    image: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&q=85",
  },
  {
    slug: "maldives",
    title: "Maldivian Paradise",
    description:
      "You crave absolute serenity, overwater luxury, and the kind of blue that doesn't exist elsewhere. The Maldives offers glass-floor villas, private sandbank dinners, and a silence that restores the spirit.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=85",
  },
  {
    slug: "amalfi-coast-5-days",
    title: "Provence: The Art of Slow Living",
    description:
      "You are drawn to fields of lavender, the painter's light, and the unhurried elegance of French country life. Provence offers rosé-soaked afternoons, hilltop villages, and the kind of beauty that makes you forget time.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=85",
  },
];