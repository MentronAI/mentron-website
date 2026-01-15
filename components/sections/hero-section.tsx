"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Brain, 
  Target, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  MessageSquare,
  Network,
  Users,
  PieChart,
  BookOpen,
  TrendingUp,
  AlertCircle,
  Clock,
  Layout,
  FileText,
  Sparkles
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// --- SCREEN 1: STUDENT DASHBOARD ---
const StudentDashboard = () => (
  <div className="p-4 space-y-3 font-geist overflow-y-auto h-full scrollbar-hide">
    <div className="flex items-center justify-between mb-1">
      <div>
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">Alex's Dashboard</h3>
        <p className="text-[10px] text-slate-500 font-medium">12 Day Learning Streak 🔥</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold">
        AK
      </div>
    </div>

    {/* Today's Focus */}
    <div className="bg-primary rounded-xl p-3 text-white shadow-lg shadow-primary/20 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] opacity-80 uppercase tracking-widest font-bold">Priority Goal</span>
          <Target className="w-3 h-3 opacity-80" />
        </div>
        <div className="text-[11px] font-bold mb-2">Master Quantum Mechanics</div>
        <div className="w-full bg-white/20 rounded-full h-1.5">
          <div className="bg-white rounded-full h-1.5 transition-all duration-1000" style={{ width: "78%" }}></div>
        </div>
        <div className="flex justify-between mt-1.5 text-[8px] font-medium opacity-90 tracking-wide">
            <span>4 of 6 modules</span>
            <span>78%</span>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
    </div>

    {/* Weekly Hours */}
    <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-slate-900 flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-primary" /> Weekly Study Hours
        </span>
        <span className="text-[9px] font-bold text-emerald-500">+12%</span>
      </div>
      <div className="flex items-end justify-between h-12 gap-1.5 px-1">
        {[40, 65, 35, 85, 45, 30, 55].map((h, i) => (
          <div key={i} className="flex-1 bg-slate-50 rounded-t-[2px] relative h-full">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="absolute bottom-0 w-full bg-primary/80 rounded-t-[2px]" 
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1.5 text-[7px] font-bold text-slate-400 px-0.5 uppercase tracking-tighter">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
      </div>
    </div>

    {/* Course Progress */}
    <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center text-primary">
                    <BookOpen className="w-3 h-3" />
                </div>
                <span className="text-[9px] font-bold text-slate-700">Physics 101</span>
            </div>
            <div className="text-[10px] font-bold mb-1">84% <span className="text-[8px] text-slate-400 font-normal">avg</span></div>
            <div className="w-full bg-slate-200 rounded-full h-1">
                <div className="bg-primary rounded-full h-1" style={{ width: '84%' }}></div>
            </div>
        </div>
        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded bg-purple-100 flex items-center justify-center text-purple-600">
                    <Layout className="w-3 h-3" />
                </div>
                <span className="text-[9px] font-bold text-slate-700">Calculus II</span>
            </div>
            <div className="text-[10px] font-bold mb-1">62% <span className="text-[8px] text-rose-400 font-normal">Due soon</span></div>
            <div className="w-full bg-slate-200 rounded-full h-1">
                <div className="bg-rose-400 rounded-full h-1" style={{ width: '62%' }}></div>
            </div>
        </div>
    </div>

    {/* REFINED: 2x2 MILSTONE GRID */}
    <div className="grid grid-cols-2 gap-2">
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <CheckCircle2 className="w-3 h-3" />
            </div>
            <div className="min-w-0">
                <div className="text-[8px] font-bold text-slate-900 truncate">Lab Report</div>
                <div className="text-[7px] text-emerald-600 font-medium">4h left</div>
            </div>
        </div>
        <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0">
                <Clock className="w-3 h-3" />
            </div>
            <div className="min-w-0">
                <div className="text-[8px] font-bold text-slate-900 truncate">Math Quiz</div>
                <div className="text-[7px] text-amber-600 font-medium">Tomorrow</div>
            </div>
        </div>
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center text-white shrink-0">
                <Users className="w-3 h-3" />
            </div>
            <div className="min-w-0">
                <div className="text-[8px] font-bold text-slate-900 truncate">Group Sync</div>
                <div className="text-[7px] text-blue-600 font-medium">6:00 PM</div>
            </div>
        </div>
        <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-rose-500 flex items-center justify-center text-white shrink-0">
                <FileText className="w-3 h-3" />
            </div>
            <div className="min-w-0">
                <div className="text-[8px] font-bold text-slate-900 truncate">Essay Draft</div>
                <div className="text-[7px] text-rose-600 font-medium">2 days</div>
            </div>
        </div>
    </div>
  </div>
)

// --- SCREEN 2: AI TOOLS (REFINED) ---
const LearningTools = () => (
  <div className="p-4 space-y-3 font-geist h-full overflow-y-auto scrollbar-hide">
    <div className="flex items-center justify-between mb-1">
      <h3 className="text-sm font-bold text-slate-900 tracking-tight">AI Study Suite</h3>
      <div className="flex gap-1">
        <Sparkles className="w-3 h-3 text-primary animate-pulse" />
        <span className="text-[9px] font-bold text-primary uppercase tracking-wider">Neural Engine Active</span>
      </div>
    </div>

    {/* AI Tutor Chat */}
    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 space-y-2.5">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
          <Brain className="w-3.5 h-3.5" />
        </div>
        <span className="text-[10px] font-bold text-slate-900">Mental AI Assistant</span>
      </div>
      <div className="space-y-2">
        <div className="bg-white rounded-lg p-2 shadow-sm border border-blue-50 mr-4">
          <p className="text-[9px] text-slate-600 leading-relaxed italic">"Explain entropy in thermodynamics."</p>
        </div>
        <div className="bg-primary text-white rounded-lg p-2 shadow-md ml-4 border border-primary/20">
          <p className="text-[9px] leading-relaxed font-medium">Entropy measures the disorder of a system. It always increases in isolated processes...</p>
        </div>
      </div>
    </div>

    {/* AI Generation Tools */}
    <div className="grid grid-cols-2 gap-3">
      {/* REVERTED: Label back to Mind Map & Used SVG paths */}
      <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm hover:border-primary transition-all group">
        <div className="flex items-center gap-1.5 mb-2">
          <Network className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-[9px] font-bold text-slate-900 uppercase tracking-tighter">Mind Map</span>
        </div>
        <div className="h-14 bg-slate-50/50 rounded-lg flex items-center justify-center overflow-hidden border border-slate-100 p-1">
            <svg 
                viewBox="0 0 285.74999 285.75" 
                className="w-full h-full transform transition-transform group-hover:scale-110 duration-500"
            >
                {/* Core node */}
                <circle cx="68.974" cy="142.991" r="15" fill="#0000ff" stroke="#fff" strokeWidth="2" />
                {/* Branches */}
                <circle cx="122.061" cy="95.483" r="12" fill="#15a6ff" stroke="#fff" strokeWidth="2" />
                <circle cx="124.372" cy="187.925" r="12" fill="#15a6ff" stroke="#fff" strokeWidth="2" />
                {/* Leaf nodes */}
                <circle cx="176.156" cy="59.491" r="10" fill="#0077ff" stroke="#fff" strokeWidth="2" />
                <circle cx="180.44" cy="122.221" r="10" fill="#0077ff" stroke="#fff" strokeWidth="2" />
                <circle cx="178.201" cy="151.442" r="10" fill="#0077ff" stroke="#fff" strokeWidth="2" />
                <circle cx="184.776" cy="224.099" r="10" fill="#0077ff" stroke="#fff" strokeWidth="2" />
                {/* Connections */}
                <g stroke="#cbd5e1" strokeWidth="2" fill="none" opacity="0.6">
                    <path d="M 75 135 Q 95 100 115 100" />
                    <path d="M 75 150 Q 95 185 115 185" />
                    <path d="M 130 90 Q 150 65 170 65" />
                    <path d="M 130 100 Q 150 120 170 120" />
                    <path d="M 130 180 Q 150 155 170 155" />
                    <path d="M 130 195 Q 155 220 175 220" />
                </g>
            </svg>
        </div>
      </div>

      {/* Refined Flashcards with #0077FF 50% opacity */}
      <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
        <div className="flex items-center gap-1.5 mb-2">
          <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
          <span className="text-[9px] font-bold text-slate-900 uppercase tracking-tighter">Flashcards</span>
        </div>
        <div className="flex gap-1.5">
            {[1,2,3,4].map(i => (
                <div 
                    key={i} 
                    className="flex-1 h-8 rounded-md transition-all duration-300 hover:scale-105" 
                    style={{ backgroundColor: 'rgba(0, 119, 255, 0.5)' }} 
                />
            ))}
        </div>
        <div className="mt-2 text-[8px] font-bold text-slate-400 text-center uppercase tracking-tighter">42 Active Cards</div>
      </div>
    </div>

    {/* Smart Summary Insight */}
    <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-xl shadow-slate-200/50">
        <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <FileText className="w-3 h-3" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-900">Lecture Summary</span>
            </div>
            <span className="text-[8px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">98% Clarity</span>
        </div>
        <div className="space-y-1.5 mb-3">
            <div className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1" />
                <p className="text-[9px] text-slate-600 leading-tight">Key takeaway: Systems tend toward maximum entropy.</p>
            </div>
            <div className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1" />
                <p className="text-[9px] text-slate-600 leading-tight">Concept: Isothermal vs Adiabatic expansion models.</p>
            </div>
        </div>
        <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-[9px] font-bold transition-all hover:bg-black shadow-lg">
            Generate Deep Note →
        </button>
    </div>
  </div>
)

// --- SCREEN 3: FACULTY ANALYTICS ---
const FacultyAnalytics = () => (
  <div className="p-4 space-y-3 font-geist h-full overflow-y-auto scrollbar-hide">
    <div className="flex items-center justify-between mb-1">
      <div>
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">Faculty Intelligence</h3>
        <p className="text-[10px] text-slate-500 font-medium">Institutional Analytics Dashboard</p>
      </div>
      <Users className="w-4 h-4 text-slate-400" />
    </div>

    <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
            <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Avg. Class Score</div>
            <div className="text-xl font-bold text-slate-900">84<span className="text-xs text-primary">%</span></div>
            <div className="text-[8px] text-emerald-500 font-bold flex items-center gap-0.5 mt-1">
                <TrendingUp className="w-2.5 h-2.5" /> +3.5% this month
            </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
            <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Student Retention</div>
            <div className="text-xl font-bold text-slate-900">92<span className="text-xs text-primary">%</span></div>
            <div className="text-[8px] text-primary font-bold mt-1">Status: Excellent</div>
        </div>
    </div>

    {/* Distribution Chart */}
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 shadow-inner">
        <h4 className="text-[10px] font-bold text-slate-900 mb-3 flex justify-between">
            Performance Distribution
            <span className="font-normal text-slate-400 uppercase tracking-tighter">142 Students</span>
        </h4>
        <div className="space-y-2">
            {[
                { label: '86-100', val: 85, color: 'bg-emerald-500' },
                { label: '71-85', val: 65, color: 'bg-primary' },
                { label: '61-70', val: 35, color: 'bg-amber-500' },
                { label: '0-60', val: 15, color: 'bg-rose-500' }
            ].map((bar, i) => (
                <div key={i} className="flex items-center gap-2">
                    <span className="text-[8px] text-slate-500 w-8 font-medium">{bar.label}</span>
                    <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${bar.val}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full ${bar.color} rounded-full`} 
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>

    {/* Strengths & Actionable Insights */}
    <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-slate-900 uppercase">Top Academic Strengths</span>
            <PieChart className="w-3 h-3 text-slate-300" />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="text-[8px] font-bold text-emerald-600 uppercase mb-0.5">Strongest</div>
                <div className="text-[10px] font-bold text-slate-900 truncate">Linear Algebra</div>
            </div>
            <div className="p-2 bg-rose-50 rounded-lg border border-rose-100">
                <div className="text-[8px] font-bold text-rose-600 uppercase mb-0.5">Critical Review</div>
                <div className="text-[10px] font-bold text-slate-900 truncate">Fluid Dynamics</div>
            </div>
        </div>

        {/* Actionable Insight Section */}
        <div className="pt-2.5 border-t border-slate-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-3 h-3 text-amber-500" />
                    <span className="text-[9px] font-bold text-slate-700 uppercase">At Risk Students</span>
                </div>
                <span className="text-[10px] font-bold text-rose-500">12 flagged</span>
            </div>
            <div className="mt-2 flex gap-1">
                {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-100 group relative">
                        {i < 3 && <div className="absolute inset-0 bg-rose-400 rounded-full animate-pulse" />}
                    </div>
                ))}
                <span className="text-[8px] text-slate-400 ml-auto font-medium">View students →</span>
            </div>
        </div>
    </div>
  </div>
)

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const screens = [
    { title: "Student Experience", component: <StudentDashboard /> },
    { title: "AI Study Workspace", component: <LearningTools /> },
    { title: "Institutional Data", component: <FacultyAnalytics /> }
  ]

  return (
    <section id="hero" className="relative pt-12 pb-16 lg:pt-24 lg:pb-24 px-6 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-up max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-primary text-sm font-bold animate-fadeInUp">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: Mentron 2.0 is live
          </div>
          
          <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
            Your AI Study Partner That Actually <span className="text-gradient">Understands You</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-500 leading-relaxed max-w-lg font-geist">
            Adaptive learning paths, AI-generated study materials, and instant feedback—personalized for
            your goals. Join 1,200+ students learning smarter, not harder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              className="bg-primary hover:bg-primary-dark text-white text-base font-semibold py-6 px-10 rounded-full transition-all shadow-xl shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5"
            >
              Start Learning Free
            </Button>
            <Button
              variant="ghost"
              className="text-slate-600 hover:text-primary hover:bg-transparent font-bold py-6 px-6 flex items-center gap-2 transition-colors text-base font-geist"
            >
              See How It Works
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 font-medium font-geist">
              <span className="text-slate-900 font-bold">1,200+</span> educators & students joined this week
            </p>
          </div>
        </div>

        <div className="relative animate-fade-up lg:h-[650px] flex items-center justify-center" style={{ animationDelay: "0.2s" }}>
          {/* Decorative background blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/4 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sky-400/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative bg-white rounded-3xl shadow-[0_32px_80px_-20px_rgba(15,23,42,0.15)] border border-slate-200 overflow-hidden w-full max-w-sm lg:max-w-md mx-auto z-10 transition-all duration-500">
            {/* Window Header */}
            <div className="border-b border-slate-100 p-4 flex justify-between items-center bg-slate-50/50">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-geist">
                {screens[activeIndex].title}
              </div>
              <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center">
                <div className="w-1 h-1 bg-slate-400 rounded-full" />
              </div>
            </div>

            {/* Content Area */}
            <div className="relative h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {screens[activeIndex].component}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Progress Bar / Dots */}
            <div className="p-4 border-t border-slate-50 flex justify-center items-center gap-2 bg-slate-50/30">
                {screens.map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-1.5 transition-all duration-300 rounded-full ${activeIndex === i ? 'w-8 bg-primary' : 'w-2 bg-slate-200'}`}
                    />
                ))}
            </div>
          </div>

          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 hidden xl:flex bg-white p-4 rounded-2xl shadow-xl border border-slate-100 items-center gap-3 z-20"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Average GPA</div>
                <div className="text-lg font-bold text-slate-900">3.8 / 4.0 <span className="text-xs font-medium text-slate-500">up 0.4</span></div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-10 -left-10 hidden xl:flex bg-white p-4 rounded-2xl shadow-xl border border-slate-100 items-center gap-3 z-20"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center text-white">
                <Brain className="w-6 h-6" />
            </div>
            <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Cognitive Load</div>
                <div className="text-lg font-bold text-slate-900">Optimal <span className="text-xs font-medium text-emerald-500">Ready</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
