import { itineraries } from "@/data/itineraries";
import Link from "next/link";

export default function ItinerariesPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="stamp-border px-3 py-1">
            <p className="passport-text text-xs text-primary/60">ITINERARIES</p>
          </div>
          <span className="passport-text text-[10px] text-white/30">
            {itineraries.length} JOURNEYS
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-heading tracking-tight text-white mb-4">
          Curated Journeys
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mb-12 font-serif-alt italic">
          Each itinerary is handcrafted by our regional specialists. Choose a path, then let us personalize every detail.
        </p>

        {/* Itinerary cards */}
        <div className="space-y-8">
          {itineraries.map((itinerary, i) => (
            <Link
              key={itinerary.id}
              href={`/itineraries/${itinerary.slug}`}
              className="group block"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 stamp-border overflow-hidden hover:bg-primary/5 transition-colors">
                {/* Image */}
                <div className="md:col-span-1 relative h-48 md:h-auto min-h-[200px] film-grain">
                  <img
                    src={itinerary.heroImage}
                    alt={itinerary.title}
                    className="absolute inset-0 w-full h-full object-cover film-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent md:bg-gradient-to-r md:from-background/60 md:to-transparent" />
                  <div className="absolute bottom-0 md:top-0 md:bottom-0 md:right-0 p-4 flex items-end md:items-start md:justify-end">
                    <span className="stamp-tag text-[9px]">
                      {itinerary.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="passport-text text-[10px] text-primary/50">
                      JOURNEY {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="w-6 h-[1px] bg-primary/20" />
                    <span className="text-xs text-white/40">{itinerary.location}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-2 group-hover:text-primary transition-colors">
                    {itinerary.title}
                  </h2>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2 font-serif-alt italic">
                    {itinerary.overview}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <span className="text-xs text-primary/80 font-medium">
                      {itinerary.price}
                    </span>
                    <span className="text-xs text-white/30">|</span>
                    <span className="text-xs text-white/50">
                      {itinerary.days.length} days
                    </span>
                    <span className="text-xs text-white/30">|</span>
                    <span className="text-xs text-white/50 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                      View details
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}