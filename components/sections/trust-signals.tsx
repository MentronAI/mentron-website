"use client"

import { Landmark, GraduationCap } from "lucide-react"

export default function TrustSignals() {
  return (
    <section className="bg-white border-y border-slate-100 py-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-8">
          Trusted by students from
        </p>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-2 text-xl font-bold font-display text-slate-800">
              <Landmark className="text-primary w-5 h-5" />
              IIT Madras
            </div>
            <div className="flex items-center gap-2 text-xl font-bold font-display text-slate-800">
              <GraduationCap className="text-primary w-5 h-5" />
              NIT Trichy
            </div>
            <div className="text-lg font-semibold text-slate-600">Medical Entrance</div>
            <div className="text-lg font-semibold text-slate-600">JEE Aspirants</div>
            <div className="text-lg font-semibold text-slate-600">UPSC Prep</div>
            
            {/* Duplicated for smooth loop */}
            <div className="flex items-center gap-2 text-xl font-bold font-display text-slate-800 pl-16">
              <Landmark className="text-primary w-5 h-5" />
              IIT Madras
            </div>
            <div className="flex items-center gap-2 text-xl font-bold font-display text-slate-800">
              <GraduationCap className="text-primary w-5 h-5" />
              NIT Trichy
            </div>
            <div className="text-lg font-semibold text-slate-600">Medical Entrance</div>
             <div className="text-lg font-semibold text-slate-600">JEE Aspirants</div>
            <div className="text-lg font-semibold text-slate-600">UPSC Prep</div>
          </div>
        </div>
      </div>
    </section>
  )
}
