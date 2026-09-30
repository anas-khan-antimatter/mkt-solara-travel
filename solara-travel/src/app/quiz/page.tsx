"use client";

import { useState } from "react";
import { quizQuestions, quizResults } from "@/data/quiz";
import Link from "next/link";

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[step];

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < totalQuestions - 1) {
      setStep(step + 1);
    } else {
      // Determine result based on answers
      determineResult(newAnswers);
    }
  };

  const determineResult = (ans: Record<string, string>) => {
    const values = Object.values(ans);
    if (values.includes("coastal") || values.includes("seamless")) {
      setResult("amalfi-coast-5-days");
    } else if (values.includes("island") || values.includes("romance")) {
      setResult("santorini-4-days");
    } else if (values.includes("transformative") || values.includes("peace")) {
      setResult("bali-wellness-7-days");
    } else if (values.includes("countryside") || values.includes("cooking")) {
      setResult("tuscan-countryside");
    } else if (values.includes("overwater") || values.includes("peace")) {
      setResult("maldives");
    } else if (values.includes("culture") || values.includes("heritage")) {
      setResult("tuscan-countryside");
    } else {
      setResult("amalfi-coast-5-days");
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  const matchedResult = quizResults.find((r) => r.slug === result);
  const progress = ((step) / totalQuestions) * 100;

  // Result screen
  if (result && matchedResult) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8">
            <img
              src={matchedResult.image}
              alt={matchedResult.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Your Perfect Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-heading tracking-tight text-gradient mb-4">
            {matchedResult.title}
          </h2>
          <p className="text-lg text-white/70 mb-8 leading-relaxed">
            {matchedResult.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/itineraries/${matchedResult.slug}`}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-all"
            >
              View Itinerary
            </Link>
            <Link
              href="/inquire"
              className="border border-white/20 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium hover:bg-white/10 transition-all"
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
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between text-xs text-muted-foreground mb-2 uppercase tracking-wider">
            <span>Your Profile</span>
            <span>
              {step + 1} of {totalQuestions}
            </span>
          </div>
          <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div key={step} className="animate-reveal">
          <h2 className="text-2xl md:text-3xl font-heading tracking-tight text-white mb-8">
            {currentQuestion.question}
          </h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="w-full text-left glass rounded-2xl p-4 md:p-5 hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-white/80 group-hover:text-white transition-colors">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}