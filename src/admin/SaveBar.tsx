import { ExternalLinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function SaveBar({
  saved,
  saving,
  error,
  saveLabel,
  viewHref,
  viewLabel,
  onSave,
  onDelete
}: {
  saved: boolean;
  saving?: boolean;
  error?: string | null;
  saveLabel: string;
  viewHref?: string;
  viewLabel?: string;
  onSave: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-raised/95 px-4 pt-3 backdrop-blur lg:left-60" style={{ paddingBottom: 'max(0.85rem, env(safe-area-inset-bottom))' }}>
      <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-h-[1.25rem] items-center justify-between gap-3">
          {error ? <p className="text-sm text-terracotta-600">{error}</p> : saved ? <p className="text-sm font-medium text-sage-700 dark:text-sage-300">Saved</p> : <span />}
          {onDelete ?
            <button type="button" onClick={onDelete} className="text-sm text-muted hover:text-terracotta-700 sm:order-none">
              Delete
            </button> :
            null}
        </div>
        <div className={viewHref ? 'grid grid-cols-2 gap-2 sm:flex sm:justify-end' : 'flex justify-end'}>
          {viewHref ?
            <Link
              to={viewHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium text-ink sm:min-h-0 sm:py-2">
              {viewLabel ?? 'View on site'}
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </Link> :
            null}
          <Button type="button" className="min-h-12 sm:min-h-0" onClick={onSave} disabled={saving}>
            {saving ? 'Saving…' : saveLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({
  status,
  onClick
}: {
  status: 'draft' | 'published';
  onClick?: () => void;
}) {
  const live = status === 'published';
  const className = `inline-flex min-h-10 items-center rounded-full px-3 text-xs font-medium uppercase tracking-wider sm:min-h-8 ${live ? 'bg-sage-100 text-sage-800 dark:bg-sage-800/60 dark:text-sage-100' : 'bg-warm text-muted'}`;
  if (!onClick) {
    return <span className={className}>{live ? 'Live' : 'Draft'}</span>;
  }
  return (
    <button type="button" onClick={onClick} className={className} aria-label={live ? 'Mark as draft' : 'Publish to site'}>
      {live ? 'Live' : 'Draft'}
    </button>
  );
}
