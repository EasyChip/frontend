-- ============================================================
-- EasyChip: profiles + tool_events schema
-- Run this in Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── 1. Profiles table (extends auth.users) ──────────────────

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company text,
  role text,                            -- e.g. "Design Engineer", "VP Engineering"
  company_stage text,                   -- "Academia" | "Startup" | "Mid-size" | "Enterprise"
  interest_areas text[],                -- ["FlowBit", "VisUPF", "RTL-to-GDS", "Collaboration"]
  primary_use_case text,
  phone text,
  linkedin_url text,
  avatar_url text,
  onboarding_complete boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can insert their own profile (on first login)
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ── 2. Auto-create profile on signup (trigger) ─────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

-- Drop trigger if it exists, then create
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── 3. Tool events table (funnel tracking) ──────────────────

create table if not exists public.tool_events (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  tool text not null,                   -- "VisUPF" | "FlowBit"
  event_type text not null,             -- "download" | "demo_request" | "page_view"
  metadata jsonb,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.tool_events enable row level security;

-- Users can read their own events
create policy "Users can read own events"
  on public.tool_events for select
  using (auth.uid() = user_id);

-- Users can insert their own events
create policy "Users can insert own events"
  on public.tool_events for insert
  with check (auth.uid() = user_id);

-- ── 4. Admin read policies (founder emails) ─────────────────
-- These allow founders to see all rows for the admin dashboard.
-- Uses service_role key on the server, so these are optional but
-- useful if you want to query from the client side with admin token.

-- For server-side admin views, use the SUPABASE_SERVICE_ROLE_KEY
-- which bypasses RLS entirely.

-- ── 5. Updated-at trigger ───────────────────────────────────

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

-- ── 6. Indexes ──────────────────────────────────────────────

create index if not exists idx_tool_events_user_id on public.tool_events(user_id);
create index if not exists idx_tool_events_tool on public.tool_events(tool);
create index if not exists idx_tool_events_created_at on public.tool_events(created_at desc);
