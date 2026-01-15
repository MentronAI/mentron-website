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
import Footer from "@/components/layout/footer"

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

      <Footer />
    </>
  )
}