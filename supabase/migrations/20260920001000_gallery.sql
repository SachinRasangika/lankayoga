alter table public.packages add column if not exists images text[] not null default '{}';
alter table public.posts add column if not exists images text[] not null default '{}';

update public.packages
set images = array[image]
where coalesce(image, '') <> '' and (images = '{}' or images is null);

update public.posts
set images = array[image]
where coalesce(image, '') <> '' and (images = '{}' or images is null);
