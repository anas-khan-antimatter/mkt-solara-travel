import { NextRequest, NextResponse } from "next/server";
import { destinations } from "@/data/destinations";
import { itineraries } from "@/data/itineraries";

interface QuizAnswers {
  landscape?: string;
  travelStyle?: string;
  dining?: string;
  accommodation?: string;
  energy?: string;
  destination?: string;
}

// High-quality deterministic fallback — no API key needed
function generateFallbackItinerary(answers: QuizAnswers) {
  const landscape = answers.landscape || "coastal";
  const travelStyle = answers.travelStyle || "seamless";
  const dining = answers.dining || "local";
  const accommodation = answers.accommodation || "cliff";
  const energy = answers.energy || "romance";
  const preferredDest = answers.destination || "";

  // Pick the best-matching destination
  const destScore: Record<string, number> = {};

  itineraries.forEach((it) => {
    destScore[it.slug] = 0;
  });

  const matchMap: Record<string, string[]> = {
    coastal: ["amalfi-coast-5-days", "santorini-4-days", "maldives"],
    countryside: ["tuscan-countryside"],
    island: ["santorini-4-days", "bali-wellness-7-days", "maldives"],
    seamless: ["amalfi-coast-5-days", "maldives"],
    immersive: ["santorini-4-days", "tuscan-countryside", "provence"],
    transformative: ["bali-wellness-7-days"],
    adventurous: ["bali-wellness-7-days", "santorini-4-days"],
    michelin: ["amalfi-coast-5-days", "santorini-4-days"],
    local: ["tuscan-countryside", "provence"],
    water: ["santorini-4-days", "maldives", "amalfi-coast-5-days"],
    cooking: ["tuscan-countryside", "bali-wellness-7-days"],
    cliff: ["amalfi-coast-5-days", "santorini-4-days"],
    villa: ["bali-wellness-7-days", "tuscan-countryside"],
    overwater: ["maldives"],
    heritage: ["tuscan-countryside", "provence"],
    romance: ["santorini-4-days", "amalfi-coast-5-days"],
    peace: ["bali-wellness-7-days", "maldives"],
    inspiration: ["tuscan-countryside", "provence", "santorini-4-days"],
    celebration: ["maldives", "amalfi-coast-5-days"],
  };

  // Score each itinerary
  Object.entries(matchMap).forEach(([key, slugs]) => {
    slugs.forEach((slug) => {
      if (destScore[slug] !== undefined) {
        destScore[slug]++;
      }
    });
  });

  // Also score from answers
  const answerValues = Object.values(answers).filter(Boolean);
  answerValues.forEach((val) => {
    const slugs = matchMap[val];
    if (slugs) {
      slugs.forEach((slug) => {
        if (destScore[slug] !== undefined) destScore[slug] += 2;
      });
    }
  });

  // Find best match
  let bestSlug = "amalfi-coast-5-days";
  let bestScore = -1;
  Object.entries(destScore).forEach(([slug, score]) => {
    if (score > bestScore) {
      bestScore = score;
      bestSlug = slug;
    }
  });

  // If a preferred destination was given, boost it
  if (preferredDest) {
    const preferredLower = preferredDest.toLowerCase();
    const matched = itineraries.find(
      (it) =>
        it.slug.includes(preferredLower) ||
        it.location.toLowerCase().includes(preferredLower) ||
        it.title.toLowerCase().includes(preferredLower)
    );
    if (matched) {
      bestSlug = matched.slug;
    }
  }

  const itinerary = itineraries.find((i) => i.slug === bestSlug);
  if (!itinerary) {
    return {
      destination: "Amalfi Coast, Italy",
      duration: "5 Days / 4 Nights",
      price: "$12,500 per person",
      overview:
        "A bespoke journey crafted from your preferences, combining coastal beauty, cultural richness, and uncompromising luxury.",
      days: [
        {
          day: 1,
          title: "Arrival in Paradise",
          description:
            "Arrive and settle into your private retreat. The journey begins with an evening of welcome and quiet wonder.",
          activities: [
            "Private transfer from airport",
            "Check-in to handpicked luxury accommodation",
            "Welcome aperitivo",
          ],
          meals: ["Welcome refreshments"],
          accommodation: "Boutique luxury accommodation",
        },
        {
          day: 2,
          title: "Exploration & Discovery",
          description:
            "A full day of curated experiences designed to immerse you in the region's beauty, culture, and cuisine.",
          activities: [
            "Private guided tour with local specialist",
            "Curated lunch at a hidden gem",
            "Afternoon at leisure or optional experience",
          ],
          meals: ["Breakfast", "Curated lunch", "Dinner"],
          accommodation: "Same as Day 1",
        },
        {
          day: 3,
          title: "Cultural Immersion",
          description:
            "Delve deeper into the local traditions with experiences that connect you to the soul of the destination.",
          activities: [
            "Private cultural or culinary experience",
            "Scenic exploration with personal guide",
            "Sunset aperitivo at a panoramic location",
          ],
          meals: ["Breakfast", "Local lunch", "Gourmet dinner"],
          accommodation: "Same as Day 1",
        },
        {
          day: 4,
          title: "Signature Experience",
          description:
            "The highlight of your journey — a signature Solara experience that defines luxury travel at its most extraordinary.",
          activities: [
            "Signature curated experience",
            "Afternoon at leisure with spa access",
            "Farewell dinner at a Michelin-recommended restaurant",
          ],
          meals: ["Breakfast", "Light lunch", "Gala farewell dinner"],
          accommodation: "Same as Day 1",
        },
        {
          day: 5,
          title: "Departure with Memories",
          description:
            "A final morning to soak in the beauty. Breakfast with a view, last stroll, then private transfer to the airport.",
          activities: [
            "Leisurely farewell breakfast",
            "Private transfer to airport with scenic route",
          ],
          meals: ["Breakfast"],
          accommodation: "Departure",
        },
      ],
      includes: [
        "All accommodations as specified",
        "Private transfers throughout",
        "Daily breakfast and selected meals",
        "Personal Solara concierge on call 24/7",
        "Curated experiences as per itinerary",
      ],
      excludes: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Gratuities",
      ],
    };
  }

  // Return the real itinerary data
  return {
    destination: itinerary.location,
    duration: itinerary.duration,
    price: itinerary.price,
    overview: itinerary.overview,
    days: itinerary.days.map((d) => ({
      day: d.day,
      title: d.title,
      description: d.description,
      activities: d.activities,
      meals: d.meals,
      accommodation: d.accommodation,
    })),
    includes: itinerary.includes,
    excludes: itinerary.excludes,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const answers: QuizAnswers = {
      landscape: body.landscape,
      travelStyle: body.travelStyle,
      dining: body.dining,
      accommodation: body.accommodation,
      energy: body.energy,
      destination: body.destination,
    };

    // Try using an AI model if API key is available
    const openaiKey = process.env.OPENAI_API_KEY;

    if (openaiKey) {
      try {
        const systemPrompt = `You are Solara Travel's AI itinerary designer. You create ultra-luxury 5-day travel itineraries.
You respond only with valid JSON matching this type:
{
  "destination": string,
  "duration": string,
  "price": string,
  "overview": string,
  "days": [{ "day": number, "title": string, "description": string, "activities": string[], "meals": string[], "accommodation": string }],
  "includes": string[],
  "excludes": string[]
}
Keep descriptions evocative and luxurious. Price between $8k-$20k per person.`;

        const userPrompt = `Create a 5-day luxury itinerary based on these preferences:
Landscape: ${answers.landscape || "Not specified"}
Travel style: ${answers.travelStyle || "Not specified"}
Dining preference: ${answers.dining || "Not specified"}
Accommodation preference: ${answers.accommodation || "Not specified"}
Energy sought: ${answers.energy || "Not specified"}
Preferred destination: ${answers.destination || "Let AI decide best match"}`;

        const aiResponse = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openaiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
              ],
              temperature: 0.7,
              max_tokens: 2000,
            }),
          }
        );

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          const content = aiData.choices?.[0]?.message?.content;
          if (content) {
            // Try to extract JSON from the response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]);
              return NextResponse.json({
                source: "ai",
                itinerary: parsed,
              });
            }
          }
        }
        // If AI call fails, fall through to fallback
      } catch {
        // AI call failed, fall through
      }
    }

    // Deterministic fallback
    const fallback = generateFallbackItinerary(answers);
    return NextResponse.json({
      source: "curated",
      itinerary: fallback,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Provide quiz answers as JSON." },
      { status: 400 }
    );
  }
}