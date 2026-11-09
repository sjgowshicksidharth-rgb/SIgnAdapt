import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { isAuth0Configured } from '../components/auth/Auth0ProviderWithNavigate';

export default function WelcomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If already authenticated or guest session active, navigate to destination
  useEffect(() => {
    if (isAuthenticated) {
      const returnTo = location.state?.from?.pathname || '/dashboard';
      navigate(returnTo, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuth0Configured) {
      console.info('[SignAdapt] Auth0 credentials not configured in .env. Continuing in Guest Mode.');
      sessionStorage.setItem('signadapt_guest', 'true');
      navigate('/dashboard');
      return;
    }

    try {
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: authMode === 'signup' ? 'signup' : 'login',
          login_hint: email || undefined
        },
        appState: { returnTo: location.state?.from?.pathname || '/dashboard' }
      });
    } catch (err) {
      console.error('[SignAdapt Auth0] Login redirect error:', err);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isAuth0Configured) {
      console.info('[SignAdapt] Auth0 credentials not configured in .env. Continuing in Guest Mode.');
      sessionStorage.setItem('signadapt_guest', 'true');
      navigate('/dashboard');
      return;
    }

    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: 'google-oauth2'
        },
        appState: { returnTo: location.state?.from?.pathname || '/dashboard' }
      });
    } catch (err) {
      console.error('[SignAdapt Auth0] Google login error:', err);
    }
  };

  const handleGuestLogin = () => {
    sessionStorage.setItem('signadapt_guest', 'true');
    const returnTo = location.state?.from?.pathname || '/dashboard';
    navigate(returnTo);
  };

  return (
    <div className="min-h-screen bg-auth-gradient wave-bg flex items-center justify-center p-4 md:p-8 font-sans antialiased text-slate-800 selection:bg-indigo-500 selection:text-white">
      {/* Main Container */}
      <main className="w-full max-w-6xl min-h-[640px] bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
        
        {/* Left Hero Section */}
        <section aria-label="SignAdapt Introduction" className="w-full lg:w-1/2 flex flex-col justify-between self-stretch z-10">
          {/* Brand Header */}
          <div className="space-y-4">
            <header className="flex items-center gap-3.5">
              {/* Logo Icon */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <svg aria-hidden="true" className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                  <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                  <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                </svg>
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-slate-900 block leading-tight">SignAdapt</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">Connect • Communicate • Learn</span>
              </div>
            </header>

            {/* Main Headline & Subtitle */}
            <div className="pt-6 lg:pt-10 max-w-lg">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
                Bridging the Gap Through Sign Language
              </h1>
              <p className="mt-4 md:mt-5 text-base md:text-lg text-slate-600 font-normal leading-relaxed">
                Translate, learn and communicate using Text, Speech and Indian Sign Language (ISL).
              </p>
            </div>
          </div>

          {/* Lower Decorative Illustration / Wave Area */}
          <div className="mt-8 lg:mt-0 relative w-full h-36 md:h-44 rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-100/60 via-purple-100/40 to-blue-50/50 flex items-center justify-center border border-indigo-50">
            {/* Abstract wave background SVG */}
            <svg className="absolute inset-0 w-full h-full text-indigo-200/50" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 500 150">
              <path d="M0,40 C150,90 350,-20 500,60 L500,150 L0,150 Z"></path>
            </svg>
            <svg className="absolute inset-0 w-full h-full text-purple-200/40" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 500 150">
              <path d="M0,80 C120,20 280,120 500,30 L500,150 L0,150 Z"></path>
            </svg>
            {/* Decorative Hands Representing Gestures */}
            <div aria-hidden="true" className="relative z-10 flex items-center gap-6 text-indigo-500/70">
              <div className="p-3 bg-white/70 rounded-full shadow-sm backdrop-blur-sm transform -rotate-12 hover:scale-105 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <div className="p-3.5 bg-white/80 rounded-full shadow-md backdrop-blur-sm transform hover:scale-105 transition-transform text-violet-600">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <div className="p-3 bg-white/70 rounded-full shadow-sm backdrop-blur-sm transform rotate-12 hover:scale-105 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Right Auth Card */}
        <section aria-label="Sign In Card" className="w-full lg:w-[460px] bg-white rounded-2xl shadow-xl shadow-indigo-950/5 border border-slate-100 p-8 sm:p-10 z-10">
          {/* Top Tab Switcher */}
          <nav aria-label="Authentication Options" className="flex border-b border-slate-100 mb-8">
            <button
              className={`w-1/2 pb-3.5 text-center text-sm font-semibold transition-colors focus:outline-none ${
                authMode === 'login'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              type="button"
              onClick={() => setAuthMode('login')}
            >
              Login
            </button>
            <button
              className={`w-1/2 pb-3.5 text-center text-sm font-semibold transition-colors focus:outline-none ${
                authMode === 'signup'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              type="button"
              onClick={() => setAuthMode('signup')}
            >
              Sign Up
            </button>
          </nav>

          {/* Authentication Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-xs flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-red-500 flex-shrink-0">error</span>
              <span>{error.message || 'Authentication error. Please try again.'}</span>
            </div>
          )}

          {/* Authentication Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="sr-only" htmlFor="email">Email Address</label>
              <div className="relative">
                <input
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="sr-only" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  className="w-full h-12 pl-4 pr-12 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                  id="password"
                  name="password"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Password Visibility Toggle Button */}
                <button
                  aria-label="Toggle password visibility"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full h-12 mt-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-150 flex items-center justify-center cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : authMode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>

          {/* Social Login Separator */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-slate-100"></div>
            <span className="absolute bg-white px-3 text-xs text-slate-400 font-medium tracking-tight">or continue with</span>
          </div>

          {/* Alternative Sign-in Actions */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <button
              className="h-11 px-4 flex items-center justify-center gap-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition text-xs font-semibold text-slate-700 shadow-sm cursor-pointer"
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
              </svg>
              Google
            </button>
            {/* Guest Button */}
            <button
              className="h-11 px-4 flex items-center justify-center border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition text-xs font-semibold text-slate-700 shadow-sm cursor-pointer"
              type="button"
              onClick={handleGuestLogin}
            >
              Continue as Guest
            </button>
          </div>

          {/* Registration Prompt Footer */}
          <footer className="mt-8 text-center text-xs text-slate-500">
            {authMode === 'login' ? (
              <>
                New here?{' '}
                <button
                  type="button"
                  className="text-indigo-600 font-semibold hover:underline decoration-indigo-300 underline-offset-2"
                  onClick={() => setAuthMode('signup')}
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-indigo-600 font-semibold hover:underline decoration-indigo-300 underline-offset-2"
                  onClick={() => setAuthMode('login')}
                >
                  Sign in instead
                </button>
              </>
            )}
          </footer>
        </section>
      </main>
    </div>
  );
}
