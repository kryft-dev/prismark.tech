import { Accordion } from '@base-ui/react/accordion'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, ChevronDown } from 'lucide-react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { HandDrawnCircle } from '@/components/graphics/hand-drawn-circle'
import { Highlighter } from '@/components/graphics/highlighter'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { PaperClip } from '@/components/graphics/paper-clip'
import { WashiTape } from '@/components/graphics/washi-tape'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Annotation } from '@/components/shared/annotation'
import { SectionHeading } from '@/components/shared/section-heading'
import { pricingTiers } from '@/lib/data/pricing'

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: 'Pricing & Capacity — Prismark' },
      {
        name: 'description',
        content: 'Simple, transparent pricing for software agencies. No hidden seat gouging.',
      },
    ],
  }),
})

const faqs = [
  {
    q: 'Do client portal members cost an extra seat?',
    a: 'No. Clients never consume staff seats. You can invite unlimited client members to view milestones, chat in the client channel, pay invoices, and sign documents for free.',
  },
  {
    q: 'How does the double-entry accounting ledger integrate?',
    a: 'Prismark has its own native double-entry ledger built on integer minor units. You can export complete CSV/JSON journal records or connect Stripe to automatically post balanced debit/credit entries for every client payment.',
  },
  {
    q: 'Can we self-host or use our own custom domain?',
    a: 'Yes. On the Agency tier, you can configure your custom domain (e.g. clients.yourstudio.com) with white-label branding and your studio logo on the client portal.',
  },
  {
    q: 'What happens when a project completes?',
    a: 'You can archive the project with one click. Archived projects remain completely searchable with all tasks, documents, chat trails, and ledger history preserved forever.',
  },
  {
    q: 'What is the early-access guarantee?',
    a: 'Agencies joining during early registry receive a 20% lifetime discount applied to every active seat, locked in forever.',
  },
]

export function PricingPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="drafting" />

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-xs font-bold text-emerald-800">
            <span>WORKSPACE ESTIMATES // ZERO SEAT GOUGING</span>
          </div>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-[#18181B] sm:text-5xl">
            Fair pricing for studios that <Highlighter variant="yellow">actually ship.</Highlighter>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-stone-700">
            Every plan includes unlimited client guests. Only teammates with project creation and
            staff permissions count toward seats.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Annotation color="cobalt" className="text-lg">
              clients are always free guests →
            </Annotation>
          </div>
        </div>

        {/* 3 Physical Proposal Cards */}
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => {
            const isPro = tier.recommended

            return (
              <div
                key={tier.name}
                className={`relative flex flex-col justify-between rounded-xl border p-6 transition-all sm:p-8 ${
                  isPro
                    ? 'paper-shadow-lg z-20 scale-[1.02] border-2 border-stone-800 bg-white'
                    : 'paper-shadow border-[#D8CEBE] bg-[#FAF7F0]'
                }`}
              >
                {/* Washi tape & Clip for Pro */}
                {isPro && (
                  <>
                    <div className="absolute -top-3 left-10">
                      <WashiTape variant="rose" rotation={-2} className="scale-75" />
                    </div>
                    <div className="absolute -top-4 right-6">
                      <PaperClip variant="brass" />
                    </div>
                  </>
                )}

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-wider text-stone-500 uppercase">
                      ESTIMATE // {tier.name}
                    </span>
                    {isPro && (
                      <InkStamp
                        label="MOST POPULAR"
                        variant="vermilion"
                        rotation={-3}
                        className="text-[10px]"
                      />
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-[#18181B]">{tier.name}</h2>
                  <p className="mt-2 min-h-[40px] text-sm text-stone-600">{tier.description}</p>

                  <div className="mt-6 flex items-baseline gap-1 border-b border-stone-200 pb-6">
                    <span className="text-4xl font-extrabold tracking-tight text-[#18181B] sm:text-5xl">
                      {isPro ? (
                        <HandDrawnCircle color="#E11D48" strokeWidth={2}>
                          {tier.price}
                        </HandDrawnCircle>
                      ) : (
                        tier.price
                      )}
                    </span>
                    <span className="font-mono text-xs text-stone-500">{tier.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3.5">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-stone-800">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-emerald-100 text-emerald-700">
                          <Check className="size-2.5" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-stone-200 pt-6">
                  <Link
                    to="/"
                    className={`block w-full rounded-md py-3 text-center font-mono text-sm font-bold shadow-sm transition-all ${
                      isPro
                        ? 'bg-[#18181B] text-[#FBF9F4] hover:bg-stone-800'
                        : 'border border-stone-300 bg-white text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    Select {tier.name} Plan →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Perforated Waitlist Coupon */}
        <div className="paper-shadow-sm mt-16 flex flex-col items-center justify-between gap-6 rounded-xl border-2 border-dashed border-rose-300 bg-rose-50/50 p-6 sm:flex-row sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-rose-300 bg-rose-100 font-mono text-lg font-bold text-rose-700">
              %
            </div>
            <div>
              <span className="font-mono text-xs font-bold tracking-wider text-rose-700 uppercase">
                EARLY AGENCY COUPON // TEAR-OFF VOUCHER
              </span>
              <h3 className="text-lg font-bold text-stone-900">
                20% Lifetime Discount for Waitlist Registrants
              </h3>
              <p className="mt-0.5 font-mono text-xs text-stone-600">
                CODE: PRISMARK-EARLY-STUDIO · Automatically applied upon workspace provisioning
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="shrink-0 rounded-md bg-rose-600 px-5 py-2.5 font-mono text-xs font-bold text-white shadow-sm transition-colors hover:bg-rose-700"
          >
            Claim Early Code
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl">
          <SectionHeading
            tag="QUESTIONS &amp; POLICIES"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about seats, client portal guests, and ledger exports."
          />

          <Accordion.Root className="space-y-4">
            {faqs.map((faq, idx) => (
              <Accordion.Item
                key={idx}
                value={`faq-${idx}`}
                className="paper-shadow-sm overflow-hidden rounded-lg border border-[#D8CEBE] bg-white"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between p-5 text-left font-semibold text-stone-900 transition-colors hover:text-blue-700">
                    <span className="text-base sm:text-lg">{faq.q}</span>
                    <ChevronDown className="h-4 w-4 text-stone-400 transition-transform data-[panel-open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel className="border-t border-stone-100 px-5 pt-1 pb-5 text-sm leading-relaxed text-stone-600">
                  {faq.a}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </MarketingLayout>
  )
}
