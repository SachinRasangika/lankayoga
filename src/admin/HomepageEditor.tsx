import { useState, type ReactNode } from 'react';
import { homepageCopy, type HomepageCopy } from '../data/homepageCopy';
import { pageCopy, type FactCopy, type PageCopy, type StepCopy } from '../data/pageCopy';
import { useSiteCopy } from '../lib/siteCopy';
import { Button } from '../components/ui/Button';
import { Field, adminFieldClass } from './ui';

type Draft = { copy: HomepageCopy; pages: PageCopy };

const catalog: { id: keyof PageCopy | 'home'; label: string; sections: { id: string; title: string; note?: string }[] }[] = [
  {
    id: 'home',
    label: 'Homepage',
    sections: [
      { id: 'slides', title: 'Opening pictures', note: 'The large slides at the top.' },
      { id: 'welcome', title: 'Welcome', note: 'The section just under the pictures.' },
      { id: 'breath', title: 'Breath' },
      { id: 'paths', title: 'Two ways to come' },
      { id: 'day', title: 'A day on the campus' },
      { id: 'seasons', title: 'Seasons' },
      { id: 'arrival', title: 'The first day' },
      { id: 'sound', title: 'Sounds' },
      { id: 'gallery', title: 'Photo row' },
      { id: 'senses', title: 'Senses' },
      { id: 'tour', title: 'Look around' },
      { id: 'dates', title: 'Next dates' },
      { id: 'lines', title: 'Short lines' },
      { id: 'ecology', title: 'Ecology' },
      { id: 'find', title: 'Find us' },
      { id: 'contact', title: 'Contact details', note: 'Phone, email, and address. Used in the footer, contact page, and map.' },
      { id: 'closing', title: 'Closing line' }
    ]
  },
  {
    id: 'training',
    label: 'Teacher training',
    sections: [
      { id: 'hero', title: 'Top of the page' },
      { id: 'curriculum', title: 'Curriculum' },
      { id: 'lines', title: 'Lines between sections' },
      { id: 'faculty', title: 'Faculty' },
      { id: 'admission', title: 'Admission' },
      { id: 'intakes', title: 'Intakes' }
    ]
  },
  { id: 'retreats', label: 'Retreats', sections: [{ id: 'hero', title: 'Top of the page' }, { id: 'empty', title: 'No dates found' }] },
  { id: 'yoga', label: 'Yoga', sections: [{ id: 'hero', title: 'Top of the page' }] },
  { id: 'ayurveda', label: 'Ayurveda', sections: [{ id: 'hero', title: 'Top of the page' }] },
  {
    id: 'classes',
    label: 'Classes',
    sections: [
      { id: 'hero', title: 'Top of the page' },
      { id: 'hours', title: 'The hours' },
      { id: 'closing', title: 'Closing' }
    ]
  },
  {
    id: 'treatments',
    label: 'Treatments',
    sections: [
      { id: 'hero', title: 'Top of the page' },
      { id: 'wing', title: 'The wing' },
      { id: 'closing', title: 'Closing' }
    ]
  },
  {
    id: 'campus',
    label: 'Campus & hire',
    sections: [
      { id: 'hero', title: 'Top of the page' },
      { id: 'tour', title: 'Look around' },
      { id: 'path', title: 'Line on the path' },
      { id: 'gallery', title: 'Gallery' },
      { id: 'spaces', title: 'Spaces' },
      { id: 'hammock', title: 'Line by the lake' },
      { id: 'included', title: 'What is included' },
      { id: 'enquiry', title: 'Enquiry' }
    ]
  },
  { id: 'book', label: 'Book a stay', sections: [{ id: 'hero', title: 'Top of the page' }] },
  { id: 'contactPage', label: 'Contact', sections: [{ id: 'hero', title: 'Top of the page' }, { id: 'desk', title: 'The desk' }] },
  { id: 'journal', label: 'Journal', sections: [{ id: 'hero', title: 'Top of the page' }] }
];

function Text({
  label,
  hint,
  value,
  onChange,
  area
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  area?: boolean;
}) {
  return (
    <Field label={label} hint={hint}>
      {area ?
        <textarea value={value} rows={4} onChange={(event) => onChange(event.target.value)} className={adminFieldClass} /> :
        <input value={value} onChange={(event) => onChange(event.target.value)} className={adminFieldClass} />}
    </Field>
  );
}

function Fields<T extends object>({
  source,
  fields,
  onChange
}: {
  source: T;
  fields: { key: keyof T & string; label: string; area?: boolean; hint?: string }[];
  onChange: (partial: Partial<T>) => void;
}) {
  return fields.map((field) =>
    <Text
      key={field.key}
      label={field.label}
      hint={field.hint}
      area={field.area}
      value={String(source[field.key] ?? '')}
      onChange={(value) => onChange({ [field.key]: value } as Partial<T>)} />
  );
}

function Facts({ items, onChange }: { items: FactCopy[]; onChange: (items: FactCopy[]) => void }) {
  return items.map((item, index) =>
    <div key={index} className="grid gap-3 rounded-2xl border border-line p-4 sm:grid-cols-2">
      <Text label="Small label" value={item.label} onChange={(label) => onChange(items.map((row, rowIndex) => rowIndex === index ? { ...row, label } : row))} />
      <Text label="Value" value={item.value} onChange={(value) => onChange(items.map((row, rowIndex) => rowIndex === index ? { ...row, value } : row))} />
    </div>
  );
}

function Steps({ items, onChange }: { items: StepCopy[]; onChange: (items: StepCopy[]) => void }) {
  return items.map((item, index) =>
    <div key={index} className="grid gap-3 rounded-2xl border border-line p-4">
      <p className="text-sm font-medium text-ink">Step {index + 1}</p>
      <Text label="Heading" value={item.title} onChange={(title) => onChange(items.map((row, rowIndex) => rowIndex === index ? { ...row, title } : row))} />
      <Text label="Sentence" area value={item.detail} onChange={(detail) => onChange(items.map((row, rowIndex) => rowIndex === index ? { ...row, detail } : row))} />
    </div>
  );
}

function HomeFields({ section, copy, onChange }: { section: string; copy: HomepageCopy; onChange: (partial: Partial<HomepageCopy>) => void }) {
  if (section === 'slides') {
    return (
      <>
        <Text label="Line above the slides" value={copy.heroLabel} onChange={(heroLabel) => onChange({ heroLabel })} />
        {copy.slides.map((slide, index) =>
          <div key={slide.id} className="grid gap-4 rounded-2xl border border-line p-4">
            <p className="text-sm font-medium text-ink">Slide {index + 1}</p>
            <Text label="Tab name" value={slide.tab} onChange={(tab) => onChange({ slides: copy.slides.map((item, itemIndex) => itemIndex === index ? { ...item, tab } : item) })} />
            <Text label="Small label" value={slide.eyebrow} onChange={(eyebrow) => onChange({ slides: copy.slides.map((item, itemIndex) => itemIndex === index ? { ...item, eyebrow } : item) })} />
            <Text label="Heading" value={slide.title} onChange={(title) => onChange({ slides: copy.slides.map((item, itemIndex) => itemIndex === index ? { ...item, title } : item) })} />
            <Text label="Sentence" area value={slide.line} onChange={(line) => onChange({ slides: copy.slides.map((item, itemIndex) => itemIndex === index ? { ...item, line } : item) })} />
            <Text label="Button" value={slide.cta} onChange={(cta) => onChange({ slides: copy.slides.map((item, itemIndex) => itemIndex === index ? { ...item, cta } : item) })} />
            <Text label="Small line beside the button" value={slide.detail} onChange={(detail) => onChange({ slides: copy.slides.map((item, itemIndex) => itemIndex === index ? { ...item, detail } : item) })} />
          </div>
        )}
      </>
    );
  }
  if (section === 'welcome') {
    return (
      <>
        <Fields source={copy} onChange={onChange} fields={[
          { key: 'welcomeEyebrow', label: 'Small label' },
          { key: 'welcomeTitle', label: 'Heading' },
          { key: 'welcomeTitleItalic', label: 'Italic ending', hint: 'Shown in italics after the heading.' },
          { key: 'welcomeBody', label: 'Paragraph', area: true }
        ]} />
        <Facts items={copy.stats} onChange={(stats) => onChange({ stats })} />
      </>
    );
  }
  if (section === 'breath') {
    return <Fields source={copy} onChange={onChange} fields={[
      { key: 'breathEyebrow', label: 'Small label' },
      { key: 'breathTitle', label: 'Heading' },
      { key: 'breathTitleItalic', label: 'Italic ending' },
      { key: 'breathNote', label: 'Sentence', area: true }
    ]} />;
  }
  if (section === 'paths') {
    return (
      <>
        <Fields source={copy} onChange={onChange} fields={[
          { key: 'pathsEyebrow', label: 'Small label' },
          { key: 'pathsTitle', label: 'Heading' }
        ]} />
        {copy.paths.map((path, index) =>
          <div key={index} className="grid gap-3 rounded-2xl border border-line p-4">
            <Text label={index === 0 ? 'Left card heading' : 'Right card heading'} value={path.label} onChange={(label) => onChange({ paths: copy.paths.map((item, itemIndex) => itemIndex === index ? { ...item, label } : item) })} />
            <Text label="Sentence" area value={path.line} onChange={(line) => onChange({ paths: copy.paths.map((item, itemIndex) => itemIndex === index ? { ...item, line } : item) })} />
          </div>
        )}
      </>
    );
  }
  if (section === 'day') return <Fields source={copy} onChange={onChange} fields={[{ key: 'dayEyebrow', label: 'Small label' }, { key: 'dayTitle', label: 'Heading' }]} />;
  if (section === 'seasons') return <Fields source={copy} onChange={onChange} fields={[{ key: 'seasonsEyebrow', label: 'Small label' }, { key: 'seasonsTitle', label: 'Heading' }]} />;
  if (section === 'arrival') return <Fields source={copy} onChange={onChange} fields={[{ key: 'arrivalEyebrow', label: 'Small label' }, { key: 'arrivalTitle', label: 'Heading' }, { key: 'arrivalTitleItalic', label: 'Italic ending' }]} />;
  if (section === 'sound') return <Fields source={copy} onChange={onChange} fields={[{ key: 'soundEyebrow', label: 'Small label' }, { key: 'soundTitle', label: 'Heading' }, { key: 'soundTitleItalic', label: 'Italic ending' }, { key: 'soundNote', label: 'Sentence', area: true }]} />;
  if (section === 'gallery') return <Fields source={copy} onChange={onChange} fields={[{ key: 'galleryEyebrow', label: 'Small label' }, { key: 'galleryTitle', label: 'Heading' }]} />;
  if (section === 'senses') return <Fields source={copy} onChange={onChange} fields={[{ key: 'sensesEyebrow', label: 'Small label' }, { key: 'sensesTitle', label: 'Heading' }]} />;
  if (section === 'tour') return <Fields source={copy} onChange={onChange} fields={[{ key: 'tourEyebrow', label: 'Small label' }, { key: 'tourTitle', label: 'Heading' }, { key: 'tourNote', label: 'Sentence' }]} />;
  if (section === 'dates') return <Fields source={copy} onChange={onChange} fields={[{ key: 'datesEyebrow', label: 'Small label' }, { key: 'datesTitle', label: 'Heading' }]} />;
  if (section === 'lines') return <Fields source={copy} onChange={onChange} fields={[{ key: 'dawnLine', label: 'Dawn line' }, { key: 'dawnEmphasis', label: 'Dawn emphasis' }, { key: 'duskLine', label: 'Dusk line' }, { key: 'duskEmphasis', label: 'Dusk emphasis' }]} />;
  if (section === 'ecology') return <Fields source={copy} onChange={onChange} fields={[{ key: 'ecologyEyebrow', label: 'Small label' }, { key: 'ecologyTitle', label: 'Heading' }]} />;
  if (section === 'find') return <Fields source={copy} onChange={onChange} fields={[{ key: 'findEyebrow', label: 'Small label' }, { key: 'findTitle', label: 'Heading' }, { key: 'findNote', label: 'First paragraph', area: true }, { key: 'findBody', label: 'Second paragraph', area: true }]} />;
  if (section === 'contact') {
    const contact = copy.contact;
    const set = (partial: Partial<HomepageCopy['contact']>) => onChange({ contact: { ...contact, ...partial } });
    return (
      <>
        <Text label="Place name" value={contact.name} onChange={(name) => set({ name })} />
        <Text label="Phone" hint="Example: 077 610 8200" value={contact.telephoneDisplay} onChange={(telephoneDisplay) => set({ telephoneDisplay })} />
        <Text label="Email" value={contact.email} onChange={(email) => set({ email })} />
        <Text label="Street" value={contact.streetAddress} onChange={(streetAddress) => set({ streetAddress })} />
        <Text label="Town" value={contact.addressLocality} onChange={(addressLocality) => set({ addressLocality })} />
        <Text label="Postal code" value={contact.postalCode} onChange={(postalCode) => set({ postalCode })} />
      </>
    );
  }
  return <Fields source={copy} onChange={onChange} fields={[{ key: 'closingTitle', label: 'Heading' }]} />;
}

function PageFields({
  pageId,
  section,
  pages,
  onChange
}: {
  pageId: keyof PageCopy;
  section: string;
  pages: PageCopy;
  onChange: (partial: Partial<PageCopy>) => void;
}) {
  if (pageId === 'training') {
    const training = pages.training;
    const set = (partial: Partial<PageCopy['training']>) => onChange({ training: { ...training, ...partial } });
    if (section === 'hero') {
      return (
        <>
          <Fields source={training} onChange={set} fields={[{ key: 'eyebrow', label: 'Small label' }, { key: 'title', label: 'Heading' }, { key: 'lede', label: 'Paragraph', area: true }]} />
          <Facts items={training.facts} onChange={(facts) => set({ facts })} />
        </>
      );
    }
    if (section === 'curriculum') return <Fields source={training} onChange={set} fields={[{ key: 'curriculumEyebrow', label: 'Small label' }, { key: 'curriculumTitle', label: 'Heading' }]} />;
    if (section === 'lines') return <Fields source={training} onChange={set} fields={[{ key: 'dawnLine', label: 'First line' }, { key: 'dawnEmphasis', label: 'First emphasis' }, { key: 'duskLine', label: 'Second line' }, { key: 'duskEmphasis', label: 'Second emphasis' }]} />;
    if (section === 'faculty') return <Fields source={training} onChange={set} fields={[{ key: 'facultyEyebrow', label: 'Small label' }, { key: 'facultyTitle', label: 'Heading' }]} />;
    if (section === 'admission') {
      return (
        <>
          <Fields source={training} onChange={set} fields={[{ key: 'admissionEyebrow', label: 'Small label' }, { key: 'admissionTitle', label: 'Heading' }]} />
          <Steps items={training.steps} onChange={(steps) => set({ steps })} />
        </>
      );
    }
    return <Fields source={training} onChange={set} fields={[{ key: 'intakesEyebrow', label: 'Small label' }, { key: 'intakesTitle', label: 'Heading' }]} />;
  }
  if (pageId === 'retreats') {
    const set = (partial: Partial<PageCopy['retreats']>) => onChange({ retreats: { ...pages.retreats, ...partial } });
    return section === 'empty'
      ? <Fields source={pages.retreats} onChange={set} fields={[{ key: 'emptyTitle', label: 'Heading when no dates match' }]} />
      : <Fields source={pages.retreats} onChange={set} fields={[{ key: 'eyebrow', label: 'Small label' }, { key: 'title', label: 'Heading' }]} />;
  }
  if (pageId === 'yoga') return <Fields source={pages.yoga} onChange={(partial) => onChange({ yoga: { ...pages.yoga, ...partial } })} fields={[{ key: 'eyebrow', label: 'Small label' }, { key: 'title', label: 'Heading' }]} />;
  if (pageId === 'ayurveda') return <Fields source={pages.ayurveda} onChange={(partial) => onChange({ ayurveda: { ...pages.ayurveda, ...partial } })} fields={[{ key: 'eyebrow', label: 'Small label' }, { key: 'title', label: 'Heading' }]} />;
  if (pageId === 'classes') {
    const item = pages.classes;
    const set = (partial: Partial<PageCopy['classes']>) => onChange({ classes: { ...item, ...partial } });
    if (section === 'hero') return <><Fields source={item} onChange={set} fields={[{ key: 'eyebrow', label: 'Small label' }, { key: 'title', label: 'Heading' }, { key: 'lede', label: 'Paragraph', area: true }]} /><Facts items={item.facts} onChange={(facts) => set({ facts })} /></>;
    if (section === 'hours') return <Fields source={item} onChange={set} fields={[{ key: 'hoursTitle', label: 'Heading' }, { key: 'hoursNote', label: 'Sentence', area: true }]} />;
    return <Fields source={item} onChange={set} fields={[{ key: 'closingEyebrow', label: 'Small label' }, { key: 'closingTitle', label: 'Heading' }, { key: 'closingNote', label: 'Paragraph', area: true }]} />;
  }
  if (pageId === 'treatments') {
    const item = pages.treatments;
    const set = (partial: Partial<PageCopy['treatments']>) => onChange({ treatments: { ...item, ...partial } });
    if (section === 'hero') return <><Fields source={item} onChange={set} fields={[{ key: 'eyebrow', label: 'Small label' }, { key: 'title', label: 'Heading' }, { key: 'lede', label: 'Paragraph', area: true }]} /><Facts items={item.facts} onChange={(facts) => set({ facts })} /></>;
    if (section === 'wing') return <Fields source={item} onChange={set} fields={[{ key: 'wingEyebrow', label: 'Small label' }, { key: 'wingTitle', label: 'Heading' }, { key: 'wingNote', label: 'Paragraph', area: true }]} />;
    return <Fields source={item} onChange={set} fields={[{ key: 'closingEyebrow', label: 'Small label' }, { key: 'closingTitle', label: 'Heading' }, { key: 'closingNote', label: 'Paragraph', area: true }]} />;
  }
  if (pageId === 'campus') {
    const item = pages.campus;
    const set = (partial: Partial<PageCopy['campus']>) => onChange({ campus: { ...item, ...partial } });
    if (section === 'hero') return <><Fields source={item} onChange={set} fields={[{ key: 'eyebrow', label: 'Small label' }, { key: 'title', label: 'Heading' }, { key: 'lede', label: 'Paragraph', area: true }]} /><Facts items={item.facts} onChange={(facts) => set({ facts })} /></>;
    if (section === 'tour') return <Fields source={item} onChange={set} fields={[{ key: 'tourEyebrow', label: 'Small label' }, { key: 'tourTitle', label: 'Heading' }]} />;
    if (section === 'path') return <Fields source={item} onChange={set} fields={[{ key: 'pathLine', label: 'Line' }, { key: 'pathEmphasis', label: 'Emphasis' }]} />;
    if (section === 'gallery') return <Fields source={item} onChange={set} fields={[{ key: 'galleryEyebrow', label: 'Small label' }, { key: 'galleryTitle', label: 'Heading' }]} />;
    if (section === 'spaces') return <Fields source={item} onChange={set} fields={[{ key: 'spacesEyebrow', label: 'Small label' }, { key: 'spacesTitle', label: 'Heading' }]} />;
    if (section === 'hammock') return <Fields source={item} onChange={set} fields={[{ key: 'hammockLine', label: 'Line' }, { key: 'hammockEmphasis', label: 'Emphasis' }]} />;
    if (section === 'included') return <Fields source={item} onChange={set} fields={[{ key: 'includedEyebrow', label: 'Small label' }, { key: 'includedTitle', label: 'Heading' }]} />;
    return (
      <>
        <Fields source={item} onChange={set} fields={[{ key: 'enquiryEyebrow', label: 'Small label' }, { key: 'enquiryTitle', label: 'Heading' }, { key: 'enquiryNote', label: 'Paragraph', area: true }]} />
        <Facts items={item.enquiryFacts} onChange={(enquiryFacts) => set({ enquiryFacts })} />
      </>
    );
  }
  if (pageId === 'book') return <Fields source={pages.book} onChange={(partial) => onChange({ book: { ...pages.book, ...partial } })} fields={[{ key: 'eyebrow', label: 'Small label' }, { key: 'title', label: 'Heading' }, { key: 'lede', label: 'Paragraph', area: true }]} />;
  if (pageId === 'contactPage') {
    const item = pages.contactPage;
    const set = (partial: Partial<PageCopy['contactPage']>) => onChange({ contactPage: { ...item, ...partial } });
    if (section === 'desk') return <Fields source={item} onChange={set} fields={[{ key: 'deskEyebrow', label: 'Small label' }, { key: 'deskTitle', label: 'Heading' }, { key: 'deskNote', label: 'Paragraph', area: true }]} />;
    return <><Fields source={item} onChange={set} fields={[{ key: 'eyebrow', label: 'Small label' }, { key: 'title', label: 'Heading' }, { key: 'lede', label: 'Paragraph', area: true }]} /><Facts items={item.facts} onChange={(facts) => set({ facts })} /></>;
  }
  return <Fields source={pages.journal} onChange={(partial) => onChange({ journal: { ...pages.journal, ...partial } })} fields={[{ key: 'eyebrow', label: 'Small label' }, { key: 'title', label: 'Heading' }]} />;
}

function Choice({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-2 text-left text-sm ${active ? 'bg-sage-100 font-medium text-sage-900 dark:bg-sage-800/50 dark:text-sage-50' : 'text-muted hover:bg-warm hover:text-ink'}`}>
      {children}
    </button>
  );
}

export function HomepageEditor() {
  const { copy, pages, ready, saving, error, saved, save } = useSiteCopy();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [pageId, setPageId] = useState<(typeof catalog)[number]['id']>('home');
  const [sectionId, setSectionId] = useState('slides');
  const [query, setQuery] = useState('');
  const current = draft ?? { copy, pages };
  const page = catalog.find((item) => item.id === pageId) ?? catalog[0];
  const section = page.sections.find((item) => item.id === sectionId) ?? page.sections[0];
  const needle = query.trim().toLowerCase();
  const matches = needle
    ? catalog.flatMap((item) => item.sections.filter((part) => `${item.label} ${part.title}`.toLowerCase().includes(needle)).map((part) => ({ page: item, section: part })))
    : [];

  function patchHome(partial: Partial<HomepageCopy>) {
    setDraft((form) => {
      const base = form ?? { copy, pages };
      return { ...base, copy: { ...base.copy, ...partial } };
    });
  }

  function patchPages(partial: Partial<PageCopy>) {
    setDraft((form) => {
      const base = form ?? { copy, pages };
      return { ...base, pages: { ...base.pages, ...partial } };
    });
  }

  function open(nextPage: (typeof catalog)[number]['id'], nextSection: string) {
    setPageId(nextPage);
    setSectionId(nextSection);
    setQuery('');
  }

  async function handleSave() {
    try {
      await save(current);
      setDraft(null);
    } catch {
      return;
    }
  }

  function restorePage() {
    setDraft((form) => {
      const base = form ?? { copy, pages };
      if (pageId === 'home') return { ...base, copy: homepageCopy };
      return { ...base, pages: { ...base.pages, [pageId]: pageCopy[pageId] } };
    });
  }

  if (!ready) return <p className="text-sm text-muted">Loading the page text…</p>;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 pb-28">
      <div>
        <p className="eyebrow text-muted">Pages</p>
        <h1 className="mt-1 font-display text-3xl font-light tracking-tight sm:text-4xl">Edit the words</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Choose a page, then a section. Each box is one part of that page. Pictures stay as they are. Save when you are finished.
        </p>
      </div>

      <Field label="Find a section">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Welcome, campus, contact…"
          className={adminFieldClass} />
      </Field>

      {needle ?
        <div className="flex flex-col gap-1 rounded-3xl border border-line bg-raised p-3">
          {matches.length === 0 ? <p className="px-3 py-2 text-sm text-muted">No section with that name.</p> : matches.map((match) =>
            <Choice key={`${match.page.id}-${match.section.id}`} active={false} onClick={() => open(match.page.id, match.section.id)}>
              {match.page.label} · {match.section.title}
            </Choice>
          )}
        </div> : null}

      {needle ? null :
        <div className="grid gap-4 lg:grid-cols-[13rem_15rem_minmax(0,1fr)]">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {catalog.map((item) =>
              <Choice key={item.id} active={item.id === pageId} onClick={() => open(item.id, item.sections[0].id)}>
                {item.label}
              </Choice>
            )}
          </nav>
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {page.sections.map((item) =>
              <Choice key={item.id} active={item.id === section.id} onClick={() => setSectionId(item.id)}>
                {item.title}
              </Choice>
            )}
          </nav>
          <section className="rounded-3xl border border-line bg-raised p-5 sm:p-6">
            <h2 className="font-display text-2xl font-light tracking-tight text-ink">{page.label}</h2>
            <p className="mt-1 text-sm text-muted">{section.title}{section.note ? ` — ${section.note}` : ''}</p>
            <div className="mt-5 flex flex-col gap-4">
              {pageId === 'home' ?
                <HomeFields section={section.id} copy={current.copy} onChange={patchHome} /> :
                <PageFields pageId={pageId} section={section.id} pages={current.pages} onChange={patchPages} />}
            </div>
          </section>
        </div>}

      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-full border border-line bg-surface/95 px-3 py-2 shadow-lift backdrop-blur">
        <Button type="button" disabled={saving} onClick={() => { void handleSave(); }}>
          {saving ? 'Saving' : 'Save words'}
        </Button>
        <button type="button" className="px-3 text-sm text-muted hover:text-ink" onClick={restorePage}>
          Restore this page
        </button>
        {saved ? <p className="text-sm text-sage-700 dark:text-sage-200">Saved. The public site is updated.</p> : null}
        {error ? <p className="text-sm text-terracotta-700">{error}</p> : null}
      </div>
    </div>
  );
}
