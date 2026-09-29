import { createFileRoute } from '@tanstack/react-router'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: 'Terms of Service — Prismark' },
      {
        name: 'description',
        content: 'Terms and covenants governing the use of the Prismark platform.',
      },
    ],
  }),
})

export function TermsPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-4xl px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="drafting" />

        <div className="paper-shadow-lg rounded-2xl border-2 border-[#D8CEBE] bg-white p-8 sm:p-14">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <div>
              <span className="font-mono text-xs font-bold tracking-wider text-stone-500 uppercase">
                COVENANT // SERVICE AGREEMENT
              </span>
              <h1 className="mt-1 text-3xl font-extrabold text-[#18181B] sm:text-4xl">
                Terms of Service
              </h1>
              <p className="mt-1 font-mono text-xs text-stone-500">
                Effective: September 29, 2026 · Prismark Software Inc.
              </p>
            </div>
            <InkStamp label="RATIFIED" variant="cobalt" rotation={2} className="text-xs" />
          </div>

          <div className="space-y-8 font-sans text-base leading-relaxed text-stone-700">
            <section>
              <h2 className="mb-2 font-mono text-lg font-bold tracking-wide text-stone-900 uppercase">
                1. Acceptance of Operating Terms
              </h2>
              <p>
                By establishing an agency workspace or signing into the client portal, you agree to
                these Terms of Service. If you are entering on behalf of an agency, you represent
                that you possess authority to bind the organization.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-lg font-bold tracking-wide text-stone-900 uppercase">
                2. Seat Allocations &amp; Unlimited Client Guests
              </h2>
              <p>
                Subscriptions are billed on a per-member basis for staff and admin roles who create
                projects or manage financial ledgers. Clients accessing the portal, signing
                proposals, or chatting in the client channel are free guests and do not consume paid
                seats.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-lg font-bold tracking-wide text-stone-900 uppercase">
                3. Financial Ledger Integrity
              </h2>
              <p>
                Prismark provides double-entry accounting software tools for tracking agency income
                and developer shares. We do not provide licensed CPA or tax advice. Agencies remain
                responsible for their own tax filings and compliance obligations.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-lg font-bold tracking-wide text-stone-900 uppercase">
                4. Service Availability &amp; Edge Infrastructure
              </h2>
              <p>
                We strive for 99.99% uptime utilizing Cloudflare edge workers and geographically
                distributed D1 storage. Scheduled maintenance windows are communicated at least 48
                hours in advance.
              </p>
            </section>

            <section className="border-t border-stone-200 pt-6">
              <h2 className="mb-2 font-mono text-lg font-bold tracking-wide text-stone-900 uppercase">
                5. Jurisdiction &amp; Governance
              </h2>
              <p>
                These terms are governed by the laws of the State of Delaware. Disputes shall be
                resolved through binding arbitration in accordance with AAA rules.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
