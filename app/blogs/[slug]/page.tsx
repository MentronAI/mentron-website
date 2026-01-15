import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Link as LinkIcon, 
  BrainCircuit 
} from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { 
  generateBlogMetadata, 
  generateBlogJsonLd,
  generateBreadcrumbJsonLd 
} from '@/lib/seo';
import Footer from '@/components/layout/footer';

// Force dynamic behavior or revalidate if needed, 
// but for blog posts static generation is usually preferred.
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return generateBlogMetadata(post);
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Generate all JSON-LD schemas
  const blogJsonLd = generateBlogJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(post);

  // Get related articles (simple logic: recent posts excluding current)
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 3);

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
          <nav className="flex items-center gap-2 text-sm text-slate-500 font-geist">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-md">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Blog Header Section */}
      <section className="px-6 lg:px-16 pt-12 pb-8 bg-white">
        <div className="max-w-4xl mx-auto">

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.category.map((cat, index) => {
                // Simple color cycling for tags based on index to match the example vibe
                const colors = [
                    "bg-blue-50 text-primary border-blue-100",
                    "bg-purple-50 text-purple-600 border-purple-100",
                    "bg-green-50 text-green-600 border-green-100",
                    "bg-orange-50 text-orange-600 border-orange-100"
                ];
                const colorClass = colors[index % colors.length];
                return (
                    <span key={cat} className={`px-3 py-1 text-xs font-semibold rounded-full border ${colorClass}`}>
                        {cat}
                    </span>
                );
            })}
          </div>

          {/* Blog Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 font-display tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-geist pb-8 border-b border-slate-100">
            {/* Author */}
            <div className="flex items-center gap-3">
               {post.author.image ? (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-aqua flex items-center justify-center text-white font-bold text-sm">
                    {post.author.name.substring(0, 2).toUpperCase()}
                </div>
              )}
              
              <div>
                <p className="font-medium text-slate-900">{post.author.name}</p>
                <p className="text-xs text-slate-400">{post.author.role}</p>
              </div>
            </div>

            {/* Date & Reading Time */}
            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 lg:px-16 pb-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-100">
             {post.image && post.image !== '/images/og-default.jpg' ? (
                 <div className="aspect-[1200/630] relative">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                 </div>
             ) : (
                 // Placeholder gradient image matching the HTML example
                <div className="w-full h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                        <BrainCircuit className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-xl font-medium opacity-75">Hero Blog Image</p>
                    </div>
                </div>
             )}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="px-6 lg:px-16 pb-24 bg-white">
        <div className="max-w-4xl mx-auto">

          {/* Article Content */}
          <article className="blog-content">
            <MDXRemote source={post.content} />
          </article>

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-slate-200">

            {/* Share Buttons */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-medium text-slate-900">Share this article:</p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                  <LinkIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Author Card */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-3xl p-8">
              <div className="flex items-start gap-6">
                {post.author.image ? (
                     <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 relative">
                        <Image src={post.author.image} alt={post.author.name} fill className="object-cover"/>
                     </div>
                ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-aqua flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                    {post.author.name.substring(0, 2).toUpperCase()}
                    </div>
                )}
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{post.author.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 font-geist">
                    {post.author.role}. Building AI-powered learning tools for schools and colleges. Previously worked on ML systems at DigiSpot. Passionate about education technology and cognitive science.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#" className="text-sm text-primary hover:underline font-medium">Follow on Twitter →</a>
                    <span className="text-slate-300">•</span>
                    <a href="#" className="text-sm text-primary hover:underline font-medium">LinkedIn Profile →</a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 font-display">Related Articles</h3>

            <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.length > 0 ? (
                    relatedPosts.map(relatedPost => (
                         <Link key={relatedPost.slug} href={`/blogs/${relatedPost.slug}`} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all block">
                            <div className="h-40 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                                {relatedPost.image && relatedPost.image !== '/images/og-default.jpg' && (
                                    <Image src={relatedPost.image} alt={relatedPost.title} fill className="object-cover" />
                                )}
                            </div>
                            <div className="p-6">
                            <div className="flex gap-2 mb-3">
                                {relatedPost.category.slice(0, 1).map(c => (
                                    <span key={c} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full">{c}</span>
                                ))}
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 mb-2 font-display line-clamp-2">{relatedPost.title}</h4>
                            <p className="text-sm text-slate-500 mb-4 line-clamp-2">{relatedPost.description}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{relatedPost.readingTime}</span>
                            </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    // Fallback static cards if no dynamic posts (matching HTML example)
                    <>
                    <a href="#" className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all">
                        <div className="h-40 bg-gradient-to-br from-purple-500 to-pink-500"></div>
                        <div className="p-6">
                        <div className="flex gap-2 mb-3">
                            <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full">Study Tips</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">5 Evidence-Based Study Techniques That Actually Work</h4>
                        <p className="text-sm text-slate-500 mb-4">Research-backed strategies to maximize learning efficiency.</p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>Dec 28, 2025</span>
                            <span>•</span>
                            <span>6 min read</span>
                        </div>
                        </div>
                    </a>

                    <a href="#" className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all">
                        <div className="h-40 bg-gradient-to-br from-green-500 to-teal-500"></div>
                        <div className="p-6">
                        <div className="flex gap-2 mb-3">
                            <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full">Teachers</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">How to Integrate AI Tools in Your Classroom</h4>
                        <p className="text-sm text-slate-500 mb-4">Step-by-step guide for educators new to AI technology.</p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>Dec 15, 2025</span>
                            <span>•</span>
                            <span>10 min read</span>
                        </div>
                        </div>
                    </a>

                    <a href="#" className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover-lift hover:border-primary transition-all">
                        <div className="h-40 bg-gradient-to-br from-orange-500 to-red-500"></div>
                        <div className="p-6">
                        <div className="flex gap-2 mb-3">
                            <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full">Product</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">Canvas LMS Integration: Complete Setup Guide</h4>
                        <p className="text-sm text-slate-500 mb-4">Connect Mentron with your school's Canvas LMS in 5 minutes.</p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>Jan 5, 2026</span>
                            <span>•</span>
                            <span>8 min read</span>
                        </div>
                        </div>
                    </a>
                    </>
                )}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-16 py-16 bg-gradient-to-br from-slate-50 to-blue-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border-2 border-primary/20 rounded-3xl p-12 shadow-xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-display">
              See Mentron in Action
            </h2>
            <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto font-geist">
              Experience AI-powered learning tools for your school. Schedule a personalized demo with our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/demo" className="bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-full transition-all shadow-xl shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5">
                Schedule a Demo
              </a>
              <a href="/blogs" className="text-slate-600 hover:text-primary font-medium py-4 px-6 flex items-center justify-center gap-2 transition-colors rounded-full border-2 border-slate-200 hover:border-primary">
                Read More Blogs
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}