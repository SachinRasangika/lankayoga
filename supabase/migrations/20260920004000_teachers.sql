-- Teachers CMS (example staff live in the database, not in frontend files)

create table if not exists public.teachers (
  id text primary key,
  name text not null,
  role text not null default '',
  origin text not null default '',
  image text not null default '',
  alt text not null default '',
  bio text not null default '',
  quote text not null default '',
  credentials text[] not null default '{}',
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

create index if not exists teachers_sort_idx on public.teachers (sort_order, name);

alter table public.teachers enable row level security;

drop policy if exists "public read published teachers" on public.teachers;
create policy "public read published teachers"
  on public.teachers for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "staff read all teachers" on public.teachers;
create policy "staff read all teachers"
  on public.teachers for select
  to authenticated
  using (true);

drop policy if exists "staff write teachers" on public.teachers;
create policy "staff write teachers"
  on public.teachers for insert
  to authenticated
  with check (true);

drop policy if exists "staff update teachers" on public.teachers;
create policy "staff update teachers"
  on public.teachers for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "staff delete teachers" on public.teachers;
create policy "staff delete teachers"
  on public.teachers for delete
  to authenticated
  using (true);

insert into public.teachers (
  id, name, role, origin, image, alt, bio, quote, credentials, sort_order, status, updated_at
) values
  (
    'maya',
    'Maya Lindqvist',
    'Asana & anatomy',
    'Stockholm',
    '/221cf92f-79bf-4d9f-b0c5-b3d03a28b09e.jpg',
    'Portrait of Maya Lindqvist',
    'Fifteen years teaching. Builds the technical spine of the training — alignment, anatomy, and how to keep a room safe.',
    '',
    ARRAY['E-RYT 500 · Physiotherapist, BSc'],
    10,
    'published',
    now()
  ),
  (
    'ranil',
    'Dr. Ranil Wickrama',
    'Resident physician',
    'Kandy',
    '/d4c5d7ab-f0a4-4515-8743-4baccf513443.jpg',
    'Portrait of Dr. Ranil Wickrama',
    'Third-generation Ayurvedic physician. Reads every pulse and writes every protocol on campus himself.',
    'A package cannot know your pulse. I write the protocol after I read it.',
    ARRAY['BAMS Colombo · 24 years practice'],
    20,
    'published',
    now()
  ),
  (
    'anjali',
    'Anjali Perera',
    'Breath & philosophy',
    'Galle',
    '/7006eef6-1ee4-46cd-9a4f-6bd9a23a24bd.jpg',
    'Portrait of Anjali Perera',
    'Teaches the interior half — breath, subtle anatomy, the texts — with an emphasis on what you can sustain at home.',
    '',
    ARRAY['MA Indian Philosophy · Faculty since 2019'],
    30,
    'published',
    now()
  )
on conflict (id) do nothing;
