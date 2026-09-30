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
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden film-grain">
        <img
          src={itinerary.heroImage}
          alt={itinerary.title}
          className="absolute inset-0 w-full h-full object-cover film-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 hero-overlay" />

        {/* Passport date stamp */}
        <div className="absolute top-32 right-8 md:right-16 z-20">
          <div className="stamp-border px-3 py-1">
            <p className="passport-text text-[10px] text-primary/60">ITINERARY</p>
            <p className="text-xs text-white/40 text-right">{itinerary.slug}</p>
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="passport-text text-[10px] text-primary/70">JOURNEY</span>
            <span className="w-6 h-[1px] bg-primary/30" />
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">{itinerary.location}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading tracking-tight text-white mb-3">
            {itinerary.title}
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mb-4 font-serif-alt italic">
            {itinerary.subtitle}
          </p>
          <div className="flex flex-wrap gap-6 text-xs text-white/50">
            <span className="flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {itinerary.duration}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {itinerary.location}
            </span>
            <span className="text-primary font-medium">{itinerary.price}</span>
          </div>
        </div>
      </section>

      {/* Overview + Timeline */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Passport overview */}
            <div className="stamp-border p-6 mb-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="passport-text text-xs text-primary/60">OVERVIEW</span>
                <span className="w-6 h-[1px] bg-primary/20" />
              </div>
              <p className="text-base leading-relaxed text-white/70 font-serif-alt">
                {itinerary.overview}
              </p>
            </div>

            {/* Vertical timeline — passport stamp style */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="stamp-border px-3 py-1">
                  <p className="passport-text text-xs text-primary/60">DAY BY DAY</p>
                </div>
                <span className="passport-text text-[10px] text-white/30">{itinerary.days.length} CHAPTERS</span>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="timeline-line" />

                <div className="space-y-8">
                  {itinerary.days.map((day, idx) => (
                    <div key={day.day} className="relative pl-16">
                      {/* Timeline dot */}
                      <div className="absolute left-[21px] top-1 w-[14px] h-[14px] rounded-full border-2 border-primary/50 bg-background flex items-center justify-center pulsing-dot">
                        <div className="w-[4px] h-[4px] rounded-full bg-primary" />
                      </div>

                      {/* Passport stamp card */}
                      <div className="stamp-border p-6 bg-background/40 hover:bg-primary/5 transition-colors">
                        {/* Day header */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="stamp-tag text-[9px]">DAY {day.day}</span>
                          <span className="w-4 h-[1px] bg-primary/20" />
                          <span className="passport-text text-[9px] text-white/30">
                            {day.day === 1 ? "ARRIVAL" : day.day === itinerary.days.length ? "DEPARTURE" : `CHAPTER ${day.day}`}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-1">
                            <img
                              src={day.image}
                              alt={`Day ${day.day}`}
                              className="w-full h-32 object-cover film-image"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <h3 className="text-lg font-heading text-white mb-2">
                              {day.title}
                            </h3>
                            <p className="text-sm text-white/60 mb-3 leading-relaxed font-serif-alt">
                              {day.description}
                            </p>

                            <div className="space-y-1">
                              {day.activities.slice(0, 3).map((act, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-white/50">
                                  <span className="text-primary/60 shrink-0">&mdash;</span>
                                  {act}
                                </div>
                              ))}
                              {day.activities.length > 3 && (
                                <p className="text-[10px] text-primary/50 passport-text mt-1">
                                  +{day.activities.length - 3} more activities
                                </p>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                              {day.meals.map((meal, i) => (
                                <span key={i} className="text-[9px] uppercase tracking-wider text-white/30 border border-white/10 px-2 py-0.5">
                                  {meal}
                                </span>
                              ))}
                            </div>

                            <div className="mt-3 pt-3 border-t border-border/20">
                              <p className="text-[10px] text-primary/50 passport-text">
                                ACCOMMODATION
                              </p>
                              <p className="text-xs text-white/60">
                                {day.accommodation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="stamp-border p-6 sticky top-32">
              <div className="flex items-center gap-2 mb-4">
                <span className="passport-text text-xs text-primary/60">DETAILS</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="pb-3 border-b border-border/20">
                  <p className="text-[10px] text-white/30 passport-text mb-1">DURATION</p>
                  <p className="text-sm text-white">{itinerary.duration}</p>
                </div>
                <div className="pb-3 border-b border-border/20">
                  <p className="text-[10px] text-white/30 passport-text mb-1">LOCATION</p>
                  <p className="text-sm text-white">{itinerary.location}</p>
                </div>
                <div className="pb-3 border-b border-border/20">
                  <p className="text-[10px] text-white/30 passport-text mb-1">PRICE</p>
                  <p className="text-sm text-primary font-medium">{itinerary.price}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-[10px] text-white/30 passport-text mb-3">INCLUDES</p>
                <ul className="space-y-2">
                  {itinerary.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                      <svg className="w-3 h-3 text-primary/60 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-[10px] text-white/30 passport-text mb-3">EXCLUDES</p>
                <ul className="space-y-2">
                  {itinerary.excludes.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                      <span className="text-white/20 mt-0.5 shrink-0">&times;</span>
                      {exc}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/inquire?itinerary=${itinerary.slug}`}
                className="block w-full bg-primary text-primary-foreground px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-all text-center"
              >
                Inquire About This Journey
              </Link>

              <Link
                href="/quiz"
                className="block w-full mt-3 stamp-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white hover:bg-primary/5 transition-all text-center"
              >
                Find Your Match
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}