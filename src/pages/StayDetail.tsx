import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { CheckIcon, FileTextIcon } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { ProgramCard } from '../components/programs/ProgramCard';
import { BookingWidget } from '../components/programs/BookingWidget';
import { ButtonLink } from '../components/ui/Button';
import { useContent } from '../admin/content';
import { media } from '../data/media';
import { formatPrice, formatStayDates } from '../utils/format';
import { normalizeGallery } from '../utils/gallery';
import { durationLabel, focusLabels, kindLabels } from '../utils/labels';
import { isAyurvedaStay, isYogaStay, stayListPath, stayPath } from '../utils/stays';

export function StayDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const { ready, publishedPackages } = useContent();
  const program = publishedPackages.find((item) => item.slug === slug || item.id === slug);
  const onYoga = location.pathname.startsWith('/yoga/');

  if (!ready) {
    return <p className="px-5 py-32 text-center text-sm text-muted">Loading…</p>;
  }

  if (!program) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl font-light">That stay is not live</h1>
        <Link to={onYoga ? '/yoga' : '/ayurveda'} className="mt-6 inline-block text-sm text-muted underline">
          Back to dates
        </Link>
      </div>
    );
  }

  const allowed = onYoga ? isYogaStay(program) : isAyurvedaStay(program);
  if (!allowed) {
    return <Navigate to={stayPath(program)} replace />;
  }

  const photos = normalizeGallery(program.image, program.images);
  const cover = photos[0] || media.mistHills;
  const extras = photos.slice(1);
  const listPath = onYoga ? '/yoga' : '/ayurveda';
  const related = publishedPackages.
    filter((item) => item.id !== program.id).
    filter((item) => (onYoga ? isYogaStay(item) : isAyurvedaStay(item))).
    slice(0, 3);
  const highlights = program.highlights ?? [];
  const specials = program.specials ?? [];
  const itinerary = program.itinerary ?? [];
  const addons = program.addons ?? [];
  const extraActivities = program.extraActivities ?? [];
  const bodyParagraphs = (program.body ?? '').split(/\n\n+/).map((part) => part.trim()).filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={`${kindLabels[program.kind]} · ${focusLabels[program.focus]}`}
        title={program.title}
        lede={program.kind === 'training' ? program.subtitle || '' : program.subtitle || program.summary}
        image={cover}
        imageAlt={program.imageAlt || program.title}
        meta={[
          { label: 'Dates', value: formatStayDates(program) },
          { label: 'Length', value: durationLabel(program.durationDays) },
          { label: 'From', value: formatPrice(program.priceUsd) },
          program.openDates ?
            { label: 'Place', value: 'Hikkaduwa' } :
            { label: 'Places', value: `${program.spotsLeft} left` }
        ]} />

      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link to={listPath} className="text-sm text-muted underline underline-offset-4 hover:text-ink">
                All dates
              </Link>
              {program.pdfUrl ?
                <a href={program.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted underline underline-offset-4 hover:text-ink">
                  <FileTextIcon className="h-3.5 w-3.5" />
                  PDF itinerary
                </a> :
                null}
            </div>

            <p className="mt-10 text-sm text-muted">
              <span className="text-ink">Level:</span> {program.level}
              {program.certification ? ` · ${program.certification}` : ''}
            </p>

            {bodyParagraphs.length ?
              <div className="mt-10 flex flex-col gap-5">
                {bodyParagraphs.map((paragraph) =>
                  <p key={paragraph.slice(0, 48)} className="text-[1.05rem] leading-relaxed text-ink">{paragraph}</p>
                )}
              </div> :
              <p className="mt-10 text-[1.05rem] leading-relaxed text-ink">{program.summary}</p>}

            {highlights.length ?
              <section className="mt-14">
                <h2 className="eyebrow text-terracotta-600 dark:text-terracotta-300">Summary of this retreat</h2>
                <ul className="mt-6 flex flex-col gap-3">
                  {highlights.map((item) =>
                    <li key={item} className="flex items-start gap-2.5 text-[1.05rem] leading-relaxed text-ink">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-sage-500" />
                      {item}
                    </li>
                  )}
                </ul>
              </section> :
              null}

            {specials.length ?
              <section className="mt-14">
                <h2 className="eyebrow text-terracotta-600 dark:text-terracotta-300">What makes this retreat special</h2>
                <dl className="mt-8 flex flex-col gap-8">
                  {specials.map((item) =>
                    <div key={item.title} className="border-t border-line pt-5">
                      <dt className="font-display text-2xl font-light tracking-tight text-ink">{item.title}</dt>
                      <dd className="mt-3 text-[1.05rem] leading-relaxed text-muted">{item.text}</dd>
                    </div>
                  )}
                </dl>
              </section> :
              null}

            {itinerary.length ?
              <section className="mt-14">
                <h2 className="eyebrow text-terracotta-600 dark:text-terracotta-300">Itinerary</h2>
                <ol className="mt-8 flex flex-col gap-10">
                  {itinerary.map((block) =>
                    <li key={`${block.period}-${block.title}`}>
                      <p className="text-[0.6875rem] uppercase tracking-widest text-muted">{block.period}</p>
                      <h3 className="mt-1 font-display text-2xl font-light tracking-tight text-ink">{block.title}</h3>
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {block.items.map((item) =>
                          <li key={item} className="flex items-start gap-2.5 text-[1.05rem] leading-relaxed text-ink">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-400" />
                            {item}
                          </li>
                        )}
                      </ul>
                    </li>
                  )}
                </ol>
              </section> :
              null}

            {program.rhythm.length ?
              <section className="mt-14">
                <h2 className="eyebrow text-terracotta-600 dark:text-terracotta-300">
                  {itinerary.length ? 'Hikkaduwa days — a gentle rhythm' : 'A day here'}
                </h2>
                <ol className="mt-6 border-l border-line">
                  {program.rhythm.map((entry) =>
                    <li key={`${entry.time}-${entry.activity}`} className="relative flex gap-4 pb-5 pl-5 last:pb-0">
                      <span className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full bg-sage-400" />
                      <span className="w-14 shrink-0 font-display text-base text-ink">{entry.time}</span>
                      <span className="text-[1.05rem] leading-relaxed text-ink">{entry.activity}</span>
                    </li>
                  )}
                </ol>
              </section> :
              null}

            {extraActivities.length ?
              <section className="mt-14">
                <h2 className="eyebrow text-terracotta-600 dark:text-terracotta-300">Also included in the Hikkaduwa days</h2>
                <ul className="mt-6 flex flex-col gap-3">
                  {extraActivities.map((item) =>
                    <li key={item} className="flex items-start gap-2.5 text-[1.05rem] leading-relaxed text-ink">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-sage-500" />
                      {item}
                    </li>
                  )}
                </ul>
              </section> :
              null}

            {program.includes.length ?
              <section className="mt-14">
                <h2 className="eyebrow text-terracotta-600 dark:text-terracotta-300">Included</h2>
                <ul className="mt-6 flex flex-col gap-3">
                  {program.includes.map((item) =>
                    <li key={item} className="flex items-start gap-2.5 text-[1.05rem] leading-relaxed text-ink">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-sage-500" />
                      {item}
                    </li>
                  )}
                </ul>
              </section> :
              null}

            {addons.length ?
              <section className="mt-14">
                <h2 className="eyebrow text-terracotta-600 dark:text-terracotta-300">Add on to the retreat</h2>
                <ul className="mt-6 flex flex-col gap-3">
                  {addons.map((item) =>
                    <li key={item} className="flex items-start gap-2.5 text-[1.05rem] leading-relaxed text-ink">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-sage-500" />
                      {item}
                    </li>
                  )}
                </ul>
              </section> :
              null}

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

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <BookingWidget program={program} />
          </div>
        </div>
      </Section>

      {related.length ?
        <Section tone="warm">
          <SectionIntro eyebrow="Other stays" title="Also open" />
          <div className="mt-14 border-t border-line">
            {related.map((item) =>
              <ProgramCard key={item.id} program={item} to={stayPath(item)} />
            )}
          </div>
        </Section> :
        null}

      <Section tone="raised">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">Ready to begin?</p>
            <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-ink sm:text-[2.5rem]">
              {formatPrice(program.priceUsd)} · {formatStayDates(program)}
            </h2>
          </div>
          <ButtonLink to={stayListPath(program)} variant="secondary">All dates</ButtonLink>
        </div>
      </Section>
    </>
  );
}
