import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ButtonLink } from '../ui/Button';
import { isImmersivePath, publicNav } from '../../data/nav';
import { BrandMark } from './BrandMark';
import { ThemeToggle } from './ThemeToggle';

function linkClass(overImage: boolean, isActive: boolean) {
  return cn(
    'rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-200 ease-calm',
    overImage ?
      isActive ?
        'bg-white/20 text-white' :
        'text-white/75 hover:text-white' :
      isActive ?
        'bg-sage-100 text-sage-800 dark:bg-sage-800/60 dark:text-sage-100' :
        'text-muted hover:text-ink'
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const overImage = isImmersivePath(location.pathname) && !scrolled && !open;

  return (
    <header className={cn(
      'fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-300 ease-calm sm:px-6',
      scrolled ? 'pt-2' : 'pt-3 sm:pt-5'
    )}>
      <nav
        aria-label="Primary"
        className={cn(
          'mx-auto flex max-w-[1400px] items-center gap-3 overflow-visible rounded-2xl transition-[background-color,border-color,box-shadow,padding] duration-300 ease-calm sm:rounded-full',
          scrolled ? 'px-3 py-1.5 sm:px-5 sm:py-1.5' : 'px-4 py-2.5 sm:px-6 sm:py-3',
          overImage ? 'border border-transparent' : 'glass-panel shadow-lift'
        )}>

        <Link to="/" aria-label="Lanka Yoga & Ayurveda Resort — home" className="mr-auto flex items-center">
          <BrandMark
            onImage={overImage}
            className={cn(
              'transition-[height] duration-300 ease-calm',
              scrolled ? 'h-16 sm:h-20' : 'h-24 sm:h-28 lg:h-32'
            )} />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {publicNav.map((item) => {
            if ('children' in item) {
              const childActive = item.children.some(
                (child) => location.pathname === child.to || location.pathname.startsWith(`${child.to}/`)
              );
              return (
                <li key={item.label} className="group relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    className={cn(linkClass(overImage, childActive), 'inline-flex items-center gap-1')}>
                    {item.label}
                    <ChevronDownIcon className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </button>
                  <div className="invisible absolute left-1/2 top-full z-50 min-w-[11.5rem] -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] duration-200 ease-calm group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul role="menu" className="glass-panel rounded-2xl p-1.5 shadow-lift">
                      {item.children.map((child) =>
                        <li key={child.to} role="none">
                          <NavLink
                            role="menuitem"
                            to={child.to}
                            className={({ isActive }) =>
                              cn(
                                'block rounded-xl px-3.5 py-2.5 text-[0.8125rem] font-medium transition-colors duration-200 ease-calm',
                                isActive ?
                                  'bg-sage-100 text-sage-800 dark:bg-sage-800/60 dark:text-sage-100' :
                                  'text-ink hover:bg-sage-50 dark:hover:bg-sage-800/40'
                              )
                            }>
                            {child.label}
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => linkClass(overImage, isActive)}>
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <ThemeToggle onImage={overImage} />
          <ButtonLink
            to="/book"
            size="sm"
            variant={overImage ? 'onImage' : 'primary'}
            className="hidden sm:inline-flex">
            Book a stay
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200 lg:hidden',
              overImage ? 'border-white/30 text-white' : 'border-line text-ink'
            )}>
            {open ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ?
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="glass-panel mx-auto mt-2 max-w-[1400px] overflow-hidden rounded-2xl p-2 shadow-lift lg:hidden">
            <ul className="flex flex-col">
              {publicNav.map((item) => {
                if ('children' in item) {
                  return (
                    <li key={item.label} className="pt-1">
                      <p className="px-4 pb-1 pt-2 text-[0.6875rem] uppercase tracking-widest text-muted">
                        {item.label}
                      </p>
                      <ul>
                        {item.children.map((child) =>
                          <li key={child.to}>
                            <NavLink
                              to={child.to}
                              className={({ isActive }) =>
                                cn(
                                  'block rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ease-calm',
                                  isActive ? 'bg-sage-100 text-sage-800 dark:bg-sage-800/60 dark:text-sage-100' : 'text-ink'
                                )
                              }>
                              {child.label}
                            </NavLink>
                          </li>
                        )}
                      </ul>
                    </li>
                  );
                }

                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ease-calm',
                          isActive ? 'bg-sage-100 text-sage-800 dark:bg-sage-800/60 dark:text-sage-100' : 'text-ink'
                        )
                      }>
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
              <li>
                <NavLink
                  to="/book"
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-ink">
                  Book a stay
                </NavLink>
              </li>
            </ul>
          </motion.div> :
          null}
      </AnimatePresence>
    </header>
  );
}
