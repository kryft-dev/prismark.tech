import { createFileRoute, Link } from '@tanstack/react-router'
import { ShieldCheck, Star } from 'lucide-react'

import { AgencyLogos } from '@/components/brand/agency-logos'
import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { testimonials } from '@/lib/data/testimonials'

export const Route = createFileRoute('/studios')({
  head: () => ({
    meta: [
      { title: 'Verified Studio Registry & Case Dispatches — Prismark' },
      {
        name: 'description',
        content:
          'Read verified production case dispatches from boutique software studios running on Prismark.',
      },
    ],
  }),
  component: StudiosPage,
})

const studioStories = [
  {
    name: 'Meridian Labs',
    team: '14 Engineers & Product Designers',
    location: 'London & Berlin',
    headline: 'Unified 4 apps into 1, eliminating $7,200/yr in subscription overhead.',
    details:
      'Previously, team members spent Friday afternoons manually calculating project margins in spreadsheets while chasing client invoices across Stripe and QuickBooks. With Prismark, deposits balance automatically into developer payout accounts.',
    stats: '14 Hours Avg Pay Time (Down from 18 Days)',
    stamp: 'VERIFIED DISPATCH',
  },
  {
    name: 'Bloom & Co',
    team: '8 Full-Stack Consultants',
    location: 'San Francisco & Remote',
    headline: 'Zero accidental client leaks with the Amber Eye air-gap.',
    details:
      'Our previous Slack setup led to a near-catastrophic leak when an engineer posted raw contractor margin rates in a shared client channel. Prismark permanently prevents this by physically isolating internal conversations from client portals.',
    stats: '100% Perimeter Security',
    stamp: 'AIR-GAP CERTIFIED',
  },
  {
    name: 'Arclight Digital',
    team: '22 Distributed Specialists',
    location: 'Toronto & Austin',
    headline: 'Client onboarding time reduced from 3 days to 4 minutes.',
    details:
      'Clients sign their SOW directly inside their dedicated portal with one click. Invoices generate on the spot, and tasks sync automatically from our GitHub repository.',
    stats: '7x Studio Account Scale',
    stamp: 'WHITELABEL ACTIVE',
  },
]

export function StudiosPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>VERIFIED STUDIO REGISTRY // PRODUCTION STORIES</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-foreground sm:text-6xl">
            Studios shipping software{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              without operational debt.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-stone-400 sm:text-lg">
            Read field dispatches from boutique agency founders who discarded the 6-tool
            subscription circus in favor of an integrated operating canvas.
          </p>
        </div>

        {/* Partner Studio Marks */}
        <div className="mb-16 rounded-2xl border border-stone-800 bg-[#0A0D15]/80 p-8 shadow-xl">
          <AgencyLogos />
        </div>

        {/* 3 Detailed Case Studies */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {studioStories.map((s) => (
            <div
              key={s.name}
              className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-[#0B0F19] p-6 shadow-xl sm:p-8"
            >
              <div>
                <div className="mb-4 flex items-center justify-between border-b border-stone-800 pb-3">
                  <div>
                    <h2 className="text-xl font-bold text-white">{s.name}</h2>
                    <span className="font-mono text-xs text-stone-500">
                      {s.team} · {s.location}
                    </span>
                  </div>
                  <InkStamp
                    label={s.stamp}
                    variant="emerald"
                    rotation={-2}
                    className="text-[9px]"
                  />
                </div>

                <div className="mb-4 inline-block rounded border border-emerald-500/30 bg-emerald-950/60 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400">
                  {s.stats}
                </div>

                <h3 className="mb-2 text-base font-bold text-stone-200">{s.headline}</h3>
                <p className="text-sm leading-relaxed text-stone-400">{s.details}</p>
              </div>

              <div className="mt-6 border-t border-stone-800/80 pt-4 font-mono text-xs text-stone-500">
                Verified Studio Case Record #2026
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials list */}
        <div className="mb-16 rounded-2xl border border-stone-800 bg-[#080B12] p-8 shadow-xl sm:p-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Founder Field Dispatches</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="space-y-2 rounded-xl border border-stone-800/80 bg-stone-900/30 p-5 font-mono text-xs"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3 fill-current" />
                  ))}
                </div>
                <p className="font-sans text-sm text-stone-300 italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="border-t border-stone-800 pt-2 text-stone-500">
                  <span className="font-bold text-white">{t.name}</span> · {t.role}, {t.agency}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Ribbon */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border-2 border-stone-800 bg-gradient-to-r from-orange-950/40 via-stone-900 to-blue-950/40 p-8 shadow-2xl sm:flex-row sm:p-12">
          <div>
            <h3 className="text-2xl font-bold text-white">Join 180+ Studios Running on Prismark</h3>
            <p className="mt-1 text-sm text-stone-400">
              Get your early access permit code in under 2 minutes.
            </p>
          </div>
          <Link
            to="/dispatch"
            className="shrink-0 rounded-md bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 font-mono text-xs font-bold text-white shadow-lg"
          >
            Dispatch Workspace Key →
          </Link>
        </div>
      </div>
    </MarketingLayout>
  )
}
