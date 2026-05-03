"use client"

import { ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
    <section id="cta" className="py-20 px-6 lg:px-8 bg-page">
      <div className="max-w-7xl mx-auto text-left">
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-display">
          Ready to get started?
        </h2>
        <p className="mt-4 text-lg text-slate-500 max-w-xl">
          Start free today, or contact us to design a custom package for your institution.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/institutional-demo"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white text-base font-semibold py-3.5 px-8 rounded-lg transition-all"
          >
            Get Early Access
            <ArrowRight size={16} />
          </a>
          <a
            href="/institutional-demo"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-primary text-slate-700 hover:text-primary text-base font-semibold py-3.5 px-8 rounded-lg transition-all"
          >
            Book a Demo
          </a>
        </div>

        <p className="mt-8 text-sm text-slate-400">
          No credit card required &middot; Free to start &middot; Connects with Canvas, Google Drive &amp; more
        </p>
      </div>
    </section>
  )
}
