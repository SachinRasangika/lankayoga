import { Link, useParams } from 'react-router-dom';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { SoftImage } from '../components/motion/SoftImage';
import { ButtonLink } from '../components/ui/Button';
import { media } from '../data/media';
import { classPath } from '../utils/stays';
import { useContent } from '../admin/content';

export function ClassDetail() {
  const { slug } = useParams();
  const { ready, publishedClasses } = useContent();
  const item = publishedClasses.find((entry) => entry.slug === slug || entry.id === slug);

  if (!ready) {
    return <p className="px-5 py-32 text-center text-sm text-muted">Loading…</p>;
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl font-light">That class is not live</h1>
        <Link to="/classes" className="mt-6 inline-block text-sm text-muted underline">Back to classes</Link>
      </div>
    );
  }

  const related = publishedClasses.filter((entry) => entry.id !== item.id).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Classes"
        title={item.name}
        lede={item.description}
        image={item.image || media.heroShala}
        imageAlt={item.alt}
        meta={[
          { label: 'Time', value: item.time },
          { label: 'Length', value: item.duration },
          { label: 'Level', value: item.level }
        ]} />

      <Section tone="base">
        <div className="mx-auto max-w-3xl">
          <Link to="/classes" className="text-sm text-muted underline underline-offset-4 hover:text-ink">
            All classes
          </Link>
          <p className="mt-10 text-sm text-muted">
            Times shift with the season. Guests receive the week’s hours on arrival.
          </p>
        </div>
      </Section>

      {related.length ?
        <Section tone="warm">
          <SectionIntro eyebrow="The day" title="Other hours in the shala" />
          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) =>
              <li key={entry.id}>
                <Link to={classPath(entry)} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-raised">
                  <SoftImage src={entry.image} alt={entry.alt} className="h-44" drift={4} />
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <p className="text-[0.6875rem] uppercase tracking-widest text-terracotta-600 dark:text-terracotta-300">
                      {entry.time} · {entry.duration}
                    </p>
                    <h3 className="font-display text-2xl font-light tracking-tight text-ink group-hover:text-terracotta-700 dark:group-hover:text-terracotta-200">
                      {entry.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">{entry.description}</p>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </Section> :
        null}

      <Section tone="raised">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">Join a stay</p>
            <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-ink sm:text-[2.5rem]">
              Classes are held for guests on a Yoga date
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
