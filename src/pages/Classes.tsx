import { Link } from 'react-router-dom';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { SoftImage } from '../components/motion/SoftImage';
import { ButtonLink } from '../components/ui/Button';
import { useContent } from '../admin/content';
import { EditableSection } from '../admin/customize/EditableSection';
import { useSection } from '../admin/customize/store';
import { WeekSchedule } from '../components/programs/WeekSchedule';
import { classPath } from '../utils/stays';

export function Classes() {
  const { publishedClasses } = useContent();
  const hero = useSection('page.classes');
  const hours = useSection('page.classesHours');
  const close = useSection('page.classesClose');
  const month = new Date().toLocaleDateString('en-US', { month: 'long' });

  return (
    <>
      <EditableSection id="page.classes">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lede={hero.lede}
        image={hero.image}
        imageAlt={hero.imageAlt}
        meta={[...hero.meta]} />
      </EditableSection>

      <EditableSection id="page.classesHours">
      <Section tone="base">
        <SectionIntro
          eyebrow={hours.eyebrow || month}
          title={hours.title}
          note={hours.note} />
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
      </EditableSection>

      <EditableSection id="page.classesClose">
      <Section tone="warm">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">{close.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-ink sm:text-[2.5rem]">
              {close.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {close.body}
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
      </EditableSection>
    </>
  );
}
