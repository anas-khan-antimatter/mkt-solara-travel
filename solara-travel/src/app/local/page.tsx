"use client";

import { destinations } from "@/data/destinations";
import { itineraries } from "@/data/itineraries";
import Link from "next/link";
import { useState } from "react";

const regions = [
  { id: "europe", name: "Europe", countries: 8, emoji: "\u{1F30D}" },
  { id: "asia", name: "Asia", countries: 3, emoji: "\u{1F30F}" },
  { id: "indian-ocean", name: "Indian Ocean", countries: 2, emoji: "\u{1F30A}" },
];

const curatedPicks = [
  {
    title: "Helicopter Transfers",
    description: "Arrive above the clouds. Every Solara journey includes private helicopter transfer from the nearest international hub — no queues, no compromises.",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=85",
  },
  {
    title: "Private Villa Stays",
    description: "Not a hotel — your own residence. Private infinity pools, personal chefs, and a staff dedicated to your comfort and privacy.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=85",
  },
  {
    title: "Curated Dining",
    description: "Michelin-starred chefs, hidden trattorias, and dinners on the water's edge. Every meal is a memory designed for you.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d434?w=800&q=85",
  },
];

export default function LocalPage() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const regionDestinations = activeRegion
    ? destinations.filter((d) => {
        if (activeRegion === "europe")
          return ["amalfi-coast", "santorini", "tuscan-countryside", "provence"].includes(d.slug);
        if (activeRegion === "asia") return ["balinese-retreat"].includes(d.slug);
        if (activeRegion === "indian-ocean") return ["maldives"].includes(d.slug);
        return false;
      })
    : [];

  return (
    <section className="min-h-screen pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="stamp-border px-3 py-1">
            <p className="passport-text text-xs text-primary/60">LOCAL EXPERIENCES</p>
          </div>
          <span className="passport-text text-[10px] text-white/30">
            {destinations.length} DESTINATIONS
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-heading tracking-tight text-white mb-4">
          Explore Solara
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mb-10 font-serif-alt italic leading-relaxed">
          Whether you dream of the Amalfi Coast&rsquo;s dramatic cliffs or the serene waters of the Maldives,
          every Solara destination is within reach. Select a region to discover the journeys waiting for you.
        </p>

        {/* Region selector — passport stamp style */}
        <div className="flex flex-wrap gap-4 mb-12">
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRegion(activeRegion === r.id ? null : r.id)}
              className={`stamp-border px-5 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                activeRegion === r.id
                  ? "bg-primary/10 text-primary border-primary/50"
                  : "text-white/50 hover:text-white hover:border-white/30"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{r.emoji}</span>
                <span>{r.name}</span>
                <span className="text-[9px] opacity-50">({r.countries})</span>
              </span>
            </button>
          ))}
        </div>

        {/* Region destinations */}
        {activeRegion && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="stamp-border px-2 py-1">
                <p className="passport-text text-[10px] text-primary/60">
                  {regions.find((r) => r.id === activeRegion)?.name}
                </p>
              </div>
              <span className="passport-text text-[9px] text-white/30">
                {regionDestinations.length} CURATED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regionDestinations.map((d) => {
                const it = itineraries.find((i) => i.destinationSlug === d.slug);
                return (
                  <Link
                    key={d.id}
                    href={it ? `/itineraries/${it.slug}` : `/destinations/${d.slug}`}
                    className="group relative h-[40vh] min-h-[320px] overflow-hidden film-grain"
                  >
                    <img
                      src={d.heroImage}
                      alt={d.name}
                      className="absolute inset-0 w-full h-full object-cover film-image transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1 block">
                        {d.subtitle}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-heading text-white mb-1">
                        {d.name}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-1 font-serif-alt italic">
                        {d.tagline}
                      </p>
                      {it && (
                        <span className="inline-block mt-2 stamp-tag text-[9px] opacity-70 group-hover:opacity-100">
                          {it.duration} &rarr;
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {regionDestinations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/40 font-serif-alt italic">
                  More Solara destinations coming soon to this region.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Curated experiences — editorial cards */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="stamp-border px-2 py-1">
              <p className="passport-text text-[10px] text-primary/60">
                THE SOLARA STANDARD
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curatedPicks.map((pick, i) => (
              <div key={i} className="group relative h-[35vh] min-h-[280px] overflow-hidden film-grain">
                <img
                  src={pick.image}
                  alt={pick.title}
                  className="absolute inset-0 w-full h-full object-cover film-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-heading text-white mb-1">
                    {pick.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 font-serif-alt italic">
                    {pick.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global reach */}
        <div className="stamp-border p-8 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="passport-text text-xs text-primary/60">GLOBAL REACH</span>
          </div>
          <p className="text-white/60 font-serif-alt italic text-base mb-4">
            Solara Travel operates across 4 continents with dedicated regional specialists
            who design every journey from the ground up. Wherever you want to go,
            we have someone there.
          </p>
          <div className="flex justify-center gap-3">
            <span className="text-xs text-white/50">Europe</span>
            <span className="w-3 h-[1px] bg-white/20" />
            <span className="text-xs text-white/50">Asia</span>
            <span className="w-3 h-[1px] bg-white/20" />
            <span className="text-xs text-white/50">Indian Ocean</span>
            <span className="w-3 h-[1px] bg-white/20" />
            <span className="text-xs text-white/50">Coming: Africa</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/inquire"
            className="bg-primary text-primary-foreground px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-all inline-block"
          >
            Plan Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}