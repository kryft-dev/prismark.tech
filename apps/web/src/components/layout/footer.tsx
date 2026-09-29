import { Link } from '@tanstack/react-router'

import { InkStamp } from '../graphics/ink-stamp'

const coreModules = [
  { label: 'Operating Architecture', to: '/blueprint' },
  { label: 'Workspace Drafting Board', to: '/drafting' },
  { label: 'Double-Entry Financials', to: '/ledger' },
  { label: 'Client Portal & Air-Gap', to: '/airgap' },
  { label: 'Platform Security & Data', to: '/security' },
] as const

const agencyLinks = [
  { label: 'Studio Capacity & Rates', to: '/rates' },
  { label: 'Verified Studio Showcase', to: '/studios' },
  { label: 'The Engineering Manifesto', to: '/manifesto' },
  { label: 'Prismark vs 6-Tool Stack', to: '/compare' },
  { label: 'Living Release Logbook', to: '/chronicle' },
] as const

const accessLinks = [
  { label: 'Studio Dispatch Console', to: '/dispatch' },
  { label: 'Member Access Desk', to: '/desk' },
  { label: 'Privacy Covenant', to: '/legal/privacy' },
  { label: 'Terms of Service', to: '/legal/terms' },
] as const

const UTM = '?utm_source=prismark.tech&utm_medium=website&utm_campaign=prismark'

export function Footer() {
  return (
    <footer className="light:border-[#E5DFD5] light:bg-[#F7F3EB]/70 border-t border-stone-800/80 bg-[#07090F]/90 dark:border-stone-800/80 dark:bg-[#07090F]/90">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-14">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
                Prismark
              </Link>
              <InkStamp
                label="VERIFIED 2026"
                variant="emerald"
                rotation={-2}
                className="scale-90 text-[9px]"
              />
            </div>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-stone-400">
              The bespoke software agency operating system. Replaces disconnected subscriptions with
              an integrated drafting board, real-time client channels, balanced double-entry
              accounting, and a secure client portal.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-xs text-stone-400">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span>Cloudflare Global Edge · D1 SQLite · Zero AI Scraping</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-semibold tracking-wider text-orange-400 uppercase">
              Architecture
            </h3>
            <ul className="flex flex-col gap-2.5">
              {coreModules.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-stone-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Agency & Studio */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
              Agency Field
            </h3>
            <ul className="flex flex-col gap-2.5">
              {agencyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-stone-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Access & Covenants */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-semibold tracking-wider text-stone-400 uppercase">
              Access &amp; Covenants
            </h3>
            <ul className="flex flex-col gap-2.5">
              {accessLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-stone-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-stone-800/80 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-sm text-stone-400">
            © {new Date().getFullYear()} Prismark Systems Inc. All agency rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-400">Engineered by</span>
            <a
              href={`https://kryft.dev${UTM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300 hover:underline"
            >
              <span>Kryft</span>
              <span className="font-mono text-xs">↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
