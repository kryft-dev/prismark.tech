import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface AnnotationProps {
  children: ReactNode
  className?: string
  as?: 'span' | 'p' | 'div'
}

export function Annotation({ children, className, as: Component = 'span' }: AnnotationProps) {
  return (
    <Component
      className={cn('font-handwritten text-[20px] tracking-wide text-muted-foreground', className)}
    >
      {children}
    </Component>
  )
}
