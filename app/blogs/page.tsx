import Link from "next/link"
import { 
  ChevronRight, 
  Search, 
  Star, 
  Sparkles, 
  Calendar, 
  Clock, 
  BookOpen, 
  Users, 
  Package, 
  Brain, 
  TrendingUp, 
  GitBranch, 
  Zap, 
  Award, 
  Rocket,
  ChevronLeft,
  Mail,
  BrainCircuit
} from "lucide-react"

export default function BlogsPage() {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="px-6 lg:px-16 pt-8 pb-4 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-slate-500 font-geist">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight width={16} className="text-slate-300" />
            <span className="text-slate-900 font-medium">Blogs</span>
          </nav>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="px-6 lg:px-16 pt-16 pb-12 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 font-display tracking-tight leading-tight mb-6">
            Mentron <span className="bg-gradient-to-br from-primary to-aqua text-transparent bg-clip-text">Blog</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-8 font-geist">
            Insights on AI-powered learning, education technology, and study strategies for students, teachers, and institutions.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search width={20} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-slate-200 focus:border-primary focus:outline-none text-slate-900 font-geist transition-colors shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="px-6 lg:px-16 py-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-5 py-2 bg-primary text-white font-semibold rounded-full text-sm transition-all hover:bg-primary-dark shadow-sm">
              All Posts
            </button>
            <button className="px-5 py-2 bg-white border-2 border-slate-200 text-slate-600 font-semibold rounded-full text-sm transition-all hover:border-primary hover:text-primary">
              AI Technology
            </button>
            <button className="px-5 py-2 bg-white border-2 border-slate-200 text-slate-600 font-semibold rounded-full text-sm transition-all hover:border-primary hover:text-primary">
              Study Tips
            </button>
            <button className="px-5 py-2 bg-white border-2 border-slate-200 text-slate-600 font-semibold rounded-full text-sm transition-all hover:border-primary hover:text-primary">
              For Teachers
            </button>
            <button className="px-5 py-2 bg-white border-2 border-slate-200 text-slate-600 font-semibold rounded-full text-sm transition-all hover:border-primary hover:text-primary">
              Product Updates
            </button>
            <button className="px-5 py-2 bg-white border-2 border-slate-200 text-slate-600 font-semibold rounded-full text-sm transition-all hover:border-primary hover:text-primary">
              Education
            </button>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-6 lg:px-16 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Star width={20} className="text-warning fill-warning" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-geist">Featured Post</h2>
          </div>

          <Link href="/blog/ai-transforming-learning" className="block bg-white border-2 border-slate-200 rounded-3xl overflow-hidden hover-lift hover:border-primary transition-all">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="h-80 lg:h-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <Sparkles width={64} className="mb-4 opacity-50 mx-auto" />
                  <p className="text-xl font-medium opacity-75">Featured Image</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-primary text-xs font-semibold rounded-full border border-blue-100">AI Technology</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full border border-purple-100">Education</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-display leading-tight">
                  How AI is Transforming Student Learning in 2026: From Theory to Practice
                </h3>

                <p className="text-slate-500 text-lg mb-6 font-geist leading-relaxed">
                  Artificial Intelligence is no longer a futuristic concept—it&apos;s reshaping how students learn, teachers teach, and institutions operate. Discover real-world case studies and implementation strategies.
                </p>

                <div className="flex items-center gap-6 text-sm text-slate-500 font-geist">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-aqua flex items-center justify-center text-white font-bold text-xs">
                      NY
                    </div>
                    <span>Nithish Yadav</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar width={14} />
                    <span>Jan 8, 2026</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock width={14} />
                    <span>8 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 lg:px-16 py-12 bg-white">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 font-display">Recent Articles</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-geist">
              <span>Showing 1-9 of 47 posts</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Blog Card 1 */}
            <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <BookOpen width={48} className="text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full">Study Tips</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display leading-tight hover:text-primary transition-colors">
                  <Link href="/blog/study-techniques">5 Evidence-Based Study Techniques That Actually Work</Link>
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-geist line-clamp-2">
                  Research-backed strategies to maximize learning efficiency and retention. Discover what cognitive science says about effective studying.
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-geist">
                  <div className="flex items-center gap-1">
                    <Calendar width={12} />
                    <span>Dec 28, 2025</span>
                  </div>
                  <span>•</span>
                  <span>6 min read</span>
                </div>
              </div>
            </article>

            {/* Blog Card 2 */}
            <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all">
              <div className="h-48 bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                <Users width={48} className="text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full">For Teachers</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display leading-tight hover:text-primary transition-colors">
                  <Link href="/blog/ai-classroom-integration">How to Integrate AI Tools in Your Classroom</Link>
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-geist line-clamp-2">
                  Step-by-step guide for educators new to AI technology. Learn how to start small and scale gradually.
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-geist">
                  <div className="flex items-center gap-1">
                    <Calendar width={12} />
                    <span>Dec 15, 2025</span>
                  </div>
                  <span>•</span>
                  <span>10 min read</span>
                </div>
              </div>
            </article>

            {/* Blog Card 3 */}
            <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all">
              <div className="h-48 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Package width={48} className="text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full">Product</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display leading-tight hover:text-primary transition-colors">
                  <Link href="/blog/canvas-lms-integration">Canvas LMS Integration: Complete Setup Guide</Link>
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-geist line-clamp-2">
                  Connect Mentron with your school&apos;s Canvas LMS in 5 minutes. Sync courses, rosters, and assignments automatically.
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-geist">
                  <div className="flex items-center gap-1">
                    <Calendar width={12} />
                    <span>Jan 5, 2026</span>
                  </div>
                  <span>•</span>
                  <span>8 min read</span>
                </div>
              </div>
            </article>

            {/* Blog Card 4 */}
            <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Brain width={48} className="text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-50 text-primary text-xs font-semibold rounded-full">AI Technology</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display leading-tight hover:text-primary transition-colors">
                  <Link href="/blog/spaced-repetition">Understanding Spaced Repetition: The Science Behind Memory</Link>
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-geist line-clamp-2">
                  How the FSRS algorithm optimizes review schedules for long-term retention. Learn the math behind smart flashcards.
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-geist">
                  <div className="flex items-center gap-1">
                    <Calendar width={12} />
                    <span>Dec 20, 2025</span>
                  </div>
                  <span>•</span>
                  <span>12 min read</span>
                </div>
              </div>
            </article>

            {/* Blog Card 5 */}
            <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all">
              <div className="h-48 bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <TrendingUp width={48} className="text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs font-semibold rounded-full">Education</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display leading-tight hover:text-primary transition-colors">
                  <Link href="/blog/adaptive-learning">The Rise of Adaptive Learning: Personalization at Scale</Link>
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-geist line-clamp-2">
                  How modern LMS platforms are finally delivering personalized education to millions of students worldwide.
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-geist">
                  <div className="flex items-center gap-1">
                    <Calendar width={12} />
                    <span>Dec 10, 2025</span>
                  </div>
                  <span>•</span>
                  <span>7 min read</span>
                </div>
              </div>
            </article>

            {/* Blog Card 6 */}
            <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all">
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <GitBranch width={48} className="text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">Study Tips</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display leading-tight hover:text-primary transition-colors">
                  <Link href="/blog/mind-maps">Mind Mapping for STEM: Visualize Complex Concepts</Link>
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-geist line-clamp-2">
                  Practical techniques for creating effective mind maps in physics, chemistry, and biology courses.
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-geist">
                  <div className="flex items-center gap-1">
                    <Calendar width={12} />
                    <span>Dec 5, 2025</span>
                  </div>
                  <span>•</span>
                  <span>9 min read</span>
                </div>
              </div>
            </article>

            {/* Blog Card 7 */}
            <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all">
              <div className="h-48 bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Zap width={48} className="text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-pink-50 text-pink-600 text-xs font-semibold rounded-full">Product</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display leading-tight hover:text-primary transition-colors">
                  <Link href="/blog/quiz-generation">Auto Quiz Generation: How It Works Behind the Scenes</Link>
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-geist line-clamp-2">
                  A deep dive into the AI models that create meaningful assessment questions from any document.
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-geist">
                  <div className="flex items-center gap-1">
                    <Calendar width={12} />
                    <span>Nov 28, 2025</span>
                  </div>
                  <span>•</span>
                  <span>11 min read</span>
                </div>
              </div>
            </article>

            {/* Blog Card 8 */}
            <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all">
              <div className="h-48 bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center">
                <Award width={48} className="text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-teal-50 text-teal-600 text-xs font-semibold rounded-full">For Teachers</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display leading-tight hover:text-primary transition-colors">
                  <Link href="/blog/reduce-grading-time">How Teachers Reduced Grading Time by 70%</Link>
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-geist line-clamp-2">
                  Case studies from 50+ schools using AI-powered auto-grading and instant feedback systems.
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-geist">
                  <div className="flex items-center gap-1">
                    <Calendar width={12} />
                    <span>Nov 15, 2025</span>
                  </div>
                  <span>•</span>
                  <span>6 min read</span>
                </div>
              </div>
            </article>

            {/* Blog Card 9 */}
            <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all">
              <div className="h-48 bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Rocket width={48} className="text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-violet-50 text-violet-600 text-xs font-semibold rounded-full">Education</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display leading-tight hover:text-primary transition-colors">
                  <Link href="/blog/future-of-education">The Future of Education: 2026-2030 Predictions</Link>
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-geist line-clamp-2">
                  Expert predictions on how AI, VR, and adaptive learning will reshape classrooms in the next 5 years.
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-geist">
                  <div className="flex items-center gap-1">
                    <Calendar width={12} />
                    <span>Nov 1, 2025</span>
                  </div>
                  <span>•</span>
                  <span>14 min read</span>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="px-6 lg:px-16 py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2">

            {/* Previous Button */}
            <button className="w-10 h-10 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed" disabled>
              <ChevronLeft width={20} />
            </button>

            {/* Page Numbers */}
            <button className="w-10 h-10 rounded-full bg-primary text-white font-semibold text-sm transition-all">
              1
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:border-primary hover:text-primary transition-all">
              2
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:border-primary hover:text-primary transition-all">
              3
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:border-primary hover:text-primary transition-all">
              4
            </button>

            <span className="text-slate-400 px-2">...</span>

            <button className="w-10 h-10 rounded-full border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:border-primary hover:text-primary transition-all">
              6
            </button>

            {/* Next Button */}
            <button className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <ChevronRight width={20} />
            </button>

          </div>

          {/* Page Info */}
          <p className="text-center text-sm text-slate-500 mt-6 font-geist">
            Showing <span className="font-semibold text-slate-900">1-9</span> of <span className="font-semibold text-slate-900">47</span> articles
          </p>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 lg:px-16 py-16 bg-gradient-to-br from-primary to-aqua">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
              <Mail width={32} className="text-white" />
            </div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-display">
            Never Miss an Update
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto font-geist">
            Get the latest articles on AI-powered learning, study tips, and product updates delivered to your inbox every week.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-slate-900 font-geist shadow-xl"
            />
            <button className="bg-white hover:bg-slate-100 text-primary font-semibold py-4 px-8 rounded-full transition-all shadow-xl whitespace-nowrap">
              Subscribe
            </button>
          </div>

          <p className="text-xs text-white/60 mt-4 font-geist">
            Join 5,000+ educators and students. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-0 pb-0">
        <div className="container lg:pl-0 lg:pr-0 mx-auto pr-0 pl-0">
          <div className="lg:px-10 lg:py-12 bg-white border-neutral-200 border rounded-3xl pt-10 pr-6 pb-10 pl-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)]">

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

              {/* Brand */}
              <div className="lg:w-1/3 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white">
                    <BrainCircuit width={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-neutral-900 tracking-tight font-geist">Mentron</span>
                    <span className="text-[11px] uppercase text-neutral-400 tracking-[0.16em] font-geist">Learn Smarter</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 font-geist leading-relaxed">
                  Transforming education with intelligent AI solutions for institutions, educators, and students.
                </p>
              </div>

              {/* Links */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">

                {/* Solutions Column */}
                <div className="space-y-3">
                  <h3 className="uppercase text-xs font-medium text-neutral-400 tracking-[0.16em] font-geist">Solutions</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li><Link href="/institutional-demo" className="hover:text-primary transition-colors font-geist">For Institutions</Link></li>
                    <li><Link href="/individual-inquiry" className="hover:text-primary transition-colors font-geist">For Individuals</Link></li>
                    <li><Link href="/#features" className="hover:text-primary transition-colors font-geist">Features</Link></li>
                    <li><Link href="/#integrations" className="hover:text-primary transition-colors font-geist">Integrations</Link></li>
                  </ul>
                </div>

                {/* Resources Column */}
                <div className="space-y-3">
                  <h3 className="uppercase text-xs font-medium text-neutral-400 tracking-[0.16em] font-geist">Resources</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li><Link href="/blogs" className="hover:text-primary transition-colors font-geist">Blog</Link></li>
                    <li><Link href="/resources" className="hover:text-primary transition-colors font-geist">Learning Resources</Link></li>
                    <li><Link href="/#faq" className="hover:text-primary transition-colors font-geist">FAQ</Link></li>
                    <li><Link href="/help" className="hover:text-primary transition-colors font-geist">Help Center</Link></li>
                  </ul>
                </div>

                {/* Company Column */}
                <div className="space-y-3">
                  <h3 className="uppercase text-xs font-medium text-neutral-400 tracking-[0.16em] font-geist">Company</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li><Link href="/about" className="hover:text-primary transition-colors font-geist">About</Link></li>
                    <li><Link href="/contact" className="hover:text-primary transition-colors font-geist">Contact</Link></li>
                    <li><Link href="/privacy" className="hover:text-primary transition-colors font-geist">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="hover:text-primary transition-colors font-geist">Terms of Service</Link></li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-neutral-400 font-geist">
                © 2026 Mentron. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://twitter.com/mentron" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.234 10.162L22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299l-.929-1.329L3.076 1.56h3.182l5.965 8.532l.929 1.329l7.754 11.09h-3.182z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/company/mentron" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </>
  )
}
