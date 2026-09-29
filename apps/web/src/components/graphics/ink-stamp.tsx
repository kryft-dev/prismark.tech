import type { HTMLAttributes } from 'react'

export interface InkStampProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  variant?: 'success' | 'warning' | 'danger' | 'info'
  rotation?: number
}

const colorMap = {
  success: '#3DD68C',
  warning: '#F5A623',
  danger: '#FF6166',
  info: '#52A8FF',
}

export function InkStamp({
  label,
  variant = 'success',
  className = '',
  rotation = -3,
  ...props
}: InkStampProps) {
  const color = colorMap[variant]

  return (
    <div
      className={`pointer-events-none inline-flex items-center justify-center border-4 px-4 py-1 font-bold tracking-widest uppercase opacity-80 mix-blend-screen ${className}`}
      style={{
        borderColor: color,
        color: color,
        transform: `rotate(${rotation}deg)`,
        fontFamily: '"Geist Mono", monospace',
        borderStyle: 'dashed',
        borderRadius: '4px',
        boxShadow: `0 0 4px ${color}33`,
      }}
      {...props}
    >
      {label}
    </div>
  )
}
