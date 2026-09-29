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
    <header className="sticky top-0 z-50 border-b border-[#E5DFD5] bg-[#FBF9F4]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-14">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5" onClick={closeMobile}>
          <div className="relative">
            <Mark className="size-8 transition-transform group-hover:scale-105" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold tracking-tight text-[#18181B]">Prismark</span>
            <span className="hidden rounded border border-amber-300/60 bg-amber-100/90 px-1.5 py-0.5 font-mono text-[11px] font-semibold tracking-wider text-amber-700 uppercase sm:inline">
              Field Journal
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-stone-600 decoration-amber-400 decoration-2 underline-offset-4 transition-colors hover:text-[#18181B] hover:underline"
              activeProps={{
                className:
                  'text-[#18181B] font-semibold underline decoration-rose-500 decoration-2 underline-offset-4',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/signin"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-[#18181B]"
          >
            Sign in
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-[#18181B]"
          >
            Dispatch brief
          </Link>
          <Link
            to="/"
            className="relative inline-flex items-center gap-2 rounded-md bg-[#18181B] px-4 py-2 text-sm font-medium text-[#FBF9F4] transition-all hover:bg-stone-800 hover:shadow-md active:scale-[0.98]"
          >
            <span>Join waitlist</span>
            <span className="py-0.2 rounded bg-rose-500/20 px-1.5 font-mono text-[10px] font-bold text-rose-300">
              FREE
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={toggleMobile}
          className="flex items-center justify-center rounded-md border border-[#E5DFD5] bg-[#F5F1E8] p-2 text-stone-700 transition-colors hover:bg-stone-200 md:hidden"
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
            className="overflow-hidden border-t border-[#E5DFD5] bg-[#FBF9F4] md:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-md px-3 py-2.5 text-[15px] font-medium text-stone-700 transition-colors hover:bg-[#F3EFE6] hover:text-[#18181B]"
                  activeProps={{ className: 'bg-[#F3EFE6] text-[#18181B] font-semibold' }}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 border-t border-[#E5DFD5] pt-4">
                <Link
                  to="/signin"
                  className="mb-1 block rounded-md px-3 py-2 text-[15px] text-stone-700 transition-colors hover:bg-[#F3EFE6]"
                  onClick={closeMobile}
                >
                  Sign in
                </Link>
                <Link
                  to="/contact"
                  className="mb-3 block rounded-md px-3 py-2.5 text-[15px] text-stone-700 transition-colors hover:bg-[#F3EFE6]"
                  onClick={closeMobile}
                >
                  Dispatch brief
                </Link>
                <Link
                  to="/"
                  className="block rounded-md bg-[#18181B] px-4 py-2.5 text-center text-[15px] font-medium text-[#FBF9F4] transition-colors hover:bg-stone-800"
                  onClick={closeMobile}
                >
                  Join waitlist
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
