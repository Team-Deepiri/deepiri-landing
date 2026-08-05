import type { ReactNode } from 'react';

export const researchRepoIcons: Record<string, ReactNode> = {
  platform: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 17L12 22L22 17" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12L12 17L22 12" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  cyrex: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="#8A2BE2" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.5" fill="#8A2BE2" stroke="#8A2BE2" strokeWidth="1" />
      <circle cx="12" cy="7" r="1" fill="#8A2BE2" />
      <circle cx="16.5" cy="14.5" r="1" fill="#8A2BE2" />
      <circle cx="7.5" cy="14.5" r="1" fill="#8A2BE2" />
      <path d="M12 9V10.5" stroke="#8A2BE2" strokeWidth="1" strokeLinecap="round" />
      <path d="M10.5 13L9 14" stroke="#8A2BE2" strokeWidth="1" strokeLinecap="round" />
      <path d="M13.5 13L15 14" stroke="#8A2BE2" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  intelligence: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2V8H20" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 13H12" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 17H16" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="17" r="3" stroke="#8A2BE2" strokeWidth="1.5" />
    </svg>
  ),
  emotion: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="#8A2BE2" strokeWidth="1.5" />
      <path d="M3 8H21" stroke="#8A2BE2" strokeWidth="1.5" />
      <circle cx="8" cy="14" r="1.5" fill="#8A2BE2" />
      <circle cx="16" cy="14" r="1.5" fill="#8A2BE2" />
      <circle cx="12" cy="12" r="1" fill="#8A2BE2" />
      <path d="M8 14L12 12L16 14" stroke="#8A2BE2" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  uqe: (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="40" ry="15" stroke="#6366f1" strokeWidth="3" transform="rotate(45 50 50)" opacity="0.6" />
      <ellipse cx="50" cy="50" rx="40" ry="15" stroke="#a855f7" strokeWidth="3" transform="rotate(-45 50 50)" opacity="0.6" />
      <circle cx="50" cy="50" r="8" fill="#4f46e5">
        <animate attributeName="r" values="7;9;7" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  ),
  prismpipe: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke="#8A2BE2" strokeWidth="1.5" />
      <path d="M2 12H9" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M15 12H22" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.5 9.5L19 5" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.5 14.5L19 19" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="19" cy="5" r="1" fill="#8A2BE2" />
      <circle cx="22" cy="12" r="1" fill="#8A2BE2" />
      <circle cx="19" cy="19" r="1" fill="#8A2BE2" />
    </svg>
  ),
  persola: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 21V19C16 16.7909 14.2091 15 12 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5" cy="7" r="4" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="9" r="3" stroke="#8A2BE2" strokeWidth="1.5" />
      <path d="M19 7V9H21" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  helox: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7H6M2 12H6M2 17H6" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="7" y="5" width="4" height="14" rx="1" stroke="#8A2BE2" strokeWidth="1.5" />
      <path d="M11 12H15" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="19" cy="12" r="3" stroke="#8A2BE2" strokeWidth="1.5" />
      <circle cx="19" cy="12" r="1" fill="#8A2BE2" />
    </svg>
  ),
};
