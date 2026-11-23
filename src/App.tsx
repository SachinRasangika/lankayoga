import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Home } from './pages/Home';
import { Yoga } from './pages/Yoga';
import { Ayurveda } from './pages/Ayurveda';
import { Classes } from './pages/Classes';
import { Treatments } from './pages/Treatments';
import { Journal } from './pages/Journal';
import { JournalArticle } from './pages/JournalArticle';
import { StayDetail } from './pages/StayDetail';
import { ClassDetail } from './pages/ClassDetail';
import { ClassBooking } from './pages/ClassBooking';
import { TreatmentDetail } from './pages/TreatmentDetail';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { AuthProvider } from './admin/auth';
import { ContentProvider, type StoredContent } from './admin/content';
import { RequireAuth } from './admin/RequireAuth';
import { AdminShell } from './admin/AdminShell';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { PackageList } from './admin/PackageList';
import { PackageEditor } from './admin/PackageEditor';
import { ClassList } from './admin/ClassList';
import { ClassEditor } from './admin/ClassEditor';
import { TreatmentList } from './admin/TreatmentList';
import { TreatmentEditor } from './admin/TreatmentEditor';
import { BlogList } from './admin/BlogList';
import { BlogEditor } from './admin/BlogEditor';
import { TimetableList } from './admin/TimetableList';
import { TimetableEditor } from './admin/TimetableEditor';
import { PublicLayout } from './admin/PublicLayout';
import { CustomizeFrame, CustomizeModeProvider } from './admin/customize/CustomizeFrame';
import { SiteSectionsProvider } from './admin/customize/store';
import { Seo } from './components/seo/Seo';

interface AppProps {
  defaultTheme?: 'light' | 'dark';
  initialContent?: StoredContent;
}

function PublicRouteTree() {
  return (
    <>
      <Route path="/classes/book/:id" element={<ClassBooking />} />
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/yoga" element={<Yoga />} />
        <Route path="/yoga/:slug" element={<StayDetail />} />
        <Route path="/ayurveda" element={<Ayurveda />} />
        <Route path="/ayurveda/:slug" element={<StayDetail />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/classes/:slug" element={<ClassDetail />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/treatments/:slug" element={<TreatmentDetail />} />
        <Route path="/retreats" element={<Navigate to="/yoga" replace />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<JournalArticle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/teacher-training" element={<Navigate to="/" replace />} />
        <Route path="/campus" element={<Navigate to="/contact" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  );
}

export function AppRoutes() {
  const location = useLocation();
  const customizing = location.pathname === '/admin/customize' || location.pathname.startsWith('/admin/customize/');
  const publicLocation = customizing
    ? { ...location, pathname: location.pathname.replace(/^\/admin\/customize(?=\/|$)/, '') || '/' }
    : location;

  return (
    <CustomizeModeProvider enabled={customizing}>
      <ScrollToTop />
      <Seo />
      {customizing ?
        <RequireAuth>
          <CustomizeFrame>
            <Routes location={publicLocation}>
              {PublicRouteTree()}
            </Routes>
          </CustomizeFrame>
        </RequireAuth> :
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminShell />
              </RequireAuth>
            }>
            <Route index element={<AdminDashboard />} />
            <Route path="packages" element={<PackageList />} />
            <Route path="packages/new" element={<PackageEditor />} />
            <Route path="packages/:id" element={<PackageEditor />} />
            <Route path="timetable" element={<TimetableList />} />
            <Route path="timetable/new" element={<TimetableEditor />} />
            <Route path="timetable/:id" element={<TimetableEditor />} />
            <Route path="classes" element={<ClassList />} />
            <Route path="classes/new" element={<ClassEditor />} />
            <Route path="classes/:id" element={<ClassEditor />} />
            <Route path="treatments" element={<TreatmentList />} />
            <Route path="treatments/new" element={<TreatmentEditor />} />
            <Route path="treatments/:id" element={<TreatmentEditor />} />
            <Route path="teachers/*" element={<Navigate to="/admin" replace />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/new" element={<BlogEditor />} />
            <Route path="blog/:id" element={<BlogEditor />} />
          </Route>
          {PublicRouteTree()}
        </Routes>}
    </CustomizeModeProvider>
  );
}

export function App({ defaultTheme = 'light', initialContent }: AppProps) {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <AuthProvider>
        <ContentProvider initialContent={initialContent}>
          <SiteSectionsProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
            <AppRoutes />
          </BrowserRouter>
          </SiteSectionsProvider>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
