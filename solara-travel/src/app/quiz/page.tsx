"use client";

import { useState, useMemo } from "react";
import { quizQuestions, scoreQuizAnswers } from "@/data/quiz";
import { itineraries } from "@/data/itineraries";
import Link from "next/link";

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[step];

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [currentQuestion.id]: selected };
    setAnswers(newAnswers);

    if (step < totalQuestions - 1) {
      setStep(step + 1);
      setSelected(null);
    } else {
      setAnswers(newAnswers);
      setStep(totalQuestions + 1); // Results step
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setSelected(answers[quizQuestions[step - 1].id] || null);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setSelected(null);
    setShowAll(false);
  };

  // Scored results
  const scoredResults = useMemo(() => {
    if (step <= totalQuestions) return [];
    return scoreQuizAnswers(answers);
  }, [answers, step]);

  const topResult = scoredResults[0];

  const progress = Math.min(((step) / totalQuestions) * 100, 100);

  // ── RESULTS SCREEN ──
  if (step > totalQuestions && topResult) {
    const matchedItinerary = itineraries.find((i) => i.slug === topResult.slug);

    return (
      <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Passport badge */}
          <div className="flex items-center gap-3 mb-8">
            <div className="stamp-border px-3 py-1">
              <p className="passport-text text-xs text-primary/60">MATCH RESULTS</p>
            </div>
            <span className="passport-text text-[10px] text-white/30">SCORE: {topResult.matchScore}/16</span>
          </div>

          {/* Top match hero */}
          <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden mb-8 film-grain">
            <img
              src={topResult.image}
              alt={topResult.title}
              className="absolute inset-0 w-full h-full object-cover film-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex items-center gap-2 mb-3">
                <span className="stamp-tag text-[10px]">{topResult.matchLabel || "Perfect Match"}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading text-white mb-2">
                {topResult.title}
              </h2>
              <p className="text-base text-white/60 max-w-2xl font-serif-alt italic">
                {topResult.description}
              </p>
            </div>
          </div>

          {/* Highlights + CTA row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <div className="stamp-border px-3 py-1 inline-block mb-4">
                <p className="passport-text text-xs text-primary/60">HIGHLIGHTS</p>
              </div>
              <ul className="space-y-3">
                {(topResult.highlights || []).map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="w-5 h-5 rounded-full stamp-circle shrink-0 flex items-center justify-center text-[10px] text-primary/70">
                      {i + 1}
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 justify-end">
              {matchedItinerary && (
                <Link
                  href={`/itineraries/${matchedItinerary.slug}`}
                  className="bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-all text-center"
                >
                  View Full Itinerary
                </Link>
              )}
              <Link
                href={`/inquire?quiz=${encodeURIComponent(JSON.stringify(answers))}`}
                className="stamp-border px-8 py-4 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white hover:bg-primary/5 transition-all text-center"
              >
                Inquire About This Journey
              </Link>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="stamp-border p-6 mb-8">
            <p className="passport-text text-xs text-primary/60 mb-4">MATCH SCORES</p>
            <div className="space-y-2">
              {scoredResults.slice(0, 6).map((r, i) => (
                <div key={r.slug} className="flex items-center gap-4">
                  <span className={`text-xs font-mono w-5 text-right ${i === 0 ? "text-primary" : "text-white/40"}`}>
                    {i + 1}
                  </span>
                  <div className="flex-1 h-6 relative bg-white/5">
                    <div
                      className="absolute inset-y-0 left-0 bg-primary/40 transition-all duration-700"
                      style={{
                        width: `${Math.max(8, (r.matchScore / 16) * 100)}%`,
                      }}
                    />
                    <span className="relative z-10 px-2 text-xs text-white/80 flex items-center h-full">
                      {r.title}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white/50">{r.matchScore}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Show all / restart */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="stamp-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
            >
              {showAll ? "Hide Details" : "See All Matches"}
            </button>
            <button
              onClick={handleRestart}
              className="stamp-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
            >
              Retake Quiz
            </button>
          </div>

          {/* All matches grid */}
          {showAll && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {scoredResults.map((r) => {
                const it = itineraries.find((i) => i.slug === r.slug);
                return (
                  <Link
                    key={r.slug}
                    href={it ? `/itineraries/${it.slug}` : "#"}
                    className="stamp-border p-4 hover:bg-primary/5 transition-colors"
                  >
                    <p className="text-xs font-mono text-primary/50 mb-1">
                      Score: {r.matchScore}
                    </p>
                    <p className="text-sm font-heading text-white mb-1">
                      {r.title}
                    </p>
                    <p className="text-xs text-white/50 line-clamp-2">
                      {r.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    );
  }

  // ── QUIZ FLOW ──
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12 flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        {/* Progress bar */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-[1px] bg-white/10 relative">
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="passport-text text-[10px] text-white/30 w-12 text-right">
            {step + 1}/{totalQuestions}
          </span>
        </div>

        {/* Passport stamp badge */}
        <div className="stamp-border px-3 py-1 inline-block mb-6">
          <p className="passport-text text-xs text-primary/60">QUESTION {step + 1}</p>
        </div>

        {/* Animating content */}
        <div key={step} className="animate-reveal">
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-8 leading-tight">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-6 py-4 transition-all duration-300 ${
                  selected === opt.value
                    ? "bg-primary/15 border border-primary/40 text-white"
                    : "border border-border/30 text-white/70 hover:border-white/20 hover:text-white"
                }`}
                style={{ borderRadius: "0" }}
              >
                <div className="flex items-center gap-4">
                  {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
                  <div>
                    <p className="text-sm font-medium">{opt.label}</p>
                  </div>
                  {selected === opt.value && (
                    <span className="ml-auto text-primary">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="stamp-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selected}
              className="bg-primary text-primary-foreground px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {step < totalQuestions - 1 ? "Next" : "Discover My Match"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}