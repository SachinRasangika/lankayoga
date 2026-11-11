import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useContent } from '../../admin/content';
import { getSeoMetadata, getStructuredData } from '../../lib/seo';

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.dataset.seo = 'route';
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value));
}

export function Seo() {
  const { pathname } = useLocation();
  const { packages, posts, classes, treatments } = useContent();
  const content = useMemo(
    () => ({ packages, posts, classes, treatments }),
    [classes, packages, posts, treatments]
  );
  const metadata = useMemo(() => getSeoMetadata(pathname, content), [content, pathname]);
  const structuredData = useMemo(() => getStructuredData(pathname, content), [content, pathname]);

  useEffect(() => {
    document.title = metadata.title;

    upsertMeta('meta[name="description"]', { name: 'description', content: metadata.description });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: metadata.noindex ? 'noindex, nofollow' : 'index, follow'
    });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: metadata.type });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: metadata.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metadata.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: metadata.canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: metadata.image });
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: metadata.imageAlt });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: metadata.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: metadata.description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: metadata.image });

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.dataset.seo = 'route';
      document.head.appendChild(canonical);
    }
    canonical.href = metadata.canonical;

    const schemaId = 'lankayoga-page-schema';
    document.getElementById(schemaId)?.remove();
    if (structuredData.length) {
      const schema = document.createElement('script');
      schema.id = schemaId;
      schema.type = 'application/ld+json';
      schema.text = JSON.stringify(structuredData);
      document.head.appendChild(schema);
    }
  }, [metadata, structuredData]);

  return null;
}
