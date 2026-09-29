import type { HTMLAttributes } from 'react'

export interface LedgerLinesProps extends HTMLAttributes<HTMLDivElement> {
  lineSpacing?: number
  lineColor?: string
}

export function LedgerLines({
  lineSpacing = 40,
  lineColor = '#1A1A1A',
  className = '',
  ...props
}: LedgerLinesProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[-1] ${className}`}
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent ${lineSpacing - 1}px, ${lineColor} ${lineSpacing}px)`,
        backgroundSize: `100% ${lineSpacing}px`,
      }}
      {...props}
    />
  )
}
