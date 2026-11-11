import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';
import { formatPostDate } from '../utils/format';
import { statusOf, useContent } from './content';
import { StatusBadge } from './SaveBar';
import { adminFieldClass, Segmented } from './ui';
import { PublishStatus } from '../types';

export function BlogList() {
  const { ready, posts, savePost, deletePost } = useContent();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | PublishStatus>('all');

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (status !== 'all' && statusOf(post) !== status) return false;
      if (!needle) return true;
      return `${post.title} ${post.category} ${post.excerpt}`.toLowerCase().includes(needle);
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [posts, query, status]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-muted">Journal</p>
          <h1 className="mt-1 font-display text-3xl font-light tracking-tight sm:text-4xl">Notes from campus</h1>
        </div>
        <ButtonLink to="/admin/blog/new" size="sm" className="shrink-0">
          <PlusIcon className="h-4 w-4" />
          <span className="sm:hidden">New</span>
          <span className="hidden sm:inline">Write a note</span>
        </ButtonLink>
      </div>

      <label className="relative block">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search notes"
          className={`${adminFieldClass} pl-10`} />
      </label>
      <Segmented
        value={status}
        onChange={setStatus}
        options={[
          { value: 'all', label: 'Any status' },
          { value: 'published', label: 'Live' },
          { value: 'draft', label: 'Draft' }
        ]} />
      <p className="text-xs text-muted">Open a card to edit. Use Live or Draft to show or hide it on the site.</p>

      {!ready ? <p className="text-sm text-muted">Loading notes…</p> : null}

      <ul className="flex flex-col gap-3">
        {rows.map((post) =>
          <li key={post.id} className="overflow-hidden rounded-2xl border border-line bg-raised">
            <Link to={`/admin/blog/${post.id}`} className="flex gap-3 p-3 sm:p-4">
              {post.image ?
                <img src={post.image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-28" /> :
                null}
              <span className="min-w-0 flex-1">
                <span className="block font-medium leading-snug text-ink">{post.title}</span>
                <span className="mt-1 block truncate text-sm text-muted">{post.category} · {formatPostDate(post.date)}</span>
                <span className="mt-1 block truncate text-sm text-muted">{post.author}</span>
              </span>
            </Link>
            <div className="flex items-center gap-1 border-t border-line px-2 py-2">
              <StatusBadge
                status={statusOf(post)}
                onClick={() => void savePost({ ...post, status: statusOf(post) === 'published' ? 'draft' : 'published' }).catch((caught: unknown) => {
                  window.alert(caught instanceof Error ? caught.message : 'Could not update.');
                })} />
              <span className="flex-1" />
              <button
                type="button"
                aria-label="Delete"
                onClick={() => {
                  if (window.confirm(`Delete “${post.title}”?`)) {
                    void deletePost(post.id).catch((caught: unknown) => {
                      window.alert(caught instanceof Error ? caught.message : 'Could not delete.');
                    });
                  }
                }}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted hover:bg-warm hover:text-terracotta-700">
                <Trash2Icon className="h-4 w-4" />
              </button>
            </div>
          </li>
        )}
      </ul>
      {rows.length === 0 && ready ? <p className="py-10 text-center text-sm text-muted">No notes match that.</p> : null}
    </div>
  );
}
