import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SampleDataBadge from '../components/ui/SampleDataBadge';

export default function SignLearningPage() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('beginner'); // 'beginner' | 'intermediate' | 'advanced'
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSlowMotion, setIsSlowMotion] = useState(false);
  const [videoTime, setVideoTime] = useState('0:04');

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSlowReplay = () => {
    setIsSlowMotion(true);
    setIsPlaying(true);
    setVideoTime('0:01');
    setTimeout(() => {
      setIsSlowMotion(false);
      setVideoTime('0:04');
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg max-w-7xl mx-auto">
      
      {/* Title & Difficulty Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-space-xs">
        <div className="flex flex-col">
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Sign Learning</h1>
          <p className="font-body-md text-body-md text-outline">Learn ISL step by step with interactive practice</p>
        </div>
        
        <div className="inline-flex items-center p-1 rounded-full bg-surface-container shadow-sm self-start sm:self-auto border border-surface-variant/30" role="tablist">
          <button
            className={`px-space-md py-1.5 rounded-full font-headline-sm text-headline-sm transition-all ${
              difficulty === 'beginner'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
            onClick={() => setDifficulty('beginner')}
          >
            Beginner
          </button>
          <button
            className={`px-space-md py-1.5 rounded-full font-headline-sm text-headline-sm transition-all ${
              difficulty === 'intermediate'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
            onClick={() => setDifficulty('intermediate')}
          >
            Intermediate
          </button>
          <button
            className={`px-space-md py-1.5 rounded-full font-headline-sm text-headline-sm transition-all ${
              difficulty === 'advanced'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
            onClick={() => setDifficulty('advanced')}
          >
            Advanced
          </button>
        </div>
      </div>

      {/* Main Grid: 7-col Video + 5-col Lesson Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        
        {/* Left Column: Lesson Demonstration Video (7 tracks) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-inverse-surface shadow-md group select-none border border-surface-container-high/40">
            <img
              className="w-full h-full object-cover"
              alt="Indian female sign language instructor demonstrating greeting sign in ISL"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGvpyWW-5tRTYInEilSNLOMlH51ga1NU7zh8KPqbewUYP_2F8kRpNhLqbVhpPeAeVwneqLZk05wy-Bs8EKiDlxyMCmx8Ekgf3wXJ-5JkXtXPxEve69BKmTgk-fs9Pu80mXuk--36Z5MPMDyQBmc9m4Os4jS1Pj3VlIyB4feWNE_BJPgL5hPQB9fSEEo2xIiLxOaUUl_EBRPI1f99WbOb6DmiPOdRDLDC4HX9-4-K8"
            />
            
            {/* Top Badge */}
            <div className="absolute top-space-md left-space-md flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-inverse-surface/70 backdrop-blur-md text-on-primary text-[11px] font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
              <span>ISL • GREETINGS 01</span>
            </div>

            {/* Play/Pause Center Indicator Overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={togglePlayback}
            >
              <div
                className={`w-16 h-16 rounded-full bg-inverse-surface/60 backdrop-blur-md text-on-primary flex items-center justify-center transition-all duration-300 pointer-events-auto ${
                  !isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                }`}
              >
                <span className="material-symbols-outlined text-[32px] translate-x-0.5">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-inverse-surface/95 via-inverse-surface/75 to-transparent pt-10 pb-space-sm px-space-md flex flex-col gap-2 transition-opacity duration-200">
              {/* Timeline Bar */}
              <div className="w-full flex items-center gap-space-sm cursor-pointer group/timeline py-1">
                <div className="relative w-full h-1 bg-surface-variant/30 rounded-full overflow-hidden group-hover/timeline:h-1.5 transition-all">
                  <div className="absolute left-0 top-0 bottom-0 w-[42%] bg-primary-container rounded-full"></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between text-on-primary font-body-sm text-body-sm">
                <div className="flex items-center gap-space-md">
                  <button
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="hover:text-primary-fixed transition-colors flex items-center justify-center"
                    type="button"
                    onClick={togglePlayback}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <div className="flex items-center gap-space-xs group/vol">
                    <button
                      aria-label="Volume"
                      className="hover:text-primary-fixed transition-colors flex items-center"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">volume_up</span>
                    </button>
                    <div className="w-14 h-1 bg-surface-variant/30 rounded-full relative overflow-hidden hidden sm:block">
                      <div className="w-3/4 h-full bg-on-primary rounded-full"></div>
                    </div>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-primary/80 select-none">
                    <span>{videoTime}</span> / <span>0:10</span>
                  </span>
                </div>

                <div className="flex items-center gap-space-sm sm:gap-space-md">
                  <button
                    className="hover:text-primary-fixed transition-colors flex items-center"
                    title="Playback speed"
                    type="button"
                    onClick={() => setIsSlowMotion(!isSlowMotion)}
                  >
                    <span className="font-label-sm text-label-sm font-bold bg-white/10 px-1.5 py-0.5 rounded">
                      {isSlowMotion ? '0.5x' : '1.0x'}
                    </span>
                  </button>
                  <button className="hover:text-primary-fixed transition-colors flex items-center" title="Closed Captions" type="button">
                    <span className="material-symbols-outlined text-[20px]">closed_caption</span>
                  </button>
                  <button className="hover:text-primary-fixed transition-colors flex items-center" title="Settings" type="button">
                    <span className="material-symbols-outlined text-[20px]">settings</span>
                  </button>
                  <button className="hover:text-primary-fixed transition-colors flex items-center" title="Picture in picture" type="button">
                    <span className="material-symbols-outlined text-[20px]">picture_in_picture_alt</span>
                  </button>
                  <button className="hover:text-primary-fixed transition-colors flex items-center" title="Fullscreen" type="button">
                    <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Current Sign Description Box */}
          <div className="mt-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-surface-container-high/40">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">waving_hand</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Namaste / Hello (ISL)</h4>
                <p className="font-body-sm text-body-sm text-outline">Dominant palm facing forward, gentle side arc oscillation</p>
              </div>
            </div>
            <button
              className="px-space-md py-1.5 rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 font-semibold"
              type="button"
              onClick={handleSlowReplay}
            >
              <span className="material-symbols-outlined text-[16px]">replay</span>
              <span>Slow Replay</span>
            </button>
          </div>
        </div>

        {/* Right Column: Lesson Structure & Interactive Checklist (5 tracks) */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-lg border border-surface-container-high/40">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">Lesson: Greetings</h2>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                  Module 1 of 6
                </span>
              </div>
              <p className="font-body-md text-body-md text-outline">Learn common greetings in ISL.</p>
            </div>

            {/* 3-Step Checklist Flow */}
            <div className="flex flex-col gap-space-md">
              {/* Step 1: Watch */}
              <div className="flex items-center gap-space-md p-space-sm rounded-lg hover:bg-surface-container transition-colors cursor-pointer group">
                <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Watch the sign</span>
                  <span className="font-body-sm text-body-sm text-outline">Video demonstration completed</span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px]">verified</span>
              </div>

              {/* Step 2: Practice */}
              <div
                className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-low transition-colors cursor-pointer group border border-primary/20"
                onClick={() => navigate('/practice')}
              >
                <div className="w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">Practice the sign</span>
                  <span className="font-body-sm text-body-sm text-primary">In progress • Camera calibration ready</span>
                </div>
                <span className="material-symbols-outlined text-primary text-[18px]">videocam</span>
              </div>

              {/* Step 3: Feedback */}
              <div className="flex items-center gap-space-md p-space-sm rounded-lg hover:bg-surface-container transition-colors cursor-pointer group opacity-60">
                <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-outline-variant"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Get feedback</span>
                  <span className="font-body-sm text-body-sm text-outline">Instant AI accuracy score analysis</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant text-[18px]">lock</span>
              </div>
            </div>

            {/* Start Practice Primary CTA Button */}
            <button
              className="w-full py-3.5 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-space-sm group cursor-pointer active:scale-[0.99]"
              type="button"
              onClick={() => navigate('/practice')}
            >
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">videocam</span>
              <span>Start Practice</span>
            </button>

            {/* Progress Meter */}
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Your Progress</span>
                  <SampleDataBadge />
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">60%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary-container to-secondary transition-all duration-700 w-[60%]"></div>
              </div>
            </div>

            {/* Pro Tip Callout Card */}
            <div className="p-space-md rounded-xl bg-tertiary-fixed/30 flex items-start gap-space-md shadow-sm border border-tertiary-fixed/50">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0 text-tertiary-container shadow-sm">
                <span className="material-symbols-outlined text-[22px]">lightbulb</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-tertiary-fixed font-bold">Pro Tip</span>
                <p className="font-body-md text-body-md text-on-tertiary-fixed/90 leading-snug">
                  Keep your hand open and oriented gently towards your face with natural finger spacing.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

