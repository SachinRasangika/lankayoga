import { isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './auth';
import { adminFieldClass, Field } from './ui';
import { Button } from '../components/ui/Button';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';

export function AdminLogin() {
  const { email, ready, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string} | null)?.from ?? '/admin';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const configured = isSupabaseConfigured();

  if (ready && email) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const message = await login(form.email, form.password);
    setBusy(false);
    if (message) {
      setError(message);
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <div
      className="flex min-h-dvh items-center justify-center bg-surface px-4 py-8"
      style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))', paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
      <div className="w-full max-w-md rounded-3xl border border-line bg-raised p-6 shadow-lift sm:p-8">
        <p className="eyebrow text-muted">Staff only</p>
        <h1 className="mt-3 font-display text-3xl font-light tracking-tight text-ink sm:text-4xl">Sign in to update the site</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Change packages and journal notes here. Nothing goes live until you mark it Live.
        </p>
        {!configured ?
          <p className="mt-6 rounded-2xl bg-warm px-4 py-3 text-sm text-terracotta-700">
            The database is not connected yet. Add the Supabase keys, then try again.
          </p> :
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <Field label="Email">
              <input
                type="email"
                autoComplete="username"
                inputMode="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className={adminFieldClass} />
            </Field>
            <Field label="Password">
              <input
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className={adminFieldClass} />
            </Field>
            {error ? <p className="text-sm text-terracotta-600">{error}</p> : null}
            <Button type="submit" className="min-h-12" disabled={busy || !ready}>
              {busy ? 'Signing in…' : 'Continue'}
            </Button>
          </form>}
      </div>
    </div>
  );
}
