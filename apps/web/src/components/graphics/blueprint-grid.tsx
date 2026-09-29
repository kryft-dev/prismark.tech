import type { HTMLAttributes } from 'react'

export interface BlueprintGridProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'drafting' | 'blueprint' | 'dots'
}

export function BlueprintGrid({
  variant = 'drafting',
  className = '',
  ...props
}: BlueprintGridProps) {
  if (variant === 'blueprint') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[-1] opacity-25 ${className}`}
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(37, 99, 235, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        {...props}
      />
    )
  }

  if (variant === 'dots') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[-1] opacity-40 ${className}`}
        style={{
          backgroundImage: 'radial-gradient(circle, #D4CBBD 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        {...props}
      />
    )
  }

  // Warm drafting millimeter paper grid
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[-1] opacity-75 ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(212, 203, 189, 0.35) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(212, 203, 189, 0.35) 1px, transparent 1px),
          linear-gradient(to right, rgba(212, 203, 189, 0.7) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(212, 203, 189, 0.7) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px',
      }}
      {...props}
    />
  )
}
