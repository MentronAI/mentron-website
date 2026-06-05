import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mentron.in'

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-05-12'),
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date('2026-05-12'),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-06-03'),
    },
    {
      url: `${baseUrl}/institutional-demo`,
      lastModified: new Date('2026-01-15'),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-01-15'),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-01-15'),
    },
  ]
}
