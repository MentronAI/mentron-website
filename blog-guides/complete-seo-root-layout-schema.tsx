// app/layout.tsx - Add to root layout
import { generateOrganizationJsonLd, generateWebsiteJsonLd } from '@/lib/seo'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationJsonLd = generateOrganizationJsonLd()
  const websiteJsonLd = generateWebsiteJsonLd()

  return (
    <html lang="en">
      <head>
        {/* Organization Schema (site-wide) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        {/* Website Schema with SearchAction (site-wide) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}