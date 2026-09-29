import { cn } from '@/lib/utils'

interface TestimonialProps {
  name: string
  role: string
  agency: string
  quote: string
  className?: string
}

export function Testimonial({ name, role, agency, quote, className }: TestimonialProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)

  return (
    <div className={cn('flex items-start gap-4', className)}>
      <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-selected text-xs font-medium text-foreground">
        {initials}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[15px] leading-relaxed text-foreground">{quote}</p>
        <p className="text-[13px] text-muted-foreground">
          {name}, {role} at {agency}
        </p>
      </div>
    </div>
  )
}
