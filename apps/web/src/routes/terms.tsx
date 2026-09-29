import { createFileRoute } from '@tanstack/react-router'

import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: 'Terms of Service — Prismark' },
      { name: 'description', content: 'Our terms of service.' },
    ],
  }),
})

function TermsPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <h1 className="mb-8 text-[24px] font-[600] tracking-tight">Terms of Service</h1>

        <p className="mb-8 text-[15px] text-muted-foreground">Last updated: September 29, 2026</p>

        <div className="space-y-8 text-[15px] text-muted-foreground">
          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Agreement</h2>
            <p>
              By using the Prismark service, you agree to be bound by these Terms of Service. If you
              do not agree to these terms, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Account Terms</h2>
            <p>
              You must be human. Accounts registered by "bots" or other automated methods are not
              permitted. You must provide a valid email address and any other information requested
              in order to complete the signup process.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Acceptable Use</h2>
            <p>
              You are responsible for all content posted and activity that occurs under your
              account. You may not use the service for any illegal or unauthorized purpose.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Payment Terms</h2>
            <p>
              A valid payment method is required for paying accounts. The service is billed in
              advance on a monthly or annual basis and is non-refundable.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Cancellation</h2>
            <p>
              You are solely responsible for properly canceling your account. You can cancel your
              account at any time by clicking on the Account Settings link in the global navigation
              screen.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Limitation of Liability</h2>
            <p>
              In no event shall Prismark, nor its directors, employees, partners, agents, suppliers,
              or affiliates, be liable for any indirect, incidental, special, consequential or
              punitive damages.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any
              time. We will provide notice of any material changes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at terms@prismark.tech.
            </p>
          </section>
        </div>
      </div>
    </MarketingLayout>
  )
}
