-- Treatment photos for public view pages and admin

alter table public.treatments add column if not exists image text not null default '';
alter table public.treatments add column if not exists images text[] not null default '{}';
alter table public.treatments add column if not exists alt text not null default '';

update public.treatments set
  image = case id
    when 'abhyanga' then '/0b61b114-fcf2-40e9-9d48-1821596215c1.jpg'
    when 'shirodhara' then '/8ce01688-b9ce-4d17-862a-d8d1fc03670c.jpg'
    when 'pizhichil' then '/cfad99d2-dc8b-4d38-8df1-1cf72729ef30.jpg'
    when 'udvartana' then '/807cd2d7-7142-4496-bd4b-0c29e250e853.jpg'
    when 'nasya' then '/c2402952-3522-48a7-ab0c-46bf7c31a1f9.jpg'
    when 'takradhara' then '/7c7e46a9-424d-4323-ab8a-f1d36bc9635f.jpg'
    else image
  end,
  alt = case id
    when 'abhyanga' then 'Warm herbal oil poured from a brass vessel into cupped hands'
    when 'shirodhara' then 'A thread of warm oil poured across the forehead'
    when 'pizhichil' then 'An Ayurvedic head massage with warm oil'
    when 'udvartana' then 'Herbs and powders laid out in the campus apothecary'
    when 'nasya' then 'Steam curling in a dark wooden Ayurvedic steam chamber'
    when 'takradhara' then 'A cooling herbal foot bath beside the therapy rooms'
    else alt
  end
where id in ('abhyanga','shirodhara','pizhichil','udvartana','nasya','takradhara');

update public.treatments
set images = array[image]
where coalesce(image, '') <> '' and (images = '{}' or images is null);
