import { Outlet } from 'react-router-dom';
import { SiteHeader } from '../components/layout/SiteHeader';
import { SiteFooter } from '../components/layout/SiteFooter';
import { JsonLd } from '../components/seo/JsonLd';
import { businessJsonLd } from '../data/business';
import { useCustomizeMode } from './customize/CustomizeFrame';
import { useContent } from './content';
import { cn } from '../utils/cn';

export function PublicLayout() {
  const { ready } = useContent();
  const customizing = useCustomizeMode();

  return (
    <div className={cn('flex min-h-screen w-full flex-col bg-surface', customizing && 'pt-[var(--customize-bar,0px)]')}>
      <JsonLd id="lankayoga-local-business" data={businessJsonLd} />
      <SiteHeader />
      <main className="flex-1">
        {ready ? <Outlet /> : <p className="px-5 py-24 text-center text-sm text-muted">Loading…</p>}
      </main>
      <SiteFooter />
    </div>
  );
}
