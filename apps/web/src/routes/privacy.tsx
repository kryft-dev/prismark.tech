import { createFileRoute } from '@tanstack/react-router'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: 'Privacy Policy — Prismark' },
      {
        name: 'description',
        content: 'Our commitment to data ownership, zero AI training, and edge encryption.',
      },
    ],
  }),
})

export function PrivacyPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-4xl px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="drafting" />

        <div className="paper-shadow-lg rounded-2xl border-2 border-[#D8CEBE] bg-white p-8 sm:p-14">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <div>
              <span className="font-mono text-xs font-bold tracking-wider text-stone-500 uppercase">
                LEGAL INSTRUMENT // PRIVACY CODE
              </span>
              <h1 className="mt-1 text-3xl font-extrabold text-[#18181B] sm:text-4xl">
                Privacy Policy
              </h1>
              <p className="mt-1 font-mono text-xs text-stone-500">
                Last ratified: September 29, 2026 · Cloudflare Global Edge
              </p>
            </div>
            <InkStamp label="NOTARIZED" variant="emerald" rotation={-3} className="text-xs" />
          </div>

          <div className="space-y-8 font-sans text-base leading-relaxed text-stone-700">
            <section>
              <h2 className="mb-2 font-mono text-lg font-bold tracking-wide text-stone-900 uppercase">
                1. Fundamental Principle: Zero AI Scraping
              </h2>
              <p>
                Prismark never trains machine learning or AI models on your agency tasks, code
                repositories, chat messages, client documents, or double-entry financial ledger
                lines. Your work remains exclusively yours.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-lg font-bold tracking-wide text-stone-900 uppercase">
                2. Data Collection &amp; Workspace Isolation
              </h2>
              <p>
                We collect minimal necessary information to operate your workspace tenant: account
                email, session cryptographic hashes, and billing tokens. Every workspace in Prismark
                is strictly tenant-isolated. Client members can never access internal channels or
                staff earnings.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-lg font-bold tracking-wide text-stone-900 uppercase">
                3. Financial Data &amp; Stripe Processing
              </h2>
              <p>
                Payment processing is handled directly via Stripe. Prismark stores double-entry
                ledger journal metadata on Cloudflare D1 encrypted at rest. We never store raw
                credit card numbers or banking credentials.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-lg font-bold tracking-wide text-stone-900 uppercase">
                4. Data Portability &amp; Right to Erase
              </h2>
              <p>
                Workspace owners can export complete JSON and CSV archives of tasks, channels,
                documents, and financial journals at any time. Upon workspace termination, all data
                is purged from our primary and replica edge nodes within 30 days.
              </p>
            </section>

            <section className="border-t border-stone-200 pt-6">
              <h2 className="mb-2 font-mono text-lg font-bold tracking-wide text-stone-900 uppercase">
                5. Contacting Legal Counsel
              </h2>
              <p>
                Direct legal inquiries to{' '}
                <code className="rounded bg-stone-100 px-2 py-1 font-mono text-xs">
                  legal@kryft.dev
                </code>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
