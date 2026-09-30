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
  {
    id: "q6",
    question: "What's your travel budget?",
    options: [
      { value: "premium", label: "Premium — $8k–15k per person", emoji: "💎" },
      { value: "ultra", label: "Ultra-luxury — $15k–30k per person", emoji: "👑" },
      { value: "bespoke", label: "Bespoke — $30k+ no limits", emoji: "✨" },
      { value: "flexible", label: "I'll decide after seeing options", emoji: "🤝" },
    ],
  },
  {
    id: "q7",
    question: "What pace describes your ideal trip?",
    options: [
      { value: "leisurely", label: "Leisurely — one hotel, deep immersion", emoji: "🧘" },
      { value: "balanced", label: "Balanced — explore by day, unwind by night", emoji: "⚖️" },
      { value: "active", label: "Active — new experience every few hours", emoji: "⚡" },
      { value: "varied", label: "Varied — mix of cities, coast, and countryside", emoji: "🔄" },
    ],
  },
  {
    id: "q8",
    question: "Which climate do you prefer?",
    options: [
      { value: "mediterranean", label: "Warm sun, sea breezes — Mediterranean", emoji: "☀️" },
      { value: "tropical", label: "Lush, warm, and exotic — Tropical", emoji: "🌴" },
      { value: "mild", label: "Mild golden days, cool evenings", emoji: "🍂" },
      { value: "any", label: "No preference — surprise me", emoji: "🌍" },
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
    matchLabel: "Coastal Romance",
    highlights: [
      "Cliffside boutique hotels with infinity pools",
      "Helicopter transfer from Naples with aerial views",
      "Private sunset sail along the Amalfi coastline",
      "Michelin-starred seafood and limoncello tasting",
    ],
  },
  {
    slug: "santorini-4-days",
    title: "Cycladic Romance: Santorini",
    description:
      "You are drawn to volcanic beauty, iconic sunsets, and the romance of the Aegean. Santorini's cliffside suites, private catamaran sails, and wines born of ancient soil are your perfect escape.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d434?w=800&q=85",
    matchLabel: "Aegean Dream",
    highlights: [
      "Cliffside cave suite with caldera-view plunge pool",
      "Private catamaran to volcanic hot springs",
      "Sunset champagne from a private Oia terrace",
      "Assyrtiko wine tour at three boutique vineyards",
    ],
  },
  {
    slug: "bali-wellness-7-days",
    title: "Journey Within: Bali",
    description:
      "Your soul calls for transformation — healing waters, ancient temples, and the deep peace of the Indonesian jungle. Bali's wellness traditions, private villa sanctuaries, and spiritual richness will renew you from the inside out.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=85",
    matchLabel: "Spiritual Renewal",
    highlights: [
      "Private villa with rice-terrace infinity pool",
      "Daily wellness treatments and Balinese healers",
      "Sunrise trek up Mount Batur",
      "Sacred water temple purification ceremony",
    ],
  },
  {
    slug: "tuscan-countryside",
    title: "Tuscan Countryside",
    description:
      "You are a romantic of the old world — rolling hills, cypress-lined roads, and the taste of truffle and Chianti. Tuscany's golden light, Renaissance villas, and farm-to-table soul are your ideal escape.",
    image: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&q=85",
    matchLabel: "Old World Elegance",
    highlights: [
      "Private truffle hunt with a seasoned tartufaio",
      "Hot air balloon ride over Val d'Orcia at sunrise",
      "Exclusive wine tasting at a centuries-old vineyard",
      "Cooking masterclass in a Renaissance villa",
    ],
  },
  {
    slug: "maldives",
    title: "Maldivian Paradise",
    description:
      "You crave absolute serenity, overwater luxury, and the kind of blue that doesn't exist elsewhere. The Maldives offers glass-floor villas, private sandbank dinners, and a silence that restores the spirit.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=85",
    matchLabel: "Ultra-Luxury Escape",
    highlights: [
      "Overwater villa with glass floor and private pool",
      "Private sandbank dinner under the stars",
      "Manta ray and whale shark snorkeling",
      "Sunset dolphin cruise on a private yacht",
    ],
  },
  {
    slug: "amalfi-coast-5-days",
    title: "Provence: The Art of Slow Living",
    description:
      "You are drawn to fields of lavender, the painter's light, and the unhurried elegance of French country life. Provence offers rosé-soaked afternoons, hilltop villages, and the kind of beauty that makes you forget time.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=85",
    matchLabel: "Provençal Romance",
    highlights: [
      "Helicopter tour over lavender fields in full bloom",
      "Private rosé tasting at a Château in Côtes de Provence",
      "Bespoke perfume creation in Grasse",
      "Stay at a restored Provençal mas with olive grove",
    ],
  },
];

// Scored matching engine — returns sorted results with scores
export function scoreQuizAnswers(answers: Record<string, string>): (QuizResult & { matchScore: number })[] {
  const scoringMatrix: Record<string, Record<string, string[]>> = {
    "amalfi-coast-5-days": {
      coastal: ["q1"],
      seamless: ["q2"],
      michelin: ["q3"],
      cliff: ["q4"],
      romance: ["q5"],
      premium: ["q6"],
      balanced: ["q7"],
      leisurely: ["q7"],
      mediterranean: ["q8"],
    },
    "santorini-4-days": {
      coastal: ["q1"],
      island: ["q1"],
      immersive: ["q2"],
      water: ["q3"],
      cliff: ["q4"],
      romance: ["q5"],
      premium: ["q6"],
      balanced: ["q7"],
      leisure: ["q7"],
      mediterranean: ["q8"],
    },
    "bali-wellness-7-days": {
      island: ["q1"],
      transformative: ["q2"],
      local: ["q3"],
      cooking: ["q3"],
      villa: ["q4"],
      peace: ["q5"],
      premium: ["q6"],
      ultra: ["q6"],
      leisurely: ["q7"],
      balanced: ["q7"],
      tropical: ["q8"],
    },
    "tuscan-countryside": {
      countryside: ["q1"],
      culture: ["q1"],
      immersive: ["q2"],
      cooking: ["q3"],
      local: ["q3"],
      heritage: ["q4"],
      inspiration: ["q5"],
      premium: ["q6"],
      leisurely: ["q7"],
      balanced: ["q7"],
      mild: ["q8"],
      mediterranean: ["q8"],
    },
    "maldives": {
      coastal: ["q1"],
      island: ["q1"],
      seamless: ["q2"],
      water: ["q3"],
      overwater: ["q4"],
      peace: ["q5"],
      ultra: ["q6"],
      bespoke: ["q6"],
      leisurely: ["q7"],
      tropical: ["q8"],
    },
  };

  // Map provence to amalfi scoring structure but with different weights
  const provenceSlug = "amalfi-coast-5-days";

  const allResults = [...quizResults];
  const scores: Record<string, number> = {};

  // Initialize all relevant slugs
  allResults.forEach((r) => {
    scores[r.slug] = 0;
  });

  // Score each answer
  Object.entries(answers).forEach(([qId, val]) => {
    Object.entries(scoringMatrix).forEach(([slug, matrix]) => {
      Object.entries(matrix).forEach(([answerValue, questions]) => {
        if (questions.includes(qId) && val === answerValue) {
          scores[slug] += 2;
        }
      });
    });
  });

  // Bonus proximity
  const values = Object.values(answers);
  if (values.includes("seamless") || values.includes("romance")) {
    scores["amalfi-coast-5-days"] = (scores["amalfi-coast-5-days"] || 0) + 1;
    scores["santorini-4-days"] = (scores["santorini-4-days"] || 0) + 1;
  }
  if (values.includes("peace") || values.includes("transformative")) {
    scores["bali-wellness-7-days"] = (scores["bali-wellness-7-days"] || 0) + 1;
  }
  if (values.includes("cooking") || values.includes("heritage")) {
    scores["tuscan-countryside"] = (scores["tuscan-countryside"] || 0) + 1;
  }
  if (values.includes("overwater") || values.includes("celebration")) {
    scores["maldives"] = (scores["maldives"] || 0) + 1;
  }

  // Build scored results
  const scored: (QuizResult & { matchScore: number })[] = allResults.map((r) => ({
    ...r,
    matchScore: scores[r.slug] || 0,
  }));

  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored;
}