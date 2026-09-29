import { createFileRoute } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
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
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-orange-400">
            <BookOpen className="h-3.5 w-3.5" />
            <span>STUDIO DOCTRINE // MANIFESTO</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-foreground sm:text-6xl">
            Software craftsmanship over{' '}
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              corporate SaaS bloat.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-stone-400 sm:text-lg">
            Our refusal to build another generic silicon valley template. An uncompromising field
            manifesto on craft, data sovereignty, and physical software integrity.
          </p>
        </div>

        {/* The Manifesto Document */}
        <div className="relative mb-20 max-w-4xl rounded-3xl border border-stone-800 bg-[#0B0F19] p-8 shadow-2xl sm:p-14">
          <div className="mb-8 flex items-center justify-between border-b border-stone-800 pb-4">
            <span className="font-mono text-xs font-bold tracking-wider text-orange-400 uppercase">
              PRISMARK DOCTRINAL MEMORANDUM // 2026
            </span>
            <InkStamp label="RATIFIED 2026" variant="emerald" rotation={-2} className="text-xs" />
          </div>

          <div className="space-y-8 font-sans text-base leading-relaxed text-stone-300">
            <section>
              <h2 className="mb-2 font-mono text-xl font-bold text-white uppercase">
                1. Sentences Over Cells
              </h2>
              <p>
                Human beings think in narratives and execute in sentences, not endless spreadsheet
                cells. Everything in Prismark reads as a real event: "Pinecone Systems signed
                proposal for $12,500; Musa earns $3,125 as project share." Actions name their
                outcomes: "Record in ledger", "Dispatch invoice", "Close issue".
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-xl font-bold text-white uppercase">
                2. Zero AI Slop &amp; Complete Data Sovereignty
              </h2>
              <p>
                We do not train machine learning models on your agency tasks, client messages, or
                financial books. We do not inject decorative AI gradients or hallucinatory
                autocomplete features. We build durable, edge-replicated relational software with
                zero third-party telemetry leakage.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-xl font-bold text-white uppercase">
                3. The Double-Entry Guarantee
              </h2>
              <p>
                A software agency is only as sustainable as its balance sheet. Guessing developer
                payouts or manually splitting invoices in Excel causes untracked margin leakage. In
                Prismark, money is treated with the cryptographic rigor of integer minor units and
                balanced journal entries.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-xl font-bold text-white uppercase">
                4. The Inviolable Client Air-Gap
              </h2>
              <p>
                Clients belong in a dedicated portal where they can celebrate completed milestones,
                pay invoices in one click, and chat with leadership. They should never be subjected
                to raw developer commit chatter or internal margin deliberations. The Amber Eye
                guarantees this boundary by physics, not human discipline.
              </p>
            </section>
          </div>
        </div>

        {/* Kryft Publisher Colophon */}
        <div className="flex max-w-4xl flex-col items-center justify-between gap-6 rounded-2xl border-2 border-stone-800 bg-[#080B12] p-8 shadow-xl sm:flex-row">
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-blue-400 uppercase">
              PUBLISHER COLOPHON // KRYFT.DEV
            </span>
            <h3 className="mt-1 text-xl font-bold text-white">A Kryft Production SaaS System</h3>
            <p className="mt-1 text-sm text-stone-400">
              Built on Cloudflare Workers edge runtime and D1 distributed SQLite.
            </p>
          </div>
          <a
            href={`https://kryft.dev${UTM}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-stone-800 px-5 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-stone-700"
          >
            <span>Visit Kryft.dev</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </MarketingLayout>
  )
}
