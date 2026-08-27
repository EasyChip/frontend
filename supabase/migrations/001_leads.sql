-- Inbound leads from the website contact form.
--
-- This is the only table the marketing site uses. There is no auth, no
-- profiles and no sessions: the site is a public surface, and a lead is a row
-- someone chose to leave.

create table if not exists public.leads (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  company     text,
  role        text,
  note        text,
  -- 'demo' | 'contact'
  intent      text not null default 'demo'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Anonymous visitors may only insert. Nobody reads this table through the
-- public API; the team reads it in the dashboard or with the service role.
drop policy if exists "anon can submit a lead" on public.leads;
create policy "anon can submit a lead"
  on public.leads
  for insert
  to anon
  with check (true);
