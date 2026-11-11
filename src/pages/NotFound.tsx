import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-start justify-center px-5 py-24">
      <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">404</p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">That page is not here</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">The address does not match a page on this site.</p>
      <Link to="/" className="mt-8 text-sm text-ink underline underline-offset-4">Back to the homepage</Link>
    </div>
  );
}
