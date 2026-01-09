"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section id="hero" className="relative pt-12 pb-16 lg:pt-24 lg:pb-24 px-6 lg:px-16 bg-white">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-up max-w-2xl">
          <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
            Your AI Study Partner That Actually <span className="bg-gradient-to-r from-[#0077FF] to-[#00D4FF] text-transparent bg-clip-text">Understands You</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-500 leading-relaxed max-w-lg">
            Adaptive learning paths, AI-generated study materials, and instant feedback—personalized for
            your goals. Join 1,200+ students learning smarter, not harder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              className="bg-primary hover:bg-primary-dark text-white text-base font-semibold py-6 px-8 rounded-full transition-all shadow-xl shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5"
            >
              Start Learning Free
            </Button>
            <Button
              variant="ghost"
              className="text-slate-600 hover:text-primary hover:bg-transparent font-medium py-6 px-6 flex items-center gap-2 transition-colors text-base"
            >
              See How It Works
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative animate-fade-up lg:h-[600px] flex items-center justify-center" style={{ animationDelay: "0.2s" }}>
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden w-full max-w-md mx-auto z-10">
            <div className="border-b border-slate-100 p-4 flex justify-between items-center bg-slate-50/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-xs font-medium text-slate-400">Mentron Dashboard</div>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-5 text-white shadow-lg">
                <div className="text-xs font-medium mb-1 text-blue-100">Today's Goal</div>
                <div className="font-bold text-lg">Master Thermodynamics</div>
                <div className="w-full bg-black/20 rounded-full h-1.5 mt-3">
                  <div className="bg-white rounded-full h-1.5" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50">
                  <div className="text-xs text-slate-400 font-bold uppercase mb-2">Weakness</div>
                  <div className="flex items-center gap-2 text-danger font-semibold text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Calculus
                  </div>
                </div>
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50">
                  <div className="text-xs text-slate-400 font-bold uppercase mb-2">Strength</div>
                  <div className="flex items-center gap-2 text-success font-semibold text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Algebra
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
