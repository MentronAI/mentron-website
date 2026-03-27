# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mentron marketing website - a Next.js 16 landing page for the Mentron AI-powered LMS platform. Uses App Router with MDX blog support.

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Build & Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## Architecture

### App Structure (Next.js App Router)
- `app/page.tsx` - Homepage composed of section components
- `app/layout.tsx` - Root layout with fonts, JSON-LD schemas, sidebar, grid background
- `app/blogs/` - Blog listing and `[slug]` dynamic routes for MDX posts
- `app/api/institutional-demo/route.ts` - API endpoint for demo requests (MongoDB)
- `app/about/`, `app/privacy/`, `app/terms/`, `app/thank-you/`, `app/institutional-demo/` - Static pages

### Component Organization
- `components/sections/` - Landing page sections (hero, testimonials, FAQ, CTA, etc.)
- `components/layout/` - Shared layout components (sidebar, footer)
- `components/ui/` - Shadcn UI primitives (button, card, accordion, form, input)

### Libraries (`lib/`)
- `lib/mongodb.ts` - MongoDB client with dev/prod connection handling
- `lib/supabase.ts` - Supabase client (if needed for auth/storage)
- `lib/blog.ts` - MDX blog utilities (getAllPosts, getPostBySlug, getAllCategories)
- `lib/seo.ts` - JSON-LD schema generators (Organization, Website, BlogPosting, FAQ, Breadcrumb)
- `lib/utils.ts` - Utility functions (cn helper for class merging)

### Content
- `content/blogs/` - MDX blog posts with frontmatter (title, description, date, author, image, category, featured, published)

### Styling
- Tailwind CSS v4 with custom theme (primary: #0077FF, custom animations, card colors)
- Fonts: Geist (sans), Geist Mono, Bricolage Grotesque (display)
- Global styles in `app/globals.css`

### SEO
- Comprehensive JSON-LD schemas for Google Rich Results
- Open Graph and Twitter card metadata
- sitemap.ts and robots.ts for search engines

## Key Patterns

### Section Components
Homepage sections use "use client" when they need state/animations. They're composed in order in `app/page.tsx`:
```tsx
<HeroSection />
<TrustSignals />
<ProblemSection />
...etc
```

### Blog Posts
MDX files in `content/blogs/` with frontmatter:
```mdx
---
title: string
description: string
date: YYYY-MM-DD
author: { name, image, role }
image: string
category: string[]
featured: boolean
published: boolean
---
```

### API Routes
Use MongoDB via `clientPromise` from `lib/mongodb.ts`. Development mode uses global variable for HMR compatibility.

## Environment Variables

```bash
MONGODB_URI=mongodb://localhost:27017        # MongoDB connection
NEXT_PUBLIC_SUPABASE_URL=                    # Supabase URL (optional)
NEXT_PUBLIC_SUPABASE_ANON_KEY=               # Supabase anon key (optional)
```
