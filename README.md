# EasyChip — Website (frontend)

The Next.js app behind [www.easychip.org](https://www.easychip.org): marketing site,
tool showcase, and the authenticated app surface (login/dashboard/admin via Supabase).

## Stack

- **Next.js 16** (App Router, Turbopack, SSG for all marketing routes)
- **React 19** · **TypeScript**
- **Tailwind CSS 4** — design tokens live in `app/globals.css` (`@theme`), sourced from `internal/DESIGN.md`
- **Supabase** — auth + data for `/login`, `/dashboard`, `/onboarding`, `/admin` (route protection in `proxy.ts`)
- **Formspree** — demo + early-access forms · **Cal.com** — meeting booking

## Layout

```
app/
  (site)/          marketing pages (share nav/footer chrome)
    page.tsx       home
    tools/         bucket showcase + /tools/[slug] live-tool pages
    platform/ escanor/ vision/ pricing/ ...
  login/ dashboard/ onboarding/ admin/ auth/   app surface (no marketing chrome)
  sitemap.ts robots.ts not-found.tsx
components/
  layout/ ui/ tools/ contact/ booking/
lib/
  tools.ts         PUBLIC-SAFE tool registry — powers /tools, tool pages, sitemap
  site.ts          nav, CTAs, footer, constants
  faq.ts           master FAQ bank + wrapped-engines list
  supabase/        client/server/middleware helpers
internal/          ⚠ gitignored, NEVER deployed — brand/content/strategy docs
public/brand/      logo + banner assets   public/downloads/  release artifacts
```

## Commands

```bash
npm run dev      # local dev
npm run build    # production build
npm start        # serve the build
npm run lint     # eslint
```

## Rules of the repo

- `internal/` holds IP-sensitive docs — it is gitignored and must never move under `public/`.
- `lib/tools.ts` is public-safe by contract: no pipeline internals, completion %, phases, or price figures.
- Content gaps are tracked in `CONTENT_TODO.md` — placeholders are honest, never invented.
- Env vars: see `.env.example` (Supabase, Cal.com, optional Formspree override).
