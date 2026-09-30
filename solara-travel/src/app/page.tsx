import { destinations } from "@/data/destinations";
import { testimonials } from "@/data/testimonials";
import Link from "next/link";

export default function HomePage() {
  const heroDest = destinations[0];
  const secondaryDests = destinations.slice(1, 4);
  const tertiaryDests = destinations.slice(4);

  return (
    <>
      {/* ── CINEMATIC HERO — film photography aesthetic ── */}
      <section className="relative h-screen w-full overflow-hidden film-grain">
        <div className="absolute inset-0">
          <img
            src={heroDest.heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover film-image"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/90" />
        <div className="absolute inset-0 hero-overlay" />

        {/* Passport date stamp */}
        <div className="absolute top-32 right-8 md:right-16 z-20 stamp-enter" style={{animationDelay: "1.2s"}}>
          <div className="stamp-border px-4 py-2 text-right">
            <p className="passport-text text-xs tracking-[0.15em] text-primary/60">ENTERED</p>
            <p className="font-serif-alt text-2xl text-primary/50 leading-none mt-1">2026</p>
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto">
          {/* Stamp badge */}
          <div className="flex items-center gap-3 mb-6 animate-reveal">
            <span className="stamp-tag">curated</span>
            <span className="stamp-tag" style={{transform: "rotate(1deg)"}}>bespoke</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading tracking-tight text-white max-w-5xl leading-[0.9] animate-reveal-delay-1">
            Journeys for
            <br />
            <span className="text-gradient">the discerning</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 mt-10 max-w-3xl animate-reveal-delay-2">
            <p className="text-base md:text-lg text-white/50 leading-relaxed font-serif-alt italic">
              Helicopter transfers, private villas, and experiences curated by
              those who understand that true luxury is invisible.
            </p>
            <div className="shrink-0">
              <Link
                href="/quiz"
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3 rounded-none text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-all"
              >
                Build Your Trip
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator — passport-style */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="passport-text text-[10px] text-white/30 tracking-[0.3em]">SCROLL</span>
          <div className="w-[1px] h-8 bg-white/20" />
        </div>
      </section>

      {/* ── PASSPORT STAMP DIVIDER ── */}
      <div className="flex justify-center -mt-6 relative z-20">
        <div className="stamp-border bg-background px-6 py-2 inline-flex items-center gap-3">
          <span className="passport-text text-primary/60">DESTINATIONS</span>
          <span className="w-6 h-[1px] bg-primary/30" />
          <span className="passport-text text-primary/60">{destinations.length} CURATED</span>
        </div>
      </div>

      {/* ── DESTINATIONS — editorial grid ── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Hero destination — full-width feature */}
        <Link
          href={`/destinations/${heroDest.slug}`}
          className="group relative h-[70vh] min-h-[500px] w-full overflow-hidden mb-6 block film-grain"
        >
          <img
            src={heroDest.heroImage}
            alt={heroDest.name}
            className="absolute inset-0 w-full h-full object-cover film-image transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="passport-text text-xs text-primary/70">FEATURED</span>
              <span className="w-6 h-[1px] bg-primary/30" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/50">{heroDest.subtitle}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading text-white mb-3">
              {heroDest.name}
            </h2>
            <p className="text-lg text-white/60 max-w-2xl font-serif-alt italic">
              {heroDest.tagline}
            </p>
          </div>
        </Link>

        {/* Secondary destinations — two-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {secondaryDests.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="group relative h-[50vh] min-h-[400px] overflow-hidden film-grain"
            >
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover film-image transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1 block">
                  {dest.subtitle}
                </span>
                <h3 className="text-3xl font-heading text-white mb-2">
                  {dest.name}
                </h3>
                <p className="text-sm text-white/60 line-clamp-1 font-serif-alt italic">
                  {dest.tagline}
                </p>
                {/* Passport stamp on hover */}
                <span className="inline-block mt-3 opacity-0 group-hover:opacity-100 transition-opacity stamp-tag text-[10px]">
                  explore &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Tertiary destinations — three-column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tertiaryDests.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="group relative h-[40vh] min-h-[300px] overflow-hidden film-grain"
            >
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover film-image transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1 block">
                  {dest.subtitle}
                </span>
                <h3 className="text-2xl font-heading text-white">{dest.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View all stamp */}
        <div className="flex justify-center mt-10">
          <Link
            href="/explorer"
            className="stamp-border px-8 py-3 inline-flex items-center gap-3 group hover:bg-primary/5 transition-colors"
          >
            <span className="passport-text text-sm text-primary group-hover:text-primary/80 transition-colors">
              VIEW ALL DESTINATIONS
            </span>
            <svg className="w-4 h-4 text-primary/60 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── PASSPORT STAMP DIVIDER ── */}
      <div className="flex justify-center">
        <div className="stamp-border bg-background px-6 py-2 inline-flex items-center gap-3">
          <span className="passport-text text-primary/60">THE SOLARA STANDARD</span>
        </div>
      </div>

      {/* ── TESTIMONIALS — editorial pull-quotes ── */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`${i === 1 ? "md:mt-12" : i === 2 ? "md:mt-24" : ""}`}
            >
              <div className="relative">
                {/* Decorative stamp */}
                <div className="absolute -top-3 -right-3 z-10 stamp-circle w-10 h-10 bg-background text-[10px]">
                  <span className="passport-text text-primary/50">{t.rating}/5</span>
                </div>
                <div className="stamp-border p-6 bg-background/60">
                  <p className="text-base md:text-lg font-serif-alt italic leading-relaxed text-white/70 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover film-image"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.title}</p>
                      <span className="passport-text text-[10px] text-primary/40">{t.destination}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PASSPORT STAMP DIVIDER ── */}
      <div className="flex justify-center">
        <div className="stamp-border bg-background px-6 py-2 inline-flex items-center gap-3">
          <span className="passport-text text-primary/60">BEGIN YOUR JOURNEY</span>
        </div>
      </div>

      {/* ── FINAL CTA — passport-style ── */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden film-grain">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/5" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Decorative stamp */}
          <div className="stamp-border inline-block px-4 py-2 mb-8 mx-auto">
            <p className="passport-text text-xs text-primary/60">VISA REQUIRED</p>
          </div>

          <h2 className="text-4xl md:text-6xl font-heading tracking-tight text-white mb-6 leading-tight">
            The world is waiting.
            <br />
            <span className="text-gradient">Where will you go?</span>
          </h2>
          <p className="text-base md:text-lg text-white/50 mb-10 max-w-xl mx-auto font-serif-alt italic">
            Tell us what moves you, and we will craft the journey that feels
            like it was always meant for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inquire"
              className="bg-primary text-primary-foreground px-10 py-4 rounded-none text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-all"
            >
              Make an Inquiry
            </Link>
            <Link
              href="/quiz"
              className="stamp-border px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white hover:bg-primary/5 transition-all"
            >
              Take the Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER STAMP ── */}
      <div className="flex justify-center pb-8">
        <div className="stamp-border px-4 py-1">
          <p className="passport-text text-[10px] text-primary/30 tracking-[0.4em]">
            SOLARA TRAVEL &middot; EST. 2024
          </p>
        </div>
      </div>
    </>
  );
}