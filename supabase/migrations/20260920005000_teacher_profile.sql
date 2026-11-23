-- Teacher photos, focus, specialties, and Ayurveda feature flag

alter table public.teachers
  add column if not exists images text[] not null default '{}',
  add column if not exists featured boolean not null default false,
  add column if not exists focus text not null default 'integrated',
  add column if not exists specialties text[] not null default '{}';

alter table public.teachers drop constraint if exists teachers_focus_check;
alter table public.teachers
  add constraint teachers_focus_check check (focus in ('yoga', 'ayurveda', 'integrated'));

update public.teachers
set images = case
  when image <> '' then array[image] || coalesce(images, '{}')
  else coalesce(images, '{}')
end
where cardinality(coalesce(images, '{}')) = 0;

update public.teachers set
  focus = 'yoga',
  specialties = ARRAY['Asana', 'Alignment', 'Anatomy'],
  images = ARRAY[
    '/221cf92f-79bf-4d9f-b0c5-b3d03a28b09e.jpg',
    '/756392b9-dc19-438d-a99d-cde8a26c565f.jpg'
  ]
where id = 'maya';

update public.teachers set
  focus = 'ayurveda',
  featured = true,
  specialties = ARRAY['Pulse', 'Panchakarma', 'Herbs'],
  images = ARRAY[
    '/d4c5d7ab-f0a4-4515-8743-4baccf513443.jpg',
    '/0b61b114-fcf2-40e9-9d48-1821596215c1.jpg'
  ]
where id = 'ranil';

update public.teachers set
  focus = 'integrated',
  specialties = ARRAY['Breath', 'Philosophy', 'Meditation'],
  images = ARRAY[
    '/7006eef6-1ee4-46cd-9a4f-6bd9a23a24bd.jpg',
    '/cf068b9c-e64b-4ba4-88df-2a7d9f461f2f.jpg'
  ]
where id = 'anjali';
