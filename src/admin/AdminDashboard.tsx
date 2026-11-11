import { Link } from 'react-router-dom';
import { ArrowRightIcon, BookOpenIcon, CalendarDaysIcon, DropletsIcon, PlusIcon, SunIcon } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';
import { formatPostDate, formatStayDates } from '../utils/format';
import { statusOf, useContent } from './content';
import { StatusBadge } from './SaveBar';

export function AdminDashboard() {
  const {
    ready,
    packages,
    posts,
    classes,
    treatments,
    publishedPackages,
    publishedPosts,
    publishedClasses,
    publishedTreatments
  } = useContent();
  if (!ready) {
    return <p className="text-sm text-muted">Loading from the database…</p>;
  }
  const drafts = [...packages, ...posts, ...classes, ...treatments].filter((item) => statusOf(item) === 'draft').length;
  const recentPackages = [...packages].sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '')).slice(0, 3);
  const recentClasses = [...classes].sort((a, b) => a.sortOrder - b.sortOrder).slice(0, 3);
  const recentTreatments = [...treatments].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).slice(0, 3);
  const recentPosts = [...posts].sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '')).slice(0, 3);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div>
        <p className="eyebrow text-muted">Home</p>
        <h1 className="mt-1 font-display text-3xl font-light tracking-tight sm:text-4xl">Update the site</h1>
        <p className="mt-2 text-sm text-muted">Packages, classes, treatments, and journal. Only Live items show to guests.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <ButtonLink to="/admin/packages/new" size="sm" className="min-h-12">
          <PlusIcon className="h-4 w-4" />
          Package
        </ButtonLink>
        <ButtonLink to="/admin/classes/new" variant="secondary" size="sm" className="min-h-12">
          <PlusIcon className="h-4 w-4" />
          Class
        </ButtonLink>
        <ButtonLink to="/admin/treatments/new" variant="secondary" size="sm" className="min-h-12">
          <PlusIcon className="h-4 w-4" />
          Treatment
        </ButtonLink>
        <ButtonLink to="/admin/blog/new" variant="secondary" size="sm" className="min-h-12">
          <PlusIcon className="h-4 w-4" />
          Note
        </ButtonLink>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <Stat label="Live stays" value={String(publishedPackages.length)} />
        <Stat label="Live classes" value={String(publishedClasses.length)} />
        <Stat label="Live treatments" value={String(publishedTreatments.length)} />
        <Stat label="Live notes" value={String(publishedPosts.length)} />
        <Stat label="Drafts" value={String(drafts)} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <RowTitle to="/admin/packages" label="Packages" icon="packages" />
          <RecentList
            items={recentPackages.map((program) => ({
              id: program.id,
              to: `/admin/packages/${program.id}`,
              title: program.title,
              meta: formatStayDates(program),
              status: statusOf(program)
            }))} />
        </section>
        <section>
          <RowTitle to="/admin/classes" label="Classes" icon="classes" />
          <RecentList
            items={recentClasses.map((item) => ({
              id: item.id,
              to: `/admin/classes/${item.id}`,
              title: item.name,
              meta: `${item.time} · ${item.duration}`,
              status: statusOf(item)
            }))} />
        </section>
        <section>
          <RowTitle to="/admin/treatments" label="Treatments" icon="treatments" />
          <RecentList
            items={recentTreatments.map((item) => ({
              id: item.id,
              to: `/admin/treatments/${item.id}`,
              title: item.name,
              meta: item.duration,
              status: statusOf(item)
            }))} />
        </section>
        <section>
          <RowTitle to="/admin/blog" label="Journal" icon="journal" />
          <RecentList
            items={recentPosts.map((post) => ({
              id: post.id,
              to: `/admin/blog/${post.id}`,
              title: post.title,
              meta: formatPostDate(post.date),
              status: statusOf(post)
            }))} />
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }: {label: string;value: string;}) {
  return (
    <div className="rounded-2xl border border-line bg-raised px-3 py-4 sm:px-5">
      <p className="text-[0.625rem] uppercase tracking-widest text-muted sm:text-[0.6875rem]">{label}</p>
      <p className="mt-1 font-display text-3xl font-light sm:text-4xl">{value}</p>
    </div>
  );
}

function RowTitle({ to, label, icon }: {to: string;label: string;icon: 'packages' | 'classes' | 'treatments' | 'journal';}) {
  const Icon = icon === 'packages' ? CalendarDaysIcon : icon === 'classes' ? SunIcon : icon === 'treatments' ? DropletsIcon : BookOpenIcon;
  return (
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-2 font-display text-2xl font-light">
        <Icon className="h-4 w-4 text-muted" />
        {label}
      </h2>
      <Link to={to} className="inline-flex min-h-10 items-center gap-1 text-sm text-muted hover:text-ink">
        See all
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function RecentList({
  items
}: {
  items: {id: string;to: string;title: string;meta: string;status: 'draft' | 'published';}[];
}) {
  return (
    <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-raised">
      {items.map((item) =>
        <li key={item.id}>
          <Link to={item.to} className="flex min-h-16 items-center justify-between gap-3 px-4 py-3">
            <span className="min-w-0">
              <span className="block truncate font-medium">{item.title}</span>
              <span className="text-sm text-muted">{item.meta}</span>
            </span>
            <StatusBadge status={item.status} />
          </Link>
        </li>
      )}
    </ul>
  );
}
