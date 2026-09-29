import type { HTMLAttributes } from 'react'

export interface BlueprintGridProps extends HTMLAttributes<HTMLDivElement> {}

export function BlueprintGrid({ className = '', ...props }: BlueprintGridProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[-1] opacity-[0.03] ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(to right, #1a2a3a 1px, transparent 1px), linear-gradient(to bottom, #1a2a3a 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
      {...props}
    />
  )
}
