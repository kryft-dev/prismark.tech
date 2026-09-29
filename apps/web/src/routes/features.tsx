import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { HandDrawnArrow } from '@/components/graphics/hand-drawn-arrow'
import { Highlighter } from '@/components/graphics/highlighter'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { LedgerLines } from '@/components/graphics/ledger-lines'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Annotation } from '@/components/shared/annotation'
import { features } from '@/lib/data/features'

export const Route = createFileRoute('/features')({
  component: FeaturesPage,
  head: () => ({
    meta: [
      { title: 'Architectural Blueprint Features — Prismark' },
      {
        name: 'description',
        content:
          'Explore the 6 core architectural modules of the Prismark agency operating system.',
      },
    ],
  }),
})

function ArchitecturalIllustration({ id }: { id: string }) {
  switch (id) {
    case 'projects-tasks':
      return (
        <div className="relative flex h-full w-full flex-col justify-between rounded-lg border border-[#D4CBBD] bg-[#F5EFE6] p-5 font-mono text-[11px] select-none">
          {/* Blueprint header */}
          <div className="flex items-center justify-between border-b border-[#D4CBBD] pb-2 text-[10px] font-bold text-stone-500">
            <span className="text-blue-700">SHEET: PRJ-01 // WORKFLOW DRAFTING</span>
            <span>SCALE: 1:1 VECTOR</span>
            <span className="text-emerald-700">STATUS: SYNCED</span>
          </div>

          {/* Blueprint vector canvas */}
          <div className="paper-shadow-sm relative my-4 flex-1 overflow-hidden rounded-md border border-[#D4CBBD] bg-white p-4">
            <div className="grid h-full grid-cols-3 gap-3">
              <div className="rounded border border-stone-200 bg-[#FAF8F5] p-2.5">
                <div className="mb-2 flex justify-between border-b pb-1 text-[10px] font-bold text-stone-700">
                  <span>TO DO</span>
                  <span>[4]</span>
                </div>
                <div className="rounded border border-stone-200 bg-white p-2 text-[11px] font-semibold text-stone-900 shadow-xs">
                  Vector icons
                </div>
              </div>

              <div className="rounded border border-blue-200 bg-blue-50/40 p-2.5">
                <div className="mb-2 flex justify-between border-b border-blue-200 pb-1 text-[10px] font-bold text-blue-800">
                  <span>DOING</span>
                  <span>[2]</span>
                </div>
                <div className="rounded border border-blue-200 bg-white p-2 text-[11px] font-semibold text-blue-900 shadow-xs">
                  Design tokens
                </div>
              </div>

              <div className="rounded border border-emerald-200 bg-emerald-50/40 p-2.5">
                <div className="mb-2 flex justify-between border-b border-emerald-200 pb-1 text-[10px] font-bold text-emerald-800">
                  <span>DONE</span>
                  <span>[8]</span>
                </div>
                <div className="rounded border border-emerald-200 bg-white p-2 text-[11px] font-semibold text-emerald-900 line-through opacity-70">
                  Client kickoff
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#D4CBBD] pt-2 text-[10px] text-stone-500">
            <span>DIM: 1440x900</span>
            <span className="font-bold text-blue-700">CLOSE ON MERGE: ACTIVE</span>
          </div>
        </div>
      )

    case 'crm-pipeline':
      return (
        <div className="relative flex h-full w-full flex-col justify-between rounded-lg border border-[#D4CBBD] bg-[#F5EFE6] p-5 font-mono text-[11px] select-none">
          <div className="flex items-center justify-between border-b border-[#D4CBBD] pb-2 text-[10px] font-bold text-stone-500">
            <span className="text-purple-700">SHEET: CRM-02 // DEAL VELOCITY</span>
            <span>NODES: 4 STAGES</span>
            <span className="text-emerald-700">$84,500 TOTAL</span>
          </div>

          <div className="paper-shadow-sm relative my-4 flex flex-1 flex-col justify-center rounded-md border border-[#D4CBBD] bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              {[
                {
                  stage: 'LEAD',
                  val: '$18k',
                  color: 'text-stone-700 bg-stone-100 border-stone-300',
                },
                {
                  stage: 'CONTACT',
                  val: '$24k',
                  color: 'text-blue-700 bg-blue-50 border-blue-300',
                },
                {
                  stage: 'PROPOSAL',
                  val: '$12k',
                  color: 'text-amber-700 bg-amber-50 border-amber-300',
                },
                {
                  stage: 'WON',
                  val: '$30k',
                  color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
                },
              ].map((node, i) => (
                <div key={node.stage} className="flex flex-1 items-center gap-1 sm:gap-2">
                  <div className={`flex-1 rounded border p-2 text-center ${node.color}`}>
                    <span className="block text-[10px] font-bold">{node.stage}</span>
                    <span className="text-xs font-extrabold">{node.val}</span>
                  </div>
                  {i < 3 && <span className="font-bold text-stone-400">→</span>}
                </div>
              ))}
            </div>
            <div className="mt-4 text-center font-handwritten text-lg text-emerald-700">
              "Moving deal to Won automatically creates the workspace project"
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#D4CBBD] pt-2 text-[10px] text-stone-500">
            <span>TARGET CONVERSION: 42%</span>
            <span className="font-bold text-purple-700">AUTO-PROVISION: ON</span>
          </div>
        </div>
      )

    case 'chat-channels':
      return (
        <div className="relative flex h-full w-full flex-col justify-between rounded-lg border border-[#D4CBBD] bg-[#F5EFE6] p-5 font-mono text-[11px] select-none">
          <div className="flex items-center justify-between border-b border-[#D4CBBD] pb-2 text-[10px] font-bold text-stone-500">
            <span className="text-amber-800">SHEET: COMMS-03 // AMBER EYE PERIMETER</span>
            <span className="text-amber-600">DUAL-CHANNEL MAPPING</span>
          </div>

          <div className="paper-shadow-sm relative my-4 flex flex-1 flex-col justify-around space-y-3 rounded-md border border-[#D4CBBD] bg-white p-4">
            <div className="rounded border border-stone-200 bg-[#FAF8F5] p-3 text-stone-800">
              <span className="mb-1 block text-[10px] font-bold text-stone-500 uppercase">
                INTERNAL AIR-GAPPED PERIMETER
              </span>
              <p className="font-sans text-xs">
                "Do we show them the revised pricing model now or wait until demo?"
              </p>
            </div>

            <div className="rounded border-2 border-amber-300 bg-amber-50/60 p-3 text-amber-950">
              <span className="mb-1 flex items-center gap-1 text-[10px] font-bold text-amber-800 uppercase">
                <span className="h-2 w-2 animate-ping rounded-full bg-amber-500" />
                AMBER EYE CLIENT CHANNEL (CLIENT READS THIS)
              </span>
              <p className="font-sans text-xs">
                "Loving the progress! When can we review the milestone deliverables?"
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#D4CBBD] pt-2 text-[10px] text-stone-500">
            <span>CHANNEL LEAK RISK: 0.00%</span>
            <span className="font-bold text-amber-700">VISIBILITY CUE: ENFORCED</span>
          </div>
        </div>
      )

    case 'documents-signing':
      return (
        <div className="relative flex h-full w-full flex-col justify-between rounded-lg border border-[#D4CBBD] bg-[#F5EFE6] p-5 font-mono text-[11px] select-none">
          <div className="flex items-center justify-between border-b border-[#D4CBBD] pb-2 text-[10px] font-bold text-stone-500">
            <span className="text-rose-700">SHEET: DOC-04 // NOTARY &amp; RATIFICATION</span>
            <span className="text-emerald-700">DIGITAL HASH VERIFIED</span>
          </div>

          <div className="paper-shadow-sm relative my-4 flex flex-1 flex-col justify-between rounded-md border border-[#D4CBBD] bg-white p-4">
            <div className="border-b pb-2">
              <span className="text-[10px] font-bold text-stone-500 uppercase">
                DOCUMENT: MSA-1049
              </span>
              <p className="mt-0.5 font-sans text-xs font-semibold text-stone-800">
                Acme Inc Scope of Work Agreement
              </p>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <span className="block text-[10px] text-stone-400">CLIENT SIGNATURE</span>
                <span className="font-handwritten text-2xl text-blue-700">Rhea Kapoor</span>
              </div>
              <InkStamp label="RATIFIED" variant="emerald" rotation={-4} className="text-[10px]" />
            </div>

            <div className="border-t pt-2 font-mono text-[10px] text-stone-400">
              SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f...
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#D4CBBD] pt-2 text-[10px] text-stone-500">
            <span>SIGNERS: 2/2</span>
            <span className="font-bold text-rose-700">POST TO LEDGER: AUTOMATIC</span>
          </div>
        </div>
      )

    case 'money-invoicing':
      return (
        <div className="relative flex h-full w-full flex-col justify-between rounded-lg border border-[#D4CBBD] bg-[#F5EFE6] p-5 font-mono text-[11px] select-none">
          <div className="flex items-center justify-between border-b border-[#D4CBBD] pb-2 text-[10px] font-bold text-stone-500">
            <span className="text-emerald-800">SHEET: FIN-05 // DOUBLE-ENTRY JOURNAL</span>
            <span className="font-bold text-emerald-700">DR = CR</span>
          </div>

          <div className="paper-shadow-sm relative my-4 flex-1 overflow-hidden rounded-md border border-[#D4CBBD] bg-white p-4">
            <LedgerLines lineSpacing={28} marginRule={true} />
            <div className="relative z-10 space-y-1.5 pl-6 font-mono text-[11px]">
              <div className="flex justify-between font-bold text-emerald-800">
                <span>DR · Cash Bank (Mercury)</span>
                <span>$12,000.00</span>
              </div>
              <div className="flex justify-between pl-4 text-blue-700">
                <span>CR · Dev Share (25%)</span>
                <span>$3,000.00</span>
              </div>
              <div className="flex justify-between pl-4 text-amber-800">
                <span>CR · Commission (5%)</span>
                <span>$600.00</span>
              </div>
              <div className="flex justify-between border-t pt-1 pl-4 font-bold text-stone-800">
                <span>CR · Agency Retained</span>
                <span>$8,400.00</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#D4CBBD] pt-2 text-[10px] text-stone-500">
            <span>INTEGER MINOR UNITS: STRICT</span>
            <span className="font-bold text-emerald-700">APPEND-ONLY AUDIT</span>
          </div>
        </div>
      )

    case 'client-portal':
      return (
        <div className="relative flex h-full w-full flex-col justify-between rounded-lg border border-[#D4CBBD] bg-[#F5EFE6] p-5 font-mono text-[11px] select-none">
          <div className="flex items-center justify-between border-b border-[#D4CBBD] pb-2 text-[10px] font-bold text-stone-500">
            <span className="text-blue-700">SHEET: PORTAL-06 // CLIENT AIR-GAP</span>
            <span className="text-stone-500">WHITELABEL DOMAIN</span>
          </div>

          <div className="paper-shadow-sm relative my-4 flex-1 space-y-2.5 rounded-md border border-[#D4CBBD] bg-white p-4">
            <div className="flex items-center justify-between border-b pb-1 text-xs">
              <span className="font-bold text-stone-800">clients.youragency.com</span>
              <span className="py-0.2 rounded border border-emerald-200 bg-emerald-50 px-1.5 font-mono text-[10px] text-emerald-700">
                ACTIVE
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-sans text-[11px]">
              <div className="rounded border border-stone-200 bg-stone-50 p-2">
                <span className="block font-bold text-stone-900">Milestones</span>
                <span className="text-stone-500">Clients see phases, not internal tickets</span>
              </div>
              <div className="rounded border border-stone-200 bg-stone-50 p-2">
                <span className="block font-bold text-stone-900">Invoices</span>
                <span className="text-stone-500">1-click Stripe payments without signin</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#D4CBBD] pt-2 text-[10px] text-stone-500">
            <span>ROLE: CLIENT ONLY</span>
            <span className="font-bold text-blue-700">INTERNAL DATA: ZERO ACCESS</span>
          </div>
        </div>
      )

    default:
      return null
  }
}

export function FeaturesPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="drafting" />

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded border border-rose-200 bg-rose-50 px-3 py-1 font-mono text-xs font-bold text-rose-700">
            <span>TECHNICAL SPECIFICATIONS // 2026 ARCHITECTURE</span>
          </div>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-[#18181B] sm:text-5xl">
            Six architectural modules.{' '}
            <Highlighter variant="yellow">Zero generic SaaS clutter.</Highlighter>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-stone-700">
            Every feature in Prismark was crafted specifically for software studios and client
            service teams. Inspect the complete blueprint schematics below.
          </p>
        </div>

        {/* Feature Modules Breakdown */}
        <div className="space-y-16">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3 }}
              className="paper-shadow-lg relative rounded-2xl border-2 border-[#D8CEBE] bg-[#FAF7F0] p-6 sm:p-10"
            >
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                {/* Left Description */}
                <div className="flex flex-col items-start lg:col-span-6">
                  <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold text-stone-500">
                    <span>MODULE 0{idx + 1}</span>
                    <span>//</span>
                    <span className="text-blue-700 uppercase">{feature.title}</span>
                  </div>

                  <h2 className="text-2xl font-extrabold tracking-tight text-[#18181B] sm:text-3xl">
                    {feature.headline}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-stone-700">
                    {feature.description}
                  </p>

                  <ul className="mt-6 w-full space-y-3">
                    {feature.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-sm text-stone-800">
                        <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-emerald-100 text-emerald-700">
                          <Check className="size-2.5" />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-3">
                    <HandDrawnArrow direction="right" className="h-5 w-5 text-amber-600" />
                    <Annotation color="amber" className="text-base">
                      architectural integrity guaranteed
                    </Annotation>
                  </div>
                </div>

                {/* Right Illustration */}
                <div className="min-h-[340px] lg:col-span-6">
                  <ArchitecturalIllustration id={feature.id} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="paper-shadow mt-20 rounded-xl border border-[#D8CEBE] bg-white p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-[#18181B] sm:text-3xl">
            Ready to inspect Prismark inside your own shop?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-stone-600 sm:text-base">
            Request an early agency workspace key. Setup takes less than 2 minutes.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md bg-[#18181B] px-6 py-3 font-mono text-sm font-bold text-[#FBF9F4] shadow-md transition-all hover:bg-stone-800"
            >
              <span>Join Early Registry</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
