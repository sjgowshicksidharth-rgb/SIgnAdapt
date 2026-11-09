import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ToggleSwitch from '../components/ui/ToggleSwitch';

export default function ProfileSettingsPage() {
  const { user, isAuthenticated } = useAuth0();

  const initialName = (isAuthenticated && (user?.name || user?.nickname)) || 'SignAdapt User';
  const initialEmail = (isAuthenticated && user?.email) || 'user@example.com';

  const [userName, setUserName] = useState(initialName);
  const [userEmail, setUserEmail] = useState(initialEmail);
  const [tempName, setTempName] = useState(initialName);
  const [tempEmail, setTempEmail] = useState(initialEmail);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.name || user.nickname) {
        setUserName(user.name || user.nickname);
      }
      if (user.email) {
        setUserEmail(user.email);
      }
    }
  }, [isAuthenticated, user]);

  const avatarUrl = user?.picture || "https://lh3.googleusercontent.com/aida-public/AB6AXuBtt9MR225fHWfC4jUdHvj4Su3-uZM4_yz48ubNNbJgtRq9MC1zZYOnBFj0_tcumi6yjwvI6tKhENybMAUlZMNfCx9y6Kk9iMnvXfl6ZqI6LUV9EEuSPQbyuTfyzAwm0ax_iyAZqn5C_U-h-BWuhdA13cfFkpgLT0olOeTQWaknFiG4cpiy3hVHrVk32fR077pxHFzOHdLe1TOv5uR8OGwoRqT-NZnHqIwvvYf1eTY";

  // Preferences toggles
  const [preferences, setPreferences] = useState({
    tts: true,
    avatar: true,
    notify: true
  });

  const handleSaveModal = (e) => {
    e.preventDefault();
    setUserName(tempName);
    setUserEmail(tempEmail);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setTempName(userName);
    setTempEmail(userEmail);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-space-lg py-space-sm">
      
      {/* Title */}
      <div className="flex flex-col gap-space-xs">
        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          Profile &amp; Settings
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Manage your account and preferences
        </p>
      </div>

      {/* 2-Column Grid: Profile Info & Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        
        {/* Card 1: Profile Information */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between gap-space-lg border border-surface-container-high/40">
          <div className="flex flex-col gap-space-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Profile Information
            </h2>
            <div className="flex items-center gap-space-lg pt-space-xs">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 shadow-sm bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Profile portrait of user"
                  src={avatarUrl}
                />
              </div>
              <div className="flex flex-col gap-space-xs min-w-0">
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block font-semibold">
                    User Name
                  </span>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                    {userName}
                  </p>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block font-semibold">
                    Email
                  </span>
                  <p className="font-body-md text-body-md text-on-surface-variant truncate">
                    {userEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-space-sm border-t border-surface-container/50">
            <button
              className="w-full bg-primary-container hover:bg-primary transition-colors text-on-primary font-headline-sm text-headline-sm py-3 px-space-lg rounded-lg shadow-sm flex items-center justify-center gap-space-sm cursor-pointer"
              type="button"
              onClick={handleOpenModal}
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Card 2: Preferences */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high/40">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Preferences
          </h2>
          <div className="flex flex-col gap-space-md pt-space-xs">
            {/* Preference: Text-to-Speech */}
            <div className="flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[22px]">volume_up</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Enable Text-to-Speech
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Hear translated signs spoken aloud
                  </span>
                </div>
              </div>
              <ToggleSwitch
                ariaLabel="Enable Text-to-Speech"
                checked={preferences.tts}
                onChange={(val) => setPreferences((p) => ({ ...p, tts: val }))}
              />
            </div>

            {/* Preference: Sign Avatar */}
            <div className="flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[22px]">accessibility_new</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Enable Sign Avatar
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Show 3D animated signs alongside text
                  </span>
                </div>
              </div>
              <ToggleSwitch
                ariaLabel="Enable Sign Avatar"
                checked={preferences.avatar}
                onChange={(val) => setPreferences((p) => ({ ...p, avatar: val }))}
              />
            </div>

            {/* Preference: Notifications */}
            <div className="flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[22px]">notifications</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Notifications
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Practice reminders and lesson updates
                  </span>
                </div>
              </div>
              <ToggleSwitch
                ariaLabel="Enable Notifications"
                checked={preferences.notify}
                onChange={(val) => setPreferences((p) => ({ ...p, notify: val }))}
              />
            </div>
          </div>
        </div>

      </div>

      {/* About SignAdapt Full-Width Banner */}
      <div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg border border-surface-container-high/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none overflow-hidden opacity-60">
          <svg className="h-full w-full object-cover preserve-3d" fill="none" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M120 0C220 80 180 140 400 200V0H120Z" fill="url(#waveGrad1)"></path>
            <path d="M220 0C300 70 280 160 400 200V0H220Z" fill="url(#waveGrad2)"></path>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="waveGrad1" x1="120" x2="400" y1="0" y2="200">
                <stop stopColor="#dad7ff" stopOpacity="0.4"></stop>
                <stop offset="1" stopColor="#8f8bff" stopOpacity="0.15"></stop>
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="waveGrad2" x1="220" x2="400" y1="0" y2="200">
                <stop stopColor="#5145e5" stopOpacity="0.1"></stop>
                <stop offset="1" stopColor="#c4c0ff" stopOpacity="0.25"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex items-start gap-space-lg relative z-10 max-w-2xl">
          <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center flex-shrink-0 text-primary-container shadow-sm">
            <span className="material-symbols-outlined text-[28px]">sign_language</span>
          </div>
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">About SignAdapt</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-surface-container text-primary font-label-sm">
                ISL v2
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              An inclusive platform for accessible communication using Text, Speech and Indian Sign Language (ISL).
            </p>
          </div>
        </div>

        <div className="relative z-10 flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-space-xs">
          <span className="font-label-sm text-label-sm text-outline font-semibold">Application Version</span>
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-wider bg-surface-container-low px-space-md py-1 rounded-md border border-surface-variant/30">
            v1.0.0
          </span>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#171a36]/60 backdrop-blur-sm z-50 flex items-center justify-center p-space-md animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-xl max-w-md w-full p-space-lg shadow-xl flex flex-col gap-space-md border border-surface-container-high/60">
            <div className="flex items-center justify-between border-b border-surface-container pb-3">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Update Profile</h3>
              <button
                className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Full Name</label>
                <input
                  className="w-full bg-surface-container-low px-space-md py-2.5 rounded-lg text-body-md text-on-surface outline-none border border-surface-container-high focus:bg-surface-container-lowest focus:border-primary transition"
                  type="text"
                  required
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Email Address</label>
                <input
                  className="w-full bg-surface-container-low px-space-md py-2.5 rounded-lg text-body-md text-on-surface outline-none border border-surface-container-high focus:bg-surface-container-lowest focus:border-primary transition"
                  type="email"
                  required
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-surface-container">
                <button
                  className="px-space-md py-2 rounded-lg text-body-md font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-space-lg py-2 rounded-lg text-body-md font-semibold bg-primary-container text-on-primary hover:bg-primary transition-colors shadow-sm cursor-pointer"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

