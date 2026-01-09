"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRef } from "react"

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="testimonials" className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:px-0 animate-fadeInUp pr-0 pl-0 gap-x-6 gap-y-2 mb-12">
          <h2 className="text-[44px] leading-[0.9] sm:text-6xl lg:text-7xl xl:text-5xl text-[#000000] tracking-tighter text-left font-display">
            Testimonials.
          </h2>
          <p className="sm:text-base text-sm text-zinc-400 tracking-tight mt-1 font-geist">
            Real stories, real success. Our students have experienced firsthand the impact of our AI-powered solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 sm:mt-8 mt-6 items-center">
          <div className="lg:col-span-12 relative">
            <div className="relative overflow-hidden h-[420px] rounded-3xl mt-6">
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

              <div 
                className="flex gap-6 overflow-x-auto scroll-smooth pr-6 pl-6 absolute top-0 right-0 bottom-0 left-0 items-center scrollbar-hide"
                ref={scrollRef}
              >
                <article className="min-w-[420px] sm:min-w-[520px] max-w-[640px] bg-white border border-neutral-200/70 rounded-[24px] p-8 text-neutral-900 hover-lift backdrop-blur-sm snap-center -rotate-2 shadow-2xl">
                  <p className="text-lg sm:text-xl md:text-2xl text-neutral-900 tracking-tighter font-geist">
                    "Mentron's AI literally knows what I struggle with before I do. The flashcards it generates focus exactly on my weak topics. My physics score jumped from 65% to 89% in one month."
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center font-bold text-primary">AM</div>
                    <div>
                      <div className="text-sm tracking-tight font-geist">Arjun Mehta</div>
                      <div className="text-xs text-neutral-500 tracking-tight font-geist">JEE Aspirant</div>
                    </div>
                    <div className="ml-auto text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Physics: +24%</div>
                  </div>
                </article>

                <article className="min-w-[420px] sm:min-w-[520px] max-w-[640px] bg-white border border-neutral-200/70 rounded-[24px] p-8 text-neutral-900 hover-lift backdrop-blur-sm snap-center rotate-1 shadow-2xl">
                  <p className="text-lg sm:text-xl md:text-2xl text-neutral-900 tracking-tighter font-geist">
                    "Medical syllabus is vast. Mentron's mind maps helped me connect concepts in Biology I couldn't visualize before. It saved me hundreds of hours of note-taking."
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center font-bold text-pink-600">PS</div>
                    <div>
                      <div className="text-sm tracking-tight font-geist">Priya Sharma</div>
                      <div className="text-xs text-neutral-500 tracking-tight font-geist">NEET Aspirant</div>
                    </div>
                    <div className="ml-auto text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Saved 100+ hrs</div>
                  </div>
                </article>

                <article className="min-w-[420px] sm:min-w-[520px] max-w-[640px] bg-white border border-neutral-200/70 rounded-[24px] p-8 text-neutral-900 hover-lift backdrop-blur-sm snap-center -rotate-1 shadow-2xl">
                  <p className="text-lg sm:text-xl md:text-2xl text-neutral-900 tracking-tighter font-geist">
                    "The adaptive learning path identified exactly what I needed to focus on. My study time became 3x more efficient."
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center font-bold text-green-600">RK</div>
                    <div>
                      <div className="text-sm tracking-tight font-geist">Rahul Kumar</div>
                      <div className="text-xs text-neutral-500 tracking-tight font-geist">UPSC Aspirant</div>
                    </div>
                    <div className="ml-auto text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">3x Efficient</div>
                  </div>
                </article>
              </div>

              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
                <button 
                  aria-label="Previous"
                  onClick={() => scroll('left')}
                  className="hover:bg-neutral-200 transition-colors inline-flex text-neutral-900 bg-neutral-100 w-10 h-10 border-neutral-200 border rounded-full items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button 
                  aria-label="Next"
                  onClick={() => scroll('right')}
                  className="w-10 h-10 rounded-full text-white bg-neutral-900 hover:bg-neutral-800 transition-colors inline-flex items-center justify-center"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
