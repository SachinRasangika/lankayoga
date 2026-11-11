import { useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';
import { adminFieldClass } from './ui';

export function ChipList({
  values,
  onChange,
  placeholder
}: {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}) {
  const [draft, setDraft] = useState('');

  function add() {
    const next = draft.trim();
    if (!next || values.includes(next)) {
      setDraft('');
      return;
    }
    onChange([...values, next]);
    setDraft('');
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
        {values.map((value) =>
          <span key={value} className="inline-flex max-w-full items-center gap-1 rounded-full bg-warm py-1 pl-3 pr-1 text-sm text-ink">
            <span className="truncate">{value}</span>
            <button
              type="button"
              aria-label={`Remove ${value}`}
              onClick={() => onChange(values.filter((item) => item !== value))}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-raised hover:text-ink">
              <XIcon className="h-3.5 w-3.5" />
            </button>
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className={adminFieldClass} />
        <button
          type="button"
          onClick={add}
          className="inline-flex min-h-12 shrink-0 items-center gap-1 rounded-xl border border-line px-3.5 text-sm font-medium text-ink hover:border-sage-400">
          <PlusIcon className="h-4 w-4" />
          Add
        </button>
      </div>
    </div>
  );
}
