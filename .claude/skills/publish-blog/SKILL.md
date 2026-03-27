---
name: publish-blog
description: |
  Publish a blog post from Perplexity-written content to the Mentron website.
  Takes MDX content with frontmatter, generates a slug from the title, and saves
  to content/blogs/. Sitemap and JSON-LD schemas are handled automatically.
---

# publish-blog

Publish a blog post from Perplexity-written content to the Mentron website.

## Usage
```
/publish-blog
```

Then paste the full blog content (frontmatter + markdown body).

## What this skill does

1. **Parses frontmatter** - Extracts title, date, description, author, image, category, published, featured
2. **Generates slug** - Converts title to URL-safe slug (lowercase, hyphens, removes special chars)
3. **Saves as .mdx** - Writes to `content/blogs/{slug}.mdx` exactly as provided (no content changes)
4. **Verifies** - Confirms file exists and shows the public URL

## Automatic integrations (no action needed)

- **Sitemap**: `app/sitemap.ts` auto-includes new posts via `getAllPosts()`
- **SEO/Schema**: `app/blogs/[slug]/page.tsx` generates BlogPosting + BreadcrumbList JSON-LD
- **Open Graph**: Meta tags generated from frontmatter via `generateBlogMetadata()`

## Frontmatter format

```yaml
---
title: "Your Blog Title"
date: "2026-01-10"
description: "SEO description (~150 chars)"
author:
  name: "Author Name"
  role: "Role, Company"
  image: "/images/authors/author.jpg"
image: "/images/blog/hero-image.jpg"
category:
  - "Category One"
  - "Category Two"
published: true
featured: false
---
```

## Execution

When invoked:

1. Ask user to paste the full blog content (frontmatter + body)
2. Parse the `title` from frontmatter
3. Generate slug: `title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')`
4. Write the exact content to `content/blogs/{slug}.mdx`
5. Confirm: "Published to https://mentron.in/blogs/{slug}"

## Important

- **Never modify content** - Save exactly as provided
- **Never modify structure** - Keep frontmatter and body unchanged
- **Verify slug uniqueness** - Check if file already exists before overwriting
