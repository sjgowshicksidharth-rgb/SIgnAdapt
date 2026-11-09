import React from 'react';

/**
 * PRD NFR-08: Clearly marks mock, illustrative or baseline demonstration data
 * in the UI until real backend/model evaluation data is populated.
 */
export default function SampleDataBadge({ label = "Sample data", className = "" }) {
  return (
    <span
      title="Per PRD NFR-08: Demonstrative UI metric. Will reflect real model calculation when inference pipeline is connected."
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-surface-container-high/70 text-on-surface-variant border border-surface-variant/40 select-none ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
      {label}
    </span>
  );
}

