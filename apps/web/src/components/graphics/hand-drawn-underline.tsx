import type { SVGProps } from 'react'

export interface HandDrawnUnderlineProps extends SVGProps<SVGSVGElement> {
  color?: string
  double?: boolean
}

export function HandDrawnUnderline({
  className = '',
  color = '#2563EB',
  double = false,
  ...props
}: HandDrawnUnderlineProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      className={`h-2.5 w-full overflow-visible ${className}`}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M 3,7 C 25,10 45,4 70,8 C 92,11 105,5 117,6" />
      {double && (
        <path d="M 5,11 C 28,13 50,8 72,11 C 94,13 108,9 115,10" opacity="0.6" strokeWidth="1.75" />
      )}
    </svg>
  )
}
