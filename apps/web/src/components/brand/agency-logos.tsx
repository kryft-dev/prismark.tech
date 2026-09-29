import type { SVGProps } from 'react'

import { cn } from '@/lib/utils'

interface LogoProps extends SVGProps<SVGSVGElement> {}

const logoClass = 'h-8 w-auto text-stone-700 transition-colors duration-300 hover:text-[#18181B]'

export function MeridianLogo({ className, ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 120 40" fill="currentColor" className={cn(logoClass, className)} {...props}>
      <path d="M10,30 L20,10 L30,30 L20,20 Z" />
      <text
        x="35"
        y="26"
        fontFamily="sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        Meridian
      </text>
    </svg>
  )
}

export function BloomLogo({ className, ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 120 40" fill="currentColor" className={cn(logoClass, className)} {...props}>
      <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
      <circle cx="20" cy="20" r="4" />
      <text
        x="38"
        y="26"
        fontFamily="sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        Bloom &amp; Co
      </text>
    </svg>
  )
}

export function ArclightLogo({ className, ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 120 40" fill="currentColor" className={cn(logoClass, className)} {...props}>
      <path d="M10,20 A10,10 0 0,1 30,20 A10,10 0 0,0 10,20" />
      <path d="M15,15 L25,25 M15,25 L25,15" stroke="currentColor" strokeWidth="2" />
      <text
        x="38"
        y="26"
        fontFamily="sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        Arclight
      </text>
    </svg>
  )
}

export function NorthwindLogo({ className, ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 120 40" fill="currentColor" className={cn(logoClass, className)} {...props}>
      <path
        d="M10,30 L10,10 L30,30 L30,10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="38"
        y="26"
        fontFamily="sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        Northwind
      </text>
    </svg>
  )
}

export function SkylineLogo({ className, ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 120 40" fill="currentColor" className={cn(logoClass, className)} {...props}>
      <rect x="10" y="20" width="6" height="10" />
      <rect x="18" y="10" width="6" height="20" />
      <rect x="26" y="15" width="6" height="15" />
      <text
        x="38"
        y="26"
        fontFamily="sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        Skyline
      </text>
    </svg>
  )
}

export function IronwoodLogo({ className, ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 120 40" fill="currentColor" className={cn(logoClass, className)} {...props}>
      <path d="M15,10 L25,10 L25,30 L15,30 Z" />
      <path d="M10,15 L30,15" stroke="currentColor" strokeWidth="3" />
      <text
        x="38"
        y="26"
        fontFamily="sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        Ironwood
      </text>
    </svg>
  )
}

export function RiverviewLogo({ className, ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 120 40" fill="currentColor" className={cn(logoClass, className)} {...props}>
      <path
        d="M10,20 Q15,10 20,20 T30,20"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10,26 Q15,16 20,26 T30,26"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      <text
        x="38"
        y="26"
        fontFamily="sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        Riverview
      </text>
    </svg>
  )
}

export function CandorLogo({ className, ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 120 40" fill="currentColor" className={cn(logoClass, className)} {...props}>
      <path
        d="M10,20 A10,10 0 1,1 30,20 A10,10 0 1,1 10,20"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      <rect x="15" y="15" width="10" height="10" />
      <text
        x="38"
        y="26"
        fontFamily="sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        Candor
      </text>
    </svg>
  )
}

export function AgencyLogos({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-8', className)}>
      <MeridianLogo />
      <BloomLogo />
      <ArclightLogo />
      <NorthwindLogo />
      <SkylineLogo />
      <IronwoodLogo />
      <RiverviewLogo />
      <CandorLogo />
    </div>
  )
}
