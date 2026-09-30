import { itineraries } from "@/data/itineraries";
import Link from "next/link";

export default function ItinerariesPage() {
  return (
    <>
      <section className="relative h-[50vh] min-h-[350px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=90"
          alt="Curated journeys"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-16 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
            Solara Travel
          </p>
          <h1 className="text-5xl md:text-7xl font-heading tracking-tight text-white mb-3">
            Curated Journeys
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Each itinerary is handcrafted by our destination specialists. No two journeys are ever alike.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((it) => (
            <Link
              key={it.id}
              href={`/itineraries/${it.slug}`}
              className="group relative h-[450px] overflow-hidden rounded-2xl"
            >
              <img
                src={it.heroImage}
                alt={it.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                  {it.duration} &middot; {it.location}
                </p>
                <h3 className="text-xl font-heading text-white mb-2">
                  {it.title}
                </h3>
                <p className="text-sm text-white/70 mb-3 line-clamp-2">
                  {it.subtitle}
                </p>
                <span className="text-primary text-sm font-medium">
                  {it.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}