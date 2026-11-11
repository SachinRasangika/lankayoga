import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TimetableClass, WeekDay } from '../types';
import { weekDays } from '../data/weekSchedule';
import { ChipList } from './ChipList';
import { emptyTimetable, useContent } from './content';
import { SaveBar } from './SaveBar';
import { adminFieldClass, Field, Segmented } from './ui';

export function TimetableEditor() {
  const { id } = useParams();
  const isNew = id === 'new' || !id;
  const navigate = useNavigate();
  const { ready, timetable, saveTimetable, deleteTimetable } = useContent();
  const existing = useMemo(() => timetable.find((item) => item.id === id), [id, timetable]);
  const [form, setForm] = useState<TimetableClass>(() => existing ?? emptyTimetable());
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isNew && existing) setForm(existing);
  }, [existing, isNew]);

  function set<K extends keyof TimetableClass>(key: K, value: TimetableClass[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function persist() {
    void (async () => {
      setSaving(true);
      setError(null);
      try {
        const nextOrder = form.sortOrder || Math.max(0, ...timetable.map((item) => item.sortOrder)) + 10;
        const stored = await saveTimetable({ ...form, sortOrder: nextOrder });
        setSaved(true);
        if (isNew) navigate(`/admin/timetable/${stored.id}`, { replace: true });
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Could not save.');
      } finally {
        setSaving(false);
      }
    })();
  }

  if (!ready) return <p className="text-sm text-muted">Loading class…</p>;
  if (!isNew && !existing) {
    return <p className="text-sm text-muted">That class is gone. <Link to="/admin/timetable" className="underline">Back to the week</Link></p>;
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-6">
      <div>
        <Link to="/admin/timetable" className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">← Timetable</Link>
        <h1 className="mt-1 font-display text-3xl font-light tracking-tight sm:text-4xl">{isNew ? 'New weekly class' : form.name || 'Edit class'}</h1>
        <p className="mt-1 text-sm text-muted">Guests see this on the classes page only when Live.</p>
      </div>
      <Segmented
        value={form.status ?? 'draft'}
        onChange={(status) => set('status', status)}
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'published', label: 'Live on site' }
        ]} />
      <Field label="Day">
        <Segmented value={form.weekday} onChange={(weekday: WeekDay) => set('weekday', weekday)} options={weekDays.map((day) => ({ value: day, label: day.slice(0, 3) }))} />
      </Field>
      <Field label="Class name">
        <input value={form.name} onChange={(event) => set('name', event.target.value)} className={adminFieldClass} placeholder="Sunrise Flow" />
      </Field>
      <Field label="Teacher">
        <input value={form.instructor} onChange={(event) => set('instructor', event.target.value)} className={adminFieldClass} placeholder="Shey" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Shown time">
          <input value={form.time} onChange={(event) => set('time', event.target.value)} className={adminFieldClass} placeholder="6:45 AM" />
        </Field>
        <Field label="Length">
          <input value={form.duration} onChange={(event) => set('duration', event.target.value)} className={adminFieldClass} placeholder="60 min" />
        </Field>
      </div>
      <Field label="Price">
        <input value={form.price} onChange={(event) => set('price', event.target.value)} className={adminFieldClass} placeholder="Included or 3,500 LKR" />
      </Field>
      <Field label="Booking times" hint="Guests pick one of these on the booking page. Include the shown time.">
        <ChipList values={form.slots} onChange={(slots) => set('slots', slots)} placeholder="6:45 AM" />
      </Field>
      <Field label="Description">
        <textarea value={form.description} onChange={(event) => set('description', event.target.value)} rows={4} className={adminFieldClass} />
      </Field>
      <Field label="Extra label" hint="Optional. For example, Ladies Only.">
        <input value={form.emphasis} onChange={(event) => set('emphasis', event.target.value)} className={adminFieldClass} />
      </Field>
      <label className="flex min-h-12 items-center gap-3 rounded-xl border border-line px-3.5 text-sm">
        <input type="checkbox" checked={form.bookAhead} onChange={(event) => set('bookAhead', event.target.checked)} className="h-4 w-4 accent-sage-800" />
        Guests must book ahead
      </label>
      <SaveBar
        saved={saved}
        saving={saving}
        error={error}
        saveLabel="Save class"
        viewHref={`/classes/book/${form.id}`}
        viewLabel="Preview booking"
        onSave={persist}
        onDelete={!isNew ? () => {
          if (window.confirm('Delete this class?')) {
            void deleteTimetable(form.id)
              .then(() => navigate('/admin/timetable'))
              .catch((caught) => setError(caught instanceof Error ? caught.message : 'Could not delete.'));
          }
        } : undefined} />
    </div>
  );
}
