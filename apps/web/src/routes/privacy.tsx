import { createFileRoute } from '@tanstack/react-router'

import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: 'Privacy Policy — Prismark' },
      { name: 'description', content: 'Our privacy policy.' },
    ],
  }),
})

function PrivacyPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <h1 className="mb-8 text-[24px] font-[600] tracking-tight">Privacy Policy</h1>

        <p className="mb-8 text-[15px] text-muted-foreground">Last updated: September 29, 2026</p>

        <div className="space-y-8 text-[15px] text-muted-foreground">
          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, use our
              services, or communicate with us. This includes your name, email address, billing
              information, and any data you enter into the Prismark platform.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">How We Use It</h2>
            <p>
              We use the information we collect to operate, maintain, and improve our services,
              process transactions, send technical notices and support messages, and respond to your
              comments and questions.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft,
              misuse and unauthorized access, disclosure, alteration and destruction.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Third Parties</h2>
            <p>
              We do not share your personal information with third parties except as described in
              this policy, such as with vendors, consultants, and other service providers who need
              access to such information to carry out work on our behalf.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Your Rights</h2>
            <p>
              You may update, correct, or delete your account information at any time by logging
              into your account settings. If you wish to delete your account entirely, please
              contact us.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[16px] font-[600] text-foreground">Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at
              privacy@prismark.tech.
            </p>
          </section>
        </div>
      </div>
    </MarketingLayout>
  )
}
