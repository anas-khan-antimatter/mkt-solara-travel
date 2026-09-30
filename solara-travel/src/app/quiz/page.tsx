"use client";

import { useState, useMemo } from "react";
import { quizQuestions, quizResults } from "@/data/quiz";
import { itineraries } from "@/data/itineraries";
import Link from "next/link";

interface ScoreMap {
  [slug: string]: number;
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [showAllResults, setShowAllResults] = useState(false);

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[step];

  // Scoring weights for each destination based on answer values
  const scoringMatrix: Record<string, Record<string, string[]>> = {
    "amalfi-coast-5-days": {
      coastal: ["q1"],
      seamless: ["q2"],
      michelin: ["q3"],
      cliff: ["q4"],
      romance: ["q5"],
    },
    "santorini-4-days": {
      coastal: ["q1"],
      island: ["q1"],
      immersive: ["q2"],
      water: ["q3"],
      cliff: ["q4"],
      romance: ["q5"],
    },
    "bali-wellness-7-days": {
      island: ["q1"],
      transformative: ["q2"],
      local: ["q3"],
      cooking: ["q3"],
      villa: ["q4"],
      peace: ["q5"],
    },
    "tuscan-countryside": {
      countryside: ["q1"],
      immersive: ["q2"],
      cooking: ["q3"],
      local: ["q3"],
      heritage: ["q4"],
      inspiration: ["q5"],
    },
    maldives: {
      coastal: ["q1"],
      island: ["q1"],
      seamless: ["q2"],
      water: ["q3"],
      overwater: ["q4"],
      peace: ["q5"],
    },
    // Provence uses the Amalfi itinerary as a base similarity fallback
  };

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < totalQuestions - 1) {
      setStep(step + 1);
    } else {
      determineResult(newAnswers);
    }
  };

  const determineResult = (ans: Record<string, string>) => {
    const scores: ScoreMap = {};

    // Initialize all itinerary slugs
    const allSlugs = [
      "amalfi-coast-5-days",
      "santorini-4-days",
      "bali-wellness-7-days",
      "tuscan-countryside",
      "maldives",
      // also check if any itinerary slug in the data has a provence mapping
    ];

    // Find all unique itinerary slugs from results
    const uniqueSlugs = [...new Set(quizResults.map((r) => r.slug))];

    uniqueSlugs.forEach((slug) => {
      scores[slug] = 0;
      const matrix = scoringMatrix[slug];
      if (!matrix) return;

      Object.entries(matrix).forEach(([answerValue, questions]) => {
        questions.forEach((qId) => {
          if (ans[qId] === answerValue) {
            scores[slug] += 2;
          }
        });
      });
    });

    // Bonus proximity points
    const values = Object.values(ans);
    if (values.includes("seamless") || values.includes("romance")) {
      scores["amalfi-coast-5-days"] += 1;
      scores["santorini-4-days"] += 1;
    }
    if (values.includes("peace") || values.includes("transformative")) {
      scores["bali-wellness-7-days"] += 1;
    }
    if (values.includes("cooking") || values.includes("heritage")) {
      scores["tuscan-countryside"] += 1;
    }
    if (values.includes("overwater") || values.includes("celebration")) {
      scores["maldives"] += 1;
    }

    // Find the winner
    let bestSlug = uniqueSlugs[0];
    let bestScore = -1;
    uniqueSlugs.forEach((slug) => {
      if (scores[slug] > bestScore) {
        bestScore = scores[slug];
        bestSlug = slug;
      }
    });

    setResult(bestSlug);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setShowAllResults(false);
  };

  const matchedResult = useMemo(
    () => quizResults.find((r) => r.slug === result),
    [result]
  );

  const progress = ((step) / totalQuestions) * 100;

  // Result screen
  if (result && matchedResult) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-3xl mx-auto w-full">
          {/* Hero image card */}
          <div className="relative w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden mb-8">
            <img
              src={matchedResult.image}
              alt={matchedResult.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">
                Your Perfect Journey
              </p>
              <h2 className="text-3xl md:text-4xl font-heading tracking-tight text-white">
                {matchedResult.title}
              </h2>
            </div>
          </div>

          <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-2xl">
            {matchedResult.description}
          </p>

          {/* Score breakdown */}
          {(() => {
            const scoreItems = quizResults
              .map((r) => ({
                title: r.title,
                slug: r.slug,
                match: r.slug === result ? "Recommended" : "Also a fit",
              }))
              .slice(0, 3);
            return (
              <div className="glass rounded-2xl p-6 mb-8">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
                  Match Results
                </h4>
                <div className="space-y-3">
                  {scoreItems.map((item) => (
                    <div
                      key={item.slug}
                      className={`flex items-center justify-between p-3 rounded-xl ${
                        item.slug === result
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-white/5"
                      }`}
                    >
                      <span
                        className={`text-sm ${
                          item.slug === result
                            ? "text-white font-medium"
                            : "text-white/60"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          item.slug === result
                            ? "bg-primary/20 text-primary"
                            : "bg-white/10 text-white/50"
                        }`}
                      >
                        {item.match === "Recommended"
                          ? "★ Best Match"
                          : "Great Fit"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/itineraries/${matchedResult.slug}`}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-all text-center"
            >
              View Full Itinerary
            </Link>
            <Link
              href="/inquire"
              className="border border-white/20 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium hover:bg-white/10 transition-all text-center"
            >
              Inquire Now
            </Link>
            <button
              onClick={handleRestart}
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto w-full">
        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex justify-between text-xs text-muted-foreground mb-2 uppercase tracking-wider">
            <span>Discover Your Journey</span>
            <span>
              {step + 1} of {totalQuestions}
            </span>
          </div>
          <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div key={step} className="animate-reveal">
          <h2 className="text-2xl md:text-3xl font-heading tracking-tight text-white mb-8">
            {currentQuestion.question}
          </h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="w-full text-left glass rounded-2xl p-4 md:p-5 hover:bg-white/10 hover:border-primary/30 transition-all group cursor-pointer border border-transparent"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{option.emoji}</span>
                  <div>
                    <span className="text-white/80 group-hover:text-white transition-colors text-base">
                      {option.label}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}