# next/image Audit — 2026-06-06

**Goal:** Convert raw `<img>` tags in components and pages to Next.js `<Image>` components for format optimization (avif/webp), lazy loading, and explicit dimensions.

## Method

```bash
grep -rn "<img\b" app/ components/ --include="*.tsx" --include="*.ts"
```

Excluding content/blogs (blog content images, which are subject to the no-content-images policy).

## Findings

| File | Line | Type | Status |
|------|------|------|--------|
| `components/sections/integrations.tsx` | 659 | Raw `<img>` in HTML string passed to `dangerouslySetInnerHTML` | **Documented — left as-is** |
| `components/sections/integrations.tsx` | 714 | `document.createElement('img')` for dynamic app grid (6-9 logos) | **Documented — left as-is** |

**All other components and pages already use `next/image`:** `app/blogs/[slug]/page.tsx`, `app/blogs/page.tsx`, `components/layout/footer.tsx`, `components/layout/sidebar.tsx`.

## Why integrations.tsx is left as-is

The `Integrations` section is a Stripe-style animated diagram with a static HTML/CSS/JS payload rendered via `dangerouslySetInnerHTML`. It includes:
- 1 static center logo (52x52 WebP)
- 6-9 dynamic app icon logos (32x32 WebP each, rendered via `document.createElement('img')`)

**Conversion cost:** Replacing the static `<img>` would require refactoring the entire component to render via React JSX instead of HTML string (replacing `dangerouslySetInnerHTML` with explicit React nodes, and replacing `document.createElement('img')` with React state). This is a multi-hour refactor that touches the animation system, the CSS class wiring, and the JS observer logic.

**Conversion benefit:** Small. The 7-10 small logos total <10KB. Format optimization (avif) and lazy loading are already applied via `loading="lazy"` and the existing WebP format. LCP/CLS impact is negligible for decorative logos inside an animated section.

**Decision:** Defer. If Lighthouse Performance drops below 90 on the homepage, revisit this conversion. Otherwise, accept the existing pattern.

## Cross-link to plan

- Strategic SEO Plan §5.2 — Performance + image audit
- `next.config.mjs` already has `images.formats: ['image/avif', 'image/webp']` (Phase 1)

## Verification (pending)

- [ ] Lighthouse Performance ≥90 on `/` after C7/C8/C9 batch publishes (the additional content affects link equity, not LCP)
- [ ] Lighthouse Performance ≥90 on `/blogs`
- [ ] Lighthouse Performance ≥90 on `/blogs/what-is-an-ai-lms-complete-2026-guide`

## Conclusion

The audit is clean. The codebase already uses `next/image` for 100% of component/page images. The one raw `<img>` case is a deliberate architectural pattern in `integrations.tsx` that is not worth refactoring for the negligible perf benefit.
