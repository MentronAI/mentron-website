"use client"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-white flex flex-col"
      style={{ minHeight: "100vh" }}
    >
      {/* Aurora layer 1 — soft blue wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(102deg, transparent 0%, transparent 6%, rgba(0, 80, 220, 0.05) 9%, rgba(0, 119, 255, 0.06) 12%, rgba(30, 144, 255, 0.04) 16%, rgba(0, 50, 160, 0.03) 20%, transparent 24%, transparent 30%, rgba(0, 60, 200, 0.04) 34%, rgba(0, 119, 255, 0.06) 38%, rgba(70, 160, 255, 0.04) 42%, transparent 47%, transparent 54%, rgba(0, 80, 220, 0.05) 58%, rgba(0, 119, 255, 0.05) 62%, transparent 67%)",
          backgroundSize: "400% 100%",
          animation: "aurora-drift 28s linear infinite",
          filter: "blur(30px)",
          opacity: 0.9,
        }}
      />

      {/* Aurora layer 2 — secondary wash, different angle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(98deg, transparent 0%, transparent 8%, rgba(0, 40, 180, 0.03) 12%, rgba(0, 100, 255, 0.05) 17%, rgba(100, 180, 255, 0.03) 22%, transparent 28%, transparent 38%, rgba(0, 70, 220, 0.04) 43%, rgba(0, 119, 255, 0.05) 48%, transparent 54%)",
          backgroundSize: "300% 100%",
          animation: "aurora-drift 38s linear infinite reverse",
          filter: "blur(36px)",
          opacity: 0.7,
        }}
      />

      {/* Subtle blue glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "40%",
          background: "linear-gradient(to top, rgba(0, 119, 255, 0.03) 0%, transparent 100%)",
        }}
      />

      {/* Horizon line */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent 0%, rgba(0, 119, 255, 0.3) 30%, rgba(0, 119, 255, 0.5) 50%, rgba(0, 119, 255, 0.3) 70%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 max-w-4xl mx-auto flex-1">
        {/* Caption */}
        <p
          className="text-xs sm:text-sm tracking-[0.2em] text-slate-400 font-semibold uppercase animate-[fadeInUp_0.6s_ease-out_0.2s_both]"
        >
          Spark the urge to dig deeper
        </p>

        {/* Main Headline */}
        <h1
          className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900 animate-[fadeInUp_0.8s_ease-out_0.3s_both]"
        >
          The AI that{" "}
          <span className="font-instrument-serif-italic text-primary">sees where you struggle</span>, before you do.
        </h1>

        {/* CTA Buttons */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 animate-[fadeInUp_0.8s_ease-out_0.6s_both]"
        >
          <a
            href="/institutional-demo"
            className="bg-primary hover:bg-primary-dark text-white text-base font-semibold py-4 px-6 sm:px-10 rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5"
          >
            Get Early Access
          </a>
          <a
            href="#why-mentron"
            className="border-[1.5px] border-slate-200 hover:border-primary text-slate-700 hover:text-primary text-base font-semibold py-4 px-8 rounded-lg transition-all hover:bg-primary/5"
          >
            See How It Works
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-sm text-slate-400 font-medium tracking-wide animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
          Join educators exploring AI-powered learning
        </p>
      </div>
    </section>
  )
}
