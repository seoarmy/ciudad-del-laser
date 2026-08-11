# Sanity CMS + Next.js SSR Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Vite SPA with a Next.js (App Router) app that reads all content from Sanity CMS with SSR, deployed to Firebase App Hosting, so content edits in Sanity go live without a redeploy.

**Architecture:** Next.js App Router server-renders every route. A single `lib/sanity/*` query layer fetches content via GROQ, tagging each fetch with `next: { tags: [...] }`. A Sanity webhook hits `/api/revalidate` on publish, calling `revalidateTag` for the changed collection — content updates appear on the next request with no deploy. A 60s `revalidate` fallback covers missed webhooks. The personalizador route keeps its existing external iframe untouched. Firebase App Hosting runs the Next.js server.

**Tech Stack:** Next.js 15 (App Router), React 19, Sanity v3 (`sanity`, `next-sanity`, `@sanity/image-url`), Tailwind CSS v4, Firebase App Hosting.

## Global Constraints

- Content source of truth is Sanity — no more `src/data/*.js` imports in pages once migrated.
- `/servicios/[slug]` and `/blog/[slug]` use **no** `generateStaticParams` — fully on-demand rendering (per approved design).
- Cache strategy: `next: { tags: [...], revalidate: 60 }` per fetch; instant invalidation via `revalidateTag` from a Sanity webhook, never `dynamic = 'force-dynamic'`.
- Personalizador route (`/personalizador`) keeps the exact iframe `src="https://ember.com.ar/virolas/index.php"` — no Sanity integration, no behavior change.
- Firebase App Hosting is the deploy target (not Cloud Functions + Hosting legacy, not Vercel).
- Repo has no existing test framework (confirmed: no test files in `src/`). Verification steps in this plan use `npm run build`, `npm run lint`, and manual dev-server checks — do not introduce a new test framework as part of this migration; that's a separate decision.
- New Next.js app lives in a new top-level directory `web/` alongside the existing Vite app, so the old SPA keeps running until cutover (Task 14).

---

### Task 1: Sanity project + schema types

**Files:**
- Create: `web/sanity/env.ts`
- Create: `web/sanity/schemaTypes/service.ts`
- Create: `web/sanity/schemaTypes/material.ts`
- Create: `web/sanity/schemaTypes/faq.ts`
- Create: `web/sanity/schemaTypes/testimonial.ts`
- Create: `web/sanity/schemaTypes/blogPost.ts`
- Create: `web/sanity/schemaTypes/siteSettings.ts`
- Create: `web/sanity/schemaTypes/index.ts`
- Create: `web/sanity.config.ts`
- Create: `web/sanity.cli.ts`

**Interfaces:**
- Produces: Sanity document types `service`, `material`, `faq`, `testimonial`, `blogPost`, `siteSettings` (singleton), consumed by the query layer in Task 4 and the seed script in Task 2.

- [ ] **Step 1: Create the Next.js app and add Sanity**

```bash
npx create-next-app@latest web --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*"
cd web
npm install sanity next-sanity @sanity/image-url @sanity/vision styled-components
npx sanity@latest init --project-name "ciudad-del-laser" --dataset production --output-path sanity-studio-check
```
Note the printed `projectId`; you'll need it in Step 2.

- [ ] **Step 2: Write `web/sanity/env.ts`**

```typescript
export const apiVersion = '2026-08-11'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}
```

- [ ] **Step 3: Write `web/sanity/schemaTypes/service.ts`**

```typescript
import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'icon', type: 'string' }),
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'shortTitle', type: 'string' }),
    defineField({ name: 'keyword', type: 'string' }),
    defineField({ name: 'metaDescription', type: 'text' }),
    defineField({ name: 'heroTitle', type: 'string' }),
    defineField({ name: 'heroSubtitle', type: 'text' }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'text' }] }),
    defineField({
      name: 'materials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'material', type: 'string' }),
          defineField({ name: 'cortar', type: 'boolean' }),
          defineField({ name: 'marcar', type: 'boolean' }),
          defineField({ name: 'grabar', type: 'boolean' }),
          defineField({ name: 'espesor', type: 'string' }),
          defineField({ name: 'tamaño', type: 'string' }),
          defineField({ name: 'stock', type: 'boolean' }),
        ],
      }],
    }),
    defineField({ name: 'seoParagraph', type: 'text' }),
    defineField({ name: 'secondaryKeywords', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'highlights', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'faqs',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'q', type: 'string' }),
        defineField({ name: 'a', type: 'text' }),
      ] }],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{ type: 'image', fields: [defineField({ name: 'alt', type: 'string' })] }],
    }),
    defineField({ name: 'productionNote', type: 'text' }),
    defineField({
      name: 'accessories',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'text', type: 'text' }),
      ] }],
    }),
  ],
})
```

- [ ] **Step 4: Write the remaining schemas**

`web/sanity/schemaTypes/material.ts`:
```typescript
import { defineField, defineType } from 'sanity'

export const material = defineType({
  name: 'material',
  title: 'Familia de materiales',
  type: 'document',
  fields: [
    defineField({ name: 'familyId', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'material', type: 'string' }),
        defineField({ name: 'cortar', type: 'boolean' }),
        defineField({ name: 'marcar', type: 'boolean' }),
        defineField({ name: 'grabar', type: 'boolean' }),
        defineField({ name: 'espesor', type: 'string' }),
        defineField({ name: 'tamaño', type: 'string' }),
        defineField({ name: 'stock', type: 'string', options: { list: ['siempre', 'a-pedido', 'consultar'] } }),
      ] }],
    }),
  ],
})
```

`web/sanity/schemaTypes/faq.ts`:
```typescript
import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ general',
  type: 'document',
  fields: [
    defineField({ name: 'q', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'a', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number' }),
  ],
})
```

`web/sanity/schemaTypes/testimonial.ts`:
```typescript
import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'quote', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'service', type: 'reference', to: [{ type: 'service' }] }),
  ],
})
```

`web/sanity/schemaTypes/blogPost.ts`:
```typescript
import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Post de blog',
  type: 'document',
  fields: [
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'category', type: 'string' }),
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'date', type: 'date' }),
    defineField({ name: 'readingTime', type: 'string' }),
    defineField({ name: 'cover', type: 'image' }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'relatedServices', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
  ],
})
```

`web/sanity/schemaTypes/siteSettings.ts`:
```typescript
import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'instagram', type: 'string' }),
    defineField({ name: 'instagramUrl', type: 'url' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'whatsappNumber', type: 'string' }),
    defineField({ name: 'city', type: 'string' }),
    defineField({ name: 'address', type: 'string' }),
    defineField({
      name: 'sucursales',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'name', type: 'string' }),
        defineField({ name: 'address', type: 'string' }),
        defineField({ name: 'hours', type: 'string' }),
        defineField({ name: 'mapsEmbedUrl', type: 'url' }),
        defineField({ name: 'mapsLink', type: 'url' }),
      ] }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Configuración del sitio' }) },
})
```

- [ ] **Step 5: Write `web/sanity/schemaTypes/index.ts`**

```typescript
import { service } from './service'
import { material } from './material'
import { faq } from './faq'
import { testimonial } from './testimonial'
import { blogPost } from './blogPost'
import { siteSettings } from './siteSettings'

export const schemaTypes = [service, material, faq, testimonial, blogPost, siteSettings]
```

- [ ] **Step 6: Write `web/sanity.config.ts`**

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
})
```

- [ ] **Step 7: Write `web/sanity.cli.ts`**

```typescript
import { defineCliConfig } from 'sanity/cli'
import { projectId, dataset } from './sanity/env'

export default defineCliConfig({ api: { projectId, dataset } })
```

- [ ] **Step 8: Create `web/app/studio/[[...tool]]/page.tsx` to mount the Studio**

```typescript
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 9: Add env vars and verify build**

Create `web/.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<projectId from Step 1>
NEXT_PUBLIC_SANITY_DATASET=production
```

Run: `cd web && npm run build`
Expected: build succeeds, no type errors in `sanity/` files.

- [ ] **Step 10: Commit**

```bash
git add web/sanity web/sanity.config.ts web/sanity.cli.ts web/app/studio
git commit -m "feat: add Sanity schemas and embedded Studio to new Next.js app"
```

---

### Task 2: Sanity seed script

**Files:**
- Create: `web/scripts/seed.ts`
- Modify: `web/package.json` (add `"seed": "tsx scripts/seed.ts"` script)

**Interfaces:**
- Consumes: schemas from Task 1 (`service`, `material`, `faq`, `testimonial`, `blogPost`, `siteSettings`), source data from the existing SPA's `src/data/*.js` (read via relative path `../../src/data/*.js` — the old app is untouched until cutover).
- Produces: populated Sanity dataset that Task 4's query layer reads.

- [ ] **Step 1: Install a Sanity client with write token support**

```bash
cd web && npm install -D tsx
npm install @sanity/client
```

Add a write token: Sanity manage console → API → Tokens → create token with "Editor" permissions. Add to `web/.env.local`:
```
SANITY_WRITE_TOKEN=<token>
```

- [ ] **Step 2: Write `web/scripts/seed.ts`**

```typescript
import { createClient } from '@sanity/client'
import { SERVICES } from '../../src/data/services.js'
import { MATERIAL_FAMILIES } from '../../src/data/materials.js'
import { GENERAL_FAQS } from '../../src/data/faqs.js'
import { TESTIMONIALS } from '../../src/data/testimonials.js'
import { BLOG_POSTS } from '../../src/data/blog.js'
import { SITE, SUCURSALES } from '../../src/data/site.js'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-08-11',
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
})

async function seedServices() {
  for (const s of SERVICES) {
    await client.createOrReplace({
      _id: `service-${s.slug}`,
      _type: 'service',
      slug: { _type: 'slug', current: s.slug },
      icon: s.icon,
      title: s.title,
      shortTitle: s.shortTitle,
      keyword: s.keyword,
      metaDescription: s.metaDescription,
      heroTitle: s.heroTitle,
      heroSubtitle: s.heroSubtitle,
      description: s.description,
      materials: s.materials,
      seoParagraph: s.seoParagraph,
      secondaryKeywords: s.secondaryKeywords,
      highlights: s.highlights,
      faqs: s.faqs,
      productionNote: s.productionNote ?? null,
      accessories: s.accessories ?? [],
      // gallery images are uploaded separately (Step 3) since they need
      // Sanity asset references, not plain URLs.
    })
    console.log(`seeded service: ${s.slug}`)
  }
}

async function seedMaterials() {
  for (const fam of MATERIAL_FAMILIES) {
    await client.createOrReplace({
      _id: `material-${fam.id}`,
      _type: 'material',
      familyId: fam.id,
      label: fam.label,
      items: fam.items,
    })
    console.log(`seeded material family: ${fam.id}`)
  }
}

async function seedFaqs() {
  for (const [i, f] of GENERAL_FAQS.entries()) {
    await client.createOrReplace({
      _id: `faq-${i}`,
      _type: 'faq',
      q: f.q,
      a: f.a,
      order: i,
    })
  }
  console.log(`seeded ${GENERAL_FAQS.length} faqs`)
}

async function seedTestimonials() {
  for (const [i, t] of TESTIMONIALS.entries()) {
    await client.createOrReplace({
      _id: `testimonial-${i}`,
      _type: 'testimonial',
      name: t.name,
      quote: t.quote,
      service: t.service ? { _type: 'reference', _ref: `service-${t.service}` } : undefined,
    })
  }
  console.log(`seeded ${TESTIMONIALS.length} testimonials`)
}

async function seedBlogPosts() {
  for (const p of BLOG_POSTS) {
    await client.createOrReplace({
      _id: `blogPost-${p.slug}`,
      _type: 'blogPost',
      slug: { _type: 'slug', current: p.slug },
      category: p.category,
      title: p.title,
      date: p.date,
      readingTime: p.readingTime,
      excerpt: p.excerpt,
      relatedServices: p.relatedServices.map((slug: string) => ({
        _type: 'reference',
        _ref: `service-${slug}`,
      })),
      // body Portable Text conversion happens by hand per post after seed —
      // p.content's {type:'h2'|'p'|'cta'} shape doesn't map 1:1 to Portable
      // Text blocks; flag left in Sanity for editorial follow-up.
    })
    console.log(`seeded blog post: ${p.slug}`)
  }
}

async function seedSiteSettings() {
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    name: SITE.name,
    instagram: SITE.instagram,
    instagramUrl: SITE.instagramUrl,
    email: SITE.email,
    whatsappNumber: '5491127183968',
    city: SITE.city,
    address: SITE.address,
    sucursales: SUCURSALES,
  })
  console.log('seeded siteSettings')
}

async function main() {
  await seedServices()
  await seedMaterials()
  await seedFaqs()
  await seedTestimonials()
  await seedBlogPosts()
  await seedSiteSettings()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

- [ ] **Step 3: Add the npm script and run it**

In `web/package.json`, add to `"scripts"`:
```json
"seed": "tsx scripts/seed.ts"
```

Run: `cd web && npm run seed`
Expected: console logs `seeded service: ...` x11, `seeded material family: ...` x7, `seeded 7 faqs`, `seeded 10 testimonials`, `seeded blog post: ...` x2, `seeded siteSettings`, exit code 0.

- [ ] **Step 4: Verify in Studio**

Run `cd web && npm run dev`, open `http://localhost:3000/studio`, confirm all 6 document types show seeded entries matching counts from Step 3.

- [ ] **Step 5: Manually upload gallery images and blog post bodies**

Gallery images referenced in `SERVICES[].gallery` point to `/images/<CATEGORY>/N.webp` static files — upload the representative images for each service into its `gallery` field in Studio directly (this is a one-time editorial task, not scriptable without the actual image binaries). Same for the two `blogPost.body` fields — copy `content[].text` into Portable Text blocks in Studio.

- [ ] **Step 6: Commit**

```bash
git add web/scripts web/package.json
git commit -m "feat: add Sanity seed script for existing site content"
```

---

### Task 3: Base layout — Navbar, Footer, WhatsappFloatingButton, Tailwind

**Files:**
- Modify: `web/app/globals.css` (port Tailwind config/theme from old `src/index.css`)
- Create: `web/app/layout.tsx`
- Create: `web/components/Navbar.tsx`
- Create: `web/components/Footer.tsx`
- Create: `web/components/WhatsappFloatingButton.tsx`
- Reference (read, do not modify): `src/index.css`, `src/components/Navbar.jsx`, `src/components/Footer.jsx`, `src/components/WhatsappFloatingButton.jsx`, `src/data/site.js`

**Interfaces:**
- Produces: `RootLayout` wrapping every page with `<Navbar/>`, `{children}`, `<Footer/>`, `<WhatsappFloatingButton/>`.
- Consumes: `getSiteSettings()` from Task 4's query layer (`web/lib/sanity/queries.ts`).

- [ ] **Step 1: Port Tailwind theme into `web/app/globals.css`**

Copy the `@theme`/custom color/font blocks from `src/index.css` into `web/app/globals.css`, keeping the `@import "tailwindcss";` line `create-next-app` already generated at the top.

- [ ] **Step 2: Port `Navbar`, `Footer`, `WhatsappFloatingButton` as Server Components**

For each of `src/components/Navbar.jsx`, `Footer.jsx`, `WhatsappFloatingButton.jsx`: copy the JSX into `web/components/<Name>.tsx`, remove `react-router-dom` `Link`/`NavLink` imports and replace with Next's `next/link` `Link` (same `href` prop shape, drop `to=`, use `href=`). Replace any `import { NAV_LINKS } from '../data/site'` with a `NAV_LINKS` constant kept locally in `web/components/Navbar.tsx` (static nav structure, not editorial content — stays in code). Replace `SITE`/`SUCURSALES` references with props passed down from `layout.tsx` (see Step 3).

- [ ] **Step 3: Write `web/app/layout.tsx`**

```typescript
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsappFloatingButton from '@/components/WhatsappFloatingButton'
import { getSiteSettings } from '@/lib/sanity/queries'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ciudad del Láser',
  description: 'Corte y grabado láser en Buenos Aires',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteSettings()
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Navbar site={site} />
        <main className="flex-1">{children}</main>
        <Footer site={site} />
        <WhatsappFloatingButton whatsappNumber={site.whatsappNumber} />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify**

Run: `cd web && npm run dev`, open `http://localhost:3000`.
Expected: default Next.js page renders inside the ported Navbar/Footer with no console errors about missing `site` fields (Task 4 must land before this fully works — if `lib/sanity/queries.ts` doesn't exist yet, stub `getSiteSettings` with a hardcoded object matching `siteSettings` shape so this task is independently testable, then delete the stub once Task 4 lands).

- [ ] **Step 5: Commit**

```bash
git add web/app/layout.tsx web/app/globals.css web/components
git commit -m "feat: port Navbar, Footer, WhatsappFloatingButton to Next.js layout"
```

---

### Task 4: Sanity client + GROQ query layer

**Files:**
- Create: `web/lib/sanity/client.ts`
- Create: `web/lib/sanity/queries.ts`
- Create: `web/lib/sanity/image.ts`

**Interfaces:**
- Produces: `sanityFetch<T>(query, params, tags)`, `getSiteSettings()`, `getAllServiceSlugs()`, `getServiceBySlug(slug)`, `getMaterialFamilies()`, `getGeneralFaqs()`, `getTestimonialsForService(slug, limit)`, `getAllBlogSlugs()`, `getBlogPostBySlug(slug)`, `urlForImage(source)` — consumed by every page task (5–11).
- Consumes: `projectId`/`dataset` from `web/sanity/env.ts` (Task 1).

- [ ] **Step 1: Write `web/lib/sanity/client.ts`**

```typescript
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: Record<string, unknown>
  tags: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { tags, revalidate: 60 },
  })
}
```

- [ ] **Step 2: Write `web/lib/sanity/image.ts`**

```typescript
import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '@/sanity/env'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlForImage(source: { asset?: { _ref: string } }) {
  return builder.image(source)
}
```

- [ ] **Step 3: Write `web/lib/sanity/queries.ts`**

```typescript
import { sanityFetch } from './client'

export type Site = {
  name: string
  instagram: string
  instagramUrl: string
  email: string
  whatsappNumber: string
  city: string
  address: string
  sucursales: { name: string; address: string; hours: string; mapsEmbedUrl: string; mapsLink: string }[]
}

export async function getSiteSettings(): Promise<Site> {
  return sanityFetch<Site>({
    query: `*[_type == "siteSettings"][0]{name, instagram, instagramUrl, email, whatsappNumber, city, address, sucursales}`,
    tags: ['siteSettings'],
  })
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const rows = await sanityFetch<{ slug: string }[]>({
    query: `*[_type == "service"]{"slug": slug.current}`,
    tags: ['service'],
  })
  return rows.map((r) => r.slug)
}

const SERVICE_PROJECTION = `{
  "slug": slug.current, icon, title, shortTitle, keyword, metaDescription,
  heroTitle, heroSubtitle, description, materials, seoParagraph,
  secondaryKeywords, highlights, faqs, productionNote, accessories,
  gallery[]{ "img": asset->url, alt }
}`

export async function getServiceBySlug(slug: string) {
  return sanityFetch<Record<string, unknown> | null>({
    query: `*[_type == "service" && slug.current == $slug][0]${SERVICE_PROJECTION}`,
    params: { slug },
    tags: [`service:${slug}`, 'service'],
  })
}

export async function getMaterialFamilies() {
  return sanityFetch<Record<string, unknown>[]>({
    query: `*[_type == "material"]{familyId, label, items}`,
    tags: ['material'],
  })
}

export async function getGeneralFaqs() {
  return sanityFetch<{ q: string; a: string }[]>({
    query: `*[_type == "faq"] | order(order asc){q, a}`,
    tags: ['faq'],
  })
}

export async function getTestimonialsForService(slug: string, limit = 3) {
  return sanityFetch<{ name: string; quote: string; service: string | null }[]>({
    query: `
      {
        "matched": *[_type == "testimonial" && service->slug.current == $slug]{name, quote, "service": service->slug.current},
        "generic": *[_type == "testimonial" && (!defined(service) || service->slug.current != $slug)]{name, quote, "service": service->slug.current}
      }
    `,
    params: { slug },
    tags: ['testimonial'],
  }).then((r: any) => [...r.matched, ...r.generic].slice(0, limit))
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const rows = await sanityFetch<{ slug: string }[]>({
    query: `*[_type == "blogPost"]{"slug": slug.current}`,
    tags: ['blogPost'],
  })
  return rows.map((r) => r.slug)
}

export async function getBlogPosts() {
  return sanityFetch<Record<string, unknown>[]>({
    query: `*[_type == "blogPost"] | order(date desc){"slug": slug.current, category, title, date, readingTime, "cover": cover.asset->url, excerpt}`,
    tags: ['blogPost'],
  })
}

export async function getBlogPostBySlug(slug: string) {
  return sanityFetch<Record<string, unknown> | null>({
    query: `*[_type == "blogPost" && slug.current == $slug][0]{
      "slug": slug.current, category, title, date, readingTime,
      "cover": cover.asset->url, excerpt, body,
      "relatedServices": relatedServices[]->{"slug": slug.current, title}
    }`,
    params: { slug },
    tags: [`blogPost:${slug}`, 'blogPost'],
  })
}
```

- [ ] **Step 4: Verify with Sanity Vision**

Run `cd web && npm run dev`, open `http://localhost:3000/studio/vision`, run `*[_type == "service"]{title}` and confirm the 11 seeded services return.

- [ ] **Step 5: Commit**

```bash
git add web/lib/sanity
git commit -m "feat: add Sanity GROQ query layer with tagged, revalidatable fetches"
```

---

### Task 5: Revalidation webhook

**Files:**
- Create: `web/app/api/revalidate/route.ts`
- Modify: `web/.env.local` (add `SANITY_REVALIDATE_SECRET`)

**Interfaces:**
- Consumes: nothing from other tasks (standalone route), but the `tags` it invalidates must match the tag strings used in Task 4's `queries.ts` (`service`, `service:<slug>`, `material`, `faq`, `testimonial`, `blogPost`, `blogPost:<slug>`, `siteSettings`).

- [ ] **Step 1: Generate and store a shared secret**

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
```
Add to `web/.env.local`:
```
SANITY_REVALIDATE_SECRET=<generated value>
```

- [ ] **Step 2: Write `web/app/api/revalidate/route.ts`**

```typescript
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ _type: string; slug?: { current: string } }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return NextResponse.json({ revalidated: false, message: 'invalid signature' }, { status: 401 })
    }
    if (!body?._type) {
      return NextResponse.json({ revalidated: false, message: 'missing _type' }, { status: 400 })
    }

    revalidateTag(body._type)
    if (body.slug?.current) {
      revalidateTag(`${body._type}:${body.slug.current}`)
    }

    return NextResponse.json({ revalidated: true, tag: body._type, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ revalidated: false, message: (err as Error).message }, { status: 500 })
  }
}
```

- [ ] **Step 3: Register the webhook in Sanity**

In sanity.io/manage → project → API → Webhooks → Create webhook:
- URL: `https://<your-deployed-domain>/api/revalidate`
- Dataset: `production`
- Trigger on: Create, Update, Delete
- Filter: leave empty (all document types)
- HTTP method: POST
- Secret: same value as `SANITY_REVALIDATE_SECRET`
- Projection: `{"_type": _type, "slug": slug}`

- [ ] **Step 4: Verify locally with a manual curl**

Run: `cd web && npm run dev`, in another terminal:
```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "content-type: application/json" \
  -H "sanity-webhook-signature: test" \
  -d '{"_type":"service","slug":{"current":"corte-laser-mdf"}}'
```
Expected (before wiring a real signature this returns 401 `invalid signature` — that confirms the signature check is active; full end-to-end verification happens after deploy in Task 14 using the real Sanity-signed request).

- [ ] **Step 5: Commit**

```bash
git add web/app/api/revalidate
git commit -m "feat: add Sanity webhook route for tag-based revalidation"
```

---

### Task 6: Home page

**Files:**
- Create: `web/app/page.tsx`
- Reference (read, do not modify): `src/pages/Home.jsx` and its child components

**Interfaces:**
- Consumes: `getSiteSettings()`, `getAllServiceSlugs()`/service summaries, `getGeneralFaqs()` from `lib/sanity/queries.ts` (Task 4).

- [ ] **Step 1: Port `Home.jsx` structure into `web/app/page.tsx` as an async Server Component**

Read `src/pages/Home.jsx` in full, then recreate the same section structure (hero, services grid, testimonials, FAQ teaser, etc.) in `web/app/page.tsx`, replacing every `import { SERVICES } from '../data/services'`-style static import with data fetched at the top of the async component body, e.g.:

```typescript
import { getServiceSummaries, getGeneralFaqs } from '@/lib/sanity/queries'

export default async function HomePage() {
  const [services, faqs] = await Promise.all([getServiceSummaries(), getGeneralFaqs()])
  // ...same JSX as src/pages/Home.jsx, fed by `services`/`faqs` instead of static imports
}
```

Add `getServiceSummaries()` to `web/lib/sanity/queries.ts` (Task 4 follow-up) if Home only needs a lightweight list:
```typescript
export async function getServiceSummaries() {
  return sanityFetch<Record<string, unknown>[]>({
    query: `*[_type == "service"]{"slug": slug.current, icon, title, shortTitle, "gallery": gallery[0]{"img": asset->url, alt}}`,
    tags: ['service'],
  })
}
```

Interactive child components used by Home (`MagneticButton`, `AnimatedCounter`, `Testimonials` carousel if it has client-side state, `MeshBlobs` if animated) get ported to `web/components/` with `'use client'` at the top; purely presentational ones (`ServiceCard`) stay Server Components.

- [ ] **Step 2: Verify**

Run: `cd web && npm run dev`, open `http://localhost:3000/`.
Expected: page renders all 11 services from Sanity, no hydration errors in console, `view-source:http://localhost:3000/` contains the service titles (proves SSR, not client-only render).

- [ ] **Step 3: Commit**

```bash
git add web/app/page.tsx web/components
git commit -m "feat: migrate Home page to Next.js with Sanity data"
```

---

### Task 7: Service landing page (dynamic route)

**Files:**
- Create: `web/app/servicios/[slug]/page.tsx`
- Create: `web/app/servicios/[slug]/not-found.tsx`
- Reference (read, do not modify): `src/pages/ServiceLanding.jsx`

**Interfaces:**
- Consumes: `getServiceBySlug(slug)`, `getTestimonialsForService(slug)` from Task 4.
- Produces: `generateMetadata` pattern reused by Task 12's SEO work.

- [ ] **Step 1: Write `web/app/servicios/[slug]/page.tsx`**

```typescript
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getServiceBySlug, getTestimonialsForService } from '@/lib/sanity/queries'

export const dynamicParams = true // no generateStaticParams — fully on-demand per design

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug)
  if (!service) return {}
  return {
    title: service.heroTitle as string,
    description: service.metaDescription as string,
  }
}

export default async function ServiceLandingPage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug)
  if (!service) notFound()

  const testimonials = await getTestimonialsForService(params.slug)

  // Recreate the JSX from src/pages/ServiceLanding.jsx here, replacing
  // `getServiceBySlug` (old static import from '../data/services') and
  // `getTestimonialsForService` (old static import from '../data/testimonials')
  // with the `service`/`testimonials` values fetched above — same shape,
  // same child components (ServiceCard, MaterialTable, FAQAccordion,
  // ComparisonTable, Gallery, WhatsIncluded, StepBlock, SpecTag, QuoteForm).
}
```

- [ ] **Step 2: Write `web/app/servicios/[slug]/not-found.tsx`**

```typescript
export default function ServiceNotFound() {
  return (
    <div className="max-w-2xl mx-auto py-24 px-6 text-center">
      <h1 className="text-2xl font-bold">Servicio no encontrado</h1>
      <p className="mt-2 text-carbon">El servicio que buscás no existe o cambió de dirección.</p>
    </div>
  )
}
```

- [ ] **Step 3: Verify**

Run: `cd web && npm run dev`, open `http://localhost:3000/servicios/corte-laser-mdf`.
Expected: page renders with data seeded in Task 2; `http://localhost:3000/servicios/no-existe` renders the not-found page with a 404 status (check via `curl -I http://localhost:3000/servicios/no-existe`).

- [ ] **Step 4: Commit**

```bash
git add web/app/servicios
git commit -m "feat: migrate service landing page to on-demand dynamic route"
```

---

### Task 8: Materiales and Galería pages

**Files:**
- Create: `web/app/materiales/page.tsx`
- Create: `web/app/galeria/page.tsx`
- Reference (read, do not modify): `src/pages/Materiales.jsx`, `src/pages/Galeria.jsx`

**Interfaces:**
- Consumes: `getMaterialFamilies()` from Task 4; `getServiceSummaries()` (added in Task 6) for the gallery's per-service image grid.

- [ ] **Step 1: Write `web/app/materiales/page.tsx`**

```typescript
import { getMaterialFamilies } from '@/lib/sanity/queries'

export default async function MaterialesPage() {
  const families = await getMaterialFamilies()
  // Recreate JSX from src/pages/Materiales.jsx (MaterialTable, MIN_DISTANCE_TABLE
  // section, MATERIAL_COMPARISON block) fed by `families` instead of the static
  // MATERIAL_FAMILIES import. MATERIAL_COMPARISON and MIN_DISTANCE_TABLE stay as
  // local constants in this file — they're presentation config, not editorial
  // content, and weren't part of the Task 1 material schema.
}
```

- [ ] **Step 2: Write `web/app/galeria/page.tsx`**

```typescript
import { getServiceSummaries } from '@/lib/sanity/queries'

export default async function GaleriaPage() {
  const services = await getServiceSummaries()
  // Recreate JSX from src/pages/Galeria.jsx (MarqueeGallery / Gallery grid
  // per service) fed by `services` instead of the static SERVICES import.
}
```

- [ ] **Step 3: Verify**

Run: `cd web && npm run dev`, open `http://localhost:3000/materiales` and `http://localhost:3000/galeria`.
Expected: both render seeded data, no console errors.

- [ ] **Step 4: Commit**

```bash
git add web/app/materiales web/app/galeria
git commit -m "feat: migrate Materiales and Galeria pages to Sanity data"
```

---

### Task 9: Personalizador page (unchanged iframe)

**Files:**
- Create: `web/app/personalizador/page.tsx`
- Reference (read, do not modify): `src/pages/Personalizador.jsx`

**Interfaces:**
- Consumes: nothing from Sanity — static content only, per design.

- [ ] **Step 1: Port `Personalizador.jsx` verbatim**

Read `src/pages/Personalizador.jsx` in full and recreate it in `web/app/personalizador/page.tsx`, keeping the iframe exactly as-is:

```typescript
'use client'
// same scale/resize logic as src/pages/Personalizador.jsx (uses window/ref,
// so this stays a Client Component), same IFRAME_HEIGHT constant, same
// <iframe src="https://ember.com.ar/virolas/index.php" .../> unchanged.
```

- [ ] **Step 2: Verify**

Run: `cd web && npm run dev`, open `http://localhost:3000/personalizador`.
Expected: iframe loads `https://ember.com.ar/virolas/index.php`, resize behavior matches the old SPA (compare side by side with `npm run dev` on the old Vite app).

- [ ] **Step 3: Commit**

```bash
git add web/app/personalizador
git commit -m "feat: port Personalizador page with unchanged external iframe"
```

---

### Task 10: Static content pages

**Files:**
- Create: `web/app/como-armar-tu-archivo/page.tsx`
- Create: `web/app/envios-y-pagos/page.tsx`
- Create: `web/app/preguntas-frecuentes/page.tsx`
- Create: `web/app/donde-estamos/page.tsx`
- Create: `web/app/contacto/page.tsx`
- Reference (read, do not modify): `src/pages/ComoArmarTuArchivo.jsx`, `src/pages/EnviosYPagos.jsx`, `src/pages/PreguntasFrecuentes.jsx`, `src/pages/DondeEstamos.jsx`, `src/pages/Contacto.jsx`

**Interfaces:**
- Consumes: `getGeneralFaqs()` (PreguntasFrecuentes), `getSiteSettings()` (DondeEstamos, Contacto — for `sucursales[].mapsEmbedUrl` feeding the existing iframe map embeds).

- [ ] **Step 1: Port `PreguntasFrecuentes.jsx`**

```typescript
import { getGeneralFaqs } from '@/lib/sanity/queries'

export default async function PreguntasFrecuentesPage() {
  const faqs = await getGeneralFaqs()
  // Recreate JSX from src/pages/PreguntasFrecuentes.jsx (FAQAccordion) fed
  // by `faqs` instead of the static GENERAL_FAQS import.
}
```

- [ ] **Step 2: Port `DondeEstamos.jsx` and `Contacto.jsx`**

```typescript
import { getSiteSettings } from '@/lib/sanity/queries'

export default async function DondeEstamosPage() {
  const site = await getSiteSettings()
  // Recreate JSX from src/pages/DondeEstamos.jsx: for each `suc` in
  // site.sucursales render the same <iframe title={...} src={suc.mapsEmbedUrl} .../>
  // block unchanged, fed by Sanity data instead of the static SUCURSALES import.
}
```
Same pattern for `web/app/contacto/page.tsx` (it also renders one `<iframe src={suc.mapsEmbedUrl}>` per sucursal, plus `QuoteForm` — port `QuoteForm` to `web/components/QuoteForm.tsx` with `'use client'` since it holds form state).

- [ ] **Step 3: Port `ComoArmarTuArchivo.jsx` and `EnviosYPagos.jsx`**

Both are static informational content (no `src/data` imports beyond `SITE`/`fileGuide.js`). Port directly as Server Components; `src/data/fileGuide.js` stays a local static import in the new file too (it's copy/instructional content, not part of the Sanity scope defined in the design doc).

- [ ] **Step 4: Verify**

Run: `cd web && npm run dev`, visit all 5 routes.
Expected: each renders correctly; DondeEstamos/Contacto map iframes load using `mapsEmbedUrl` values from Sanity's seeded `siteSettings.sucursales`.

- [ ] **Step 5: Commit**

```bash
git add web/app/como-armar-tu-archivo web/app/envios-y-pagos web/app/preguntas-frecuentes web/app/donde-estamos web/app/contacto web/components/QuoteForm.tsx
git commit -m "feat: migrate static content pages to Next.js"
```

---

### Task 11: Blog index and post pages

**Files:**
- Create: `web/app/blog/page.tsx`
- Create: `web/app/blog/[slug]/page.tsx`
- Create: `web/app/blog/[slug]/not-found.tsx`
- Reference (read, do not modify): `src/pages/blog/BlogIndex.jsx`, `src/pages/blog/BlogPostPage.jsx`, `src/components/BlogPost.jsx`

**Interfaces:**
- Consumes: `getBlogPosts()`, `getBlogPostBySlug(slug)` from Task 4.

- [ ] **Step 1: Write `web/app/blog/page.tsx`**

```typescript
import { getBlogPosts } from '@/lib/sanity/queries'

export default async function BlogIndexPage() {
  const posts = await getBlogPosts()
  // Recreate JSX from src/pages/blog/BlogIndex.jsx fed by `posts` instead
  // of the static BLOG_POSTS import.
}
```

- [ ] **Step 2: Write `web/app/blog/[slug]/page.tsx`**

```typescript
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { getBlogPostBySlug } from '@/lib/sanity/queries'

export const dynamicParams = true // no generateStaticParams, same as /servicios/[slug]

export default async function BlogPostRoutePage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) notFound()
  // Recreate JSX from src/pages/blog/BlogPostPage.jsx / src/components/BlogPost.jsx,
  // replacing the old `content[].type === 'h2'|'p'|'cta'` array renderer with
  // <PortableText value={post.body} /> for the main body, keeping the
  // `relatedServices` CTA blocks fed by `post.relatedServices` (already
  // resolved to {slug, title} by the GROQ projection in Task 4).
}
```

Install the renderer: `cd web && npm install @portabletext/react`.

- [ ] **Step 3: Write `web/app/blog/[slug]/not-found.tsx`**

```typescript
export default function BlogPostNotFound() {
  return (
    <div className="max-w-2xl mx-auto py-24 px-6 text-center">
      <h1 className="text-2xl font-bold">Artículo no encontrado</h1>
      <p className="mt-2 text-carbon">El post que buscás no existe o cambió de dirección.</p>
    </div>
  )
}
```

- [ ] **Step 4: Verify**

Run: `cd web && npm run dev`, open `http://localhost:3000/blog` and `http://localhost:3000/blog/como-armar-tu-archivo-para-corte-laser`.
Expected: both render seeded content (requires Task 2 Step 5's manual Portable Text entry to be done for real body content — if skipped, `PortableText` renders an empty body, which is an acceptable interim state for this verification).

- [ ] **Step 5: Commit**

```bash
git add web/app/blog
git commit -m "feat: migrate blog index and post pages to on-demand dynamic route"
```

---

### Task 12: SEO — metadata, JSON-LD, sitemap, robots

**Files:**
- Create: `web/components/JsonLd.tsx`
- Modify: `web/app/layout.tsx` (add organization JSON-LD)
- Modify: `web/app/servicios/[slug]/page.tsx` (already has `generateMetadata` from Task 7 — this task adds JSON-LD)
- Modify: `web/app/blog/[slug]/page.tsx` (add `generateMetadata` + JSON-LD)
- Create: `web/app/sitemap.ts`
- Create: `web/app/robots.ts`

**Interfaces:**
- Consumes: `getAllServiceSlugs()`, `getAllBlogSlugs()`, `getSiteSettings()` from Task 4.

- [ ] **Step 1: Write `web/components/JsonLd.tsx`**

```typescript
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 2: Add organization schema to `web/app/layout.tsx`**

```typescript
import JsonLd from '@/components/JsonLd'
// ...inside RootLayout, before <Navbar/>:
<JsonLd
  data={{
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: site.address },
    sameAs: [site.instagramUrl],
  }}
/>
```

- [ ] **Step 3: Add per-service JSON-LD in `web/app/servicios/[slug]/page.tsx`**

```typescript
<JsonLd
  data={{
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
  }}
/>
```

- [ ] **Step 4: Add `generateMetadata` + JSON-LD to `web/app/blog/[slug]/page.tsx`**

```typescript
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) return {}
  return { title: post.title as string, description: post.excerpt as string }
}
```
Add a `BlogPosting` JSON-LD block same pattern as Step 3.

- [ ] **Step 5: Write `web/app/sitemap.ts`**

```typescript
import type { MetadataRoute } from 'next'
import { getAllServiceSlugs, getAllBlogSlugs } from '@/lib/sanity/queries'

const BASE_URL = 'https://www.ciudaddellaser.com.ar'
const STATIC_ROUTES = [
  '', '/materiales', '/galeria', '/personalizador', '/como-armar-tu-archivo',
  '/envios-y-pagos', '/preguntas-frecuentes', '/donde-estamos', '/contacto', '/blog',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, blogSlugs] = await Promise.all([getAllServiceSlugs(), getAllBlogSlugs()])
  return [
    ...STATIC_ROUTES.map((path) => ({ url: `${BASE_URL}${path}`, lastModified: new Date() })),
    ...serviceSlugs.map((slug) => ({ url: `${BASE_URL}/servicios/${slug}`, lastModified: new Date() })),
    ...blogSlugs.map((slug) => ({ url: `${BASE_URL}/blog/${slug}`, lastModified: new Date() })),
  ]
}
```

- [ ] **Step 6: Write `web/app/robots.ts`**

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/studio' },
    sitemap: 'https://www.ciudaddellaser.com.ar/sitemap.xml',
  }
}
```

- [ ] **Step 7: Verify**

Run: `cd web && npm run dev`, check `http://localhost:3000/sitemap.xml` lists all 11 service URLs and 2 blog URLs; check `view-source:http://localhost:3000/servicios/corte-laser-mdf` contains a `<script type="application/ld+json">` block.

- [ ] **Step 8: Commit**

```bash
git add web/components/JsonLd.tsx web/app/layout.tsx web/app/servicios web/app/blog web/app/sitemap.ts web/app/robots.ts
git commit -m "feat: add SEO metadata, JSON-LD, sitemap and robots"
```

---

### Task 13: Firebase App Hosting deploy

**Files:**
- Create: `web/apphosting.yaml`
- Create: `web/.firebaserc` (if not already generated by `firebase init`)

**Interfaces:**
- Consumes: env vars from Tasks 1, 5 (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_REVALIDATE_SECRET`).

- [ ] **Step 1: Install Firebase CLI and init App Hosting**

```bash
npm install -g firebase-tools
firebase login
cd web && firebase init apphosting
```
Follow prompts: select/create Firebase project, connect the GitHub repo, root directory `web`, live branch `main`.

- [ ] **Step 2: Write `web/apphosting.yaml`**

```yaml
runConfig:
  minInstances: 1
  maxInstances: 3
env:
  - variable: NEXT_PUBLIC_SANITY_PROJECT_ID
    value: <projectId>
    availability:
      - BUILD
      - RUNTIME
  - variable: NEXT_PUBLIC_SANITY_DATASET
    value: production
    availability:
      - BUILD
      - RUNTIME
  - variable: SANITY_REVALIDATE_SECRET
    secret: sanity-revalidate-secret
    availability:
      - RUNTIME
```

- [ ] **Step 3: Store the secret in Firebase Secret Manager**

```bash
firebase apphosting:secrets:set sanity-revalidate-secret
```
Paste the same value generated in Task 5 Step 1.

- [ ] **Step 4: Deploy**

```bash
git push origin main
```
Firebase App Hosting auto-builds/deploys on push to the connected branch (per Step 1 setup). Confirm in the Firebase console → App Hosting → rollout status reaches "Live".

- [ ] **Step 5: Update the Sanity webhook URL**

In sanity.io/manage → Webhooks, update the URL from Task 5 Step 3 to the real deployed domain (e.g. `https://<app>--<project>.web.app/api/revalidate` or the custom domain once attached).

- [ ] **Step 6: Verify end-to-end revalidation**

Edit a service's `heroTitle` in `/studio` on the deployed site, publish, wait a few seconds, reload the corresponding `/servicios/<slug>` page.
Expected: new title appears without any redeploy.

- [ ] **Step 7: Commit**

```bash
git add web/apphosting.yaml
git commit -m "feat: configure Firebase App Hosting deployment"
```

---

### Task 14: QA and cutover

**Files:**
- No new files. Manual verification pass + DNS/deploy switch.

- [ ] **Step 1: Smoke test all 12 routes on the deployed Next.js site**

Visit each: `/`, `/servicios/<each of 11 slugs>`, `/materiales`, `/galeria`, `/personalizador`, `/como-armar-tu-archivo`, `/envios-y-pagos`, `/preguntas-frecuentes`, `/donde-estamos`, `/contacto`, `/blog`, `/blog/<each of 2 slugs>`. Confirm no console errors, no broken images, WhatsApp links work, `QuoteForm` submits.

- [ ] **Step 2: Verify SSR is real (not client-shell)**

For 3 representative routes (`/`, `/servicios/corte-laser-mdf`, `/blog`), run `curl -s <url> | grep -i "<title service or post name>"` and confirm the content string is present in the raw HTML response (proves it's server-rendered, not just a JS shell).

- [ ] **Step 3: Run Lighthouse and compare against the current SPA**

```bash
npx lighthouse https://<new-domain> --output=json --output-path=./lighthouse-new.json
npx lighthouse https://www.ciudaddellaser.com.ar --output=json --output-path=./lighthouse-old.json
```
Expected: Performance/SEO/Accessibility scores on the new site are equal to or better than the old SPA. Investigate any regression before proceeding.

- [ ] **Step 4: Cutover DNS**

Point the production domain (`www.ciudaddellaser.com.ar`) at the Firebase App Hosting backend per the Firebase console's custom domain instructions. Confirm the SSL cert provisions and the domain resolves to the new app.

- [ ] **Step 5: Retire the old SPA**

Once DNS has propagated and Step 1–3 pass on the production domain, stop deploying the old Vite app (remove its hosting target or leave the repo's `src/`/`package.json` in place as historical reference — do not delete, since `web/scripts/seed.ts` still reads from `src/data/*.js` for provenance).

- [ ] **Step 6: Commit any final config changes**

```bash
git add -A
git commit -m "chore: complete cutover to Next.js + Sanity"
```
