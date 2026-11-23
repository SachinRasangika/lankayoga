-- Weekly class timetable edited from the admin desk.

create table if not exists public.timetable (
  id text primary key,
  weekday text not null check (weekday in ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  time text not null default '',
  slots text[] not null default '{}',
  name text not null,
  instructor text not null default '',
  duration text not null default '',
  price text not null default '',
  description text not null default '',
  emphasis text not null default '',
  book_ahead boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

create index if not exists timetable_day_idx on public.timetable (weekday, sort_order, time);

alter table public.timetable enable row level security;

drop policy if exists "public read published timetable" on public.timetable;
create policy "public read published timetable"
  on public.timetable for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "staff read all timetable" on public.timetable;
create policy "staff read all timetable"
  on public.timetable for select
  to authenticated
  using (true);

drop policy if exists "staff write timetable" on public.timetable;
create policy "staff write timetable"
  on public.timetable for insert
  to authenticated
  with check (true);

drop policy if exists "staff update timetable" on public.timetable;
create policy "staff update timetable"
  on public.timetable for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "staff delete timetable" on public.timetable;
create policy "staff delete timetable"
  on public.timetable for delete
  to authenticated
  using (true);

insert into public.timetable (
  id, weekday, time, slots, name, instructor, duration, price, description, emphasis, book_ahead, sort_order, status, updated_at
) values
  ('mon-7am-ashtanga-half-primary', 'Monday', '7 AM', ARRAY['7 AM'], 'Ashtanga Half Primary', 'Shey', '60 min', 'Included', 'Ashtanga Half Primary with Shey.', '', false, 10, 'published', now()),
  ('mon-815am-movement-mobility', 'Monday', '8:15 AM', ARRAY['8:15 AM'], 'Movement + Mobility', 'Joanna', '60 min', 'Included', 'Movement + Mobility with Joanna.', '', false, 20, 'published', now()),
  ('mon-815am-vinyasa', 'Monday', '8:15 AM', ARRAY['8:15 AM'], 'Vinyasa', 'Shey', '60 min', 'Included', 'Vinyasa with Shey.', '', false, 30, 'published', now()),
  ('mon-10am-hatha-yoga', 'Monday', '10 AM', ARRAY['10 AM'], 'Hatha Yoga', 'Thilini', '60 min', 'Included', 'Hatha Yoga with Thilini.', '', false, 40, 'published', now()),
  ('mon-515pm-yoga-pilates', 'Monday', '5:15 PM', ARRAY['5:15 PM'], 'Yoga Pilates', 'Shey', '60 min', 'Included', 'Yoga Pilates with Shey.', '', false, 50, 'published', now()),
  ('mon-630pm-sweaty-vinyasa', 'Monday', '6:30 PM', ARRAY['6:30 PM'], 'Sweaty Vinyasa', 'Shey', '60 min', 'Included', 'Sweaty Vinyasa with Shey.', '', false, 60, 'published', now()),
  ('mon-630pm-yin-yoga', 'Monday', '6:30 PM', ARRAY['6:30 PM'], 'Yin Yoga', 'Thanuri', '60 min', 'Included', 'Yin Yoga with Thanuri.', '', false, 70, 'published', now()),
  ('tue-645am-power-yoga', 'Tuesday', '6:45 AM', ARRAY['6:45 AM'], 'Power Yoga', 'Shey', '60 min', 'Included', 'Power Yoga with Shey.', '', false, 80, 'published', now()),
  ('tue-8am-sweaty-vinyasa', 'Tuesday', '8 AM', ARRAY['8 AM'], 'Sweaty Vinyasa', 'Shey', '60 min', 'Included', 'Sweaty Vinyasa with Shey.', '', false, 90, 'published', now()),
  ('tue-830am-slow-flow', 'Tuesday', '8:30 AM', ARRAY['8:30 AM'], 'Slow Flow', 'Charnds', '60 min', 'Included', 'Slow Flow with Charnds.', '', false, 100, 'published', now()),
  ('tue-915am-restorative-yoga', 'Tuesday', '9:15 AM', ARRAY['9:15 AM'], 'Restorative Yoga', 'Shey', '60 min', 'Included', 'Restorative Yoga with Shey.', '', false, 110, 'published', now()),
  ('tue-1030am-hatha-yoga', 'Tuesday', '10:30 AM', ARRAY['10:30 AM'], 'Hatha Yoga', 'Monica', '60 min', 'Included', 'Hatha Yoga with Monica.', '', false, 120, 'published', now()),
  ('tue-4pm-kids-yoga', 'Tuesday', '4 PM', ARRAY['4 PM'], 'Kids Yoga', 'Keshia', '60 min', 'Included', 'Kids Yoga with Keshia.', '', true, 130, 'published', now()),
  ('tue-515pm-beginner-yoga', 'Tuesday', '5:15 PM', ARRAY['5:15 PM'], 'Beginner Yoga', 'Lali', '60 min', 'Included', 'Beginner Yoga with Lali.', '', false, 140, 'published', now()),
  ('tue-630pm-vinyasa', 'Tuesday', '6:30 PM', ARRAY['6:30 PM'], 'Vinyasa', 'Vidu', '60 min', 'Included', 'Vinyasa with Vidu.', '', false, 150, 'published', now()),
  ('tue-630pm-ashtanga-full-primary-75', 'Tuesday', '6:30 PM', ARRAY['6:30 PM'], 'Ashtanga Full Primary (75)', 'Shey', '75 min', 'Included', 'Ashtanga Full Primary (75) with Shey.', '', false, 160, 'published', now()),
  ('wed-645am-sunrise-flow', 'Wednesday', '6:45 AM', ARRAY['6:45 AM'], 'Sunrise Flow', 'Shey', '60 min', 'Included', 'Sunrise Flow with Shey.', '', false, 170, 'published', now()),
  ('wed-8am-ashtanga-half-primary', 'Wednesday', '8 AM', ARRAY['8 AM'], 'Ashtanga Half Primary', 'Shey', '60 min', 'Included', 'Ashtanga Half Primary with Shey.', '', false, 180, 'published', now()),
  ('wed-915am-hatha-yoga', 'Wednesday', '9:15 AM', ARRAY['9:15 AM'], 'Hatha Yoga', 'Thilini', '60 min', 'Included', 'Hatha Yoga with Thilini.', '', false, 190, 'published', now()),
  ('wed-915am-yoga-pilates', 'Wednesday', '9:15 AM', ARRAY['9:15 AM'], 'Yoga Pilates', 'Shey', '60 min', 'Included', 'Yoga Pilates with Shey. Ladies Only.', 'Ladies Only', false, 200, 'published', now()),
  ('wed-1030am-vinyasa', 'Wednesday', '10:30 AM', ARRAY['10:30 AM'], 'Vinyasa', 'Jacky', '60 min', 'Included', 'Vinyasa with Jacky.', '', false, 210, 'published', now()),
  ('wed-1030am-pre-natal-yoga', 'Wednesday', '10:30 AM', ARRAY['10:30 AM'], 'Pre-Natal Yoga', 'Christa', '60 min', 'Included', 'Pre-Natal Yoga with Christa.', '', true, 220, 'published', now()),
  ('wed-515pm-yoga-pilates', 'Wednesday', '5:15 PM', ARRAY['5:15 PM'], 'Yoga Pilates', 'Shey', '60 min', 'Included', 'Yoga Pilates with Shey.', '', false, 230, 'published', now()),
  ('wed-630pm-vinyasa', 'Wednesday', '6:30 PM', ARRAY['6:30 PM'], 'Vinyasa', 'Rekha', '60 min', 'Included', 'Vinyasa with Rekha.', '', false, 240, 'published', now()),
  ('wed-630pm-yin-yoga', 'Wednesday', '6:30 PM', ARRAY['6:30 PM'], 'Yin Yoga', 'Shey', '60 min', 'Included', 'Yin Yoga with Shey.', '', false, 250, 'published', now()),
  ('thu-645am-power-yoga', 'Thursday', '6:45 AM', ARRAY['6:45 AM'], 'Power Yoga', 'Shey', '60 min', 'Included', 'Power Yoga with Shey.', '', false, 260, 'published', now()),
  ('thu-730am-slow-flow', 'Thursday', '7:30 AM', ARRAY['7:30 AM'], 'Slow Flow', 'Pulakshi', '60 min', 'Included', 'Slow Flow with Pulakshi.', '', false, 270, 'published', now()),
  ('thu-8am-sweaty-vinyasa', 'Thursday', '8 AM', ARRAY['8 AM'], 'Sweaty Vinyasa', 'Shey', '60 min', 'Included', 'Sweaty Vinyasa with Shey.', '', false, 280, 'published', now()),
  ('thu-915am-essentrics', 'Thursday', '9:15 AM', ARRAY['9:15 AM'], 'Essentrics', 'Nileshi', '60 min', 'Included', 'Essentrics with Nileshi.', '', true, 290, 'published', now()),
  ('thu-915am-hatha-yoga', 'Thursday', '9:15 AM', ARRAY['9:15 AM'], 'Hatha Yoga', 'Thamali', '60 min', 'Included', 'Hatha Yoga with Thamali.', '', false, 300, 'published', now()),
  ('thu-1030am-expressive-arts', 'Thursday', '10:30 AM', ARRAY['10:30 AM'], 'Expressive Arts', 'Nileshi', '60 min', '3,500 LKR', 'Expressive Arts with Nileshi.', '', true, 310, 'published', now()),
  ('thu-515pm-sound-healing', 'Thursday', '5:15 PM', ARRAY['5:15 PM'], 'Sound Healing', 'Nimesha', '60 min', '3,500 LKR', 'Sound Healing with Nimesha.', '', true, 320, 'published', now()),
  ('thu-515pm-yin-yoga', 'Thursday', '5:15 PM', ARRAY['5:15 PM'], 'Yin Yoga', 'Christina', '60 min', 'Included', 'Yin Yoga with Christina.', '', false, 330, 'published', now()),
  ('thu-630pm-vinyasa', 'Thursday', '6:30 PM', ARRAY['6:30 PM'], 'Vinyasa', 'Shey', '60 min', 'Included', 'Vinyasa with Shey.', '', false, 340, 'published', now()),
  ('thu-630pm-ashtanga-full-primary-90', 'Thursday', '6:30 PM', ARRAY['6:30 PM'], 'Ashtanga Full Primary (90)', 'Nilukshi', '90 min', 'Included', 'Ashtanga Full Primary (90) with Nilukshi.', '', false, 350, 'published', now()),
  ('fri-7am-power-yoga', 'Friday', '7 AM', ARRAY['7 AM'], 'Power Yoga', 'Shey', '60 min', 'Included', 'Power Yoga with Shey.', '', false, 360, 'published', now()),
  ('fri-815am-movement-mobility', 'Friday', '8:15 AM', ARRAY['8:15 AM'], 'Movement + Mobility', 'Joanna', '60 min', 'Included', 'Movement + Mobility with Joanna.', '', false, 370, 'published', now()),
  ('fri-10am-hatha-yoga', 'Friday', '10 AM', ARRAY['10 AM'], 'Hatha Yoga', 'Saama', '60 min', 'Included', 'Hatha Yoga with Saama.', '', false, 380, 'published', now()),
  ('fri-515pm-yoga-pilates', 'Friday', '5:15 PM', ARRAY['5:15 PM'], 'Yoga Pilates', 'Joanna', '60 min', 'Included', 'Yoga Pilates with Joanna.', '', false, 390, 'published', now()),
  ('fri-630pm-hatha-yoga', 'Friday', '6:30 PM', ARRAY['6:30 PM'], 'Hatha Yoga', 'Lali', '60 min', 'Included', 'Hatha Yoga with Lali.', '', false, 400, 'published', now()),
  ('sat-7am-beginner-yoga', 'Saturday', '7 AM', ARRAY['7 AM'], 'Beginner Yoga', 'Udara', '60 min', 'Included', 'Beginner Yoga with Udara.', '', false, 410, 'published', now()),
  ('sat-830am-ashtanga-full-primary-75', 'Saturday', '8:30 AM', ARRAY['8:30 AM'], 'Ashtanga Full Primary (75)', 'Shey', '75 min', 'Included', 'Ashtanga Full Primary (75) with Shey.', '', false, 420, 'published', now()),
  ('sat-10am-intermediate-yoga', 'Saturday', '10 AM', ARRAY['10 AM'], 'Intermediate Yoga', 'Udara', '60 min', 'Included', 'Intermediate Yoga with Udara.', '', false, 430, 'published', now()),
  ('sat-1115am-vinyasa', 'Saturday', '11:15 AM', ARRAY['11:15 AM'], 'Vinyasa', 'Shey', '60 min', 'Included', 'Vinyasa with Shey.', '', false, 440, 'published', now()),
  ('sat-1115am-kids-yoga', 'Saturday', '11:15 AM', ARRAY['11:15 AM'], 'Kids Yoga', 'Keshia', '60 min', 'Included', 'Kids Yoga with Keshia.', '', false, 450, 'published', now()),
  ('sat-430pm-yoga-pilates', 'Saturday', '4:30 PM', ARRAY['4:30 PM'], 'Yoga Pilates', 'Shey', '60 min', 'Included', 'Yoga Pilates with Shey.', '', false, 460, 'published', now()),
  ('sun-7am-hatha-yoga-90', 'Sunday', '7 AM', ARRAY['7 AM'], 'Hatha Yoga (90)', 'Sanjeewa', '90 min', 'Included', 'Hatha Yoga (90) with Sanjeewa.', '', false, 470, 'published', now()),
  ('sun-845am-beginner-yoga', 'Sunday', '8:45 AM', ARRAY['8:45 AM'], 'Beginner Yoga', 'Imali', '60 min', 'Included', 'Beginner Yoga with Imali.', '', false, 480, 'published', now()),
  ('sun-10am-slow-flow', 'Sunday', '10 AM', ARRAY['10 AM'], 'Slow Flow', 'Nilukshi', '60 min', 'Included', 'Slow Flow with Nilukshi.', '', false, 490, 'published', now()),
  ('sun-1115am-vinyasa', 'Sunday', '11:15 AM', ARRAY['11:15 AM'], 'Vinyasa', 'Rekha', '60 min', 'Included', 'Vinyasa with Rekha.', '', false, 500, 'published', now()),
  ('sun-430pm-yin-yoga-meditation-90', 'Sunday', '4:30 PM', ARRAY['4:30 PM'], 'Yin Yoga + Meditation (90)', 'Vidu', '90 min', 'Included', 'Yin Yoga + Meditation (90) with Vidu.', '', false, 510, 'published', now())
on conflict (id) do nothing;
