import { useState } from 'react';
import { StarIcon, XIcon } from 'lucide-react';
import { mediaLibrary } from '../data/media';
import { supabase } from '../lib/supabase';
import { cn } from '../utils/cn';
import { normalizeGallery } from '../utils/gallery';

const MAX_PHOTOS = 12;
const MAX_BYTES = 5 * 1024 * 1024;

export function ImagePicker({
  values,
  onChange
}: {
  values: string[];
  onChange: (src: string[]) => void;
}) {
  const photos = normalizeGallery('', values);
  const [open, setOpen] = useState(photos.length === 0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function commit(next: string[]) {
    onChange(normalizeGallery('', next).slice(0, MAX_PHOTOS));
  }

  async function uploadFiles(files: File[]) {
    if (!supabase) {
      setError('The database is not connected yet.');
      return;
    }
    const room = MAX_PHOTOS - photos.length;
    if (room <= 0) {
      setError(`You can add up to ${MAX_PHOTOS} photos.`);
      return;
    }

    setBusy(true);
    setError(null);
    const next = [...photos];
    let lastError: string | null = null;

    for (const file of files.slice(0, room)) {
      if (file.size > MAX_BYTES) {
        lastError = 'Keep photos under 5 MB so the free plan stays clear.';
        continue;
      }
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from('media').upload(path, file, { upsert: false });
      if (uploadError) {
        lastError = uploadError.message;
        continue;
      }
      next.push(supabase.storage.from('media').getPublicUrl(path).data.publicUrl);
    }

    setBusy(false);
    commit(next);
    if (lastError) setError(lastError);
  }

  return (
    <div className="flex flex-col gap-3">
      {photos.length > 0 ?
        <div className="grid grid-cols-2 gap-2">
          {photos.map((src, index) =>
            <div key={src} className="relative overflow-hidden rounded-2xl">
              <img src={src} alt="" className={cn('h-28 w-full object-cover', index === 0 && 'sm:h-36')} />
              {index === 0 ?
                <span className="absolute left-2 top-2 rounded-full bg-sand-900/75 px-2 py-0.5 text-[0.625rem] uppercase tracking-wider text-white">
                  Cover
                </span> :
                null}
              <div className="absolute right-2 top-2 flex gap-1">
                {index !== 0 ?
                  <button
                    type="button"
                    aria-label="Use as cover"
                    onClick={() => commit([src, ...photos.filter((item) => item !== src)])}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-900/75 text-white hover:bg-sand-900">
                    <StarIcon className="h-3.5 w-3.5" />
                  </button> :
                  null}
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() => commit(photos.filter((item) => item !== src))}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-900/75 text-white hover:bg-sand-900">
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div> :
        <div className="flex h-36 items-center justify-center rounded-2xl border border-dashed border-line text-sm text-muted">
          No photos yet
        </div>}

      <label className="inline-flex min-h-12 w-full scroll-mb-28 cursor-pointer items-center justify-center rounded-full border border-line px-4 text-sm font-medium text-ink hover:border-sage-400 sm:w-auto">
        {busy ? 'Uploading…' : 'Upload photos'}
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          disabled={busy}
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            event.target.value = '';
            if (files.length) void uploadFiles(files);
          }} />
      </label>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-12 w-full scroll-mb-28 items-center justify-center rounded-full border border-line px-4 text-sm font-medium text-ink hover:border-sage-400 sm:w-auto">
        {open ? 'Hide library' : 'Add from site library'}
      </button>
      {error ? <p className="text-sm text-terracotta-600">{error}</p> : null}
      <p className="text-xs text-muted">{photos.length}/{MAX_PHOTOS} photos. First photo is the cover.</p>
      {open ?
        <div className="grid max-h-80 grid-cols-2 gap-2 overflow-y-auto rounded-2xl border border-line p-2 sm:grid-cols-3 lg:grid-cols-2">
          {mediaLibrary.map((item) => {
            const added = photos.includes(item.src);
            return (
              <button
                key={item.key}
                type="button"
                title={added ? 'Already added' : `Add ${item.label}`}
                disabled={added || photos.length >= MAX_PHOTOS}
                onClick={() => commit([...photos, item.src])}
                className={cn(
                  'scroll-mb-28 overflow-hidden rounded-xl ring-offset-2 ring-offset-raised',
                  added ? 'ring-2 ring-sage-600 opacity-80' : 'hover:opacity-90 disabled:opacity-40'
                )}>
                <img src={item.src} alt={item.label} className="aspect-[4/3] w-full object-cover" />
                <span className="block truncate px-2 py-1.5 text-left text-[0.6875rem] text-muted">{item.label}</span>
              </button>
            );
          })}
        </div> :
        null}
    </div>
  );
}
