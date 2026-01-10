import Link from "next/link"
import Image from "next/image"
import { Metadata } from 'next'
import { generateBlogCollectionJsonLd } from '@/lib/seo'
import { getAllPosts, getAllCategories } from '@/lib/blog'
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

export const metadata: Metadata = {
  title: 'Blog - Learn About AI-Powered Education | Mentron',
  description: 'Insights on AI-powered learning, education technology, and study strategies for students, teachers, and institutions.',
  openGraph: {
    title: 'Mentron Blog - AI-Powered Education Insights',
    description: 'Insights on AI-powered learning, education technology, and study strategies.',
    url: 'https://mentron.in/blogs',
    siteName: 'Mentron',
    images: [
      {
        url: 'https://mentron.in/images/mentron-in-og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Mentron Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentron Blog',
    description: 'Insights on AI-powered learning and education technology.',
    images: ['https://mentron.in/images/mentron-in-og-default.jpg'],
    creator: '@mentronai',
  },
}

export default function BlogsPage() {
  const blogCollectionJsonLd = generateBlogCollectionJsonLd()
  const posts = getAllPosts()
  const categories = getAllCategories()

  // Use the first post as featured, and the rest for the grid
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1)

  return (
    <>
      {/* JSON-LD Schema for Blog Collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionJsonLd) }}
      />

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
            {categories.map((category) => (
              <button key={category} className="px-5 py-2 bg-white border-2 border-slate-200 text-slate-600 font-semibold rounded-full text-sm transition-all hover:border-primary hover:text-primary">
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="px-6 lg:px-16 py-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Star width={20} className="text-warning fill-warning" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-geist">Featured Post</h2>
            </div>

            <Link href={`/blogs/${featuredPost.slug}`} className="block bg-white border-2 border-slate-200 rounded-3xl overflow-hidden hover-lift hover:border-primary transition-all">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="h-80 lg:h-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative flex items-center justify-center overflow-hidden">
                  {featuredPost.image ? (
                    <Image 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-center text-white p-8">
                      <Sparkles width={64} className="mb-4 opacity-50 mx-auto" />
                      <p className="text-xl font-medium opacity-75">Featured Image</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.category.slice(0, 2).map((cat) => (
                      <span key={cat} className="px-3 py-1 bg-blue-50 text-primary text-xs font-semibold rounded-full border border-blue-100">
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-display leading-tight">
                    {featuredPost.title}
                  </h3>

                  <p className="text-slate-500 text-lg mb-6 font-geist leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-slate-500 font-geist">
                    <div className="flex items-center gap-2">
                      {featuredPost.author.image ? (
                        <Image 
                          src={featuredPost.author.image} 
                          alt={featuredPost.author.name}
                          width={32}
                          height={32}
                          className="rounded-full w-8 h-8 object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-aqua flex items-center justify-center text-white font-bold text-xs">
                          {featuredPost.author.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span>{featuredPost.author.name}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar width={14} />
                      <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock width={14} />
                      <span>{featuredPost.readingTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="px-6 lg:px-16 py-12 bg-white">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 font-display">Recent Articles</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-geist">
              <span>Showing {recentPosts.length} posts</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.slug} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all flex flex-col h-full">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative flex items-center justify-center overflow-hidden flex-shrink-0">
                  {post.image ? (
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <BookOpen width={48} className="text-white opacity-50" />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.category.slice(0, 1).map((cat) => (
                      <span key={cat} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-display leading-tight hover:text-primary transition-colors">
                    <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 font-geist line-clamp-2 flex-1">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-geist mt-auto">
                    <div className="flex items-center gap-1">
                      <Calendar width={12} />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination (Static for now, but dynamic list handles content) */}
      <section className="px-6 lg:px-16 py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* ... pagination UI preserved as is or removed if single page is enough ... */}
          {/* Leaving pagination UI for visual completeness as requested */}
          <div className="flex items-center justify-center gap-2">
            <button className="w-10 h-10 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed" disabled>
              <ChevronLeft width={20} />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary text-white font-semibold text-sm transition-all">
              1
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <ChevronRight width={20} />
            </button>
          </div>
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