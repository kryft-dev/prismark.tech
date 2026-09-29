import type { SVGProps } from 'react'

export interface DeckleEdgeProps extends SVGProps<SVGSVGElement> {
  color?: string
}

export function DeckleEdge({ className = '', color = '#E2DBD0', ...props }: DeckleEdgeProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 20"
      preserveAspectRatio="none"
      className={`block h-4 w-full opacity-80 ${className}`}
      fill="none"
      stroke={color}
      strokeWidth="2"
      {...props}
    >
      <path d="M0,10 L10,12 L20,8 L30,15 L40,10 L50,13 L60,9 L70,11 L80,14 L90,8 L100,12 L110,9 L120,13 L130,10 L140,11 L150,14 L160,9 L170,12 L180,10 L190,13 L200,8 L210,14 L220,11 L230,9 L240,13 L250,10 L260,12 L270,9 L280,15 L290,10 L300,13 L310,8 L320,12 L330,10 L340,14 L350,9 L360,11 L370,13 L380,8 L390,12 L400,10 L410,14 L420,9 L430,13 L440,10 L450,11 L460,14 L470,8 L480,12 L490,10 L500,13 L510,9 L520,11 L530,15 L540,10 L550,12 L560,8 L570,14 L580,11 L590,10 L600,13 L610,9 L620,12 L630,10 L640,14 L650,8 L660,13 L670,11 L680,10 L690,12 L700,9 L710,14 L720,10 L730,13 L740,8 L750,12 L760,11 L770,10 L780,13 L790,9 L800,14 L810,10 L820,12 L830,8 L840,13 L850,11 L860,10 L870,14 L880,9 L890,12 L900,10 L910,13 L920,8 L930,14 L940,11 L950,9 L960,13 L970,10 L980,12 L990,9 L1000,11" />
    </svg>
  )
}
