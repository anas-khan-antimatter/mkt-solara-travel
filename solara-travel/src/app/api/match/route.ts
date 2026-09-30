import { NextRequest, NextResponse } from "next/server";
import { scoreQuizAnswers } from "@/data/quiz";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Parse quiz answers from query params (q1=coastal&q2=seamless&...)
  const answers: Record<string, string> = {};
  const qIds = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];
  qIds.forEach((id) => {
    const val = searchParams.get(id);
    if (val) answers[id] = val;
  });

  // Also accept a single 'answers' JSON param
  const answersJson = searchParams.get("answers");
  if (answersJson && Object.keys(answers).length === 0) {
    try {
      const parsed = JSON.parse(answersJson);
      Object.assign(answers, parsed);
    } catch {
      // ignore invalid JSON
    }
  }

  if (Object.keys(answers).length === 0) {
    return NextResponse.json(
      { error: "No quiz answers provided. Pass q1=value&q2=value... or answers=JSON" },
      { status: 400 }
    );
  }

  const scored = scoreQuizAnswers(answers);

  return NextResponse.json({
    answers,
    results: scored.slice(0, 6),
    topMatch: scored[0],
    totalDestinations: scored.length,
  });
}