import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/rates')({
  head: () => ({
    meta: [
      { title: 'Studio Capacity & Licensing Rates — Prismark' },
      {
        name: 'description',
        content:
          'Transparent agency pricing based on active staff members. Unlimited client guests always included.',
      },
    ],
  }),
  component: RatesPage,
})

export function RatesPage() {
  const [seats, setSeats] = useState(6)

  const starterTotal = seats * 29
  const proTotal = seats * 49
  const agencyTotal = seats * 89

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>STUDIO CAPACITY &amp; LICENSING</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-foreground sm:text-6xl">
            Predictable licensing.{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400 bg-clip-text text-transparent">
              Zero guest surcharges.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-stone-400 sm:text-lg">
            Only core studio staff who draft tasks, commit code, or manage the ledger require seats.
            Clients accessing milestones, channels, and paying invoices are always 100% free guests.
          </p>
        </div>

        {/* Interactive Seat Calculator Slider */}
        <div className="mb-16 max-w-2xl rounded-2xl border border-stone-800 bg-[#0B0F19] p-6 shadow-xl sm:p-8">
          <div className="mb-3 flex items-center justify-between font-mono text-xs text-stone-300">
            <span className="font-bold text-white uppercase">ACTIVE STUDIO TEAMMATES</span>
            <span className="font-mono text-base font-bold text-orange-400">
              {seats} Staff Members
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={35}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            className="w-full cursor-pointer accent-orange-500"
          />
          <div className="mt-2 flex justify-between font-mono text-[11px] text-stone-500">
            <span>Solo / Duo (1-2)</span>
            <span>Boutique Squad (5-10)</span>
            <span>Full Agency (20-35+)</span>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="mb-20 grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
          {/* Tier 1: Apprentice */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-[#0A0D16] p-6 shadow-xl sm:p-8">
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-stone-800 pb-3 font-mono text-xs text-stone-400">
                <span>TIER 01 // STARTER</span>
                <span>$29 / SEAT</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Apprentice Studio</h2>
              <p className="mt-2 min-h-[40px] text-sm text-stone-400">
                Ideal for young studios and boutique collectives shipping their first client
                retainers.
              </p>

              <div className="mt-6 border-b border-stone-800 pb-6 font-mono">
                <span className="text-4xl font-extrabold text-white">${starterTotal}</span>
                <span className="ml-1 text-xs text-stone-400">/ month ({seats} seats)</span>
              </div>

              <ul className="mt-6 space-y-3 font-mono text-xs text-stone-300">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Up to 5 active client projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Basic invoicing &amp; Stripe pay</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Unlimited client portal guests</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>10 GB encrypted edge storage</span>
                </li>
              </ul>
            </div>

            <Link
              to="/dispatch"
              className="mt-8 block w-full rounded-md border border-stone-700 bg-stone-900 py-3 text-center font-mono text-xs font-bold text-white transition-colors hover:bg-stone-800"
            >
              Choose Starter →
            </Link>
          </div>

          {/* Tier 2: Production (Pro) */}
          <div className="relative z-10 flex scale-[1.02] flex-col justify-between rounded-2xl border-2 border-orange-500 bg-[#0F1422] p-6 shadow-2xl sm:p-8">
            <div className="absolute -top-3 right-6">
              <InkStamp
                label="RECOMMENDED"
                variant="vermilion"
                rotation={-2}
                className="text-[10px]"
              />
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between border-b border-orange-950/80 pb-3 font-mono text-xs text-orange-400">
                <span>TIER 02 // PRODUCTION</span>
                <span>$49 / SEAT</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Production Studio</h2>
              <p className="mt-2 min-h-[40px] text-sm text-stone-300">
                The complete operating system with balanced double-entry accounting and git
                synchronization.
              </p>

              <div className="mt-6 border-b border-stone-800 pb-6 font-mono">
                <span className="text-4xl font-extrabold text-orange-400">${proTotal}</span>
                <span className="ml-1 text-xs text-stone-400">/ month ({seats} seats)</span>
              </div>

              <ul className="mt-6 space-y-3 font-mono text-xs text-stone-200">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 font-bold text-orange-400" />
                  <span>Unlimited concurrent client projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 font-bold text-orange-400" />
                  <span>Double-entry ledger &amp; dev profit splits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 font-bold text-orange-400" />
                  <span>In-portal document signing &amp; hash notary</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 font-bold text-orange-400" />
                  <span>GitHub bi-directional issue auto-close</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 font-bold text-orange-400" />
                  <span>100 GB global edge asset storage</span>
                </li>
              </ul>
            </div>

            <Link
              to="/dispatch"
              className="mt-8 block w-full rounded-md bg-gradient-to-r from-orange-600 to-amber-600 py-3 text-center font-mono text-xs font-bold text-white shadow-lg transition-transform hover:brightness-110"
            >
              Select Production Studio →
            </Link>
          </div>

          {/* Tier 3: Enterprise Agency */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-[#0A0D16] p-6 shadow-xl sm:p-8">
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-stone-800 pb-3 font-mono text-xs text-stone-400">
                <span>TIER 03 // AIR-GAP SCALE</span>
                <span>$89 / SEAT</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Whitelabel Agency</h2>
              <p className="mt-2 min-h-[40px] text-sm text-stone-400">
                For established agencies requiring their own custom domain, API integrations, and
                SLA.
              </p>

              <div className="mt-6 border-b border-stone-800 pb-6 font-mono">
                <span className="text-4xl font-extrabold text-white">${agencyTotal}</span>
                <span className="ml-1 text-xs text-stone-400">/ month ({seats} seats)</span>
              </div>

              <ul className="mt-6 space-y-3 font-mono text-xs text-stone-300">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-400" />
                  <span>Everything in Production Studio</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-400" />
                  <span>Custom domain (clients.youragency.com)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-400" />
                  <span>Full API &amp; Webhook access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-400" />
                  <span>Dedicated Slack support channel</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-blue-400" />
                  <span>Unlimited global edge storage</span>
                </li>
              </ul>
            </div>

            <Link
              to="/dispatch"
              className="mt-8 block w-full rounded-md border border-stone-700 bg-stone-900 py-3 text-center font-mono text-xs font-bold text-white transition-colors hover:bg-stone-800"
            >
              Choose Whitelabel →
            </Link>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
