"use client"

import React, { useState, useEffect, useRef } from "react"
import { MessageCircle, Bot, ClipboardCheck, BarChart3, BrainCircuit, HelpCircle } from "lucide-react"

// ─── IntersectionObserver hook for scroll-triggered animations ───
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

// ─── Chat exchanges (static, outside component to avoid re-renders) ───
const facultyChat = [
  { role: "user", text: "Which students are struggling in Unit 3?" },
  { role: "memory", text: "Memory: Unit 3 — 3 students below 45%" },
  { role: "hero", text: "3 students are showing weak mastery in Unit 3 (Data Structures): Rahul (35%), Priya (42%), and Arjun (28%). Common struggle: recursive backtracking. Want me to generate targeted practice quizzes for them?" },
]

// ─── Hero Chat Demo with Memory Recall ───
function HeroChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [typing, setTyping] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [started, setStarted] = useState(false)
  const { ref, inView } = useInView(0.3)

  const messages = facultyChat

  useEffect(() => {
    if (!inView || started) return
    setStarted(true)
  }, [inView, started])

  useEffect(() => {
    if (!started) return
    if (visibleCount >= messages.length) return

    const current = messages[visibleCount]
    if (current.role === "hero") {
      setTyping(true)
      let i = 0
      const interval = setInterval(() => {
        i++
        setTypedText(current.text.slice(0, i))
        if (i >= current.text.length) {
          clearInterval(interval)
          setTyping(false)
          setTimeout(() => setVisibleCount((c) => c + 1), 400)
        }
      }, 25)
      return () => clearInterval(interval)
    } else {
      const timeout = setTimeout(() => setVisibleCount((c) => c + 1), 600)
      return () => clearTimeout(timeout)
    }
  }, [started, visibleCount]) // messages removed — static reference, stable identity

  return (
    <div ref={ref} className="bg-slate-50 rounded-2xl p-4 mt-4 space-y-3 border border-slate-100">
      {messages.slice(0, visibleCount).map((msg, i) => (
        <div key={i}>
          {msg.role === "user" && (
            <div className="flex justify-end">
              <div className="bg-primary text-white rounded-2xl rounded-br-sm px-3 py-2 text-xs max-w-[85%]">
                {msg.text}
              </div>
            </div>
          )}
          {msg.role === "memory" && (
            <div className="flex justify-center">
              <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-full px-3 py-1 text-[10px] font-medium flex items-center gap-1.5">
                <BrainCircuit className="w-3 h-3" />
                {msg.text}
              </div>
            </div>
          )}
          {msg.role === "hero" && i < visibleCount - (typing ? 0 : 0) && !typing && (
            <div className="flex justify-start gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center">
                <MessageCircle className="w-3 h-3 text-slate-800" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-3 py-2 text-xs text-slate-700 max-w-[85%]">
                {msg.text}
              </div>
            </div>
          )}
        </div>
      ))}
      {typing && (
        <div className="flex justify-start gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center">
            <MessageCircle className="w-3 h-3 text-slate-800" />
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-3 py-2 text-xs text-slate-700 max-w-[85%]">
            {typedText}
            <span className="inline-block w-[2px] h-3 bg-slate-400 ml-0.5 animate-pulse align-middle" />
          </div>
        </div>
      )}
      {!started && (
        <div className="text-center text-[10px] text-slate-400">Scroll into view to see the demo</div>
      )}
    </div>
  )
}

// ─── Mastery Bucket Bars (Faculty Analytics Demo) ───
function MasteryBars() {
  const { ref, inView } = useInView(0.3)
  const buckets = [
    { label: "Weak", count: 4, color: "bg-red-500", barColor: "bg-red-100" },
    { label: "Developing", count: 12, color: "bg-amber-500", barColor: "bg-amber-100" },
    { label: "Mastered", count: 18, color: "bg-emerald-500", barColor: "bg-emerald-100" },
  ]
  const max = 18

  return (
    <div ref={ref} className="mt-4 space-y-2">
      {buckets.map((b) => (
        <div key={b.label} className="flex items-center gap-3">
          <span className="text-[10px] text-slate-500 w-20 text-right">{b.label}</span>
          <div className={`flex-1 ${b.barColor} rounded-full h-4 overflow-hidden`}>
            <div
              className={`${b.color} h-full rounded-full transition-all duration-1000 ease-out`}
              style={{ width: inView ? `${(b.count / max) * 100}%` : "0%" }}
            />
          </div>
          <span className="text-[10px] text-slate-600 font-medium w-8">{b.count}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Quiz Generation Demo ───
function QuizGenDemo() {
  const [step, setStep] = useState(0)
  const steps = [
    { text: "Uploading syllabus...", progress: 30, color: "bg-primary" },
    { text: "AI mapping to Course Outcomes...", progress: 70, color: "bg-primary" },
    { text: "12 questions generated ✓", progress: 100, color: "bg-emerald-500" },
  ]
  const { ref, inView } = useInView(0.3)
  const cycleCount = useRef(0)

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % 3
        if (next === 0) {
          cycleCount.current++
          if (cycleCount.current >= 3) { clearInterval(interval); return 2 }
        }
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [inView])

  const current = steps[step]

  return (
    <div ref={ref} className="mt-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-600">{current.text}</span>
        {step === 2 && <span className="text-emerald-500 text-sm">✓</span>}
      </div>
      <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className={`${current.color} h-full rounded-full transition-all duration-700 ease-out`}
          style={{ width: inView ? `${current.progress}%` : "0%" }}
        />
      </div>
    </div>
  )
}

// ─── Memory Flow Diagram ───
function MemoryFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const { ref: ioRef, inView } = useInView(0.2)
  const hasStarted = useRef(false)
  const [chipsVisible, setChipsVisible] = useState([false, false, false, false])

  useEffect(() => {
    if (!inView || hasStarted.current) return
    hasStarted.current = true

    const canvas = canvasRef.current
    if (!canvas) return
    const _ctx = canvas.getContext("2d")
    if (!_ctx) return
    const ctx = _ctx

    const W = 640, H = 220
    canvas.width = W
    canvas.height = H

    const STAGES = [
      { x: 80, label: "Quiz", color: "#dc2626", light: "#FEE2E2" },
      { x: 220, label: "Mastery", color: "#16a34a", light: "#DCFCE7" },
      { x: 360, label: "Store", color: "#0077FF", light: "#DBEAFE" },
      { x: 500, label: "Hero", color: "#f59e0b", light: "#FEF3C7" },
      { x: 590, label: "Smarter", color: "#6366f1", light: "#EEF2FF" },
    ]
    const NODE_R = 26

    let particles: { x: number; y: number; tx: number; ty: number; ox: number; oy: number; color: string; size: number; age: number; life: number; done: boolean; alpha: number; wobbleX: number; wobbleY: number }[] = []
    let nodeScales = [1, 1, 1, 1, 1]
    let nodeGlow = [0, 0, 0, 0, 0]
    let connProgress = [0, 0, 0, 0]
    let phase = 0
    let phaseTimer = 0
    let smarterActive = false
    let phaseStarted = [false, false, false, false, false]
    const chipLabels = ["Weak on recursion", "Aced linked lists", "Prefers visual aids", "Studies at night"]

    function spawnBurst(fromIdx: number, toIdx: number, count: number, extraDelay: number) {
      const from = STAGES[fromIdx], to = STAGES[toIdx]
      for (let i = 0; i < count; i++) {
        const ox = from.x + (Math.random() - 0.5) * 18
        const oy = H / 2 - 10 + (Math.random() - 0.5) * 18
        particles.push({
          x: ox, y: oy, ox, oy,
          tx: to.x + (Math.random() - 0.5) * 10,
          ty: H / 2 - 10 + (Math.random() - 0.5) * 10,
          color: from.color,
          size: 2 + Math.random() * 2.5,
          age: -(extraDelay + i * 6),
          life: 80 + Math.random() * 30,
          done: false, alpha: 0,
          wobbleX: (Math.random() - 0.5) * 30,
          wobbleY: -20 - Math.random() * 30,
        })
      }
    }

    function drawNode(idx: number, scale: number, glow: number) {
      const s = STAGES[idx]
      const cx = s.x, cy = H / 2 - 10, r = idx === 4 ? 22 : NODE_R

      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(scale, scale)

      if (glow > 0) {
        ctx.globalAlpha = glow * 0.25
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(0, 0, r + 14, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      ctx.fillStyle = s.color
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#ffffff"
      ctx.font = "600 11px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(["Q", "M", "S", "H", "★"][idx], 0, 0)
      ctx.restore()

      ctx.font = "500 12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillStyle = "rgba(0,0,0,0.45)"
      ctx.fillText(s.label, cx, cy + r + 18)
    }

    function drawConnector(fromIdx: number, toIdx: number, progress: number) {
      const cy = H / 2 - 10
      const x1 = STAGES[fromIdx].x + NODE_R + 2
      const x2 = STAGES[toIdx].x - NODE_R - 2
      const xLen = x2 - x1

      ctx.save()
      ctx.strokeStyle = "rgba(0,0,0,0.08)"
      ctx.lineWidth = 0.5
      ctx.setLineDash([3, 4])
      ctx.beginPath()
      ctx.moveTo(x1, cy)
      ctx.lineTo(x2, cy)
      ctx.stroke()
      ctx.setLineDash([])

      if (progress > 0) {
        ctx.strokeStyle = STAGES[fromIdx].color
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.5
        ctx.beginPath()
        ctx.moveTo(x1, cy)
        ctx.lineTo(x1 + xLen * Math.min(progress, 1), cy)
        ctx.stroke()
      }
      ctx.restore()
    }

    function loop() {
      ctx.clearRect(0, 0, W, H)
      phaseTimer++

      if (phase === 0 && phaseTimer > 20) {
        if (!phaseStarted[0]) { phaseStarted[0] = true; spawnBurst(0, 1, 14, 0) }
        connProgress[0] = Math.min(connProgress[0] + 0.03, 1)
        nodeGlow[0] = Math.min(nodeGlow[0] + 0.05, 1)
        if (phaseTimer > 100) { phase = 1; phaseTimer = 0 }
      }
      if (phase === 1) {
        if (!phaseStarted[1]) { phaseStarted[1] = true; nodeGlow[1] = 1; nodeScales[1] = 1.15; spawnBurst(1, 2, 18, 0) }
        connProgress[1] = Math.min(connProgress[1] + 0.03, 1)
        nodeScales[1] += (1 - nodeScales[1]) * 0.08
        if (phaseTimer > 100) { phase = 2; phaseTimer = 0 }
      }
      if (phase === 2) {
        if (!phaseStarted[2]) { phaseStarted[2] = true; nodeGlow[2] = 1; nodeScales[2] = 1.15; spawnBurst(2, 3, 22, 0) }
        connProgress[2] = Math.min(connProgress[2] + 0.03, 1)
        nodeScales[2] += (1 - nodeScales[2]) * 0.08
        if (phaseTimer > 110) { phase = 3; phaseTimer = 0 }
      }
      if (phase === 3) {
        if (!phaseStarted[3]) { phaseStarted[3] = true; nodeGlow[3] = 1; nodeScales[3] = 1.2; spawnBurst(3, 4, 28, 0) }
        connProgress[3] = Math.min(connProgress[3] + 0.03, 1)
        nodeScales[3] += (1 - nodeScales[3]) * 0.07
        if (phaseTimer > 120) { phase = 4; phaseTimer = 0 }
      }
      if (phase === 4 && !phaseStarted[4]) {
        phaseStarted[4] = true
        nodeGlow[4] = 1
        nodeScales[4] = 1.3
        smarterActive = true
        const chipLabels = ["Weak on recursion", "Aced linked lists", "Prefers visual aids", "Studies at night"]
        chipLabels.forEach((_, i) => {
          setTimeout(() => setChipsVisible(prev => {
            const next = [...prev]
            next[i] = true
            return next
          }), i * 140)
        })
      }
      if (phase === 4) {
        nodeScales[4] += (1 - nodeScales[4]) * 0.06
      }

      for (let i = 0; i < 4; i++) drawConnector(i, i + 1, connProgress[i])

      particles.forEach(p => {
        p.age++
        if (p.age < 0) return
        const t = Math.min(p.age / p.life, 1)
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        p.x = p.ox + (p.tx - p.ox) * ease + p.wobbleX * Math.sin(t * Math.PI)
        p.y = p.oy + (p.ty - p.oy) * ease + p.wobbleY * Math.sin(t * Math.PI)
        p.alpha = t > 0.85 ? 1 - (t - 0.85) / 0.15 : p.age < 8 ? p.age / 8 : 1
        if (t >= 1) p.done = true
      })
      particles.forEach(p => {
        if (p.age < 0) return
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      particles = particles.filter(p => !p.done)

      for (let i = 0; i < 5; i++) {
        drawNode(i, nodeScales[i], nodeGlow[i])
        if (i < 4) nodeGlow[i] = Math.max(0, nodeGlow[i] - 0.008)
      }
      if (smarterActive) {
        nodeGlow[4] = 0.7 + 0.3 * Math.sin(phaseTimer * 0.06)
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    loop()

    return () => cancelAnimationFrame(rafRef.current)
  }, [inView])

  const chipLabels = ["Weak on recursion", "Aced linked lists", "Prefers visual aids", "Studies at night"]

  return (
    <div ref={ioRef}>
      <div ref={wrapRef} className="mt-6">
        {/* Desktop: canvas animation */}
        <canvas ref={canvasRef} className="hidden sm:block w-full max-w-[640px] mx-auto h-auto" />

        {/* Mobile: vertical flow of colored nodes */}
        <div className="sm:hidden flex flex-col items-center">
          {[
            { label: "Quiz", color: "#dc2626", letter: "Q" },
            { label: "Mastery", color: "#16a34a", letter: "M" },
            { label: "Store", color: "#0077FF", letter: "S" },
            { label: "Hero", color: "#f59e0b", letter: "H" },
            { label: "Smarter", color: "#6366f1", letter: "★" },
          ].map((stage, i, arr) => (
            <React.Fragment key={stage.label}>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: stage.color }}
                >
                  {stage.letter}
                </div>
                <span className="text-sm font-medium text-slate-700">{stage.label}</span>
              </div>
              {i < arr.length - 1 && (
                <svg className="w-4 h-5 text-slate-300 my-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex justify-center gap-2 flex-wrap mt-5">
          {chipLabels.map((label, i) => (
            <div
              key={label}
              className={`text-[11px] px-2.5 py-1 rounded-full border border-slate-200 text-slate-500 bg-white transition-all duration-400 ${
                chipsVisible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Feature Card ───
function FeatureCard({
  icon: Icon,
  iconBg,
  headline,
  body,
  children,
  className = "",
}: {
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  headline: string
  body: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{headline}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
      {children}
    </div>
  )
}

// ─── Main KeyFeatures Section ───
export default function KeyFeatures() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="key-features" className="py-16 px-6 lg:px-16 bg-[#F8F7F5]">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            AI-Powered Teaching Tools
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Intelligent features built for faculty, so you can focus on teaching
          </p>
        </div>

        {/* Feature Cards */}
        <div
          className={`transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <FacultyCards />
        </div>

        {/* Adaptive Memory Engine Banner */}
        <div className="mt-10 bg-slate-50 rounded-3xl border border-slate-200 p-8 md:p-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Adaptive Memory Engine</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                Every quiz, flashcard, and conversation feeds into a personal memory layer. Hero uses it to personalize every interaction. The more you use Mentron, the smarter it gets.
              </p>
              <MemoryFlow />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FacultyCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Card 4: Hero AI Assistant — spans 2 columns */}
      <FeatureCard
        icon={Bot}
        iconBg="bg-slate-100 text-slate-800"
        headline="AI Assistant That Knows Your Classes"
        body="Ask Hero about at-risk students, pending grading, or course performance. It pulls real analytics and can generate quizzes inline."
        className="md:col-span-2"
      >
        <HeroChatDemo />
      </FeatureCard>

      {/* Card 5: Quiz Generation */}
      <div className="space-y-6">
        <FeatureCard
          icon={ClipboardCheck}
          iconBg="bg-slate-100 text-slate-800"
          headline="Generate Assessments in Minutes, Not Hours"
          body="Upload your materials. AI creates quizzes and assignments mapped to Course Outcomes and Bloom's Taxonomy."
        >
          <QuizGenDemo />
        </FeatureCard>
      </div>

      {/* Card 6: Course Analytics — full width */}
      <div className="md:col-span-3 grid md:grid-cols-2 gap-6">
        <FeatureCard
          icon={BarChart3}
          iconBg="bg-slate-100 text-slate-800"
          headline="See Who's Struggling Before It's Too Late"
          body="Real-time mastery tracking, engagement scores, and at-risk student detection across all your courses."
        >
          <MasteryBars />
        </FeatureCard>

        <FeatureCard
          icon={HelpCircle}
          iconBg="bg-slate-100 text-slate-800"
          headline="Auto-Grade With AI Feedback"
          body="AI evaluates student responses, provides personalized feedback, and maps performance to learning outcomes."
        >
          <div className="mt-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Student A</span>
                  <span className="text-xs text-slate-800 font-medium">85% — Good</span>
                </div>
                <p className="text-[11px] text-slate-400 italic mt-0.5 pl-0.5">Strong on recursion, minor gaps in tree traversal</p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Student B</span>
                  <span className="text-xs text-slate-600 font-medium">62% — Needs review</span>
                </div>
                <p className="text-[11px] text-slate-400 italic mt-0.5 pl-0.5">Struggles with dynamic programming — recommend targeted exercises</p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Student C</span>
                  <span className="text-xs text-slate-900 font-medium">38% — At risk</span>
                </div>
                <p className="text-[11px] text-slate-400 italic mt-0.5 pl-0.5">Needs foundational review — schedule office hours</p>
              </div>
            </div>
          </div>
        </FeatureCard>
      </div>
    </div>
  )
}
