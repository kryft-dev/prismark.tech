import type { SVGProps } from 'react'

export interface HandDrawnArrowProps extends SVGProps<SVGSVGElement> {
  direction?: 'right' | 'left' | 'up' | 'down' | 'curved-right' | 'curved-down'
}

export function HandDrawnArrow({
  direction = 'right',
  className = '',
  ...props
}: HandDrawnArrowProps) {
  const getPath = () => {
    switch (direction) {
      case 'right':
        return 'M5,15 Q25,12 45,15 M35,5 Q42,12 45,15 Q40,22 35,25'
      case 'left':
        return 'M45,15 Q25,18 5,15 M15,5 Q8,12 5,15 Q10,22 15,25'
      case 'up':
        return 'M15,45 Q12,25 15,5 M5,15 Q12,8 15,5 Q22,10 25,15'
      case 'down':
        return 'M15,5 Q18,25 15,45 M5,35 Q12,42 15,45 Q22,40 25,35'
      case 'curved-right':
        return 'M5,5 Q20,-5 45,15 M35,5 Q42,12 45,15 Q35,22 35,25'
      case 'curved-down':
        return 'M5,5 Q25,10 15,45 M5,35 Q12,42 15,45 Q25,40 25,35'
      default:
        return 'M5,15 Q25,12 45,15 M35,5 Q42,12 45,15 Q40,22 35,25'
    }
  }

  return (
    <svg
      viewBox="0 0 50 50"
      className={`h-8 w-8 text-current ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={getPath()} />
    </svg>
  )
}
