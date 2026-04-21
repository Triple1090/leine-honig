# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.leine-honig.de   # or http://localhost:9000 for local dev
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_publishable_key_here
```

## Architecture

This is a **Next.js app** (App Router, SSR enabled) for Leine-Honig, a honey shop. It is no longer a static export — server components fetch live data from a **Medusa v2 backend**.

**App Router structure** (`src/app/`):
- `layout.tsx` — Root layout: wraps all pages in `CartProvider`, renders Navbar, CartDrawer, and Footer
- `page.tsx` — Homepage: Hero → TrustBar → Welcome → Tes
- Shop flow: `/honig` (product listing) → `/honig/[handle]` (product detail with add-to-cart) → `/warenkorb` (cart review) → `/kasse` (checkout) → `/kasse/bestaetigung` (order confirmation)
- Other pages: `agb`, `bienen-mieten`, `datenschutz`, `impressum`, `kontakt`, `ueber-uns`, `widerruf`

**Medusa integration** (`src/lib/`):
- `medusa.ts` — Medusa JS SDK client + `formatPrice()` helper (amounts in cents → `de-DE` currency string)
- `cart.tsx` — `CartProvider` context: manages cart lifecycle, stores cart ID in `localStorage` as `lh_cart_id`, exposes `addItem`, `openDrawer`, `refreshCount`

**Checkout flow** (`/kasse/page.tsx`):
- Collects address + payment method (Vorkasse via `pp_system_default` or Stripe via `pp_stripe_stripe`)
- Calls Medusa: update cart → add shipping method → initiate payment session → complete cart
- On success, clears `lh_cart_id` from localStorage and redirects to `/kasse/bestaetigung`

## Styling

- **Tailwind CSS v4** with custom theme in `globals.css` via `@theme {}` block
- Brand colors: `bg-primary` (olive green `#556b2f`), `bg-accent` (honey gold `#f59e0b`)
- Font variables: `font-heading` (Fraunces serif), body uses `font-sans` (Outfit)
- Dark mode is intentionally disabled — the site always uses the warm light theme
- Scroll offset set to `6rem` in CSS to prevent fixed navbar from covering anchor targets

## Key Constraints

- Image remote patterns are configured for `**.leine-honig.de` and `localhost` — product thumbnails are served from the Medusa backend
- Security headers (CSP, HSTS, etc.) are applied globally in `next.config.ts`; the CSP `connect-src` must include any new external API hosts
- `bienen-mieten` uses a client component (`BienenMietenClient.tsx`) for the Privat/Firma persona toggle — keep server/client boundary in mind for that page
