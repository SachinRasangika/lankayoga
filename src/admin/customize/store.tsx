import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import { infoFor, sectionDefaults, type SectionId } from './catalog';

const STORAGE_KEY = 'lankayoga.siteSections';

type SavedMap = Record<string, unknown>;

interface SiteSectionsValue {
  warning: string | null;
  activeId: string | null;
  saving: boolean;
  error: string | null;
  isEditing: (id: string) => boolean;
  isDirty: (id: string) => boolean;
  isHidden: (id: string) => boolean;
  resolve: (id: string) => unknown;
  begin: (id: string) => void;
  cancel: (id: string) => void;
  update: (id: string, path: (string | number)[], value: unknown) => void;
  save: (id: string) => Promise<void>;
  setHidden: (id: string, hidden: boolean) => Promise<void>;
}

const SiteSectionsContext = createContext<SiteSectionsValue | null>(null);

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function mergeDefaults(defaults: unknown, saved: unknown): unknown {
  if (Array.isArray(defaults)) {
    if (!Array.isArray(saved)) return defaults;
    const sample = defaults[0];
    if (sample && typeof sample === 'object') {
      return saved.map((item) => mergeDefaults(sample, item));
    }
    return saved;
  }
  if (defaults && typeof defaults === 'object') {
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return defaults;
    const source = saved as Record<string, unknown>;
    const next: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(defaults as Record<string, unknown>)) {
      next[key] = key in source ? mergeDefaults(value, source[key]) : value;
    }
    if (typeof source.hidden === 'boolean') next.hidden = source.hidden;
    return next;
  }
  if (typeof defaults === 'string') return typeof saved === 'string' ? saved : defaults;
  if (typeof defaults === 'number') return typeof saved === 'number' ? saved : defaults;
  if (typeof defaults === 'boolean') return typeof saved === 'boolean' ? saved : defaults;
  return saved ?? defaults;
}

function readLocal(): SavedMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as SavedMap;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeLocal(map: SavedMap) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function missingTable(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  const message = error.message ?? '';
  return error.code === '42P01' || error.code === 'PGRST205' || /site_sections/i.test(message);
}

export function setAt(source: unknown, path: (string | number)[], value: unknown): unknown {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(source)) {
    const copy = source.slice();
    const index = Number(head);
    copy[index] = setAt(copy[index], rest, value);
    return copy;
  }
  const record = { ...(source as Record<string, unknown>) };
  const key = String(head);
  record[key] = setAt(record[key], rest, value);
  return record;
}

export function SiteSectionsProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<SavedMap>({});
  const [drafts, setDrafts] = useState<SavedMap>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [storage, setStorage] = useState<'remote' | 'local'>('local');
  const [warning, setWarning] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!isSupabaseConfigured() || !supabase) {
        if (!active) return;
        setSaved(readLocal());
        setStorage('local');
        setWarning('Saves stay in this browser until the database is connected.');
        return;
      }
      const result = await supabase.from('site_sections').select('id, data');
      if (!active) return;
      if (result.error) {
        if (missingTable(result.error)) {
          setSaved(readLocal());
          setStorage('local');
          setWarning('Saves stay in this browser until the site sections table is added.');
          return;
        }
        setWarning(result.error.message);
        return;
      }
      const next: SavedMap = {};
      for (const row of result.data ?? []) {
        const record = row as { id: string; data: unknown };
        next[record.id] = record.data;
      }
      setSaved(next);
      setStorage('remote');
      setWarning(null);
    }
    void load();
    return () => {
      active = false;
    };
  }, []);

  const published = useCallback((id: string) => {
    const defaults = sectionDefaults[id as SectionId];
    if (!defaults) return {};
    if (!(id in saved)) return defaults;
    return mergeDefaults(defaults, saved[id]);
  }, [saved]);

  const resolve = useCallback((id: string) => {
    if (id in drafts) return drafts[id];
    return published(id);
  }, [drafts, published]);

  const hiddenOf = useCallback((id: string) => {
    const value = resolve(id);
    return Boolean(value && typeof value === 'object' && !Array.isArray(value) && (value as { hidden?: unknown }).hidden);
  }, [resolve]);

  const persist = useCallback(async (id: string, data: unknown) => {
    const info = infoFor(id);
    if (storage === 'remote' && supabase) {
      const { error: saveError } = await supabase.from('site_sections').upsert({
        id,
        page: info.page,
        label: info.label,
        data,
        updated_at: new Date().toISOString()
      });
      if (saveError) throw saveError;
      return;
    }
    const next = { ...readLocal(), [id]: data };
    writeLocal(next);
  }, [storage]);

  const value = useMemo<SiteSectionsValue>(() => ({
    warning,
    activeId,
    saving,
    error,
    isEditing: (id) => activeId === id,
    isDirty: (id) => id in drafts && JSON.stringify(drafts[id]) !== JSON.stringify(published(id)),
    isHidden: hiddenOf,
    resolve,
    begin(id) {
      if (activeId && activeId !== id && activeId in drafts) {
        const dirty = JSON.stringify(drafts[activeId]) !== JSON.stringify(published(activeId));
        if (dirty && !window.confirm('This section has unsaved edits. Discard them?')) return;
      }
      setDrafts((current) => {
        const next = { ...current };
        if (activeId && activeId !== id) delete next[activeId];
        next[id] = clone(id in current && activeId === id ? current[id] : published(id));
        return next;
      });
      setActiveId(id);
      setError(null);
    },
    cancel(id) {
      setDrafts((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
      setActiveId((current) => current === id ? null : current);
      setError(null);
    },
    update(id, path, nextValue) {
      setDrafts((current) => ({
        ...current,
        [id]: setAt(current[id] ?? published(id), path, nextValue)
      }));
    },
    async save(id) {
      const data = drafts[id] ?? published(id);
      setSaving(true);
      setError(null);
      try {
        await persist(id, data);
        setSaved((current) => ({ ...current, [id]: data }));
        setDrafts((current) => {
          const next = { ...current };
          delete next[id];
          return next;
        });
        setActiveId((current) => current === id ? null : current);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Could not save this section.');
      } finally {
        setSaving(false);
      }
    },
    async setHidden(id, hidden) {
      const current = drafts[id] ?? published(id);
      const data = current && typeof current === 'object' && !Array.isArray(current)
        ? { ...(current as Record<string, unknown>), hidden }
        : { hidden };
      setSaving(true);
      setError(null);
      try {
        await persist(id, data);
        setSaved((previous) => ({ ...previous, [id]: data }));
        setDrafts((previous) => {
          if (!(id in previous)) return previous;
          return { ...previous, [id]: data };
        });
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Could not update this section.');
      } finally {
        setSaving(false);
      }
    }
  }), [activeId, drafts, error, hiddenOf, persist, published, resolve, saving, warning]);

  return <SiteSectionsContext.Provider value={value}>{children}</SiteSectionsContext.Provider>;
}

export function useSiteSections(): SiteSectionsValue {
  const value = useContext(SiteSectionsContext);
  if (!value) throw new Error('useSiteSections must be used inside SiteSectionsProvider');
  return value;
}

export function useSection<K extends SectionId>(id: K): (typeof sectionDefaults)[K] {
  const { resolve } = useSiteSections();
  return resolve(id) as (typeof sectionDefaults)[K];
}
