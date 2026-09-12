import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#121214] border border-zinc-800/80 rounded-xl p-5 ${
        hover ? 'hover:border-zinc-700/80 hover:bg-[#161619] transition-all duration-300 shadow-md cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
