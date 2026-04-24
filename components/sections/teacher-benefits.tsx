"use client"

import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const barData = [
  { label: "Grading", hours: 11.6, percent: 52, gradient: "from-danger to-red-400", textColor: "text-white" },
  { label: "Planning", hours: 9.7, percent: 43, gradient: "from-warning to-amber-400", textColor: "text-white" },
  { label: "Admin Work", hours: 8.5, percent: 38, gradient: "from-warning to-amber-400", textColor: "text-white" },
  { label: "Communication", hours: 4.2, percent: 19, gradient: "from-amber-400 to-yellow-400", textColor: "text-slate-700" },
  { label: "Instruction", hours: 22.4, percent: 100, gradient: "from-success to-emerald-400", textColor: "text-white" },
  { label: "Collaboration", hours: 4, percent: 18, gradient: "from-primary to-blue-400", textColor: "text-white" },
]

function AnimatedBar({ label, hours, percent, gradient, textColor, isVisible, delay }: {
  label: string
  hours: number
  percent: number
  gradient: string
  textColor: string
  isVisible: boolean
  delay: number
}) {
  const [width, setWidth] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const startDelay = delay * 150

    // Bar animation
    const barTimeout = setTimeout(() => {
      setWidth(percent)
    }, startDelay)

    // Number counting animation
    const countTimeout = setTimeout(() => {
      const duration = 1000
      const steps = 40
      const increment = hours / steps
      let current = 0
      const interval = setInterval(() => {
        current += increment
        if (current >= hours) {
          setCount(hours)
          clearInterval(interval)
        } else {
          setCount(Math.round(current * 10) / 10)
        }
      }, duration / steps)

      return () => clearInterval(interval)
    }, startDelay)

    return () => {
      clearTimeout(barTimeout)
      clearTimeout(countTimeout)
    }
  }, [isVisible, hours, percent, delay])

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
      <div className="w-full sm:w-32 text-xs sm:text-sm text-slate-600 font-bold sm:font-medium uppercase sm:normal-case tracking-wider sm:tracking-normal">{label}</div>
      <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${gradient} rounded-full flex items-center justify-end pr-3 transition-all ease-out duration-1000`}
          style={{ width: `${width}%` }}
        >
          <span className={`text-xs font-bold ${textColor}`}>
            {count.toFixed(1)}h
          </span>
        </div>
      </div>
    </div>
  )
}

export default function TeacherBenefits() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section ref={sectionRef} id="teacher-solutions" className="py-16 px-6 lg:px-16 bg-[#F8F7F5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-display mb-4 tracking-tight">
            Stop Spending Sundays on Grading
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Transform workload from overwhelming to manageable with intelligent automation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Vertical Bar Chart */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 font-display">Weekly Hours Breakdown</h3>
            <div className="space-y-6 sm:space-y-4">
              {barData.map((bar, index) => (
                <AnimatedBar
                  key={bar.label}
                  {...bar}
                  isVisible={isVisible}
                  delay={index}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Solution Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Solution 1 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="text-red-600 font-bold text-sm mb-2">Save 11 hrs/week</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Grading Automated</h4>
              <p className="text-sm text-slate-500 mb-3">Automated grading for quizzes frees up hours of manual review.</p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li className="flex items-center gap-2"><Check className="text-slate-700 w-3.5 h-3.5" /> Instant AI feedback</li>
                <li className="flex items-center gap-2"><Check className="text-slate-700 w-3.5 h-3.5" /> Plagiarism detection</li>
              </ul>
            </div>

            {/* Solution 2 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="text-amber-600 font-bold text-sm mb-2">40% faster planning</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Planning Optimized</h4>
              <p className="text-sm text-slate-500 mb-3">Create lesson plans 5x faster with AI-assisted tools.</p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li className="flex items-center gap-2"><Check className="text-slate-700 w-3.5 h-3.5" /> Auto-generate slides</li>
                <li className="flex items-center gap-2"><Check className="text-slate-700 w-3.5 h-3.5" /> Curriculum alignment</li>
              </ul>
            </div>

            {/* Solution 3 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="text-amber-600 font-bold text-sm mb-2">2-4 hrs back/day</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Admin Eliminated</h4>
              <p className="text-sm text-slate-500 mb-3">Live performance reporting handles paperwork automatically.</p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li className="flex items-center gap-2"><Check className="text-slate-700 w-3.5 h-3.5" /> One-click attendance</li>
                <li className="flex items-center gap-2"><Check className="text-slate-700 w-3.5 h-3.5" /> Auto progress reports</li>
              </ul>
            </div>

            {/* Solution 4 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="text-yellow-600 font-bold text-sm mb-2">70% time saved</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Communication Streamlined</h4>
              <p className="text-sm text-slate-500 mb-3">Automated parent updates and student notifications.</p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li className="flex items-center gap-2"><Check className="text-slate-700 w-3.5 h-3.5" /> Auto progress updates</li>
                <li className="flex items-center gap-2"><Check className="text-slate-700 w-3.5 h-3.5" /> Parent portal access</li>
              </ul>
            </div>

            {/* Solution 5 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="text-success font-bold text-sm mb-2">22+ hrs for teaching</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Instruction Amplified</h4>
              <p className="text-sm text-slate-500 mb-3">Maximize time on direct student engagement.</p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li className="flex items-center gap-2"><Check className="text-slate-700 w-3.5 h-3.5" /> Real-time engagement</li>
                <li className="flex items-center gap-2"><Check className="text-slate-700 w-3.5 h-3.5" /> Personalized paths</li>
              </ul>
            </div>

            {/* Solution 6 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="text-primary font-bold text-sm mb-2">3x peer interaction</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Collaboration Enhanced</h4>
              <p className="text-sm text-slate-500 mb-3">Facilitate deeper peer-to-peer learning experiences.</p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li className="flex items-center gap-2"><Check className="text-slate-700 w-3.5 h-3.5" /> Group projects</li>
                <li className="flex items-center gap-2"><Check className="text-slate-700 w-3.5 h-3.5" /> Peer review system</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6 text-center max-w-3xl mx-auto">*Projected time savings based on automated grading, planning, and admin workflows.</p>
      </div>
    </section>
  )
}
