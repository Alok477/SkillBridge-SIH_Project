import React from 'react';

export const Input = ({
  label,
  error,
  type = 'text',
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`w-full px-3.5 py-2.5 bg-background border rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 transition-all duration-200 ${
          error ? 'border-accent-red focus:ring-accent-red/20' : 'border-zinc-800 hover:border-zinc-700 focus:border-brand'
        }`}
        {...props}
      />
      {error && <span className="text-xs text-accent-red font-medium mt-0.5">{error}</span>}
    </div>
  );
};
