import type { ReactNode } from 'react'

export interface PaperTextureProps {
  children?: ReactNode
  variant?: 'grid' | 'dot' | 'none'
  className?: string
}

export function PaperTexture({ children, variant = 'grid', className = '' }: PaperTextureProps) {
  if (variant === 'none') {
    return <div className={`relative ${className}`}>{children}</div>
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            variant === 'grid'
              ? 'linear-gradient(to right, #161616 1px, transparent 1px), linear-gradient(to bottom, #161616 1px, transparent 1px)'
              : 'radial-gradient(#161616 1px, transparent 1px)',
          backgroundSize: variant === 'grid' ? '20px 20px' : '12px 12px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
