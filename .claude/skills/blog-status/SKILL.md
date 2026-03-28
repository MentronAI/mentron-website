---
name: blog-status
description: |
  Show blog writing progress dashboard. Displays written/unwritten counts,
  next 5 blogs to write, and per-cluster completion status.
---

# /blog-status

Display a dashboard showing blog writing progress for the Mentron website.

## Usage

```bash
/blog-status
```

## What This Skill Does

1. **Reads topic clusters** from `mentron_ai_lms_topic_clusters_100.json`
2. **Counts** written vs unwritten blogs
3. **Lists** next 5 unwritten blogs by cluster order
4. **Shows** completion percentage per cluster
5. **Displays** summary dashboard

## Output Format

```
+====================================================================+
|                    MENTRON BLOG STATUS DASHBOARD                   |
+====================================================================+
| Total Progress      | 7/100 blogs written (7%)                    |
+--------------------------------------------------------------------+
| CLUSTER BREAKDOWN                                                  |
+--------------------------------------------------------------------+
| Cluster                         | Written | Total | Progress       |
|--------------------------------|---------|-------|----------------|
| 1. AI LMS Fundamentals         | 6       | 8     | ████████░░ 75% |
| 2. AI Assessment               | 0       | 12    | ░░░░░░░░░░░░ 0% |
| 3. Learning Analytics          | 1       | 10    | ██░░░░░░░░░░ 10% |
| ...                            | ...     | ...   | ...            |
+--------------------------------------------------------------------+
| NEXT 5 BLOGS TO WRITE                                              |
+--------------------------------------------------------------------+
| 1. AI LMS Pricing Models Explained: 2026 Edition                   |
|    → Est. Medium volume, Medium difficulty                        |
| 2. AI LMS for Small EdTech Startups: How to Compete               |
|    → Est. Low volume, Medium difficulty                            |
| 3. Generative AI in LMS: Beyond Chatbots and Content              |
|    → Est. High volume, High difficulty                            |
| 4. AI LMS Trends Shaping the Future of Learning                    |
|    → Est. High volume, Medium difficulty                          |
| 5. AI Quiz Generator for Teachers: Complete Guide                 |
|    → Est. High volume, Medium difficulty                          |
+--------------------------------------------------------------------+
| RUN /write-blog next TO START WRITING                              |
+====================================================================+
```

## Implementation

```bash
# Read the JSON and generate the dashboard
node -e '
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("mentron_ai_lms_topic_clusters_100.json", "utf8"));

const written = data.filter(d => d.written).length;
const total = data.length;
const pct = Math.round((written / total) * 100);

// Group by cluster
const clusters = {};
data.forEach(d => {
  const key = d.cluster_no + ". " + d.cluster_name;
  if (!clusters[key]) clusters[key] = { written: 0, total: 0 };
  clusters[key].total++;
  if (d.written) clusters[key].written++;
});

// Build progress bar
const bar = (n, max) => {
  const filled = Math.round((n / max) * 10);
  return "█".repeat(filled) + "░".repeat(10 - filled);
};

console.log("+====================================================================+");
console.log("|                    MENTRON BLOG STATUS DASHBOARD                   |");
console.log("+====================================================================+");
console.log("| Total Progress      | " + written + "/" + total + " blogs written (" + pct + "%)".padEnd(39) + "|");
console.log("+--------------------------------------------------------------------+");
console.log("| CLUSTER BREAKDOWN                                                  |");
console.log("+--------------------------------------------------------------------+");
console.log("| Cluster                         | Written | Total | Progress       |");
console.log("|--------------------------------|---------|-------|----------------|");

Object.entries(clusters).forEach(([name, stats]) => {
  const shortName = name.substring(0, 30).padEnd(30);
  const clusterPct = Math.round((stats.written / stats.total) * 100);
  console.log("| " + shortName + " | " + String(stats.written).padStart(7) + " | " + String(stats.total).padStart(5) + " | " + bar(stats.written, stats.total) + " " + String(clusterPct).padStart(2) + "% |");
});

console.log("+--------------------------------------------------------------------+");
console.log("| NEXT 5 BLOGS TO WRITE                                              |");
console.log("+--------------------------------------------------------------------+");

const next5 = data.filter(d => !d.written).slice(0, 5);
next5.forEach((d, i) => {
  console.log("| " + (i + 1) + ". " + d.blog_title.substring(0, 58).padEnd(58) + " |");
  console.log("|    → " + d.search_volume + " volume, " + d.difficulty + " difficulty".padEnd(56) + " |");
});

console.log("+--------------------------------------------------------------------+");
console.log("| RUN /write-blog next TO START WRITING                              |");
console.log("+====================================================================+");
'
```

## Files Used

- `mentron_ai_lms_topic_clusters_100.json` - Topic data with written status

## Quick Stats Only

If you just want the numbers without the full dashboard:

```bash
node -e '
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("mentron_ai_lms_topic_clusters_100.json", "utf8"));
const written = data.filter(d => d.written).length;
console.log(written + "/" + data.length + " blogs written (" + Math.round((written/data.length)*100) + "%)");
'
```
