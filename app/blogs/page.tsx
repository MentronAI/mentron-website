import Link from "next/link"
import Image from "next/image"
import { Metadata } from 'next'
import { generateBlogCollectionJsonLd } from '@/lib/seo'
import { getAllPosts, getAllCategories } from '@/lib/blog'
import {
  ChevronRight,
  Star,
  Sparkles,
  Calendar,
  Clock,
} from "lucide-react"
import Footer from "@/components/layout/footer"
import BlogSearch from "@/components/blog/blog-search"

export const metadata: Metadata = {
  title: 'Blog - Learn About AI-Powered Education | Mentron',
  description: 'Insights on AI-powered learning, education technology, and study strategies for students, teachers, and institutions.',
  openGraph: {
    title: 'Mentron Blog - AI-Powered Education Insights',
    description: 'Insights on AI-powered learning, education technology, and study strategies.',
    url: 'https://www.mentron.in/blogs',
    siteName: 'Mentron',
    images: [
      {
        url: 'https://www.mentron.in/images/mentron-in-og-default.jpg',
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
    images: ['https://www.mentron.in/images/mentron-in-og-default.jpg'],
    creator: '@mentrontech',
  },
}

export default async function BlogsPage() {
  const blogCollectionJsonLd = generateBlogCollectionJsonLd()
  const posts = getAllPosts()
  const categories = getAllCategories()

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
      <div className="px-6 lg:px-16 pt-[72px] lg:pt-[80px] pb-4 bg-white border-b border-slate-100">
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
          <p className="text-xl text-slate-500 max-w-3xl mx-auto font-geist">
            Insights on AI-powered learning, education technology, and study strategies for students, teachers, and institutions.
          </p>
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
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Calendar width={14} />
                      <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <span>·</span>
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

      {/* Search + Category Filter + Blog Grid */}
      <section className="px-6 lg:px-16 py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 font-display mb-8">All Articles</h2>
          <BlogSearch posts={recentPosts} categories={categories} />
        </div>
      </section>

      <Footer />
    </>
  )
}
