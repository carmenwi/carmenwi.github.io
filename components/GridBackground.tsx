import { motion } from 'motion/react';

interface GridBackgroundProps {
  variant?: 'dots' | 'grid' | 'diagonal';
  intensity?: 'light' | 'medium';
  className?: string;
}

export function GridBackground({ variant = 'dots', intensity = 'light', className = '' }: GridBackgroundProps) {
  const opacity = intensity === 'light' ? 'opacity-20' : 'opacity-30';
  
  const patterns = {
    dots: (
      <defs>
        <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
    ),
    grid: (
      <defs>
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
        </pattern>
      </defs>
    ),
    diagonal: (
      <defs>
        <pattern id="diagonal" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="1"/>
        </pattern>
      </defs>
    )
  };

  return (
    <div className={`absolute inset-0 ${className}`}>
      <svg className={`w-full h-full text-blue-500 ${opacity}`} aria-hidden="true">
        {patterns[variant]}
        <rect width="100%" height="100%" fill={`url(#${variant})`} />
      </svg>
    </div>
  );
}