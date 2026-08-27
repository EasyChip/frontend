# EasyChip — website

The public site for EasyChip: seven routes, no authenticated area, no product
surface. Its job is to let an investor or a chip team understand the platform
end to end and then start a conversation.

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Calendly
npm run dev
```

The site runs without `.env.local`. The contact form degrades to an honest
message pointing at the founder address, and the Calendly embed falls back to a
plain link. Nothing throws.

## Routes

| Route | What it carries |
|---|---|
| `/` | The thesis: the toolchain is the bottleneck, and we own the tools |
| `/platform` | Nine stages, the suite, determinism, how teams start |
| `/intelligence` | The AI layer and the IP guarantee |
| `/company` | Founders, validation, market, roadmap |
| `/contact` | Calendly booking and the lead form |
| `/privacy`, `/terms` | Interim legal notices |

Every route the old site published redirects here — see `next.config.ts`.

## Where things live

```
app/                 routes; one folder per surface
  actions/lead.ts    the only server action: store an inbound lead
components/
  core/              Type, Button, Section — the design system primitives
  chrome/            NavBar, NewsBar, Footer, ObfuscatedEmail
  media/             Hero
  lists/             StatCard, ListRow, CompareRow
  forms/             LeadForm, Calendly
lib/
  site.ts            identity, nav, CTAs, external links
  tools.ts           the suite: nine stages and the tools in them
  supabase/          server client + env guard
```

## The design system

`DESIGN.md` at the repo root is the source of truth, generated from the built
site — read it before touching anything visual. `PRODUCT.md` holds product
truth: what is built, what is live, and what may and may not be published.

(The brand kit these were derived from lives in `internal/`, which is
gitignored because it also holds confidential material. `DESIGN.md` is
self-contained — you do not need the kit to work on this site.)

Three rules that are easy to break by accident:

1. **There is no accent colour.** The system is strictly monochrome. Emphasis
   is brightness: dim the line, lift the phrase to white with `<Accent>`.
2. **Two type registers only.** Archivo 300 for statements (`display-1/2/3`),
   IBM Plex Mono uppercase for everything small (`.label`, `.meta`). Never a
   serif, and never a third face.
3. **`display-*` is deliberately not named `text-*`.** `tailwind-merge` treats
   every `text-*` class as one conflict group, so a custom `text-display-1`
   loses to `text-off-white` and the font size silently disappears. If you add
   a font-size utility, keep it outside the `text-*` namespace.

## Content rules

Product status is stated precisely: **built**, **live**, **in build** and
**next** mean different things. Nothing on this site may imply paying customers,
funding raised, or a beta that has already happened. `PRODUCT.md` lists what is
cleared to publish and what is not — read it before adding a claim.

## Checks

```bash
npm run build      # typecheck + production build
npm run lint
```
