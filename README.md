# ASCII Portfolio

Terminal-flavoured personal site for **Facundo Lizarraga** — Senior Full-Stack Engineer.
Bilingual (EN / ES), statically generated, and built to load as fast as a text file.

```
███████╗ █████╗  ██████╗██╗   ██╗███╗   ██╗██████╗  ██████╗
██╔════╝██╔══██╗██╔════╝██║   ██║████╗  ██║██╔══██╗██╔═══██╗
█████╗  ███████║██║     ██║   ██║██╔██╗ ██║██║  ██║██║   ██║
██╔══╝  ██╔══██║██║     ██║   ██║██║╚██╗██║██║  ██║██║   ██║
██║     ██║  ██║╚██████╗╚██████╔╝██║ ╚████║██████╔╝╚██████╔╝
╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝  ╚═════╝
```

Next.js 16 (App Router, React 19) · TypeScript `strict` · Tailwind CSS v4 ·
`motion` v12 behind `LazyMotion` · Vitest · deployed on Vercel.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000 → redirects to /en
```

| Script           | What it does                               |
| ---------------- | ------------------------------------------ |
| `pnpm build`     | Production build — every route prerendered |
| `pnpm typecheck` | `tsc --noEmit`                             |
| `pnpm lint`      | ESLint (flat config)                       |
| `pnpm format`    | Prettier, with Tailwind class sorting      |
| `pnpm test`      | Unit and component tests                   |

## How it is put together

**Everything is static.** There is no server runtime — `app/[lang]/page.tsx` is
a Server Component with no data fetching, so `next build` writes complete HTML
for `/en` and `/es`. CI greps the emitted HTML for real copy, so a change that
pushes a route into dynamic rendering fails the pipeline instead of shipping.

**One locale per URL.** `app/[lang]/` is the route root and the EN/ES control is
an ordinary `<Link>`, not a client-side toggle. Each language gets its own URL,
`<html lang>`, metadata and reciprocal `hreflang`. That layout is deliberately
the only root layout — there is no `app/layout.tsx` — which is what makes the
per-locale `lang` attribute possible.

**Content is data.** All copy lives in `content/en.ts` and `content/es.ts`, both
`satisfies Content`, so adding a field to one language without the other is a
compile error. `tests/content-parity.test.ts` compares the whole tree, so a job
added in English but missing in Spanish fails CI.

**The animation budget is measured.** `/en` ships 17 KB of HTML and ~230 KB of
JS gzipped, ~45 KB of it Motion — the commonly quoted "~5 KB" for `LazyMotion`
does not survive contact with a real build. None of it is on the critical path:
the page is complete and readable before any script runs. Only the two demo
widgets hold state, and their logic lives in `lib/demo-state.ts` as pure
functions of a tick, so server and client agree on the first frame.

**The font is subsetted twice.** Google's `latin` subset of JetBrains Mono has
no box drawing (U+2500–257F) or block elements (U+2580–259F), so those glyphs
fell back to proportional Arial and the art sheared apart column by column. The
page loads the Google subset for prose plus a 3.6 KB self-hosted cut holding
only the drawing glyphs, listed first in `--font-mono`.
`tests/glyph-coverage.test.ts` fails the build if a source file introduces a
character neither subset carries.

**Accessibility.** The art is `aria-hidden` and a visually hidden `<h1>` carries
the name; sections are labelled by their headings, the demos are not live
regions, there is a skip link, and `prefers-reduced-motion` is honoured in both
CSS and Motion. A `<noscript>` rule restores the reveal styles without JS.

## Editing content

| I want to change…     | Edit                                    |
| --------------------- | --------------------------------------- |
| Any visible text      | `content/en.ts`, `content/es.ts`        |
| The content schema    | `content/types.ts`                      |
| ASCII art             | `content/ascii.ts`                      |
| Colours               | the `@theme` block in `app/globals.css` |
| Email, LinkedIn, name | `lib/site.ts`                           |
| The CV PDFs           | `public/cv/`                            |

## Deployment

Import the repository on Vercel; the defaults are correct. Set
`NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, the sitemap
and Open Graph tags resolve absolutely.
