// app/blogs/[slug]/page.tsx - UPDATED with all schemas
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { 
  generateBlogMetadata, 
  generateBlogJsonLd,
  generateBreadcrumbJsonLd 
} from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return generateBlogMetadata(post)
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Generate all JSON-LD schemas
  const blogJsonLd = generateBlogJsonLd(post)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(post)

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="px-6 lg:px-16 pt-8 pb-4 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-primary transition-colors">
              Blogs
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Blog Header */}
      <section className="px-6 lg:px-16 pt-12 pb-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.category.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 bg-blue-50 text-primary text-xs font-semibold rounded-full border border-blue-100"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 font-display tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-slate-900">{post.author.name}</p>
                <p className="text-xs text-slate-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {post.image && (
        <section className="px-6 lg:px-16 pb-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl aspect-video">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="px-6 lg:px-16 pb-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg prose-slate max-w-none">
            <MDXRemote source={post.content} />
          </article>
        </div>
      </section>
    </>
  )
}