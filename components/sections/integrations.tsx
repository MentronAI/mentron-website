"use client"

import { CheckCircle, Rocket } from "lucide-react"
import Image from "next/image"

export default function Integrations() {
  return (
    <section id="integrations" className="py-16 px-6 lg:px-16 bg-[#F8F7F5]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-display mb-4 tracking-tight">
            Plays Well With Your Existing LMS
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            Mentron integrates with the platforms your school already uses. Connect Canvas, Google Classroom, or Moodle—no need to replace your existing LMS or retrain staff.
          </p>
        </div>

        {/* Live Integrations */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Available Today
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Canvas LMS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 hover:border-primary transition-all duration-300">
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-5 p-2">
                <Image 
                  src="/canvas-icon.webp" 
                  alt="Canvas LMS" 
                  width={48} 
                  height={48} 
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">
                Canvas LMS
              </h4>
              <p className="text-sm text-slate-500">
                Deep Canvas integration for colleges and universities. Bi-directional sync of courses, student rosters, assignments, and grades. Embed Mentron tools directly in Canvas pages.
              </p>
            </div>

            {/* Google Drive */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 hover:border-primary transition-all duration-300">
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-5 p-2">
                <Image 
                  src="/google-drive-icon-2020.webp" 
                  alt="Google Drive" 
                  width={48} 
                  height={48} 
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">
                Google Drive
              </h4>
              <p className="text-sm text-slate-500">
                Teachers import course materials from shared Google Drive folders. Auto-sync syllabi, lecture slides, and study guides. Preserve folder structure for easy organization.
              </p>
            </div>

            {/* Anki */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 hover:border-primary transition-all duration-300">
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-5 p-2">
                <Image 
                  src="/anki-icon.webp" 
                  alt="Anki" 
                  width={48} 
                  height={48} 
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">
                Anki
              </h4>
              <p className="text-sm text-slate-500">
                Import existing flashcard decks directly into Mentron. Preserve your study history and scheduling while gaining AI-powered features.
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon Integrations */}
        <div>
          <div className="flex items-center justify-center mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1">
              <Rocket className="w-3 h-3" />
              In Development
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Moodle */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center opacity-70 hover:opacity-100 transition-all duration-300">
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                <div className="text-xl font-bold text-slate-400 font-display">M</div>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">
                Moodle
              </h4>
              <p className="text-sm text-slate-500 mb-3">
                Full Moodle LMS integration for universities. Install as a plugin to embed Mentron study tools directly in course pages with complete activity tracking.
              </p>
              <div className="inline-block px-3 py-1 bg-amber-50 text-warning text-xs font-semibold rounded-full">
                In Development
              </div>
            </div>

            {/* Google Classroom */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center opacity-70 hover:opacity-100 transition-all duration-300">
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                <div className="text-lg font-bold text-slate-400 font-display">GC</div>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">
                Google Classroom
              </h4>
              <p className="text-sm text-slate-500 mb-3">
                Perfect for K-12 schools using Google Workspace. Sync class rosters, import assignments. Post AI-generated quizzes back to Classroom with one click.
              </p>
              <div className="inline-block px-3 py-1 bg-amber-50 text-warning text-xs font-semibold rounded-full">
                In Development
              </div>
            </div>

            {/* xAPI / SCORM */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center opacity-70 hover:opacity-100 transition-all duration-300">
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                <div className="text-sm font-bold text-slate-400 font-display">xAPI</div>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">
                xAPI / SCORM
              </h4>
              <p className="text-sm text-slate-500 mb-3">
                Standards-compliant learning data tracking. Export student performance data to any LMS that supports xAPI or SCORM 1.2/2004.
              </p>
              <div className="inline-block px-3 py-1 bg-amber-50 text-warning text-xs font-semibold rounded-full">
                In Development
              </div>
            </div>
          </div>
        </div>

        {/* Hidden until integrations are ready
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 mb-4">
            We focus on Canvas, Google Classroom, and Moodle—platforms widely used across Indian schools and colleges.
          </p>
          <a href="mailto:contact@mentron.in" className="text-primary font-semibold hover:underline">
            Request an Integration →
          </a>
        </div>
        */}
      </div>
    </section>
  )
}
