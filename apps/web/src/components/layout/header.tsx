'use client'

import { Link } from '@tanstack/react-router'
import { MenuIcon, XIcon, Terminal } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useState } from 'react'

import { Mark } from '@/components/mark'

import { ThemeToggle } from './theme-toggle'

const navLinks = [
  { label: 'Blueprint', to: '/blueprint' },
  { label: 'Rates', to: '/rates' },
  { label: 'Studios', to: '/studios' },
  { label: 'Manifesto', to: '/manifesto' },
  { label: 'Chronicle', to: '/chronicle' },
  { label: 'Compare', to: '/compare' },
] as const

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <header className="light:border-[#E5DFD5] light:bg-[#FBF9F4]/90 sticky top-0 z-50 border-b border-stone-800/60 bg-[#080B11]/85 backdrop-blur-md dark:border-stone-800/60 dark:bg-[#080B11]/85">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-14">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5" onClick={closeMobile}>
          <div className="relative">
            <Mark className="size-8 transition-transform group-hover:scale-105" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold tracking-tight text-foreground">Prismark</span>
            <span className="hidden rounded border border-orange-500/40 bg-orange-950/60 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-orange-400 uppercase sm:inline">
              Field OS
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="light:text-stone-600 light:hover:text-stone-900 text-sm font-medium text-stone-400 transition-colors hover:text-white dark:text-stone-400 dark:hover:text-white"
              activeProps={{ className: 'text-orange-400 font-semibold' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Link
            to="/desk"
            className="light:text-stone-600 light:hover:text-stone-900 text-sm font-medium text-stone-400 transition-colors hover:text-white dark:text-stone-400 dark:hover:text-white"
          >
            Access Desk
          </Link>

          <Link
            to="/dispatch"
            className="inline-flex items-center gap-1.5 rounded-md border border-stone-700/80 bg-stone-900/60 px-3 py-1.5 font-mono text-xs font-semibold text-stone-300 transition-colors hover:border-blue-500/80 hover:text-white"
          >
            <Terminal className="h-3.5 w-3.5 text-blue-400" />
            <span>Dispatch</span>
          </Link>

          <Link
            to="/"
            className="relative inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <span>Early Registry</span>
            <span className="py-0.2 rounded bg-black/20 px-1.5 font-mono text-[10px] font-bold">
              FREE
            </span>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleMobile}
            className="flex items-center justify-center rounded-md border border-stone-700 bg-stone-900 p-2 text-stone-300 transition-colors hover:bg-stone-800"
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
      </div>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-stone-800 bg-[#080B11] md:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-md px-3 py-2 text-[15px] font-medium text-stone-400 transition-colors hover:bg-stone-900 hover:text-white"
                  activeProps={{ className: 'bg-stone-900 text-orange-400 font-semibold' }}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-stone-800 pt-4">
                <Link
                  to="/desk"
                  className="rounded-md px-3 py-2 text-[15px] text-stone-400 transition-colors hover:bg-stone-900 hover:text-white"
                  onClick={closeMobile}
                >
                  Access Desk
                </Link>
                <Link
                  to="/dispatch"
                  className="rounded-md px-3 py-2 font-mono text-[15px] text-blue-400 transition-colors hover:bg-stone-900"
                  onClick={closeMobile}
                >
                  Terminal Dispatch Console
                </Link>
                <Link
                  to="/"
                  className="block rounded-md bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-2.5 text-center text-[15px] font-semibold text-white shadow-sm"
                  onClick={closeMobile}
                >
                  Join Early Registry
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
