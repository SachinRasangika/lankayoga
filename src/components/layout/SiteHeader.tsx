import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ButtonLink } from '../ui/Button';
import { BrandMark } from './BrandMark';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
{ to: '/teacher-training', label: 'Teacher Training' },
{ to: '/ayurveda', label: 'Ayurveda' },
{ to: '/retreats', label: 'Retreats' },
{ to: '/campus', label: 'Campus & Hire' },
{ to: '/journal', label: 'Journal' },
{ to: '/contact', label: 'Contact' }];


const immersiveRoutes = ['/', '/teacher-training', '/ayurveda', '/campus', '/retreats', '/journal', '/book', '/contact'];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 90);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const overImage = immersiveRoutes.includes(location.pathname) && !scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        aria-label="Primary"
        className={cn(
          'mx-auto flex max-w-[1400px] items-center gap-3 rounded-2xl px-4 py-2.5 transition-[background-color,border-color,box-shadow] duration-300 ease-calm sm:rounded-full sm:px-6',
          overImage ? 'border border-transparent' : 'glass-panel shadow-lift'
        )}>
        
        <Link to="/" aria-label="Lanka Yoga & Ayurveda Resort — home" className="mr-auto flex items-center">
          <BrandMark onImage={overImage} className="h-11 sm:h-12" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
          <li key={item.to}>
              <NavLink
              to={item.to}
              className={({ isActive }) =>
              cn(
                'rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-200 ease-calm',
                overImage ?
                isActive ?
                'bg-white/20 text-white' :
                'text-white/75 hover:text-white' :
                isActive ?
                'bg-sage-100 text-sage-800 dark:bg-sage-800/60 dark:text-sage-100' :
                'text-muted hover:text-ink'
              )
              }>
              
                {item.label}
              </NavLink>
            </li>
          )}
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
              {navItems.map((item) =>
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
            )}
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
    </header>);

}