import type { ReactNode } from 'react'

export interface HandDrawnCircleProps {
  children?: ReactNode
  className?: string
  color?: string
}

export function HandDrawnCircle({
  children,
  className = '',
  color = '#F5A623',
}: HandDrawnCircleProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full scale-125"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 50,5 C 80,10 95,30 95,50 C 95,75 75,95 50,95 C 20,95 5,75 5,50 C 5,25 25,5 50,5 Z" />
      </svg>
    </div>
  )
}
