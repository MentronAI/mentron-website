---
name: write-blog
description: |
  Generate a blog post using Perplexity research and the SEO content-writer prompt.
  Selects the next unwritten topic from the topic clusters, generates content, validates
  markdown, and publishes via /publish-blog. Supports batch processing.
---

# /write-blog

Generate SEO-optimized blog posts for the Mentron website using Perplexity research.

## Usage

```bash
/write-blog next              # Generate the next unwritten blog
/write-blog <slug>            # Generate a specific blog by slug
/write-blog batch <N>         # Generate N blogs in sequence
```

## What This Skill Does

1. **Reads topic clusters** from `mentron_ai_lms_topic_clusters_100.json`
2. **Selects topic** (first unwritten, or specified slug)
3. **Builds prompt** from `content-writer.md` + topic data
4. **Calls Perplexity** for deep research and content generation
5. **Validates markdown** (frontmatter, code blocks, structure)
6. **Repairs broken markdown** using LLM if needed
7. **Publishes** via `/publish-blog`
8. **Updates JSON** with `written: true`

## Flow

### Step 1: Load Topic Data

Read `mentron_ai_lms_topic_clusters_100.json` and:

- If `next`: Find first topic where `written === false`
- If `<slug>`: Find topic matching `blog_slug`
- If `batch N`: Process N topics sequentially

Output the selected topic's full JSON object.

### Step 2: Build the Prompt

Read `content-writer.md` and combine with the topic data:

```
[PROMPT TEMPLATE FROM content-writer.md]

---

## Topic Data

```json
{
  "title": "[blog_title]",
  "slug": "[blog_slug]",
  "cluster_no": [cluster_no],
  "cluster_name": "[cluster_name]",
  "primary_keywords": [parsed from primary_keywords],
  "secondary_keywords": [parsed from secondary_keywords],
  "search_volume": "[search_volume]",
  "difficulty": "[difficulty]",
  "competitor_urls": [parsed from competitor_urls_to_use],
  "content_angle": "[content_angle]"
}
```
```

### Step 3: Generate Content

Call `mcp__perplexity__perplexity_deep_research` with the combined prompt:

```json
{
  "query": "[FULL PROMPT FROM STEP 2]",
  "maintainChat": true,
  "timeout": 180000
}
```

### Step 4: Validate Markdown

Check the Perplexity response for:

1. **Frontmatter exists**: Content starts with `---` and contains required fields
2. **Required frontmatter fields**: `title`, `date`, `description`, `author`, `image`, `category`, `published`
3. **Code blocks balanced**: Count of ``` matches (opening === closing)
4. **No unclosed HTML**: `<table>` has matching `</table>`
5. **Heading hierarchy**: No skipped levels (H1 -> H3 without H2)

### Step 5: Repair if Needed

If validation fails, send to Claude with repair prompt:

```
The following markdown has validation errors:
- [LIST OF ERRORS]

Please fix these issues and return the corrected markdown. Preserve all content - only fix structural/formatting issues.

[BROKEN MARKDOWN]
```

### Step 6: Publish

Use the `/publish-blog` skill with the validated/fixed content.

### Step 7: Update Status

Update `mentron_ai_lms_topic_clusters_100.json`:
- Set `written: true` for the published topic
- Write the updated JSON back to file

### Step 8: Report

Output:
```
Published: [blog_title]
URL: https://mentron.in/blogs/[slug]
Progress: [N]/100 blogs written
Next up: [next unwritten blog title]
```

### Step 9: Post-Write Recommendations

After publishing, remind the user about optional follow-up skills:

```
QC Check:       /qc-blog {slug}
Infographics:   /blog-infographic {slug}
Internal Links: /link-blogs {slug}
```

## Batch Processing

When `batch N` is specified:

1. Run steps 1-7 for first topic
2. Wait 5 seconds between generations
3. Repeat for next N-1 topics
4. Report summary at end:
   ```
   Batch Complete:
   - Published: N blogs
   - Total progress: X/100
   - Failed: [list any failures]
   ```

## Error Handling

| Error | Action |
|-------|--------|
| Topic not found | Error with available slugs list |
| Perplexity timeout | Retry once, then skip and continue (for batch) |
| Validation unfixable | Skip and continue (for batch), error out (for single) |
| Write failure | Retry once, then error out |
| JSON update failure | Log warning, continue |

## Files Used

- `mentron_ai_lms_topic_clusters_100.json` - Topic data with written status
- `content-writer.md` - SEO prompt template
- `.claude/skills/publish-blog/SKILL.md` - Publishing skill
- `content/blogs/` - Output directory

## Example Session

```
> /write-blog next

Loading topic clusters...
Selected: "AI LMS Pricing Models Explained: 2026 Edition"

Building prompt from content-writer.md...
Calling Perplexity for research...

Validating markdown...
  - Frontmatter: OK
  - Code blocks: OK
  - Headings: OK

Publishing via /publish-blog...
Published to content/blogs/ai-lms-pricing-models-explained-2026-edition.mdx

Updating status...
Progress: 7/100 blogs written

Next up: "AI LMS for Small EdTech Startups: How to Compete"
```
