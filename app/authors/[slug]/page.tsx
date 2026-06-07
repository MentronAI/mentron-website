import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, ChevronRight } from 'lucide-react'
import { getAllAuthors, getAuthor } from '@/content/authors'
import { getAllPosts } from '@/lib/blog'
import Footer from '@/components/layout/footer'

const SITE_URL = 'https://www.mentron.in'

export async function generateStaticParams() {
  return getAllAuthors().map((author) => ({ slug: author.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthor(slug.includes('-') ? slug : slug)
  if (!author) return {}

  return {
    title: `${author.name} — ${author.role}, Mentron`,
    description: author.bio,
    openGraph: {
      title: `${author.name} — Mentron`,
      description: author.bio,
      url: `${SITE_URL}/authors/${author.slug}`,
      siteName: 'Mentron',
      type: 'profile',
    },
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = getAllAuthors().find((a) => a.slug === slug)
  if (!author) notFound()

  const posts = getAllPosts().filter((p) => p.author.name === author.name)

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/authors/${author.slug}#person`,
    name: author.name,
    jobTitle: author.role,
    url: `${SITE_URL}/authors/${author.slug}`,
    image: author.image ? `${SITE_URL}${author.image}` : undefined,
    worksFor: {
      '@type': 'Organization',
      name: 'Mentron Technologies LLP',
      url: SITE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className="flex-1 px-6 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 font-geist mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight width={16} className="text-slate-300" />
            <Link href="/blogs" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight width={16} className="text-slate-300" />
            <span className="text-slate-900 font-medium">{author.name}</span>
          </nav>

          {/* Author Header */}
          <div className="flex items-start gap-6 mb-12">
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
              {author.image ? (
                <Image src={author.image} alt={author.name} fill className="object-cover" />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-aqua flex items-center justify-center text-white font-bold text-3xl">
                  {author.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 font-display tracking-tight mb-2">
                {author.name}
              </h1>
              <p className="text-primary font-medium mb-3">{author.role} at Mentron</p>
              <p className="text-slate-600 text-lg leading-relaxed">{author.bio}</p>
            </div>
          </div>

          {/* Posts by this author */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mb-6">
            Articles by {author.name.split(' ')[0]}
          </h2>

          {posts.length === 0 ? (
            <p className="text-slate-500">No articles published yet.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="block bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.category.slice(0, 2).map((cat) => (
                          <span key={cat} className="px-2 py-1 bg-blue-50 text-primary text-xs font-semibold rounded-full border border-blue-100">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2">{post.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mt-3">
                        <div className="flex items-center gap-1">
                          <Calendar width={12} />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock width={12} />
                          <span>{post.readingTime}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors flex-shrink-0 mt-2" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
