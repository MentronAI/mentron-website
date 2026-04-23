"use client"

import Image from "next/image"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
    >
      {/* Desktop image */}
      <Image
        src="/images/hero/curiosity.png"
        alt="Curiosity"
        fill
        className="object-cover hidden md:block"
        priority
        sizes="100vw"
      />
      {/* Mobile image */}
      <Image
        src="/images/hero/curiosity-mobile.png"
        alt="Curiosity"
        fill
        className="object-cover block md:hidden"
        priority
        sizes="100vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Radial gradient behind text for readability */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,0,0,0.4),transparent)]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
        {/* Main Headline */}
        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white animate-[fadeInUp_0.8s_ease-out_0.3s_both]"
        >
          The AI that{" "}
          <span className="font-instrument-serif-italic">sees where you struggle</span>, before you do.
        </h1>

        {/* Caption */}
        <p
          className="mt-6 text-sm sm:text-base tracking-[0.2em] text-white/50 font-semibold uppercase font-geist animate-[fadeInUp_0.6s_ease-out_0.6s_both]"
        >
          SPARK THE URGE TO DIG DEEPER
        </p>

        {/* CTA Buttons */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 animate-[fadeInUp_0.8s_ease-out_0.8s_both]"
        >
          <a
            href="#key-features"
            className="bg-primary hover:bg-primary-dark text-white text-base font-semibold py-4 px-10 rounded-full transition-all shadow-xl shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5"
          >
            Get Early Access
          </a>
          <a
            href="#key-features"
            className="text-white/90 hover:text-white border-[1.5px] border-white/35 hover:border-white/60 text-base font-semibold py-4 px-8 rounded-full transition-all backdrop-blur-sm hover:bg-white/10"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  )
}
