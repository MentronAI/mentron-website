---
name: write-blog
description: |
  Generate SEO-optimized blog posts for the Mentron website using Perplexity research and the SEO content-writer prompt.
  Selects the next unwritten topic from the topic clusters, generates content,
  validates markdown, and publishes via `/publish-blog` skill. Supports batch processing.
---

# /write-blog

Generate SEO-optimized blog posts for the Mentron website using Perplexity research and the SEO content-writer prompt.

## Usage

````
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
9. **Reports** progress and next topic

## Flow

### Step 1: Load Topic data
Read `mentron_ai_lms_topic_clusters_100.json` and select topic based on mode (next, slug, or specified).

- If `next`: Find first topic where `written === false`
- If `<slug>`: Find topic matching `blog_slug`
- If `batch N`: Process N topics sequentially
- Output the selected topic's full JSON object.

### Step 2: Build the prompt

**CRITICAL: You MUST use the FULL content-writer.md prompt VERBATIM — every single word, every section, every instruction. Do NOT summarize, abbreviate, paraphrase, or skip ANY part of the prompt.**

1. Read `content-writer.md` using the Read tool.
2. Read the selected topic's JSON object from the clusters file.
3. Append the topic data JSON block at the end of the full prompt.

The combined prompt must look like this:

```
[EXACT VERBATIM COPY OF content-writer.md — ALL SECTIONS INCLUDING:
 - The opening *** block
 - "Input You Will Receive" section
 - Steps 1-6 with ALL subsections, ALL bullet points, ALL examples
 - "Mentron-Specific Requirements" section
 - "Authenticity Rules" section
 - "Final Deliverable" section
 - Every single word from content-writer.md, nothing omitted]

---

## Topic Data

```json
{
  "title": "[blog_title]",
  "slug": "[blog_slug]",
  "cluster_no": [cluster_no],
  "cluster_name": "[cluster_name]",
  "primary_keywords": [parsed from primary_keywords as array],
  "secondary_keywords": [parsed from secondary_keywords as array],
  "search_volume": "[search_volume]",
  "difficulty": "[difficulty]",
  "competitor_urls": [parsed from competitor_urls_to_use as array],
  "content_angle": "[content_angle]"
}
```
```

**DO NOT:**
- Summarize the prompt into a shorter version
- Skip sections like "Step 1: Competitor Analysis" or "Authenticity Rules"
- Replace detailed instructions with vague summaries like "follow SEO best practices"
- Omit the YAML frontmatter example, the citation examples, or the output format section
- Change the author name from "Ananya Krishnan" to anything else
- Merge or condense multiple requirement sections together

**This is the #1 quality control point. If you send an abbreviated prompt, the blog quality will be severely degraded.**

### Step 3: Ensure Perplexity is Open

Before pasting content, verify Perplexity is available:

**3a. Check session status:**
```json
{
  "tool": "mcp__perplexity__perplexity_session_status"
}
```

**3b. If not open/authenticated, open Perplexity:**
```json
{
  "tool": "mcp__perplexity__perplexity_new_tab",
  "url": "https://www.perplexity.ai"
}
```

**3c. List tabs to find Perplexity (if multiple tabs):**
```json
{
  "tool": "mcp__perplexity__perplexity_list_tabs"
}
```

**3d. Switch to Perplexity tab if needed:**
```json
{
  "tool": "mcp__perplexity__perplexity_switch_tab",
  "index": [tab_index]
}
```

### Step 4: Generate Content

Use Perplexity MCP tools in sequence:

**4a. Paste the content-writer.md prompt:**
```json
{
  "tool": "mcp__perplexity__perplexity_paste",
  "content": "[FULL CONTENT FROM content-writer.md]\n\n## NOW HERE IS THE BLOG TOPIC TO WRITE:\n",
  "submit": false
}
```

**4b. Paste the topic data and submit:**
```json
{
  "tool": "mcp__perplexity__perplexity_paste",
  "content": "[TOPIC JSON OBJECT]\n\nPlease follow all the instructions above and generate the complete blog post now.",
  "submit": true
}
```

**4c. Copy the response:**
```json
{
  "tool": "mcp__perplexity__perplexity_copy_response"
}
```

> Note: Response is persisted to `storage/last-response.json`, so `copy_response` works even after the query process exits.

### Step 5: Validate Markdown
Check the Perplexity response for:
1. **Frontmatter exists**: Content starts with `***` (or `---`) and contains required fields
2. **Required frontmatter fields**: `title`, `date`, `description`, `author`, `image`, `category`, `published`
3. **Author must be**: name "Ananya Krishnan", role "Content Lead, Mentron", image "/images/authors/ananya.jpg"
4. **No inline CSS in HTML tables**: If response includes `style=""` attributes on table elements, strip them before saving
3. **Code blocks balanced**: Count of ``` matches (opening === closing)
4. **No unclosed HTML**: `<table>` has matching `</table>`
5. **Heading hierarchy**: No skipped levels (H1 -> H3 without H2)

### Step 6: Repair if Needed
if validation fails, send to Claude with repair prompt:
```
The following markdown has validation errors:
- [LIST of errors]

Please fix these issues and return the corrected markdown. Preserve all content - only fix structural/formatting issues.

[BROKEN MARKDOWN]
```

### Step 7: Publish
Use the `/publish-blog` skill with the validated/fixed content.

### Step 8: Update Status
Update `mentron_ai_lms_topic_clusters_100.json`:
- Set `written: true` for the published topic
- Write the updated JSON back to file

### Step 9: Report
Output:
```
Published: [blog_title]
URL: https://mentron.in/blogs/[slug]
Progress: [N]/100 blogs written
Next up: [next unwritten blog title]
```

## Batch processing
When `batch N` is specified:
1. Run steps 1-9 for first topic
2. Wait 10 seconds between generations
3. Repeat for next N-1 topics
4. Report summary at end:
   ```
   Batch Complete:
   - Published: N blogs
   - Total progress: X/100
   - Failed: [list any failures]
   ```

## Error handling
| Error | Action |
|-------|--------|
| Topic not found | Error with available slugs list |
| Perplexity timeout | Retry once, then skip and continue (for batch) |
| Validation unfixable | Skip and continue (for batch), error out (for single) |
| Write failure | Retry once, then error out |
| JSON update failure | Log warning, continue |

## Files used
- `mentron_ai_lms_topic_clusters_100.json` - Topic data with written status
- `content-writer.md` - SEO prompt template
- `.claude/skills/publish-blog/SKILL.md` - Publishing skill
- `content/blogs/` - Output directory for MDX blog posts

## Example session
```
> /write-blog next

Loading topic clusters...
Selected: "AI LMS Pricing Models Explained: 2026 Edition"

Checking Perplexity session...
  - Session active: yes
  - URL: https://www.perplexity.ai/

Building prompt from content-writer.md...
Pasting content-writer.md to Perplexity...
Pasting topic data and submitting...
Copying response from Perplexity...

Validating markdown...
  - Frontmatter: OK
  - Code blocks: OK
  - Headings: OK

Publishing via /publish-blog...
Published to content/blogs/ai-lms-pricing-models-explained-2026-edition.mdx

Updating status...
Progress: 8/100 blogs written

Next up: "AI LMS for Small EdTech Startups: How to Compete"
```

## Perplexity MCP Tools Reference

### Session & Tab Management

| Tool | When to Use |
|------|-------------|
| `perplexity_session_status` | Check if session is active, authenticated, get current URL |
| `perplexity_list_tabs` | List all open tabs with URLs and titles |
| `perplexity_switch_tab` | Switch to a specific tab by index |
| `perplexity_new_tab` | Open a new tab (optionally with URL) |
| `perplexity_close_tab` | Close a specific tab |
| `perplexity_navigate` | Navigate back/forward/reload or to URL |

### Content Generation

| Tool | When to Use |
|------|-------------|
| `perplexity_paste` | Paste content into Perplexity input box |
| `perplexity_copy_response` | Copy last response (persisted to `storage/last-response.json`) |
| `perplexity_query` | Quick facts, news, current info |
| `perplexity_deep_research` | Complex topics, thorough analysis |
| `perplexity_create_code` | Generate code/apps |
| `perplexity_get_code_blocks` | Extract code blocks with language info |
| `perplexity_upload_files` | Upload files for context |
| `perplexity_select_model` | Switch models (e.g., claude-sonnet-4.6) |
| `perplexity_new_chat` | Start fresh chat |

> **Note**: Response is persisted to `storage/last-response.json` between MCP calls, so `perplexity_copy_response` works even after the query process exits.


ARGUMENTS: next
