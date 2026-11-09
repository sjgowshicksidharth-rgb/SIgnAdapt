import React from 'react';

export default function ToggleSwitch({ checked, onChange, ariaLabel = "Toggle switch", id }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-primary-container' : 'bg-outline-variant'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-surface-container-lowest shadow ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

