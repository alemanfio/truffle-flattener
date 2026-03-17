# GenSeed Capital — Website

Modern, professional website for GenSeed Capital — a Luxembourg-based ELTIF 2.0 venture capital fund focused on longevity science and space economy investments.

## Tech Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: Vercel / Netlify (static export)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, funds, stats, personas, trust signals |
| How It Works | `/how-it-works` | 8-step timeline, governance, ELTIF explainer |
| Investment Focus | `/investment-focus` | Longevity + space sectors, portfolio strategy |
| Community | `/community` | 3-tier model, benefits, events, testimonials |
| Invest Now | `/invest-now` | Funds, eligibility, fees, FAQ, waitlist |

## Quick Start

```bash
cd genseed-capital
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
# Production build (static export to /out)
npm run build

# Deploy to Vercel (recommended)
npx vercel --prod

# Deploy to Netlify
# Set build command: npm run build
# Set publish directory: out
```

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#0F172A` | Hero backgrounds, dark sections |
| Blue | `#1E3A8A` | Primary brand color |
| Emerald | `#10B981` | Accent, CTAs, positive indicators |
| Slate | `#64748B` | Body text |

## Environment / Forms

Forms use simple mailto links for now. To connect to Formspree:

1. Create a form at [formspree.io](https://formspree.io)
2. Replace the `mailto:` href with the Formspree endpoint

## Contact

invest@genseed.vc
