import { useState, type ReactNode } from 'react';
import { homepageCopy, type HomepageCopy } from '../data/homepageCopy';
import { useSiteCopy } from '../lib/siteCopy';
import { Button } from '../components/ui/Button';
import { Field, adminFieldClass } from './ui';

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

function Card({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-line bg-raised p-5 sm:p-6">
      <h2 className="font-display text-2xl font-light tracking-tight text-ink">{title}</h2>
      {note ? <p className="mt-1 text-sm text-muted">{note}</p> : null}
      <div className="mt-5 flex flex-col gap-4">{children}</div>
    </section>
  );
}

export function HomepageEditor() {
  const { copy, ready, saving, error, saved, save } = useSiteCopy();
  const [form, setForm] = useState<HomepageCopy | null>(null);
  const current = form ?? copy;

  function patch(partial: Partial<HomepageCopy>) {
    setForm({ ...current, ...partial });
  }

  async function handleSave() {
    await save(current);
    setForm(null);
  }

  if (!ready) return <p className="text-sm text-muted">Loading the homepage text…</p>;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 pb-24">
      <div>
        <p className="eyebrow text-muted">Homepage</p>
        <h1 className="mt-1 font-display text-3xl font-light tracking-tight sm:text-4xl">Edit the homepage</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          These are the words visitors see on the front page, in the same order. Pictures stay as they are. Save when you are finished.
        </p>
      </div>

      <Card title="Opening pictures" note="The large slides at the top of the homepage.">
        <Text label="Line above the slides" value={current.heroLabel} onChange={(heroLabel) => patch({ heroLabel })} />
        {current.slides.map((slide, index) =>
          <div key={slide.id} className="grid gap-4 rounded-2xl border border-line p-4">
            <p className="text-sm font-medium text-ink">Slide {index + 1}</p>
            <Text label="Tab name" value={slide.tab} onChange={(tab) => {
              const slides = current.slides.map((item, itemIndex) => itemIndex === index ? { ...item, tab } : item);
              patch({ slides });
            }} />
            <Text label="Small label" value={slide.eyebrow} onChange={(eyebrow) => {
              const slides = current.slides.map((item, itemIndex) => itemIndex === index ? { ...item, eyebrow } : item);
              patch({ slides });
            }} />
            <Text label="Heading" value={slide.title} onChange={(title) => {
              const slides = current.slides.map((item, itemIndex) => itemIndex === index ? { ...item, title } : item);
              patch({ slides });
            }} />
            <Text label="Sentence" value={slide.line} area onChange={(line) => {
              const slides = current.slides.map((item, itemIndex) => itemIndex === index ? { ...item, line } : item);
              patch({ slides });
            }} />
            <Text label="Button" value={slide.cta} onChange={(cta) => {
              const slides = current.slides.map((item, itemIndex) => itemIndex === index ? { ...item, cta } : item);
              patch({ slides });
            }} />
            <Text label="Small line beside the button" value={slide.detail} onChange={(detail) => {
              const slides = current.slides.map((item, itemIndex) => itemIndex === index ? { ...item, detail } : item);
              patch({ slides });
            }} />
          </div>
        )}
      </Card>

      <Card title="Welcome" note="The section just under the pictures.">
        <Text label="Small label" value={current.welcomeEyebrow} onChange={(welcomeEyebrow) => patch({ welcomeEyebrow })} />
        <Text label="Heading" value={current.welcomeTitle} onChange={(welcomeTitle) => patch({ welcomeTitle })} />
        <Text label="Italic ending" hint="Shown in italics after the heading." value={current.welcomeTitleItalic} onChange={(welcomeTitleItalic) => patch({ welcomeTitleItalic })} />
        <Text label="Paragraph" area value={current.welcomeBody} onChange={(welcomeBody) => patch({ welcomeBody })} />
        <div className="grid gap-4 sm:grid-cols-2">
          {current.stats.map((stat, index) =>
            <div key={stat.label} className="grid gap-3 rounded-2xl border border-line p-4">
              <Text label="Number" value={stat.value} onChange={(value) => {
                const stats = current.stats.map((item, itemIndex) => itemIndex === index ? { ...item, value } : item);
                patch({ stats });
              }} />
              <Text label="What the number means" value={stat.label} onChange={(label) => {
                const stats = current.stats.map((item, itemIndex) => itemIndex === index ? { ...item, label } : item);
                patch({ stats });
              }} />
            </div>
          )}
        </div>
      </Card>

      <Card title="Breath">
        <Text label="Small label" value={current.breathEyebrow} onChange={(breathEyebrow) => patch({ breathEyebrow })} />
        <Text label="Heading" value={current.breathTitle} onChange={(breathTitle) => patch({ breathTitle })} />
        <Text label="Italic ending" value={current.breathTitleItalic} onChange={(breathTitleItalic) => patch({ breathTitleItalic })} />
        <Text label="Sentence" area value={current.breathNote} onChange={(breathNote) => patch({ breathNote })} />
      </Card>

      <Card title="Two ways to come">
        <Text label="Small label" value={current.pathsEyebrow} onChange={(pathsEyebrow) => patch({ pathsEyebrow })} />
        <Text label="Heading" value={current.pathsTitle} onChange={(pathsTitle) => patch({ pathsTitle })} />
        {current.paths.map((path, index) =>
          <div key={path.label} className="grid gap-3 rounded-2xl border border-line p-4">
            <Text label={index === 0 ? 'Left card heading' : 'Right card heading'} value={path.label} onChange={(label) => {
              const paths = current.paths.map((item, itemIndex) => itemIndex === index ? { ...item, label } : item);
              patch({ paths });
            }} />
            <Text label="Sentence" value={path.line} area onChange={(line) => {
              const paths = current.paths.map((item, itemIndex) => itemIndex === index ? { ...item, line } : item);
              patch({ paths });
            }} />
          </div>
        )}
      </Card>

      <Card title="A day on the campus" note="The timeline of one day.">
        <Text label="Small label" value={current.dayEyebrow} onChange={(dayEyebrow) => patch({ dayEyebrow })} />
        <Text label="Heading" value={current.dayTitle} onChange={(dayTitle) => patch({ dayTitle })} />
      </Card>

      <Card title="Seasons" note="When to visit.">
        <Text label="Small label" value={current.seasonsEyebrow} onChange={(seasonsEyebrow) => patch({ seasonsEyebrow })} />
        <Text label="Heading" value={current.seasonsTitle} onChange={(seasonsTitle) => patch({ seasonsTitle })} />
      </Card>

      <Card title="The first day">
        <Text label="Small label" value={current.arrivalEyebrow} onChange={(arrivalEyebrow) => patch({ arrivalEyebrow })} />
        <Text label="Heading" value={current.arrivalTitle} onChange={(arrivalTitle) => patch({ arrivalTitle })} />
        <Text label="Italic ending" value={current.arrivalTitleItalic} onChange={(arrivalTitleItalic) => patch({ arrivalTitleItalic })} />
      </Card>

      <Card title="Sounds">
        <Text label="Small label" value={current.soundEyebrow} onChange={(soundEyebrow) => patch({ soundEyebrow })} />
        <Text label="Heading" value={current.soundTitle} onChange={(soundTitle) => patch({ soundTitle })} />
        <Text label="Italic ending" value={current.soundTitleItalic} onChange={(soundTitleItalic) => patch({ soundTitleItalic })} />
        <Text label="Sentence" area value={current.soundNote} onChange={(soundNote) => patch({ soundNote })} />
      </Card>

      <Card title="Photo row">
        <Text label="Small label" value={current.galleryEyebrow} onChange={(galleryEyebrow) => patch({ galleryEyebrow })} />
        <Text label="Heading" value={current.galleryTitle} onChange={(galleryTitle) => patch({ galleryTitle })} />
      </Card>

      <Card title="Senses">
        <Text label="Small label" value={current.sensesEyebrow} onChange={(sensesEyebrow) => patch({ sensesEyebrow })} />
        <Text label="Heading" value={current.sensesTitle} onChange={(sensesTitle) => patch({ sensesTitle })} />
      </Card>

      <Card title="Look around">
        <Text label="Small label" value={current.tourEyebrow} onChange={(tourEyebrow) => patch({ tourEyebrow })} />
        <Text label="Heading" value={current.tourTitle} onChange={(tourTitle) => patch({ tourTitle })} />
        <Text label="Sentence" value={current.tourNote} onChange={(tourNote) => patch({ tourNote })} />
      </Card>

      <Card title="Next dates">
        <Text label="Small label" value={current.datesEyebrow} onChange={(datesEyebrow) => patch({ datesEyebrow })} />
        <Text label="Heading" value={current.datesTitle} onChange={(datesTitle) => patch({ datesTitle })} />
      </Card>

      <Card title="Short lines between sections">
        <Text label="Dawn line" value={current.dawnLine} onChange={(dawnLine) => patch({ dawnLine })} />
        <Text label="Dawn emphasis" value={current.dawnEmphasis} onChange={(dawnEmphasis) => patch({ dawnEmphasis })} />
        <Text label="Dusk line" value={current.duskLine} onChange={(duskLine) => patch({ duskLine })} />
        <Text label="Dusk emphasis" value={current.duskEmphasis} onChange={(duskEmphasis) => patch({ duskEmphasis })} />
      </Card>

      <Card title="Ecology">
        <Text label="Small label" value={current.ecologyEyebrow} onChange={(ecologyEyebrow) => patch({ ecologyEyebrow })} />
        <Text label="Heading" value={current.ecologyTitle} onChange={(ecologyTitle) => patch({ ecologyTitle })} />
      </Card>

      <Card title="Find us" note="The map section near the bottom.">
        <Text label="Small label" value={current.findEyebrow} onChange={(findEyebrow) => patch({ findEyebrow })} />
        <Text label="Heading" value={current.findTitle} onChange={(findTitle) => patch({ findTitle })} />
        <Text label="First paragraph" area value={current.findNote} onChange={(findNote) => patch({ findNote })} />
        <Text label="Second paragraph" area value={current.findBody} onChange={(findBody) => patch({ findBody })} />
      </Card>

      <Card title="Contact details" note="Used in the footer, the contact page, and the map.">
        <Text label="Place name" value={current.contact.name} onChange={(name) => patch({ contact: { ...current.contact, name } })} />
        <Text label="Phone" hint="Example: 077 610 8200" value={current.contact.telephoneDisplay} onChange={(telephoneDisplay) => patch({ contact: { ...current.contact, telephoneDisplay } })} />
        <Text label="Email" value={current.contact.email} onChange={(email) => patch({ contact: { ...current.contact, email } })} />
        <Text label="Street" value={current.contact.streetAddress} onChange={(streetAddress) => patch({ contact: { ...current.contact, streetAddress } })} />
        <Text label="Town" value={current.contact.addressLocality} onChange={(addressLocality) => patch({ contact: { ...current.contact, addressLocality } })} />
        <Text label="Postal code" value={current.contact.postalCode} onChange={(postalCode) => patch({ contact: { ...current.contact, postalCode } })} />
      </Card>

      <Card title="Closing line">
        <Text label="Heading" value={current.closingTitle} onChange={(closingTitle) => patch({ closingTitle })} />
      </Card>

      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-full border border-line bg-surface/95 px-3 py-2 shadow-lift backdrop-blur">
        <Button type="button" disabled={saving} onClick={() => { void handleSave(); }}>
          {saving ? 'Saving' : 'Save homepage'}
        </Button>
        <button
          type="button"
          className="px-3 text-sm text-muted hover:text-ink"
          onClick={() => setForm(homepageCopy)}>
          Restore original words
        </button>
        {saved ? <p className="text-sm text-sage-700 dark:text-sage-200">Saved. The public site is updated.</p> : null}
        {error ? <p className="text-sm text-terracotta-700">{error}</p> : null}
      </div>
    </div>
  );
}
