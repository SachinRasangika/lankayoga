import { ClassOffering, Dosha, JournalPost, Program, Therapy, TimetableClass, WeekDay } from '../types';
import { normalizeGallery } from '../utils/gallery';

export interface PackageRow {
  id: string;
  slug: string;
  seo_title: string;
  seo_description: string;
  image_alt: string;
  title: string;
  kind: Program['kind'];
  focus: Program['focus'];
  start_date: string;
  end_date: string;
  duration_days: number;
  price_usd: number | string;
  capacity: number;
  spots_left: number;
  level: string;
  image: string;
  images: string[] | null;
  summary: string;
  rhythm: Program['rhythm'] | null;
  includes: string[] | null;
  teacher_ids: string[] | null;
  certification: string | null;
  status: Program['status'];
  updated_at: string;
  open_dates?: boolean | null;
  subtitle?: string | null;
  body?: string | null;
  highlights?: string[] | null;
  specials?: Program['specials'] | null;
  itinerary?: Program['itinerary'] | null;
  addons?: string[] | null;
  extra_activities?: string[] | null;
  pdf_url?: string | null;
  booking_whatsapp?: string | null;
  booking_email?: string | null;
  booking_url?: string | null;
}

export interface PostRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  reading_minutes: number;
  date: string;
  author: string;
  image: string;
  images: string[] | null;
  seo_title: string;
  seo_description: string;
  image_alt: string;
  status: JournalPost['status'];
  updated_at: string;
}

export function packageFromRow(row: PackageRow): Program {
  return {
    id: row.id,
    slug: row.slug || row.id,
    seoTitle: row.seo_title ?? '',
    seoDescription: row.seo_description ?? '',
    imageAlt: row.image_alt ?? '',
    title: row.title,
    kind: row.kind,
    focus: row.focus,
    startDate: row.start_date,
    endDate: row.end_date,
    durationDays: row.duration_days,
    priceUsd: Number(row.price_usd),
    capacity: row.capacity,
    spotsLeft: row.spots_left,
    level: row.level,
    image: row.image ?? '',
    images: row.images ?? [],
    summary: row.summary ?? '',
    rhythm: row.rhythm ?? [],
    includes: row.includes ?? [],
    certification: row.certification ?? undefined,
    status: row.status ?? 'draft',
    updatedAt: row.updated_at,
    openDates: Boolean(row.open_dates),
    subtitle: row.subtitle ?? '',
    body: row.body ?? '',
    highlights: row.highlights ?? [],
    specials: row.specials ?? [],
    itinerary: row.itinerary ?? [],
    addons: row.addons ?? [],
    extraActivities: row.extra_activities ?? [],
    pdfUrl: row.pdf_url ?? '',
    bookingWhatsapp: row.booking_whatsapp ?? '',
    bookingEmail: row.booking_email ?? '',
    bookingUrl: row.booking_url ?? ''
  };
}

export function packageToRow(program: Program): PackageRow {
  return {
    id: program.id,
    slug: program.slug || program.id,
    seo_title: program.seoTitle ?? '',
    seo_description: program.seoDescription ?? '',
    image_alt: program.imageAlt ?? '',
    title: program.title,
    kind: program.kind,
    focus: program.focus,
    start_date: program.startDate,
    end_date: program.endDate,
    duration_days: program.durationDays,
    price_usd: program.priceUsd,
    capacity: program.capacity,
    spots_left: program.spotsLeft,
    level: program.level,
    image: normalizeGallery(program.image, program.images)[0] ?? '',
    images: normalizeGallery(program.image, program.images),
    summary: program.summary ?? '',
    rhythm: program.rhythm ?? [],
    includes: program.includes ?? [],
    teacher_ids: [],
    certification: program.certification ?? null,
    status: program.status ?? 'draft',
    updated_at: program.updatedAt ?? new Date().toISOString(),
    open_dates: Boolean(program.openDates),
    subtitle: program.subtitle ?? '',
    body: program.body ?? '',
    highlights: program.highlights ?? [],
    specials: program.specials ?? [],
    itinerary: program.itinerary ?? [],
    addons: program.addons ?? [],
    extra_activities: program.extraActivities ?? [],
    pdf_url: program.pdfUrl ?? '',
    booking_whatsapp: program.bookingWhatsapp ?? '',
    booking_email: program.bookingEmail ?? '',
    booking_url: program.bookingUrl ?? ''
  };
}

export function postFromRow(row: PostRow): JournalPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    excerpt: row.excerpt,
    body: row.body,
    readingMinutes: row.reading_minutes,
    date: row.date,
    author: row.author,
    image: row.image,
    images: row.images ?? [],
    seoTitle: row.seo_title ?? '',
    seoDescription: row.seo_description ?? '',
    imageAlt: row.image_alt ?? '',
    status: row.status ?? 'draft',
    updatedAt: row.updated_at
  };
}

export function postToRow(post: JournalPost): PostRow {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug ?? post.id,
    category: post.category,
    excerpt: post.excerpt,
    body: post.body ?? '',
    reading_minutes: post.readingMinutes,
    date: post.date,
    author: post.author,
    image: normalizeGallery(post.image, post.images)[0] ?? '',
    images: normalizeGallery(post.image, post.images),
    seo_title: post.seoTitle ?? '',
    seo_description: post.seoDescription ?? '',
    image_alt: post.imageAlt ?? '',
    status: post.status ?? 'draft',
    updated_at: post.updatedAt ?? new Date().toISOString()
  };
}

export interface ClassRow {
  id: string;
  slug: string;
  seo_title: string;
  seo_description: string;
  name: string;
  time: string;
  duration: string;
  level: string;
  image: string;
  alt: string;
  description: string;
  sort_order: number;
  status: ClassOffering['status'];
  updated_at: string;
}

export interface TreatmentRow {
  id: string;
  slug: string;
  seo_title: string;
  seo_description: string;
  name: string;
  duration: string;
  doshas: string[] | null;
  description: string;
  image: string;
  images: string[] | null;
  alt: string;
  sort_order: number;
  status: Therapy['status'];
  updated_at: string;
}

const doshaSet = new Set<Dosha>(['vata', 'pitta', 'kapha']);

export function cleanDoshas(values: string[] | null | undefined): Dosha[] {
  return (values ?? []).filter((item): item is Dosha => doshaSet.has(item as Dosha));
}

export function classFromRow(row: ClassRow): ClassOffering {
  return {
    id: row.id,
    slug: row.slug || row.id,
    seoTitle: row.seo_title ?? '',
    seoDescription: row.seo_description ?? '',
    name: row.name,
    time: row.time ?? '',
    duration: row.duration ?? '',
    level: row.level ?? '',
    image: row.image ?? '',
    alt: row.alt ?? '',
    description: row.description ?? '',
    sortOrder: row.sort_order ?? 0,
    status: row.status ?? 'draft',
    updatedAt: row.updated_at
  };
}

export function classToRow(item: ClassOffering): ClassRow {
  return {
    id: item.id,
    slug: item.slug || item.id,
    seo_title: item.seoTitle ?? '',
    seo_description: item.seoDescription ?? '',
    name: item.name,
    time: item.time,
    duration: item.duration,
    level: item.level,
    image: item.image ?? '',
    alt: item.alt ?? '',
    description: item.description ?? '',
    sort_order: item.sortOrder ?? 0,
    status: item.status ?? 'draft',
    updated_at: item.updatedAt ?? new Date().toISOString()
  };
}

export function treatmentFromRow(row: TreatmentRow): Therapy {
  return {
    id: row.id,
    slug: row.slug || row.id,
    seoTitle: row.seo_title ?? '',
    seoDescription: row.seo_description ?? '',
    name: row.name,
    duration: row.duration ?? '',
    doshas: cleanDoshas(row.doshas),
    description: row.description ?? '',
    image: row.image ?? '',
    images: row.images ?? [],
    alt: row.alt ?? '',
    sortOrder: row.sort_order ?? 0,
    status: row.status ?? 'draft',
    updatedAt: row.updated_at
  };
}

const weekDays = new Set<WeekDay>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);

export interface TimetableRow {
  id: string;
  weekday: string;
  time: string;
  slots: string[] | null;
  name: string;
  instructor: string;
  duration: string;
  price: string;
  description: string;
  emphasis: string;
  book_ahead: boolean;
  sort_order: number;
  status: TimetableClass['status'];
  updated_at: string;
}

export function timetableFromRow(row: TimetableRow): TimetableClass {
  const weekday = weekDays.has(row.weekday as WeekDay) ? row.weekday as WeekDay : 'Monday';
  const slots = (row.slots ?? []).map((slot) => slot.trim()).filter(Boolean);
  const time = row.time || slots[0] || '';
  return {
    id: row.id,
    weekday,
    time,
    slots: slots.length ? slots : time ? [time] : [],
    name: row.name,
    instructor: row.instructor ?? '',
    duration: row.duration ?? '',
    price: row.price ?? '',
    description: row.description ?? '',
    emphasis: row.emphasis ?? '',
    bookAhead: Boolean(row.book_ahead),
    sortOrder: row.sort_order ?? 0,
    status: row.status ?? 'draft',
    updatedAt: row.updated_at
  };
}

export function timetableToRow(item: TimetableClass): TimetableRow {
  const slots = Array.from(new Set([item.time, ...(item.slots ?? [])].map((slot) => slot.trim()).filter(Boolean)));
  return {
    id: item.id,
    weekday: item.weekday,
    time: item.time.trim() || slots[0] || '',
    slots,
    name: item.name,
    instructor: item.instructor ?? '',
    duration: item.duration ?? '',
    price: item.price ?? '',
    description: item.description ?? '',
    emphasis: item.emphasis ?? '',
    book_ahead: Boolean(item.bookAhead),
    sort_order: item.sortOrder ?? 0,
    status: item.status ?? 'draft',
    updated_at: item.updatedAt ?? new Date().toISOString()
  };
}

export function treatmentToRow(item: Therapy): TreatmentRow {
  const photos = normalizeGallery(item.image, item.images);
  return {
    id: item.id,
    slug: item.slug || item.id,
    seo_title: item.seoTitle ?? '',
    seo_description: item.seoDescription ?? '',
    name: item.name,
    duration: item.duration,
    doshas: cleanDoshas(item.doshas),
    description: item.description ?? '',
    image: photos[0] ?? '',
    images: photos,
    alt: item.alt ?? '',
    sort_order: item.sortOrder ?? 0,
    status: item.status ?? 'draft',
    updated_at: item.updatedAt ?? new Date().toISOString()
  };
}
