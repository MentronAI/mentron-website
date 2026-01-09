"use client"

import { FileText, Users, AlertCircle, ArrowRight, X } from "lucide-react"

export default function ProblemSection() {
  return (
    <section id="pain-points" className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-display mb-4 tracking-tight">
            Why Traditional Learning Fails Most Students
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            The old way of studying works for the average student. But you aren't average.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Overwhelming Content */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 relative hover:shadow-xl hover:-translate-y-1 hover:border-primary transition-all duration-300">
            <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-red-50 text-danger">
              OVERWHELMING
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-danger flex items-center justify-center mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">
              Drowning in Content Chaos
            </h3>
            <p className="text-slate-500 leading-relaxed mb-6">
              84% of students feel lost in endless PDFs and textbooks with no clear roadmap or
              prioritization. You study for hours but still don't know what to focus on first.
            </p>
            <div className="bg-slate-50 rounded-xl p-5 h-32 flex items-end justify-around gap-3">
              <div className="flex-1 h-full bg-gradient-to-t from-danger to-red-400 rounded-lg relative">
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">
                  Total
                </div>
              </div>
              <div className="flex-1 h-[30%] bg-gradient-to-t from-success to-emerald-400 rounded-lg relative">
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">
                  Needed
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: One-Size-Fits-All */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 relative hover:shadow-xl hover:-translate-y-1 hover:border-primary transition-all duration-300">
            <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-50 text-warning">
              ONE-SIZE-FITS-ALL
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-warning flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">
              Generic Courses Ignore Your Reality
            </h3>
            <p className="text-slate-500 leading-relaxed mb-6">
              Everyone learns differently. Pre-made courses move at one speed—too slow if you know
              basics, too fast if you have gaps. You end up either bored or confused.
            </p>
            <div className="bg-slate-50 rounded-xl p-5 h-32 flex items-center justify-around gap-4">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-danger mx-auto mb-2"></div>
                <div className="text-xs font-semibold text-danger">Lost</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-success mx-auto mb-2"></div>
                <div className="text-xs font-semibold text-success">OK</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-slate-400 mx-auto mb-2"></div>
                <div className="text-xs font-semibold text-slate-500">Bored</div>
              </div>
            </div>
          </div>

          {/* Card 3: No Feedback */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 relative hover:shadow-xl hover:-translate-y-1 hover:border-primary transition-all duration-300">
            <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-red-50 text-danger">
              NO FEEDBACK
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-danger flex items-center justify-center mb-6">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">
              You Don't Know What You Don't Know
            </h3>
            <p className="text-slate-500 leading-relaxed mb-6">
              Without instant correction, you keep repeating the same mistakes. By the time exam
              results come, it's too late to fix foundational gaps.
            </p>
            <div className="bg-slate-50 rounded-xl p-5 h-32 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-white rounded-lg text-sm font-semibold text-slate-900 shadow-sm">
                  Study
                </div>
                <ArrowRight className="text-slate-400 w-4 h-4" />
                <div className="px-4 py-2 bg-white rounded-lg text-sm font-semibold text-danger shadow-sm relative">
                  ???
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="text-danger w-3 h-3" />
                  </div>
                </div>
                <ArrowRight className="text-slate-400 w-4 h-4" />
                <div className="px-4 py-2 bg-white rounded-lg text-sm font-semibold text-danger shadow-sm">
                  Surprise!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
