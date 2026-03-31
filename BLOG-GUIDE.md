# Mentron Blog Writing Guide

Everything you need to run the blog automation pipeline in Claude Code. This is a living document — update it as the pipeline evolves.

---

## Quick Reference

| Command | What it does |
|---------|-------------|
| `/blog-status` | Progress dashboard |
| `/write-blog next` | Write the next unwritten blog |
| `/write-blog <slug>` | Write a specific blog by slug |
| `/write-blog batch 5` | Write 5 blogs sequentially |
| `/qc-blog <slug>` | SEO audit (120-pt scorecard) |
| `/qc-blog <slug> --fix` | Audit + auto-fix |
| `/qc-blog batch 5` | Audit last 5 blogs |
| `/blog-infographic <slug>` | Generate branded infographics |
| `/link-blogs <slug>` | Add internal links to one blog |
| `/link-blogs all` | Add internal links to all blogs |
| `/publish-blog` | Manually publish pasted content |

---

## The Pipeline

Recommended order for each blog post:

```
1.  /write-blog next           generates content via Perplexity
2.  /qc-blog <slug>          scores SEO quality (120 pts)
3.  /qc-blog <slug> --fix    auto-fixes issues (if score < 80)
4.  /blog-infographic <slug>  adds branded infographics
5.  /link-blogs <slug>       adds internal links between posts
```

Each skill is standalone. You can run them in any order or independently.

---

## Step 1: Check Progress

### `/blog-status`

Shows total progress, per-cluster breakdown with progress bars, and the next 5 blogs to write.

 No arguments needed.

 Just run it.

 Output looks like:

```
+====================================================================+
|                    MENTRON BLOG STATUS DASHBOARD                   |
+====================================================================+
| Total Progress      | 7/100 blogs written (7%)                    |
+--------------------------------------------------------------------+
| CLUSTER BREAKDOWN                                                  |
| 1. AI LMS Fundamentals         | 6/8   | ████████░░ 75%           |
| 2. AI Assessment               | 0/12  | ░░░░░░░░░░░░ 0%          |
+--------------------------------------------------------------------+
| NEXT 5 BLOGS TO WRITE                                              |
| 1. AI LMS Pricing Models Explained: 2026 Edition                   |
|    Est. Medium volume, Medium difficulty                                |
+--------------------------------------------------------------------+
| RUN /write-blog next TO START WRITING                              |
+====================================================================+
```

---

## Step 2: Write a Blog
### `/write-blog`

**Usage:**
```bash
/write-blog next              # Next unwritten blog
/write-blog <slug>            # Specific blog by slug
/write-blog batch 5           # 5 blogs in sequence (5s gap)
```

**What it does:**

1. Reads the next unwritten topic from `mentron_ai_lms_topic_clusters_100.json`
2. Builds a prompt from `content-writer.md` + topic data (keywords, competitors, content angle)
3. Calls Perplexity deep research (up to 3 minutes)
4. Validates the generated markdown
frontmatter, code blocks, heading hierarchy)
5. Repairs broken markdown if needed
6. Publishes to `content/blogs/<slug>.mdx`
7. Updates the topic JSON with `written: true`

**Example:**

```
> /write-blog next

Loading topic clusters...
Selected: "AI LMS Pricing Models Explained: 2026 Edition"

Building prompt from content-writer.md...
Calling Perplexity for research...

Validating markdown...
  Frontmatter: OK
  Code blocks: OK
  Headings: OK

Publishing via /publish-blog...
Published to content/blogs/ai-lms-pricing-models-explained-2026-edition.mdx

Updating status...
Progress: 7/100 blogs written

Next up: "AI LMS for Small EdTech Startups: How to Compet"

Follow-up skills:
  QC Check:       /qc-blog ai-lms-pricing-models-explained-2026-edition
  Infographics:   /blog-infographic ai-lms-pricing-models-explained-2026-edition
  Internal Links: /link-blogs ai-lms-pricing-models-explained-2026-edition
```

---

## Step 3: Quality Check
### `/qc-blog`

**Usage:**
```bash
/qc-blog <slug>            # Single blog audit
/qc-blog batch 5           # Audit last 5 written blogs
/qc-blog all               # Audit all written blogs
/qc-blog <slug> --fix    # Audit + auto-fix
```

**What it does:**

Runs a 120-point SEO scorecard using two scripts:

1. `seo-analyzer.js` measures:
   - N-gram frequency tables (1/2/3-gram, top 50 each)
   - Per-keyword density (case-insensitive substring match)
   - Keyword placement audit (title, meta desc, intro, H2s, conclusion)
   - Topic coverage score (cluster-specific subtopic map)
   - LSI keyword detection (cluster-specific term lists)
   - Flesch-Kincaid reading level (grade 7-9 ideal)
   - FAQ section detection
   - Word count

2. `eeat-scorer.js` measures:
   - Experience (0-7 pts): specific Mentron feature references, concrete scenarios, feature-led proof
   - Expertise (0-7 pts): EdTech terminology accuracy, jargon explanation, methodology references
   - Authoritativeness (0-6 pts): external citations, data-backed claims, competitor fairness
   - Trustworthiness (0-5 pts): no fabricated quotes, limitations acknowledged, privacy mentions

**Scoring breakdown (120 pts total):**

| Category | Points | Target |
|----------|-------|--------|
| Primary keyword density | 15 | 1-2% density |
| Primary keyword placement | 20 | Title, meta desc, intro, 2-3 H2s, conclusion |
| Secondary keyword usage | 10 | 5-7 times each |
| Topic coverage | 15 | All cluster subtopics covered |
| Heading keyword coverage | 10 | 40%+ of headings contain keywords |
| FAQ section | 5 | 3-5 FAQ entries present |
| Word count | 10 | 2000-2500 words |
| Reading level | 5 | Grade 7-9 |
| LSI keyword presence | 5 | 60%+ of cluster LSI terms found |
| E-E-A-T Score | 25 | Sum of E(7) + E(7) + A(6) + T(5) |

**Grading scale:**

| Score | Grade | Action |
|-------|-------|--------|
| 100-120 | A | Publish-ready |
| 80-99 | B | Minor tweaks recommended |
| 60-79 | C | Needs revision |
| 40-59 | D | Significant rewrite |
| 0-39 | F | Start over |

**`--fix` mode** automatically:
- Inserts missing primary keywords into H2 headings and conclusion
- Adds `dateModified` to frontmatter
- Generates an FAQ section if none exists
- Re-runs analysis to produce updated score

**Example:**

```
> /qc-blog ai-lms-pricing-models-explained-2026-edition

Loading topic data...
  Primary: ai lms pricing, ai lms cost
  Secondary: lms pricing models, ai lms pricing comparison...

Running SEO analyzer...
  Primary keyword density: 1.4% (12 pts)
  Keyword placement: title YES, meta YES, intro YES, 2 H2s YES, conclusion YES (20 pts)
  Secondary keywords: 3/5 at target (6 pts)
  Topic coverage: 6/7 subtopics (13 pts)
  Heading keyword coverage: 45% (10 pts)
  FAQ section: 4 entries (5 pts)
  Word count: 2,200 (10 pts)
  Reading level: Grade 8 (5 pts)
  LSI keywords: 8/10 detected (4 pts)

Running E-E-A-T scorer...
  Experience: 5/7 (specific features + scenarios)
  Expertise: 6/7 (Bloom's, LTI, NAAC cited + explained)
  Authoritativeness: 4/6 (2 external citations)
  Trustworthiness: 4/5 (limitations acknowledged, privacy mentioned)

TOTAL: 104/120 (Grade: A)

>> /qc-blog ai-lms-pricing-models-explained-2026-edition --fix

Score: 68/120 (Grade: C) - Needs revision
Auto-fixing:
  - Inserted "ai lms pricing" into 2 H2 headings
  - Added FAQ section (4 entries)
  - Updated dateModified to 2026-03-31
Re-running analysis...
Updated score: 92/120 (Grade: B)
```

---

## Step 4: Add Infographics
### `/blog-infographic`

**Usage:**
```bash
/blog-infographic <slug>              # Generate default (2) infographics
/blog-infographic <slug> --count 3   # Generate up to 3
/blog-infographic <slug> --dry-run  # Analyze without generating
/blog-infographic batch 5           # Process last 5 blogs
```

**What it does:**

1. Reads the blog MDX file
2. Splits content by H2 sections and detects patterns:
   - Process/steps (numbered lists)
   - Feature lists (bullet items,3+)
   - Comparisons ("vs", tables)
   - Timelines (dates, phases)
   - Statistics (% claims, studies)
3. Scores sections by pattern density and length
4. Maps patterns to templates from 114 available (e.g., `sequence-steps-simple`, `compare-binary-horizontal-badge-card-vs`)
5. Generates branded PNGs with Mentron theme (primary `#0077FF`, dark bg `#0D2B5C`, `spotlight-dots` background)
6. Stores in `public/images/blog/<slug>/` with keyword-rich filenames
7. Inserts into the MDX file after the relevant H2 heading
8. Adds image SEO (alt text, ImageObject JSON-LD, descriptive filename)

**Example:**

```
> /blog-infographic ai-lms-vs-traditional-lms-key-differences-in-2026

Reading blog content...
  Found 6 H2 sections, 2,400 words

Analyzing content patterns...
  "Feature Comparison"     → Comparison (table), score: 0.91
  "How AI Solves Problems" → Process (4 steps), score: 0.82

Generating 2 infographics...
  [1/2] compare-binary-horizontal-badge-card-vs → feature-comparison-compare.png (142KB)
  [2/2] sequence-steps-simple → ai-learning-process-process.png (128KB)

Inserting into MDX...
  Inserted after "## Feature Comparison"
  Inserted after "## How AI Solves Problems"

Complete: 2 infographics added
```

---

## Step 5: Add Internal Links
### `/link-blogs`

**Usage:**
```bash
/link-blogs <slug>              # Link one blog
/link-blogs <slug> --dry-run   # Preview without editing
/link-blogs batch 5           # Link next 5 blogs
/link-blogs all               # Link all published blogs
```

**What it does:**

1. Reads all published blogs from `content/blogs/`
2. Gets target blog's keywords and cluster from the topic JSON
3. Builds candidate pool ranked by cluster proximity:
   - Same cluster = high priority
   - Related cluster = medium priority
   - All others = low priority
4. Searches target blog body for anchor text using 3 tiers:
   - Primary: candidate's primary keywords matched in target body
   - Title: first 3-4 words of candidate's title matched in target body
   - Secondary: candidate's secondary keywords matched in target body
5. Scores matches by tier weight + match length + cluster bonus
6. Selects top 3-5 links (spread across sections, 1 per cluster minimum)
7. Inserts inline links: `[anchor text](/blogs/target-slug)`
8. Appends `## Related Articles` section with 3-5 additional links
9. Verifies no broken links

**Constraints:**
- At least 1 link from the same cluster (if available)
- Links spread across different sections (300+ char gap minimum)
- Never inserts inside code blocks, existing links, or headings
- Never links to the same post twice

**Example:**

```
> /link-blogs ai-lms-vs-traditional-lms-key-differences-in-2026

Reading all published blogs...
  Found 14 published posts

Building candidate pool...
  Same cluster (1): 3 candidates
  Related clusters (2): 5 candidates
  Other: 6 candidates

Matching anchor text...
  "ai quiz generator" → matches "what-is-an-ai-lms-complete-2026-guide" (primary, same cluster)
 +13
  "adaptive learning" → matches "what-is-adaptive-learning-in-an-ai-lms" (title, same cluster) +9
  "canvas lms" → matches "canvas-lms-ai-integration-step-by-step-guide" (secondary, related) +5

Selecting top 4 links (spread across 4 sections)...

Inserting inline links...
  [1] "AI quiz generator" → /blogs/what-is-an-ai-lms-complete-2026-guide
 (in "Assessment Features" section)
  [2] "adaptive learning" → /blogs/what-is-adaptive-learning-in-an-ai-lms (in "How AI Adapts" section)
  [3] "Canvas LMS" → /blogs/canvas-lms-ai-integration-step-by-step-guide (in "Integration" section)
  [4] "knowledge graphs" → /blogs/knowledge-graphs-in-ai-lms-explained (in "Course Mapping" section)

Adding Related Articles section...
  - How Mentron Integrates with Canvas LMS
  - AI Quiz Generator for Mentron: How It Works
  - What is Adaptive Learning in an AI LMS?

Complete: 4 inline links + 3 related articles added
```

---

## Step 6: Manual Publish
### `/publish-blog`

Only needed if you have raw MDX content from Perplexity that you want to publish manually (the `/write-blog` skill calls this automatically).

```bash
/publish-blog
```

Then paste the full blog content (frontmatter + markdown body). Parses frontmatter, generates slug, saves to `content/blogs/`.

---

## Key Files

| File | Purpose |
|------|---------|
| `mentron_ai_lms_topic_clusters_100.json` | 100 blog topics with keywords, competitors, written status |
| `content-writer.md` | SEO content writer prompt template |
| `content/blogs/*.mdx` | Published blog posts |
| `FEATURES.md` | Mentron product features reference for content accuracy |
| `.claude/skills/write-blog/` | Blog generation skill |
| `.claude/skills/qc-blog/` | SEO quality check skill + scripts |
| `.claude/skills/blog-infographic/` | Infographic generation skill + scripts |
| `.claude/skills/link-blogs/` | Internal linking skill + scripts |
| `.claude/skills/publish-blog/` | Manual publish skill |
| `.claude/skills/blog-status/` | Progress dashboard skill |
| `infographic-generator/` | 114 infographic templates + generator CLI |

---

## Content Rules

These are hardcoded constraints for all generated content:

1. **Author**: Always `Ananya Krishnan` with image `/images/authors/ananya.jpg`
2. **Frontmatter**: Use `---` fences (not `***`)
3. **No fake testimonials**: Never fabricate named quotes, case studies, or institutions
4. **No launch claims**: Product has not launched. No "34% improvement" or "used by 500 schools"
 claims
5. **Real features only**: Only reference features documented in `FEATURES.md`
6. **FAQ section**: End every blog with `## Frequently Asked Questions` (3-5 entries)
7. **Word count**: Target 2000-2500 words
8. **Reading level**: Grade 7-9 (8th grade)
9. **External citations**: Minimum 2-3 authoritative external sources with clickable links
10. **Internal links**: 3-5 contextual links to other Mentron blog posts

---

## Batch Workflows

### Write a batch of blogs
```bash
/write-blog batch 5
# Then QC all of them
/qc-blog batch 5
# Fix any that scored below 80
/qc-blog <slug> --fix    # repeat as needed
# Add infographics
/blog-infographic batch 5
# Add internal links
/link-blogs all
```

### Full pipeline from scratch
```bash
# Check where you are
/blog-status

# Write the next 10 blogs
/write-blog batch 10

# Quality check all
/qc-blog batch 10

# Fix issues
/qc-blog <slug1> --fix
/qc-blog <slug2> --fix
# ... as needed

# Add infographics to all recent blogs
/blog-infographic batch 10

# Cross-link everything
/link-blogs all
```

---

## Architecture Notes

### How blog content flows to the website

```
content/blogs/*.mdx
        ↓
lib/blog.ts (getAllPosts, getPostBySlug)
        ↓
app/blogs/[slug]/page.tsx
        ↓
MDXRemote renders content with .blog-content CSS
        ↓
Automatic JSON-LD: BlogPosting + BreadcrumbList + FAQ (if present)
        ↓
app/sitemap.ts includes all posts (uses dateModified when available)
```

### FAQ Schema

When a blog has a `## Frequently Asked Questions` section with H3 entries, the `extractFAQs()` function in `lib/blog.ts` parses them automatically. The blog page template then generates a `FAQPage` JSON-LD schema for Google rich results.

### Date Modified

If a blog's frontmatter includes `dateModified`, it is used in:
- BlogPosting JSON-LD (`dateModified` field)
- Sitemap (`lastModified` field)

The `/qc-blog --fix` skill adds `dateModified` automatically when fixing blogs.

Yes lts start cluster 4 now lets try to complete one blog at a time, first lets target on the next unwritten blog in cluster 4,
  /write-blog next , use perplexity mcp for this, you will have to use the prompt + blog item as is, the prompt is in
  @content-writer.md
