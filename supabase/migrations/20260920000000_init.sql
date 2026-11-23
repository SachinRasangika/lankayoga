-- Lanka Yoga CMS

create table if not exists public.packages (
  id text primary key,
  title text not null,
  kind text not null check (kind in ('retreat', 'training', 'panchakarma')),
  focus text not null check (focus in ('yoga', 'ayurveda', 'integrated')),
  start_date date not null,
  end_date date not null,
  duration_days integer not null,
  price_usd numeric not null,
  capacity integer not null,
  spots_left integer not null,
  level text not null default '',
  image text not null default '',
  summary text not null default '',
  rhythm jsonb not null default '[]'::jsonb,
  includes text[] not null default '{}',
  teacher_ids text[] not null default '{}',
  certification text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id text primary key,
  title text not null,
  slug text not null unique,
  category text not null,
  excerpt text not null default '',
  body text not null default '',
  reading_minutes integer not null default 4,
  date date not null,
  author text not null,
  image text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

create index if not exists packages_start_date_idx on public.packages (start_date);
create index if not exists posts_date_idx on public.posts (date desc);
create index if not exists posts_slug_idx on public.posts (slug);

alter table public.packages enable row level security;
alter table public.posts enable row level security;

drop policy if exists "public read published packages" on public.packages;
create policy "public read published packages"
  on public.packages for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "staff read all packages" on public.packages;
create policy "staff read all packages"
  on public.packages for select
  to authenticated
  using (true);

drop policy if exists "staff write packages" on public.packages;
create policy "staff write packages"
  on public.packages for insert
  to authenticated
  with check (true);

drop policy if exists "staff update packages" on public.packages;
create policy "staff update packages"
  on public.packages for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "staff delete packages" on public.packages;
create policy "staff delete packages"
  on public.packages for delete
  to authenticated
  using (true);

drop policy if exists "public read published posts" on public.posts;
create policy "public read published posts"
  on public.posts for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "staff read all posts" on public.posts;
create policy "staff read all posts"
  on public.posts for select
  to authenticated
  using (true);

drop policy if exists "staff write posts" on public.posts;
create policy "staff write posts"
  on public.posts for insert
  to authenticated
  with check (true);

drop policy if exists "staff update posts" on public.posts;
create policy "staff update posts"
  on public.posts for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "staff delete posts" on public.posts;
create policy "staff delete posts"
  on public.posts for delete
  to authenticated
  using (true);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "staff upload media" on storage.objects;
create policy "staff upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "staff update media" on storage.objects;
create policy "staff update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

drop policy if exists "staff delete media" on storage.objects;
create policy "staff delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

insert into public.packages (
  id, title, kind, focus, start_date, end_date, duration_days, price_usd, capacity, spots_left, level, image, summary, rhythm, includes, teacher_ids, certification, status, updated_at
) values
  (
    'ytt-200-oct',
    '200-Hour Teacher Training',
    'training',
    'yoga',
    '2026-10-05',
    '2026-10-29',
    25,
    3450,
    16,
    3,
    'Open to committed practitioners',
    '/756392b9-dc19-438d-a99d-cde8a26c565f.jpg',
    'The full certification, taught in one residency. Sixteen people.',
    '[{"time":"05:45","activity":"Breath and silence at the shala"},{"time":"07:00","activity":"Led practice"},{"time":"10:30","activity":"Anatomy and alignment"},{"time":"14:00","activity":"Teaching practicum"},{"time":"17:30","activity":"Philosophy and closing circle"}]'::jsonb,
    ARRAY['Yoga Alliance 200-hour certificate', 'Private eco cabin, 25 nights', 'All meals, dosha-adjusted', 'Physician consultation'],
    ARRAY['maya', 'anjali'],
    'Yoga Alliance RYS 200',
    'published',
    now()
  ),
  (
    'panchakarma-21-nov',
    '21-Day Classical Panchakarma',
    'panchakarma',
    'ayurveda',
    '2026-11-02',
    '2026-11-23',
    21,
    5200,
    8,
    2,
    'Admission by consultation',
    '/92417d66-7bfd-4fb5-9612-7abb6b0b6f17.jpg',
    'The complete purification, sequenced to your pulse by Dr. Ranil.',
    '[{"time":"06:30","activity":"Gentle restorative practice"},{"time":"08:00","activity":"Physician round"},{"time":"09:00","activity":"Oleation and herbal steam"},{"time":"15:00","activity":"Therapy of the phase"},{"time":"19:00","activity":"Herbal preparation and rest"}]'::jsonb,
    ARRAY['Intake consultation before arrival', 'All medicines and oils', 'Daily physician supervision', 'Six-week home protocol'],
    ARRAY['ranil'],
    null,
    'published',
    now()
  ),
  (
    'reset-week-nov',
    'Breath & Reset Week',
    'retreat',
    'integrated',
    '2026-11-15',
    '2026-11-22',
    7,
    1650,
    14,
    6,
    'All levels',
    '/83eb990a-6a6f-4312-b5ee-0edf0623b317.jpg',
    'Seven days of practice, breathwork and long empty afternoons.',
    '[{"time":"06:15","activity":"Sunrise practice on the water"},{"time":"08:30","activity":"Breakfast, then open morning"},{"time":"11:00","activity":"Guided breathwork"},{"time":"16:00","activity":"Therapy or lake swim"},{"time":"18:00","activity":"Yoga nidra"}]'::jsonb,
    ARRAY['Eco cabin', 'Two Ayurvedic treatments', 'All meals and herbal teas', 'Airport transfer'],
    ARRAY['anjali', 'maya'],
    null,
    'published',
    now()
  ),
  (
    'dosha-reset-dec',
    'Dosha Balancing Retreat',
    'retreat',
    'ayurveda',
    '2026-12-06',
    '2026-12-13',
    7,
    1980,
    12,
    9,
    'All levels',
    '/807cd2d7-7142-4496-bd4b-0c29e250e853.jpg',
    'A short reset built around your constitution, read on day one.',
    '[{"time":"06:30","activity":"Practice for your constitution"},{"time":"08:15","activity":"Prescribed breakfast"},{"time":"10:00","activity":"Therapy"},{"time":"12:30","activity":"Garden kitchen session"},{"time":"18:30","activity":"Restorative practice"}]'::jsonb,
    ARRAY['Pulse diagnosis and written protocol', 'Five therapies', 'Two cooking workshops', 'Herbal kit to take home'],
    ARRAY['ranil', 'anjali'],
    null,
    'published',
    now()
  ),
  (
    'ytt-200-jan',
    '200-Hour Teacher Training',
    'training',
    'yoga',
    '2027-01-11',
    '2027-02-04',
    25,
    3450,
    16,
    11,
    'Open to committed practitioners',
    '/756392b9-dc19-438d-a99d-cde8a26c565f.jpg',
    'The January intake. Same syllabus, cooler season, larger cohort.',
    '[{"time":"05:45","activity":"Breath and silence at the shala"},{"time":"07:00","activity":"Led practice"},{"time":"10:30","activity":"Anatomy and alignment"},{"time":"14:00","activity":"Teaching practicum"},{"time":"17:30","activity":"Philosophy and closing circle"}]'::jsonb,
    ARRAY['Yoga Alliance 200-hour certificate', 'Private eco cabin, 25 nights', 'All meals, dosha-adjusted', 'Physician consultation'],
    ARRAY['maya', 'anjali'],
    'Yoga Alliance RYS 200',
    'published',
    now()
  ),
  (
    'panchakarma-14-feb',
    '14-Day Panchakarma',
    'panchakarma',
    'ayurveda',
    '2027-02-08',
    '2027-02-22',
    14,
    3600,
    8,
    5,
    'Admission by consultation',
    '/cfad99d2-dc8b-4d38-8df1-1cf72729ef30.jpg',
    'The same clinical care, shaped for a shorter window.',
    '[{"time":"06:30","activity":"Gentle restorative practice"},{"time":"08:00","activity":"Physician round"},{"time":"09:15","activity":"Oleation and steam"},{"time":"15:00","activity":"Therapy of the phase"},{"time":"18:30","activity":"Meditation and rest"}]'::jsonb,
    ARRAY['Pre-arrival consultation', 'All medicines and oils', 'Daily physician supervision', 'Four-week home protocol'],
    ARRAY['ranil'],
    null,
    'published',
    now()
  ),
  (
    'immersion-mar',
    'Yoga & Ayurveda Immersion',
    'retreat',
    'integrated',
    '2027-03-07',
    '2027-03-21',
    14,
    2890,
    14,
    12,
    'Intermediate',
    '/504ab046-2ad7-41a6-9867-90fd213f3f3a.jpg',
    'Two weeks where practice and medicine share one timetable.',
    '[{"time":"06:00","activity":"Sunrise practice"},{"time":"08:30","activity":"Breakfast and consultations"},{"time":"10:30","activity":"Therapy"},{"time":"15:30","activity":"Kitchen, herbs or philosophy"},{"time":"18:00","activity":"Pranayama and yoga nidra"}]'::jsonb,
    ARRAY['Physician consultation and protocol', 'Eight therapies', 'Single eco cabin', 'All meals, dosha-adjusted'],
    ARRAY['maya', 'ranil', 'anjali'],
    null,
    'published',
    now()
  )
on conflict (id) do nothing;

insert into public.posts (
  id, title, slug, category, excerpt, body, reading_minutes, date, author, image, status, updated_at
) values
  (
    'rice-and-curry',
    'What rice and curry teaches about the six tastes',
    'what-rice-and-curry-teaches-about-the-six-tastes',
    'Ayurvedic Kitchen',
    'A Sri Lankan plate is already a complete Ayurvedic meal. Our kitchen walks through one lunch.',
    'A Sri Lankan plate is already a complete Ayurvedic meal. Our kitchen walks through one lunch.',
    7,
    '2026-09-02',
    'Nayomi Fernando',
    '/f2b680f6-ea85-4331-ba19-c25108085500.jpg',
    'published',
    now()
  ),
  (
    'monsoon-practice',
    'Practising through the monsoon',
    'practising-through-the-monsoon',
    'Practice',
    'Why your practice should get lighter, warmer and earlier in the wet season.',
    'Why your practice should get lighter, warmer and earlier in the wet season.',
    5,
    '2026-08-19',
    'Anjali Perera',
    '/9e8814a3-4f86-4bfb-8d69-58811b5eec66.jpg',
    'published',
    now()
  ),
  (
    'oil-sourcing',
    'Where our therapy oils come from',
    'where-our-therapy-oils-come-from',
    'Ecology',
    'Sesame from Hambantota, coconut pressed nine kilometres away, eleven herbs from the garden.',
    'Sesame from Hambantota, coconut pressed nine kilometres away, eleven herbs from the garden.',
    9,
    '2026-08-04',
    'Dr. Ranil Wickrama',
    '/807cd2d7-7142-4496-bd4b-0c29e250e853.jpg',
    'published',
    now()
  ),
  (
    'first-teaching-year',
    'Your first year of teaching, honestly',
    'your-first-year-of-teaching-honestly',
    'Teacher Training',
    'Six graduates on what they earned, taught, and were never warned about.',
    'Six graduates on what they earned, taught, and were never warned about.',
    11,
    '2026-07-21',
    'Maya Lindqvist',
    '/90298f71-f6de-41b1-9663-ef7ac1a26aef.jpg',
    'published',
    now()
  ),
  (
    'wetland-return',
    'The birds came back before we finished building',
    'the-birds-came-back-before-we-finished-building',
    'Ecology',
    'Eight years of restoring nine acres, and the 74 species now on the lake.',
    'Eight years of restoring nine acres, and the 74 species now on the lake.',
    6,
    '2026-07-03',
    'Sunil Rathnayake',
    '/ad155795-ce80-423b-a7ed-f9899b26319d.jpg',
    'published',
    now()
  ),
  (
    'silence-practice',
    'On keeping silence for three days',
    'on-keeping-silence-for-three-days',
    'Practice',
    'Why every retreat holds a silent stretch, and what happens on the second afternoon.',
    'Why every retreat holds a silent stretch, and what happens on the second afternoon.',
    4,
    '2026-06-15',
    'Anjali Perera',
    '/cb12c925-c0f5-412a-bc3a-3d0ae06d1b72.jpg',
    'published',
    now()
  )
on conflict (id) do nothing;
