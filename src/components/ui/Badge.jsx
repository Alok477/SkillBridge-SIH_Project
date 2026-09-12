import React from 'react';

export const Badge = ({
  children,
  variant = 'default', // 'default', 'success', 'warning', 'error', 'info', 'brand'
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide';
  
  const variants = {
    default: 'bg-zinc-800 text-zinc-300 border border-zinc-700/50',
    brand: 'bg-brand/10 text-brand border border-brand/20',
    success: 'bg-accent-green/10 text-accent-green border border-accent-green/20',
    warning: 'bg-accent-amber/10 text-accent-amber border border-accent-amber/20',
    error: 'bg-accent-red/10 text-accent-red border border-accent-red/20',
    info: 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
