import { cn } from '@/lib/utils'

interface Stat {
  value: string
  label: string
  detail?: string
  accent?: 'cobalt' | 'vermilion' | 'emerald' | 'amber'
}

interface StatStripProps {
  stats: Stat[]
  className?: string
}

const ACCENT_COLORS = {
  cobalt: 'text-blue-600',
  vermilion: 'text-rose-600',
  emerald: 'text-emerald-600',
  amber: 'text-amber-600',
}

export function StatStrip({ stats, className }: StatStripProps) {
  return (
    <div className={cn('flex flex-wrap items-start gap-10 sm:gap-16', className)}>
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="font-mono text-xs font-medium tracking-wider text-stone-500 uppercase">
            {stat.label}
          </div>
          <div
            className={cn(
              'text-3xl font-extrabold tracking-tight text-[#18181B] tabular-nums sm:text-4xl',
              stat.accent && ACCENT_COLORS[stat.accent],
            )}
          >
            {stat.value}
          </div>
          {stat.detail && (
            <div className="font-handwritten text-lg text-stone-600">{stat.detail}</div>
          )}
        </div>
      ))}
    </div>
  )
}
