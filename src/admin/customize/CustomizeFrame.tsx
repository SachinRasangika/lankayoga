import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { customizePages } from './catalog';
import { useSiteSections } from './store';

const CustomizeModeContext = createContext(false);

export function CustomizeModeProvider({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  return <CustomizeModeContext.Provider value={enabled}>{children}</CustomizeModeContext.Provider>;
}

export function useCustomizeMode(): boolean {
  return useContext(CustomizeModeContext);
}

function customizeHref(pathname: string): string {
  return `/admin/customize${pathname === '/' ? '' : pathname}`;
}

export function CustomizeFrame({ children }: { children?: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { warning, error } = useSiteSections();
  const publicPath = location.pathname.replace(/^\/admin\/customize(?=\/|$)/, '') || '/';

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--customize-bar', warning ? '5.25rem' : '3.25rem');
    root.style.setProperty('--section-tool', '0px');
    return () => {
      root.style.removeProperty('--customize-bar');
      root.style.removeProperty('--section-tool');
    };
  }, [warning]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor || anchor.hasAttribute('download')) return;
      if (anchor.target && anchor.target !== '_self') return;
      const raw = anchor.getAttribute('href');
      if (!raw || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
      let url: URL;
      try {
        url = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
      let path = url.pathname;
      if (base && path.startsWith(base)) path = path.slice(base.length) || '/';
      if (path.startsWith('/admin')) return;
      event.preventDefault();
      event.stopPropagation();
      navigate(`${customizeHref(path)}${url.search}${url.hash}`);
    }
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate]);

  return (
    <div className="min-h-dvh bg-surface">
      <div className="fixed inset-x-0 top-0 z-[90] flex h-[3.25rem] items-center gap-3 border-b-4 border-terracotta-900 bg-terracotta-700 px-3 text-white shadow-lg sm:px-5">
        <p className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-widest text-white">Customize mode</p>
        <nav className="no-scrollbar flex min-w-0 flex-1 gap-1 overflow-x-auto" aria-label="Pages to customize">
          {customizePages.map((page) => {
            const active = page.to === '/' ? publicPath === '/' : publicPath === page.to || publicPath.startsWith(`${page.to}/`);
            return (
              <button
                key={page.to}
                type="button"
                onClick={() => navigate(customizeHref(page.to))}
                className={active ? 'shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-terracotta-800 shadow-sm' : 'shrink-0 rounded-full px-3 py-1 text-xs font-medium text-white/90 hover:bg-white/20 hover:text-white'}>
                {page.label}
              </button>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => navigate('/admin')}
          className="shrink-0 rounded-full border border-white/70 bg-white/15 px-3 py-1 text-xs font-semibold text-white hover:bg-white hover:text-terracotta-800">
          Exit
        </button>
      </div>
      {warning ? <p className="fixed inset-x-0 top-[3.25rem] z-[90] bg-warm px-4 py-1.5 text-center text-xs text-terracotta-700">{warning}</p> : null}
      {error ? <p className="fixed inset-x-0 bottom-0 z-[90] bg-terracotta-700 px-4 py-2 text-center text-sm text-white">{error}</p> : null}
      {children}
    </div>
  );
}
