'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  Calendar,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface Post {
  slug: string
  title: string
  description: string
  date: string
  image: string
  category: string[]
  readingTime: string
  author: { name: string; image: string }
}

const POSTS_PER_PAGE = 9

export default function BlogSearch({
  posts,
  categories,
}: {
  posts: Post[]
  categories: string[]
}) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const filtered = posts.filter((post) => {
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase()) ||
      post.category.some((c) => c.toLowerCase().includes(query.toLowerCase()))

    const matchesCategory =
      !activeCategory || post.category.includes(activeCategory)

    return matchesQuery && matchesCategory
  })

  const isFiltering = !!query || !!activeCategory
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const start = (page - 1) * POSTS_PER_PAGE
  const paginated = isFiltering ? filtered : filtered.slice(start, start + POSTS_PER_PAGE)

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [query, activeCategory])

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <Search
            width={20}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-slate-200 focus:border-primary focus:outline-none text-slate-900 font-geist transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-5 py-2 font-semibold rounded-full text-sm transition-all shadow-sm ${
            !activeCategory
              ? 'bg-primary text-white'
              : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
          }`}
        >
          All Posts
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setActiveCategory(activeCategory === category ? null : category)
            }
            className={`px-5 py-2 font-semibold rounded-full text-sm transition-all ${
              activeCategory === category
                ? 'bg-primary text-white'
                : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between mb-8">
        {(query || activeCategory) ? (
          <p className="text-sm text-slate-500 font-geist">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
            {query && ` for "${query}"`}
          </p>
        ) : (
          <p className="text-sm text-slate-500 font-geist">
            Showing {start + 1}–{Math.min(start + POSTS_PER_PAGE, filtered.length)} of {filtered.length} posts
          </p>
        )}
      </div>

      {/* Blog Grid */}
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginated.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all flex flex-col h-full"
            >
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
                    <span
                      key={cat}
                      className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full"
                    >
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
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookOpen width={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-geist">
            No articles found. Try a different search term or category.
          </p>
        </div>
      )}

      {/* Pagination */}
      {!isFiltering && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-slate-100">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
              page === 1
                ? 'border-slate-200 text-slate-400 opacity-30 cursor-not-allowed'
                : 'border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
            }`}
          >
            <ChevronLeft width={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                pageNum === page
                  ? 'bg-primary text-white'
                  : 'border-2 border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
              page === totalPages
                ? 'border-slate-200 text-slate-400 opacity-30 cursor-not-allowed'
                : 'border-primary text-primary hover:bg-primary hover:text-white'
            }`}
          >
            <ChevronRight width={20} />
          </button>
        </div>
      )}
    </>
  )
}
