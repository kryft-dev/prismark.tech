'use client'

import { Link } from '@tanstack/react-router'
import { MenuIcon, XIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useState } from 'react'

import { Mark } from '@/components/mark'

const navLinks = [
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Customers', to: '/customers' },
  { label: 'About', to: '/about' },
  { label: 'Changelog', to: '/changelog' },
] as const

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" onClick={closeMobile}>
          <Mark className="size-8" />
          <span className="text-lg font-semibold tracking-tight">Prismark</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: 'text-foreground' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/signin"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            to="/contact"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
          <Link
            to="/"
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-white"
          >
            Join the waitlist
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={toggleMobile}
          className="flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <XIcon className="size-5" aria-hidden="true" />
          ) : (
            <MenuIcon className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-md px-3 py-2.5 text-[15px] text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
                  activeProps={{ className: 'bg-selected text-foreground' }}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 border-t border-border pt-4">
                <Link
                  to="/signin"
                  className="mb-1 block rounded-md px-3 py-2 text-[15px] text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
                  onClick={closeMobile}
                >
                  Sign in
                </Link>
                <Link
                  to="/contact"
                  className="mb-3 block rounded-md px-3 py-2.5 text-[15px] text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
                  onClick={closeMobile}
                >
                  Contact
                </Link>
                <Link
                  to="/"
                  className="block rounded-md bg-foreground px-4 py-2.5 text-center text-[15px] font-medium text-background transition-colors hover:bg-white"
                  onClick={closeMobile}
                >
                  Join the waitlist
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
