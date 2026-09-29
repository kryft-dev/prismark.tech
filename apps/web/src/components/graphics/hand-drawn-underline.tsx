import type { SVGProps } from 'react'

export interface HandDrawnUnderlineProps extends SVGProps<SVGSVGElement> {
  color?: string
}

export function HandDrawnUnderline({
  className = '',
  color = '#52A8FF',
  ...props
}: HandDrawnUnderlineProps) {
  return (
    <svg
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      className={`h-2 w-full ${className}`}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M 5,5 Q 20,8 35,5 T 65,5 T 95,5" />
    </svg>
  )
}
