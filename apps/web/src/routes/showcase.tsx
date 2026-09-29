import { createFileRoute, Link } from '@tanstack/react-router'
import { Star } from 'lucide-react'

import { AgencyLogos } from '@/components/brand/agency-logos'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/showcase')({
  head: () => ({
    meta: [
      { title: 'Studio Stories & Case Studies — Prismark' },
      {
        name: 'description',
        content:
          'Read how boutique engineering studios, brand consultancies, and product teams run their businesses on Prismark.',
      },
    ],
  }),
  component: ShowcasePage,
})

const caseStudies = [
  {
    name: 'Meridian Labs',
    location: 'San Francisco & Berlin',
    teamSize: '14 Engineers & Designers',
    metric: '18 hrs / month',
    metricLabel: 'Saved on Sunday accounting reconciliation',
    headline: 'Eliminating the spreadsheet reconciliation tax on contractor profit splits.',
    quote:
      'Before Prismark, our Sunday nights were consumed by cross-referencing Stripe settlements, GitHub merges, and contractor hours. Now, when a client pays a milestone, our lead developers receive their 35% cut automatically.',
    author: 'Marcus Vance · Co-Founder & Principal Architect',
    tags: ['Engineering', 'Double-Entry Money', 'GitHub Webhooks'],
  },
  {
    name: 'Arclight Digital',
    location: 'New York',
    teamSize: '8 Quantitative Developers',
    metric: 'Zero Leaks',
    metricLabel: 'Mathematical privacy between client & code',
    headline: 'A true cryptographic air-gap for enterprise financial clients.',
    quote:
      'We work with fintech and capital firms where confidentiality is everything. Having a dedicated client chamber where clients can sign SOWs without ever seeing internal developer banter or rough PR diffs is a game changer.',
    author: 'Elena Rostova · Security & Systems Lead',
    tags: ['Fintech', 'Client Air-Gap', 'SOW Signing'],
  },
  {
    name: 'Bloom & Co',
    location: 'London',
    teamSize: '12 Brand & Digital Strategists',
    metric: '$11,400 / yr',
    metricLabel: 'Net software subscription savings',
    headline: 'Replacing the 6-tool circus with one cohesive brand operating system.',
    quote:
      'We canceled Linear, Slack Pro, Harvest, DocuSign, and our third-party client portal in a single week. Our team moved faster because all project discussions and invoices live in the exact same sidebar.',
    author: 'Julian Thorne · Creative Director & Partner',
    tags: ['Brand Studio', 'Stack Consolidation', 'Retainers'],
  },
]

export function ShowcasePage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 pb-28 md:px-14">
        {/* Header */}
        <section className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-orange-600 dark:text-orange-400">
            <Star className="h-3.5 w-3.5" />
            <span>FIELD REPORTS // STUDIO STORIES</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            How leading craft studios run on{' '}
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-blue-500 bg-clip-text text-transparent">
              Prismark.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Real production case dispatches from boutique consultancies that said goodbye to
            disjointed subscriptions and spreadsheet reconciliation.
          </p>
        </section>

        {/* Agency Logo Ribbon */}
        <section className="mb-20 border-y border-slate-200 py-8 dark:border-white/[0.08]">
          <AgencyLogos />
        </section>

        {/* Detailed Case Studies */}
        <section className="mb-24 space-y-12">
          {caseStudies.map((study) => (
            <div
              key={study.name}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-14 dark:border-white/[0.08] dark:bg-[#0D111A]"
            >
              <div className="grid items-center gap-10 lg:grid-cols-12">
                <div className="space-y-6 lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {study.name}
                    </span>
                    <span className="font-mono text-xs text-slate-400">· {study.location}</span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500 dark:bg-slate-800">
                      {study.teamSize}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                    {study.headline}
                  </h2>

                  <blockquote className="border-l-2 border-orange-500 pl-4 font-sans text-sm leading-relaxed text-slate-700 italic sm:text-base dark:text-slate-300">
                    &quot;{study.quote}&quot;
                  </blockquote>

                  <div className="font-mono text-xs font-semibold text-slate-500">
                    {study.author}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-8 text-center lg:col-span-4 dark:border-slate-800 dark:bg-[#06080E]">
                  <span className="block font-mono text-xs font-bold tracking-wider text-orange-600 uppercase dark:text-orange-400">
                    Verified Outcome
                  </span>
                  <div className="font-mono text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
                    {study.metric}
                  </div>
                  <p className="font-sans text-xs text-slate-500">{study.metricLabel}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA Ribbon */}
        <section className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-[#0B0F19] to-slate-950 p-8 shadow-2xl sm:p-14 md:flex-row">
          <div className="max-w-xl space-y-2">
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              Write your studio&apos;s success story with Prismark.
            </h3>
            <p className="text-sm text-slate-300">
              Schedule a private walkthrough with our founding engineering team.
            </p>
          </div>

          <Link
            to="/access"
            className="shrink-0 rounded-xl bg-orange-600 px-6 py-3.5 font-mono text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-500"
          >
            Request Studio Key →
          </Link>
        </section>
      </div>
    </MarketingLayout>
  )
}
