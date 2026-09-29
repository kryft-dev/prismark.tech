import { cn } from '@/lib/utils'

interface TestimonialProps {
  name: string
  role: string
  agency: string
  quote: string
  highlight?: string
  className?: string
}

export function Testimonial({ name, role, agency, quote, highlight, className }: TestimonialProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)

  return (
    <div
      className={cn(
        'paper-shadow-sm relative flex items-start gap-4 rounded-md border border-[#E5DFD5] bg-[#FFFFFF] p-5',
        className,
      )}
    >
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-bold text-[#FBF9F4]">
        {initials}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[15px] leading-relaxed text-[#18181B] sm:text-base">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-1">
          <p className="text-xs font-medium text-stone-500">
            <span className="font-semibold text-stone-800">{name}</span> · {role} at{' '}
            <span className="text-stone-700 underline decoration-stone-300">{agency}</span>
          </p>
          {highlight && (
            <span className="font-handwritten text-base text-rose-600">{highlight}</span>
          )}
        </div>
      </div>
    </div>
  )
}
