import { cn } from '@/lib/utils'

interface Stat {
  value: string
  label: string
  detail?: string
}

interface StatStripProps {
  stats: Stat[]
  className?: string
}

export function StatStrip({ stats, className }: StatStripProps) {
  return (
    <div className={cn('flex flex-wrap gap-12 md:gap-16', className)}>
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
          <div className="text-[28px] font-semibold text-foreground tabular-nums">{stat.value}</div>
          {stat.detail && <div className="text-[13px] text-foreground-3">{stat.detail}</div>}
        </div>
      ))}
    </div>
  )
}
