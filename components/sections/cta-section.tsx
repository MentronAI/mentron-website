"use client"

import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section id="cta" className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-display mb-6">
          Ready to Learn Smarter?
        </h2>
        <p className="text-lg lg:text-xl text-slate-500 font-geist mb-8 max-w-2xl mx-auto">
          Join 1,200+ students who are already learning faster, retaining more, and achieving their goals with Mentron.
        </p>
        <Button className="bg-primary hover:bg-blue-600 text-white text-base font-semibold py-6 px-10 rounded-full transition-all shadow-xl transform hover:-translate-y-0.5 hover:shadow-2xl">
          Start Free Trial
        </Button>
        <p className="text-sm text-slate-400 font-geist mt-4">No credit card required • Set up in 2 minutes</p>
      </div>
    </section>
  )
}
