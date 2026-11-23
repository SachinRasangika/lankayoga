import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CopyIcon, PlusIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';
import { formatPrice, formatStayDates } from '../utils/format';
import { statusOf, useContent } from './content';
import { comparePrograms } from '../utils/stays';
import { StatusBadge } from './SaveBar';
import { adminFieldClass, Segmented } from './ui';
import { Program, ProgramKind, PublishStatus } from '../types';

export function PackageList() {
  const { ready, packages, patchPackage, duplicatePackage, deletePackage } = useContent();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<'all' | ProgramKind>('all');
  const [status, setStatus] = useState<'all' | PublishStatus>('all');

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return packages.filter((program) => {
      if (kind !== 'all' && program.kind !== kind) return false;
      if (status !== 'all' && statusOf(program) !== status) return false;
      if (!needle) return true;
      return `${program.title} ${program.summary}`.toLowerCase().includes(needle);
    }).sort(comparePrograms);
  }, [kind, packages, query, status]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-muted">Packages</p>
          <h1 className="mt-1 font-display text-3xl font-light tracking-tight sm:text-4xl">Dates and prices</h1>
        </div>
        <ButtonLink to="/admin/packages/new" size="sm" className="shrink-0">
          <PlusIcon className="h-4 w-4" />
          <span className="sm:hidden">New</span>
          <span className="hidden sm:inline">New package</span>
        </ButtonLink>
      </div>

      <label className="relative block">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search packages"
          className={`${adminFieldClass} pl-10`} />
      </label>
      <div className="flex flex-col gap-2">
        <Segmented
          value={kind}
          onChange={setKind}
          options={[
            { value: 'all', label: 'All' },
            { value: 'retreat', label: 'Retreats' },
            { value: 'training', label: 'Training' },
            { value: 'panchakarma', label: 'Healing' }
          ]} />
        <Segmented
          value={status}
          onChange={setStatus}
          options={[
            { value: 'all', label: 'Any status' },
            { value: 'published', label: 'Live' },
            { value: 'draft', label: 'Draft' }
          ]} />
        <p className="text-xs text-muted">Open a card to edit. Use Live or Draft to show or hide it on the site.</p>
      </div>

      {!ready ? <p className="text-sm text-muted">Loading packages…</p> : null}

      <ul className="flex flex-col gap-3">
        {rows.map((program) =>
          <PackageCard
            key={program.id}
            program={program}
            onDuplicate={() => {
              void duplicatePackage(program.id).then((copy) => {
                if (copy) navigate(`/admin/packages/${copy.id}`);
              }).catch((caught: unknown) => {
                window.alert(caught instanceof Error ? caught.message : 'Could not duplicate.');
              });
            }}
            onDelete={() => {
              if (window.confirm(`Delete ${program.title}?`)) {
                void deletePackage(program.id).catch((caught: unknown) => {
                  window.alert(caught instanceof Error ? caught.message : 'Could not delete.');
                });
              }
            }}
            onToggle={() => void patchPackage(program.id, { status: statusOf(program) === 'published' ? 'draft' : 'published' }).catch((caught: unknown) => {
              window.alert(caught instanceof Error ? caught.message : 'Could not update.');
            })} />
        )}
      </ul>
      {rows.length === 0 && ready ? <p className="py-10 text-center text-sm text-muted">No packages match that.</p> : null}
    </div>
  );
}

function PackageCard({
  program,
  onDuplicate,
  onDelete,
  onToggle
}: {
  program: Program;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-raised">
      <Link to={`/admin/packages/${program.id}`} className="flex gap-3 p-3 sm:p-4">
        {program.image ?
          <img src={program.image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-28" /> :
          null}
        <span className="min-w-0 flex-1">
          <span className="block font-medium leading-snug text-ink">{program.title}</span>
          <span className="mt-1 block truncate text-sm text-muted">{formatStayDates(program)}</span>
          <span className="mt-2 block truncate text-sm text-ink">
            {formatPrice(program.priceUsd)} · {program.spotsLeft} of {program.capacity} spots
          </span>
        </span>
      </Link>
      <div className="flex items-center gap-1 border-t border-line px-2 py-2">
        <StatusBadge status={statusOf(program)} onClick={onToggle} />
        <span className="flex-1" />
        <button type="button" aria-label="Duplicate" onClick={onDuplicate} className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted hover:bg-warm hover:text-ink">
          <CopyIcon className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Delete" onClick={onDelete} className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted hover:bg-warm hover:text-terracotta-700">
          <Trash2Icon className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
