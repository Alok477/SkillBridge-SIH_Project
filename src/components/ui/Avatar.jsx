import React from 'react';

export const Avatar = ({ name, sizeClass = 'w-8 h-8 text-xs', className = '' }) => {
  const getInitials = (userName) => {
    if (!userName) return 'U';
    const parts = userName.trim().split(/[\s._\-@]+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase().substring(0, 2);
  };

  const initials = getInitials(name);

  return (
    <div className={`rounded-full bg-gradient-to-br from-brand to-brand-indigo text-white flex items-center justify-center font-bold uppercase border border-zinc-700/40 shadow-sm flex-shrink-0 select-none ${sizeClass} ${className}`}>
      {initials}
    </div>
  );
};
