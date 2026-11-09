import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import SampleDataBadge from '../components/ui/SampleDataBadge';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth0();
  const displayName = isAuthenticated && (user?.name || user?.nickname)
    ? (user?.name || user?.nickname)
    : 'Aarav Patel';
  const firstName = isAuthenticated && user?.name
    ? user.name.split(' ')[0]
    : 'User';
  const userSubtitle = isAuthenticated && user?.email
    ? user.email
    : 'Learner';
  const avatarUrl = user?.picture || "https://lh3.googleusercontent.com/aida-public/AB6AXuDYcGdK3PTpsKf5Bh54ej3F-Uj2U3hkBsq6YTVGeqddO1tMEMA3fMeLgmFhhQydBr4uE6A1KxL9xzE5Uij9GXZHS7rsQjzmohpIzHiwc3wzsw3ZYAQ0DyutAGWr-F6xs9KI-GECNqIbxhtA6PbqQKpfcP0RH1m9eYU4rWy3siDozLYmmgpVISLh7olVpbSqgb9x56QfTCnnMcB3bwqMFNYIjJvDuiS9ZDPTwVJHJEA";

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1440px] w-full mx-auto space-y-space-xl">
        
        {/* Header Greeting & User Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pt-space-xs">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-space-xs tracking-tight">
              Hello, {firstName}! <span className="inline-block hover:rotate-12 transition-transform cursor-default select-none">👋</span>
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Let's make communication more inclusive together.
            </p>
          </div>
          <div className="flex items-center gap-space-md">
            <button
              aria-label="Notifications"
              className="relative p-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-container"></span>
            </button>
            <div className="flex items-center gap-space-sm bg-surface-container pl-2 pr-4 py-1.5 rounded-xl">
              <img
                className="w-8 h-8 rounded-full object-cover shadow-sm"
                alt={`${displayName} avatar`}
                src={avatarUrl}
              />
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface leading-tight font-semibold truncate max-w-[140px]">{displayName}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight truncate max-w-[140px]">{userSubtitle}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter-desktop">
          {/* Card 1: Sign Language Recognition */}
          <div className="group relative rounded-xl bg-[#ebf3ff] p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="space-y-space-md">
              <div className="w-12 h-12 rounded-xl bg-[#c9deff] flex items-center justify-center text-primary transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[26px]">photo_camera</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Sign Language Recognition</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 leading-relaxed">
                  Upload or record ISL video and get instant results
                </p>
              </div>
            </div>
            <div className="pt-space-lg mt-auto">
              <Link
                to="/translation?mode=sign-to-text"
                className="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary hover:text-primary-container font-semibold transition-colors"
              >
                <span>Try Now</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Voice Input */}
          <div className="group relative rounded-xl bg-[#e8f9f3] p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="space-y-space-md">
              <div className="w-12 h-12 rounded-xl bg-[#d3f2e7] flex items-center justify-center text-[#059669] transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[26px]">mic</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Voice Input</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 leading-relaxed">
                  Speak and convert to text &amp; signs
                </p>
              </div>
            </div>
            <div className="pt-space-lg mt-auto">
              <Link
                to="/translation?mode=speech-to-text"
                className="inline-flex items-center gap-space-xs font-label-md text-label-md text-[#059669] hover:text-[#047857] font-semibold transition-colors"
              >
                <span>Try Now</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 3: Text to Sign */}
          <div className="group relative rounded-xl bg-[#f3f1ff] p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="space-y-space-md">
              <div className="w-12 h-12 rounded-xl bg-[#e7e4ff] flex items-center justify-center text-primary-container transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[26px]">translate</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Text to Sign</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 leading-relaxed">
                  Type text and see it in sign language
                </p>
              </div>
            </div>
            <div className="pt-space-lg mt-auto">
              <Link
                to="/translation?mode=text-to-sign"
                className="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary-container hover:text-primary font-semibold transition-colors"
              >
                <span>Try Now</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 4: Learn ISL */}
          <div className="group relative rounded-xl bg-[#fff4e8] p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="space-y-space-md">
              <div className="w-12 h-12 rounded-xl bg-[#ffe0be] flex items-center justify-center text-[#d97706] transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[26px]">school</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Learn ISL</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 leading-relaxed">
                  Interactive lessons with feedback
                </p>
              </div>
            </div>
            <div className="pt-space-lg mt-auto">
              <Link
                to="/learn"
                className="inline-flex items-center gap-space-xs font-label-md text-label-md text-[#d97706] hover:text-[#b45309] font-semibold transition-colors"
              >
                <span>Start Learning</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 12-Column Middle Grid: Quick Stats + Community Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-stretch">
          
          {/* Quick Stats Card (6 columns) */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm text-on-surface">
                  <span className="material-symbols-outlined text-[22px] text-primary-container">bar_chart</span>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Quick Stats</h2>
                </div>
                <div className="flex items-center gap-2">
                  <SampleDataBadge />
                  <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                    This Week
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-lg mt-space-lg">
                <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Total Sessions</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-display text-display text-on-surface font-bold leading-none">124</span>
                    <span className="font-label-sm text-label-sm text-primary flex items-center font-semibold">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span> +12%
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline mt-2">26 hrs practiced</span>
                </div>

                <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Learning Progress</span>
                    <span className="font-label-md text-label-md text-on-surface font-bold">78%</span>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-surface-container-highest h-2.5 rounded-full overflow-hidden">
                      <div className="bg-primary-container h-full rounded-full transition-all duration-500 ease-out" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-outline font-label-sm text-label-sm mt-3">
                    <span>Module 4 of 6</span>
                    <span>Level: Intermediate</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-space-lg flex items-center justify-between text-on-surface-variant border-t border-surface-container/50 mt-space-md">
              <div className="flex items-center gap-space-xs font-body-sm text-body-sm">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                <span>Streak: 7 days active</span>
              </div>
              <Link
                to="/learn"
                className="font-label-md text-label-md text-primary-container hover:text-primary flex items-center gap-1 transition-colors font-semibold"
              >
                <span>View learning details</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>
          </div>

          {/* Inspirational Community Banner (6 columns) */}
          <div className="lg:col-span-6 rounded-xl bg-gradient-to-r from-[#5145E5] to-[#6D28D9] p-space-lg shadow-sm text-on-primary relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="relative z-10 max-w-[62%] sm:max-w-[68%]">
              <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-space-md">
                <span className="material-symbols-outlined text-[20px] text-white">favorite</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-white tracking-tight leading-snug">
                Together towards an accessible world
              </h2>
              <p className="font-body-md text-body-md text-white/80 mt-space-xs line-clamp-2">
                Empowering every conversation with real-time Indian Sign Language tools and adaptive learning paths.
              </p>
              <div className="mt-space-md">
                <Link
                  to="/translation"
                  className="inline-flex items-center gap-2 bg-white text-[#5145E5] px-4 py-2 rounded-lg font-label-md text-label-md font-bold shadow-sm hover:bg-surface-container-low transition-colors"
                >
                  <span>Explore Tools</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-2/5 sm:w-1/3 pointer-events-none flex items-end justify-end">
              <img
                className="h-full w-full object-cover object-top select-none pointer-events-none"
                alt="ISL sign presenter"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7bJbrV86bHRastnYUuLvSn6SjwLNvXPp0sH5NxqGC2hCTuuowg3gzXEFgWGlYtb99N_Uk0TkP0nyJKk2JsZM08w_BFr-thv5hirqlqdvxlkFmeMPp9ptK_ybIImPh4GJ5X03NyEXpMMg0zGoWDtXq-4u7ynL7y5iEs0Z-sZOlm16JrKcgcjInkc--N9eqQsEKIzegdKw9zwZjfZ3KkLgWtbi-7sc4p7Gz7VFClUU"
              />
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          </div>
        </div>

        {/* Recent Practice Activity */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
          <div className="flex items-center justify-between mb-space-md">
            <div className="flex items-center gap-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Recent Practice Activity</h3>
              <SampleDataBadge />
            </div>
            <span className="font-label-sm text-label-sm text-outline">Updated 10m ago</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            <Link
              to="/practice"
              className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#EBF3FF] flex items-center justify-center text-primary transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[20px]">waving_hand</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-md text-label-md text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                  Common Greetings
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Score: 92% • 12 Signs</p>
              </div>
            </Link>

            <Link
              to="/practice"
              className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#E8F9F3] flex items-center justify-center text-[#059669] transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[20px]">family_restroom</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-md text-label-md text-on-surface font-semibold truncate group-hover:text-[#059669] transition-colors">
                  Family &amp; Relations
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Score: 88% • 18 Signs</p>
              </div>
            </Link>

            <Link
              to="/practice"
              className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#FFF4E8] flex items-center justify-center text-[#D97706] transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[20px]">emergency</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-md text-label-md text-on-surface font-semibold truncate group-hover:text-[#D97706] transition-colors">
                  Emergency Phrases
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Score: 96% • 8 Signs</p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

