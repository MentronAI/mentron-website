import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import Sidebar from "@/components/layout/sidebar";
import { generateOrganizationJsonLd, generateWebsiteJsonLd, generateSoftwareAppJsonLd } from "@/lib/seo";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-XV0SWYJCJL";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
  weight: ['600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mentron.in'),
  title: "Mentron LMS- Smarter Learning & Smarter Teaching",
  description: "AI powered LMS that learns your learning style and auto-generates flashcards, quizzes, mind maps. Makes learning faster, saves teachers 6+ hrs/week.",
  // Favicon and icons
  icons: {
    icon: [
      { url: '/logo/favicon_io/favicon.ico' },
      { url: '/logo/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/logo/favicon_io/apple-touch-icon.png',
  },
  manifest: '/logo/favicon_io/site.webmanifest',
  // Canonical (auto-resolves to current page URL)
  alternates: {
    canonical: './',
  },
  // Robots - allow indexing by default
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'Mentron LMS- Smarter Learning & Smarter Teaching',
    description: 'AI powered LMS that learns your learning style and auto-generates flashcards, quizzes, mind maps. Makes learning faster, saves teachers 6+ hrs/week.',
    url: 'https://www.mentron.in',
    siteName: 'Mentron',
    images: [
      {
        url: '/images/mentron-in-og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Mentron LMS',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentron LMS- Smarter Learning & Smarter Teaching',
    description: 'AI powered LMS that learns your learning style and auto-generates flashcards, quizzes, mind maps.',
    images: ['/images/mentron-in-og-default.jpg'],
    creator: '@mentrontech',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = generateOrganizationJsonLd();
  const websiteJsonLd = generateWebsiteJsonLd();
  const softwareAppJsonLd = generateSoftwareAppJsonLd();

  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} min-h-screen bg-white font-sans antialiased`}>
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
        />

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        {/* GA4 noscript fallback for users with JS disabled */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GA_MEASUREMENT_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Grid background */}
        <div className="fixed w-full h-full top-0 left-0 pointer-events-none z-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 min-h-screen">
          <Sidebar />
          <main className="flex flex-col">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}