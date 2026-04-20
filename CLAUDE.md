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

## Blog Automation Pipeline

Automated blog generation using Perplexity research and SEO optimization.

### Skills Available

| Skill | Purpose |
|------|---------|
| `/write-blog next` | Generate the next unwritten blog |
| `/write-blog <slug>` | Generate a specific blog by slug |
| `/write-blog batch N` | Generate N blogs in sequence |
| `/blog-status` | Show progress dashboard |
| `/qc-blog <slug>` | SEO quality check with keyword density, E-E-A-T, topic coverage |
| `/qc-blog <slug> --fix` | SEO quality check + auto-fix issues |
| `/qc-blog batch <N>` | Quality check last N blogs |
| `/blog-infographic <slug>` | Generate branded infographics for a blog |
| `/link-blogs <slug>` | Add internal links to a blog |
| `/link-blogs all` | Add internal links to all blogs |

### Topic Tracking

- **Source**: `mentron_ai_lms_topic_clusters_100.json` - 100 blog topics with `written` field
- **Prompt**: `content-writer.md` - Comprehensive SEO content-writer template
- **Output**: `content/blogs/{slug}.mdx`

### Flow

1. Reads topic from JSON (first unwritten by cluster order)
2. Builds prompt from `content-writer.md` + topic data
3. Calls Perplexity deep research for content generation
4. Validates markdown (frontmatter, code blocks, structure)
5. Repairs broken markdown using LLM if needed
6. Publishes via `/publish-blog`
7. Updates JSON with `written: true`
8. Optional post-write: `/qc-blog`, `/blog-infographic`, `/link-blogs`

### Current Progress

- 6/100 blogs written (6%)
- Cluster 1 (AI LMS Fundamentals): 60% complete
- Clusters 2-10: 0% complete

### Content Guidelines

**IMPORTANT**: The product has NOT launched yet. Never include:
- Fake testimonials or named case studies
- Claims of actual implementation or customer success
- Specific improvement statistics (e.g., "34% improvement")
- Real institutions using Mentron (IIT Madras, Delhi Public School, etc.)

**Author**: Always use `Ananya Krishnan` with image `/images/authors/ananya.png`

### Blog Images

Blog images are stored in `public/images/blog/{slug}/` with the following structure:

- **Hero image**: 1200×630 webp, referenced in MDX frontmatter `image` field. Also serves as OG/Twitter card image automatically via `lib/seo.ts`.
- **Content images**: 1184×864 webp, embedded inline in the MDX body using JSX `<img>` tags (NOT markdown `![]()` syntax).

**Content image format in MDX** (use this exact pattern):
```jsx
<img src="/images/blog/{slug}/{filename}.webp" alt="Descriptive alt text" width="1184" height="864" loading="lazy" style={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid #e2e8f0' }} />
```

**Why JSX `<img>` and NOT markdown `![]()`**:
- Markdown images render as plain `<img>` without explicit dimensions → causes CLS (Cumulative Layout Shift) warnings
- Markdown images don't support `loading="lazy"` for below-fold content
- JSX `<img>` with `width`/`height` prevents layout shift and enables lazy loading

**Image naming convention**: Use descriptive kebab-case names matching the image content (e.g., `evolution-of-learning-platforms.webp`, `adaptive-learning-cycle.webp`).

### Image Generation Prompts

Image prompts are stored in `mentron_ai_lms_topic_clusters_100.json` under `hero_image_idea` and `content_image_ideas` (array of 3) for each blog.

**Prompt style rules** (these prevent broken AI-generated images):
- Use Bricolage Grotesque font for headings (the site's `font-display`), clean sans-serif for body text
- Describe colors as "pale blue" / "pale mint green" — NEVER use hex codes or opacity percentages (they render as literal text in the image)
- Always include: "Do NOT render any color codes, hex values, or percentage numbers as visible text"
- Hero heading text should be a meaningful 4-7 word tagline, not a generic label like "AI LMS"
- Style: flat minimalist line-art, no gradients, no shadows, no 3D effects

### Validation Rules

Before publishing, check:
- Frontmatter exists with all required fields
- Code blocks are balanced (``` count matches)
- No unclosed HTML tags
- Heading hierarchy is correct (no skipped levels)
