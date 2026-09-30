"use client";

import { useState, useRef, useEffect } from "react";
import { destinationCoordinates, getPointOnGlobe } from "@/data/coordinates";
import Link from "next/link";

// Simple illustrative world map as SVG paths (simplified continents)
const worldPaths = [
  // North America
  { d: "M140,60 L190,55 L210,70 L220,90 L215,110 L200,130 L185,140 L170,135 L155,120 L140,100 L130,85 Z", label: "North America" },
  // South America
  { d: "M175,150 L190,145 L200,160 L205,190 L200,220 L190,240 L180,235 L175,215 L170,190 Z", label: "South America" },
  // Europe
  { d: "M370,55 L400,50 L420,55 L430,65 L425,80 L410,85 L395,80 L380,70 Z", label: "Europe" },
  // Africa
  { d: "M390,90 L420,85 L440,95 L445,120 L440,150 L425,170 L410,175 L395,165 L385,140 L380,115 Z", label: "Africa" },
  // Asia
  { d: "M440,45 L490,40 L530,45 L560,55 L570,70 L565,90 L550,105 L520,110 L490,105 L460,95 L445,80 L440,65 Z", label: "Asia" },
  // Southeast Asia / Indonesia
  { d: "M500,110 L540,105 L560,115 L555,130 L535,135 L510,130 L500,120 Z", label: "Southeast Asia" },
  // Australia
  { d: "M560,170 L600,165 L630,175 L635,195 L620,210 L590,215 L565,205 L555,185 Z", label: "Australia" },
];

export default function ExplorerPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; slug: string } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handlePointClick = (slug: string) => {
    setSelected(slug === selected ? null : slug);
  };

  const handleMouseOver = (e: React.MouseEvent, slug: string) => {
    const point = destinationCoordinates.find((p) => p.slug === slug);
    if (!point) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const { x, y } = getPointOnGlobe(point.lat, point.lng, 800, 400);
    // Convert SVG coords to screen coords roughly
    const scaleX = rect.width / 800;
    const scaleY = rect.height / 400;
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 60,
      slug,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const selectedDest = selected
    ? destinationCoordinates.find((d) => d.slug === selected)
    : null;

  return (
    <section className="min-h-screen py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Interactive Explorer
          </p>
          <h1 className="text-4xl md:text-5xl font-heading tracking-tight text-gradient">
            Discover the World with Solara
          </h1>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Click a destination to explore, or hover the markers to preview
            curated journeys across the globe.
          </p>
        </div>

        {/* Map */}
        <div className="glass rounded-2xl p-4 md:p-8 mb-8 relative overflow-hidden">
          <svg
            ref={svgRef}
            viewBox="0 0 800 400"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ocean background */}
            <rect width="800" height="400" fill="oklch(0.08 0.02 240)" rx="8" />

            {/* Grid lines */}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 100}
                x2="800"
                y2={i * 100}
                stroke="oklch(1 0 0 / 0.04)"
                strokeWidth="0.5"
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line
                key={`v-${i}`}
                x1={i * 100}
                y1="0"
                x2={i * 100}
                y2="400"
                stroke="oklch(1 0 0 / 0.04)"
                strokeWidth="0.5"
              />
            ))}

            {/* Continents */}
            {worldPaths.map((continent, i) => (
              <path
                key={i}
                d={continent.d}
                fill="oklch(0.15 0.02 260)"
                stroke="oklch(0.75 0.15 40 / 0.3)"
                strokeWidth="0.8"
                className="transition-all duration-500"
              />
            ))}

            {/* Destination markers */}
            {destinationCoordinates.map((point) => {
              const { x, y } = getPointOnGlobe(point.lat, point.lng, 800, 400);
              const isSelected = selected === point.slug;
              return (
                <g key={point.slug} className="cursor-pointer">
                  {/* Glow ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 16 : 12}
                    fill="oklch(0.75 0.15 40 / 0.1)"
                    className="transition-all duration-500"
                  >
                    {isSelected && (
                      <animate
                        attributeName="r"
                        values="12;18;12"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                  {/* Marker dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 8 : 5}
                    fill={isSelected ? "oklch(0.75 0.15 40)" : "oklch(0.85 0.1 50)"}
                    stroke="oklch(1 0 0 / 0.5)"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                    onClick={() => handlePointClick(point.slug)}
                    onMouseOver={(e) => handleMouseOver(e, point.slug)}
                    onMouseLeave={handleMouseLeave}
                  />
                  {/* Label */}
                  <text
                    x={x}
                    y={y - 14}
                    textAnchor="middle"
                    fill={isSelected ? "oklch(0.75 0.15 40)" : "oklch(0.6 0.02 260)"}
                    fontSize="9"
                    fontWeight={isSelected ? "600" : "400"}
                    className="select-none pointer-events-none transition-all duration-300"
                    fontFamily="system-ui, sans-serif"
                  >
                    {isSelected ? point.label : ""}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="absolute z-20 pointer-events-none glass px-3 py-2 rounded-lg shadow-lg"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="text-xs text-white whitespace-nowrap">
                {destinationCoordinates.find((d) => d.slug === tooltip.slug)?.label}
              </p>
              <p className="text-[10px] text-muted-foreground whitespace-nowrap">
                Click to explore
              </p>
            </div>
          )}
        </div>

        {/* Selected destination card */}
        {selectedDest && (
          <div className="animate-reveal max-w-2xl mx-auto">
            <div className="glass rounded-2xl overflow-hidden">
              <div className="relative h-48">
                <img
                  src={selectedDest.image}
                  alt={selectedDest.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-heading text-white">
                    {selectedDest.label}
                  </h3>
                  <p className="text-sm text-white/60">{selectedDest.tagline}</p>
                </div>
              </div>
              <div className="p-6 flex justify-center">
                <Link
                  href={`/destinations/${selectedDest.slug}`}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-all"
                >
                  Explore {selectedDest.label}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Grid view as fallback */}
        <div className="mt-16">
          <h2 className="text-2xl font-heading text-center text-gradient mb-8">
            All Destinations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinationCoordinates.map((point) => (
              <Link
                key={point.slug}
                href={`/destinations/${point.slug}`}
                className="glass rounded-xl p-4 text-center hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-all">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-white/80 group-hover:text-white transition-colors">
                  {point.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}