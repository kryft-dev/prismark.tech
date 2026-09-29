import type { ComponentProps, ReactNode } from 'react'

interface HighlighterProps extends ComponentProps<'span'> {
  variant?: 'yellow' | 'mint' | 'rose' | 'sky'
  children: ReactNode
}

export function Highlighter({
  variant = 'yellow',
  children,
  className = '',
  ...props
}: HighlighterProps) {
  const classNameMap = {
    yellow: 'highlighter-yellow',
    mint: 'highlighter-mint',
    rose: 'highlighter-rose',
    sky: 'bg-sky-200/70 text-sky-950 px-1 py-0.5 rounded-sm',
  }

  return (
    <mark
      className={`bg-transparent text-inherit ${classNameMap[variant]} ${className}`}
      {...props}
    >
      {children}
    </mark>
  )
}
