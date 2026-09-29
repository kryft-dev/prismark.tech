import type { ReactNode } from 'react'

import { BlueprintGrid } from '../graphics/blueprint-grid'
import { Footer } from './footer'
import { Header } from './header'

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-svh bg-[#FBF9F4] text-[#18181B] selection:bg-[#FEF08A] selection:text-[#18181B]">
      {/* Millimeter drafting grid background */}
      <BlueprintGrid variant="drafting" />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  )
}
