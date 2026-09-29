import { createFileRoute } from '@tanstack/react-router'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/legal/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy & Data Covenants — Prismark' },
      {
        name: 'description',
        content: 'Our commitment to data ownership, zero AI training, and edge encryption.',
      },
    ],
  }),
  component: PrivacyPage,
})

export function PrivacyPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-4xl px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/95 p-8 shadow-2xl backdrop-blur-md sm:p-14">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-6">
            <div>
              <span className="font-mono text-xs font-bold tracking-wider text-orange-400 uppercase">
                LEGAL INSTRUMENT // PRIVACY CODE
              </span>
              <h1 className="mt-1 text-3xl font-black text-white sm:text-4xl">Privacy Policy</h1>
              <p className="mt-1 font-mono text-xs text-stone-500">
                Last ratified: September 29, 2026 · Cloudflare Global Edge
              </p>
            </div>
            <InkStamp label="NOTARIZED" variant="cobalt" rotation={-3} className="text-xs" />
          </div>

          <div className="space-y-8 font-sans text-sm leading-relaxed text-stone-300 sm:text-base">
            <section>
              <h2 className="mb-2 font-mono text-base font-bold tracking-wide text-white uppercase">
                1. Fundamental Principle: Zero AI Scraping
              </h2>
              <p>
                Prismark never trains machine learning or AI models on your agency tasks, code
                repositories, chat messages, client documents, or double-entry financial ledger
                lines. Your work remains exclusively yours.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-base font-bold tracking-wide text-white uppercase">
                2. Data Collection &amp; Workspace Isolation
              </h2>
              <p>
                We collect minimal necessary information to operate your workspace tenant: account
                email, session cryptographic hashes, and billing tokens. Every workspace in Prismark
                executes on isolated SQLite D1 database partitions with strict tenant-scoping logic
                preventing cross-tenant data leakage.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-base font-bold tracking-wide text-white uppercase">
                3. Client Portal Air-Gap Guardrails
              </h2>
              <p>
                When you grant clients access to your client portal, their access is structurally
                gated to designated deliverables, invoices, and client-facing messages. Internal
                conversations, contractor profit splits, and git branch diffs are never visible to
                client memberships.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-base font-bold tracking-wide text-white uppercase">
                4. Infrastructure &amp; Encryption
              </h2>
              <p>
                All data is encrypted in transit using TLS 1.3 and encrypted at rest using AES-256.
                Prismark is deployed globally across Cloudflare edge data centers to ensure sub-50ms
                response times and high availability without single-region points of failure.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-base font-bold tracking-wide text-white uppercase">
                5. Data Portability &amp; Instant Erasure
              </h2>
              <p>
                You retain complete sovereignty over your studio records. You may export your entire
                workspace data—including tasks, messages, documents, and double-entry ledger
                tables—in open JSON/CSV format at any time. When you close your account, your data
                is permanently purged within 30 days.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-base font-bold tracking-wide text-white uppercase">
                6. Contact the Legal Desk
              </h2>
              <p>
                Questions regarding our privacy covenants or data protection procedures can be
                directed to our legal desk at{' '}
                <a
                  href="mailto:legal@prismark.tech"
                  className="text-orange-400 underline underline-offset-4 hover:text-orange-300"
                >
                  legal@prismark.tech
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
