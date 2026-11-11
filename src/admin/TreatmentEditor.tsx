import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Dosha, PublishStatus, Therapy } from '../types';
import { treatmentPath } from '../utils/stays';
import { emptyTreatment, useContent } from './content';
import { ImagePicker } from './ImagePicker';
import { SaveBar } from './SaveBar';
import { SeoFieldsEditor } from './SeoFieldsEditor';
import { adminFieldClass, Field, Segmented } from './ui';

const doshaOptions: {value: Dosha;label: string;}[] = [
  { value: 'vata', label: 'Vata' },
  { value: 'pitta', label: 'Pitta' },
  { value: 'kapha', label: 'Kapha' }
];

export function TreatmentEditor() {
  const { id } = useParams();
  const isNew = id === 'new' || !id;
  const navigate = useNavigate();
  const { ready, treatments, saveTreatment, deleteTreatment } = useContent();
  const existing = useMemo(() => treatments.find((item) => item.id === id), [id, treatments]);
  const [form, setForm] = useState<Therapy>(() => existing ?? emptyTreatment());
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

  function set<K extends keyof Therapy>(key: K, value: Therapy[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function persist() {
    void (async () => {
      setSaving(true);
      setError(null);
      try {
        const nextOrder = form.sortOrder || Math.max(0, ...treatments.map((item) => item.sortOrder ?? 0)) + 10;
        const stored = await saveTreatment({ ...form, sortOrder: isNew && !form.sortOrder ? nextOrder : form.sortOrder });
        setSaved(true);
        if (isNew) navigate(`/admin/treatments/${stored.id}`, { replace: true });
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Could not save.');
      } finally {
        setSaving(false);
      }
    })();
  }

  if (!ready) {
    return <p className="text-sm text-muted">Loading treatment…</p>;
  }

  if (!isNew && !existing) {
    return <p className="text-sm text-muted">That treatment is gone. <Link to="/admin/treatments" className="underline">Back to list</Link></p>;
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <Link to="/admin/treatments" className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">← Treatments</Link>
          <h1 className="mt-1 font-display text-3xl font-light tracking-tight sm:text-4xl">{isNew ? 'New treatment' : form.name || 'Edit treatment'}</h1>
          <p className="mt-1 text-sm text-muted">Guests see this on the treatment page only when Live</p>
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
          <Field label="Name">
            <input value={form.name} onChange={(event) => set('name', event.target.value)} className={adminFieldClass} placeholder="Abhyanga" />
          </Field>
          <Field label="Duration">
            <input value={form.duration} onChange={(event) => set('duration', event.target.value)} className={adminFieldClass} placeholder="60 min" />
          </Field>
          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(event) => set('description', event.target.value)}
              rows={5}
              className={adminFieldClass}
              placeholder="Warm oil, four hands, one rhythm." />
          </Field>
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <Field label="Doshas">
            <div className="flex flex-col gap-2">
              {doshaOptions.map((option) => {
                const checked = form.doshas.includes(option.value);
                return (
                  <label key={option.value} className="flex min-h-12 items-center gap-3 rounded-xl border border-line px-3.5 text-sm">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-sage-800"
                      checked={checked}
                      onChange={() => {
                        set(
                          'doshas',
                          checked ?
                            form.doshas.filter((item) => item !== option.value) :
                            [...form.doshas, option.value]
                        );
                      }} />
                    {option.label}
                  </label>
                );
              })}
            </div>
          </Field>
          <Field label="Sort order" hint="Lower numbers appear first.">
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={form.sortOrder ?? 0}
              onChange={(event) => set('sortOrder', Number(event.target.value) || 0)}
              className={adminFieldClass} />
          </Field>
          <Field label="Photo caption">
            <input value={form.alt ?? ''} onChange={(event) => set('alt', event.target.value)} className={adminFieldClass} placeholder="Warm oil poured into cupped hands" />
          </Field>
          <Field label="Photos" hint="Add several. The first one is the cover on the treatment page.">
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
            onSlugChange={(value) => set('slug', value)}
            onTitleChange={(value) => set('seoTitle', value)}
            onDescriptionChange={(value) => set('seoDescription', value)} />
        </div>
      </div>

      <SaveBar
        saved={saved}
        saving={saving}
        error={error}
        saveLabel="Save treatment"
        viewHref={treatmentPath(form)}
        viewLabel="View on site"
        onSave={persist}
        onDelete={!isNew ? () => {
          if (window.confirm('Delete this treatment?')) {
            void deleteTreatment(form.id)
              .then(() => navigate('/admin/treatments'))
              .catch((caught) => setError(caught instanceof Error ? caught.message : 'Could not delete.'));
          }
        } : undefined} />
    </div>
  );
}
