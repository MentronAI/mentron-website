"use client"

import { BrainCircuit, CheckCircle, Network, BarChart } from "lucide-react"

export default function WhyMentron() {
  return (
    <section id="why-choose" className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 lg:gap-8">
          {/* Text Column */}
          <div className="lg:col-span-4 space-y-6 mb-8 lg:mb-0">
            <h2 className="lg:text-4xl text-3xl font-medium text-neutral-900 tracking-tight font-display">
              Why Mentron? Because Your Brain Deserves Better Than Guesswork
            </h2>
            <p className="text-[17px] leading-relaxed font-normal text-neutral-500">
              While others offer tools, we offer a complete learning system built on cognitive science
              and AI. Here's why students and educators choose us.
            </p>
          </div>

          {/* Grid Column */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 lg:gap-2 bg-stone-50 border-stone-200 border rounded-3xl p-2 gap-2">
              {/* Card 1: AI That Learns YOU */}
              <div className="bg-white p-8 rounded-2xl border border-neutral-200/60 flex flex-col gap-5 hover:border-neutral-300 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2 font-display">AI That Actually Learns YOU</h3>
                  <p className="text-[15px] leading-relaxed text-neutral-500">
                    Mentron's AI adapts to YOUR learning style, pace, and knowledge gaps in real-time.
                  </p>
                </div>
              </div>

              {/* Card 2: Zero Busywork */}
              <div className="bg-white p-8 rounded-2xl border border-neutral-200/60 flex flex-col gap-5 hover:border-neutral-300 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-success">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2 font-display">Zero Busywork, Maximum Impact</h3>
                  <p className="text-[15px] leading-relaxed text-neutral-500">
                    Auto-generates flashcards, notes, and quizzes. You spend 100% of time learning, not preparing.
                  </p>
                </div>
              </div>

              {/* Card 3: Everything Connected */}
              <div className="bg-white p-8 rounded-2xl border border-neutral-200/60 flex flex-col gap-5 hover:border-neutral-300 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2 font-display">Everything Connected, Not Siloed</h3>
                  <p className="text-[15px] leading-relaxed text-neutral-500">
                    Flashcards, quizzes, mindmaps, and chat—all sync to one unified learning profile.
                  </p>
                </div>
              </div>

              {/* Card 4: See Your Progress */}
              <div className="bg-white p-8 rounded-2xl border border-neutral-200/60 flex flex-col gap-5 hover:border-neutral-300 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-success">
                  <BarChart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2 font-display">See Your Progress, Not Just Effort</h3>
                  <p className="text-[15px] leading-relaxed text-neutral-500">
                    Track mastery per topic, predict exam readiness, and get actionable insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
