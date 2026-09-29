import { createFileRoute } from '@tanstack/react-router'

import { MarketingLayout } from '@/components/layout/marketing-layout'
import { SectionHeading } from '@/components/shared/section-heading'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: 'About — Prismark' },
      { name: 'description', content: 'Built by a small agency, for small agencies.' },
    ],
  }),
})

function AboutPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <h1 className="mb-12 text-[24px] font-[600] tracking-tight">
          Built by a small agency, for small agencies
        </h1>

        <div className="mb-24 max-w-2xl space-y-6 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            We started Prismark because we were exhausted. Exhausted by juggling five different
            tools just to run a single project. Exhausted by manually copying data from our CRM to
            our project management tool, then to our invoicing software.
          </p>
          <p>
            Agencies run on momentum. Every time you switch contexts, search for a lost file in
            Slack, or try to remember if an invoice was paid, you lose that momentum. We built
            Prismark to be the single operating system that keeps everything connected, so you can
            focus on doing great work.
          </p>
        </div>

        <div className="mb-24">
          <h2 className="mb-12 text-[20px] font-[600]">Our values</h2>
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
            <div>
              <SectionHeading>Sentences, not cells</SectionHeading>
              <p className="mt-4 text-[15px] text-muted-foreground">
                Software should feel like reading a story, not debugging a spreadsheet. We
                prioritize clear, human-readable language over dense data grids.
              </p>
            </div>
            <div>
              <SectionHeading>One workspace, one truth</SectionHeading>
              <p className="mt-4 text-[15px] text-muted-foreground">
                No silos. When a proposal is signed, the project should start. When the milestone is
                hit, the invoice should send. Everything is connected.
              </p>
            </div>
            <div>
              <SectionHeading>Clients see their side</SectionHeading>
              <p className="mt-4 text-[15px] text-muted-foreground">
                Your clients deserve a premium experience. They should have a clear, white-labeled
                window into the work, without seeing the messy kitchen.
              </p>
            </div>
            <div>
              <SectionHeading>Every dollar, double-entry</SectionHeading>
              <p className="mt-4 text-[15px] text-muted-foreground">
                Finances aren't an afterthought. We built Prismark on top of a rigorous double-entry
                ledger so you can trust your numbers implicitly.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-32">
          <h2 className="mb-12 text-[20px] font-[600]">The team</h2>
          <div className="flex flex-wrap gap-12">
            {[
              { initials: 'HM', name: 'Hammad Majid', role: 'Founder & Engineering' },
              { initials: 'MK', name: 'Musa Khan', role: 'Design' },
              { initials: 'SA', name: 'Sara Ali', role: 'Growth' },
            ].map((member) => (
              <div key={member.initials} className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted text-[16px] font-[500]">
                  {member.initials}
                </div>
                <div>
                  <div className="text-[15px] font-[500]">{member.name}</div>
                  <div className="text-[13px] text-muted-foreground">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-12 text-center text-[13px] text-muted-foreground">
          Prismark is built by{' '}
          <a
            href="https://kryft.dev?utm_source=prismark.tech&utm_medium=website&utm_campaign=prismark"
            target="_blank"
            rel="noreferrer"
            className="underline transition-colors hover:text-foreground"
          >
            Kryft
          </a>
        </div>
      </div>
    </MarketingLayout>
  )
}
