import { Link } from 'react-router-dom';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { SoftImage } from '../components/motion/SoftImage';
import { ButtonLink } from '../components/ui/Button';
import { useContent } from '../admin/content';
import { media } from '../data/media';
import { WeekSchedule } from '../components/programs/WeekSchedule';
import { classPath } from '../utils/stays';

export function Classes() {
  const { publishedClasses } = useContent();

  return (
    <>
      <PageHero
        eyebrow="Classes"
        title="Practice, with the sides open"
        lede="Small groups in the lakefront shala. These hours are part of a stay — write to us if you want a private class."
        image={media.heroShala}
        imageAlt="Open-air teak shala at the edge of the lake at sunrise"
        meta={[
          { label: 'Shala', value: 'Lakefront' },
          { label: 'Week', value: 'Seven days' },
          { label: 'First class', value: '6:45' }
        ]} />

      <Section tone="base">
        <SectionIntro
          eyebrow={new Date().toLocaleDateString('en-US', { month: 'long' })}
          title="The hours the shala is used"
          note="Choose a day. Book a class to pick a date and a time." />
        <WeekSchedule />
        {publishedClasses.length === 0 ?
          <p className="mt-16 text-center text-sm text-muted">No classes are listed yet. Write to us if you want a private hour.</p> :
          <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {publishedClasses.map((item) =>
              <li key={item.id} className="flex">
                <Link to={classPath(item)} className="group flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-raised">
                  <SoftImage src={item.image} alt={item.alt} className="h-52" drift={4} />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <p className="text-[0.6875rem] uppercase tracking-widest text-terracotta-600 dark:text-terracotta-300">
                      {item.time} · {item.duration}
                    </p>
                    <h3 className="font-display text-2xl font-light tracking-tight text-ink group-hover:text-terracotta-700 dark:group-hover:text-terracotta-200">
                      {item.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                    <p className="mt-auto pt-2 text-xs uppercase tracking-widest text-muted">{item.level}</p>
                  </div>
                </Link>
              </li>
            )}
          </ul>}
      </Section>

      <Section tone="warm">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">Join a stay</p>
            <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-ink sm:text-[2.5rem]">
              Classes are held for guests on a Yoga date
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              See the calendar, or ask about a private hour. Treatments sit next door, in the therapy wing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/yoga">Yoga dates</ButtonLink>
            <ButtonLink to="/treatments" variant="secondary">Treatments</ButtonLink>
            <Link to="/contact" className="inline-flex items-center text-sm text-muted underline underline-offset-4 hover:text-ink">
              Write to us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
