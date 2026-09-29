import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2, Code2, Layers, Palette, Users } from 'lucide-react'
import { useState } from 'react'

import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/solutions')({
  head: () => ({
    meta: [
      { title: 'Solutions for Craft Studios & Consultancies — Prismark' },
      {
        name: 'description',
        content:
          'Tailored operating workflows for engineering consultancies, design & brand studios, and full-service digital agencies.',
      },
    ],
  }),
  component: SolutionsPage,
})

const agencyTypes = [
  {
    id: 'engineering',
    title: 'Software & Engineering Consultancies',
    badge: 'FOR DEVELOPERS',
    icon: Code2,
    headline: 'Where code merges directly trigger client milestone settlements.',
    description:
      'Engineers shouldn’t have to copy-paste commit links into Jira or ask the founder if an invoice got paid. Prismark connects git branches directly to SOW deliverables, automatically accruing contractor cuts upon Stripe clearance.',
    benefits: [
      'Automatic task completion via GitHub pull request merge webhooks',
      'Automated contractor profit splits (e.g. 35% dev share on milestone M2)',
      'Mathematical air-gap: Clients never see internal PR diffs or raw commit messages',
      'Zero float error: Double-entry ledger with integer minor-unit math',
    ],
    quote:
      'Prismark turned our Sunday evening accounting nightmare into an automated background process. We disburse contractor cuts automatically when clients pay.',
    author: 'Elena Rostova · Founding Partner, Arclight Digital',
  },
  {
    id: 'design',
    title: 'Design & Brand Studios',
    badge: 'FOR CREATIVES',
    icon: Palette,
    headline: 'High-polish client presentation without the chaotic feedback loops.',
    description:
      'Brand and product design studios need to present deliverables with pride. Prismark gives your clients a custom-domain portal where they can review design assets, approve milestone rounds, and ratify SOWs with digital signatures.',
    benefits: [
      'In-portal asset download and presentation with custom brand domains',
      'Digital SOW ratification desk with SHA-256 cryptographic audit logs',
      'Gold-perimeter client channels keep messy brainstorms inside staff rooms',
      'Unlimited client guests included without paying extra per-seat fees',
    ],
    quote:
      'Our clients used to complain about getting lost in Slack guest channels. Having their own branded portal with signed SOWs made our boutique firm look like a 100-person powerhouse.',
    author: 'Julian Thorne · Creative Director, Meridian Studio',
  },
  {
    id: 'fullservice',
    title: 'Full-Service Digital Agencies',
    badge: 'FOR MULTI-DISCIPLINARY',
    icon: Layers,
    headline: 'Unified retainer management across design, code, and marketing.',
    description:
      'Managing blended team rates, diverse client retainers, and cross-functional teams is difficult across disjointed tools. Prismark combines task velocity, retainer hour realization, and client billing into one source of truth.',
    benefits: [
      'Real-time retainer capacity watchdog alerts before hours exceed contract terms',
      'Multi-tenant membership isolation ensures team members only see assigned accounts',
      'Direct CPA general ledger export formatted for QuickBooks and Xero',
      'Integrated team comms eliminate separate Slack Pro subscriptions',
    ],
    quote:
      'We canceled 5 different software subscriptions the week we migrated. Prismark paid for itself on day three.',
    author: 'Claire Sterling · Operations Director, Northwind Creative',
  },
]

export function SolutionsPage() {
  const [activeType, setActiveType] = useState(agencyTypes[0])
  const Icon = activeType.icon

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 pb-28 md:px-14">
        {/* Header */}
        <section className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Users className="h-3.5 w-3.5" />
            <span>SOLUTIONS // STUDIO ARCHETYPES</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            Purpose-built for the way{' '}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-orange-500 bg-clip-text text-transparent">
              studios actually work.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Whether you are shipping mission-critical code, crafting luxury brand systems, or
            managing enterprise retainers, Prismark adapts to your studio workflow.
          </p>
        </section>

        {/* Studio Type Selector Tabs */}
        <div className="mb-12 flex flex-wrap gap-2 border-b border-slate-200 pb-4 dark:border-white/[0.08]">
          {agencyTypes.map((type) => {
            const TabIcon = type.icon
            const isSelected = activeType.id === type.id
            return (
              <button
                type="button"
                key={type.id}
                onClick={() => setActiveType(type)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white'
                }`}
              >
                <TabIcon className="h-4 w-4" />
                <span>{type.title}</span>
              </button>
            )
          })}
        </div>

        {/* Active Solution In-Depth Panel */}
        <section className="mb-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-14 dark:border-white/[0.08] dark:bg-[#0D111A]">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <span className="font-mono text-xs font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                {activeType.badge}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
                {activeType.headline}
              </h2>
              <p className="font-sans text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {activeType.description}
              </p>

              <div className="space-y-3 pt-2">
                {activeType.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-xs text-slate-700 sm:text-sm dark:text-slate-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Quote Block */}
              <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="font-sans text-xs leading-relaxed text-slate-800 italic sm:text-sm dark:text-slate-300">
                  &quot;{activeType.quote}&quot;
                </p>
                <div className="font-mono text-[11px] font-semibold text-slate-500">
                  {activeType.author}
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 lg:col-span-5 dark:border-slate-800 dark:bg-[#06080E]">
              <div className="flex size-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Key Workflow Integration
              </h3>

              <div className="space-y-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-emerald-500" />
                  <span>Stripe Connect Instant Payouts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-blue-500" />
                  <span>Cloudflare D1 Multi-Tenant Isolation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-purple-500" />
                  <span>Zero Third-Party AI Data Scraping</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-amber-500" />
                  <span>Unlimited Complimentary Client Guests</span>
                </div>
              </div>

              <Link
                to="/access"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-mono text-xs font-bold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              >
                <span>Request Custom Walkthrough</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Ribbon */}
        <section className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-[#0B0F19] to-slate-950 p-8 shadow-2xl sm:p-14 md:flex-row">
          <div className="max-w-xl space-y-2">
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              Get an operating system configured for your studio.
            </h3>
            <p className="text-sm text-slate-300">
              We assist with onboarding your existing clients and historical ledger records.
            </p>
          </div>

          <Link
            to="/access"
            className="shrink-0 rounded-xl bg-orange-600 px-6 py-3.5 font-mono text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-500"
          >
            Get Started →
          </Link>
        </section>
      </div>
    </MarketingLayout>
  )
}
