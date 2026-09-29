import type { ComponentProps } from 'react'

interface PaperClipProps extends ComponentProps<'svg'> {
  variant?: 'brass' | 'silver' | 'binder'
}

export function PaperClip({ variant = 'brass', className = '', ...props }: PaperClipProps) {
  if (variant === 'binder') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 32 40"
        fill="none"
        className={`pointer-events-none z-30 h-10 w-8 drop-shadow-md ${className}`}
        {...props}
      >
        {/* Binder clip body */}
        <path d="M6 16 L26 16 L23 38 L9 38 Z" fill="#1C1917" stroke="#0C0A09" strokeWidth="1" />
        {/* Binder silver wire loops */}
        <path
          d="M11 16 C11 6, 13 4, 16 4 C19 4, 21 6, 21 16"
          stroke="#D4D4D8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M12 16 L12 28 M20 16 L20 28"
          stroke="#A1A1AA"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  const strokeColor = variant === 'brass' ? '#D97706' : '#94A3B8'
  const highlightColor = variant === 'brass' ? '#FDE68A' : '#E2E8F0'

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 48"
      fill="none"
      className={`pointer-events-none z-30 h-12 w-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] ${className}`}
      {...props}
    >
      {/* Clip wire */}
      <path
        d="M8 12 L8 36 C8 41 16 41 16 36 L16 8 C16 2 4 2 4 8 L4 38 C4 46 20 46 20 38 L20 14"
        stroke={strokeColor}
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Light sheen highlight */}
      <path
        d="M7.5 14 L7.5 34 M15.5 10 L15.5 32"
        stroke={highlightColor}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  )
}
