import { Link } from '@tanstack/react-router'

const productLinks = [
  { label: 'Platform Tour', to: '/product' },
  { label: 'Sprint Flight Desk', to: '/product' },
  { label: 'Client Chambers Air-Gap', to: '/product' },
  { label: 'Double-Entry Money Engine', to: '/product' },
  { label: 'Command Palette Engine', to: '/product' },
] as const

const solutionLinks = [
  { label: 'Software Consultancies', to: '/solutions' },
  { label: 'Design & Brand Studios', to: '/solutions' },
  { label: 'Full-Service Digital Agencies', to: '/solutions' },
  { label: 'Stack Cost Calculator', to: '/pricing' },
] as const

const studioLinks = [
  { label: 'Pricing & Licensing', to: '/pricing' },
  { label: 'Studio Showcase', to: '/showcase' },
  { label: 'The Engineering Manifesto', to: '/manifesto' },
  { label: 'Release Changelog', to: '/changelog' },
] as const

const legalLinks = [
  { label: 'Request Studio Access', to: '/access' },
  { label: 'Member Sign-In', to: '/login' },
  { label: 'Privacy Policy', to: '/legal/privacy' },
  { label: 'Terms of Service', to: '/legal/terms' },
] as const

const UTM = '?utm_source=prismark.tech&utm_medium=website&utm_campaign=prismark'

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/70 transition-colors dark:border-white/[0.08] dark:bg-[#07090F]/90">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-14">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              Prismark
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              The unified operating system for craft studios. Replace 6 fragmented subscriptions
              with an integrated drafting board, client air-gapped portal, and balanced double-entry
              accounting on the Cloudflare global edge.
            </p>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-400">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
              <span>All 310+ Cloudflare Edge Regions Operational</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              Product
            </span>
            <ul className="mt-4 space-y-2.5 text-sm">
              {productLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-slate-600 transition-colors hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              Solutions
            </span>
            <ul className="mt-4 space-y-2.5 text-sm">
              {solutionLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-slate-600 transition-colors hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio & Craft */}
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              Craft
            </span>
            <ul className="mt-4 space-y-2.5 text-sm">
              {studioLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-slate-600 transition-colors hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Access & Legal */}
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              Access &amp; Legal
            </span>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-slate-600 transition-colors hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 font-mono text-xs text-slate-500 sm:flex-row dark:border-white/[0.08]">
          <span>&copy; {new Date().getFullYear()} Prismark Software Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Zero AI model training scraping</span>
            <span>·</span>
            <a
              href={`https://kryft.com${UTM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 transition-colors hover:text-orange-500 dark:text-slate-400"
            >
              Part of Kryft
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
