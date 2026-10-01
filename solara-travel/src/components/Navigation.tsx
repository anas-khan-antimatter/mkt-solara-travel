"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-heading tracking-tight text-white hover:text-primary transition-colors"
        >
          Solara
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/itineraries"
            className="text-sm text-white/70 hover:text-white transition-colors uppercase tracking-widest"
          >
            Itineraries
          </Link>
          <Link
            href="/local"
            className="text-sm text-white/70 hover:text-white transition-colors uppercase tracking-widest"
          >
            Local
          </Link>
          <Link
            href="/explorer"
            className="text-sm text-white/70 hover:text-white transition-colors uppercase tracking-widest"
          >
            Explorer
          </Link>
          <Link
            href="/quiz"
            className="text-sm text-white/70 hover:text-white transition-colors uppercase tracking-widest"
          >
            Trip Builder
          </Link>
          <Link
            href="/inquire"
            className="text-sm bg-primary text-primary-foreground px-5 py-2 hover:opacity-90 transition-all uppercase tracking-wider font-medium"
            style={{ borderRadius: "0" }}
          >
            Inquire
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white flex flex-col gap-1"
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-[1px] bg-white" />
          <span className="block w-6 h-[1px] bg-white" />
          <span className="block w-6 h-[1px] bg-white" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass mx-4 mt-2 rounded-2xl p-6 flex flex-col gap-4">
          <Link
            href="/explorer"
            className="text-white text-lg"
            onClick={() => setOpen(false)}
          >
            Explorer
          </Link>
          <Link
            href="/"
            className="text-white text-lg"
            onClick={() => setOpen(false)}
          >
            Destinations
          </Link>
          <Link
            href="/quiz"
            className="text-white text-lg"
            onClick={() => setOpen(false)}
          >
            Trip Builder
          </Link>
          <Link
            href="/inquire"
            className="text-primary text-lg font-medium"
            onClick={() => setOpen(false)}
          >
            Inquire
          </Link>
        </div>
      )}
    </header>
  );
}