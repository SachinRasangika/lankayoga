import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Program, ProgramKind, PublishStatus, WellnessFocus } from '../types';
import { durationDaysFromRange } from '../utils/format';
import { stayPath } from '../utils/stays';
import { ChipList } from './ChipList';
import { emptyPackage, useContent } from './content';
import { ImagePicker } from './ImagePicker';
import { SaveBar } from './SaveBar';
import { SeoFieldsEditor } from './SeoFieldsEditor';
import { adminFieldClass, Field, Segmented } from './ui';

export function PackageEditor() {
  const { id } = useParams();
  const isNew = id === 'new' || !id;
  const navigate = useNavigate();
  const { ready, packages, savePackage, deletePackage } = useContent();
  const existing = useMemo(() => packages.find((item) => item.id === id), [id, packages]);
  const [form, setForm] = useState<Program>(() => existing ?? emptyPackage());
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isNew && existing) setForm(existing);
  }, [existing, isNew]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        persist();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function set<K extends keyof Program>(key: K, value: Program[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function persist() {
    void (async () => {
      setSaving(true);
      setError(null);
      try {
        const stored = await savePackage({
          ...form,
          durationDays: form.openDates ? Math.max(1, form.durationDays) : durationDaysFromRange(form.startDate, form.endDate)
        });
        setSaved(true);
        if (isNew) navigate(`/admin/packages/${stored.id}`, { replace: true });
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Could not save.');
      } finally {
        setSaving(false);
      }
    })();
  }

  if (!ready) {
    return <p className="text-sm text-muted">Loading package…</p>;
  }

  if (!isNew && !existing) {
    return <p className="text-sm text-muted">That package is gone. <Link to="/admin/packages" className="underline">Back to list</Link></p>;
  }

  const days = form.openDates ? Math.max(1, form.durationDays) : durationDaysFromRange(form.startDate, form.endDate);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <Link to="/admin/packages" className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">← Packages</Link>
          <h1 className="mt-1 font-display text-3xl font-light tracking-tight sm:text-4xl">{isNew ? 'New package' : form.title || 'Edit package'}</h1>
          <p className="mt-1 text-sm text-muted">{days} days · guests see this only when Live</p>
        </div>
        <Segmented
          value={(form.status ?? 'draft') as PublishStatus}
          onChange={(status) => set('status', status)}
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Live on site' }
          ]} />
      </div>

      <div className="grid min-w-0 gap-8 lg:grid-cols-[1fr_18rem]">
        <div className="flex min-w-0 flex-col gap-5">
          <Field label="Title">
            <input value={form.title} onChange={(event) => set('title', event.target.value)} className={adminFieldClass} placeholder="Breath & Reset Week" />
          </Field>
          <Field label="Short summary">
            <textarea
              value={form.summary}
              onChange={(event) => set('summary', event.target.value)}
              rows={3}
              className={adminFieldClass}
              placeholder="What this stay is, in one or two lines." />
          </Field>
          <Field label="Dates">
            <Segmented
              value={form.openDates ? 'open' : 'fixed'}
              onChange={(value) => set('openDates', value === 'open')}
              options={[
                { value: 'fixed', label: 'Fixed dates' },
                { value: 'open', label: 'Open for any dates' }
              ]} />
          </Field>
          {form.openDates ?
            <Field label="Length in days" hint="Guests pick any start date. The stay lasts this many days.">
              <input
                type="number"
                min={1}
                inputMode="numeric"
                value={form.durationDays}
                onChange={(event) => set('durationDays', Math.max(1, Number(event.target.value) || 1))}
                className={adminFieldClass} />
            </Field> :
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Starts">
                <input type="date" value={form.startDate} onChange={(event) => set('startDate', event.target.value)} className={adminFieldClass} />
              </Field>
              <Field label="Ends">
                <input type="date" value={form.endDate} onChange={(event) => set('endDate', event.target.value)} className={adminFieldClass} />
              </Field>
            </div>}
          <Field label="Subtitle / tagline">
            <input value={form.subtitle ?? ''} onChange={(event) => set('subtitle', event.target.value)} className={adminFieldClass} placeholder="From Sacred Island to Inner Light" />
          </Field>
          <Field label="Full story" hint="Paragraphs, separated by a blank line.">
            <textarea
              value={form.body ?? ''}
              onChange={(event) => set('body', event.target.value)}
              rows={8}
              className={adminFieldClass}
              placeholder="The longer description guests read on the listing." />
          </Field>
          <Field label="Summary bullets" hint="Type a line, then Add">
            <ChipList values={form.highlights ?? []} onChange={(highlights) => set('highlights', highlights)} placeholder="Walk through sacred sites…" />
          </Field>
          <Field label="What makes it special">
            <div className="flex flex-col gap-3">
              {(form.specials ?? []).map((block, index) =>
                <div key={`${block.title}-${index}`} className="flex flex-col gap-2 rounded-2xl border border-line p-3">
                  <input
                    value={block.title}
                    onChange={(event) => {
                      const specials = (form.specials ?? []).map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item);
                      set('specials', specials);
                    }}
                    className={adminFieldClass}
                    placeholder="It's two journeys in one." />
                  <textarea
                    value={block.text}
                    onChange={(event) => {
                      const specials = (form.specials ?? []).map((item, itemIndex) => itemIndex === index ? { ...item, text: event.target.value } : item);
                      set('specials', specials);
                    }}
                    rows={3}
                    className={adminFieldClass} />
                  <button
                    type="button"
                    onClick={() => set('specials', (form.specials ?? []).filter((_, itemIndex) => itemIndex !== index))}
                    className="inline-flex min-h-10 items-center self-start text-sm text-muted hover:text-ink">
                    Remove
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => set('specials', [...(form.specials ?? []), { title: '', text: '' }])}
                className="inline-flex min-h-12 items-center gap-1.5 self-start rounded-full border border-line px-4 text-sm text-muted hover:text-ink">
                <PlusIcon className="h-3.5 w-3.5" />
                Add a point
              </button>
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Field label="Price USD" className="col-span-2 sm:col-span-1">
              <input type="number" min={0} inputMode="numeric" value={form.priceUsd} onChange={(event) => set('priceUsd', Number(event.target.value) || 0)} className={adminFieldClass} />
            </Field>
            <Field label="Capacity">
              <input type="number" min={1} inputMode="numeric" value={form.capacity} onChange={(event) => set('capacity', Number(event.target.value) || 1)} className={adminFieldClass} />
            </Field>
            <Field label="Spots left">
              <input type="number" min={0} inputMode="numeric" value={form.spotsLeft} onChange={(event) => set('spotsLeft', Number(event.target.value) || 0)} className={adminFieldClass} />
            </Field>
          </div>
          <Field label="Who it is for">
            <input value={form.level} onChange={(event) => set('level', event.target.value)} className={adminFieldClass} />
          </Field>
          <Field label="Included" hint="Type a line, then Add">
            <ChipList values={form.includes} onChange={(includes) => set('includes', includes)} placeholder="Private eco cabin, all meals…" />
          </Field>
          <Field label="Add-ons" hint="Optional extras guests can request">
            <ChipList values={form.addons ?? []} onChange={(addons) => set('addons', addons)} placeholder="Surf lessons…" />
          </Field>
          <Field label="Extra activities">
            <ChipList values={form.extraActivities ?? []} onChange={(extraActivities) => set('extraActivities', extraActivities)} placeholder="Galle Dutch Fort…" />
          </Field>
          <Field label="Itinerary">
            <div className="flex flex-col gap-4">
              {(form.itinerary ?? []).map((block, index) =>
                <div key={`${block.period}-${index}`} className="flex flex-col gap-3 rounded-2xl border border-line p-3">
                  <div className="grid gap-2 sm:grid-cols-[8rem_1fr_auto]">
                    <input
                      value={block.period}
                      onChange={(event) => {
                        const itinerary = (form.itinerary ?? []).map((item, itemIndex) => itemIndex === index ? { ...item, period: event.target.value } : item);
                        set('itinerary', itinerary);
                      }}
                      className={adminFieldClass}
                      placeholder="Days 1–2" />
                    <input
                      value={block.title}
                      onChange={(event) => {
                        const itinerary = (form.itinerary ?? []).map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item);
                        set('itinerary', itinerary);
                      }}
                      className={adminFieldClass}
                      placeholder="Anuradhapura" />
                    <button
                      type="button"
                      aria-label="Remove itinerary block"
                      onClick={() => set('itinerary', (form.itinerary ?? []).filter((_, itemIndex) => itemIndex !== index))}
                      className="flex min-h-12 items-center justify-center rounded-xl border border-line text-muted hover:text-ink">
                      <Trash2Icon className="h-4 w-4" />
                    </button>
                  </div>
                  <ChipList
                    values={block.items}
                    onChange={(items) => {
                      const itinerary = (form.itinerary ?? []).map((item, itemIndex) => itemIndex === index ? { ...item, items } : item);
                      set('itinerary', itinerary);
                    }}
                    placeholder="Add a stop…" />
                </div>
              )}
              <button
                type="button"
                onClick={() => set('itinerary', [...(form.itinerary ?? []), { period: '', title: '', items: [] }])}
                className="inline-flex min-h-12 items-center gap-1.5 self-start rounded-full border border-line px-4 text-sm text-muted hover:text-ink">
                <PlusIcon className="h-3.5 w-3.5" />
                Add a day or region
              </button>
            </div>
          </Field>
          <Field label="Day rhythm">
            <div className="flex flex-col gap-3">
              {form.rhythm.map((row, index) =>
                <div key={`${row.time}-${index}`} className="flex flex-col gap-2 rounded-2xl border border-line p-3 sm:grid sm:grid-cols-[6.5rem_1fr_auto] sm:items-center sm:border-0 sm:p-0">
                  <input
                    value={row.time}
                    onChange={(event) => {
                      const rhythm = form.rhythm.map((item, itemIndex) => itemIndex === index ? { ...item, time: event.target.value } : item);
                      set('rhythm', rhythm);
                    }}
                    className={adminFieldClass}
                    placeholder="06:30"
                    inputMode="numeric" />
                  <input
                    value={row.activity}
                    onChange={(event) => {
                      const rhythm = form.rhythm.map((item, itemIndex) => itemIndex === index ? { ...item, activity: event.target.value } : item);
                      set('rhythm', rhythm);
                    }}
                    className={adminFieldClass}
                    placeholder="Sunrise practice" />
                  <button
                    type="button"
                    aria-label="Remove row"
                    onClick={() => set('rhythm', form.rhythm.filter((_, itemIndex) => itemIndex !== index))}
                    className="flex min-h-12 items-center justify-center rounded-xl border border-line text-muted hover:text-ink sm:min-w-12">
                    <Trash2Icon className="h-4 w-4" />
                    <span className="ml-2 text-sm sm:hidden">Remove</span>
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => set('rhythm', [...form.rhythm, { time: '', activity: '' }])}
                className="inline-flex min-h-12 items-center gap-1.5 self-start rounded-full border border-line px-4 text-sm text-muted hover:text-ink">
                <PlusIcon className="h-3.5 w-3.5" />
                Add a time
              </button>
            </div>
          </Field>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <Field label="Kind">
            <Segmented
              value={form.kind}
              onChange={(kind: ProgramKind) => set('kind', kind)}
              options={[
                { value: 'retreat', label: 'Retreat' },
                { value: 'training', label: 'Training' },
                { value: 'panchakarma', label: 'Healing' }
              ]} />
          </Field>
          <Field label="Focus">
            <Segmented
              value={form.focus}
              onChange={(focus: WellnessFocus) => set('focus', focus)}
              options={[
                { value: 'yoga', label: 'Yoga' },
                { value: 'ayurveda', label: 'Ayurveda' },
                { value: 'integrated', label: 'Both' }
              ]} />
          </Field>
          <Field label="Photos" hint="Add several. The first one is the cover guests see first.">
            <ImagePicker
              values={form.images ?? []}
              onChange={(images) => {
                setForm((current) => ({ ...current, images, image: images[0] ?? '' }));
                setSaved(false);
              }} />
          </Field>
          <SeoFieldsEditor
            slug={form.slug ?? ''}
            title={form.seoTitle ?? ''}
            description={form.seoDescription ?? ''}
            imageAlt={form.imageAlt ?? ''}
            onSlugChange={(value) => set('slug', value)}
            onTitleChange={(value) => set('seoTitle', value)}
            onDescriptionChange={(value) => set('seoDescription', value)}
            onImageAltChange={(value) => set('imageAlt', value)} />
          <Field label="Certification (optional)">
            <input value={form.certification ?? ''} onChange={(event) => set('certification', event.target.value || undefined)} className={adminFieldClass} />
          </Field>
          <Field label="PDF itinerary URL">
            <input value={form.pdfUrl ?? ''} onChange={(event) => set('pdfUrl', event.target.value)} className={adminFieldClass} placeholder="/shanti-yatra.html" />
          </Field>
          <Field label="Booking WhatsApp">
            <input value={form.bookingWhatsapp ?? ''} onChange={(event) => set('bookingWhatsapp', event.target.value)} className={adminFieldClass} placeholder="+94776108200" />
          </Field>
          <Field label="Booking email">
            <input value={form.bookingEmail ?? ''} onChange={(event) => set('bookingEmail', event.target.value)} className={adminFieldClass} placeholder="premilreallankaholiday@gmail.com" />
          </Field>
          <Field label="Booking website">
            <input value={form.bookingUrl ?? ''} onChange={(event) => set('bookingUrl', event.target.value)} className={adminFieldClass} placeholder="https://www.rlholidays.com" />
          </Field>
        </div>
      </div>

      <SaveBar
        saved={saved}
        saving={saving}
        error={error}
        saveLabel="Save package"
        viewHref={stayPath(form)}
        viewLabel="View on site"
        onSave={persist}
        onDelete={!isNew ? () => {
          if (window.confirm('Delete this package?')) {
            void deletePackage(form.id)
              .then(() => navigate('/admin/packages'))
              .catch((caught) => setError(caught instanceof Error ? caught.message : 'Could not delete.'));
          }
        } : undefined} />
    </div>
  );
}
