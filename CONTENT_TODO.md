# CONTENT_TODO — facts pending from the content/design team

Every unfilled fact from the intake questionnaire (`internal/content/01_...md`), mapped to
exactly where it lands in code. Fill a fact → make the one edit → done.

## 🔴 Launch-gating (site ships placeholders until these land)

| # | Fact needed (Q#) | Where it lands |
|---|------------------|----------------|
| 1 | **VisUPF tarball** — drop the `.tar.gz` into `public/downloads/`, then set `VISUPF_DOWNLOAD` in `lib/site.ts` + add license string in `lib/tools.ts` (VisUPF `openSource.license`) | VisUPF page download block + announcement bar |
| 2 | **Live `@easychip.org` aliases** (Q13) — currently only `founder@` is published (obfuscated) | `lib/site.ts` `CONTACT_EMAIL`; contact page direct-lines block (sales@/press@/careers@/security@ withheld until confirmed) |
| 3 | **Privacy/Terms binding text** (Q51–Q53) — interim honest notices are live | `app/(site)/privacy/page.tsx`, `terms/page.tsx` |
| 4 | **Security page facts** (Q42–Q45): compliance posture, data-handling model, disclosure contact | `app/(site)/security/page.tsx` — page is live but `noindex` + out of nav |

## 🟠 High-value marketing (page modules ready and waiting)

| # | Fact needed (Q#) | Where it lands |
|---|------------------|----------------|
| 5 | **Cleared logos + permitted wording** (Q14: NVIDIA Inception, BITS; YC wording caution) | Home logo-wall module (currently replaced by metric band per fallback rule) |
| 6 | **Grants/awards WON vs pending** (Q15) | `/newsroom` entries + announcement-bar rotation |
| 7 | **Design partners / quote** (Q16, Q19, Q46) | Home proof module (omitted), `/customers` (out of nav, noindex) |
| 8 | **Sohil Khan decision** (Q20): DECIDED 2026-07-05 — not shown publicly (was briefly listed, removed on request). Bios/photos (Q21–Q23) still pending | `app/(site)/about/page.tsx` `team` array (Rakshit + Parth, initials avatars) |
| 9 | **Company LinkedIn page + X handle** (Q10, Q12) | `lib/site.ts` `SOCIALS` + footer Connect column |
| 10 | **Branded/team Cal.com link** (Q49) | `NEXT_PUBLIC_CALCOM_BOOKING_URL` env (falls back to personal link) |
| 11 | **Escanor access mechanics** (Q33: download vs request) + platforms (Q34) | `/escanor` CTA block |
| 12 | **Metrics you can stand behind** (Q18, with target/pilot labels) | `MetricBand` components on Home + /tools (currently registry-derived only) |
| 13 | **Analog / RF tool names** (when christened) | `lib/tools.ts` — replace `FUTURE_TRACKS` entries with `inDev(...)` rows in the Advance bucket |

## 🟡 Content engine (structured, honest empty states shipping)

| # | Fact needed (Q#) | Where it lands |
|---|------------------|----------------|
| 14 | Blog posts + bylines (Q54) | `/blog` — planned-post cards become real articles |
| 15 | Confirmed events: DVCon India / DAC status (Q56) | `/events` — per guard, nothing listed until confirmed |
| 16 | Open roles (Q57) | `/careers` roles section |
| 17 | Docs: what's documentable now (Q58) | `/docs` section cards |
| 18 | FlowBit "710 tests" stat — confirm OK to publish | `lib/tools.ts` FlowBit entry (currently NOT published) |
| 19 | Wrapped-engines naming sign-off (Q29, incl. "Stella" public naming) | `lib/faq.ts` `WRAPPED_ENGINES`, platform + tool pages (published; confirm) |

## Notes for whoever fills this in

- **Never** publish: model/pipeline details, completion %, build phases, tiers, competitor price figures. See `internal/` docs for the IP guard.
- Status labels are sacred: Live means live. Don't promote a tool without flipping its registry entry properly (`lib/tools.ts`).
- `/security` and `/customers` are intentionally `noindex` + out of nav — flip both when their facts land.
