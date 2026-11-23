import { Link } from 'react-router-dom';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { SoftImage } from '../components/motion/SoftImage';
import { ButtonLink } from '../components/ui/Button';
import { statusOf, useContent } from '../admin/content';
import { EditableSection } from '../admin/customize/EditableSection';
import { useCustomizeMode } from '../admin/customize/CustomizeFrame';
import { useSection } from '../admin/customize/store';
import { WeekSchedule } from '../components/programs/WeekSchedule';
import { classPath } from '../utils/stays';

export function Classes() {
  const { classes, publishedClasses, saveClass, deleteClass } = useContent();
  const customizing = useCustomizeMode();
  const listed = customizing ? [...classes].sort((a, b) => a.sortOrder - b.sortOrder || a.time.localeCompare(b.time)) : publishedClasses;
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
        {customizing ?
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">Add, edit, or remove a class. Live classes show on the public page.</p>
            <Link to="/admin/classes/new" className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-700 px-4 py-2 text-sm font-semibold text-white">
              <PlusIcon className="h-4 w-4" />
              New class
            </Link>
          </div> :
          null}
        {listed.length === 0 ?
          <p className="mt-16 text-center text-sm text-muted">No classes are listed yet. Write to us if you want a private hour.</p> :
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {listed.map((item) =>
              <li key={item.id} className="flex">
                {customizing ?
                  <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-raised">
                    <SoftImage src={item.image} alt={item.alt} className="h-52" drift={4} />
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <p className="text-[0.6875rem] uppercase tracking-widest text-terracotta-600 dark:text-terracotta-300">
                        {item.time} · {item.duration}
                      </p>
                      <h3 className="font-display text-2xl font-light tracking-tight text-ink">{item.name}</h3>
                      <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                      <p className="mt-auto pt-2 text-xs uppercase tracking-widest text-muted">{item.level}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-3">
                      <Link to={`/admin/classes/${item.id}`} className="rounded-full bg-terracotta-700 px-4 py-2 text-sm font-semibold text-white">
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          void saveClass({ ...item, status: statusOf(item) === 'published' ? 'draft' : 'published' }).catch((caught: unknown) => {
                            window.alert(caught instanceof Error ? caught.message : 'Could not update this class.');
                          });
                        }}
                        className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink">
                        {statusOf(item) === 'published' ? 'Live' : 'Draft'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete “${item.name}”?`)) {
                            void deleteClass(item.id).catch((caught: unknown) => {
                              window.alert(caught instanceof Error ? caught.message : 'Could not delete this class.');
                            });
                          }
                        }}
                        className="ml-auto inline-flex items-center gap-1 rounded-full border border-line px-3 py-2 text-sm font-semibold text-terracotta-700">
                        <Trash2Icon className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div> :
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
                  </Link>}
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
