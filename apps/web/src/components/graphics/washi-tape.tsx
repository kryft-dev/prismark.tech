import type { ComponentProps } from 'react'

interface WashiTapeProps extends ComponentProps<'div'> {
  variant?: 'yellow' | 'rose' | 'mint' | 'sky' | 'kraft'
  rotation?: number
}

const VARIANTS = {
  yellow:
    'bg-amber-200/80 border-amber-300/60 shadow-[0_1px_3px_rgba(202,138,4,0.15)] text-amber-900',
  rose: 'bg-rose-200/80 border-rose-300/60 shadow-[0_1px_3px_rgba(225,29,72,0.15)] text-rose-900',
  mint: 'bg-emerald-200/80 border-emerald-300/60 shadow-[0_1px_3px_rgba(5,150,105,0.15)] text-emerald-900',
  sky: 'bg-sky-200/80 border-sky-300/60 shadow-[0_1px_3px_rgba(37,99,235,0.15)] text-sky-900',
  kraft: 'bg-[#E2D6C5]/85 border-[#D0BFAB] shadow-[0_1px_3px_rgba(120,95,65,0.15)] text-stone-800',
}

export function WashiTape({
  variant = 'yellow',
  rotation = -2,
  className = '',
  ...props
}: WashiTapeProps) {
  const colorClass = VARIANTS[variant]

  return (
    <div
      aria-hidden="true"
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`pointer-events-none relative z-20 inline-block h-5 w-24 border-t border-b backdrop-blur-[1px] sm:h-6 sm:w-28 ${colorClass} ${className}`}
      {...props}
    >
      {/* Torn jagged left edge */}
      <svg
        className="absolute top-0 -left-1.5 h-full w-2 text-inherit"
        viewBox="0 0 6 24"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M6 0 L0 3 L4 7 L1 11 L5 15 L0 19 L4 22 L6 24 Z" />
      </svg>
      {/* Torn jagged right edge */}
      <svg
        className="absolute top-0 -right-1.5 h-full w-2 text-inherit"
        viewBox="0 0 6 24"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0 0 L6 3 L2 7 L5 11 L1 15 L6 19 L2 22 L0 24 Z" />
      </svg>
    </div>
  )
}
