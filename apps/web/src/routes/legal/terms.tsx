import { createFileRoute } from '@tanstack/react-router'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/legal/terms')({
  head: () => ({
    meta: [
      { title: 'Terms of Service & Licensing Covenants — Prismark' },
      {
        name: 'description',
        content: 'Terms and covenants governing the use of the Prismark platform.',
      },
    ],
  }),
  component: TermsPage,
})

export function TermsPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-4xl px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/95 p-8 shadow-2xl backdrop-blur-md sm:p-14">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-6">
            <div>
              <span className="font-mono text-xs font-bold tracking-wider text-orange-400 uppercase">
                COVENANT // SERVICE AGREEMENT
              </span>
              <h1 className="mt-1 text-3xl font-black text-white sm:text-4xl">Terms of Service</h1>
              <p className="mt-1 font-mono text-xs text-stone-500">
                Effective: September 29, 2026 · Prismark Software Inc.
              </p>
            </div>
            <InkStamp label="RATIFIED" variant="cobalt" rotation={2} className="text-xs" />
          </div>

          <div className="space-y-8 font-sans text-sm leading-relaxed text-stone-300 sm:text-base">
            <section>
              <h2 className="mb-2 font-mono text-base font-bold tracking-wide text-white uppercase">
                1. Acceptance of Operating Terms
              </h2>
              <p>
                By establishing an agency workspace or signing into the client portal, you agree to
                these Terms of Service. If you are entering on behalf of an agency, you represent
                that you possess authority to bind the organization.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-base font-bold tracking-wide text-white uppercase">
                2. Seat Allocations &amp; Unlimited Client Guests
              </h2>
              <p>
                Subscriptions are billed on a per-member basis for staff and admin roles who create
                projects or manage financial ledgers. Clients accessing the portal, signing
                documents, or participating in client chat channels are always complimentary and
                never count against your active seat limit.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-base font-bold tracking-wide text-white uppercase">
                3. Financial Ledgers &amp; Payment Calculations
              </h2>
              <p>
                Prismark provides double-entry accounting tracking and automated profit-split
                calculations for internal studio management. While our ledger engine operates with
                integer minor-unit accuracy, Prismark is software tooling and does not constitute
                licensed tax or legal advice. Final tax filings remain the responsibility of the
                workspace owner.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-base font-bold tracking-wide text-white uppercase">
                4. Intellectual Property &amp; Source Code Ownership
              </h2>
              <p>
                You retain complete, unencumbered ownership of all intellectual property, git
                commits, documents, customer records, and deliverables stored in your workspace.
                Prismark claims zero ownership or licensing rights over your studio outputs.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-base font-bold tracking-wide text-white uppercase">
                5. SLA &amp; Global Availability
              </h2>
              <p>
                We target 99.9% uptime across our global Cloudflare edge deployment. Scheduled
                maintenance windows are announced in advance in our chronicle logbook and execute
                without taking read operations offline.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-base font-bold tracking-wide text-white uppercase">
                6. Cancellation &amp; Subscription Termination
              </h2>
              <p>
                You may cancel your subscription at any time directly in your studio settings. Upon
                cancellation, access continues through the end of your billing cycle. You may export
                all records before account closure.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
