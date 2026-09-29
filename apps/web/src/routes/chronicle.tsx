import { createFileRoute, Link } from '@tanstack/react-router'
import { Bookmark, Clock, GitCommit, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { changelog } from '@/lib/data/changelog'

export const Route = createFileRoute('/chronicle')({
  head: () => ({
    meta: [
      { title: 'Studio Chronicle & Production Field Log — Prismark' },
      {
        name: 'description',
        content:
          'Continuous production dispatches, architecture upgrades, and release logbook from the Prismark engineering core.',
      },
    ],
  }),
  component: ChroniclePage,
})

export function ChroniclePage() {
  const [filter, setFilter] = useState<'all' | 'new' | 'improved' | 'fixed'>('all')

  const filteredEntries =
    filter === 'all' ? changelog : changelog.filter((item) => item.type === filter)

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-orange-400">
            <Clock className="h-3.5 w-3.5" />
            <span>FIELD DISPATCHES // PRODUCTION LOGBOOK</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-foreground sm:text-6xl">
            The continuous release chronicle of{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">
              Prismark Studio.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-stone-400 sm:text-lg">
            Every edge deployment, database migration, and protocol enhancement is stamped and
            cataloged. Transparent engineering without artificial hype.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="flex gap-2">
            {(
              [
                { id: 'all', label: 'All Releases' },
                { id: 'new', label: 'New Modules' },
                { id: 'improved', label: 'Engine Enhancements' },
                { id: 'fixed', label: 'Patches & Fixes' },
              ] as const
            ).map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                  filter === t.id
                    ? 'border border-orange-500/50 bg-orange-500/10 text-orange-400'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-stone-500">
            <GitCommit className="h-3.5 w-3.5 text-blue-400" />
            <span>EDGE WORKERS DEPLOYMENT ACTIVE</span>
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative space-y-8 before:absolute before:inset-0 before:left-5 before:w-px before:bg-stone-800 sm:before:left-32">
          {filteredEntries.map((entry, index) => {
            const stampVariant =
              entry.type === 'new' ? 'success' : entry.type === 'improved' ? 'cobalt' : 'warning'
            const stampText =
              entry.type === 'new'
                ? 'NEW CAPABILITY'
                : entry.type === 'improved'
                  ? 'OPTIMIZED'
                  : 'PATCHED'

            return (
              <div
                key={entry.version}
                className="relative flex flex-col items-start gap-6 pl-12 sm:flex-row sm:gap-12 sm:pl-0"
              >
                {/* Timeline Pin */}
                <div className="shrink-0 pt-1 sm:w-32 sm:text-right">
                  <span className="block font-mono text-xs font-bold text-orange-400">
                    {entry.version}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-stone-500">
                    {entry.date}
                  </span>
                </div>

                <div className="absolute top-2 left-3.5 size-3 rounded-full border-2 border-orange-500 bg-black sm:left-[124px]" />

                {/* Entry Card */}
                <div className="relative flex-1 overflow-hidden rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-6 shadow-xl sm:p-8">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                      <Bookmark className="h-4 w-4 text-blue-400" />
                      <span>{entry.title}</span>
                    </h2>
                    <InkStamp
                      label={stampText}
                      variant={stampVariant}
                      rotation={index % 2 === 0 ? -2 : 1}
                      className="text-[10px]"
                    />
                  </div>

                  <p className="mb-4 font-sans text-sm leading-relaxed text-stone-300">
                    {entry.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-stone-800/80 pt-3 font-mono text-[11px] text-stone-500">
                    <span className="text-stone-400">
                      Deployed across 310+ Cloudflare edge regions
                    </span>
                    <span className="font-semibold text-emerald-400">Zero-Downtime Migration</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Subscription Footer Ribbon */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 rounded-2xl border border-stone-800 bg-[#0B0F19] p-8 sm:flex-row">
          <div className="max-w-xl">
            <span className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-cyan-400 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>LIVE LOGBOOK FEED</span>
            </span>
            <h3 className="mt-1 text-xl font-bold text-white">
              Want release notifications in your terminal?
            </h3>
            <p className="mt-1 text-xs text-stone-400">
              Subscribe to the Prismark RSS feed or webhook stream to receive immutable changelog
              events.
            </p>
          </div>

          <Link
            to="/dispatch"
            className="shrink-0 rounded-md border border-stone-700 bg-stone-800 px-5 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-stone-700"
          >
            Access Dispatch Desk →
          </Link>
        </div>
      </div>
    </MarketingLayout>
  )
}
