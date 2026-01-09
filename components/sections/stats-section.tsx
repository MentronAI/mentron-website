"use client"

export default function StatsSection() {
  return (
    <section id="stats" className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-display mb-4 tracking-tight">
            The Numbers Don't Lie
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary/50 transition-colors">
            <div className="text-5xl font-bold text-primary mb-2 font-display">67%</div>
            <div className="text-slate-900 font-semibold mb-1 font-geist">Faster Learning</div>
            <div className="text-sm text-slate-500 font-geist">vs traditional methods</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary/50 transition-colors">
            <div className="text-5xl font-bold text-primary mb-2 font-display">3.2x</div>
            <div className="text-slate-900 font-semibold mb-1 font-geist">Better Recall</div>
            <div className="text-sm text-slate-500 font-geist">after 30 days</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary/50 transition-colors">
            <div className="text-5xl font-bold text-primary mb-2 font-display">10hrs</div>
            <div className="text-slate-900 font-semibold mb-1 font-geist">Saved Weekly</div>
            <div className="text-sm text-slate-500 font-geist">per active learner</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary/50 transition-colors">
            <div className="text-5xl font-bold text-primary mb-2 font-display">4.9★</div>
            <div className="text-slate-900 font-semibold mb-1 font-geist">User Rating</div>
            <div className="text-sm text-slate-500 font-geist">from 340+ reviews</div>
          </div>
        </div>
      </div>
    </section>
  )
}
