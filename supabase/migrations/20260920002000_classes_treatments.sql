-- Classes and treatments CMS

create table if not exists public.classes (
  id text primary key,
  name text not null,
  time text not null default '',
  duration text not null default '',
  level text not null default '',
  image text not null default '',
  alt text not null default '',
  description text not null default '',
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

create table if not exists public.treatments (
  id text primary key,
  name text not null,
  duration text not null default '',
  doshas text[] not null default '{}',
  description text not null default '',
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

create index if not exists classes_sort_idx on public.classes (sort_order, time);
create index if not exists treatments_sort_idx on public.treatments (sort_order, name);

alter table public.classes enable row level security;
alter table public.treatments enable row level security;

drop policy if exists "public read published classes" on public.classes;
create policy "public read published classes"
  on public.classes for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "staff read all classes" on public.classes;
create policy "staff read all classes"
  on public.classes for select
  to authenticated
  using (true);

drop policy if exists "staff write classes" on public.classes;
create policy "staff write classes"
  on public.classes for insert
  to authenticated
  with check (true);

drop policy if exists "staff update classes" on public.classes;
create policy "staff update classes"
  on public.classes for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "staff delete classes" on public.classes;
create policy "staff delete classes"
  on public.classes for delete
  to authenticated
  using (true);

drop policy if exists "public read published treatments" on public.treatments;
create policy "public read published treatments"
  on public.treatments for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "staff read all treatments" on public.treatments;
create policy "staff read all treatments"
  on public.treatments for select
  to authenticated
  using (true);

drop policy if exists "staff write treatments" on public.treatments;
create policy "staff write treatments"
  on public.treatments for insert
  to authenticated
  with check (true);

drop policy if exists "staff update treatments" on public.treatments;
create policy "staff update treatments"
  on public.treatments for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "staff delete treatments" on public.treatments;
create policy "staff delete treatments"
  on public.treatments for delete
  to authenticated
  using (true);

insert into public.classes (
  id, name, time, duration, level, image, alt, description, sort_order, status, updated_at
) values
  (
    'sunrise',
    'Sunrise asana',
    '06:30',
    '75 min',
    'All levels',
    '/268c5574-a1e8-46b9-93b4-1c65ae010cdf.jpg',
    'Bare feet and hands on a cotton mat during morning practice',
    'Slow standing work facing the lake, with the shala sides open. No music. No mirrors.',
    10,
    'published',
    now()
  ),
  (
    'pranayama',
    'Breath and sit',
    '08:00',
    '45 min',
    'All levels',
    '/90298f71-f6de-41b1-9663-ef7ac1a26aef.jpg',
    'Relaxed hands resting on crossed knees in a simple mudra',
    'Pranayama, then a short sit. The hour after breakfast, before the heat arrives.',
    20,
    'published',
    now()
  ),
  (
    'alignment',
    'Alignment clinic',
    '10:30',
    '60 min',
    'Practitioners',
    '/756392b9-dc19-438d-a99d-cde8a26c565f.jpg',
    'Students practising together in the open-air lakefront shala',
    'Fewer poses, more attention. For guests who want to understand what they are doing.',
    30,
    'published',
    now()
  ),
  (
    'restorative',
    'Restorative afternoon',
    '16:00',
    '60 min',
    'All levels',
    '/2df3ffd5-d0c0-4715-8a97-b292fcba7b36.jpg',
    'A quiet verandah with bolsters and afternoon light',
    'Supported shapes and long holds while the rain, or the heat, passes over the garden.',
    40,
    'published',
    now()
  ),
  (
    'nidra',
    'Yoga nidra',
    '18:30',
    '40 min',
    'All levels',
    '/cf068b9c-e64b-4ba4-88df-2a7d9f461f2f.jpg',
    'A person meditating by candlelight surrounded by small clay oil lamps',
    'Lamps, a short chant, then rest. Quiet is asked of the campus after this class.',
    50,
    'published',
    now()
  ),
  (
    'private',
    'Private practice',
    'By arrangement',
    '60 min',
    'Written to you',
    '/42e3e9a3-b2e9-4f21-a044-626013a96441.jpg',
    'The empty shala at midday with mats rolled and bolsters stacked',
    'One teacher, one guest. Injury, pregnancy, or a practice you want to take home.',
    60,
    'published',
    now()
  )
on conflict (id) do nothing;

insert into public.treatments (
  id, name, duration, doshas, description, sort_order, status, updated_at
) values
  (
    'abhyanga',
    'Abhyanga',
    '60 min',
    ARRAY['vata', 'kapha'],
    'Warm oil, four hands, one rhythm. The foundation of most protocols.',
    10,
    'published',
    now()
  ),
  (
    'shirodhara',
    'Shirodhara',
    '45 min',
    ARRAY['vata', 'pitta'],
    'A thread of oil poured across the forehead. For a mind that will not stop.',
    20,
    'published',
    now()
  ),
  (
    'pizhichil',
    'Pizhichil',
    '75 min',
    ARRAY['vata', 'pitta'],
    'Warm oil squeezed from cloth, head to foot. For joints and nerves.',
    30,
    'published',
    now()
  ),
  (
    'udvartana',
    'Udvartana',
    '60 min',
    ARRAY['kapha'],
    'Herbal powder instead of oil, worked upward. Wakes a heavy body.',
    40,
    'published',
    now()
  ),
  (
    'nasya',
    'Nasya',
    '30 min',
    ARRAY['kapha', 'vata'],
    'Medicated oil through the nose after steam. Clears the head.',
    50,
    'published',
    now()
  ),
  (
    'takradhara',
    'Takradhara',
    '45 min',
    ARRAY['pitta'],
    'Cool medicated buttermilk, poured slowly. Draws heat down.',
    60,
    'published',
    now()
  )
on conflict (id) do nothing;
