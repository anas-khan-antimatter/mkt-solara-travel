import { destinations } from "@/data/destinations";
import { testimonials } from "@/data/testimonials";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Cinematic Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={destinations[0].heroImage}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://player.vimeo.com/external/394513291.sd.mp4?s=1b8532e3876e22c265b7cfb68d5ec7b030a7db8c&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4 animate-reveal">
            Solara Travel
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading tracking-tight text-white max-w-4xl leading-tight animate-reveal-delay-1">
            Journeys for the
            <span className="text-gradient block mt-2">discerning eye</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mt-6 max-w-xl animate-reveal-delay-2">
            Helicopter transfers, private villas, and experiences curated by
            those who understand that true luxury is invisible.
          </p>
          <div className="flex gap-4 mt-10 animate-reveal-delay-3">
            <Link
              href="#destinations"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-all"
            >
              Explore Destinations
            </Link>
            <Link
              href="/quiz"
              className="border border-white/20 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium hover:bg-white/10 transition-all"
            >
              Build Your Trip
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7-7v14" />
          </svg>
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Curated Destinations
          </p>
          <h2 className="text-4xl md:text-5xl font-heading tracking-tight text-gradient">
            Where beauty takes you
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="group relative h-[500px] overflow-hidden rounded-2xl"
            >
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                  {dest.subtitle}
                </p>
                <h3 className="text-2xl font-heading text-white mb-2">
                  {dest.name}
                </h3>
                <p className="text-sm text-white/70 line-clamp-2">
                  {dest.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Explorer CTA */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-secondary/30" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Interactive Map
          </p>
          <h2 className="text-4xl md:text-5xl font-heading tracking-tight text-gradient mb-6">
            Explore the world with Solara
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Navigate our interactive globe and discover the destinations that
            call to you. Click, explore, and begin dreaming.
          </p>
          <Link
            href="/explorer"
            className="bg-primary text-primary-foreground px-10 py-4 rounded-full text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-all inline-block"
          >
            Open Explorer
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              The Solara Standard
            </p>
            <h2 className="text-4xl md:text-5xl font-heading tracking-tight text-gradient">
              Words from our travelers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="glass rounded-2xl p-8 flex flex-col"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-white/80 leading-relaxed flex-1 mb-6 italic">
                  {"\u201C"}{t.quote}{"\u201D"}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading tracking-tight text-gradient mb-6">
            Begin your journey
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Tell us what moves you, and we will craft the journey that feels
            like it was always meant for you.
          </p>
          <Link
            href="/inquire"
            className="bg-primary text-primary-foreground px-10 py-4 rounded-full text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-all inline-block"
          >
            Make an Inquiry
          </Link>
        </div>
      </section>
    </>
  );
}