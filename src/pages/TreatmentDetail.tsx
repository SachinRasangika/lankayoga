import { Link, useParams } from 'react-router-dom';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { ButtonLink } from '../components/ui/Button';
import { media } from '../data/media';
import { coverOf, normalizeGallery } from '../utils/gallery';
import { treatmentPath } from '../utils/stays';
import { useContent } from '../admin/content';

export function TreatmentDetail() {
  const { slug } = useParams();
  const { ready, publishedTreatments } = useContent();
  const item = publishedTreatments.find((entry) => entry.slug === slug || entry.id === slug);

  if (!ready) {
    return <p className="px-5 py-32 text-center text-sm text-muted">Loading…</p>;
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl font-light">That treatment is not live</h1>
        <Link to="/treatments" className="mt-6 inline-block text-sm text-muted underline">Back to treatments</Link>
      </div>
    );
  }

  const photos = normalizeGallery(item.image, item.images);
  const cover = photos[0] || media.therapyRoom;
  const extras = photos.slice(1);
  const related = publishedTreatments.
    filter((entry) => entry.id !== item.id).
    sort((a, b) => {
      const aShared = a.doshas.some((dosha) => item.doshas.includes(dosha)) ? -1 : 0;
      const bShared = b.doshas.some((dosha) => item.doshas.includes(dosha)) ? -1 : 0;
      return aShared - bShared;
    }).
    slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title={item.name}
        lede={item.description}
        image={cover}
        imageAlt={item.alt || ''}
        meta={[
          { label: 'Length', value: item.duration },
          { label: 'Doshas', value: item.doshas.join(' · ') }
        ]} />

      <Section tone="base">
        <div className="mx-auto max-w-3xl">
          <Link to="/treatments" className="text-sm text-muted underline underline-offset-4 hover:text-ink">
            All treatments
          </Link>
          <p className="mt-10 text-sm text-muted">
            The physician decides if this is part of your protocol. A private hour can be arranged if you are not on a healing programme.
          </p>
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
          <SectionIntro eyebrow="The wing" title="Other treatments" />
          <ul className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) => {
              const thumb = coverOf(entry.image, entry.images);
              return (
                <li key={entry.id}>
                  <Link to={treatmentPath(entry)} className="group flex flex-col gap-2 border-t border-line pt-5">
                    {thumb ?
                      <img src={thumb} alt="" className="aspect-[4/3] w-full rounded-[1.25rem] object-cover" /> :
                      null}
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl font-light tracking-tight text-ink group-hover:text-terracotta-700 dark:group-hover:text-terracotta-200">
                        {entry.name}
                      </h3>
                      <span className="text-xs text-muted">{entry.duration}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{entry.description}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section> :
        null}

      <Section tone="raised">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">A full protocol</p>
            <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-ink sm:text-[2.5rem]">
              Panchakarma is a stay, not a single treatment
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/ayurveda">Ayurveda dates</ButtonLink>
            <ButtonLink to={`/contact?topic=${encodeURIComponent(item.name)}`} variant="secondary">Ask for a treatment</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
