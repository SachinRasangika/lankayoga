import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BookOpenIcon, CalendarDaysIcon, Clock3Icon, DropletsIcon, LayoutDashboardIcon, LogOutIcon, SunIcon } from 'lucide-react';
import { cn } from '../utils/cn';
import { useAuth } from './auth';
import { useContent } from './content';
import { ThemeToggle } from '../components/layout/ThemeToggle';

const nav = [
  { to: '/admin', label: 'Home', icon: LayoutDashboardIcon, end: true },
  { to: '/admin/packages', label: 'Packages', icon: CalendarDaysIcon, end: false },
  { to: '/admin/classes', label: 'Classes', icon: SunIcon, end: false },
  { to: '/admin/timetable', label: 'Timetable', icon: Clock3Icon, end: false },
  { to: '/admin/treatments', label: 'Treatments', icon: DropletsIcon, end: false },
  { to: '/admin/blog', label: 'Journal', icon: BookOpenIcon, end: false }
];

export function AdminShell() {
  const { logout } = useAuth();
  const { error } = useContent();
  const navigate = useNavigate();
  const location = useLocation();
  const editing = /\/admin\/(packages|blog|classes|treatments|timetable)\/.+/.test(location.pathname);

  async function handleLogout() {
    await logout();
    navigate('/admin/login');
  }

  return (
    <div className="flex min-h-dvh bg-surface text-ink">
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 border-r border-line bg-raised px-4 py-6 lg:flex lg:flex-col">
        <p className="px-3 font-display text-xl font-light tracking-tight">Lanka Yoga</p>
        <p className="px-3 text-[0.6875rem] uppercase tracking-widest text-muted">Staff desk</p>
        <nav className="mt-8 flex flex-col gap-1">
          {nav.map((item) =>
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-sage-100 text-sage-900 dark:bg-sage-800/50 dark:text-sage-50' : 'text-muted hover:bg-warm hover:text-ink'
                )
              }>
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          )}
        </nav>
        <div className="mt-auto flex flex-col gap-3 px-3">
          <a href="/" className="text-sm text-muted hover:text-ink">View public site</a>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur" style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-light tracking-tight lg:hidden">Lanka Yoga</p>
            <p className="hidden text-sm text-muted lg:block">Guests only see items you mark Live.</p>
          </div>
          <a href="/" className="text-sm font-medium text-muted hover:text-ink lg:hidden">Site</a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => { void handleLogout(); }}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-3 text-sm font-medium text-ink hover:border-sage-400">
            <LogOutIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </header>
        <div className={cn('min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8', editing ? 'pb-44' : 'pb-28 lg:pb-8')}>
          {error ? <p className="mb-4 rounded-2xl bg-warm px-4 py-3 text-sm text-terracotta-700">{error}</p> : null}
          <Outlet />
        </div>
      </div>

      {!editing ?
        <nav
          className="fixed inset-x-0 bottom-0 z-40 flex overflow-x-auto border-t border-line bg-raised/95 backdrop-blur lg:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {nav.map((item) =>
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex min-h-14 min-w-[4.5rem] flex-1 flex-col items-center justify-center gap-1 px-1 text-[0.625rem] font-medium',
                  isActive ? 'text-sage-800 dark:text-sage-200' : 'text-muted'
                )
              }>
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          )}
        </nav> :
        null}
    </div>
  );
}
