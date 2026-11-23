import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { journalCategories } from '../data/journal';
import { JournalPost, PublishStatus } from '../types';
import { slugFromTitle } from '../utils/format';
import { emptyPost, useContent } from './content';
import { ImagePicker } from './ImagePicker';
import { SaveBar } from './SaveBar';
import { SeoFieldsEditor } from './SeoFieldsEditor';
import { adminFieldClass, Field, Segmented } from './ui';

const categories = journalCategories.filter((item) => item !== 'All');

export function BlogEditor() {
  const { id } = useParams();
  const isNew = id === 'new' || !id;
  const navigate = useNavigate();
  const { ready, posts, savePost, deletePost } = useContent();
  const existing = useMemo(() => posts.find((item) => item.id === id), [id, posts]);
  const [form, setForm] = useState<JournalPost>(() => existing ?? emptyPost());
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

  function set<K extends keyof JournalPost>(key: K, value: JournalPost[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function persist() {
    void (async () => {
      setSaving(true);
      setError(null);
      try {
        const stored = await savePost({
          ...form,
          slug: form.slug?.trim() || slugFromTitle(form.title)
        });
        setSaved(true);
        if (isNew) navigate(`/admin/blog/${stored.id}`, { replace: true });
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Could not save.');
      } finally {
        setSaving(false);
      }
    })();
  }

  if (!ready) {
    return <p className="text-sm text-muted">Loading note…</p>;
  }

  if (!isNew && !existing) {
    return <p className="text-sm text-muted">That note is gone. <Link to="/admin/blog" className="underline">Back to journal</Link></p>;
  }

  const slug = form.slug || slugFromTitle(form.title);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <Link to="/admin/blog" className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">← Journal</Link>
          <h1 className="mt-1 font-display text-3xl font-light tracking-tight sm:text-4xl">{isNew ? 'Write a note' : form.title || 'Edit note'}</h1>
          <p className="mt-1 text-sm text-muted">Guests see this only when Live</p>
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
            <input
              value={form.title}
              onChange={(event) => {
                const title = event.target.value;
                setForm((current) => ({
                  ...current,
                  title,
                  slug: isNew ? slugFromTitle(title) : current.slug
                }));
                setSaved(false);
              }}
              className={adminFieldClass}
              placeholder="Practising through the monsoon" />
          </Field>
          <Field label="Card excerpt">
            <textarea
              value={form.excerpt}
              onChange={(event) => set('excerpt', event.target.value)}
              rows={2}
              className={adminFieldClass}
              placeholder="One or two lines for the journal list." />
          </Field>
          <Field label="Full note" hint="Plain text is enough. Guests see this on the article page.">
            <textarea
              value={form.body ?? ''}
              onChange={(event) => set('body', event.target.value)}
              rows={14}
              className={`${adminFieldClass} min-h-[18rem] leading-relaxed`} />
          </Field>
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <Field label="Category">
            <Segmented
              value={form.category}
              onChange={(category) => set('category', category)}
              options={categories.map((item) => ({ value: item, label: item }))} />
          </Field>
          <Field label="Date">
            <input type="date" value={form.date} onChange={(event) => set('date', event.target.value)} className={adminFieldClass} />
          </Field>
          <Field label="Author">
            <input value={form.author} onChange={(event) => set('author', event.target.value)} className={adminFieldClass} />
          </Field>
          <Field label="Photos" hint="Add several. The first one is the cover on the journal card.">
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
        </div>
      </div>

      <SaveBar
        saved={saved}
        saving={saving}
        error={error}
        saveLabel="Save note"
        viewHref={`/journal/${slug}`}
        viewLabel="View on site"
        onSave={persist}
        onDelete={!isNew ? () => {
          if (window.confirm('Delete this note?')) {
            void deletePost(form.id)
              .then(() => navigate('/admin/blog'))
              .catch((caught) => setError(caught instanceof Error ? caught.message : 'Could not delete.'));
          }
        } : undefined} />
    </div>
  );
}
