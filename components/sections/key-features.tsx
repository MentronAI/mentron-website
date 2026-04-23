"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { MessageCircle, Layers, Network, Bot, ClipboardCheck, BarChart3, BrainCircuit, BookOpen, GraduationCap, HelpCircle } from "lucide-react"

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

// ─── Hero Chat Demo with Memory Recall ───
function HeroChatDemo({ mode }: { mode: "student" | "faculty" }) {
  const exchanges = {
    student: [
      { role: "user", text: "I keep confusing BFS and DFS in graph traversal" },
      { role: "memory", text: "Memory: Graph Traversal — 42% mastery" },
      { role: "hero", text: "I see you've been working on Data Structures. BFS goes level-by-level using a queue, DFS goes depth-first using a stack. Want me to create a mind map showing the differences?" },
    ],
    faculty: [
      { role: "user", text: "Which students are struggling in Unit 3?" },
      { role: "memory", text: "Memory: Unit 3 — 3 students below 45%" },
      { role: "hero", text: "3 students are showing weak mastery in Unit 3 (Data Structures): Rahul (35%), Priya (42%), and Arjun (28%). Common struggle: recursive backtracking. Want me to generate targeted practice quizzes for them?" },
    ],
  }

  const messages = exchanges[mode]
  const [visibleCount, setVisibleCount] = useState(0)
  const [typing, setTyping] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [started, setStarted] = useState(false)
  const { ref, inView } = useInView(0.3)

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
  }, [started, visibleCount, messages])

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
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center">
                <MessageCircle className="w-3 h-3 text-emerald-600" />
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
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center">
            <MessageCircle className="w-3 h-3 text-emerald-600" />
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

// ─── Knowledge Graph SVG ───
function KnowledgeGraphSVG() {
  return (
    <div className="mt-4 flex items-center justify-center">
      <svg viewBox="0 0 200 160" className="w-full h-32">
        <circle cx="100" cy="80" r="16" fill="#dc2626" opacity="0.9" />
        <circle cx="40" cy="30" r="12" fill="#dc2626" opacity="0.7" />
        <circle cx="160" cy="40" r="12" fill="#dc2626" opacity="0.7" />
        <circle cx="160" cy="130" r="12" fill="#dc2626" opacity="0.7" />
        <circle cx="40" cy="130" r="12" fill="#dc2626" opacity="0.7" />
        <circle cx="100" cy="20" r="10" fill="#dc2626" opacity="0.5" />
        <line x1="100" y1="64" x2="45" y2="40" stroke="#dc2626" strokeWidth="1.5" opacity="0.4" />
        <line x1="100" y1="64" x2="150" y2="48" stroke="#dc2626" strokeWidth="1.5" opacity="0.4" />
        <line x1="100" y1="96" x2="150" y2="120" stroke="#dc2626" strokeWidth="1.5" opacity="0.4" />
        <line x1="100" y1="96" x2="50" y2="120" stroke="#dc2626" strokeWidth="1.5" opacity="0.4" />
        <line x1="45" y1="25" x2="92" y2="25" stroke="#dc2626" strokeWidth="1" opacity="0.3" />
        <text x="100" y="84" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">DSA</text>
        <text x="40" y="34" textAnchor="middle" fill="white" fontSize="5">Trees</text>
        <text x="160" y="44" textAnchor="middle" fill="white" fontSize="5">Graphs</text>
      </svg>
    </div>
  )
}

// ─── Flashcard Mini Demo ───
function FlashcardMini() {
  const [flipped, setFlipped] = useState(false)
  return (
    <div
      className="mt-4 cursor-pointer mx-auto"
      style={{ perspective: "800px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-24 transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div
          className="absolute inset-0 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-3 text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">Question</p>
          <p className="text-xs font-bold text-slate-800">What is BFS?</p>
          <p className="text-[8px] text-slate-400 mt-1">Tap to reveal</p>
        </div>
        <div
          className="absolute inset-0 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-3 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-[9px] text-blue-400 uppercase tracking-wider mb-1">Answer</p>
          <p className="text-[10px] font-medium text-slate-700">Breadth-First Search: explores neighbors level by level using a queue.</p>
        </div>
      </div>
    </div>
  )
}

// ─── Memory Flow Diagram ───
function MemoryFlow() {
  const { ref, inView } = useInView(0.2)
  const nodes = [
    { icon: "Q", label: "Quiz" },
    { icon: "M", label: "Mastery" },
    { icon: "S", label: "Store" },
    { icon: "H", label: "Hero" },
    { icon: "R", label: "Smarter" },
  ]

  return (
    <div ref={ref} className="mt-6">
      {/* Desktop: horizontal flow */}
      <div className="hidden md:flex items-center justify-center gap-2">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full border-2 border-primary/30 bg-primary/5 flex items-center justify-center text-sm font-bold text-primary transition-all duration-700 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} style={{ transitionDelay: `${i * 200}ms` }}>
                {node.icon}
              </div>
              <span className="text-[10px] text-slate-500 mt-1">{node.label}</span>
            </div>
            {i < nodes.length - 1 && (
              <div className="w-8 h-[2px] bg-primary/20 relative overflow-hidden">
                {inView && (
                  <div className="absolute inset-y-0 left-0 w-3 h-full bg-primary/60 animate-[flowDot_2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 400}ms` }} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical flow */}
      <div className="flex md:hidden flex-col items-center gap-2">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full border-2 border-primary/30 bg-primary/5 flex items-center justify-center text-xs font-bold text-primary transition-all duration-500 ${inView ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: `${i * 150}ms` }}>
              {node.icon}
            </div>
            <span className="text-[9px] text-slate-500">{node.label}</span>
            {i < nodes.length - 1 && (
              <div className="w-[2px] h-4 bg-primary/20" />
            )}
          </div>
        ))}
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
  const [activeRole, setActiveRole] = useState<"student" | "faculty">("student")
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

  const handleToggle = useCallback((role: "student" | "faculty") => {
    if (role === activeRole) return
    setIsVisible(false)
    setTimeout(() => {
      setActiveRole(role)
      setIsVisible(true)
    }, 150)
  }, [activeRole])

  return (
    <section id="key-features" className="py-16 px-6 lg:px-16 bg-white">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            The AI That Learns With You
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Six AI-powered features, built for students and faculty
          </p>
        </div>

        {/* Role Toggle */}
        <div
          role="tablist"
          aria-label="Audience selector"
          className="flex items-center justify-center gap-2 mb-10"
        >
          <button
            role="tab"
            aria-selected={activeRole === "student"}
            onClick={() => handleToggle("student")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] ${
              activeRole === "student"
                ? "bg-primary text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            For Students
          </button>
          <button
            role="tab"
            aria-selected={activeRole === "faculty"}
            onClick={() => handleToggle("faculty")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] ${
              activeRole === "faculty"
                ? "bg-primary text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            For Faculty
          </button>
        </div>

        {/* Feature Cards */}
        <div
          role="tabpanel"
          className={`transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {activeRole === "student" ? <StudentCards /> : <FacultyCards />}
        </div>

        {/* Adaptive Memory Engine Banner */}
        <div className="mt-10 bg-gradient-to-r from-blue-50 to-slate-50 rounded-3xl border border-slate-200 p-8 md:p-10">
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

function StudentCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Card 1: Hero AI Tutor — spans 2 columns */}
      <FeatureCard
        icon={MessageCircle}
        iconBg="bg-emerald-50 text-emerald-600"
        headline="24/7 AI Tutor That Remembers You"
        body="Hero doesn't just answer questions. It knows what you struggle with, what you've mastered, and how you learn best. Every conversation builds on the last."
        className="md:col-span-2"
      >
        <HeroChatDemo mode="student" />
      </FeatureCard>

      {/* Card 2: Smart Flashcards */}
      <div className="space-y-6">
        <FeatureCard
          icon={Layers}
          iconBg="bg-blue-50 text-blue-600"
          headline="Flashcards That Know When You're Ready"
          body="Auto-generated from your course materials. Powered by FSRS spaced repetition and your personal mastery data."
        >
          <FlashcardMini />
          <a href="#features" className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-3 hover:underline">
            See it in action →
          </a>
        </FeatureCard>
      </div>

      {/* Card 3: Knowledge Graphs */}
      <div className="md:col-span-3 grid md:grid-cols-2 gap-6">
        <FeatureCard
          icon={Network}
          iconBg="bg-red-50 text-red-600"
          headline="See How Everything Connects"
          body="Visualize relationships between concepts across your entire course. Understand the big picture, not just isolated facts."
        >
          <KnowledgeGraphSVG />
          <a href="#features" className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-3 hover:underline">
            See it in action →
          </a>
        </FeatureCard>

        {/* Extra space: Chat with Docs preview */}
        <FeatureCard
          icon={BookOpen}
          iconBg="bg-violet-50 text-violet-600"
          headline="Chat With Your Documents"
          body="Upload PDFs, lecture slides, or textbooks. Ask questions, get summaries, and extract key concepts instantly."
        >
          <div className="mt-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded bg-violet-100 flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-violet-600" />
              </div>
              <span className="text-[10px] text-slate-400">Chapter_7_Notes.pdf</span>
            </div>
            <div className="bg-white rounded-xl p-2.5 text-[10px] text-slate-500 border border-slate-100">
              Summary: 3 key concepts extracted...
            </div>
          </div>
        </FeatureCard>
      </div>
    </div>
  )
}

function FacultyCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Card 4: Hero AI Assistant — spans 2 columns */}
      <FeatureCard
        icon={Bot}
        iconBg="bg-blue-50 text-blue-600"
        headline="AI Assistant That Knows Your Classes"
        body="Ask Hero about at-risk students, pending grading, or course performance. It pulls real analytics and can generate quizzes inline."
        className="md:col-span-2"
      >
        <HeroChatDemo mode="faculty" />
      </FeatureCard>

      {/* Card 5: Quiz Generation */}
      <div className="space-y-6">
        <FeatureCard
          icon={ClipboardCheck}
          iconBg="bg-orange-50 text-orange-600"
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
          iconBg="bg-emerald-50 text-emerald-600"
          headline="See Who's Struggling Before It's Too Late"
          body="Real-time mastery tracking, engagement scores, and at-risk student detection across all your courses."
        >
          <MasteryBars />
        </FeatureCard>

        <FeatureCard
          icon={HelpCircle}
          iconBg="bg-slate-50 text-slate-600"
          headline="Auto-Grade With AI Feedback"
          body="AI evaluates student responses, provides personalized feedback, and maps performance to learning outcomes."
        >
          <div className="mt-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Student A</span>
                <span className="text-[10px] text-emerald-600 font-medium">85% — Good</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Student B</span>
                <span className="text-[10px] text-amber-600 font-medium">62% — Needs review</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Student C</span>
                <span className="text-[10px] text-red-600 font-medium">38% — At risk</span>
              </div>
            </div>
          </div>
        </FeatureCard>
      </div>
    </div>
  )
}
