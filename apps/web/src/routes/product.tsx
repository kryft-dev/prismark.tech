import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle2, Eye, FolderGit2, Lock, MessageSquare, Scale, Zap } from 'lucide-react'
import { useState } from 'react'

import { InteractiveSprintCanvas } from '@/components/interactive/interactive-sprint-canvas'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/product')({
  head: () => ({
    meta: [
      { title: 'Platform Tour & Capabilities — Prismark' },
      {
        name: 'description',
        content:
          'Deep dive into the 4 pillars of the Prismark studio operating system: Sprint Flight Desk, Client Chambers, Double-Entry Money Engine, and Studio Comms.',
      },
    ],
  }),
  component: ProductPage,
})

const pillars = [
  {
    id: 'flight-desk',
    title: 'Sprint Flight Desk',
    badge: 'TASKS & GIT RUNTIME',
    icon: FolderGit2,
    headline: 'Tasks wired directly into your GitHub repositories.',
    description:
      'Replace generic task boards with an engineering-native drafting desk. One-level subtask hierarchies prevent Jira bloat, while Cloudflare edge webhooks automatically close tickets when pull requests merge.',
    features: [
      'Bi-directional GitHub PR & commit linking',
      'Strict 1-level subtask tree (no endless nesting traps)',
      'Open-to-anyone pool for available agency staff',
      'Dual-speed Kanban and high-density engineering list views',
    ],
  },
  {
    id: 'client-chambers',
    title: 'Client Chambers',
    badge: 'AIR-GAP PORTAL',
    icon: Eye,
    headline: 'White-label client portals with a cryptographic air-gap.',
    description:
      'Give clients a polished, white-label experience on your custom domain. In-portal SOW signing with SHA-256 hashes ensures contracts are ratified with zero friction, while your internal code discussions remain strictly private.',
    features: [
      'Custom domain support (e.g. portal.yourstudio.com)',
      'Digital SOW signing desk with instant PDF watermarks',
      'Gold-perimeter client channels separated from internal rooms',
      'Passwordless 6-digit cryptographic OTP client login',
    ],
  },
  {
    id: 'money-engine',
    title: 'Double-Entry Money Engine',
    badge: 'ACCOUNTING & PROFIT SPLITS',
    icon: Scale,
    headline: 'Append-only ledger with automated contractor profit-sharing.',
    description:
      'Never guess project profitability again. Prismark maintains balanced debit and credit entries with integer minor-unit precision directly in SQLite. Set contractor splits (e.g. 35% to lead dev) and watch payouts balance automatically upon Stripe settlement.',
    features: [
      'Integer minor-unit precision (zero floating-point math bugs)',
      'Automated contractor project share splits on milestone payment',
      'One-click general ledger CSV exports formatted for CPAs',
      'Multi-currency retainer support with fixed exchange locks',
    ],
  },
  {
    id: 'comms-conduit',
    title: 'Studio Comms Conduit',
    badge: 'COLLABORATION',
    icon: MessageSquare,
    headline: 'Real-time studio chat designed for focus, not distraction.',
    description:
      'Fast, focused team and client messaging built right into your workspace sidebar. Contextual threads attach directly to sprint tasks and SOW deliverables so context is never lost in chat history.',
    features: [
      'Contextual threads tied to tasks and invoices',
      'High-contrast markdown and syntax-highlighted code snippets',
      'Persistent client-channel visual warnings to prevent misfires',
      'Zero third-party Slack subscription required',
    ],
  },
]

export function ProductPage() {
  const [activePillar, setActivePillar] = useState(pillars[0])
  const Icon = activePillar.icon

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 pb-28 md:px-14">
        {/* Header */}
        <section className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-orange-600 dark:text-orange-400">
            <Zap className="h-3.5 w-3.5" />
            <span>PLATFORM TOUR // ARCHITECTURAL PILLARS</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            An operating system engineered for{' '}
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-blue-500 bg-clip-text text-transparent">
              software craft.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Every feature in Prismark is designed around the authentic lifecycle of boutique
            agencies: scoping contracts, drafting code, protecting margins, and delighting
            enterprise clients.
          </p>
        </section>

        {/* Pillar Switcher Tabs */}
        <div className="mb-12 flex flex-wrap gap-2 border-b border-slate-200 pb-4 dark:border-white/[0.08]">
          {pillars.map((pillar) => {
            const TabIcon = pillar.icon
            const isSelected = activePillar.id === pillar.id
            return (
              <button
                type="button"
                key={pillar.id}
                onClick={() => setActivePillar(pillar)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white'
                }`}
              >
                <TabIcon className="h-4 w-4" />
                <span>{pillar.title}</span>
              </button>
            )
          })}
        </div>

        {/* Active Pillar Detailed Showcase */}
        <section className="mb-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-12 dark:border-white/[0.08] dark:bg-[#0D111A]">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-6">
              <span className="font-mono text-xs font-bold tracking-wider text-orange-600 uppercase dark:text-orange-400">
                {activePillar.badge}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                {activePillar.headline}
              </h2>
              <p className="font-sans text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {activePillar.description}
              </p>

              <div className="space-y-3 pt-2">
                {activePillar.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-xs text-slate-700 sm:text-sm dark:text-slate-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-inner lg:col-span-6 dark:border-slate-800 dark:bg-[#06080E]">
              <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-3 font-mono text-xs text-slate-500 dark:border-slate-800">
                <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Icon className="h-4 w-4 text-orange-500" />
                  <span>{activePillar.title} Preview</span>
                </span>
                <span className="font-bold text-emerald-500">Cloudflare D1 Verified</span>
              </div>

              {activePillar.id === 'flight-desk' && (
                <div className="space-y-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                  <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-1 flex justify-between font-bold text-orange-500">
                      <span>PRIS-104</span>
                      <span className="text-emerald-500">Auto-Closed</span>
                    </div>
                    <p className="text-xs font-medium text-slate-900 dark:text-white">
                      Merged PR #241 to branch main · Webhook executed in 14ms
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-1 flex justify-between font-bold text-blue-500">
                      <span>PRIS-107</span>
                      <span className="text-amber-500">In Review</span>
                    </div>
                    <p className="text-xs font-medium text-slate-900 dark:text-white">
                      Subtasks: 3 of 4 approved · Client air-gap active
                    </p>
                  </div>
                </div>
              )}

              {activePillar.id === 'client-chambers' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="font-bold text-blue-500">portal.meridianlabs.co</div>
                    <div className="font-sans text-xs text-slate-900 dark:text-white">
                      Enterprise client authenticated via 6-digit magic OTP.
                    </div>
                    <div className="text-[11px] font-bold text-emerald-500">
                      ✓ SOW Ratified · Final milestone assets unlocked
                    </div>
                  </div>
                </div>
              )}

              {activePillar.id === 'money-engine' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex justify-between text-slate-900 dark:text-white">
                      <span>Journal Txn #8841:</span>
                      <span className="font-bold text-emerald-500">$18,500.00</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      DR: 1010 Operating Cash · CR: 4010 Retainer Revenue
                    </div>
                    <div className="border-t border-slate-200 pt-2 font-bold text-orange-500 dark:border-slate-800">
                      Auto Split: $6,475.00 (35%) accrued to contractor payable
                    </div>
                  </div>
                </div>
              )}

              {activePillar.id === 'comms-conduit' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-1.5 font-bold text-amber-500">
                      <Lock className="h-3 w-3" />
                      <span>Gold Perimeter Client Room</span>
                    </div>
                    <p className="font-sans text-xs text-slate-700 dark:text-slate-300">
                      &quot;Client sign-off confirmed. Deliverables have been approved and
                      signed.&quot;
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Interactive Sprint Canvas */}
        <section className="mb-24">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
              Try the live sprint canvas in real-time.
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Switch views between Sprint Board, Milestone Burn-Up, and Retainer Health:
            </p>
          </div>
          <InteractiveSprintCanvas />
        </section>

        {/* CTA Ribbon */}
        <section className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-[#0B0F19] to-slate-950 p-8 shadow-2xl sm:p-14 md:flex-row">
          <div className="max-w-xl space-y-2">
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to explore Prismark for your studio?
            </h3>
            <p className="text-sm text-slate-300">
              Schedule a personalized walkthrough or request immediate access.
            </p>
          </div>

          <Link
            to="/access"
            className="shrink-0 rounded-xl bg-orange-600 px-6 py-3.5 font-mono text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-500"
          >
            Get Studio Access →
          </Link>
        </section>
      </div>
    </MarketingLayout>
  )
}
