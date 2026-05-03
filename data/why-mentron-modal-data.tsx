"use client"

import React from "react"
import type { BentoModalContent } from "@/components/ui/bento-modal"

// ---------------------------------------------------------------------------
// Primary mockup components
// ---------------------------------------------------------------------------

export function ChatMockup() {
  return (
    <div className="flex flex-col gap-3">
      {/* User message bubble */}
      <div className="self-end bg-primary/10 text-primary rounded-2xl rounded-br-md px-4 py-2.5 text-sm max-w-[85%]">
        Why is student #14 struggling with integration?
      </div>

      {/* AI recall badge */}
      <div className="self-start">
        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 rounded-full px-3 py-1 text-xs font-medium">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z"
              fill="#D97706"
            />
          </svg>
          Recalled: Weak on recursion
        </span>
      </div>

      {/* AI response bubble */}
      <div className="self-start bg-white border border-slate-100 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-slate-600 max-w-[85%] leading-relaxed">
        Student #14 has gaps in foundational concepts. Recommend reviewing
        limits before continuing with integration techniques.
      </div>

      {/* Timestamp */}
      <span className="text-xs text-slate-400 self-start">2 min ago</span>
    </div>
  )
}

export function InfoOverloadMockup() {
  return (
    <div className="relative w-full h-36">
      {/* Stacked document rectangles */}
      <div className="absolute top-4 left-6 w-[75%] h-24 bg-slate-200/60 rounded-md">
        <div className="p-3 flex flex-col gap-2">
          <div className="h-2 w-3/4 bg-slate-300 rounded" />
          <div className="h-2 w-1/2 bg-slate-300 rounded" />
          <div className="h-2 w-2/3 bg-slate-300 rounded" />
        </div>
      </div>
      <div className="absolute top-2 left-4 w-[75%] h-24 bg-slate-200/40 rounded-md">
        <div className="p-3 flex flex-col gap-2">
          <div className="h-2 w-3/4 bg-slate-300 rounded" />
          <div className="h-2 w-1/2 bg-slate-300 rounded" />
          <div className="h-2 w-2/3 bg-slate-300 rounded" />
        </div>
      </div>
      <div className="absolute top-0 left-2 w-[75%] h-24 bg-slate-200/20 rounded-md">
        <div className="p-3 flex flex-col gap-2">
          <div className="h-2 w-3/4 bg-slate-300 rounded" />
          <div className="h-2 w-1/2 bg-slate-300 rounded" />
          <div className="h-2 w-2/3 bg-slate-300 rounded" />
        </div>
      </div>

      {/* Unread badge */}
      <span className="absolute top-1 right-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
        47 unread
      </span>
    </div>
  )
}

export function OneSizeMockup() {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <div className="w-8 h-8 rounded-full bg-slate-200" />
      <div className="w-8 h-8 rounded-full bg-slate-200" />
      <div className="w-8 h-8 rounded-full bg-slate-200 ring-2 ring-primary/20" />
      <div className="w-8 h-8 rounded-full bg-slate-200" />
    </div>
  )
}

export function QuizMockup() {
  return (
    <div className="flex flex-col gap-3 relative">
      {/* Timer badge */}
      <span className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-xs font-mono px-2 py-1 rounded-md">
        02:34
      </span>

      {/* Question */}
      <p className="text-sm font-medium text-slate-700 pr-16">
        What is the derivative of sin(x)?
      </p>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "A", text: "-sin(x)" },
          { label: "B", text: "cos(x)", highlighted: true },
          { label: "C", text: "tan(x)" },
          { label: "D", text: "sec(x)" },
        ].map((opt) => (
          <div
            key={opt.label}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border ${
              opt.highlighted
                ? "bg-primary/10 border-primary text-primary"
                : "bg-white border-slate-100 text-slate-500"
            }`}
          >
            <span className="font-semibold">{opt.label}.</span>
            {opt.text}
          </div>
        ))}
      </div>

      {/* Auto-generated badge */}
      <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-medium self-start">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M5 0L6 3.5L9.5 3.5L6.75 5.75L7.75 9L5 7L2.25 9L3.25 5.75L0.5 3.5L4 3.5L5 0Z"
            fill="#94A3B8"
          />
        </svg>
        Auto-generated
      </span>
    </div>
  )
}

export function AdaptiveMemoryMockup() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="200" height="80" viewBox="0 0 200 80" fill="none">
        {/* Shaded area under curve */}
        <path
          d="M10 10 Q40 12 60 30 T110 60 T190 75 L190 75 L10 75 Z"
          fill="#0077FF"
          fillOpacity="0.08"
        />
        {/* Forgetting curve path */}
        <path
          d="M10 10 Q40 12 60 30 T110 60 T190 75"
          stroke="#0077FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Optimal review point */}
        <circle cx="90" cy="46" r="5" fill="#0077FF" />
        <circle cx="90" cy="46" r="5" fill="#0077FF" fillOpacity="0.3">
          <animate
            attributeName="r"
            values="5;9;5"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            values="0.3;0;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Review now label */}
        <text
          x="100"
          y="43"
          fontSize="8"
          fill="#0077FF"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          Review now
        </text>
        {/* Axis labels */}
        <text
          x="170"
          y="78"
          fontSize="7"
          fill="#94A3B8"
          fontFamily="system-ui, sans-serif"
        >
          Days
        </text>
        <text
          x="2"
          y="8"
          fontSize="7"
          fill="#94A3B8"
          fontFamily="system-ui, sans-serif"
        >
          Recall %
        </text>
      </svg>
    </div>
  )
}

export function AutoGradingMockup() {
  return (
    <div className="flex flex-col gap-3">
      {/* Score header */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-slate-900">92/100</span>
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 7L6 10L11 4"
              stroke="#16A34A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {/* Rubric rows */}
      <div className="flex flex-col gap-2">
        {[
          { label: "Content", score: 45, total: 50 },
          { label: "Grammar", score: 22, total: 25 },
          { label: "Citation", score: 25, total: 25 },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="text-xs text-slate-500 w-14 shrink-0">
              {row.label}
            </span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary/70 rounded-full"
                style={{
                  width: `${(row.score / row.total) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs text-slate-400 tabular-nums">
              {row.score}/{row.total}
            </span>
          </div>
        ))}
      </div>

      {/* AI Feedback badge */}
      <span className="inline-flex items-center gap-1 text-xs text-primary font-medium self-start bg-primary/5 px-2 py-1 rounded-md">
        ✨ AI Feedback
      </span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Secondary mockup (stat panel) components
// ---------------------------------------------------------------------------

export function AssistantStats() {
  return (
    <div className="flex flex-col gap-3">
      {[
        { label: "Students Helped Today", value: "47" },
        { label: "Avg Response Time", value: "1.2s" },
        { label: "Accuracy", value: "96%" },
      ].map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <span className="text-xs text-slate-500">{stat.label}</span>
          <span className="text-lg font-semibold text-slate-900">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function InfoOverloadStats() {
  return (
    <div className="flex flex-col gap-3">
      {[
        { label: "Sources Indexed", value: "1,200+" },
        { label: "Content Filtered", value: "73%" },
        { label: "Study Time Saved", value: "2.3 hrs" },
      ].map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <span className="text-xs text-slate-500">{stat.label}</span>
          <span className="text-lg font-semibold text-slate-900">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function OneSizeStats() {
  return (
    <div className="flex flex-col gap-3">
      {[
        { label: "Learning Paths", value: "312" },
        { label: "Difficulty Adjustments", value: "1.4K" },
        { label: "Completion Rate", value: "89%" },
      ].map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <span className="text-xs text-slate-500">{stat.label}</span>
          <span className="text-lg font-semibold text-slate-900">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function QuizStats() {
  return (
    <div className="flex flex-col gap-3">
      {[
        { label: "Quizzes Generated", value: "847" },
        { label: "Avg Questions", value: "12" },
        { label: "Standards Aligned", value: "100%" },
      ].map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <span className="text-xs text-slate-500">{stat.label}</span>
          <span className="text-lg font-semibold text-slate-900">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function AdaptiveMemoryStats() {
  return (
    <div className="flex flex-col gap-3">
      {[
        { label: "Items Tracked", value: "14,200" },
        { label: "Forgetting Predicted", value: "340" },
        { label: "Review Accuracy", value: "94%" },
      ].map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <span className="text-xs text-slate-500">{stat.label}</span>
          <span className="text-lg font-semibold text-slate-900">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function AutoGradingStats() {
  return (
    <div className="flex flex-col gap-3">
      {[
        { label: "Assignments Graded", value: "2,100" },
        { label: "Avg Feedback Time", value: "3.2s" },
        { label: "Teacher Time Saved", value: "11 hrs" },
      ].map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <span className="text-xs text-slate-500">{stat.label}</span>
          <span className="text-lg font-semibold text-slate-900">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Orb colors for each modal
// ---------------------------------------------------------------------------

export const ORB_COLORS: Record<string, { orb1: string; orb2: string }> = {
  "ai-assistant": { orb1: "#0077FF", orb2: "#665efd" },
  "info-overload": { orb1: "#EF4444", orb2: "#0077FF" },
  "one-size": { orb1: "#F59E0B", orb2: "#0077FF" },
  "quiz-gen": { orb1: "#0077FF", orb2: "#06B6D4" },
  "adaptive-memory": { orb1: "#665efd", orb2: "#0077FF" },
  "auto-grading": { orb1: "#0077FF", orb2: "#665efd" },
}

// ---------------------------------------------------------------------------
// Shared CTA objects
// ---------------------------------------------------------------------------

const ctaPrimary = { label: "Get Early Access", href: "/institutional-demo" }
const ctaSecondary = {
  label: "See all features",
  href: "#platform-features",
}

// ---------------------------------------------------------------------------
// Related feature graphic helpers (simple colored shapes)
// ---------------------------------------------------------------------------

function SmartNotesGraphic() {
  return (
    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
      <div className="w-5 h-6 rounded-sm bg-amber-400/60 border border-amber-400" />
    </div>
  )
}

function QuizGeneratorGraphic() {
  return (
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
      <div className="w-4 h-4 rounded border-2 border-primary/60" />
    </div>
  )
}

function AdaptiveMemoryGraphic() {
  return (
    <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        <path
          d="M2 2 Q6 3 8 8 T16 12"
          stroke="#665efd"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

function KnowledgeGraphsGraphic() {
  return (
    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <div className="w-4 h-0.5 bg-emerald-300" />
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
      </div>
    </div>
  )
}

function LearningPathGraphic() {
  return (
    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        <path
          d="M2 12 L7 5 L12 8 L18 2"
          stroke="#0077FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function MasteryTrackingGraphic() {
  return (
    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
      <div className="flex flex-col items-end gap-1">
        <div className="w-4 h-1 rounded-full bg-green-400" />
        <div className="w-3 h-1 rounded-full bg-green-300" />
        <div className="w-5 h-1 rounded-full bg-green-400" />
      </div>
    </div>
  )
}

function AiFlashcardsGraphic() {
  return (
    <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center">
      <div className="w-6 h-4 rounded-sm bg-sky-300/60 border border-sky-300" />
    </div>
  )
}

function AutoGradingGraphic() {
  return (
    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="#16A34A" strokeWidth="1.5" />
        <path
          d="M5.5 8L7 9.5L10.5 6"
          stroke="#16A34A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function AiTeachingAssistantGraphic() {
  return (
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="7" r="3" stroke="#0077FF" strokeWidth="1.5" fill="none" />
        <path
          d="M3 16C3 13 5.5 11 9 11S15 13 15 16"
          stroke="#0077FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Modal data
// ---------------------------------------------------------------------------

export const modalData: Record<string, BentoModalContent> = {
  "ai-assistant": {
    title: "AI Teaching Assistant",
    description:
      "An assistant that remembers every student's progress across sessions and intervenes before they fall behind.",
    benefits: [
      "Remembers each student's learning history and progress across sessions",
      "Identifies struggling students automatically before they fall behind",
      "Provides personalized intervention suggestions for educators",
      "Reduces office hours by answering routine questions instantly",
    ],
    ctaPrimary,
    ctaSecondary,
    mockup: <ChatMockup />,
    secondaryMockup: <AssistantStats />,
    relatedFeatures: [
      {
        title: "Smart Notes",
        description: "AI-powered notes that organize and summarize content automatically.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <SmartNotesGraphic />,
      },
      {
        title: "Quiz Generator",
        description: "Create assessments from any content in seconds.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <QuizGeneratorGraphic />,
      },
      {
        title: "Adaptive Memory",
        description: "Tracks retention and schedules reviews at the optimal moment.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <AdaptiveMemoryGraphic />,
      },
    ],
  },

  "info-overload": {
    title: "Information Overload",
    description:
      "Students drowning in content? Mentron filters, prioritizes, and surfaces only what matters for each learner.",
    benefits: [
      "Filters and prioritizes content so students see only what matters",
      "Indexes thousands of sources into a searchable knowledge base",
      "Reduces study time by surfacing the most relevant material",
      "Eliminates the overwhelm of endless reading lists",
    ],
    ctaPrimary,
    ctaSecondary,
    mockup: <InfoOverloadMockup />,
    secondaryMockup: <InfoOverloadStats />,
    relatedFeatures: [
      {
        title: "Knowledge Graphs",
        description: "Visual maps connecting concepts across your curriculum.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <KnowledgeGraphsGraphic />,
      },
      {
        title: "Learning Path",
        description: "Personalized sequences that adapt to each student's pace.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <LearningPathGraphic />,
      },
      {
        title: "Mastery Tracking",
        description: "Monitor competency levels across every topic in real time.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <MasteryTrackingGraphic />,
      },
    ],
  },

  "one-size": {
    title: "Personalized, Not Generic",
    description:
      "Generic courses leave most students behind. Mentron adapts content, pace, and difficulty for every individual learner.",
    benefits: [
      "Adapts content difficulty and pace for each individual learner",
      "Creates unique learning paths based on strengths and gaps",
      "Adjusts in real time as students progress or struggle",
      "Ensures no student is left bored or overwhelmed",
    ],
    ctaPrimary,
    ctaSecondary,
    mockup: <OneSizeMockup />,
    secondaryMockup: <OneSizeStats />,
    relatedFeatures: [
      {
        title: "AI Flashcards",
        description: "Smart flashcards that adapt to what each student needs to review.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <AiFlashcardsGraphic />,
      },
      {
        title: "Adaptive Memory",
        description: "Tracks retention and schedules reviews at the optimal moment.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <AdaptiveMemoryGraphic />,
      },
      {
        title: "Learning Path",
        description: "Personalized sequences that adapt to each student's pace.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <LearningPathGraphic />,
      },
    ],
  },

  "quiz-gen": {
    title: "Quiz Generator",
    description:
      "Generate standards-aligned quizzes and assessments from any content in seconds, not hours.",
    benefits: [
      "Generates quizzes from any content in seconds, not hours",
      "Aligns questions to curriculum standards automatically",
      "Supports multiple question types with instant answer keys",
      "Saves teachers hours of manual assessment creation",
    ],
    ctaPrimary,
    ctaSecondary,
    mockup: <QuizMockup />,
    secondaryMockup: <QuizStats />,
    relatedFeatures: [
      {
        title: "Auto Grading",
        description: "Instant AI feedback on assignments with detailed rubrics.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <AutoGradingGraphic />,
      },
      {
        title: "Smart Notes",
        description: "AI-powered notes that organize and summarize content automatically.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <SmartNotesGraphic />,
      },
      {
        title: "Mastery Tracking",
        description: "Monitor competency levels across every topic in real time.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <MasteryTrackingGraphic />,
      },
    ],
  },

  "adaptive-memory": {
    title: "Adaptive Memory Engine",
    description:
      "Tracks what every student knows, predicts what they'll forget, and schedules reviews at the perfect moment.",
    benefits: [
      "Tracks what each student knows across every topic and session",
      "Predicts forgetting curves to schedule reviews at the right time",
      "Boosts long-term retention with scientifically-backed spacing",
      "Adapts review frequency based on individual mastery levels",
    ],
    ctaPrimary,
    ctaSecondary,
    mockup: <AdaptiveMemoryMockup />,
    secondaryMockup: <AdaptiveMemoryStats />,
    relatedFeatures: [
      {
        title: "AI Flashcards",
        description: "Smart flashcards that adapt to what each student needs to review.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <AiFlashcardsGraphic />,
      },
      {
        title: "Knowledge Graphs",
        description: "Visual maps connecting concepts across your curriculum.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <KnowledgeGraphsGraphic />,
      },
      {
        title: "Quiz Generator",
        description: "Create assessments from any content in seconds.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <QuizGeneratorGraphic />,
      },
    ],
  },

  "auto-grading": {
    title: "Auto Grading",
    description:
      "Instant AI-powered feedback on assignments with detailed rubrics, so teachers can focus on teaching.",
    benefits: [
      "Grades assignments instantly with detailed AI-generated feedback",
      "Provides rubric-based scoring across multiple dimensions",
      "Frees up teacher time for high-impact instructional work",
      "Gives students immediate, actionable improvement suggestions",
    ],
    ctaPrimary,
    ctaSecondary,
    mockup: <AutoGradingMockup />,
    secondaryMockup: <AutoGradingStats />,
    relatedFeatures: [
      {
        title: "Quiz Generator",
        description: "Create assessments from any content in seconds.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <QuizGeneratorGraphic />,
      },
      {
        title: "AI Teaching Assistant",
        description: "An assistant that remembers every student and intervenes proactively.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <AiTeachingAssistantGraphic />,
      },
      {
        title: "Smart Notes",
        description: "AI-powered notes that organize and summarize content automatically.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: <SmartNotesGraphic />,
      },
    ],
  },
}
