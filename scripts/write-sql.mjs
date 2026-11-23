import { writeFileSync } from 'node:fs';

const packages = [
  {
    id: 'ytt-200-oct',
    title: '200-Hour Teacher Training',
    kind: 'training',
    focus: 'yoga',
    start_date: '2026-10-05',
    end_date: '2026-10-29',
    duration_days: 25,
    price_usd: 3450,
    capacity: 16,
    spots_left: 3,
    level: 'Open to committed practitioners',
    image: '/756392b9-dc19-438d-a99d-cde8a26c565f.jpg',
    summary: 'The full certification, taught in one residency. Sixteen people.',
    rhythm: [
      { time: '05:45', activity: 'Breath and silence at the shala' },
      { time: '07:00', activity: 'Led practice' },
      { time: '10:30', activity: 'Anatomy and alignment' },
      { time: '14:00', activity: 'Teaching practicum' },
      { time: '17:30', activity: 'Philosophy and closing circle' }
    ],
    includes: ['Yoga Alliance 200-hour certificate', 'Private eco cabin, 25 nights', 'All meals, dosha-adjusted', 'Physician consultation'],
    teacher_ids: ['maya', 'anjali'],
    certification: 'Yoga Alliance RYS 200'
  },
  {
    id: 'panchakarma-21-nov',
    title: '21-Day Classical Panchakarma',
    kind: 'panchakarma',
    focus: 'ayurveda',
    start_date: '2026-11-02',
    end_date: '2026-11-23',
    duration_days: 21,
    price_usd: 5200,
    capacity: 8,
    spots_left: 2,
    level: 'Admission by consultation',
    image: '/92417d66-7bfd-4fb5-9612-7abb6b0b6f17.jpg',
    summary: 'The complete purification, sequenced to your pulse by Dr. Ranil.',
    rhythm: [
      { time: '06:30', activity: 'Gentle restorative practice' },
      { time: '08:00', activity: 'Physician round' },
      { time: '09:00', activity: 'Oleation and herbal steam' },
      { time: '15:00', activity: 'Therapy of the phase' },
      { time: '19:00', activity: 'Herbal preparation and rest' }
    ],
    includes: ['Intake consultation before arrival', 'All medicines and oils', 'Daily physician supervision', 'Six-week home protocol'],
    teacher_ids: ['ranil'],
    certification: null
  },
  {
    id: 'reset-week-nov',
    title: 'Breath & Reset Week',
    kind: 'retreat',
    focus: 'integrated',
    start_date: '2026-11-15',
    end_date: '2026-11-22',
    duration_days: 7,
    price_usd: 1650,
    capacity: 14,
    spots_left: 6,
    level: 'All levels',
    image: '/83eb990a-6a6f-4312-b5ee-0edf0623b317.jpg',
    summary: 'Seven days of practice, breathwork and long empty afternoons.',
    rhythm: [
      { time: '06:15', activity: 'Sunrise practice on the water' },
      { time: '08:30', activity: 'Breakfast, then open morning' },
      { time: '11:00', activity: 'Guided breathwork' },
      { time: '16:00', activity: 'Therapy or lake swim' },
      { time: '18:00', activity: 'Yoga nidra' }
    ],
    includes: ['Eco cabin', 'Two Ayurvedic treatments', 'All meals and herbal teas', 'Airport transfer'],
    teacher_ids: ['anjali', 'maya'],
    certification: null
  },
  {
    id: 'dosha-reset-dec',
    title: 'Dosha Balancing Retreat',
    kind: 'retreat',
    focus: 'ayurveda',
    start_date: '2026-12-06',
    end_date: '2026-12-13',
    duration_days: 7,
    price_usd: 1980,
    capacity: 12,
    spots_left: 9,
    level: 'All levels',
    image: '/807cd2d7-7142-4496-bd4b-0c29e250e853.jpg',
    summary: 'A short reset built around your constitution, read on day one.',
    rhythm: [
      { time: '06:30', activity: 'Practice for your constitution' },
      { time: '08:15', activity: 'Prescribed breakfast' },
      { time: '10:00', activity: 'Therapy' },
      { time: '12:30', activity: 'Garden kitchen session' },
      { time: '18:30', activity: 'Restorative practice' }
    ],
    includes: ['Pulse diagnosis and written protocol', 'Five therapies', 'Two cooking workshops', 'Herbal kit to take home'],
    teacher_ids: ['ranil', 'anjali'],
    certification: null
  },
  {
    id: 'ytt-200-jan',
    title: '200-Hour Teacher Training',
    kind: 'training',
    focus: 'yoga',
    start_date: '2027-01-11',
    end_date: '2027-02-04',
    duration_days: 25,
    price_usd: 3450,
    capacity: 16,
    spots_left: 11,
    level: 'Open to committed practitioners',
    image: '/756392b9-dc19-438d-a99d-cde8a26c565f.jpg',
    summary: 'The January intake. Same syllabus, cooler season, larger cohort.',
    rhythm: [
      { time: '05:45', activity: 'Breath and silence at the shala' },
      { time: '07:00', activity: 'Led practice' },
      { time: '10:30', activity: 'Anatomy and alignment' },
      { time: '14:00', activity: 'Teaching practicum' },
      { time: '17:30', activity: 'Philosophy and closing circle' }
    ],
    includes: ['Yoga Alliance 200-hour certificate', 'Private eco cabin, 25 nights', 'All meals, dosha-adjusted', 'Physician consultation'],
    teacher_ids: ['maya', 'anjali'],
    certification: 'Yoga Alliance RYS 200'
  },
  {
    id: 'panchakarma-14-feb',
    title: '14-Day Panchakarma',
    kind: 'panchakarma',
    focus: 'ayurveda',
    start_date: '2027-02-08',
    end_date: '2027-02-22',
    duration_days: 14,
    price_usd: 3600,
    capacity: 8,
    spots_left: 5,
    level: 'Admission by consultation',
    image: '/cfad99d2-dc8b-4d38-8df1-1cf72729ef30.jpg',
    summary: 'The same clinical care, shaped for a shorter window.',
    rhythm: [
      { time: '06:30', activity: 'Gentle restorative practice' },
      { time: '08:00', activity: 'Physician round' },
      { time: '09:15', activity: 'Oleation and steam' },
      { time: '15:00', activity: 'Therapy of the phase' },
      { time: '18:30', activity: 'Meditation and rest' }
    ],
    includes: ['Pre-arrival consultation', 'All medicines and oils', 'Daily physician supervision', 'Four-week home protocol'],
    teacher_ids: ['ranil'],
    certification: null
  },
  {
    id: 'immersion-mar',
    title: 'Yoga & Ayurveda Immersion',
    kind: 'retreat',
    focus: 'integrated',
    start_date: '2027-03-07',
    end_date: '2027-03-21',
    duration_days: 14,
    price_usd: 2890,
    capacity: 14,
    spots_left: 12,
    level: 'Intermediate',
    image: '/504ab046-2ad7-41a6-9867-90fd213f3f3a.jpg',
    summary: 'Two weeks where practice and medicine share one timetable.',
    rhythm: [
      { time: '06:00', activity: 'Sunrise practice' },
      { time: '08:30', activity: 'Breakfast and consultations' },
      { time: '10:30', activity: 'Therapy' },
      { time: '15:30', activity: 'Kitchen, herbs or philosophy' },
      { time: '18:00', activity: 'Pranayama and yoga nidra' }
    ],
    includes: ['Physician consultation and protocol', 'Eight therapies', 'Single eco cabin', 'All meals, dosha-adjusted'],
    teacher_ids: ['maya', 'ranil', 'anjali'],
    certification: null
  }
];

const posts = [
  {
    id: 'rice-and-curry',
    title: 'What rice and curry teaches about the six tastes',
    slug: 'what-rice-and-curry-teaches-about-the-six-tastes',
    category: 'Ayurvedic Kitchen',
    excerpt: 'A Sri Lankan plate is already a complete Ayurvedic meal. Our kitchen walks through one lunch.',
    body: 'A Sri Lankan plate is already a complete Ayurvedic meal. Our kitchen walks through one lunch.',
    reading_minutes: 7,
    date: '2026-09-02',
    author: 'Nayomi Fernando',
    image: '/f2b680f6-ea85-4331-ba19-c25108085500.jpg'
  },
  {
    id: 'monsoon-practice',
    title: 'Practising through the monsoon',
    slug: 'practising-through-the-monsoon',
    category: 'Practice',
    excerpt: 'Why your practice should get lighter, warmer and earlier in the wet season.',
    body: 'Why your practice should get lighter, warmer and earlier in the wet season.',
    reading_minutes: 5,
    date: '2026-08-19',
    author: 'Anjali Perera',
    image: '/9e8814a3-4f86-4bfb-8d69-58811b5eec66.jpg'
  },
  {
    id: 'oil-sourcing',
    title: 'Where our therapy oils come from',
    slug: 'where-our-therapy-oils-come-from',
    category: 'Ecology',
    excerpt: 'Sesame from Hambantota, coconut pressed nine kilometres away, eleven herbs from the garden.',
    body: 'Sesame from Hambantota, coconut pressed nine kilometres away, eleven herbs from the garden.',
    reading_minutes: 9,
    date: '2026-08-04',
    author: 'Dr. Ranil Wickrama',
    image: '/807cd2d7-7142-4496-bd4b-0c29e250e853.jpg'
  },
  {
    id: 'first-teaching-year',
    title: 'Your first year of teaching, honestly',
    slug: 'your-first-year-of-teaching-honestly',
    category: 'Teacher Training',
    excerpt: 'Six graduates on what they earned, taught, and were never warned about.',
    body: 'Six graduates on what they earned, taught, and were never warned about.',
    reading_minutes: 11,
    date: '2026-07-21',
    author: 'Maya Lindqvist',
    image: '/90298f71-f6de-41b1-9663-ef7ac1a26aef.jpg'
  },
  {
    id: 'wetland-return',
    title: 'The birds came back before we finished building',
    slug: 'the-birds-came-back-before-we-finished-building',
    category: 'Ecology',
    excerpt: 'Eight years of restoring nine acres, and the 74 species now on the lake.',
    body: 'Eight years of restoring nine acres, and the 74 species now on the lake.',
    reading_minutes: 6,
    date: '2026-07-03',
    author: 'Sunil Rathnayake',
    image: '/ad155795-ce80-423b-a7ed-f9899b26319d.jpg'
  },
  {
    id: 'silence-practice',
    title: 'On keeping silence for three days',
    slug: 'on-keeping-silence-for-three-days',
    category: 'Practice',
    excerpt: 'Why every retreat holds a silent stretch, and what happens on the second afternoon.',
    body: 'Why every retreat holds a silent stretch, and what happens on the second afternoon.',
    reading_minutes: 4,
    date: '2026-06-15',
    author: 'Anjali Perera',
    image: '/cb12c925-c0f5-412a-bc3a-3d0ae06d1b72.jpg'
  }
];

function sqlStr(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function sqlTextArray(values) {
  if (!values.length) return `'{}'`;
  return `ARRAY[${values.map(sqlStr).join(', ')}]`;
}

const packageValues = packages.map((item) => `(
    ${sqlStr(item.id)},
    ${sqlStr(item.title)},
    ${sqlStr(item.kind)},
    ${sqlStr(item.focus)},
    ${sqlStr(item.start_date)},
    ${sqlStr(item.end_date)},
    ${item.duration_days},
    ${item.price_usd},
    ${item.capacity},
    ${item.spots_left},
    ${sqlStr(item.level)},
    ${sqlStr(item.image)},
    ${sqlStr(item.summary)},
    ${sqlStr(JSON.stringify(item.rhythm))}::jsonb,
    ${sqlTextArray(item.includes)},
    ${sqlTextArray(item.teacher_ids)},
    ${item.certification ? sqlStr(item.certification) : 'null'},
    'published',
    now()
  )`).join(',\n  ');

const postValues = posts.map((item) => `(
    ${sqlStr(item.id)},
    ${sqlStr(item.title)},
    ${sqlStr(item.slug)},
    ${sqlStr(item.category)},
    ${sqlStr(item.excerpt)},
    ${sqlStr(item.body)},
    ${item.reading_minutes},
    ${sqlStr(item.date)},
    ${sqlStr(item.author)},
    ${sqlStr(item.image)},
    'published',
    now()
  )`).join(',\n  ');

const sql = `-- Lanka Yoga CMS
create extension if not exists pgcrypto;

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
  ${packageValues}
on conflict (id) do nothing;

insert into public.posts (
  id, title, slug, category, excerpt, body, reading_minutes, date, author, image, status, updated_at
) values
  ${postValues}
on conflict (id) do nothing;
`;

writeFileSync(new URL('../supabase/migrations/20260920000000_init.sql', import.meta.url), sql);
console.log('Wrote supabase/migrations/20260920000000_init.sql');
