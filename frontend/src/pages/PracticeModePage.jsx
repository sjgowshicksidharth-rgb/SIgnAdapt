import React, { useState } from 'react';
import DonutGauge from '../components/ui/DonutGauge';
import SampleDataBadge from '../components/ui/SampleDataBadge';

export default function PracticeModePage() {
  const [practiceState, setPracticeState] = useState('correct'); // 'correct' | 'partial' | 'try_again' | 'error'
  const [nextSignRotated, setNextSignRotated] = useState(false);
  const [currentSignIndex, setCurrentSignIndex] = useState(0);

  const signsList = [
    { label: 'Thank You', next: 'Namaste / Hello' },
    { label: 'Namaste / Hello', next: 'Please' },
    { label: 'Please', next: 'Good Morning' },
    { label: 'Good Morning', next: 'Thank You' }
  ];

  const handleNextSign = () => {
    setNextSignRotated(true);
    setTimeout(() => {
      setNextSignRotated(false);
      setCurrentSignIndex((prev) => (prev + 1) % signsList.length);
    }, 200);
  };

  // State configurations matching original Stitch design
  const stateConfigs = {
    correct: {
      badge: { dot: 'bg-emerald-500 animate-pulse', text: 'Live ISL Detection', container: 'bg-surface-container-high text-primary' },
      hud: {
        bracketColor: 'text-emerald-500',
        dot: 'bg-emerald-400 animate-pulse',
        text: 'Pose Tracking: Active',
        container: 'bg-[#171a36]/75 text-surface-container-lowest'
      },
      footnote: { icon: 'verified', iconColor: 'text-emerald-600', text: 'Hand Landmarks (21 points) Calibrated' },
      bottomBar: { dot: 'bg-emerald-400 animate-ping', label: 'FHD 60FPS' },
      feedback: {
        glow: 'bg-emerald-50',
        iconBox: 'bg-emerald-500 text-surface-container-lowest shadow-emerald-500/20',
        icon: 'check',
        title: 'Correct!',
        titleColor: 'text-emerald-500',
        sub1: 'Great job!',
        sub2: 'Keep it up!',
        showAction: false
      },
      gauge: {
        percentage: 85,
        colorClass: 'text-emerald-500',
        metricName: 'Accuracy',
        trendColor: 'text-emerald-600',
        trendIcon: 'trending_up',
        trendText: '+4% vs last practice'
      },
      tip: {
        icon: 'lightbulb',
        iconColor: 'text-primary',
        headline: 'Pose Diagnostic:',
        content: 'All 21 hand landmarks tracking accurately in bounding zone. Maintain current camera distance.',
        pill1: 'Finger Spacing: 96%',
        pill2: 'Wrist Elevation: Optimal'
      },
      telemetry: {
        hold: '1.8s / 2.0s',
        latency: '42 ms (Real-time)',
        repetitions: '12 of 15 Signs'
      }
    },
    partial: {
      badge: { dot: 'bg-amber-500 animate-pulse', text: 'Partial Alignment', container: 'bg-amber-100 text-amber-800' },
      hud: {
        bracketColor: 'text-amber-500',
        dot: 'bg-amber-400 animate-pulse',
        text: 'Hand Orientation: 15° Offset',
        container: 'bg-amber-950/80 text-amber-200 border border-amber-500/40'
      },
      footnote: { icon: 'warning', iconColor: 'text-amber-500', text: 'Landmark Warning: Wrist pitch deviation detected' },
      bottomBar: { dot: 'bg-amber-400 animate-pulse', label: 'FHD 60FPS (Warning)' },
      feedback: {
        glow: 'bg-amber-100/70',
        iconBox: 'bg-amber-500 text-surface-container-lowest shadow-amber-500/30',
        icon: 'hand_gesture',
        title: 'Almost there!',
        titleColor: 'text-amber-500',
        sub1: 'Keep your dominant wrist elevated higher',
        sub2: 'Align palms parallel to chest plane',
        showAction: true,
        actionClass: 'bg-amber-500 hover:bg-amber-600 text-surface-container-lowest',
        actionIcon: 'tune',
        actionLabel: 'Adjust & Re-check'
      },
      gauge: {
        percentage: 62,
        colorClass: 'text-amber-500',
        metricName: 'Match Score',
        trendColor: 'text-amber-600',
        trendIcon: 'straight',
        trendText: '-18% offset threshold'
      },
      tip: {
        icon: 'tune',
        iconColor: 'text-amber-500',
        headline: 'Landmark Breakdown:',
        content: 'Dominant hand pitch is rotated 15° forward relative to ISL standard Thank-You sign form.',
        pill1: 'Finger Spacing: Good (92%)',
        pill2: 'Wrist Angle: Low (54%)'
      },
      telemetry: {
        hold: '1.2s / 2.0s',
        latency: '48 ms',
        repetitions: '12 of 15 Signs'
      }
    },
    try_again: {
      badge: { dot: 'bg-rose-500 animate-pulse', text: 'Low Confidence', container: 'bg-rose-100 text-rose-800' },
      hud: {
        bracketColor: 'text-rose-500',
        dot: 'bg-rose-400 animate-ping',
        text: 'Motion Blur Detected • Repeat slowly',
        container: 'bg-rose-950/85 text-rose-200 border border-rose-500/40'
      },
      footnote: { icon: 'error_outline', iconColor: 'text-rose-500', text: 'Incomplete Keyframe Capture (Confidence: 34%)' },
      bottomBar: { dot: 'bg-rose-400 animate-ping', label: 'Motion Detected' },
      feedback: {
        glow: 'bg-rose-100/70',
        iconBox: 'bg-rose-500 text-surface-container-lowest shadow-rose-500/30',
        icon: 'replay',
        title: 'Sign Not Recognized',
        titleColor: 'text-rose-500',
        sub1: 'Movement too fast or outside gesture frame',
        sub2: 'Hold gesture steady for at least 1.5 seconds',
        showAction: true,
        actionClass: 'bg-rose-500 hover:bg-rose-600 text-surface-container-lowest',
        actionIcon: 'refresh',
        actionLabel: 'Retry Gesture'
      },
      gauge: {
        percentage: 34,
        colorClass: 'text-rose-500',
        metricName: 'Confidence',
        trendColor: 'text-rose-600',
        trendIcon: 'trending_down',
        trendText: 'Below recognition floor (70%)'
      },
      tip: {
        icon: 'speed',
        iconColor: 'text-rose-500',
        headline: 'Actionable Tip:',
        content: 'Gesture speed exceeded 1.2m/s causing blur on finger tips. Smoothly guide hand from chin to neutral position.',
        pill1: 'Hand Speed: Too Fast',
        pill2: 'Target Hold: 1.5s Min'
      },
      telemetry: {
        hold: '0.4s / 2.0s',
        latency: '51 ms',
        repetitions: '12 of 15 Signs'
      }
    },
    error: {
      badge: { dot: 'bg-error', text: 'Sensor Disconnected', container: 'bg-error-container text-error' },
      hud: {
        bracketColor: 'text-outline/40',
        dot: 'bg-error',
        text: 'Camera Offline',
        container: 'bg-[#171a36]/90 text-surface-container-lowest'
      },
      footnote: { icon: 'cloud_off', iconColor: 'text-error', text: 'Video Stream Pipe Closed (ERR_DEVICE_BUSY)' },
      bottomBar: { dot: 'bg-error', label: 'Offline' },
      feedback: {
        glow: 'bg-surface-container',
        iconBox: 'bg-surface-variant text-on-surface-variant',
        icon: 'sensors_off',
        title: 'Sensor Offline',
        titleColor: 'text-outline',
        sub1: 'Hand landmarks not detected',
        sub2: 'Ensure face and hands are clearly lit',
        showAction: true,
        actionClass: 'bg-primary hover:bg-primary/90 text-on-primary',
        actionIcon: 'video_call',
        actionLabel: 'Reconnect Camera'
      },
      gauge: {
        percentage: null,
        displayValue: '--%',
        colorClass: 'text-surface-container-high',
        metricName: 'Stream Status',
        trendColor: 'text-outline',
        trendIcon: 'sync_disabled',
        trendText: 'Awaiting video stream'
      },
      tip: {
        icon: 'info',
        iconColor: 'text-outline',
        headline: 'Hardware Diagnostics:',
        content: 'No frames received in the last 4000ms. Check browser device access in Chrome/Edge settings.',
        pill1: 'FPS: 0',
        pill2: 'Status: Disconnected'
      },
      telemetry: {
        hold: '0.0s / 2.0s',
        latency: '-- ms',
        repetitions: '12 of 15 Signs'
      }
    }
  };

  const currentConfig = stateConfigs[practiceState];

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-space-lg w-full max-w-[1400px] mx-auto py-space-sm">
        
        {/* Title Area & State Switcher Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-surface-container-high pb-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-space-sm flex-wrap">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Practice Mode</h1>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm transition-colors ${currentConfig.badge.container}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${currentConfig.badge.dot}`}></span>
                <span>{currentConfig.badge.text}</span>
              </span>
              <SampleDataBadge label="PRD FR-09" />
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">Show the sign and get instant feedback</p>
          </div>

          {/* Interactive State Machine Switcher (from Stitch UI) */}
          <div className="flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded-full border border-surface-variant overflow-x-auto select-none">
            <button
              type="button"
              onClick={() => setPracticeState('correct')}
              className={`px-3.5 py-1.5 rounded-full font-label-sm text-label-sm font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                practiceState === 'correct'
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Correct (Success)</span>
            </button>

            <button
              type="button"
              onClick={() => setPracticeState('partial')}
              className={`px-3.5 py-1.5 rounded-full font-label-sm text-label-sm font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                practiceState === 'partial'
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">warning</span>
              <span>Partial Match (62%)</span>
            </button>

            <button
              type="button"
              onClick={() => setPracticeState('try_again')}
              className={`px-3.5 py-1.5 rounded-full font-label-sm text-label-sm font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                practiceState === 'try_again'
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">replay</span>
              <span>Try Again</span>
            </button>

            <button
              type="button"
              onClick={() => setPracticeState('error')}
              className={`px-3.5 py-1.5 rounded-full font-label-sm text-label-sm font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                practiceState === 'error'
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">videocam_off</span>
              <span>Camera Error</span>
            </button>
          </div>
        </div>

        {/* Main Practice 3-Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-stretch w-full">
          
          {/* Card 1: Camera Preview with HUD Reticles (6 columns) */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl border border-surface-container-high/60 shadow-sm p-space-md flex flex-col justify-between relative overflow-hidden group">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#0d0f22] flex items-center justify-center">
              {/* Camera Stream Image */}
              <img
                className={`w-full h-full object-cover transition-all duration-500 select-none ${
                  practiceState === 'error' ? 'grayscale blur-sm' : 'group-hover:scale-[1.01]'
                }`}
                alt="ISL practitioner"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFjR4yevLvklQahRAup2BVpDnKTD9UnbXzulVqE5VyVTY2H6_uEI4_1rleOEA0q1XDmSUCDTjXGZJsxwJJeqoXn4qHKbHT_X6-Zrh1CbbxNUvUUT84xyKqoCOZQyJsnjyjjs-1F8KvAjfQtXCmqlWqB9BOami_VB-MU8H0uexFO3ijiS2Y-8lSDsuMtNtsJp80nL6bjx5SdRyz7WIimpxHiRqQobYP7LbVUG9rDBU"
              />

              {/* HUD Framing Brackets */}
              {practiceState !== 'error' && (
                <div className="absolute inset-5 pointer-events-none flex flex-col justify-between transition-all duration-300">
                  <div className="flex justify-between items-start w-full">
                    <svg className={`w-10 h-10 ${currentConfig.hud.bracketColor} drop-shadow-sm transition-colors duration-300`} fill="none" viewBox="0 0 40 40">
                      <path d="M4 36 V6 C4 4.89543 4.89543 4 6 4 H36" stroke="currentColor" strokeLinecap="round" strokeWidth="4.5"></path>
                    </svg>
                    <svg className={`w-10 h-10 ${currentConfig.hud.bracketColor} drop-shadow-sm transition-colors duration-300`} fill="none" viewBox="0 0 40 40">
                      <path d="M36 36 V6 C36 4.89543 35.1046 4 34 4 H4" stroke="currentColor" strokeLinecap="round" strokeWidth="4.5"></path>
                    </svg>
                  </div>

                  <div className="self-center flex flex-col items-center gap-1">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-sm font-label-sm text-label-sm shadow-md ${currentConfig.hud.container}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${currentConfig.hud.dot}`}></span>
                      <span>{currentConfig.hud.text}</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-end w-full">
                    <svg className={`w-10 h-10 ${currentConfig.hud.bracketColor} drop-shadow-sm transition-colors duration-300`} fill="none" viewBox="0 0 40 40">
                      <path d="M4 4 V34 C4 35.1046 4.89543 36 6 36 H36" stroke="currentColor" strokeLinecap="round" strokeWidth="4.5"></path>
                    </svg>
                    <svg className={`w-10 h-10 ${currentConfig.hud.bracketColor} drop-shadow-sm transition-colors duration-300`} fill="none" viewBox="0 0 40 40">
                      <path d="M36 4 V34 C36 35.1046 35.1046 36 34 36 H4" stroke="currentColor" strokeLinecap="round" strokeWidth="4.5"></path>
                    </svg>
                  </div>
                </div>
              )}

              {/* Camera Error Disconnected Screen Overlay */}
              {practiceState === 'error' && (
                <div className="absolute inset-0 bg-[#161935]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
                  <div className="w-16 h-16 rounded-full bg-error-container text-error flex items-center justify-center mb-space-md shadow-md animate-pulse">
                    <span className="material-symbols-outlined text-[32px]">videocam_off</span>
                  </div>
                  <h4 className="font-headline-md text-headline-md font-bold text-surface-container-lowest mb-1">
                    Camera Feed Disconnected
                  </h4>
                  <p className="font-body-sm text-body-sm text-[#8f9cae] max-w-sm mb-space-md">
                    Unable to acquire live video stream. Check device camera permissions or verify physical connection.
                  </p>
                  <button
                    type="button"
                    onClick={() => setPracticeState('correct')}
                    className="inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-sm text-label-sm font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                    <span>Reconnect Camera</span>
                  </button>
                </div>
              )}

              {/* Bottom Camera Bar Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-lg bg-[#171a36]/75 backdrop-blur-md text-surface-container-lowest z-10">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${currentConfig.bottomBar.dot}`}></span>
                  <span className="font-label-sm text-label-sm font-medium tracking-wide">
                    {currentConfig.bottomBar.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="text-surface-container-lowest/80 hover:text-surface-container-lowest transition-colors flex items-center"
                    title="Calibrate Frame"
                  >
                    <span className="material-symbols-outlined text-[18px]">fit_screen</span>
                  </button>
                  <button
                    type="button"
                    className="text-surface-container-lowest/80 hover:text-surface-container-lowest transition-colors flex items-center"
                    title="Switch Camera"
                  >
                    <span className="material-symbols-outlined text-[18px]">flip_camera_ios</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Camera Status Footnote */}
            <div className="flex items-center justify-between mt-space-md pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <div className="flex items-center gap-1.5">
                <span className={`material-symbols-outlined text-[16px] ${currentConfig.footnote.iconColor}`}>
                  {currentConfig.footnote.icon}
                </span>
                <span>{currentConfig.footnote.text}</span>
              </div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                ISL DICTIONARY V2.4
              </span>
            </div>
          </div>

          {/* Card 2: Feedback & Next Sign (3 columns) */}
          <div className="lg:col-span-3 flex flex-col gap-space-lg">
            {/* Feedback Box */}
            <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high/60 shadow-sm p-space-lg flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className={`absolute -top-12 -right-12 w-32 h-32 ${currentConfig.feedback.glow} rounded-full blur-2xl pointer-events-none transition-all duration-300`}></div>
              
              {/* Feedback Status Icon */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-space-md transition-all duration-300 ${currentConfig.feedback.iconBox}`}>
                <span className="material-symbols-outlined text-[36px]">
                  {currentConfig.feedback.icon}
                </span>
              </div>

              {/* Status Headline & Subtitles */}
              <h2 className={`font-headline-lg text-headline-lg font-bold tracking-tight mb-1 transition-colors duration-300 ${currentConfig.feedback.titleColor}`}>
                {currentConfig.feedback.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface font-semibold transition-colors duration-300">
                {currentConfig.feedback.sub1}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant transition-colors duration-300">
                {currentConfig.feedback.sub2}
              </p>

              {/* Action Button */}
              {currentConfig.feedback.showAction && (
                <div className="mt-space-md w-full">
                  <button
                    type="button"
                    onClick={() => setPracticeState('correct')}
                    className={`w-full py-2 px-3 rounded-lg font-label-sm text-label-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${currentConfig.feedback.actionClass}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{currentConfig.feedback.actionIcon}</span>
                    <span>{currentConfig.feedback.actionLabel}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Next Sign Interactive Tile */}
            <div
              className="bg-surface-container-lowest rounded-xl border border-surface-container-high/60 shadow-sm p-space-md flex items-center justify-between hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={handleNextSign}
            >
              <div className="flex flex-col min-w-0 pr-2">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Next Sign
                </span>
                <span className="font-headline-md text-headline-md font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                  {signsList[currentSignIndex].next}
                </span>
              </div>
              <button
                aria-label="Proceed to Next Sign"
                className={`w-11 h-11 shrink-0 rounded-full bg-primary-container text-on-primary flex items-center justify-center transition-all duration-200 group-hover:bg-primary group-hover:scale-105 active:scale-95 shadow-sm shadow-primary/20 ${
                  nextSignRotated ? 'rotate-45' : ''
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Card 3: Performance Circular Metric (3 columns) */}
          <div className="lg:col-span-3 bg-surface-container-lowest rounded-xl border border-surface-container-high/60 shadow-sm p-space-lg flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-md">
            <div className="w-full flex items-center justify-between pb-space-sm">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
                Performance
              </h3>
              <span
                className="material-symbols-outlined text-outline-variant hover:text-on-surface transition-colors cursor-pointer text-[20px]"
                title="Evaluated ISL keypoint accuracy"
              >
                info
              </span>
            </div>

            {/* Radial Gauge */}
            <DonutGauge
              percentage={currentConfig.gauge.percentage}
              displayValue={currentConfig.gauge.displayValue}
              colorClass={currentConfig.gauge.colorClass}
            />

            <div className="flex flex-col items-center gap-1 pb-space-xs">
              <span className="font-body-md text-body-md font-semibold text-on-surface-variant">
                {currentConfig.gauge.metricName}
              </span>
              <div className={`flex items-center gap-1 font-label-sm text-label-sm font-semibold transition-colors duration-300 ${currentConfig.gauge.trendColor}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {currentConfig.gauge.trendIcon}
                </span>
                <span>{currentConfig.gauge.trendText}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Practice Toolbar & Telemetry Section */}
        <div className="flex flex-col gap-space-md mt-space-xs">
          
          {/* Contextual Feedback & Landmark Breakdown Bar */}
          <div className="w-full rounded-xl bg-surface-container-low border border-surface-container-high px-space-md py-space-sm flex flex-col md:flex-row items-center justify-between gap-space-sm transition-all duration-300">
            <div className="flex items-center gap-space-sm text-on-surface-variant text-body-sm font-body-sm">
              <span className={`material-symbols-outlined text-[20px] ${currentConfig.tip.iconColor}`}>
                {currentConfig.tip.icon}
              </span>
              <span className="font-medium text-on-surface">{currentConfig.tip.headline}</span>
              <span>{currentConfig.tip.content}</span>
            </div>
            <div className="flex items-center gap-space-sm shrink-0">
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                {currentConfig.tip.pill1}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                {currentConfig.tip.pill2}
              </span>
            </div>
          </div>

          {/* Quick Practice Telemetry row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
            <div className="bg-surface-container-low rounded-lg p-space-md flex items-center gap-space-md border border-surface-container-high/40">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[22px]">timer</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Hold Gesture Duration</span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {currentConfig.telemetry.hold}
                </span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-lg p-space-md flex items-center gap-space-md border border-surface-container-high/40">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[22px]">auto_fix_high</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">AI Latency</span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {currentConfig.telemetry.latency}
                </span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-lg p-space-md flex items-center gap-space-md border border-surface-container-high/40">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[22px]">repeat</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Repetitions Completed</span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {currentConfig.telemetry.repetitions}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

