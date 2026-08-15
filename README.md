# Aster House

Independent Publishing & Editorial Studio — production website.
Next.js 15 (App Router) · TypeScript · Tailwind CSS.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Architecture

```
app/                    routes (one folder per URL)
  page.tsx              home — 12 sections
  publish/              /publish        assisted publishing + #process + genre anchors
  ghostwriting/         /ghostwriting
  editorial/            /editorial
  create/               /create         design, production, bespoke
  books/                /books + /books/[slug]
  journal/              /journal + /journal/[slug]
  about/ faq/           /about /faq
  start-your-book/      /start-your-book — the single conversion form
  privacy/ terms/       placeholders — replace before launch
  sitemap.ts robots.ts  generated from content + journal files
components/             reusable, no page-specific logic
content/                ALL copy and data — the CMS seam
  site.ts               nav, footer, brand strings
  services.ts           four services, book types, beliefs, editorial, bespoke
  books.ts              sample editions incl. cover design tokens
  process.ts pricing.ts faq.ts
  journal/*.md          articles: frontmatter + markdown body
lib/journal.ts          reads content/journal, renders markdown to HTML
public/journal/         journal hero images
```

**Nothing in `app/` contains copy that isn't structural.** Everything a
non-developer would want to change lives in `content/`. Swapping in a CMS means
replacing the exports in `content/*.ts` and `lib/journal.ts` with fetches; no
component changes.

## The journal (your blog)

Add a file to `content/journal/`:

```md
---
title: "How long should a first novel be?"
standfirst: "One sentence that makes someone want to read on."
category: "Writing"        # Writing | Editing | Publishing | Book Design | Ghostwriting | Authors | Industry
date: "2026-08-14"
heroImage: "/journal/my-image.jpg"
heroAlt: "Describe the image for screen readers."
cta:
  label: "Explore editorial"
  href: "/editorial"
---

Body in markdown. Images inline with ![alt](/journal/another-image.jpg).
```

Drop images into `public/journal/`. Reading time is calculated automatically if
you omit `readingTime`. Routes, sitemap entries and related-article links appear
on their own.

## Sample editions

`content/books.ts` drives everything: the hero stack, the service pages, the
catalogue and the individual pages. Covers are **drawn in CSS and SVG**, not
photographed — seven layout variants (`stack`, `rule`, `arc`, `grid`, `band`,
`frame`, `field`) composed from a colour trio per book. They're resolution-
independent, weigh nothing, and are typographically identical at 90px and 900px
because they're sized in container query units.

To add a real title later: add the entry with `sample: false` and an `author`
field, then extend `BookCard`/`app/books/[slug]` to show author, ISBN,
publication date and purchase links. The page already has slots for them.

## CTA routing

| Where | Goes to |
|---|---|
| Header / footer button | `/start-your-book` |
| Hero secondary | `/publish#process` |
| Service blocks | `/publish` `/ghostwriting` `/editorial` `/create` |
| Book type rows | deep anchors, e.g. `/publish#fiction`, `/ghostwriting#legacy` |
| Ghostwriting page CTA | `/start-your-book?service=ghostwriting` |
| Editorial page CTA | `/start-your-book?service=editorial` |
| Bespoke CTA | `/start-your-book?service=bespoke` |
| Journal articles | per-article `cta` in frontmatter |

`?service=` pre-selects "What are you looking for?" on arrival. Map is in
`components/EnquiryForm.tsx` (`SERVICE_MAP`). The brand-beliefs section has no
CTA on purpose.

## Before launch

1. **Prices.** `content/pricing.ts` — replace `From ₹[PRICE]` placeholders.
2. **Form backend.** `EnquiryForm.handleSubmit` currently only sets local state.
   Point it at a route handler, form service or CRM. File uploads need a real
   storage target and a virus scan.
3. **Legal.** `/privacy` and `/terms` are structured placeholders. Lawyer them.
4. **Domain.** `content/site.ts` → `url` (used by metadata, sitemap, robots).
5. **OG image.** Add `app/opengraph-image.tsx` or a static file.
6. **Analytics + team bios.** The About team section is deliberately unnamed.

## Deliberate omissions

No testimonials, no author names on sample covers, no catalogue, no sales
figures, no ecommerce, no accounts, no database. `components/Testimonial.tsx`
exists and is unused, ready for the first real quote.

---

## Deploying to GitHub Pages (asterhousebooks.com)

Static export is already configured, so `npm run build` writes a complete site
to `./out`, and `.github/workflows/deploy.yml` builds and publishes it on every
push to `main`.

Because the site runs on a custom domain at the root, **leave `BASE_PATH`
commented out in the workflow.** It is only for project-repo sub-paths.

### Order of operations

1. Push the repo to GitHub (public — Pages needs Pro for private repos).
2. **Settings → Pages → Source: GitHub Actions.**
3. **Settings → Pages → Custom domain:** enter `asterhousebooks.com` and Save.
   Do this *before* touching DNS, so nobody else can claim the subdomain.
4. Add DNS records at your registrar:

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `SENswitchblxde.github.io` |

   Delete any default/parking A record the registrar created.
5. Wait for DNS (minutes to 24 hours), then tick **Enforce HTTPS** in
   Settings → Pages. It stays greyed out until the certificate is issued.

Note: publishing via GitHub Actions means the custom domain lives in repository
settings, not in a `CNAME` file — Actions deployments ignore that file.

### The enquiry form

A static host cannot receive a POST. `EnquiryForm` submits to
`NEXT_PUBLIC_FORM_ENDPOINT`, which the workflow reads from a repository secret
named `FORM_ENDPOINT` (Settings → Secrets and variables → Actions). Point it at
Formspree, Getform, Basin or Web3Forms.

Unset, the form shows an error directing the visitor to email instead — rather
than pretending the enquiry was received.

**File uploads are the weak point.** Most form services only accept attachments
on paid tiers, and manuscript-sized files often exceed the limit. Either pay for
that tier, or drop the upload field and ask authors to email the manuscript once
you have replied.

### What static export costs you

- No image optimisation — fine here, the covers are CSS and SVG. Watch file
  sizes if you start uploading photographs to the journal.
- No API routes, no server-side rendering, no draft previews.
- Publishing a journal article means a commit and a two-minute rebuild.

If that becomes annoying, Vercel, Netlify and Cloudflare Pages deploy this repo
unchanged and for free, and give you back the server.
