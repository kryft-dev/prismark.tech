import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface AnnotationProps {
  children: ReactNode
  className?: string
  color?: 'ink' | 'cobalt' | 'vermilion' | 'amber' | 'emerald'
  as?: 'span' | 'p' | 'div'
}

const COLOR_CLASSES = {
  ink: 'text-stone-700',
  cobalt: 'text-blue-700',
  vermilion: 'text-rose-700',
  amber: 'text-amber-800',
  emerald: 'text-emerald-800',
}

export function Annotation({
  children,
  className,
  color = 'ink',
  as: Component = 'span',
}: AnnotationProps) {
  return (
    <Component
      className={cn(
        'inline-flex items-center gap-1.5 font-handwritten text-[20px] leading-snug tracking-wide sm:text-[22px]',
        COLOR_CLASSES[color],
        className,
      )}
    >
      {children}
    </Component>
  )
}
