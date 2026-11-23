-- Page sections edited from Customize website.

create table if not exists public.site_sections (
  id text primary key,
  page text not null default '/',
  label text not null default '',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_sections enable row level security;

drop policy if exists "public read site sections" on public.site_sections;
create policy "public read site sections"
  on public.site_sections for select
  to anon, authenticated
  using (true);

drop policy if exists "staff write site sections" on public.site_sections;
create policy "staff write site sections"
  on public.site_sections for insert
  to authenticated
  with check (true);

drop policy if exists "staff update site sections" on public.site_sections;
create policy "staff update site sections"
  on public.site_sections for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "staff delete site sections" on public.site_sections;
create policy "staff delete site sections"
  on public.site_sections for delete
  to authenticated
  using (true);
