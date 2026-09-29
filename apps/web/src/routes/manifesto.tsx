import { createFileRoute } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'

import { MarketingLayout } from '@/components/layout/marketing-layout'

const UTM = '?utm_source=prismark.tech&utm_medium=website&utm_campaign=prismark'

export const Route = createFileRoute('/manifesto')({
  head: () => ({
    meta: [
      { title: 'The Engineering Manifesto & Doctrine — Prismark' },
      {
        name: 'description',
        content:
          'Why we rejected the corporate SaaS subscription tax to build an uncompromising studio operating system.',
      },
    ],
  }),
  component: ManifestoPage,
})

export function ManifestoPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 pb-28 md:px-14">
        {/* Header */}
        <section className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-orange-600 dark:text-orange-400">
            <BookOpen className="h-3.5 w-3.5" />
            <span>STUDIO DOCTRINE</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            Software craftsmanship over{' '}
            <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              subscription bloat.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Our refusal to build another generic silicon valley template. An uncompromising essay on
            craft, data sovereignty, and software integrity.
          </p>
        </section>

        {/* The Manifesto Document */}
        <div className="mb-20 max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-14 dark:border-white/[0.08] dark:bg-[#0D111A]">
          <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/[0.06]">
            <span className="font-mono text-xs font-bold tracking-wider text-orange-600 uppercase dark:text-orange-400">
              Prismark Doctrinal Memorandum
            </span>
            <span className="font-mono text-xs text-slate-400">Published September 2026</span>
          </div>

          <div className="space-y-10 font-sans text-base leading-relaxed text-slate-700 dark:text-slate-300">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                1. Sentences Over Spreadsheet Cells
              </h2>
              <p>
                Human beings think in narratives and execute in sentences, not endless nested
                spreadsheet cells. Everything in Prismark reads as a real event: &quot;Pinecone
                Systems signed proposal for $12,500; Musa earns $3,125 as project share.&quot;
                Actions name their outcomes: &quot;Record in ledger&quot;, &quot;Dispatch
                invoice&quot;, &quot;Close issue&quot;.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                2. Zero AI Slop &amp; Complete Data Sovereignty
              </h2>
              <p>
                We do not train machine learning models on your agency tasks, client messages, or
                financial books. We do not inject decorative AI gradients or hallucinatory
                autocomplete features. We build durable, edge-replicated relational software with
                zero third-party telemetry leakage.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                3. The Double-Entry Guarantee
              </h2>
              <p>
                A software agency is only as sustainable as its balance sheet. Guessing developer
                payouts or manually splitting invoices in Excel causes untracked margin leakage. In
                Prismark, money is treated with the mathematical rigor of integer minor units and
                balanced journal entries.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                4. The Inviolable Client Air-Gap
              </h2>
              <p>
                Clients belong in a dedicated portal where they can celebrate completed milestones,
                pay invoices in one click, and chat with leadership. They should never be subjected
                to raw developer commit chatter or internal margin deliberations. The air-gap
                guarantees this boundary by database architecture, not human discipline.
              </p>
            </section>
          </div>
        </div>

        {/* Kryft Publisher Colophon */}
        <div className="flex max-w-4xl flex-col items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm sm:flex-row dark:border-white/[0.08] dark:bg-[#06080E]">
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
              Publisher Colophon
            </span>
            <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              A Kryft Production System
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Built on Cloudflare Workers edge runtime and D1 distributed SQLite.
            </p>
          </div>
          <a
            href={`https://kryft.dev${UTM}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-5 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
          >
            <span>Visit Kryft.dev</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </MarketingLayout>
  )
}
