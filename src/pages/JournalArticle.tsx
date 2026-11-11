import { Link, useParams } from 'react-router-dom';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { JournalCard } from '../components/journal/JournalCard';
import { ButtonLink } from '../components/ui/Button';
import { media } from '../data/media';
import { formatPostDate } from '../utils/format';
import { normalizeGallery } from '../utils/gallery';
import { useContent } from '../admin/content';

function paragraphsFrom(text: string): string[] {
  return text.
    split(/\n{2,}/).
    map((part) => part.trim()).
    filter(Boolean);
}

export function JournalArticle() {
  const { slug } = useParams();
  const { ready, publishedPosts } = useContent();
  const post = publishedPosts.find((item) => item.slug === slug || item.id === slug);

  if (!ready) {
    return <p className="px-5 py-32 text-center text-sm text-muted">Loading…</p>;
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl font-light">That note is not live</h1>
        <Link to="/journal" className="mt-6 inline-block text-sm text-muted underline">Back to the journal</Link>
      </div>
    );
  }

  const photos = normalizeGallery(post.image, post.images);
  const cover = photos[0] || media.stoneCarving;
  const extras = photos.slice(1);
  const body = paragraphsFrom(post.body || post.excerpt);
  const related = publishedPosts.
    filter((item) => item.id !== post.id).
    sort((a, b) => (a.category === post.category ? -1 : 0) - (b.category === post.category ? -1 : 0)).
    slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        lede={post.excerpt}
        image={cover}
        imageAlt={post.imageAlt || post.title}
        meta={[
          { label: 'Author', value: post.author },
          { label: 'Date', value: formatPostDate(post.date) },
          { label: 'Read', value: `${post.readingMinutes} min` }
        ]} />

      <Section tone="base">
        <div className="mx-auto max-w-3xl">
          <Link to="/journal" className="text-sm text-muted underline underline-offset-4 hover:text-ink">
            All notes
          </Link>
          <div className="mt-10 max-w-prose space-y-5 text-[1.05rem] leading-relaxed text-ink">
            {body.map((paragraph) =>
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            )}
          </div>
          {extras.length ?
            <ul className="mt-14 grid gap-3 sm:grid-cols-2">
              {extras.map((src) =>
                <li key={src}>
                  <img src={src} alt="" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
                </li>
              )}
            </ul> :
            null}
        </div>
      </Section>

      {related.length ?
        <Section tone="warm">
          <SectionIntro eyebrow="More from the campus" title="Other notes" />
          <ul className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
            {related.map((item) =>
              <li key={item.id} className="flex">
                <JournalCard post={item} />
              </li>
            )}
          </ul>
        </Section> :
        null}

      <Section tone="raised">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">Stay</p>
            <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-ink sm:text-[2.5rem]">
              Come and see the lake for yourself
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/yoga">Yoga dates</ButtonLink>
            <ButtonLink to="/contact" variant="secondary">Write to us</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
