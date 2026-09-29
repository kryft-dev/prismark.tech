import type { ReactNode } from 'react'

import { BlueprintGrid } from '../graphics/blueprint-grid'
import { Footer } from './footer'
import { Header } from './header'

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-svh bg-background text-foreground transition-colors duration-200">
      {/* Radiant ambient orange & blue background mesh */}
      <div className="bg-studio-ambient pointer-events-none fixed inset-0 z-0 opacity-90" />
      {/* 5mm millimeter drafting grid */}
      <BlueprintGrid variant="drafting" />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  )
}
