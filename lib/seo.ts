// lib/seo.ts - ENHANCED VERSION with all Google Rich Results schemas
import { Metadata } from 'next'
import { BlogPost, getAllPosts } from './blog'

const SITE_URL = 'https://mentron.in'
const SITE_NAME = 'Mentron'
const LOGO_PATH = '/logo/mentron.webp'
const DEFAULT_OG_IMAGE = '/images/mentron-og-default.jpg'
const TWITTER_HANDLE = '@mentronai' // Replace with your actual handle

// ============================================================================
// BLOG POST METADATA (Open Graph, Twitter Cards, etc.)
// ============================================================================

export function generateBlogMetadata(post: BlogPost): Metadata {
  const ogImage = post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}${DEFAULT_OG_IMAGE}`
  const publishedTime = new Date(post.date).toISOString()

  return {
    title: `${post.title} | ${SITE_NAME} Blog`,
    description: post.description,
    authors: [{ name: post.author.name }],
    keywords: post.category.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blogs/${post.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime,
      authors: [post.author.name],
      tags: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
    alternates: {
      canonical: `${SITE_URL}/blogs/${post.slug}`,
    },
  }
}

// ============================================================================
// BLOG POST JSON-LD (Article Schema with complete properties)
// ============================================================================

export function generateBlogJsonLd(post: BlogPost) {
  const ogImage = post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}${DEFAULT_OG_IMAGE}`
  const publishedDate = new Date(post.date).toISOString()

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blogs/${post.slug}#blogposting`,
    headline: post.title,
    description: post.description,
    image: {
      '@type': 'ImageObject',
      url: ogImage,
      width: 1200,
      height: 630,
    },
    datePublished: publishedDate,
    dateModified: publishedDate, // Update this if you track modification dates
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/about#person`,
      name: post.author.name,
      url: `${SITE_URL}/about`,
      image: post.author.image ? `${SITE_URL}${post.author.image}` : undefined,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${LOGO_PATH}`,
        width: 600,
        height: 60,
      },
      sameAs: [
        'https://twitter.com/mentronai', // Replace with actual profiles
        'https://www.linkedin.com/company/mentron',
      ],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${post.slug}`,
    },
    keywords: post.category.join(', '),
    articleSection: post.category[0] || 'Education',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE_URL}/blogs#blog`,
      name: `${SITE_NAME} Blog`,
    },
  }
}

// ============================================================================
// BREADCRUMB JSON-LD (For blog post pages)
// ============================================================================

export function generateBreadcrumbJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blogs`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blogs/${post.slug}`,
      },
    ],
  }
}

// ============================================================================
// ORGANIZATION JSON-LD (For homepage and site-wide)
// ============================================================================

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${LOGO_PATH}`,
      width: 600,
      height: 60,
    },
    description: 'AI-powered learning platform for students, teachers, and institutions. Adaptive learning paths, auto-generated study materials, and instant feedback.',
    foundingDate: '2025-06-05',
    sameAs: [
      'https://twitter.com/mentronai', // Replace with actual social profiles
      'https://www.linkedin.com/company/mentron',
      'https://www.facebook.com/mentron',
      'https://www.instagram.com/mentron',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@mentron.in',
      url: `${SITE_URL}/contact`,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    founder: {
      '@type': 'Person',
      name: 'Nithish Yadav',
      url: `${SITE_URL}/about`,
    },
  }
}

// ============================================================================
// WEBSITE JSON-LD with SearchAction (For homepage)
// ============================================================================

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Your AI Study Partner - Adaptive learning paths, AI-generated study materials, and instant feedback personalized for your goals.',
    inLanguage: 'en-US',
    publisher: {
      '@id': `${SITE_URL}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ============================================================================
// BLOG (CollectionPage) JSON-LD (For /blogs list page)
// ============================================================================

export function generateBlogCollectionJsonLd() {
  const posts = getAllPosts();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/blogs#collectionpage`,
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blogs`,
    description: 'Insights on AI-powered learning, education technology, and study strategies for students, teachers, and institutions.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${SITE_URL}/blogs`,
        },
      ],
    },
    hasPart: posts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${SITE_URL}/blogs/${post.slug}#blogposting`,
      name: post.title,
      url: `${SITE_URL}/blogs/${post.slug}`,
      headline: post.title,
      description: post.description,
      datePublished: new Date(post.date).toISOString(),
      author: {
        '@type': 'Person',
        name: post.author.name
      }
    }))
  }
}

// ============================================================================
// FAQ JSON-LD (If you have FAQ section)
// ============================================================================

export function generateFAQJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ============================================================================
// PERSON JSON-LD (For author pages)
// ============================================================================

export function generatePersonJsonLd(author: {
  name: string
  image: string
  role: string
  bio?: string
  social?: {
    twitter?: string
    linkedin?: string
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/about#person`,
    name: author.name,
    image: author.image ? `${SITE_URL}${author.image}` : undefined,
    jobTitle: author.role,
    description: author.bio,
    worksFor: {
      '@id': `${SITE_URL}#organization`,
    },
    url: `${SITE_URL}/about`,
    sameAs: [
      author.social?.twitter,
      author.social?.linkedin,
    ].filter(Boolean),
  }
}

// ============================================================================
// VIDEO JSON-LD (If blog posts contain videos)
// ============================================================================

export function generateVideoJsonLd(video: {
  title: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string // ISO 8601 format, e.g., "PT1M30S"
  contentUrl: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: `${SITE_URL}${video.thumbnailUrl}`,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.contentUrl,
    publisher: {
      '@id': `${SITE_URL}#organization`,
    },
  }
}
