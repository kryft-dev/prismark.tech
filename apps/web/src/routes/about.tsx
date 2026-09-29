import { createFileRoute } from '@tanstack/react-router'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { Highlighter } from '@/components/graphics/highlighter'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { PaperClip } from '@/components/graphics/paper-clip'
import { WashiTape } from '@/components/graphics/washi-tape'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Annotation } from '@/components/shared/annotation'
import { SectionHeading } from '@/components/shared/section-heading'

const UTM = '?utm_source=prismark.tech&utm_medium=website&utm_campaign=prismark'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: 'Field Journal & Origin — Prismark' },
      {
        name: 'description',
        content:
          'Why we built an agency operating system rooted in craft, clarity, and physical paper integrity.',
      },
    ],
  }),
})

const values = [
  {
    title: 'Sentences over cells',
    desc: 'People read sentences, not table cells. Every activity item describes what happened in plain English: "Acme paid invoice 14, $12,000." Buttons name the outcome: "Record in ledger", not "Submit".',
    accent: 'text-blue-700 bg-blue-50 border-blue-200',
  },
  {
    title: 'The client is a guest, not an employee',
    desc: 'Clients should never be invited into internal ticketing backlogs or internal Slack rooms. Prismark draws an inviolable boundary: clients see milestones, files, invoices, and their own dedicated channel. Nothing else.',
    accent: 'text-amber-800 bg-amber-50 border-amber-200',
  },
  {
    title: 'Real double-entry money',
    desc: 'Software studios live and die by cash flow. Prismark computes project earnings, team profit shares, and sales commissions directly from balanced journal entries with integer minor units.',
    accent: 'text-emerald-800 bg-emerald-50 border-emerald-200',
  },
  {
    title: 'Default to stillness',
    desc: 'Zero distracting neon AI gradients, zero decorative bouncing elements, and zero vanity animations. Software for professionals who do deep work should feel like a sturdy physical notebook.',
    accent: 'text-rose-800 bg-rose-50 border-rose-200',
  },
]

const team = [
  {
    name: 'Hammad',
    role: 'Architecture & Craft',
    note: 'Built first prototype on a midnight drafting table',
  },
  {
    name: 'Musa',
    role: 'Core Systems & Database',
    note: 'Designed the D1 integer double-entry ledger',
  },
  {
    name: 'Sara',
    role: 'Agency Experience & Client Portal',
    note: 'Engineered the Amber Eye privacy perimeter',
  },
]

export function AboutPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="drafting" />

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs font-bold text-blue-700">
            <span>MEMORANDUM // ORIGIN STORY</span>
          </div>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-[#18181B] sm:text-5xl">
            Built for software studios who{' '}
            <Highlighter variant="yellow">hate SaaS clutter.</Highlighter>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-stone-700">
            We spent years running client software projects across six disconnected apps. Prismark
            is the single field journal we wished existed on our own desks.
          </p>
        </div>

        {/* The Field Story */}
        <div className="paper-shadow-lg relative mb-20 max-w-4xl rounded-2xl border-2 border-[#D8CEBE] bg-white p-8 sm:p-12">
          <div className="absolute -top-3 right-10">
            <WashiTape variant="yellow" rotation={2} className="scale-75" />
          </div>

          <h2 className="mb-6 text-2xl font-bold text-[#18181B]">The Problem: The Six-Tool Tax</h2>

          <div className="space-y-4 font-sans text-base leading-relaxed text-stone-700">
            <p>
              In 2024, our studio was paying for Linear for issues, Slack for chat, QuickBooks for
              invoicing, DocuSign for contracts, Google Drive for milestone deliverables, and a
              chaotic Notion wiki to hold it all together.
            </p>
            <p>
              The worst part wasn't the monthly subscription bill—it was the cognitive friction.
              Every time a client paid a deposit, someone had to manually copy the number into a
              spreadsheet, notify the developer in a private Slack room, and hope nobody
              accidentally pasted an internal margin calculation into the client-facing channel.
            </p>
            <p className="font-semibold text-stone-900">
              Prismark unites the work, the conversations, the money, and the client portal in one
              continuous, architectural canvas.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-stone-200 pt-6">
            <InkStamp label="STUDIO PROVEN" variant="emerald" rotation={-2} className="text-xs" />
            <Annotation color="cobalt" className="text-lg">
              zero accidental client leaks →
            </Annotation>
          </div>
        </div>

        {/* 4 Core Values */}
        <div className="mb-20">
          <SectionHeading
            tag="DOCTRINE"
            title="Core Engineering Principles"
            subtitle="The non-negotiable architectural tenets behind every screen in Prismark."
          />

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="paper-shadow-sm flex flex-col justify-between rounded-xl border border-[#D8CEBE] bg-[#FAF7F0] p-6"
              >
                <div>
                  <span
                    className={`mb-3 inline-block rounded border px-2 py-0.5 font-mono text-xs font-bold ${val.accent}`}
                  >
                    0{idx + 1} // RULE
                  </span>
                  <h3 className="mb-2 text-xl font-bold text-[#18181B]">{val.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-700">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Cards */}
        <div className="mb-20">
          <SectionHeading
            tag="PEOPLE"
            title="The Builders"
            subtitle="The team behind the architecture, runtime, and field journal."
          />

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {team.map((m, idx) => (
              <div
                key={idx}
                className="paper-shadow-sm relative rounded-xl border border-[#D8CEBE] bg-white p-6"
              >
                <div className="absolute -top-3 left-6">
                  <PaperClip variant="brass" />
                </div>
                <div className="mb-3 flex items-center gap-3 pt-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-[#FBF9F4]">
                    {m.name[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#18181B]">{m.name}</h3>
                    <p className="font-mono text-xs text-stone-500">{m.role}</p>
                  </div>
                </div>
                <p className="border-t pt-3 font-handwritten text-lg text-stone-600">"{m.note}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kryft Publisher Colophon */}
        <div className="paper-shadow rounded-xl border-2 border-stone-800 bg-[#ECE4D8] p-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="font-mono text-xs font-bold tracking-wider text-stone-600 uppercase">
                PUBLISHER COLOPHON // KRYFT.DEV
              </span>
              <h3 className="mt-1 text-xl font-bold text-stone-900">
                A Kryft Production SaaS Product
              </h3>
              <p className="mt-1 text-sm text-stone-700">
                Prismark is designed and maintained by Kryft. Running on Cloudflare edge global
                workers with D1 SQLite.
              </p>
            </div>
            <a
              href={`https://kryft.dev${UTM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#18181B] px-5 py-2.5 font-mono text-xs font-bold text-white shadow-sm transition-colors hover:bg-stone-800"
            >
              <span>Visit Kryft.dev</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
