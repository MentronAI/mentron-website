import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mentron.in'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Block API routes
          '/admin/',         // Block admin pages
          '/*?*',            // Block URL parameters (prevent duplicate content)
          '/dashboard/',     // Block user dashboard
          '/login',          // Block auth pages
          '/signup',
          '/reset-password',
        ],
      },
      // Block AI crawlers from scraping content for training
      {
        userAgent: [
          'GPTBot',          // OpenAI
          'ChatGPT-User',    // OpenAI
          'CCBot',           // Common Crawl (used by many AI companies)
          'anthropic-ai',    // Anthropic (Claude)
          'Claude-Web',      // Anthropic
          'Google-Extended', // Google Bard training data
          'Omgilibot',       // Omgili
          'FacebookBot',     // Meta AI
        ],
        disallow: ['/'],
      },
      // Allow Google, Bing, other search engines
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
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
