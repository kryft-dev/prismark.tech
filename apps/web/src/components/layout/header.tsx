'use client'

import { Link } from '@tanstack/react-router'
import { ArrowRight, MenuIcon, Sparkles, XIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useState } from 'react'

import { Mark } from '@/components/mark'

import { ThemeToggle } from './theme-toggle'

const navLinks = [
  { label: 'Product', to: '/product' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Showcase', to: '/showcase' },
  { label: 'Manifesto', to: '/manifesto' },
  { label: 'Changelog', to: '/changelog' },
] as const

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-colors dark:border-white/[0.08] dark:bg-[#080B11]/85">
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
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Prismark
            </span>
            <span className="hidden rounded border border-orange-500/30 bg-orange-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-orange-600 uppercase sm:inline dark:text-orange-400">
              Studio OS
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
              activeProps={{ className: 'text-orange-600 dark:text-orange-400 font-semibold' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden items-center gap-3.5 md:flex">
          <ThemeToggle />

          <Link
            to="/login"
            className="rounded-lg px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            Sign In
          </Link>

          <Link
            to="/access"
            className="group flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 font-mono text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
          >
            <span>Request Access</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleMobile}
            className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-700 transition-colors dark:border-white/[0.1] dark:bg-slate-900 dark:text-slate-300"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-slate-200 bg-white/95 px-5 py-6 backdrop-blur-lg md:hidden dark:border-white/[0.08] dark:bg-[#080B11]/95"
          >
            <nav className="flex flex-col gap-4 font-mono text-sm" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="py-1 text-slate-700 transition-colors hover:text-orange-500 dark:text-slate-300 dark:hover:text-orange-400"
                  activeProps={{ className: 'text-orange-500 dark:text-orange-400 font-bold' }}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                <Link
                  to="/login"
                  className="py-2 text-center font-mono text-xs font-semibold text-slate-700 hover:text-white dark:text-slate-300"
                  onClick={closeMobile}
                >
                  Sign In to Studio
                </Link>
                <Link
                  to="/access"
                  className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 py-2.5 font-mono text-xs font-bold text-white shadow-md"
                  onClick={closeMobile}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Request Studio Access</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
