import React, { useEffect, useState } from 'react';

export default function DonutGauge({
  percentage = 85,
  displayValue,
  colorClass = "text-emerald-500",
  animate = true
}) {
  const radius = 64;
  const circumference = 2 * Math.PI * radius; // ~402.12
  const [animatedPercent, setAnimatedPercent] = useState(animate ? 0 : percentage);

  useEffect(() => {
    if (!animate || typeof percentage !== 'number') {
      setAnimatedPercent(percentage);
      return;
    }

    let start = 0;
    const duration = 600;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const current = Math.round(start + (percentage - start) * (progress * (2 - progress)));
      setAnimatedPercent(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    const frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [percentage, animate]);

  const numericValue = typeof percentage === 'number' ? percentage : 0;
  const strokeDashoffset = typeof percentage === 'number'
    ? circumference - (numericValue / 100) * circumference
    : circumference;

  const displayText = displayValue !== undefined
    ? displayValue
    : (typeof percentage === 'number' ? `${animatedPercent}%` : '--%');

  return (
    <div className="relative w-44 h-44 flex items-center justify-center my-space-md select-none">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
        <circle
          className="text-surface-container"
          cx="80"
          cy="80"
          fill="transparent"
          r={radius}
          stroke="currentColor"
          strokeWidth="14"
        />
        <circle
          className={`${colorClass} transition-all duration-700 ease-out`}
          cx="80"
          cy="80"
          fill="transparent"
          r={radius}
          stroke="currentColor"
          strokeWidth="14"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-display text-display text-on-surface font-extrabold tracking-tight">
          {displayText}
        </span>
      </div>
    </div>
  );
}

