import { Link } from '@tanstack/react-router'

const productLinks = [
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Customers', to: '/customers' },
  { label: 'Changelog', to: '/changelog' },
] as const

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Sign in', to: '/signin' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
] as const

const UTM = '?utm_source=prismark.tech&utm_medium=website&utm_campaign=prismark'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-14">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="text-lg font-semibold tracking-tight">
              Prismark
            </Link>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              The app a small software agency runs itself on. Projects, tasks, chat, clients, money,
              and a portal where clients see their side of it.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-medium">Product</h3>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-medium">Company</h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-center">
          <p className="text-sm text-foreground-3">
            © {new Date().getFullYear()} Prismark. All rights reserved.
          </p>
          <p className="text-sm text-foreground-3">
            Built by{' '}
            <a
              href={`https://kryft.dev${UTM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-info transition-colors hover:underline"
            >
              Kryft
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
