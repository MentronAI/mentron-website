"use client"

import React from "react"
import type { BentoModalContent } from "@/components/ui/bento-modal"

/* ---------------------------------------------------------------------------
 * Mockup Components
 * ---------------------------------------------------------------------------*/

export function FlashcardMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center py-4">
      {/* Back card */}
      <div className="absolute z-0 top-[calc(50%+16px)] left-[calc(50%+16px)] -translate-x-1/2 -translate-y-1/2 w-56 h-36 rounded-xl bg-slate-100 opacity-30" />
      {/* Middle card */}
      <div className="absolute z-[5] top-[calc(50%+8px)] left-[calc(50%+8px)] -translate-x-1/2 -translate-y-1/2 w-56 h-36 rounded-xl bg-slate-50 opacity-60 shadow-sm p-4">
        <p className="text-slate-400 text-sm">A: ...</p>
      </div>
      {/* Front card */}
      <div className="relative z-10 w-56 h-36 rounded-xl bg-white shadow-md p-5 flex flex-col justify-between">
        <p className="text-slate-800 font-medium text-sm leading-snug">
          Q: What is the chain rule?
        </p>
        <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full self-start">
          Calculus
        </span>
      </div>
    </div>
  )
}

export function LearningPathSVG() {
  const completedNodes = [
    { x: 50, y: 90, label: "Limits", num: 1 },
    { x: 140, y: 90, label: "Derivatives", num: 2 },
    { x: 230, y: 90, label: "Integrals", num: 3 },
  ]
  const upcomingNodes = [
    { x: 320, y: 90, label: "Series", num: 4, active: true },
    { x: 400, y: 90, label: "ODEs", num: 5 },
  ]

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
      <svg viewBox="0 0 450 180" className="w-full h-auto" fill="none">
        {/* Completed connecting lines */}
        <line x1="70" y1="90" x2="120" y2="90" stroke="#0077FF" strokeWidth="2" />
        <line x1="160" y1="90" x2="210" y2="90" stroke="#0077FF" strokeWidth="2" />
        <line x1="250" y1="90" x2="300" y2="90" stroke="#0077FF" strokeWidth="2" />

        {/* Dashed upcoming lines */}
        <line
          x1="340"
          y1="90"
          x2="380"
          y2="90"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* Completed nodes */}
        {completedNodes.map((node) => (
          <React.Fragment key={node.num}>
            <circle cx={node.x} cy={node.y} r="20" fill="#0077FF" />
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="13"
              fontWeight="600"
            >
              {node.num}
            </text>
            <text
              x={node.x}
              y={node.y + 36}
              textAnchor="middle"
              fill="#475569"
              fontSize="10"
            >
              {node.label}
            </text>
          </React.Fragment>
        ))}

        {/* Upcoming nodes */}
        {upcomingNodes.map((node) => (
          <React.Fragment key={node.num}>
            {/* Active pulse ring */}
            {node.active && (
              <>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="26"
                  stroke="#0077FF"
                  strokeWidth="2"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    values="22;30;22"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0.1;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill="white"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#94a3b8"
              fontSize="13"
              fontWeight="600"
            >
              {node.num}
            </text>
            <text
              x={node.x}
              y={node.y + 36}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="10"
            >
              {node.label}
            </text>
          </React.Fragment>
        ))}
      </svg>

      {/* Progress badge */}
      <span className="bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full self-end mr-2">
        60% complete
      </span>
    </div>
  )
}

export function SmartNotesMockup() {
  return (
    <div className="w-full h-full flex flex-col rounded-lg overflow-hidden">
      {/* Header bar */}
      <div className="bg-slate-50 px-3 py-2 text-xs text-slate-400 rounded-t-lg border-b border-slate-100">
        Lecture 14 — Integration
      </div>

      {/* 2-column layout */}
      <div className="flex flex-1 gap-3 p-3">
        {/* Left: Key Terms */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
            Key Terms
          </p>
          <ul className="space-y-1">
            <li className="text-[11px] text-slate-700 flex items-start gap-1">
              <span className="text-primary mt-0.5">•</span> Definite integral
            </li>
            <li className="text-[11px] text-slate-700 flex items-start gap-1">
              <span className="text-primary mt-0.5">•</span> Antiderivative
            </li>
            <li className="text-[11px] text-slate-700 flex items-start gap-1">
              <span className="text-primary mt-0.5">•</span> Fundamental theorem
            </li>
          </ul>
        </div>

        {/* Right: Summary */}
        <div className="flex-[2] min-w-0">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
            Summary
          </p>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Integration reverses differentiation. The fundamental theorem connects
            definite integrals to antiderivatives.
          </p>
          <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
            Riemann sums approximate area under curves as a foundation for
            integral calculus.
          </p>
        </div>
      </div>

      {/* AI Summary badge */}
      <div className="px-3 pb-3">
        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-medium px-2 py-0.5 rounded-full">
          ✨ AI Summary
        </span>
      </div>
    </div>
  )
}

export function KnowledgeGraphMockup() {
  const nodes = [
    { x: 40, y: 30, w: 50, h: 22, label: "Limits", active: true },
    { x: 120, y: 50, w: 60, h: 22, label: "Derivatives", active: true },
    { x: 40, y: 70, w: 55, h: 22, label: "Integrals", active: false },
    { x: 130, y: 10, w: 50, h: 22, label: "Series", active: false },
    { x: 140, y: 80, w: 50, h: 22, label: "ODEs", active: false },
  ]

  const connections = [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [1, 4],
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <svg viewBox="0 0 200 100" className="w-full h-auto">
        {/* Connection lines */}
        {connections.map(([from, to], i) => (
          <line
            key={i}
            x1={nodes[from].x + nodes[from].w / 2}
            y1={nodes[from].y + nodes[from].h / 2}
            x2={nodes[to].x + nodes[to].w / 2}
            y2={nodes[to].y + nodes[to].h / 2}
            stroke="#cbd5e1"
            strokeWidth="1"
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <React.Fragment key={i}>
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx="6"
              fill={node.active ? "rgba(0,119,255,0.15)" : "#e2e8f0"}
              stroke={node.active ? "#0077FF" : "#94a3b8"}
              strokeWidth="1"
            />
            <text
              x={node.x + node.w / 2}
              y={node.y + node.h / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={node.active ? "#0077FF" : "#64748b"}
              fontSize="8"
              fontWeight="500"
            >
              {node.label}
            </text>
          </React.Fragment>
        ))}
      </svg>

      {/* Legend */}
      <div className="text-[8px] text-slate-400 flex items-center gap-3">
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-primary" /> Active
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full border border-slate-400 bg-slate-200" />{" "}
          Pending
        </span>
      </div>
    </div>
  )
}

export function MasteryMockup() {
  const bars = [
    { label: "Mastered", pct: 72 },
    { label: "Developing", pct: 48 },
    { label: "Weak", pct: 16 },
  ]

  return (
    <div className="relative w-full h-full flex flex-col justify-center gap-3 p-2">
      {/* Overall score badge */}
      <div className="absolute top-0 right-0 w-11 h-11 rounded-full border-2 border-primary flex items-center justify-center">
        <span className="text-sm font-bold text-primary">78%</span>
      </div>

      {bars.map((bar) => (
        <div key={bar.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-600">{bar.label}</span>
            <span className="text-xs font-medium text-slate-900">{bar.pct}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${bar.pct}%`,
                background: "linear-gradient(to right, #0077FF, #3395FF)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Secondary Mockup (Stats Panel) Components
 * ---------------------------------------------------------------------------*/

export function FlashcardStats() {
  return (
    <div className="flex flex-col gap-3">
      <StatRow label="Cards Generated" value="5,600" />
      <StatRow label="Retention Rate" value="87%" />
      <StatRow label="Daily Reviews" value="420" />
    </div>
  )
}

export function LearningPathStats() {
  return (
    <div className="flex flex-col gap-3">
      <StatRow label="Active Paths" value="312" />
      <StatRow label="Avg Completion" value="78%" />
      <StatRow label="Prerequisites Caught" value="89" />
    </div>
  )
}

export function SmartNotesStats() {
  return (
    <div className="flex flex-col gap-3">
      <StatRow label="Notes Created" value="1,400" />
      <StatRow label="Auto-Summaries" value="100%" />
      <StatRow label="Linked Flashcards" value="3,200" />
    </div>
  )
}

export function KnowledgeGraphStats() {
  return (
    <div className="flex flex-col gap-3">
      <StatRow label="Concepts Mapped" value="890" />
      <StatRow label="Connections Found" value="2,400" />
      <StatRow label="Gap Alerts" value="67" />
    </div>
  )
}

export function MasteryStats() {
  return (
    <div className="flex flex-col gap-3">
      <StatRow label="Topics Tracked" value="156" />
      <StatRow label="Avg Mastery" value="72%" />
      <StatRow label="Weak Areas Flagged" value="23" />
    </div>
  )
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-lg font-semibold text-slate-900">{value}</p>
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Orb Colors
 * ---------------------------------------------------------------------------*/

export const ORB_COLORS: Record<
  string,
  { orb1: string; orb2: string }
> = {
  flashcards: { orb1: "#0077FF", orb2: "#665efd" },
  "learning-path": { orb1: "#0077FF", orb2: "#06B6D4" },
  notes: { orb1: "#665efd", orb2: "#0077FF" },
  "knowledge-graph": { orb1: "#06B6D4", orb2: "#0077FF" },
  mastery: { orb1: "#0077FF", orb2: "#665efd" },
}

/* ---------------------------------------------------------------------------
 * Related Feature Helpers
 * ---------------------------------------------------------------------------*/

function coloredPlaceholder(color: string) {
  return (
    <div
      className="w-8 h-8 rounded-lg"
      style={{ backgroundColor: color }}
    />
  )
}

/* ---------------------------------------------------------------------------
 * Modal Data
 * ---------------------------------------------------------------------------*/

export const modalData: Record<string, BentoModalContent> = {
  flashcards: {
    title: "AI Flashcards",
    description:
      "AI generates flashcards from any document or lecture with FSRS-powered spaced repetition.",
    benefits: [
      "Auto-generate flashcards from lecture PDFs, videos, and notes",
      "FSRS algorithm optimizes review intervals for long-term retention",
      "Collaborative decks let students share and improve together",
      "Track mastery per-card with granular confidence scoring",
    ],
    ctaPrimary: { label: "Get Early Access", href: "/institutional-demo" },
    ctaSecondary: { label: "See integrations", href: "#integrations" },
    mockup: <FlashcardMockup />,
    secondaryMockup: <FlashcardStats />,
    relatedFeatures: [
      {
        title: "Smart Notes",
        description:
          "Cornell-style notes with AI-enhanced structure and auto-summaries.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#665efd"),
      },
      {
        title: "Quiz Generator",
        description:
          "AI creates quizzes from any material with multiple question types.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#0077FF"),
      },
      {
        title: "Adaptive Memory",
        description:
          "Spaced repetition engine that adapts to each student's forgetting curve.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#06B6D4"),
      },
    ],
  },

  "learning-path": {
    title: "Personalized Learning Path",
    description:
      "Every student gets their own unique journey through the material. AI adjusts the path in real-time.",
    benefits: [
      "Individual paths adapt based on mastery and learning speed",
      "Prerequisite detection prevents students from skipping fundamentals",
      "Visual roadmap keeps students motivated with clear milestones",
      "Real-time adjustments when students struggle or accelerate",
    ],
    ctaPrimary: { label: "Get Early Access", href: "/institutional-demo" },
    ctaSecondary: { label: "See integrations", href: "#integrations" },
    mockup: <LearningPathSVG />,
    secondaryMockup: <LearningPathStats />,
    relatedFeatures: [
      {
        title: "AI Flashcards",
        description:
          "Auto-generated flashcards with FSRS-powered spaced repetition.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#0077FF"),
      },
      {
        title: "Knowledge Graphs",
        description:
          "Visual maps showing how every concept connects across subjects.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#06B6D4"),
      },
      {
        title: "Mastery Tracking",
        description:
          "Real-time progress bars and predictive analytics for every topic.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#665efd"),
      },
    ],
  },

  notes: {
    title: "Smart Notes",
    description:
      "Cornell-style note layout with AI-enhanced structure. Auto-generates summaries and key points.",
    benefits: [
      "AI organizes raw notes into structured Cornell format",
      "Auto-generated summaries save hours of review time",
      "Key terms are extracted and linked to flashcards automatically",
      "Collaborative notes let study groups build knowledge together",
    ],
    ctaPrimary: { label: "Get Early Access", href: "/institutional-demo" },
    ctaSecondary: { label: "See integrations", href: "#integrations" },
    mockup: <SmartNotesMockup />,
    secondaryMockup: <SmartNotesStats />,
    relatedFeatures: [
      {
        title: "AI Flashcards",
        description:
          "Flashcards auto-generated from your notes with spaced repetition.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#0077FF"),
      },
      {
        title: "Knowledge Graphs",
        description:
          "See how concepts in your notes connect to the broader curriculum.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#06B6D4"),
      },
      {
        title: "Learning Path",
        description:
          "Personalized study paths that adapt as your notes grow.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#665efd"),
      },
    ],
  },

  "knowledge-graph": {
    title: "Knowledge Graphs",
    description:
      "Visual map of how concepts connect to each other. Identifies isolated topics that need reinforcement.",
    benefits: [
      "Interactive visual map of all course concepts and their connections",
      "Highlights isolated topics that need additional study material",
      "Students discover relationships between subjects they hadn't considered",
      "Teachers see curriculum gaps and overlapping content at a glance",
    ],
    ctaPrimary: { label: "Get Early Access", href: "/institutional-demo" },
    ctaSecondary: { label: "See integrations", href: "#integrations" },
    mockup: <KnowledgeGraphMockup />,
    secondaryMockup: <KnowledgeGraphStats />,
    relatedFeatures: [
      {
        title: "Learning Path",
        description:
          "Personalized paths that use graph connections for optimal sequencing.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#0077FF"),
      },
      {
        title: "Mastery Tracking",
        description:
          "Progress tracking that leverages graph relationships for predictions.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#665efd"),
      },
      {
        title: "Adaptive Memory",
        description:
          "Spaced repetition informed by concept connections in the graph.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#06B6D4"),
      },
    ],
  },

  mastery: {
    title: "Mastery Tracking",
    description:
      "Real-time progress bars for every topic. Color-coded indicators and predictive analytics.",
    benefits: [
      "Granular progress tracking down to individual sub-topics",
      "Color-coded indicators make weak areas immediately visible",
      "Predictive analytics forecast exam readiness weeks in advance",
      "Automated recommendations guide students to the highest-impact study",
    ],
    ctaPrimary: { label: "Get Early Access", href: "/institutional-demo" },
    ctaSecondary: { label: "See integrations", href: "#integrations" },
    mockup: <MasteryMockup />,
    secondaryMockup: <MasteryStats />,
    relatedFeatures: [
      {
        title: "AI Flashcards",
        description:
          "Mastery data drives flashcard priority and review scheduling.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#0077FF"),
      },
      {
        title: "Learning Path",
        description:
          "Paths adapt in real-time based on mastery tracking signals.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#665efd"),
      },
      {
        title: "Adaptive Memory",
        description:
          "Memory algorithms tuned by actual mastery rather than self-reporting.",
        href: "#platform-features",
        linkText: "Learn more",
        graphic: coloredPlaceholder("#06B6D4"),
      },
    ],
  },
}
