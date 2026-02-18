# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Green Irony headless WordPress frontend built with **Faust.js** (WP Engine's headless framework), **Next.js 15**, **React 19**, **Apollo Client**, and **TypeScript**. Deployed on WP Engine's Atlas platform.

## Commands

| Command | Script | Purpose |
|---------|--------|---------|
| `pnpm dev` | `faust dev` | Start dev server |
| `pnpm build` | `faust build` | Production build |
| `pnpm start` | `faust start` | Start production server |
| `pnpm generate` | `faust generatePossibleTypes` | Regenerate GraphQL types (`possibleTypes.json`) |
| `pnpm format` | `prettier . --write` | Format code |
| `pnpm test:format` | `prettier . --check` | Check formatting |

No test runner is configured.

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_WORDPRESS_URL` — WordPress GraphQL endpoint (e.g. `https://bpheadlessgiwe.wpenginepowered.com/`)
- `FAUSTWP_SECRET_KEY` — Faust plugin secret from WP admin
- `NEXT_PUBLIC_SITE_URL` — Frontend canonical URL (e.g. `http://localhost:3000`)

Optional:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 tracking
- `HUBSPOT_PORTAL_ID` — HubSpot tracking
- `NEXT_PUBLIC_ENABLE_WP_SECTIONS=1` — Enable ACF flexible content sections from WordPress (falls back to hardcoded sections without this)

## Architecture

### Data Flow
1. **WordPress content** (pages, posts, menus) → fetched via GraphQL through Faust.js/Apollo Client
2. **Customer stories** → static JSON files in `/data/customer-stories/`, loaded by `lib/customerStories.ts`, auto-discovered and rendered at `/customer-stories/[slug]/`
3. **Homepage sections** → either hardcoded components OR dynamic ACF flexible content (controlled by `NEXT_PUBLIC_ENABLE_WP_SECTIONS` env var)

### Routing & Templates
- **`pages/[...wordpressNode].js`** — Catch-all for WordPress-managed content, delegates to Faust template system
- **`wp-templates/`** — WordPress template implementations (`front-page.js`, `page.js`, `single.js`, `archive.js`). Each exports a `.queries` array for GraphQL prefetching
- **`pages/*.tsx`** — Custom static pages (about, careers, contact, services/*) that bypass WordPress templates
- **`pages/api/subscribe.ts`** — Email subscription endpoint
- Trailing slashes enforced globally in `next.config.js`

### GraphQL
- **`queries/`** — Site settings, header menu, and ACF sections queries
- **`fragments/PostListFragment.js`** — Shared blog post fields fragment
- **`possibleTypes.json`** — Apollo type mapping; regenerate with `pnpm generate` after WordPress schema changes

### Section Registry (`lib/sectionRegistry.js`)
Maps ACF `__typename` values to React components. Used by `wp-templates/front-page.js` to dynamically render WordPress flexible content sections. The ACF field group setup is documented in `README-acf-sections.md`.

### Static Generation
Pages use `getStaticProps` with ISR (`revalidate: 60`). Customer story pages use `getStaticPaths` from JSON data files.

## Styling

- **Tailwind CSS** as primary styling (configured in `tailwind.config.js`)
- **CSS modules** in `styles/` for component-scoped styles
- **Global utilities** in `styles/globals.css`: `.btn-primary`, `.btn-secondary`, `.kpi-chip`, `.on-dark`/`.on-light`, `.gi-prose`, `.gi-hubspot`
- Brand colors prefixed `gi-`: `gi-green` (#5AAD5A), `gi-pink` (#C40084), `gi-navy`/`gi-text` (#061E4B), `gi-fog` (#EEF1F6), `gi-line` (#E9E9EF), `gi-subtle` (#F7F9FC)
- Tailwind safelist includes dynamic `text-gi-*` and `bg-gi-*` classes used in the Solution component
- Typography plugin customizes prose link/blockquote styling

## Component Conventions

- TypeScript interfaces for props
- Framer Motion for animations with `useReducedMotion` for accessibility
- Heavy components (e.g. `BackgroundStarsCanvas`) use Next.js `dynamic()` with SSR disabled
- SEO handled via `lib/seo.ts`: `buildCanonicalUrl()`, `generateSeoTitle()`, `toAbsoluteUrl()`
- JSON-LD structured data in `_app.js` (Organization, WebSite) and per-page (BlogPosting, CreativeWork)

## Adding Content

**New customer story:** Create `slug.json` in `/data/customer-stories/` matching the schema in `schemas/customer-story.schema.json`. It will be auto-discovered and rendered at `/customer-stories/[slug]/`.

**New page:** Create `.tsx` in `/pages/` with `getStaticProps`. Use existing layout components (Header/Footer) and `buildCanonicalUrl()` for SEO.

**New redirect:** Add to `redirects.js` (preferred) or inline in `next.config.js`.
