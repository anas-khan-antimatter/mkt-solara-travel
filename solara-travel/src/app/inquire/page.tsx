"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function InquirePage() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelers: "2",
    timeline: "",
    budget: "",
    message: "",
    referral: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizLabel, setQuizLabel] = useState<string | null>(null);

  const destinations = [
    "Amalfi Coast",
    "Santorini",
    "Bali",
    "Tuscany",
    "Maldives",
    "Provence",
    "Not sure — surprise me",
  ];

  // Read quiz results from query params
  useEffect(() => {
    const quizRaw = searchParams.get("quiz");
    const itineraryRaw = searchParams.get("itinerary");

    if (quizRaw) {
      try {
        const quizData = JSON.parse(decodeURIComponent(quizRaw));
        // Try to get a friendly label
        if (quizData.q1) {
          const landscapeLabels: Record<string, string> = {
            coastal: "Coastal Explorer",
            countryside: "Countryside Romantic",
            island: "Island Seeker",
            culture: "Culture Devotee",
          };
          setQuizLabel(landscapeLabels[quizData.q1] || "Custom Journey");
          setFormData((prev) => ({
            ...prev,
            message: `Quiz results: ${JSON.stringify(quizData)}`,
          }));
        }
      } catch {
        // Ignore parse errors
      }
    }

    if (itineraryRaw) {
      const itineraryName = itineraryRaw
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase());
      setFormData((prev) => ({
        ...prev,
        destination: itineraryName,
        message: `Interested in: ${itineraryName}`,
      }));
    }
  }, [searchParams]);

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
          <div className="stamp-border inline-block px-4 py-2 mb-6">
            <p className="passport-text text-xs text-primary/60">CONFIRMED</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading tracking-tight text-gradient mb-4">
            Thank You
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed font-serif-alt italic">
            Your inquiry has been received. A Solara concierge will reach out
            within 24 hours to begin crafting your bespoke journey.
          </p>
          <Link
            href="/"
            className="inline-block stamp-border px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white hover:bg-primary/5 transition-all"
          >
            Return Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="stamp-border px-3 py-1">
            <p className="passport-text text-xs text-primary/60">INQUIRY</p>
          </div>
          {quizLabel && (
            <>
              <span className="w-6 h-[1px] bg-primary/20" />
              <span className="stamp-tag text-[9px]">{quizLabel}</span>
            </>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-heading tracking-tight text-white mb-4">
          Make an Inquiry
        </h1>
        <p className="text-white/50 mt-2 max-w-xl mb-10 font-serif-alt italic">
          Tell us about the journey you imagine, and we will craft an
          itinerary as unique as your vision.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 passport-text">
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
                className="w-full bg-transparent border border-border/40 px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 passport-text">
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
                className="w-full bg-transparent border border-border/40 px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 passport-text">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border border-border/40 px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="travelers" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 passport-text">
                Travelers
              </label>
              <select
                id="travelers"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                className="w-full bg-transparent border border-border/40 px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, "7+"].map((n) => (
                  <option key={n} value={n} className="bg-background text-white">
                    {n} {n === 1 ? "traveler" : "travelers"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="destination" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 passport-text">
              Preferred Destination
            </label>
            <select
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full bg-transparent border border-border/40 px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            >
              <option value="" className="bg-background text-white/50">Select a destination</option>
              {destinations.map((d) => (
                <option key={d} value={d} className="bg-background text-white">
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="timeline" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 passport-text">
                Preferred Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full bg-transparent border border-border/40 px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              >
                <option value="" className="bg-background text-white/50">Select</option>
                <option value="1-3" className="bg-background">1–3 months</option>
                <option value="3-6" className="bg-background">3–6 months</option>
                <option value="6+" className="bg-background">6+ months</option>
                <option value="flexible" className="bg-background">Flexible / No rush</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 passport-text">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-transparent border border-border/40 px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              >
                <option value="" className="bg-background text-white/50">Select</option>
                <option value="5-10k" className="bg-background">$5k–$10k / person</option>
                <option value="10-20k" className="bg-background">$10k–$20k / person</option>
                <option value="20-30k" className="bg-background">$20k–$30k / person</option>
                <option value="30k+" className="bg-background">$30k+ / person</option>
                <option value="flexible" className="bg-background">Flexible</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 passport-text">
              Your Brief
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about the experience you're seeking — special occasions, interests, must-haves..."
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent border border-border/40 px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link
              href="/quiz"
              className="text-xs text-white/40 hover:text-white transition-colors passport-text"
            >
              &larr; Take the quiz
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-all disabled:opacity-40"
            >
              {loading ? "Sending..." : "Send Inquiry"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}