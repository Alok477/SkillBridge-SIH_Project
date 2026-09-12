import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'danger'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-hover active:bg-brand-dark shadow-[0_2px_8px_rgba(37,99,235,0.2)]',
    secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 active:bg-zinc-900 border border-zinc-700',
    outline: 'border border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-800/50 hover:text-white',
    ghost: 'bg-transparent text-zinc-400 hover:bg-zinc-800/40 hover:text-white',
    danger: 'bg-accent-red text-white hover:bg-red-600 active:bg-red-700 shadow-[0_2px_8px_rgba(239,68,68,0.2)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
