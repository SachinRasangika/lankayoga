import { useState } from 'react';
import { ImagePlusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { mediaLibrary } from '../../data/media';
import { supabase } from '../../lib/supabase';
import { adminFieldClass } from '../ui';
import { sectionDefaults, type SectionId } from './catalog';
import { useSiteSections } from './store';

const HIDDEN = new Set(['id', 'bars', 'external', 'hidden']);
const IMAGE_KEYS = new Set(['image', 'src', 'foreground']);
const LONG_KEYS = new Set(['body', 'line', 'note', 'lede', 'detail', 'caption', 'goodFor', 'sound', 'summary', 'description', 'alt', 'imageAlt']);

const LABELS: Record<string, string> = {
  kicker: 'Top line',
  scrollHint: 'Scroll hint',
  eyebrow: 'Small heading',
  title: 'Heading',
  titleEmphasis: 'Heading emphasis',
  body: 'Text',
  lede: 'Intro',
  line: 'Line',
  emphasis: 'Emphasis',
  note: 'Note',
  caption: 'Caption',
  alt: 'Image description',
  imageAlt: 'Image description',
  image: 'Image',
  src: 'Image',
  foreground: 'Foreground image',
  cta: 'Button',
  button: 'Button',
  detail: 'Detail',
  tab: 'Tab',
  to: 'Link',
  href: 'Link',
  value: 'Value',
  label: 'Label',
  stat: 'Number',
  months: 'Months',
  name: 'Name',
  goodFor: 'Best for',
  time: 'Time',
  sound: 'Sound',
  step: 'Step',
  slides: 'Slides',
  items: 'Items',
  moments: 'Moments',
  frames: 'Photos',
  steps: 'Steps',
  stats: 'Numbers',
  images: 'Photos',
  lines: 'Lines',
  meta: 'Facts',
  details: 'Details',
  hint: 'Small note'
};

function labelFor(key: string): string {
  return LABELS[key] ?? key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}

function itemTitle(value: unknown, index: number): string {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    for (const key of ['title', 'name', 'label', 'tab', 'months', 'step', 'caption']) {
      if (typeof record[key] === 'string' && record[key]) return record[key] as string;
    }
  }
  if (typeof value === 'string' && value) return value;
  return `Item ${index + 1}`;
}

function singular(label: string): string {
  if (label.endsWith('ies')) return `${label.slice(0, -3)}y`;
  if (label.endsWith('s') && !label.endsWith('ss')) return label.slice(0, -1);
  return label;
}

function sampleAt(sectionId: string, path: (string | number)[]): unknown {
  let current: unknown = sectionDefaults[sectionId as SectionId];
  for (const part of path) {
    if (Array.isArray(current)) {
      current = current[Number(part)] ?? current[0];
      continue;
    }
    if (current && typeof current === 'object') {
      current = (current as Record<string, unknown>)[String(part)];
      continue;
    }
    return undefined;
  }
  return Array.isArray(current) ? current[0] : undefined;
}

function duplicateItem(sample: unknown): unknown {
  if (typeof sample === 'string') return '';
  const copy = JSON.parse(JSON.stringify(sample)) as unknown;
  if (copy && typeof copy === 'object' && !Array.isArray(copy)) {
    const record = copy as Record<string, unknown>;
    if (typeof record.id === 'string') record.id = `item-${Date.now().toString(36)}`;
    for (const key of ['title', 'name', 'label', 'line', 'body', 'note', 'caption', 'tab']) {
      if (typeof record[key] === 'string') record[key] = '';
    }
  }
  return copy;
}

function ImageField({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    if (!supabase) {
      setError('Connect the database to upload a new photo. You can still pick one from the library.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Keep photos under 5 MB.');
      return;
    }
    setBusy(true);
    setError(null);
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from('media').upload(path, file, { upsert: false });
    setBusy(false);
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    onChange(supabase.storage.from('media').getPublicUrl(path).data.publicUrl);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-2">
      {value ?
        <img src={value} alt="" className="h-28 w-full rounded-xl object-cover" /> :
        <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-line text-xs text-muted">No photo</div>}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full border border-line px-3 text-xs font-medium text-ink">
          Library
        </button>
        <label className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-1 rounded-full border border-line px-3 text-xs font-medium text-ink">
          <ImagePlusIcon className="h-3.5 w-3.5" />
          {busy ? 'Uploading…' : 'Upload'}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={busy}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = '';
              if (file) void upload(file);
            }} />
        </label>
      </div>
      {open ?
        <div className="grid max-h-40 grid-cols-4 gap-1 overflow-y-auto rounded-xl border border-line p-1">
          {mediaLibrary.map((item) =>
            <button
              key={item.key}
              type="button"
              onClick={() => { onChange(item.src); setOpen(false); }}
              className="overflow-hidden rounded-lg">
              <img src={item.src} alt={item.label} className="h-12 w-full object-cover" />
            </button>
          )}
        </div> :
        null}
      {error ? <p className="text-xs text-terracotta-700">{error}</p> : null}
    </div>
  );
}

function ListField({
  sectionId,
  fieldKey,
  path,
  value,
  onChange
}: {
  sectionId: string;
  fieldKey: string;
  path: (string | number)[];
  value: unknown[];
  onChange: (next: unknown) => void;
}) {
  const sample = sampleAt(sectionId, path);
  const [openIndex, setOpenIndex] = useState(0);
  const name = labelFor(fieldKey);
  const one = singular(name).toLowerCase();

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-ink">{name}</span>
        <button
          type="button"
          onClick={() => {
            const seed = value.length > 0 ? value[value.length - 1] : sample;
            if (seed === undefined) return;
            onChange([...value, duplicateItem(seed)]);
            setOpenIndex(value.length);
          }}
          className="inline-flex items-center gap-1 rounded-full bg-sand-900 px-3 py-1.5 text-xs font-semibold text-white">
          <PlusIcon className="h-3.5 w-3.5" />
          Add {one}
        </button>
      </div>
      {value.length === 0 ?
        <p className="rounded-xl border border-dashed border-line px-3 py-4 text-sm text-muted">Nothing here. Add a {one} if you want it on the page.</p> :
        value.map((item, index) => {
          const open = openIndex === index;
          return (
            <div key={index} className="rounded-xl border border-line bg-raised">
              <div className="flex items-center gap-2 px-3 py-2">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="min-w-0 flex-1 truncate text-left text-sm font-medium text-ink">
                  {itemTitle(item, index)}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChange(value.filter((_, itemIndex) => itemIndex !== index));
                    setOpenIndex((current) => current === index ? -1 : current > index ? current - 1 : current);
                  }}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-terracotta-700 hover:bg-warm">
                  <Trash2Icon className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
              {open ?
                <div className="flex flex-col gap-3 border-t border-line px-3 py-3">
                  {typeof item === 'string' ?
                    <FieldEditor sectionId={sectionId} fieldKey="line" path={[...path, index]} value={item} onChange={(next) => {
                      const copy = value.slice();
                      copy[index] = next;
                      onChange(copy);
                    }} /> :
                    item && typeof item === 'object' ?
                      entriesOf(item as Record<string, unknown>).map(([key, child]) =>
                        <FieldEditor
                          key={key}
                          sectionId={sectionId}
                          fieldKey={key}
                          path={[...path, index, key]}
                          value={child}
                          onChange={(next) => {
                            const copy = value.slice();
                            copy[index] = { ...(item as Record<string, unknown>), [key]: next };
                            onChange(copy);
                          }} />
                      ) :
                      null}
                </div> :
                null}
            </div>
          );
        })}
    </div>
  );
}

function entriesOf(record: Record<string, unknown>): [string, unknown][] {
  return Object.entries(record)
    .filter(([key]) => !HIDDEN.has(key))
    .sort(([, left], [, right]) => rank(left) - rank(right));
}

function rank(value: unknown): number {
  if (typeof value === 'string') return 0;
  if (Array.isArray(value)) return 2;
  return 1;
}

function FieldEditor({
  sectionId,
  fieldKey,
  path,
  value,
  onChange
}: {
  sectionId: string;
  fieldKey: string;
  path: (string | number)[];
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  if (HIDDEN.has(fieldKey)) return null;

  if (typeof value === 'string' && IMAGE_KEYS.has(fieldKey)) {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-muted">{labelFor(fieldKey)}</span>
        <ImageField value={value} onChange={onChange} />
      </label>
    );
  }

  if (typeof value === 'string') {
    const long = LONG_KEYS.has(fieldKey) || value.length > 90;
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-muted">{labelFor(fieldKey)}</span>
        {long ?
          <textarea value={value} rows={3} onChange={(event) => onChange(event.target.value)} className={adminFieldClass} /> :
          <input value={value} onChange={(event) => onChange(event.target.value)} className={adminFieldClass} />}
      </label>
    );
  }

  if (typeof value === 'number' || typeof value === 'boolean') return null;

  if (Array.isArray(value)) {
    return (
      <ListField
        sectionId={sectionId}
        fieldKey={fieldKey}
        path={path}
        value={value}
        onChange={onChange} />
    );
  }

  if (value && typeof value === 'object') {
    return (
      <div className="flex flex-col gap-3">
        {entriesOf(value as Record<string, unknown>).map(([key, child]) =>
          <FieldEditor
            key={key}
            sectionId={sectionId}
            fieldKey={key}
            path={[...path, key]}
            value={child}
            onChange={(next) => onChange({ ...(value as Record<string, unknown>), [key]: next })} />
        )}
      </div>
    );
  }

  return null;
}

export function SectionEditor({ id }: { id: string }) {
  const { resolve, update, error } = useSiteSections();
  const value = resolve(id);

  return (
    <div className="flex flex-col gap-4">
      {value && typeof value === 'object' ?
        entriesOf(value as Record<string, unknown>).map(([key, child]) =>
          <FieldEditor
            key={key}
            sectionId={id}
            fieldKey={key}
            path={[key]}
            value={child}
            onChange={(next) => update(id, [key], next)} />
        ) :
        null}
      {error ? <p className="text-sm text-terracotta-700">{error}</p> : null}
    </div>
  );
}
