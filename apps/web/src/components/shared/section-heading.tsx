import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title?: string
  children?: ReactNode
  subtitle?: string
  className?: string
}

export function SectionHeading({ title, children, subtitle, className }: SectionHeadingProps) {
  const heading = title ?? children
  return (
    <div className={cn('mb-10 w-full', className)}>
      <h2 className="border-b border-[#262626] pb-4 text-[20px] font-semibold text-foreground">
        {heading}
      </h2>
      {subtitle && <p className="mt-4 text-[15px] text-[#A1A1A1]">{subtitle}</p>}
    </div>
  )
}
