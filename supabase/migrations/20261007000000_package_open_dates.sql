alter table public.packages
  add column if not exists open_dates boolean not null default false,
  add column if not exists subtitle text not null default '',
  add column if not exists body text not null default '',
  add column if not exists highlights text[] not null default '{}',
  add column if not exists specials jsonb not null default '[]'::jsonb,
  add column if not exists itinerary jsonb not null default '[]'::jsonb,
  add column if not exists addons text[] not null default '{}',
  add column if not exists extra_activities text[] not null default '{}',
  add column if not exists pdf_url text not null default '',
  add column if not exists booking_whatsapp text not null default '',
  add column if not exists booking_email text not null default '',
  add column if not exists booking_url text not null default '';
