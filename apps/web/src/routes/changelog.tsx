import { createFileRoute } from '@tanstack/react-router'
import { Bookmark, Clock, GitCommit } from 'lucide-react'
import { useState } from 'react'

import { MarketingLayout } from '@/components/layout/marketing-layout'
import { changelog } from '@/lib/data/changelog'

export const Route = createFileRoute('/changelog')({
  head: () => ({
    meta: [
      { title: 'Changelog & Product Updates — Prismark' },
      {
        name: 'description',
        content:
          'Continuous production dispatches, architecture upgrades, and release logbook from the Prismark engineering core.',
      },
    ],
  }),
  component: ChangelogPage,
})

export function ChangelogPage() {
  const [filter, setFilter] = useState<'all' | 'new' | 'improved' | 'fixed'>('all')

  const filteredEntries =
    filter === 'all' ? changelog : changelog.filter((item) => item.type === filter)

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 pb-28 md:px-14">
        {/* Header */}
        <section className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-orange-600 dark:text-orange-400">
            <Clock className="h-3.5 w-3.5" />
            <span>PRODUCT UPDATES // WHAT&apos;S NEW</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            Continuous product releases,{' '}
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-blue-500 bg-clip-text text-transparent">
              zero marketing fluff.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Every edge deployment, database migration, and capability enhancement cataloged in
            chronological order.
          </p>
        </section>

        {/* Filter Controls */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-white/[0.08]">
          <div className="flex gap-2">
            {(
              [
                { id: 'all', label: 'All Updates' },
                { id: 'new', label: 'New Capabilities' },
                { id: 'improved', label: 'Enhancements' },
                { id: 'fixed', label: 'Fixes' },
              ] as const
            ).map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                  filter === t.id
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <GitCommit className="h-3.5 w-3.5 text-blue-500" />
            <span>Deployed globally on Cloudflare edge</span>
          </div>
        </div>

        {/* Timeline Stream */}
        <section className="relative space-y-8 before:absolute before:inset-0 before:left-5 before:w-px before:bg-slate-200 sm:before:left-32 dark:before:bg-slate-800">
          {filteredEntries.map((entry) => {
            const badgeColor =
              entry.type === 'new'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                : entry.type === 'improved'
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'

            const badgeText =
              entry.type === 'new'
                ? 'New Feature'
                : entry.type === 'improved'
                  ? 'Optimized'
                  : 'Fixed'

            return (
              <div
                key={entry.version}
                className="relative flex flex-col items-start gap-6 pl-12 sm:flex-row sm:gap-12 sm:pl-0"
              >
                {/* Timeline Pin */}
                <div className="shrink-0 pt-1 sm:w-32 sm:text-right">
                  <span className="block font-mono text-xs font-bold text-orange-600 dark:text-orange-400">
                    {entry.version}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-slate-400">
                    {entry.date}
                  </span>
                </div>

                <div className="absolute top-2 left-3.5 size-3 rounded-full border-2 border-orange-500 bg-white sm:left-[124px] dark:bg-black" />

                {/* Entry Card */}
                <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/[0.08] dark:bg-[#0D111A]">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                      <Bookmark className="h-4 w-4 text-blue-500" />
                      <span>{entry.title}</span>
                    </h2>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold ${badgeColor}`}
                    >
                      {badgeText}
                    </span>
                  </div>

                  <p className="mb-4 font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {entry.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 font-mono text-[11px] text-slate-400 dark:border-white/[0.06]">
                    <span>Zero-Downtime Edge Rollout</span>
                    <span className="font-semibold text-emerald-500">Active in Production</span>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      </div>
    </MarketingLayout>
  )
}
