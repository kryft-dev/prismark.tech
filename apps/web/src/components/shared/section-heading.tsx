import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title?: string
  children?: ReactNode
  subtitle?: string
  tag?: string
  annotation?: string
  className?: string
}

export function SectionHeading({
  title,
  children,
  subtitle,
  tag,
  annotation,
  className,
}: SectionHeadingProps) {
  const heading = title ?? children
  return (
    <div className={cn('mb-12 w-full', className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E5DFD5] pb-4">
        <div className="flex items-baseline gap-3">
          {tag && (
            <span className="rounded border border-rose-200 bg-rose-50 px-2 py-0.5 font-mono text-xs tracking-wider text-rose-600 uppercase">
              {tag}
            </span>
          )}
          <h2 className="text-2xl font-bold tracking-tight text-[#18181B] sm:text-3xl">
            {heading}
          </h2>
        </div>
        {annotation && (
          <span className="font-handwritten text-xl text-stone-600">{annotation}</span>
        )}
      </div>
      {subtitle && <p className="mt-3 max-w-2xl text-base text-stone-600 sm:text-lg">{subtitle}</p>}
    </div>
  )
}
