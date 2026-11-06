import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Home } from './pages/Home';
import { TeacherTraining } from './pages/TeacherTraining';
import { Ayurveda } from './pages/Ayurveda';
import { Retreats } from './pages/Retreats';
import { Campus } from './pages/Campus';
import { Journal } from './pages/Journal';
import { BookStay } from './pages/BookStay';
import { Contact } from './pages/Contact';

interface AppProps {
  defaultTheme?: 'light' | 'dark';
}

export function App({ defaultTheme = 'light' }: AppProps) {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <BrowserRouter basename="/lankayoga">
        <ScrollToTop />
        <div className="flex min-h-screen w-full flex-col bg-surface">
          <SiteHeader />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/teacher-training" element={<TeacherTraining />} />
              <Route path="/ayurveda" element={<Ayurveda />} />
              <Route path="/retreats" element={<Retreats />} />
              <Route path="/campus" element={<Campus />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/book" element={<BookStay />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <SiteFooter />
        </div>
      </BrowserRouter>
    </ThemeProvider>);

}