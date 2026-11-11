import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './App';
import { AuthProvider } from './admin/auth';
import { ContentProvider, type StoredContent } from './admin/content';
import { ThemeProvider } from './contexts/ThemeContext';
import {
  classFromRow,
  packageFromRow,
  postFromRow,
  timetableFromRow,
  treatmentFromRow,
  type ClassRow,
  type PackageRow,
  type PostRow,
  type TimetableRow,
  type TreatmentRow
} from './lib/cms';
import { supabase } from './lib/supabase';
import { getSeoMetadata, getSitemapEntries, getStructuredData, siteUrl } from './lib/seo';
import { classPath, stayPath, treatmentPath } from './utils/stays';

export { getSeoMetadata, getSitemapEntries, getStructuredData, siteUrl };

export function getPublicRoutes(content: StoredContent): string[] {
  const routes = ['/', '/teacher-training', '/retreats', '/yoga', '/ayurveda', '/classes', '/treatments', '/campus', '/book', '/journal', '/contact'];
  content.packages.forEach((item) => routes.push(stayPath(item)));
  content.classes.forEach((item) => routes.push(classPath(item)));
  content.treatments.forEach((item) => routes.push(treatmentPath(item)));
  content.posts.forEach((item) => routes.push(`/journal/${item.slug || item.id}`));
  return Array.from(new Set(routes));
}

export async function loadPublishedContent(): Promise<StoredContent> {
  if (!supabase) throw new Error('Supabase environment variables are required for pre-rendering.');

  const [packages, posts, classes, treatments, timetable] = await Promise.all([
    supabase.from('packages').select('*').eq('status', 'published').order('start_date'),
    supabase.from('posts').select('*').eq('status', 'published').order('date', { ascending: false }),
    supabase.from('classes').select('*').eq('status', 'published').order('sort_order'),
    supabase.from('treatments').select('*').eq('status', 'published').order('sort_order'),
    supabase.from('timetable').select('*').eq('status', 'published').order('sort_order')
  ]);

  const error = packages.error || posts.error || classes.error || treatments.error || timetable.error;
  if (error) throw error;

  return {
    packages: ((packages.data ?? []) as PackageRow[]).map(packageFromRow),
    posts: ((posts.data ?? []) as PostRow[]).map(postFromRow),
    classes: ((classes.data ?? []) as ClassRow[]).map(classFromRow),
    treatments: ((treatments.data ?? []) as TreatmentRow[]).map(treatmentFromRow),
    timetable: ((timetable.data ?? []) as TimetableRow[]).map(timetableFromRow)
  };
}

export function renderRoute(pathname: string, content: StoredContent): string {
  return renderToString(
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <ContentProvider initialContent={content}>
          <StaticRouter location={pathname}>
            <AppRoutes />
          </StaticRouter>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
