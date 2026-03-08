# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Static export to /out directory
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

This is a **Next.js static site** for Lunsen-Honig (a honey shop), exported as static HTML via `output: "export"` in `next.config.ts`. It deploys to Lima-City shared hosting, so there is no server-side rendering — no API routes, no dynamic server features.

**App Router structure** (`src/app/`):
- `layout.tsx` — Root layout with Navbar + Footer wrapping all pages, loads Google Fonts (Fraunces for headings, Outfit for body)
- `page.tsx` — Homepage composed of Hero → PriceList → RentBees → FAQ
- Pages: `agb`, `contactForm`, `danke`, `datenschutz`, `impressum`, `ueber-uns`, `widerruf`

**Components** (`src/components/`): All shared UI components. `ProductList` and `ProductCard` are currently unused (shop not yet live).

## Styling

- **Tailwind CSS v4** with custom theme in `globals.css` via `@theme {}` block
- Brand colors: `bg-primary` (olive green `#556b2f`), `bg-accent` (honey gold `#f59e0b`)
- Font variables: `font-heading` (Fraunces serif) applied via `className="font-heading"`, body uses `font-sans` (Outfit)
- Dark mode is intentionally disabled — the site always uses the warm light theme
- Scroll offset set to `6rem` in CSS to prevent fixed navbar from covering anchor targets

## Key Constraints

- `images.unoptimized: true` is required — Lima-City cannot process Next.js image optimization
- `output: "export"` means no `useRouter` redirects server-side, no API routes
- The online shop (`/shop`) is not yet implemented — the Navbar links to it but it does not exist; a static `PriceList` is used instead
