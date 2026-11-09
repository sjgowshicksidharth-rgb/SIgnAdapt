import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const location = useLocation();
  const isGuest = sessionStorage.getItem('signadapt_guest') === 'true';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4 text-on-surface">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="font-label-md text-label-md text-on-surface-variant font-medium">
          Verifying session...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-[32px]">error</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Authentication Error</h2>
        <p className="text-slate-600 max-w-md mb-6">{error.message || 'An error occurred during authentication.'}</p>
        <a
          href="/login"
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition"
        >
          Return to Sign In
        </a>
      </div>
    );
  }

  if (!isAuthenticated && !isGuest) {
    // Redirect unauthenticated non-guest users to Welcome / Login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
