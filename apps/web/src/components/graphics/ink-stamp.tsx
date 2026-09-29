import type { HTMLAttributes } from 'react'

export interface InkStampProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  variant?:
    | 'vermilion'
    | 'emerald'
    | 'cobalt'
    | 'amber'
    | 'violet'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
  shape?: 'rect' | 'pill' | 'circle'
  rotation?: number
}

const colorMap = {
  vermilion: '#E11D48',
  danger: '#E11D48',
  emerald: '#059669',
  success: '#059669',
  cobalt: '#2563EB',
  info: '#2563EB',
  amber: '#D97706',
  warning: '#D97706',
  violet: '#7C3AED',
}

export function InkStamp({
  label,
  variant = 'vermilion',
  shape = 'rect',
  className = '',
  rotation = -4,
  ...props
}: InkStampProps) {
  const color = colorMap[variant]

  const shapeStyles = {
    rect: 'border-2 sm:border-3 px-3 py-0.5 rounded-[3px]',
    pill: 'border-2 sm:border-3 px-3.5 py-0.5 rounded-full',
    circle:
      'border-2 sm:border-3 w-16 h-16 rounded-full flex-col text-center p-1 text-[10px] leading-tight',
  }

  return (
    <div
      aria-label={`Stamp: ${label}`}
      className={`pointer-events-none inline-flex items-center justify-center font-bold tracking-widest uppercase mix-blend-multiply transition-transform select-none ${shapeStyles[shape]} ${className}`}
      style={{
        borderColor: color,
        color: color,
        transform: `rotate(${rotation}deg)`,
        fontFamily: '"Geist Mono", monospace',
        backgroundColor: `${color}0D`,
        boxShadow: `inset 0 0 0 1px ${color}40`,
      }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-1">
        {shape === 'rect' && <span className="text-[10px] opacity-50">★</span>}
        {label}
        {shape === 'rect' && <span className="text-[10px] opacity-50">★</span>}
      </span>
    </div>
  )
}
