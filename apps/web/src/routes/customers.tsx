import { createFileRoute } from '@tanstack/react-router'
import { Star } from 'lucide-react'

import { AgencyLogos } from '@/components/brand/agency-logos'
import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { Highlighter } from '@/components/graphics/highlighter'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { WashiTape } from '@/components/graphics/washi-tape'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Annotation } from '@/components/shared/annotation'
import { SectionHeading } from '@/components/shared/section-heading'
import { StatStrip } from '@/components/shared/stat-strip'
import { testimonials } from '@/lib/data/testimonials'

export const Route = createFileRoute('/customers')({
  component: CustomersPage,
  head: () => ({
    meta: [
      { title: 'Partner Studios & Case Journals — Prismark' },
      {
        name: 'description',
        content: 'Discover how boutique software studios run their operations with Prismark.',
      },
    ],
  }),
})

const caseStudies = [
  {
    studio: 'Meridian Studio',
    team: '12 Engineers & Designers',
    summary:
      'Moved off Linear, Slack, and QuickBooks within 4 days. Cut invoice chasing from 2 weeks down to 14 hours.',
    metric: '92% Faster Cash Flow',
    quote:
      'The double-entry ledger alone paid for our annual subscription in the first month by catching untracked project shares.',
    author: 'Elena Vance, Managing Partner',
    tape: 'yellow' as const,
  },
  {
    studio: 'Bloom & Co',
    team: '8 Full-stack Consultants',
    summary:
      'Eliminated client confusion by replacing Notion project wikis with the dedicated client portal.',
    metric: '0 Accidental Leaks',
    quote:
      'The Amber Eye feature gives our team complete confidence when talking internally without fear of client eavesdropping.',
    author: 'Marcus Brody, Creative Director',
    tape: 'mint' as const,
  },
  {
    studio: 'Arclight Digital',
    team: '24 Distributed Specialists',
    summary:
      'Scaled from 3 retainer clients to 22 enterprise accounts using the white-label custom domain portal.',
    metric: '7x Studio Growth',
    quote:
      'Our enterprise clients regularly tell us our client portal looks more polished than Fortune 500 portals.',
    author: 'Siddharth Rao, Founder & CTO',
    tape: 'rose' as const,
  },
]

export function CustomersPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="drafting" />

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded border border-emerald-300 bg-emerald-50 px-3 py-1 font-mono text-xs font-bold text-emerald-800">
            <span>FIELD REGISTRY // VERIFIED WORKSPACES</span>
          </div>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-[#18181B] sm:text-5xl">
            How studios run without <Highlighter variant="yellow">the chaos tax.</Highlighter>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-stone-700">
            Read field journals and direct dispatches from studios who unified tasks, client chat,
            and cash flow.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Annotation color="cobalt" className="text-lg">
              real founder records →
            </Annotation>
          </div>
        </div>

        {/* Agency Logo Wall */}
        <div className="paper-shadow mb-16 rounded-xl border border-[#D8CEBE] bg-[#F7F3EB]/70 p-8">
          <AgencyLogos />
        </div>

        {/* 3 Detailed Studio Case Journals */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {caseStudies.map((cs) => (
            <div
              key={cs.studio}
              className="paper-shadow relative flex flex-col justify-between rounded-xl border border-[#D8CEBE] bg-white p-6 sm:p-8"
            >
              <div className="absolute -top-3 left-8">
                <WashiTape variant={cs.tape} rotation={-1.5} className="scale-75" />
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between border-b pb-3">
                  <div>
                    <h2 className="text-xl font-bold text-stone-900">{cs.studio}</h2>
                    <span className="font-mono text-xs text-stone-500">{cs.team}</span>
                  </div>
                  <InkStamp
                    label="VERIFIED"
                    variant="emerald"
                    rotation={-3}
                    className="text-[10px]"
                  />
                </div>

                <div className="mb-4 inline-block rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-xs font-bold text-emerald-800">
                  {cs.metric}
                </div>

                <p className="mb-4 text-sm leading-relaxed text-stone-700">{cs.summary}</p>

                <blockquote className="my-4 border-l-2 border-stone-800 pl-3 text-sm text-stone-800 italic">
                  &ldquo;{cs.quote}&rdquo;
                </blockquote>
              </div>

              <div className="border-t border-stone-200 pt-4 font-mono text-xs text-stone-500">
                — {cs.author}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials List */}
        <div className="mb-20">
          <SectionHeading
            tag="DISPATCHES"
            title="More Field Notes"
            subtitle="Verified reviews from teams shipping client work on Prismark."
          />

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="paper-shadow-sm flex items-start gap-4 rounded-xl border border-[#D8CEBE] bg-[#FAF7F0] p-6"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-[#FBF9F4]">
                  {t.name[0]}
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-stone-800 sm:text-base">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-2 font-mono text-xs text-stone-500">
                    <span className="font-semibold text-stone-900">{t.name}</span> · {t.role},{' '}
                    {t.agency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stat Ribbon */}
        <div className="paper-shadow rounded-xl border border-[#D8CEBE] bg-white p-8">
          <StatStrip
            stats={[
              {
                label: 'Workspaces Operating',
                value: '180+',
                detail: 'boutique studios worldwide',
                accent: 'cobalt',
              },
              {
                label: 'Total Client Invoices',
                value: '42,000+',
                detail: 'processed via Stripe',
                accent: 'emerald',
              },
              {
                label: 'Uptime SLA on Edge',
                value: '99.99%',
                detail: 'Cloudflare global network',
                accent: 'amber',
              },
            ]}
          />
        </div>
      </div>
    </MarketingLayout>
  )
}
