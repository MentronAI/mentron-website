---
name: perplexity
description: |
  Use Perplexity Pro for web searches, research, and code generation.
  Provides real-time web access with citation-backed answers, deep research
  capabilities, and code/app generation.
---

# Perplexity Pro Web Search

Use Perplexity Pro for web searches, research, and code generation. Perplexity provides real-time web access with citation-backed answers.

## Usage
```
/perplexity [query]
```

## When to Use

TRIGGER when:
- User asks for current information, news, or real-time data
- User needs web search with sources and citations
- User wants deep research on a complex topic
- User wants to generate code files or applications
- User explicitly mentions "search the web", "look up", "research", or "perplexity"

DO NOT TRIGGER when:
- User asks about local files, code, or project-specific questions
- Information can be found in the current codebase
- User wants to use other search tools (like Context7 for docs)

## Available Tools

| Tool | Purpose | Default Timeout | When to Use |
|------|---------|-----------------|-------------|
| `perplexity_query` | Standard web search | 5 min (300s) | Quick facts, current events, simple questions |
| `perplexity_deep_research` | Multi-step research | 5 min (300s) | Complex topics requiring thorough investigation |
| `perplexity_create_code` | Generate code files | 5 min (300s) | Creating apps, scripts, or multi-file code |
| `perplexity_select_model` | Choose AI model | — | Switching models for specific tasks |
| `perplexity_health_check` | Diagnostics | — | Troubleshooting connection issues |
| `perplexity_login` | Authentication | — | Only if session expired |

## Best Practices

### 1. Choose the Right Mode

```
Simple factual question → perplexity_query
Complex research topic → perplexity_deep_research
Generate code/apps     → perplexity_create_code
```

### 2. Timeout Control

All three core tools (`perplexity_query`, `perplexity_deep_research`, `perplexity_create_code`) accept an optional `timeout` parameter (in milliseconds). Default is 5 minutes (300000ms).

```json
// Quick query — use shorter timeout
perplexity_query({
  "query": "What is the latest React version?",
  "maintainChat": true,
  "timeout": 60000          // 1 minute
})

// Deep research — give it more time
perplexity_deep_research({
  "query": "Comprehensive analysis of AI LMS market 2026",
  "maintainChat": true,
  "timeout": 300000         // 5 minutes
})

// Code generation — default is fine for most cases
perplexity_create_code({
  "query": "Create a REST API with Express and TypeScript",
  "maintainChat": true
  // timeout defaults to 300000 (5 min)
})
```

### 3. Model Selection

Default to **Claude Sonnet 4.6 with thinking** for complex reasoning:

```json
{
  "model": "claude-sonnet-4.6",
  "enableThinking": true
}
```

Available models:
- `claude-sonnet-4.6` - Best for most tasks (default)
- `claude-opus-4.6` - Most capable, for complex tasks (Max tier)
- `gpt-5.4` - OpenAI's latest
- `gemini-3.1-pro` - Google's model
- `sonar` - Fast, lightweight
- `best` - Auto-selects best available

### 4. Maintain Chat Context

Always use `maintainChat: true` to keep conversation context:

```json
{
  "query": "What are the latest developments in quantum computing?",
  "maintainChat": true
}
```

### 5. Use File Context for Code Generation

When generating code, upload relevant files first:

```json
{
  "query": "Create a REST API endpoint based on this schema",
  "files": ["/path/to/schema.json"],
  "maintainChat": true
}
```

## Example Usage

### Quick Web Search

```
User: What's the latest version of React?

→ perplexity_query({
  "query": "What is the latest version of React as of 2026?",
  "maintainChat": true,
  "timeout": 60000        // 1 minute for quick queries
})
```

### Deep Research

```
User: Research the state of AI agents in 2026

→ perplexity_deep_research({
  "query": "What is the current state of AI agents and autonomous systems in 2026? Include major players, breakthroughs, and adoption trends.",
  "maintainChat": true,
  "timeout": 600000       // 10 minutes for deep research
})
```

### Code Generation

```
User: Create a TypeScript CLI tool that fetches weather data

→ perplexity_create_code({
  "query": "Create a TypeScript CLI tool that fetches weather data from OpenWeatherMap API. Include argument parsing, error handling, and formatted output.",
  "maintainChat": true
})
```

### Follow-up Questions

```
User: Tell me more about the second point

→ perplexity_query({
  "query": "Can you elaborate on the second point about adoption trends?",
  "maintainChat": true
})
```

### Compare Options

```
User: Compare Bun vs Deno vs Node.js performance

→ perplexity_query({
  "query": "Compare Bun vs Deno vs Node.js performance in 2026. Include benchmarks, startup time, and runtime performance.",
  "maintainChat": true
})
```

## Response Format

All queries return:
```json
{
  "answer": "The response text...",
  "sources": [{"title": "Source Name", "url": "https://..."}],
  "chatUrl": "https://www.perplexity.ai/search/...",
  "mode": "standard|deep_research|create_code"
}
```

For deep research, also includes:
```json
{
  "researchProgress": {
    "currentStep": 3,
    "totalSteps": 5,
    "stepDescription": "Analyzing market data",
    "isComplete": false
  }
}
```

For code generation, also includes:
```json
{
  "generatedFiles": [
    {
      "filename": "app.ts",
      "content": "// code here...",
      "language": "typescript"
    }
  ]
}
```

## Tips

1. **Be specific in queries** - Perplexity works best with clear, specific questions
2. **Use follow-ups** - Leverage chat continuity to dive deeper into topics
3. **Check sources** - Always verify sources for critical information
4. **Tune timeouts** - Default is 5 min. Use shorter timeouts for quick queries, longer for deep research
5. **Enable thinking for complex tasks** - Improves reasoning quality

## Troubleshooting

If queries fail:
1. Run `perplexity_health_check` to diagnose issues
2. If "Sign in" popup appears, run `perplexity_login` to refresh session
3. Check that browser-data directory exists in storage/

## Notes

- Requires Perplexity Pro subscription for advanced models
- Session persists in browser-data directory
- Auth is automatic after initial login
- Supports file uploads (max 30 files)
