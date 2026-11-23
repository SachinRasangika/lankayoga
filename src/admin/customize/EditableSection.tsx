import type { ReactNode } from 'react';
import { EyeIcon, EyeOffIcon, PencilIcon } from 'lucide-react';
import { infoFor } from './catalog';
import { useCustomizeMode } from './CustomizeFrame';
import { SectionEditor } from './SectionEditor';
import { useSiteSections } from './store';

export function EditableSection({
  id,
  children
}: {
  id: string;
  children: ReactNode;
}) {
  const customizing = useCustomizeMode();
  const { isEditing, isHidden, saving, begin, cancel, save, setHidden } = useSiteSections();
  const editing = isEditing(id);
  const hidden = isHidden(id);
  const label = infoFor(id).label;

  if (!customizing) {
    if (hidden) return null;
    return <>{children}</>;
  }

  return (
    <div className={hidden ? 'relative' : editing ? 'relative outline outline-[4px] -outline-offset-1 outline-terracotta-600' : 'relative outline outline-[3px] -outline-offset-1 outline-terracotta-500'}>
      <div className={hidden
        ? 'sticky top-[calc(var(--customize-bar,0px)+var(--customize-header,0px))] z-[70] flex min-h-14 flex-wrap items-center justify-between gap-3 border-y border-dashed border-sand-400 bg-sand-100 px-4 py-2 text-sand-800 sm:px-6'
        : 'sticky top-[calc(var(--customize-bar,0px)+var(--customize-header,0px))] z-[70] flex min-h-14 flex-wrap items-center justify-between gap-3 bg-terracotta-600 px-4 py-2 text-white shadow-md sm:px-6'}>
        <p className="flex min-w-0 items-center gap-2 text-sm font-semibold sm:text-base">
          {hidden ? <EyeOffIcon className="h-4 w-4 shrink-0" /> : <PencilIcon className="h-4 w-4 shrink-0" />}
          <span className="truncate">{editing ? `Editing ${label}` : label}</span>
          {hidden ? <span className="shrink-0 rounded-full bg-sand-300 px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wide">Hidden</span> : null}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {hidden ?
            <button
              type="button"
              onClick={() => { void setHidden(id, false); }}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-full bg-sand-900 px-4 py-2 text-sm font-bold text-white shadow-md disabled:opacity-60">
              <EyeIcon className="h-4 w-4" />
              Show on site
            </button> :
            <>
              <button
                type="button"
                onClick={() => { void setHidden(id, true); }}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/50 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-60">
                <EyeOffIcon className="h-4 w-4" />
                Hide section
              </button>
              {editing ?
                <>
                  <button
                    type="button"
                    onClick={() => cancel(id)}
                    className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15">
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => { void save(id); }}
                    disabled={saving}
                    className="rounded-full bg-white px-5 py-2 text-sm font-bold text-terracotta-700 shadow-md disabled:opacity-60">
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                </> :
                <button
                  type="button"
                  onClick={() => begin(id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-sm font-bold text-terracotta-700 shadow-md">
                  <PencilIcon className="h-4 w-4" />
                  Edit
                </button>}
            </>}
        </div>
      </div>
      {hidden ? null : children}
      {editing && !hidden ?
        <aside className="fixed bottom-0 right-0 z-[80] flex max-h-[52dvh] w-full flex-col border-t-4 border-terracotta-600 bg-raised shadow-xl sm:bottom-4 sm:right-4 sm:max-h-[calc(100dvh-8rem)] sm:w-[26rem] sm:rounded-2xl sm:border-4">
          <div className="flex items-center justify-between gap-3 bg-terracotta-600 px-4 py-3 text-white">
            <div className="min-w-0">
              <p className="font-semibold">{label}</p>
              <p className="text-xs text-white/80">Changes appear on the page. Save keeps them.</p>
            </div>
            <button
              type="button"
              onClick={() => { void save(id); }}
              disabled={saving}
              className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-terracotta-700 disabled:opacity-60">
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
          <div className="overflow-y-auto px-4 py-4">
            <SectionEditor id={id} />
          </div>
        </aside> :
        null}
    </div>
  );
}
