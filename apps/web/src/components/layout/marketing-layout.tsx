import type { ReactNode } from 'react'

import { Footer } from './footer'
import { Header } from './header'

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
