import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ClassOffering, PublishStatus } from '../types';
import { classPath } from '../utils/stays';
import { emptyClass, useContent } from './content';
import { ImagePicker } from './ImagePicker';
import { SaveBar } from './SaveBar';
import { SeoFieldsEditor } from './SeoFieldsEditor';
import { adminFieldClass, Field, Segmented } from './ui';

export function ClassEditor() {
  const { id } = useParams();
  const isNew = id === 'new' || !id;
  const navigate = useNavigate();
  const { ready, classes, saveClass, deleteClass } = useContent();
  const existing = useMemo(() => classes.find((item) => item.id === id), [id, classes]);
  const [form, setForm] = useState<ClassOffering>(() => existing ?? emptyClass());
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

  function set<K extends keyof ClassOffering>(key: K, value: ClassOffering[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function persist() {
    void (async () => {
      setSaving(true);
      setError(null);
      try {
        const nextOrder = form.sortOrder || Math.max(0, ...classes.map((item) => item.sortOrder)) + 10;
        const stored = await saveClass({ ...form, sortOrder: isNew && !form.sortOrder ? nextOrder : form.sortOrder });
        setSaved(true);
        if (isNew) navigate(`/admin/classes/${stored.id}`, { replace: true });
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Could not save.');
      } finally {
        setSaving(false);
      }
    })();
  }

  if (!ready) {
    return <p className="text-sm text-muted">Loading class…</p>;
  }

  if (!isNew && !existing) {
    return <p className="text-sm text-muted">That class is gone. <Link to="/admin/classes" className="underline">Back to list</Link></p>;
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <Link to="/admin/classes" className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">← Classes</Link>
          <h1 className="mt-1 font-display text-3xl font-light tracking-tight sm:text-4xl">{isNew ? 'New class' : form.name || 'Edit class'}</h1>
          <p className="mt-1 text-sm text-muted">Guests see this on the class page only when Live</p>
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
            <input value={form.name} onChange={(event) => set('name', event.target.value)} className={adminFieldClass} placeholder="Sunrise asana" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Time">
              <input value={form.time} onChange={(event) => set('time', event.target.value)} className={adminFieldClass} placeholder="06:30" />
            </Field>
            <Field label="Duration">
              <input value={form.duration} onChange={(event) => set('duration', event.target.value)} className={adminFieldClass} placeholder="75 min" />
            </Field>
          </div>
          <Field label="Level">
            <input value={form.level} onChange={(event) => set('level', event.target.value)} className={adminFieldClass} placeholder="All levels" />
          </Field>
          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(event) => set('description', event.target.value)}
              rows={5}
              className={adminFieldClass}
              placeholder="What happens in this hour." />
          </Field>
          <Field label="Photo caption">
            <input value={form.alt} onChange={(event) => set('alt', event.target.value)} className={adminFieldClass} placeholder="Bare feet on a cotton mat" />
          </Field>
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <Field label="Sort order" hint="Lower numbers appear first.">
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={form.sortOrder}
              onChange={(event) => set('sortOrder', Number(event.target.value) || 0)}
              className={adminFieldClass} />
          </Field>
          <Field label="Photo" hint="The first photo is the cover on the Classes page.">
            <ImagePicker
              values={form.image ? [form.image] : []}
              onChange={(images) => {
                setForm((current) => ({ ...current, image: images[0] ?? '' }));
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
        saveLabel="Save class"
        viewHref={classPath(form)}
        viewLabel="View on site"
        onSave={persist}
        onDelete={!isNew ? () => {
          if (window.confirm('Delete this class?')) {
            void deleteClass(form.id)
              .then(() => navigate('/admin/classes'))
              .catch((caught) => setError(caught instanceof Error ? caught.message : 'Could not delete.'));
          }
        } : undefined} />
    </div>
  );
}
