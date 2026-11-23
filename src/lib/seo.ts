import type { ClassOffering, JournalPost, Program, Therapy } from '../types';
import { business } from '../data/business';
import { classPath, stayPath, treatmentPath } from '../utils/stays';

export const siteUrl = business.url.replace(/\/$/, '');
export const siteName = 'Lanka Yoga Ayurveda';
const defaultImage = business.image;

export interface SeoContent {
  packages: Program[];
  posts: JournalPost[];
  classes: ClassOffering[];
  treatments: Therapy[];
}

export interface SeoMetadata {
  title: string;
  description: string;
  canonical: string;
  image: string;
  imageAlt: string;
  type: 'website' | 'article';
  noindex: boolean;
}

const pages: Record<string, Pick<SeoMetadata, 'title' | 'description'>> = {
  '/': {
    title: 'Yoga & Ayurveda Retreats in Hikkaduwa, Sri Lanka | Lanka Yoga Ayurveda',
    description: 'Stay by the lake in Hikkaduwa for yoga retreats, daily classes and Ayurveda experiences near Sri Lanka’s southern coast.'
  },
  '/yoga': {
    title: 'Yoga Retreats in Hikkaduwa, Sri Lanka | Lanka Yoga Ayurveda',
    description: 'Explore upcoming yoga retreats and training stays at Lanka Yoga & Ayurveda Resort in Hikkaduwa, Sri Lanka.'
  },
  '/ayurveda': {
    title: 'Ayurveda Retreats in Hikkaduwa, Sri Lanka | Lanka Yoga Ayurveda',
    description: 'Explore Ayurveda and integrated wellness stays at Lanka Yoga & Ayurveda Resort in Hikkaduwa, Sri Lanka.'
  },
  '/classes': {
    title: 'Yoga Classes in Hikkaduwa, Sri Lanka | Lanka Yoga Ayurveda',
    description: 'View the current weekly yoga class timetable, teachers, class lengths and booking options in Hikkaduwa.'
  },
  '/treatments': {
    title: 'Ayurveda Treatments in Hikkaduwa, Sri Lanka | Lanka Yoga Ayurveda',
    description: 'Discover Ayurveda treatments available at Lanka Yoga & Ayurveda Resort in Hikkaduwa, with guidance from the wellness team.'
  },
  '/journal': {
    title: 'Yoga & Ayurveda Journal | Lanka Yoga Ayurveda',
    description: 'Practical notes about yoga, Ayurveda, retreats and mindful travel in Hikkaduwa, Sri Lanka.'
  },
  '/contact': {
    title: 'Contact Lanka Yoga & Ayurveda Resort in Hikkaduwa',
    description: 'Contact Lanka Yoga & Ayurveda Resort for retreat, class, treatment and accommodation enquiries in Hikkaduwa, Sri Lanka.'
  }
};

function cleanPath(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
}

function absoluteImage(image?: string): string {
  if (!image) return defaultImage;
  if (/^https?:\/\//i.test(image)) return image;
  return `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`;
}

function result(
  path: string,
  values: Pick<SeoMetadata, 'title' | 'description'> & Partial<SeoMetadata>
): SeoMetadata {
  return {
    title: values.title,
    description: values.description,
    canonical: values.canonical ?? `${siteUrl}${path === '/' ? '/' : path}`,
    image: absoluteImage(values.image),
    imageAlt: values.imageAlt ?? '',
    type: values.type ?? 'website',
    noindex: values.noindex ?? false
  };
}

export function getSeoMetadata(pathname: string, content: SeoContent): SeoMetadata {
  const path = cleanPath(pathname);
  if (pages[path]) return result(path, pages[path]);

  if (path.startsWith('/admin') || path.startsWith('/classes/book/')) {
    return result(path, {
      title: `Private page | ${siteName}`,
      description: '',
      noindex: true
    });
  }

  const stayMatch = path.match(/^\/(yoga|ayurveda)\/([^/]+)$/);
  if (stayMatch) {
    const program = content.packages.find((item) =>
      (item.status ?? 'published') === 'published' &&
      (item.slug === stayMatch[2] || item.id === stayMatch[2])
    );
    if (program) {
      return result(stayPath(program), {
        title: program.seoTitle || `${program.title} in Hikkaduwa, Sri Lanka | ${siteName}`,
        description: program.seoDescription || program.summary,
        image: program.image,
        imageAlt: program.imageAlt || program.title
      });
    }
  }

  const classMatch = path.match(/^\/classes\/([^/]+)$/);
  if (classMatch) {
    const item = content.classes.find((entry) =>
      (entry.status ?? 'published') === 'published' &&
      (entry.slug === classMatch[1] || entry.id === classMatch[1])
    );
    if (item) {
      return result(classPath(item), {
        title: item.seoTitle || `${item.name} Yoga Class in Hikkaduwa | ${siteName}`,
        description: item.seoDescription || item.description,
        image: item.image,
        imageAlt: item.alt || item.name
      });
    }
  }

  const treatmentMatch = path.match(/^\/treatments\/([^/]+)$/);
  if (treatmentMatch) {
    const item = content.treatments.find((entry) =>
      (entry.status ?? 'published') === 'published' &&
      (entry.slug === treatmentMatch[1] || entry.id === treatmentMatch[1])
    );
    if (item) {
      return result(treatmentPath(item), {
        title: item.seoTitle || `${item.name} in Hikkaduwa, Sri Lanka | ${siteName}`,
        description: item.seoDescription || item.description,
        image: item.image,
        imageAlt: item.alt || item.name
      });
    }
  }

  const articleMatch = path.match(/^\/journal\/([^/]+)$/);
  if (articleMatch) {
    const post = content.posts.find((item) =>
      (item.status ?? 'published') === 'published' &&
      (item.slug === articleMatch[1] || item.id === articleMatch[1])
    );
    if (post) {
      const slug = post.slug || post.id;
      return result(`/journal/${slug}`, {
        title: post.seoTitle || `${post.title} | ${siteName}`,
        description: post.seoDescription || post.excerpt,
        image: post.image,
        imageAlt: post.imageAlt || post.title,
        type: 'article'
      });
    }
  }

  return result(path, {
    title: `Page not found | ${siteName}`,
    description: '',
    noindex: true
  });
}

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

const sectionNames: Record<string, string> = {
  '/yoga': 'Yoga',
  '/ayurveda': 'Ayurveda',
  '/classes': 'Classes',
  '/treatments': 'Treatments',
  '/journal': 'Journal',
  '/contact': 'Contact'
};

function published<T extends { status?: string }>(items: T[]): T[] {
  return items.filter((item) => (item.status ?? 'published') === 'published');
}

function absolute(path: string): string {
  return `${siteUrl}${path === '/' ? '/' : path}`;
}

function lastmod(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}

function isDatedStay(program: Program): boolean {
  return !program.openDates && /^\d{4}-\d{2}-\d{2}$/.test(program.startDate) && /^\d{4}-\d{2}-\d{2}$/.test(program.endDate);
}

function crumb(name: string, path: string, position: number) {
  return {
    '@type': 'ListItem',
    position,
    name,
    item: absolute(path)
  };
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [crumb('Home', '/', 1), ...items.map((item, index) => crumb(item.name, item.path, index + 2))]
  };
}

const place = {
  '@type': 'Place',
  name: business.name,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.streetAddress,
    addressLocality: business.addressLocality,
    addressRegion: business.addressRegion,
    postalCode: business.postalCode,
    addressCountry: business.addressCountry
  }
};

export function getSitemapEntries(content: SeoContent): SitemapEntry[] {
  const entries: SitemapEntry[] = Object.keys(pages).map((path) => ({ loc: absolute(path) }));
  published(content.packages).forEach((item) => {
    entries.push({ loc: absolute(stayPath(item)), lastmod: lastmod(item.updatedAt) });
  });
  published(content.classes).forEach((item) => {
    entries.push({ loc: absolute(classPath(item)), lastmod: lastmod(item.updatedAt) });
  });
  published(content.treatments).forEach((item) => {
    entries.push({ loc: absolute(treatmentPath(item)), lastmod: lastmod(item.updatedAt) });
  });
  published(content.posts).forEach((item) => {
    entries.push({ loc: absolute(`/journal/${item.slug || item.id}`), lastmod: lastmod(item.updatedAt || item.date) });
  });
  return entries;
}

export function getStructuredData(pathname: string, content: SeoContent): object[] {
  const path = cleanPath(pathname);
  const section = sectionNames[path];
  if (section) return [breadcrumbs([{ name: section, path }])];

  const stayMatch = path.match(/^\/(yoga|ayurveda)\/([^/]+)$/);
  if (stayMatch) {
    const program = published(content.packages).find((item) => item.slug === stayMatch[2] || item.id === stayMatch[2]);
    if (!program) return [];
    const sectionPath = stayPath(program).startsWith('/ayurveda') ? '/ayurveda' : '/yoga';
    const data: object[] = [breadcrumbs([
      { name: sectionNames[sectionPath], path: sectionPath },
      { name: program.title, path: stayPath(program) }
    ])];
    if (isDatedStay(program)) {
      data.push({
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: program.title,
        description: program.summary,
        startDate: program.startDate,
        endDate: program.endDate,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        image: absoluteImage(program.image),
        location: place,
        organizer: { '@id': `${business.url}#business` },
        ...(program.priceUsd > 0 ? {
          offers: {
            '@type': 'Offer',
            price: program.priceUsd,
            priceCurrency: 'USD',
            availability: program.spotsLeft > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
            url: absolute(stayPath(program))
          }
        } : {})
      });
    }
    return data;
  }

  const classMatch = path.match(/^\/classes\/([^/]+)$/);
  if (classMatch && classMatch[1] !== 'book') {
    const item = published(content.classes).find((entry) => entry.slug === classMatch[1] || entry.id === classMatch[1]);
    if (!item) return [];
    return [breadcrumbs([
      { name: 'Classes', path: '/classes' },
      { name: item.name, path: classPath(item) }
    ])];
  }

  const treatmentMatch = path.match(/^\/treatments\/([^/]+)$/);
  if (treatmentMatch) {
    const item = published(content.treatments).find((entry) => entry.slug === treatmentMatch[1] || entry.id === treatmentMatch[1]);
    if (!item) return [];
    return [breadcrumbs([
      { name: 'Treatments', path: '/treatments' },
      { name: item.name, path: treatmentPath(item) }
    ])];
  }

  const articleMatch = path.match(/^\/journal\/([^/]+)$/);
  if (articleMatch) {
    const post = published(content.posts).find((item) => item.slug === articleMatch[1] || item.id === articleMatch[1]);
    if (!post) return [];
    const articlePath = `/journal/${post.slug || post.id}`;
    return [
      breadcrumbs([
        { name: 'Journal', path: '/journal' },
        { name: post.title, path: articlePath }
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: absoluteImage(post.image),
        datePublished: post.date,
        dateModified: lastmod(post.updatedAt) || post.date,
        author: { '@type': 'Person', name: post.author },
        publisher: { '@id': `${business.url}#business` },
        mainEntityOfPage: absolute(articlePath)
      }
    ];
  }

  return [];
}
