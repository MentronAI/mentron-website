"use client"

import { ArrowRight, BarChart3, Zap } from "lucide-react"

const infoItems = [
  {
    icon: BarChart3,
    title: "See what you'll save",
    description: "Transparent per-student pricing with no hidden fees. Calculate your ROI before committing.",
  },
  {
    icon: Zap,
    title: "Start building",
    description: "Get up and running with Mentron in as little as 10 minutes. Connect your LMS and go.",
  },
]

export default function CTASection() {
  return (
    <section id="cta" className="py-20 px-6 lg:px-8 bg-[#F8F7F5]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Headline + buttons */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-display">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-xl">
              Create an account instantly, or contact us to design a custom package for your institution.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/institutional-demo"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white text-base font-semibold py-3.5 px-8 rounded-lg transition-all"
              >
                Start now
                <ArrowRight size={16} />
              </a>
              <a
                href="/institutional-demo"
                className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-primary text-slate-700 hover:text-primary text-base font-semibold py-3.5 px-8 rounded-lg transition-all"
              >
                Contact sales
              </a>
            </div>
          </div>

          {/* Right: Info items side by side, vertically centered */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-6">
              {infoItems.map((item) => (
                <div key={item.title} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
