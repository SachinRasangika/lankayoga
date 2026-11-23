import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { classFromRow, classToRow, packageFromRow, packageToRow, postFromRow, postToRow, timetableFromRow, timetableToRow, treatmentFromRow, treatmentToRow, type ClassRow, type PackageRow, type PostRow, type TimetableRow, type TreatmentRow } from '../lib/cms';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { ClassOffering, JournalPost, Program, PublishStatus, Therapy, TimetableClass } from '../types';
import { durationDaysFromRange, readingMinutesFromText, slugFromTitle } from '../utils/format';
import { normalizeGallery } from '../utils/gallery';
import { timeSortKey, weekDays } from '../data/weekSchedule';
import { comparePrograms } from '../utils/stays';
import { useAuth } from './auth';

function nowIso(): string {
  return new Date().toISOString();
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function uniqueSlug(slug: string, id: string, items: { id: string; slug?: string }[]): string {
  return items.some((item) => item.id !== id && item.slug === slug) ? `${slug}-${id.slice(-5)}` : slug;
}

export function emptyPackage(): Program {
  const start = new Date();
  start.setDate(start.getDate() + 30);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const startDate = start.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);
  return {
    id: newId('pkg'),
    slug: '',
    seoTitle: '',
    seoDescription: '',
    imageAlt: '',
    title: '',
    kind: 'retreat',
    focus: 'integrated',
    startDate,
    endDate,
    durationDays: durationDaysFromRange(startDate, endDate),
    priceUsd: 1650,
    capacity: 14,
    spotsLeft: 14,
    level: 'All levels',
    image: '',
    images: [],
    summary: '',
    rhythm: [{ time: '06:30', activity: '' }],
    includes: [],
    status: 'draft',
    openDates: false,
    subtitle: '',
    body: '',
    highlights: [],
    specials: [],
    itinerary: [],
    addons: [],
    extraActivities: [],
    pdfUrl: '',
    bookingWhatsapp: '',
    bookingEmail: '',
    bookingUrl: '',
    updatedAt: nowIso()
  };
}

export function emptyPost(): JournalPost {
  return {
    id: newId('post'),
    title: '',
    slug: '',
    category: 'Practice',
    excerpt: '',
    body: '',
    readingMinutes: 4,
    date: nowIso().slice(0, 10),
    author: 'Lanka Yoga',
    image: '',
    images: [],
    seoTitle: '',
    seoDescription: '',
    imageAlt: '',
    status: 'draft',
    updatedAt: nowIso()
  };
}

export function emptyClass(): ClassOffering {
  return {
    id: newId('class'),
    slug: '',
    seoTitle: '',
    seoDescription: '',
    name: '',
    time: '06:30',
    duration: '60 min',
    level: 'All levels',
    image: '',
    alt: '',
    description: '',
    sortOrder: 0,
    status: 'draft',
    updatedAt: nowIso()
  };
}

export function emptyTimetable(): TimetableClass {
  return {
    id: newId('tt'),
    weekday: 'Monday',
    time: '7 AM',
    slots: ['7 AM'],
    name: '',
    instructor: '',
    duration: '60 min',
    price: 'Included',
    description: '',
    emphasis: '',
    bookAhead: false,
    sortOrder: 0,
    status: 'draft',
    updatedAt: nowIso()
  };
}

export function emptyTreatment(): Therapy {
  return {
    id: newId('tx'),
    slug: '',
    seoTitle: '',
    seoDescription: '',
    name: '',
    duration: '60 min',
    doshas: ['vata'],
    description: '',
    image: '',
    images: [],
    alt: '',
    sortOrder: 0,
    status: 'draft',
    updatedAt: nowIso()
  };
}

function withPackageDefaults(program: Program): Program {
  const images = normalizeGallery(program.image, program.images);
  return {
    ...program,
    slug: program.slug || program.id,
    seoTitle: program.seoTitle ?? '',
    seoDescription: program.seoDescription ?? '',
    imageAlt: program.imageAlt ?? '',
    image: images[0] ?? '',
    images,
    status: program.status ?? 'published',
    updatedAt: program.updatedAt ?? nowIso(),
    durationDays: program.durationDays || durationDaysFromRange(program.startDate, program.endDate),
    openDates: Boolean(program.openDates),
    subtitle: program.subtitle ?? '',
    body: program.body ?? '',
    highlights: program.highlights ?? [],
    specials: program.specials ?? [],
    itinerary: program.itinerary ?? [],
    addons: program.addons ?? [],
    extraActivities: program.extraActivities ?? [],
    pdfUrl: program.pdfUrl ?? '',
    bookingWhatsapp: program.bookingWhatsapp ?? '',
    bookingEmail: program.bookingEmail ?? '',
    bookingUrl: program.bookingUrl ?? ''
  };
}

function withPostDefaults(post: JournalPost): JournalPost {
  const body = post.body ?? post.excerpt;
  const images = normalizeGallery(post.image, post.images);
  return {
    ...post,
    image: images[0] ?? '',
    images,
    seoTitle: post.seoTitle ?? '',
    seoDescription: post.seoDescription ?? '',
    imageAlt: post.imageAlt ?? '',
    slug: post.slug || post.id,
    body,
    status: post.status ?? 'published',
    updatedAt: post.updatedAt ?? nowIso(),
    readingMinutes: post.readingMinutes || readingMinutesFromText(`${post.excerpt} ${body}`)
  };
}

function withClassDefaults(item: ClassOffering): ClassOffering {
  return {
    ...item,
    slug: item.slug || item.id,
    seoTitle: item.seoTitle ?? '',
    seoDescription: item.seoDescription ?? '',
    image: item.image ?? '',
    alt: item.alt ?? '',
    status: item.status ?? 'published',
    sortOrder: item.sortOrder ?? 0,
    updatedAt: item.updatedAt ?? nowIso()
  };
}

function withTreatmentDefaults(item: Therapy): Therapy {
  const images = normalizeGallery(item.image, item.images);
  return {
    ...item,
    slug: item.slug || item.id,
    seoTitle: item.seoTitle ?? '',
    seoDescription: item.seoDescription ?? '',
    image: images[0] ?? '',
    images,
    alt: item.alt ?? '',
    doshas: item.doshas ?? [],
    status: item.status ?? 'published',
    sortOrder: item.sortOrder ?? 0,
    updatedAt: item.updatedAt ?? nowIso()
  };
}

function prepareTimetable(item: TimetableClass): TimetableClass {
  const slots = Array.from(new Set([item.time, ...item.slots].map((slot) => slot.trim()).filter(Boolean)));
  return {
    ...item,
    name: item.name.trim() || 'Untitled class',
    weekday: item.weekday,
    time: (item.time.trim() || slots[0] || ''),
    slots: slots.length ? slots : item.time.trim() ? [item.time.trim()] : [],
    instructor: item.instructor.trim(),
    duration: item.duration.trim(),
    price: item.price.trim(),
    description: item.description.trim(),
    emphasis: item.emphasis.trim(),
    bookAhead: Boolean(item.bookAhead),
    sortOrder: Number.isFinite(item.sortOrder) ? item.sortOrder : 0,
    status: item.status ?? 'draft',
    updatedAt: nowIso()
  };
}

export interface StoredContent {
  packages: Program[];
  posts: JournalPost[];
  classes: ClassOffering[];
  treatments: Therapy[];
  timetable: TimetableClass[];
}

function emptyContent(): StoredContent {
  return { packages: [], posts: [], classes: [], treatments: [], timetable: [] };
}

function preparePackage(program: Program): Program {
  const images = normalizeGallery(program.image, program.images);
  return {
    ...program,
    title: program.title.trim() || 'Untitled package',
    slug: slugFromTitle(program.slug || program.title) || program.id,
    seoTitle: program.seoTitle?.trim() ?? '',
    seoDescription: program.seoDescription?.trim() ?? '',
    imageAlt: program.imageAlt?.trim() || program.title.trim(),
    image: images[0] ?? '',
    images,
    durationDays: program.openDates ? Math.max(1, program.durationDays) : durationDaysFromRange(program.startDate, program.endDate),
    spotsLeft: Math.min(program.spotsLeft, program.capacity),
    status: program.status ?? 'draft',
    updatedAt: nowIso()
  };
}

function preparePost(post: JournalPost): JournalPost {
  const body = (post.body ?? '').trim();
  const images = normalizeGallery(post.image, post.images);
  return {
    ...post,
    title: post.title.trim() || 'Untitled note',
    slug: slugFromTitle(post.slug || post.title) || post.id,
    excerpt: post.excerpt.trim() || body.slice(0, 140),
    body,
    image: images[0] ?? '',
    images,
    seoTitle: post.seoTitle?.trim() ?? '',
    seoDescription: post.seoDescription?.trim() ?? '',
    imageAlt: post.imageAlt?.trim() || post.title.trim(),
    readingMinutes: readingMinutesFromText(body || post.excerpt),
    status: post.status ?? 'draft',
    updatedAt: nowIso()
  };
}

function prepareClass(item: ClassOffering): ClassOffering {
  return {
    ...item,
    name: item.name.trim() || 'Untitled class',
    slug: slugFromTitle(item.slug || item.name) || item.id,
    seoTitle: item.seoTitle?.trim() ?? '',
    seoDescription: item.seoDescription?.trim() ?? '',
    time: item.time.trim(),
    duration: item.duration.trim(),
    level: item.level.trim(),
    image: item.image?.trim() ?? '',
    alt: item.alt.trim() || item.name.trim(),
    description: item.description.trim(),
    sortOrder: Number.isFinite(item.sortOrder) ? item.sortOrder : 0,
    status: item.status ?? 'draft',
    updatedAt: nowIso()
  };
}

function prepareTreatment(item: Therapy): Therapy {
  const images = normalizeGallery(item.image, item.images);
  return {
    ...item,
    name: item.name.trim() || 'Untitled treatment',
    slug: slugFromTitle(item.slug || item.name) || item.id,
    seoTitle: item.seoTitle?.trim() ?? '',
    seoDescription: item.seoDescription?.trim() ?? '',
    duration: item.duration.trim(),
    description: item.description.trim(),
    image: images[0] ?? '',
    images,
    alt: item.alt?.trim() || item.name.trim(),
    doshas: item.doshas.length ? item.doshas : ['vata'],
    sortOrder: Number.isFinite(item.sortOrder) ? item.sortOrder ?? 0 : 0,
    status: item.status ?? 'draft',
    updatedAt: nowIso()
  };
}

interface ContentContextValue {
  ready: boolean;
  error: string | null;
  packages: Program[];
  posts: JournalPost[];
  classes: ClassOffering[];
  treatments: Therapy[];
  timetable: TimetableClass[];
  publishedPackages: Program[];
  publishedPosts: JournalPost[];
  publishedClasses: ClassOffering[];
  publishedTreatments: Therapy[];
  publishedTimetable: TimetableClass[];
  savePackage: (program: Program) => Promise<Program>;
  deletePackage: (id: string) => Promise<void>;
  duplicatePackage: (id: string) => Promise<Program | null>;
  patchPackage: (id: string, patch: Partial<Program>) => Promise<void>;
  savePost: (post: JournalPost) => Promise<JournalPost>;
  deletePost: (id: string) => Promise<void>;
  saveClass: (item: ClassOffering) => Promise<ClassOffering>;
  deleteClass: (id: string) => Promise<void>;
  saveTreatment: (item: Therapy) => Promise<Therapy>;
  deleteTreatment: (id: string) => Promise<void>;
  saveTimetable: (item: TimetableClass) => Promise<TimetableClass>;
  deleteTimetable: (id: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children, initialContent }: {children: ReactNode;initialContent?: StoredContent;}) {
  const { email, ready: authReady } = useAuth();
  const configured = isSupabaseConfigured() && Boolean(supabase);
  const [content, setContent] = useState<StoredContent>(initialContent ?? emptyContent);
  const [ready, setReady] = useState(Boolean(initialContent) || !configured);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!configured || !supabase) {
      setContent(emptyContent());
      setReady(true);
      return;
    }

    const [packageResult, postResult, classResult, treatmentResult, timetableResult] = await Promise.all([
      supabase.from('packages').select('*').order('start_date', { ascending: true }),
      supabase.from('posts').select('*').order('date', { ascending: false }),
      supabase.from('classes').select('*').order('sort_order', { ascending: true }),
      supabase.from('treatments').select('*').order('sort_order', { ascending: true }),
      supabase.from('timetable').select('*').order('sort_order', { ascending: true })
    ]);

    if (packageResult.error) throw packageResult.error;
    if (postResult.error) throw postResult.error;
    if (classResult.error) throw classResult.error;
    if (treatmentResult.error) throw treatmentResult.error;
    if (timetableResult.error) throw timetableResult.error;

    setContent({
      packages: ((packageResult.data ?? []) as PackageRow[]).map((row) => withPackageDefaults(packageFromRow(row))),
      posts: ((postResult.data ?? []) as PostRow[]).map((row) => withPostDefaults(postFromRow(row))),
      classes: ((classResult.data ?? []) as ClassRow[]).map((row) => withClassDefaults(classFromRow(row))),
      treatments: ((treatmentResult.data ?? []) as TreatmentRow[]).map((row) => withTreatmentDefaults(treatmentFromRow(row))),
      timetable: ((timetableResult.data ?? []) as TimetableRow[]).map((row) => timetableFromRow(row))
    });
    setError(null);
    setReady(true);
  }, [configured]);

  useEffect(() => {
    if (!authReady) return;
    let active = true;
    void load().catch((caught: unknown) => {
      if (!active) return;
      setError(caught instanceof Error ? caught.message : 'Could not load content.');
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, [authReady, email, load]);

  const value = useMemo<ContentContextValue>(() => {
    const publishedPackages = content.packages.
      filter((program) => (program.status ?? 'published') === 'published').
      slice().
      sort(comparePrograms);

    const publishedPosts = content.posts.
      filter((post) => (post.status ?? 'published') === 'published').
      slice().
      sort((a, b) => b.date.localeCompare(a.date));

    const publishedClasses = content.classes.
      filter((item) => (item.status ?? 'published') === 'published').
      slice().
      sort((a, b) => a.sortOrder - b.sortOrder || a.time.localeCompare(b.time));

    const publishedTreatments = content.treatments.
      filter((item) => (item.status ?? 'published') === 'published').
      slice().
      sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name.localeCompare(b.name));

    const publishedTimetable = content.timetable.
      filter((item) => (item.status ?? 'published') === 'published').
      slice().
      sort((a, b) => weekDays.indexOf(a.weekday) - weekDays.indexOf(b.weekday) || timeSortKey(a.time) - timeSortKey(b.time) || a.sortOrder - b.sortOrder);

    return {
      ready,
      error,
      packages: content.packages,
      posts: content.posts,
      classes: content.classes,
      treatments: content.treatments,
      timetable: content.timetable,
      publishedPackages,
      publishedPosts,
      publishedClasses,
      publishedTreatments,
      publishedTimetable,
      async savePackage(program) {
        const nextProgram = preparePackage(program);
        nextProgram.slug = uniqueSlug(nextProgram.slug || nextProgram.id, nextProgram.id, content.packages);
        if (!supabase) throw new Error('The database is not connected yet.');
        const { error: saveError } = await supabase.from('packages').upsert(packageToRow(nextProgram));
        if (saveError) throw saveError;
        await load();
        return nextProgram;
      },
      async deletePackage(id) {
        if (!supabase) throw new Error('The database is not connected yet.');
        const { error: deleteError } = await supabase.from('packages').delete().eq('id', id);
        if (deleteError) throw deleteError;
        await load();
      },
      async duplicatePackage(id) {
        const source = content.packages.find((item) => item.id === id);
        if (!source) return null;
        const copy = preparePackage({
          ...source,
          id: newId('pkg'),
          title: `${source.title} (copy)`,
          status: 'draft'
        });
        copy.slug = uniqueSlug(slugFromTitle(copy.title) || copy.id, copy.id, content.packages);
        if (!supabase) throw new Error('The database is not connected yet.');
        const { error: saveError } = await supabase.from('packages').insert(packageToRow(copy));
        if (saveError) throw saveError;
        await load();
        return copy;
      },
      async patchPackage(id, patch) {
        const source = content.packages.find((item) => item.id === id);
        if (!source) return;
        const nextProgram = preparePackage({ ...source, ...patch });
        if (!supabase) throw new Error('The database is not connected yet.');
        const { error: saveError } = await supabase.from('packages').upsert(packageToRow(nextProgram));
        if (saveError) throw saveError;
        await load();
      },
      async savePost(post) {
        const nextPost = preparePost(post);
        nextPost.slug = uniqueSlug(nextPost.slug || nextPost.id, nextPost.id, content.posts);
        if (!supabase) throw new Error('The database is not connected yet.');
        const { error: saveError } = await supabase.from('posts').upsert(postToRow(nextPost));
        if (saveError) throw saveError;
        await load();
        return nextPost;
      },
      async deletePost(id) {
        if (!supabase) throw new Error('The database is not connected yet.');
        const { error: deleteError } = await supabase.from('posts').delete().eq('id', id);
        if (deleteError) throw deleteError;
        await load();
      },
      async saveClass(item) {
        const next = prepareClass(item);
        next.slug = uniqueSlug(next.slug || next.id, next.id, content.classes);
        if (!supabase) throw new Error('The database is not connected yet.');
        const { error: saveError } = await supabase.from('classes').upsert(classToRow(next));
        if (saveError) throw saveError;
        await load();
        return next;
      },
      async deleteClass(id) {
        if (!supabase) throw new Error('The database is not connected yet.');
        const { error: deleteError } = await supabase.from('classes').delete().eq('id', id);
        if (deleteError) throw deleteError;
        await load();
      },
      async saveTreatment(item) {
        const next = prepareTreatment(item);
        next.slug = uniqueSlug(next.slug || next.id, next.id, content.treatments);
        if (!supabase) throw new Error('The database is not connected yet.');
        const { error: saveError } = await supabase.from('treatments').upsert(treatmentToRow(next));
        if (saveError) throw saveError;
        await load();
        return next;
      },
      async deleteTreatment(id) {
        if (!supabase) throw new Error('The database is not connected yet.');
        const { error: deleteError } = await supabase.from('treatments').delete().eq('id', id);
        if (deleteError) throw deleteError;
        await load();
      },
      async saveTimetable(item) {
        const next = prepareTimetable(item);
        if (!supabase) throw new Error('The database is not connected yet.');
        const { error: saveError } = await supabase.from('timetable').upsert(timetableToRow(next));
        if (saveError) throw saveError;
        await load();
        return next;
      },
      async deleteTimetable(id) {
        if (!supabase) throw new Error('The database is not connected yet.');
        const { error: deleteError } = await supabase.from('timetable').delete().eq('id', id);
        if (deleteError) throw deleteError;
        await load();
      }
    };
  }, [content, error, load, ready]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentContextValue {
  const value = useContext(ContentContext);
  if (!value) {
    throw new Error('useContent must be used inside ContentProvider');
  }
  return value;
}

export function statusOf(item: {status?: PublishStatus;}): PublishStatus {
  return item.status ?? 'published';
}
