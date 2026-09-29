import type { HTMLAttributes } from 'react'

export interface LedgerLinesProps extends HTMLAttributes<HTMLDivElement> {
  lineSpacing?: number
  lineColor?: string
  marginRule?: boolean
}

export function LedgerLines({
  lineSpacing = 36,
  lineColor = 'rgba(59, 130, 246, 0.15)',
  marginRule = true,
  className = '',
  ...props
}: LedgerLinesProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      {...props}
    >
      {/* Horizontal notebook blue rules */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent ${lineSpacing - 1}px, ${lineColor} ${lineSpacing}px)`,
          backgroundSize: `100% ${lineSpacing}px`,
        }}
      />
      {/* Red vertical accountant margin guide line */}
      {marginRule && (
        <div className="pointer-events-none absolute top-0 bottom-0 left-12 flex gap-1 sm:left-16">
          <div className="h-full w-[1.5px] bg-rose-400/40" />
          <div className="h-full w-[1px] bg-rose-400/25" />
        </div>
      )}
    </div>
  )
}
