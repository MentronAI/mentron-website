"use client"

import { useState, useEffect, useRef } from "react"
import { Layers, GitBranch, MessageCircle, FileText, ClipboardCheck, Network } from "lucide-react"

const flashcardData = [
  { q: "What is Photosynthesis?", a: "The process by which plants convert sunlight, water & CO₂ into glucose and oxygen." },
  { q: "Mitochondria function?", a: "The powerhouse of the cell — generates ATP through cellular respiration." },
  { q: "What is Osmosis?", a: "Movement of water molecules through a semi-permeable membrane from low to high solute concentration." },
]

function FlashcardStack() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setFlipped(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-4" style={{ perspective: "800px" }}>
      {flashcardData.map((card, i) => {
        const isFlipped = flipped.has(i)

        return (
          <div key={i} onClick={() => toggle(i)} className="cursor-pointer">
            <div
              className="relative w-48 h-60 transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front — question */}
              <div
                className="absolute inset-0 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-5 text-center shadow-md"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="absolute top-3 left-4 w-6 h-6 rounded-full bg-slate-200 text-slate-500 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-wider font-semibold">Question</p>
                <p className="text-sm font-bold text-slate-800 leading-snug">{card.q}</p>
                <p className="absolute bottom-3 text-[9px] text-slate-400">Tap to reveal</p>
              </div>

              {/* Back — answer */}
              <div
                className="absolute inset-0 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-5 text-center shadow-md"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="absolute top-3 left-4 w-6 h-6 rounded-full bg-blue-200 text-primary text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-[10px] text-blue-400 mb-2 uppercase tracking-wider font-semibold">Answer</p>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">{card.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ============================================================
   STREAMING CHAT — typing effect, plays 3x then stops
   ============================================================ */
function StreamingChat() {
  const answer = "Osmosis is the movement of water molecules across a semi-permeable membrane from an area of low solute to high solute concentration."
  const [text, setText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const indexRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current++
      if (indexRef.current <= answer.length) {
        setText(answer.slice(0, indexRef.current))
      } else {
        clearInterval(interval)
        setShowCursor(false)
      }
    }, 35)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-3 mt-6">
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-full bg-green-200 flex-shrink-0"></div>
        <div className="flex-1 bg-white rounded-2xl p-3 text-xs text-slate-600 border border-green-200">
          "Explain osmosis..."
        </div>
      </div>
      <div className="flex items-start gap-2 justify-end">
        <div className="flex-1 bg-green-600 rounded-2xl p-3 text-xs text-white min-h-[48px]">
          {text}
          {showCursor && <span className="inline-block w-[2px] h-3 bg-white/80 ml-0.5 animate-pulse align-middle" />}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   PROGRESSIVE NOTES — lines reveal one by one, plays 3x
   ============================================================ */
function ProgressiveNotes() {
  const lines = [
    { col: "cue", text: "Key concept" },
    { col: "notes", text: "Osmosis moves water across membranes" },
    { col: "notes", text: "Driven by solute concentration gradient" },
    { col: "cue", text: "Example" },
    { col: "notes", text: "Roots absorbing water from soil" },
    { col: "cue", text: "Formula" },
    { col: "notes", text: "Water potential: ψ = ψs + ψp" },
    { col: "notes", text: "Tonicity determines direction of flow" },
    { col: "summary", text: "Water flows from low → high solute via semi-permeable membrane" },
  ]
  const [visible, setVisible] = useState(0)
  const runCount = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(prev => {
        if (prev < lines.length) return prev + 1
        runCount.current++
        if (runCount.current >= 3) {
          clearInterval(interval)
          return prev
        }
        return 0
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-4 space-y-0 border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex">
        {/* Cue column */}
        <div className="w-1/3 border-r border-slate-200 p-2 space-y-1.5 bg-slate-50">
          {lines.filter(l => l.col === "cue").map((line, i) => {
            const globalIdx = lines.indexOf(line)
            return (
              <div
                key={i}
                className="h-3 rounded transition-all duration-300"
                style={{
                  backgroundColor: globalIdx < visible ? "#64748b" : "#e2e8f0",
                  opacity: globalIdx < visible ? 1 : 0.5,
                }}
              />
            )
          })}
        </div>
        {/* Notes column */}
        <div className="flex-1 p-2 space-y-1.5">
          {lines.filter(l => l.col === "notes").map((line, i) => {
            const globalIdx = lines.indexOf(line)
            return (
              <div
                key={i}
                className="h-3 rounded transition-all duration-300"
                style={{
                  width: globalIdx < visible ? "100%" : `${[85, 70, 92, 65, 78, 88][i % 6]}%`,
                  backgroundColor: globalIdx < visible ? "#475569" : "#e2e8f0",
                  opacity: globalIdx < visible ? 1 : 0.5,
                }}
              />
            )
          })}
        </div>
      </div>
      {/* Summary row */}
      <div className="border-t border-slate-200 p-2 bg-slate-100/60">
        <div
          className="h-3 rounded transition-all duration-300"
          style={{
            width: visible >= lines.length ? "100%" : "30%",
            backgroundColor: visible >= lines.length ? "#334155" : "#e2e8f0",
            opacity: visible >= lines.length ? 1 : 0.5,
          }}
        />
      </div>
    </div>
  )
}

/* ============================================================
   INTERACTIVE QUIZ — click to answer, shows feedback, plays 3x
   ============================================================ */
function InteractiveQuiz() {
  const options = [
    { label: "A) Active transport", correct: false },
    { label: "B) Osmosis", correct: true },
    { label: "C) Diffusion", correct: false },
  ]
  const [selected, setSelected] = useState<number | null>(null)
  const roundCount = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSelect = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    timerRef.current = setTimeout(() => {
      roundCount.current++
      if (roundCount.current >= 3) return
      setSelected(null)
    }, 2500)
  }

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  return (
    <div className="space-y-2 mt-6">
      <p className="text-xs text-slate-600 font-medium mb-1">Water moves across a membrane — this is called?</p>
      {options.map((opt, i) => {
        const isSelected = selected === i
        const isCorrect = opt.correct
        let bg = "bg-slate-50 border-slate-200"
        let dot = "border-slate-300"
        if (selected !== null) {
          if (isCorrect) { bg = "bg-green-50 border-green-300"; dot = "border-green-500 bg-green-200" }
          else if (isSelected && !isCorrect) { bg = "bg-red-50 border-red-300"; dot = "border-red-400 bg-red-200" }
        }
        return (
          <div
            key={i}
            onClick={() => handleSelect(i)}
            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all duration-300 ${bg}`}
          >
            <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${dot}`} />
            <span className="text-xs text-slate-700">{opt.label}</span>
            {selected !== null && isCorrect && <span className="ml-auto text-[10px] text-green-600 font-bold">✓ Correct</span>}
            {selected !== null && isSelected && !isCorrect && <span className="ml-auto text-[10px] text-red-500 font-bold">✗</span>}
          </div>
        )
      })}
    </div>
  )
}

export default function StudentFeatures() {
  return (
    <section id="features" className="py-16 px-6 lg:px-16 bg-[#F8F7F5]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:px-0 animate-fadeInUp pr-0 pl-0 gap-x-6 gap-y-2 mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter text-slate-900 text-left font-display">
            Everything Your Students Need to Learn Better
          </h2>
          <p className="sm:text-base text-sm text-slate-400 tracking-tight mt-1">
            Comprehensive AI-powered tools for K-12 and college classrooms. From Biology to Calculus, help students master any subject with adaptive learning tools teachers can assign and track.
          </p>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* AI Flashcards - Large Card */}
          <div className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-8 border border-slate-200 hover:shadow-xl transition-all relative overflow-hidden group flex flex-col">
            <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
              Most Used by Students
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">AI Flashcards</h3>
            <p className="text-slate-500 mb-6">
              Teachers assign chapter readings, students get auto-generated flashcards for review. Uses spaced repetition (FSRS algorithm) to schedule reviews at optimal intervals. Tracks which students need extra help.
            </p>

            {/* Interactive Flip Flashcards */}
            <FlashcardStack />

            {/* Hidden until demo page is ready
            <div className="mt-auto pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">FSRS-powered spaced repetition</span>
                <span className="text-slate-900 font-semibold">→ See Demo</span>
              </div>
            </div>
            */}
          </div>

          {/* Mind Maps */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Mind Maps</h3>
            <p className="text-sm text-slate-500 mb-4">
              Auto-generate concept maps from course materials. Helps students visualize how topics connect across units. Perfect for science and history classes.
            </p>

            {/* Mind Map Visualization - Circular Nodes */}
            <div className="relative h-40 flex items-center justify-center">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 285.74999 285.75"
                version="1.1"
                id="svg1"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <g id="layer1">
                  <circle
                    style={{fill:"#0077ff", stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1"
                    cx="68.974358"
                    cy="142.99144"
                    r="11.700001" />
                  <circle
                    style={{fill:"#3b93f8", fillOpacity:1, stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1-0"
                    cx="122.06098"
                    cy="95.482895"
                    r="11.700001" />
                  <circle
                    style={{fill:"#3b93f8", fillOpacity:1, stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1-0-9"
                    cx="124.3717"
                    cy="187.92484"
                    r="11.700001" />
                  <circle
                    style={{fill:"#0077ff", fillOpacity:1, stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1-0-9-0"
                    cx="176.15579"
                    cy="59.491108"
                    r="11.700001" />
                  <circle
                    style={{fill:"#0077ff", fillOpacity:1, stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1-0-9-0-9"
                    cx="180.4395"
                    cy="122.22087"
                    r="11.700001" />
                  <path
                    style={{fill:"none", stroke:"#334155", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    d="m 41.493027,127.78834 c 0.597501,-11.24145 1.194991,-22.48267 6.941127,-28.562409 5.746137,-6.079738 16.64046,-6.997507 27.535,-7.915295"
                    id="path2"
                    transform="translate(33.601714,4.5820519)" />
                  <path
                    style={{fill:"none", stroke:"#334155", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    d="m 41.493027,127.78834 c 0.927502,-7.01145 1.854984,-14.02275 7.451117,-18.36246 5.596134,-4.3397 15.860471,-6.00745 26.12501,-7.67524"
                    id="path2-9"
                    transform="translate(88.755769,-40.992753)" />
                  <path
                    style={{fill:"none", stroke:"#334155", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    d="m 37.420092,133.13407 c 0.999411,9.78159 1.998801,19.56298 8.183769,25.29727 6.184968,5.73429 17.555016,7.42102 28.925293,9.10778"
                    id="path2-2"
                    transform="translate(37.64428,21.29218)" />
                  <path
                    style={{fill:"none", stroke:"#334155", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    d="m 37.420092,133.13407 c 1.296397,4.98741 2.592763,9.9747 8.629239,13.33307 6.036476,3.35836 16.812564,5.08751 27.588869,6.8167"
                    id="path2-2-6"
                    transform="translate(94.155276,-29.909129)" />
                  <circle
                    style={{fill:"#0077ff", fillOpacity:1, stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1-0-9-0-5"
                    cx="178.20134"
                    cy="151.44168"
                    r="11.700001" />
                  <circle
                    style={{fill:"#0077ff", fillOpacity:1, stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1-0-9-0-9-9"
                    cx="184.77608"
                    cy="224.09921"
                    r="11.700001" />
                  <path
                    style={{fill:"none", stroke:"#334155", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    d="m 41.493027,127.78834 c 0.927502,-7.01145 1.854984,-14.02275 7.451117,-18.36246 5.596134,-4.3397 15.860471,-6.00745 26.12501,-7.67524"
                    id="path2-9-6"
                    transform="translate(90.80133,50.957821)" />
                  <path
                    style={{fill:"none", stroke:"#334155", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    d="m 37.420092,133.13407 c 0.787279,7.10873 1.57454,14.2173 8.035286,18.76363 6.460747,4.54633 18.594455,6.53003 30.728406,8.51378"
                    id="path2-2-6-5"
                    transform="translate(96.200837,62.041445)" />
                </g>
              </svg>
            </div>

            <div className="mt-4 text-xs text-slate-400">
              Great for visual learners
            </div>
          </div>

          {/* Chat with Docs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Chat with Docs</h3>
            <p className="text-sm text-slate-500 mb-4">
              Students can ask questions about assigned readings 24/7. AI tutor trained on your course materials provides instant help with homework and concepts.
            </p>

            {/* Chat with Streaming Response */}
            <StreamingChat />

            <div className="mt-4 text-xs text-slate-400">
              Reduces after-hours questions
            </div>
          </div>

          {/* Smart Notes */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Notes</h3>
            <p className="text-sm text-slate-500 mb-4">
              AI extracts key points from lecture recordings or PDFs. Students get organized, structured notes automatically formatted by topic.
            </p>

            {/* Progressive Notes Reveal */}
            <ProgressiveNotes />

            <div className="mt-4 text-xs text-slate-400">
              Helps struggling note-takers
            </div>
          </div>

          {/* Quiz Gen */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Quiz Gen</h3>
            <p className="text-sm text-slate-500 mb-4">
              Teachers create practice quizzes from any document in 2 minutes. Multiple choice, true/false, fill-in-blank. Auto-graded with instant feedback.
            </p>

            {/* Interactive Quiz */}
            <InteractiveQuiz />

            <div className="mt-4 text-xs text-slate-400">
              Auto-generated from course materials
            </div>
          </div>

          {/* Knowledge Graphs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Knowledge Graphs</h3>
            <p className="text-sm text-slate-500 mb-4">
              Visualize relationships between topics across units. Shows students the big picture of how concepts build on each other throughout the semester.
            </p>

            {/* Knowledge Graph - Rectangular Nodes */}
            <div className="relative h-40 flex items-center justify-center mt-4">
              <svg viewBox="0 0 285.75 285.75" className="w-full h-full">
                <rect x="114.48" y="122.04" width="55.8" height="33.84" fill="#0077FF" stroke="#0077FF" strokeWidth="1" rx="4"/>
                <rect x="107.82" y="41.81" width="55.8" height="33.84" fill="#0077FF" stroke="#0077FF" strokeWidth="1" rx="4"/>
                <rect x="208.93" y="73.51" width="55.8" height="33.84" fill="#0077FF" stroke="#0077FF" strokeWidth="1" rx="4"/>
                <rect x="217.70" y="176.84" width="55.8" height="33.84" fill="#0077FF" stroke="#0077FF" strokeWidth="1" rx="4"/>
                <rect x="154.23" y="233.32" width="55.8" height="33.84" fill="#0077FF" stroke="#0077FF" strokeWidth="1" rx="4"/>
                <rect x="65.42" y="202.71" width="55.8" height="33.84" fill="#0077FF" stroke="#0077FF" strokeWidth="1" rx="4"/>
                <rect x="17.48" y="117.61" width="55.8" height="33.84" fill="#0077FF" stroke="#0077FF" strokeWidth="1" rx="4"/>
                <path d="M 142.17 121.55 L 137.34 75.73" stroke="#dc2626" strokeWidth="1"/>
                <path d="M 208.36 86.42 L 170.30 138.35" stroke="#dc2626" strokeWidth="1"/>
                <path d="M 170.81 139.94 L 216.76 194.86" stroke="#dc2626" strokeWidth="1"/>
                <path d="M 145.08 156.24 L 180.54 232.02" stroke="#dc2626" strokeWidth="1"/>
                <path d="M 91.44 201.60 L 143.10 156.24" stroke="#dc2626" strokeWidth="1"/>
                <path d="M 73.62 133.56 L 113.94 138.96" stroke="#dc2626" strokeWidth="1"/>
              </svg>
            </div>

            <div className="mt-4 text-xs text-slate-400">
              Popular in STEM classes
            </div>
          </div>
        </div>

        {/* Capability Highlights */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">6</div>
              <div className="text-sm text-slate-600">AI-powered tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">Any</div>
              <div className="text-sm text-slate-600">Subject or grade level</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">FSRS</div>
              <div className="text-sm text-slate-600">Spaced repetition engine</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">24/7</div>
              <div className="text-sm text-slate-600">AI tutor availability</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="/institutional-demo" className="bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-10 rounded-full transition-all shadow-xl transform hover:-translate-y-0.5 hover:shadow-2xl inline-block">
            Schedule a Demo for Your School
          </a>
          <p className="text-sm text-slate-500 mt-4">See how Mentron works in your classroom. 30-minute demo.</p>
        </div>
      </div>
    </section>
  )
}