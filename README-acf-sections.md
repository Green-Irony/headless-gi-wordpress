# ACF Sections Blueprint (Homepage)

Use this to enable drag‑and‑drop sections in WP Admin (Pages → Edit → Sections).

## Plugins
- Advanced Custom Fields Pro
- WPGraphQL
- WPGraphQL for ACF

## Field Group
- Title: Page Sections
- Location: Show on Page (all Pages)
- Field: Flexible Content
  - Field Name: sections
  - Field Key: page_sections

### Layouts
Create these layouts under the `sections` flexible content field with the exact names/fields. The layout names control the GraphQL union types (e.g., `Page_Sections_Hero`).

1) Hero (name: hero)
- Text: title
- Textarea: body
- Text: primaryCtaLabel
- URL: primaryCtaUrl
- Text: secondaryCtaLabel
- URL: secondaryCtaUrl

2) TrustStrip (name: trustStrip)
- Text: heading
- Textarea: subhead
- Repeater: logos
  - Text: name
  - URL: imageUrl (or Image field if preferred; then expose its URL via WPGraphQL)

3) ValuePillars (name: valuePillars)
- Repeater: items
  - Text: title
  - Textarea: body
  - Text: icon (optional string)

4) FeaturedOffers (name: featuredOffers)
- Repeater: items
  - Text: title
  - Textarea: body
  - Text: ctaLabel
  - URL: ctaUrl
  - Text: flag (optional)
  - Text: icon (optional)

5) HowItWorks (name: howItWorks)
- Repeater: steps
  - Text: k
  - Text: title
  - Textarea: body

6) CustomerStories (name: customerStories)
- Repeater: items
  - Text: brand
  - Text: title
  - Textarea: blurb
  - URL: posterUrl (or Image field → URL)
  - Text: videoId
  - Repeater: kpis → Text

7) LeadMagnetCta (name: leadMagnetCta)
- Text: title
- Textarea: body
- Repeater: bullets → Text
- Text: primaryCtaLabel
- URL: primaryCtaUrl
- Text: secondaryCtaLabel
- URL: secondaryCtaUrl

8) PreFooterCta (name: preFooterCta)
- Text: title
- Textarea: body
- Text: primaryCtaLabel
- URL: primaryCtaUrl
- Text: secondaryCtaLabel
- URL: secondaryCtaUrl

## GraphQL
After saving field group and enabling plugins, you should see fields under:
```
page(id: $uri, idType: URI) {
  sections { __typename ... }
}
```
The repo has a guarded query:
- Set `NEXT_PUBLIC_ENABLE_WP_SECTIONS=1` in `.env.local` to activate runtime fetching.
- Without the flag, the homepage falls back to hardcoded sections.

## Notes
- You can import this group via ACF UI, or recreate manually using the names above for predictable GraphQL typenames.
- Later, we can refactor components to read props from these fields (the registry is already in place). 