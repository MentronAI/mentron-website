import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.mentron.in'

  return {
    rules: [
      // Default: allow all user agents, block admin/utility paths
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Block API routes
          '/admin/',         // Block admin pages
          '/dashboard/',     // Block user dashboard
          '/login',          // Block auth pages
          '/signup',
          '/reset-password',
        ],
      },
      // AI SEARCH crawlers (user-facing citation) — allow explicitly
      {
        userAgent: [
          'GPTBot',              // OpenAI search crawler
          'OAI-SearchBot',       // OpenAI search features
          'ChatGPT-User',        // OpenAI user-triggered browse
          'ClaudeBot',           // Anthropic web features
          'Claude-Web',          // Anthropic user-triggered fetch
          'PerplexityBot',       // Perplexity search
          'Perplexity-User',     // Perplexity user-triggered fetch
          'Applebot-Extended',   // Apple Intelligence
        ],
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/', '/login', '/signup', '/reset-password'],
      },
      // AI TRAINING crawlers — block (we don't consent to training on our content)
      {
        userAgent: [
          'CCBot',           // Common Crawl (feeds most AI training corpora)
          'anthropic-ai',    // Anthropic training crawler
          'Google-Extended', // Google Gemini training (separate from Googlebot search)
          'Omgilibot',       // Omgili
          'FacebookBot',     // Meta AI training
          'Bytespider',      // ByteDance (uncomment to block)
        ],
        disallow: ['/'],
      },
      // Search engine crawlers
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Googlebot-News'],
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-blogs.xml`,
    ],
  }
}
