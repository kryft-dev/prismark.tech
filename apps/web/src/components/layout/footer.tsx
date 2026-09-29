import { Link } from '@tanstack/react-router'

import { InkStamp } from '../graphics/ink-stamp'

const productLinks = [
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Customers', to: '/customers' },
  { label: 'Changelog', to: '/changelog' },
] as const

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Contact & Dispatch', to: '/contact' },
  { label: 'Sign in', to: '/signin' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
] as const

const UTM = '?utm_source=prismark.tech&utm_medium=website&utm_campaign=prismark'

export function Footer() {
  return (
    <footer className="border-t border-[#E5DFD5] bg-[#F7F3EB]/70">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-14">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Link to="/" className="text-xl font-bold tracking-tight text-[#18181B]">
                Prismark
              </Link>
              <InkStamp
                label="VERIFIED 2026"
                variant="emerald"
                rotation={-2}
                className="scale-90 text-[9px]"
              />
            </div>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-stone-600">
              The bespoke software agency operating system. Tactile field journal for projects,
              tasks, real-time client chat, balanced double-entry money ledger, and client portal.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-xs text-stone-500">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span>Cloudflare Workers SSR · D1 Global SQLite</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-semibold tracking-wider text-stone-900 uppercase">
              Modules
            </h3>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-stone-600 decoration-amber-400 underline-offset-4 transition-colors hover:text-[#18181B] hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-semibold tracking-wider text-stone-900 uppercase">
              Journal & Colophon
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-stone-600 decoration-amber-400 underline-offset-4 transition-colors hover:text-[#18181B] hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#E5DFD5] pt-8 md:flex-row md:items-center">
          <p className="font-mono text-sm text-stone-500">
            © {new Date().getFullYear()} Prismark. All agency records preserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-500">Crafted by</span>
            <a
              href={`https://kryft.dev${UTM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800 hover:underline"
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
