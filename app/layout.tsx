import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import Sidebar from "@/components/layout/sidebar";
import { generateOrganizationJsonLd, generateWebsiteJsonLd } from "@/lib/seo";
import "./globals.css";

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
  metadataBase: new URL('https://mentron.in'),
  title: "Mentron LMS- Smarter Learning & Smarter Teaching",
  description: "AI powered LMS that learns your learning style and auto-generates flashcards, quizzes, mind maps. Makes learning faster, saves teachers 6+ hrs/week.",
  openGraph: {
    title: 'Mentron LMS- Smarter Learning & Smarter Teaching',
    description: 'AI powered LMS that learns your learning style and auto-generates flashcards, quizzes, mind maps. Makes learning faster, saves teachers 6+ hrs/week.',
    url: 'https://mentron.in',
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
    creator: '@mentronai',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = generateOrganizationJsonLd();
  const websiteJsonLd = generateWebsiteJsonLd();

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} min-h-screen bg-white font-sans antialiased`}>
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        {/* Grid background */}
        <div className="fixed w-full h-full top-0 left-0 pointer-events-none z-0 opacity-40"
          style={{
            backgroundImage: 'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row min-h-screen max-w-[1600px] mx-auto">
          <Sidebar />
          <main className="flex-1 lg:ml-64 flex flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}