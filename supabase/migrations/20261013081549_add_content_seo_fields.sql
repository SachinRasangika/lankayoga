alter table public.packages
  add column if not exists slug text,
  add column if not exists seo_title text not null default '',
  add column if not exists seo_description text not null default '',
  add column if not exists image_alt text not null default '';

update public.packages set slug = id where slug is null or btrim(slug) = '';
alter table public.packages alter column slug set not null;
create unique index if not exists packages_slug_key on public.packages (slug);

alter table public.posts
  add column if not exists seo_title text not null default '',
  add column if not exists seo_description text not null default '',
  add column if not exists image_alt text not null default '';

alter table public.classes
  add column if not exists slug text,
  add column if not exists seo_title text not null default '',
  add column if not exists seo_description text not null default '';

update public.classes set slug = id where slug is null or btrim(slug) = '';
alter table public.classes alter column slug set not null;
create unique index if not exists classes_slug_key on public.classes (slug);

alter table public.treatments
  add column if not exists slug text,
  add column if not exists seo_title text not null default '',
  add column if not exists seo_description text not null default '';

update public.treatments set slug = id where slug is null or btrim(slug) = '';
alter table public.treatments alter column slug set not null;
create unique index if not exists treatments_slug_key on public.treatments (slug);
