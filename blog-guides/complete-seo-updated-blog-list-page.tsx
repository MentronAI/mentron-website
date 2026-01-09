// app/blogs/page.tsx - UPDATED with CollectionPage schema
import { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { generateBlogCollectionJsonLd } from '@/lib/seo'
import Link from 'next/link'
import Image from 'next/image'

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
        url: 'https://mentron.in/images/og-blog.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentron Blog',
    description: 'Insights on AI-powered learning and education technology.',
    images: ['https://mentron.in/images/og-blog.jpg'],
  },
}

export default function BlogsPage() {
  const posts = getAllPosts()
  const featuredPost = posts.find((post) => post.featured)
  const recentPosts = posts.filter((post) => !post.featured).slice(0, 9)

  const blogCollectionJsonLd = generateBlogCollectionJsonLd()

  return (
    <>
      {/* JSON-LD Schema for Blog Collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionJsonLd) }}
      />

      {/* Rest of your blog list page... */}
      <section className="px-6 lg:px-16 pt-16 pb-12 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 font-display tracking-tight leading-tight mb-6">
            Mentron <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">
            Insights on AI-powered learning, education technology, and study strategies.
          </p>
        </div>
      </section>

      {/* Featured & Recent posts... */}
    </>
  )
}