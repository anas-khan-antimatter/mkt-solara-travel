import { destinations } from "@/data/destinations";
import { itineraries } from "@/data/itineraries";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const dest = destinations.find((d) => d.slug === params.slug);
  if (!dest) notFound();

  const relatedItineraries = itineraries.filter(
    (i) => i.destinationSlug === dest.slug
  );

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <img
          src={dest.heroImage}
          alt={dest.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-16 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
            {dest.subtitle}
          </p>
          <h1 className="text-5xl md:text-7xl font-heading tracking-tight text-white mb-3">
            {dest.name}
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">{dest.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="text-lg leading-relaxed text-white/80 mb-8">
              {dest.description}
            </p>

            <h3 className="text-2xl font-heading mb-4 text-gradient">
              Curated Highlights
            </h3>
            <ul className="space-y-3 mb-10">
              {dest.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70">
                  <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-heading mb-4 text-gradient">
              Cuisine & Wine
            </h3>
            <p className="text-white/70 mb-10">{dest.cuisine}</p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="glass rounded-2xl p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Best Time to Visit
                </p>
                <p className="text-sm text-white/80">{dest.bestTimeToVisit}</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Curated By
                </p>
                <p className="text-sm text-white/80">{dest.curatedBy}</p>
              </div>
            </div>
          </div>

          {/* Sidebar / Itineraries */}
          <div>
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Available Journeys
              </h4>
              {relatedItineraries.length > 0 ? (
                <div className="space-y-4">
                  {relatedItineraries.map((it) => (
                    <Link
                      key={it.id}
                      href={`/itineraries/${it.slug}`}
                      className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <p className="text-base font-medium text-white mb-1">
                        {it.title}
                      </p>
                      <p className="text-xs text-muted-foreground mb-1">
                        {it.duration}
                      </p>
                      <p className="text-sm text-primary">{it.price}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Custom journeys available upon inquiry.
                </p>
              )}
              <div className="mt-6 pt-6 border-t border-border/30">
                <Link
                  href="/inquire"
                  className="block w-full text-center bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-all"
                >
                  Inquire About This Destination
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}