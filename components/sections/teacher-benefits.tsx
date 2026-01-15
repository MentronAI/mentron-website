"use client"

import { Check } from "lucide-react"

export default function TeacherBenefits() {
  return (
    <section id="teacher-solutions" className="py-24 px-6 lg:px-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-display mb-4 tracking-tight">
            Optimizing Needs of 21st Century Teachers
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                <div className="w-full sm:w-32 text-xs sm:text-sm text-slate-600 font-bold sm:font-medium uppercase sm:normal-case tracking-wider sm:tracking-normal">Grading</div>
                <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-danger to-red-400 rounded-full flex items-center justify-end pr-3 transition-all duration-1000" style={{ width: "52%" }}>
                    <span className="text-xs font-bold text-white">11.6h</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                <div className="w-full sm:w-32 text-xs sm:text-sm text-slate-600 font-bold sm:font-medium uppercase sm:normal-case tracking-wider sm:tracking-normal">Planning</div>
                <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-warning to-amber-400 rounded-full flex items-center justify-end pr-3 transition-all duration-1000" style={{ width: "43%" }}>
                    <span className="text-xs font-bold text-white">9.7h</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                <div className="w-full sm:w-32 text-xs sm:text-sm text-slate-600 font-bold sm:font-medium uppercase sm:normal-case tracking-wider sm:tracking-normal">Admin Work</div>
                <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-warning to-amber-400 rounded-full flex items-center justify-end pr-3 transition-all duration-1000" style={{ width: "38%" }}>
                    <span className="text-xs font-bold text-white">8.5h</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                <div className="w-full sm:w-32 text-xs sm:text-sm text-slate-600 font-bold sm:font-medium uppercase sm:normal-case tracking-wider sm:tracking-normal">Communication</div>
                <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-end pr-3 transition-all duration-1000" style={{ width: "19%" }}>
                    <span className="text-xs font-bold text-slate-700">4.2h</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                <div className="w-full sm:w-32 text-xs sm:text-sm text-slate-600 font-bold sm:font-medium uppercase sm:normal-case tracking-wider sm:tracking-normal">Instruction</div>
                <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-success to-emerald-400 rounded-full flex items-center justify-end pr-3 transition-all duration-1000" style={{ width: "100%" }}>
                    <span className="text-xs font-bold text-white">22.4h</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                <div className="w-full sm:w-32 text-xs sm:text-sm text-slate-600 font-bold sm:font-medium uppercase sm:normal-case tracking-wider sm:tracking-normal">Collaboration</div>
                <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full flex items-center justify-end pr-3 transition-all duration-1000" style={{ width: "18%" }}>
                    <span className="text-xs font-bold text-white">4h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Solution Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Solution 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="text-primary font-bold text-sm mb-2">Save 11 hrs/week</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Grading Automated</h4>
              <p className="text-sm text-slate-500 mb-3">Automated grading for quizzes frees up hours of manual review.</p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li className="flex items-center gap-2"><Check className="text-success w-3.5 h-3.5" /> Instant AI feedback</li>
                <li className="flex items-center gap-2"><Check className="text-success w-3.5 h-3.5" /> Plagiarism detection</li>
              </ul>
            </div>

            {/* Solution 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="text-primary font-bold text-sm mb-2">40% faster planning</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Planning Optimized</h4>
              <p className="text-sm text-slate-500 mb-3">Create lesson plans 5x faster with AI-assisted tools.</p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li className="flex items-center gap-2"><Check className="text-success w-3.5 h-3.5" /> Auto-generate slides</li>
                <li className="flex items-center gap-2"><Check className="text-success w-3.5 h-3.5" /> Curriculum alignment</li>
              </ul>
            </div>

            {/* Solution 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="text-primary font-bold text-sm mb-2">2-4 hrs back/day</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Admin Eliminated</h4>
              <p className="text-sm text-slate-500 mb-3">Live performance reporting handles paperwork automatically.</p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li className="flex items-center gap-2"><Check className="text-success w-3.5 h-3.5" /> One-click attendance</li>
                <li className="flex items-center gap-2"><Check className="text-success w-3.5 h-3.5" /> Auto progress reports</li>
              </ul>
            </div>

            {/* Solution 4 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="text-primary font-bold text-sm mb-2">70% time saved</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Communication Streamlined</h4>
              <p className="text-sm text-slate-500 mb-3">Automated parent updates and student notifications.</p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li className="flex items-center gap-2"><Check className="text-success w-3.5 h-3.5" /> Auto progress updates</li>
                <li className="flex items-center gap-2"><Check className="text-success w-3.5 h-3.5" /> Parent portal access</li>
              </ul>
            </div>

            {/* Solution 5 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="text-success font-bold text-sm mb-2">22+ hrs for teaching</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Instruction Amplified</h4>
              <p className="text-sm text-slate-500 mb-3">Maximize time on direct student engagement.</p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li className="flex items-center gap-2"><Check className="text-success w-3.5 h-3.5" /> Real-time engagement</li>
                <li className="flex items-center gap-2"><Check className="text-success w-3.5 h-3.5" /> Personalized paths</li>
              </ul>
            </div>

            {/* Solution 6 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="text-primary font-bold text-sm mb-2">3x peer interaction</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Collaboration Enhanced</h4>
              <p className="text-sm text-slate-500 mb-3">Facilitate deeper peer-to-peer learning experiences.</p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li className="flex items-center gap-2"><Check className="text-success w-3.5 h-3.5" /> Group projects</li>
                <li className="flex items-center gap-2"><Check className="text-success w-3.5 h-3.5" /> Peer review system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
