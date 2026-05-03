"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "@/lib/hooks/use-in-view"

const timeData = [
  { category: "Grading", before: 11.6, after: 0.6 },
  { category: "Planning", before: 9.7, after: 5.8 },
  { category: "Admin Work", before: 8.5, after: 4.5 },
  { category: "Communication", before: 4.2, after: 1.3 },
  { category: "Instruction", before: 22.4, after: 28.0 },
  { category: "Collaboration", before: 4.0, after: 6.0 },
]

const maxHours = Math.max(...timeData.map((d) => Math.max(d.before, d.after)))

function AnimatedBarRow({
  category,
  before,
  after,
  isVisible,
  delay,
}: {
  category: string
  before: number
  after: number
  isVisible: boolean
  delay: number
}) {
  const [beforeWidth, setBeforeWidth] = useState(0)
  const [afterWidth, setAfterWidth] = useState(0)
  const [beforeCount, setBeforeCount] = useState(0)
  const [afterCount, setAfterCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const beforePct = (before / maxHours) * 100
    const afterPct = (after / maxHours) * 100

    const timer1 = setTimeout(() => {
      setBeforeWidth(beforePct)
      const beforeInterval = setInterval(() => {
        setBeforeCount((c) => {
          const next = c + before / 40
          return next >= before ? (clearInterval(beforeInterval), before) : next
        })
      }, 25)
    }, delay * 150)

    const timer2 = setTimeout(() => {
      setAfterWidth(afterPct)
      const afterInterval = setInterval(() => {
        setAfterCount((c) => {
          const next = c + after / 40
          return next >= after ? (clearInterval(afterInterval), after) : next
        })
      }, 25)
    }, delay * 150 + 400)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [isVisible, before, after, delay])

  const saved = before - after
  const isGain = saved < 0

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 w-28 shrink-0">{category}</span>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-xs tabular-nums">{beforeCount.toFixed(1)}h</span>
          <span className="text-xs font-semibold tabular-nums">
            {afterCount.toFixed(1)}h
          </span>
          {saved !== 0 && (
            <span
              className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                isGain
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {isGain ? `+${Math.abs(saved).toFixed(1)}h` : `-${saved.toFixed(1)}h`}
            </span>
          )}
        </div>
      </div>
      <div className="space-y-1">
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-slate-300 opacity-40 transition-all duration-1000 ease-out"
            style={{ width: `${beforeWidth}%` }}
          />
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
            style={{ width: `${afterWidth}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function HeroStat({ isVisible }: { isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const target = 14.4
    const interval = setInterval(() => {
      setCount((c) => {
        const next = c + target / 40
        return next >= target ? target : next
      })
    }, 20)
    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <div className="text-center">
      <div className="inline-flex items-baseline gap-1">
        <span className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 tabular-nums">
          {count.toFixed(1)}
        </span>
        <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
          hrs/week
        </span>
      </div>
      <p className="mt-2 text-slate-500 text-base sm:text-lg">
        saved on grading, admin, and communication
      </p>
    </div>
  )
}

export default function TimeSavings() {
  const { ref, inView } = useInView(0.2)

  return (
    <section id="time-savings" className="py-20 px-6 lg:px-8 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            Reclaim Your Week
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl">
            Stop spending Sundays on grading. See where your time goes — and where it comes back.
          </p>
        </div>

        <HeroStat isVisible={inView} />

        <div className="mt-12 bg-white rounded-2xl border border-[rgba(0,119,255,0.08)] p-6 sm:p-8">
          <div className="flex items-center gap-6 mb-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300 opacity-60" />
              <span>Before Mentron</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span>With Mentron</span>
            </div>
          </div>

          <div className="space-y-6">
            {timeData.map((row, i) => (
              <AnimatedBarRow
                key={row.category}
                {...row}
                isVisible={inView}
                delay={i}
              />
            ))}
          </div>

          <p className="mt-6 text-xs text-slate-400 text-right">
            *Projected time savings based on Mentron AI automation
          </p>
        </div>
      </div>
    </section>
  )
}
