"use client"

import { useState, useRef } from "react"
import { BentoModal } from "@/components/ui/bento-modal"
import { BentoCard } from "@/components/ui/bento-card"
import {
  modalData,
  ORB_COLORS,
  FlashcardMockup,
  LearningPathSVG,
  SmartNotesMockup,
  KnowledgeGraphMockup,
  MasteryMockup,
  FlashcardStats,
  LearningPathStats,
  SmartNotesStats,
  KnowledgeGraphStats,
  MasteryStats,
} from "@/data/platform-features-modal-data"
import { ArrowRight } from "lucide-react"

const cardMockups: Record<string, React.ReactNode> = {
  flashcards: <FlashcardMockup />,
  "learning-path": <LearningPathSVG />,
  notes: <SmartNotesMockup />,
  "knowledge-graph": <KnowledgeGraphMockup />,
  mastery: <MasteryMockup />,
}

const secondaryMockups: Record<string, React.ReactNode> = {
  flashcards: <FlashcardStats />,
  "learning-path": <LearningPathStats />,
  notes: <SmartNotesStats />,
  "knowledge-graph": <KnowledgeGraphStats />,
  mastery: <MasteryStats />,
}

const cardOrder = [
  "flashcards",
  "learning-path",
  "notes",
  "knowledge-graph",
  "mastery",
]

export default function PlatformFeatures() {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const currentContent = openModal ? { ...modalData[openModal] } : null
  if (currentContent) {
    currentContent.ctaSecondary = {
      ...currentContent.ctaSecondary,
      onClick: () => setOpenModal(null),
    }
  }

  return (
    <section id="platform-features" className="py-20 px-6 lg:px-8 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            Everything Students Need
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl">
            AI-powered tools that adapt to every learner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {cardOrder.map((key) => {
            const data = modalData[key]
            const isLarge = key === "learning-path"
            const orbs = ORB_COLORS[key]

            return (
              <BentoCard
                key={key}
                isLarge={isLarge}
                orbColors={orbs}
                title={data.title}
                triggerRef={triggerRef}
                onClick={() => setOpenModal(key)}
              >
                {cardMockups[key]}
              </BentoCard>
            )
          })}

          {/* See all features link card */}
          <a
            href="/institutional-demo"
            className="md:col-span-4 border border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-primary transition-colors duration-200"
          >
            <span className="text-slate-500 group-hover:text-primary font-semibold transition-colors">
              See all features
            </span>
            <ArrowRight size={16} className="mt-2 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </a>
        </div>
      </div>

      <BentoModal
        isOpen={!!openModal}
        onClose={() => setOpenModal(null)}
        content={currentContent}
        mockup={openModal ? cardMockups[openModal] : undefined}
        secondaryMockup={openModal ? secondaryMockups[openModal] : undefined}
        relatedFeatures={openModal ? currentContent?.relatedFeatures : undefined}
        triggerRef={triggerRef}
      />
    </section>
  )
}
