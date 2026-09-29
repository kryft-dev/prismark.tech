import type { ReactNode } from 'react'

export interface HandDrawnCircleProps {
  children?: ReactNode
  className?: string
  color?: string
  strokeWidth?: number
}

export function HandDrawnCircle({
  children,
  className = '',
  color = '#E11D48',
  strokeWidth = 2.5,
}: HandDrawnCircleProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] overflow-visible"
        viewBox="0 0 120 60"
        preserveAspectRatio="none"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Double-loop sketchy organic circle */}
        <path d="M 15,32 C 12,18 28,8 60,7 C 98,6 112,16 113,30 C 114,46 92,54 58,54 C 24,54 8,44 9,30 C 10,14 34,9 62,8 C 88,7 106,18 108,31" />
      </svg>
    </span>
  )
}
