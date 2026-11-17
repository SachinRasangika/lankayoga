import { Outlet } from 'react-router-dom';
import { SiteHeader } from '../components/layout/SiteHeader';
import { SiteFooter } from '../components/layout/SiteFooter';
import { JsonLd } from '../components/seo/JsonLd';
import { useLiveBusiness } from '../lib/siteCopy';
import { useContent } from './content';

export function PublicLayout() {
  const { ready } = useContent();
  const { jsonLd } = useLiveBusiness();

  return (
    <div className="flex min-h-screen w-full flex-col bg-surface">
      <JsonLd id="lankayoga-local-business" data={jsonLd} />
      <SiteHeader />
      <main className="flex-1">
        {ready ? <Outlet /> : <p className="px-5 py-24 text-center text-sm text-muted">Loading…</p>}
      </main>
      <SiteFooter />
    </div>
  );
}
