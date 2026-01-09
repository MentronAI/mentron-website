"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-[44px] leading-[0.9] sm:text-6xl lg:text-5xl text-slate-900 tracking-tighter font-display mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-base font-geist">
              Everything you need to know about Mentron.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-stone-50 border border-stone-200 rounded-3xl p-2 gap-2 flex flex-col">
              <Accordion type="single" collapsible className="w-full space-y-2">
                <AccordionItem value="item-1" className="bg-white border border-neutral-200/60 rounded-2xl px-6 data-[state=open]:border-neutral-300 transition-colors">
                  <AccordionTrigger className="text-base font-medium text-neutral-900 font-display hover:no-underline py-6">
                    How does Mentron adapt to my learning style?
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-500 text-[15px] leading-relaxed font-geist pb-6">
                    Mentron uses AI to analyze your initial assessment and continuously tracks your
                    performance. It identifies your strengths and weaknesses, then generates
                    personalized learning paths, flashcards, and quizzes that focus on areas where
                    you need the most improvement.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-white border border-neutral-200/60 rounded-2xl px-6 data-[state=open]:border-neutral-300 transition-colors">
                  <AccordionTrigger className="text-base font-medium text-neutral-900 font-display hover:no-underline py-6">
                    Can I use Mentron for any subject?
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-500 text-[15px] leading-relaxed font-geist pb-6">
                    Yes! Mentron works with any subject from STEM (Physics, Chemistry, Math) to
                    humanities and competitive exam prep (JEE, NEET, UPSC). Simply upload your study
                    materials, and our AI will help you learn more effectively.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-white border border-neutral-200/60 rounded-2xl px-6 data-[state=open]:border-neutral-300 transition-colors">
                  <AccordionTrigger className="text-base font-medium text-neutral-900 font-display hover:no-underline py-6">
                    How are flashcards generated?
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-500 text-[15px] leading-relaxed font-geist pb-6">
                    Our AI analyzes your documents and automatically creates smart flashcards
                    focused on key concepts. It uses spaced repetition algorithms (like FSRS) to
                    schedule reviews at optimal intervals, ensuring long-term retention.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-white border border-neutral-200/60 rounded-2xl px-6 data-[state=open]:border-neutral-300 transition-colors">
                  <AccordionTrigger className="text-base font-medium text-neutral-900 font-display hover:no-underline py-6">
                    Is Mentron suitable for both students and teachers?
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-500 text-[15px] leading-relaxed font-geist pb-6">
                    Absolutely! Students get personalized learning tools, while teachers can create
                    courses, generate quizzes, track student progress, and receive detailed
                    analytics about class performance. It's a complete LMS solution for both sides.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-white border border-neutral-200/60 rounded-2xl px-6 data-[state=open]:border-neutral-300 transition-colors">
                  <AccordionTrigger className="text-base font-medium text-neutral-900 font-display hover:no-underline py-6">
                    What makes Mentron different from other learning platforms?
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-500 text-[15px] leading-relaxed font-geist pb-6">
                    Unlike generic platforms, Mentron uses advanced AI to create truly personalized
                    learning experiences. It combines RAG-based knowledge management, adaptive
                    learning algorithms, automated content generation, and comprehensive
                    analytics—all in one platform designed specifically for the Indian education
                    system.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
