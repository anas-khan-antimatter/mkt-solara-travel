"use client";

import { useState } from "react";
import Link from "next/link";

export default function InquirePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelers: "2",
    timeline: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const destinations = [
    "Amalfi Coast",
    "Santorini",
    "Bali",
    "Tuscany",
    "Maldives",
    "Provence",
    "Not sure — surprise me",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-heading tracking-tight text-gradient mb-4">
            Thank You
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Your inquiry has been received. A Solara concierge will reach out
            within 24 hours to begin crafting your bespoke journey.
          </p>
          <Link
            href="/"
            className="inline-block border border-white/20 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium hover:bg-white/10 transition-all"
          >
            Return Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Begin the Conversation
          </p>
          <h1 className="text-4xl md:text-5xl font-heading tracking-tight text-gradient">
            Make an Inquiry
          </h1>
          <p className="text-white/60 mt-4 max-w-lg mx-auto">
            Tell us about the journey you imagine, and we will craft an
            itinerary as unique as your vision.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border border-border/40 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border border-border/40 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border border-border/40 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="destination" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Preferred Destination
              </label>
              <select
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full bg-transparent border border-border/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              >
                <option value="" className="bg-background">Select a destination</option>
                {destinations.map((d) => (
                  <option key={d} value={d} className="bg-background">
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="travelers" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Travelers
              </label>
              <select
                id="travelers"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                className="w-full bg-transparent border border-border/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n} className="bg-background">
                    {n} {n === 1 ? "Traveler" : "Travelers"}
                  </option>
                ))}
                <option value="6+" className="bg-background">6+ Travelers</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full bg-transparent border border-border/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              >
                <option value="" className="bg-background">Select timeline</option>
                <option value="ASAP" className="bg-background">ASAP</option>
                <option value="1-3 months" className="bg-background">1-3 months</option>
                <option value="3-6 months" className="bg-background">3-6 months</option>
                <option value="6+ months" className="bg-background">6+ months</option>
                <option value="Not sure" className="bg-background">Not sure</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-transparent border border-border/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              >
                <option value="" className="bg-background">Select budget</option>
                <option value="$5k-10k" className="bg-background">$5k - $10k</option>
                <option value="$10k-20k" className="bg-background">$10k - $20k</option>
                <option value="$20k-50k" className="bg-background">$20k - $50k</option>
                <option value="$50k+" className="bg-background">$50k+</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Your Vision
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about the experience you dream of..."
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent border border-border/40 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}