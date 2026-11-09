import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth0();

  const navItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: 'grid_view',
      matchPaths: ['/dashboard']
    },
    {
      to: '/translation',
      label: 'Translation',
      icon: 'translate',
      matchPaths: ['/translation']
    },
    {
      to: '/learn',
      label: 'Sign Learning',
      icon: 'school',
      matchPaths: ['/learn', '/practice']
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: 'person',
      matchPaths: ['/profile']
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: 'settings',
      matchPaths: ['/settings']
    }
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('signadapt_guest');
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen">
      {/* Fixed Left Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#171a36] z-50 flex flex-col justify-between p-space-lg select-none">
        <div className="flex flex-col gap-space-xl">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-space-sm group">
            <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-on-primary text-[22px]">sign_language</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-primary tracking-tight font-bold">
              SignAdapt
            </span>
          </Link>

          {/* Primary Navigation */}
          <nav className="flex flex-col gap-space-xs" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = item.matchPaths.some(p => location.pathname === p);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-colors font-headline-sm text-headline-sm ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                      : 'text-[#8f9cae] hover:bg-white/5 hover:text-on-primary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: Logout */}
        <div className="pt-space-md border-t border-white/5">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-[#8f9cae] hover:bg-white/5 hover:text-on-primary transition-colors font-headline-sm text-headline-sm text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport Content Area */}
      <div className="pl-64">
        {/* Top Header */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-md z-40 flex items-center justify-end px-gutter-desktop border-b border-surface-variant/30">
          <div className="flex items-center gap-space-md">
            <Link
              to="/profile"
              className="w-8 h-8 rounded-full overflow-hidden bg-primary flex items-center justify-center text-on-primary transition-transform hover:scale-105 shadow-sm"
              title={user?.name || 'User Profile'}
            >
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user.name || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-[18px]">person</span>
              )}
            </Link>
          </div>
        </header>

        {/* Page Outlet */}
        <main className="w-full min-h-screen pt-16 bg-surface px-gutter-desktop pb-space-xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
