import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Check, CreditCard } from 'lucide-react'
import { useState } from 'react'

import { StackCostCalculator } from '@/components/interactive/stack-cost-calculator'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/pricing')({
  head: () => ({
    meta: [
      { title: 'Transparent Studio Pricing & Licensing — Prismark' },
      {
        name: 'description',
        content:
          'Simple, transparent pricing for craft studios. Pay only for staff members. Unlimited client portal guests are always complimentary.',
      },
    ],
  }),
  component: PricingPage,
})

const tiers = [
  {
    name: 'Studio Starter',
    badge: 'BOUTIQUE',
    monthlyPrice: 35,
    annualPrice: 29,
    description: 'Perfect for small design and dev consultancies getting organized.',
    features: [
      'Up to 5 active studio members',
      'Unlimited client portal guests (always free)',
      'Interactive sprint & Kanban boards',
      'Digital SOW signing desk',
      'Basic invoicing & Stripe payments',
      '10 GB encrypted document storage',
    ],
    highlight: false,
    ctaText: 'Start with Starter',
  },
  {
    name: 'Studio Pro',
    badge: 'MOST POPULAR',
    monthlyPrice: 49,
    annualPrice: 39,
    description: 'The complete operating system for growing software & brand agencies.',
    features: [
      'Unlimited active studio members',
      'Unlimited client portal guests',
      'GitHub bi-directional PR & commit sync',
      'Double-entry accounting money engine',
      'Automated contractor profit splits',
      'Custom milestone escrow workflows',
      '100 GB encrypted document storage',
      'Priority 4-hour engineering support',
    ],
    highlight: true,
    ctaText: 'Deploy Studio Pro',
  },
  {
    name: 'Studio Enterprise',
    badge: 'WHITE-LABEL & SLA',
    monthlyPrice: 89,
    annualPrice: 79,
    description: 'Dedicated edge infrastructure and white-label branding for scale.',
    features: [
      'Everything in Studio Pro',
      'Custom domain (e.g. portal.yourstudio.com)',
      'Dedicated Cloudflare D1 isolated tenant',
      'Custom contractor payout logic & API',
      '99.99% uptime edge SLA agreement',
      'Unlimited document storage',
      'Dedicated concierge migration lead',
    ],
    highlight: false,
    ctaText: 'Contact for Enterprise',
  },
]

const faqs = [
  {
    q: 'Do client portal guests count as paid seats?',
    a: 'No. Never. Your clients, external legal reviewers, and accounting guests can access the client portal, review deliverables, and sign SOWs completely for free. You only pay for active studio staff who manage projects.',
  },
  {
    q: 'How does the contractor profit split work?',
    a: 'When you create an SOW or task milestone, you can assign a percentage share (e.g. 35%) to a contractor. As soon as the client pays the Stripe invoice, Prismark creates balanced debit and credit entries and calculates the payout automatically.',
  },
  {
    q: 'Can we export our accounting records for our CPA?',
    a: 'Yes. With one click you can export complete general ledger journal transactions in standard CSV or JSON format, formatted for direct import into QuickBooks, Xero, or custom accounting systems.',
  },
  {
    q: 'Do you train AI models on our agency code or documents?',
    a: 'Absolutely not. We have an immutable contractual covenant: zero customer data is ever ingested, processed, or utilized to train public or proprietary AI models. Your code, client SOWs, and margin conversations remain 100% confidential.',
  },
]

export function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true)

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 pb-28 md:px-14">
        {/* Header */}
        <section className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-orange-600 dark:text-orange-400">
            <CreditCard className="h-3.5 w-3.5" />
            <span>TRANSPARENT LICENSING</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            Simple studio pricing.{' '}
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-blue-500 bg-clip-text text-transparent">
              No hidden fees.
            </span>
          </h1>

          <p className="mx-auto max-w-xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Pay only for active studio team members. Clients and guests are always complimentary.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-3 pt-4 font-mono text-xs">
            <button
              type="button"
              onClick={() => setAnnualBilling(false)}
              className={`rounded-lg px-3.5 py-1.5 transition-all ${
                !annualBilling
                  ? 'bg-slate-900 font-bold text-white shadow dark:bg-white dark:text-slate-900'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Billed Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnualBilling(true)}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition-all ${
                annualBilling
                  ? 'bg-orange-500 font-bold text-white shadow'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Billed Annually</span>
              <span className="rounded bg-orange-400/30 px-1 text-[10px] text-white">Save 20%</span>
            </button>
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="mb-24 grid items-stretch gap-8 lg:grid-cols-3">
          {tiers.map((tier) => {
            const price = annualBilling ? tier.annualPrice : tier.monthlyPrice
            return (
              <div
                key={tier.name}
                className={`flex flex-col justify-between rounded-2xl border p-8 transition-all sm:p-10 ${
                  tier.highlight
                    ? 'border-orange-500/80 bg-white shadow-2xl ring-2 ring-orange-500/40 dark:bg-[#0D111A]'
                    : 'border-slate-200 bg-white shadow-lg dark:border-white/[0.08] dark:bg-[#0D111A]'
                }`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-wider text-orange-600 uppercase dark:text-orange-400">
                      {tier.badge}
                    </span>
                    {tier.highlight && (
                      <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-orange-600 dark:text-orange-400">
                        RECOMMENDED
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {tier.name}
                  </h3>

                  <p className="mb-6 font-sans text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {tier.description}
                  </p>

                  <div className="mb-8 flex items-baseline gap-1 font-mono">
                    <span className="text-4xl font-extrabold text-slate-900 sm:text-5xl dark:text-white">
                      ${price}
                    </span>
                    <span className="font-sans text-xs text-slate-500">
                      /member/month {annualBilling ? '(billed annually)' : ''}
                    </span>
                  </div>

                  <div className="mb-8 space-y-3 border-t border-slate-100 pt-4 dark:border-white/[0.06]">
                    {tier.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/access"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 font-mono text-xs font-bold shadow-md transition-transform hover:scale-[1.02] ${
                    tier.highlight
                      ? 'bg-orange-600 text-white hover:bg-orange-500'
                      : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )
          })}
        </section>

        {/* Stack Cost Calculator */}
        <section className="mb-24" id="calculator">
          <StackCostCalculator />
        </section>

        {/* Honest FAQs */}
        <section className="mx-auto mb-24 max-w-3xl">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs font-bold tracking-wider text-orange-500 uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
              Everything you need to know.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/[0.08] dark:bg-[#0D111A]"
              >
                <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{faq.q}</h3>
                <p className="font-sans text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Ribbon */}
        <section className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-[#0B0F19] to-slate-950 p-8 shadow-2xl sm:p-14 md:flex-row">
          <div className="max-w-xl space-y-2">
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to eliminate your 6-tool subscription tax?
            </h3>
            <p className="text-sm text-slate-300">
              Join dozens of boutique studios running on Prismark.
            </p>
          </div>

          <Link
            to="/access"
            className="shrink-0 rounded-xl bg-orange-600 px-6 py-3.5 font-mono text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-500"
          >
            Get Studio Key →
          </Link>
        </section>
      </div>
    </MarketingLayout>
  )
}
