import { itineraries } from "@/data/itineraries";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ItineraryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const itinerary = itineraries.find((i) => i.slug === slug);
  if (!itinerary) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={itinerary.heroImage}
          alt={itinerary.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-16 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
            {itinerary.location}
          </p>
          <h1 className="text-4xl md:text-6xl font-heading tracking-tight text-white mb-3">
            {itinerary.title}
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mb-4">
            {itinerary.subtitle}
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {itinerary.duration}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {itinerary.location}
            </span>
            <span className="text-primary font-semibold">{itinerary.price}</span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-heading mb-6 text-gradient">
              Overview
            </h2>
            <p className="text-lg leading-relaxed text-white/80 mb-10">
              {itinerary.overview}
            </p>

            {/* Day by day */}
            <h2 className="text-3xl font-heading mb-8 text-gradient">
              Your Journey
            </h2>
            <div className="space-y-8">
              {itinerary.days.map((day) => (
                <div
                  key={day.day}
                  className="glass rounded-2xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="md:col-span-1 relative h-48 md:h-auto">
                      <img
                        src={day.image}
                        alt={`Day ${day.day}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-2 p-6 md:p-8">
                      <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
                        Day {day.day}
                      </p>
                      <h3 className="text-xl font-heading text-white mb-3">
                        {day.title}
                      </h3>
                      <p className="text-sm text-white/70 mb-4">
                        {day.description}
                      </p>
                      <ul className="space-y-1.5 mb-4">
                        {day.activities.map((a, i) => (
                          <li
                            key={i}
                            className="text-xs text-white/60 flex items-start gap-2"
                          >
                            <span className="text-primary mt-0.5">\u2022</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 text-xs text-white/50">
                        {day.meals.map((m, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-full bg-white/5"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 italic">
                        {day.accommodation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="glass rounded-2xl p-6 sticky top-24 space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  What&rsquo;s Included
                </h4>
                <ul className="space-y-2">
                  {itinerary.includes.map((inc, i) => (
                    <li key={i} className="text-xs text-white/70 flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Not Included
                </h4>
                <ul className="space-y-2">
                  {itinerary.excludes.map((exc, i) => (
                    <li key={i} className="text-xs text-white/50 flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-destructive mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      {exc}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/inquire"
                className="block w-full text-center bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-all"
              >
                Book This Journey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}