import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth';

export function RequireAuth({ children }: {children: ReactNode;}) {
  const { email, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return <p className="px-6 py-16 text-center text-sm text-muted">Opening the staff desk…</p>;
  }

  if (!email) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
