import React, { useId } from 'react';

export const Logo = ({ compact = false }) => {
  const instanceId = useId().replace(/:/g, '');
  const glowId = `skillbridge-glow-${instanceId}`;
  const beamId = `skillbridge-beam-${instanceId}`;
  const lightId = `skillbridge-light-${instanceId}`;
  const clipId = `skillbridge-clip-${instanceId}`;

  return (
    <span className="flex shrink-0 items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand/30 bg-[#0b1220] shadow-[0_0_18px_rgba(37,99,235,0.16)]">
        <svg width="28" height="28" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SkillBridge logo">
          <defs>
            <radialGradient id={glowId}>
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={beamId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.8" />
            </linearGradient>
            <filter id={lightId}>
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <clipPath id={clipId}><circle cx="70" cy="70" r="58" /></clipPath>
          </defs>

          <circle cx="70" cy="70" r="64" fill="#0B1220" />
          <circle cx="70" cy="70" r="58" fill={`url(#${glowId})`} />
          <circle cx="70" cy="70" r="20" fill="none" stroke="#6366F1" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx="70" cy="70" r="39" fill="none" stroke="#6366F1" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx="70" cy="70" r="58" fill="none" stroke="#6366F1" strokeOpacity="0.65" strokeWidth="2" />
          <line x1="12" y1="70" x2="128" y2="70" stroke="#FFFFFF" strokeOpacity="0.1" />
          <line x1="70" y1="12" x2="70" y2="128" stroke="#FFFFFF" strokeOpacity="0.1" />

          <g clipPath={`url(#${clipId})`}>
            <path d="M70 70 L128 17 A58 58 0 0 0 128 8 Z" fill={`url(#${beamId})`}>
              <animateTransform attributeName="transform" type="rotate" from="0 70 70" to="360 70 70" dur="2.5s" repeatCount="indefinite" />
            </path>
          </g>

          <circle cx="43" cy="39" r="4" fill="#818CF8" filter={`url(#${lightId})`}><animate attributeName="opacity" values="0.25;1;0.25" dur="1.8s" repeatCount="indefinite" /></circle>
          <circle cx="105" cy="48" r="4" fill="#FFFFFF" filter={`url(#${lightId})`}><animate attributeName="opacity" values="1;0.25;1" dur="2.2s" repeatCount="indefinite" /></circle>
          <circle cx="39" cy="88" r="4" fill="#818CF8" filter={`url(#${lightId})`}><animate attributeName="opacity" values="0.25;1;0.25" dur="2s" repeatCount="indefinite" /></circle>
          <circle cx="96" cy="101" r="4" fill="#FFFFFF" filter={`url(#${lightId})`}><animate attributeName="opacity" values="1;0.25;1" dur="2.4s" repeatCount="indefinite" /></circle>

          <g stroke="#6366F1" strokeWidth="1" strokeOpacity="0.35">
            <line x1="70" y1="70" x2="43" y2="39" />
            <line x1="70" y1="70" x2="105" y2="48" />
            <line x1="70" y1="70" x2="39" y2="88" />
            <line x1="70" y1="70" x2="96" y2="101" />
          </g>

          <circle cx="70" cy="70" r="8" fill="#6366F1" filter={`url(#${lightId})`} />
          <circle cx="70" cy="70" r="3" fill="#FFFFFF" />
        </svg>
      </span>
      {!compact && <span className="font-semibold tracking-tight text-white">SkillBridge</span>}
    </span>
  );
};
