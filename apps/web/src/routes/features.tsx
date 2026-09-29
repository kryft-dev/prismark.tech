import { createFileRoute } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import { motion } from 'motion/react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { DeckleEdge } from '@/components/graphics/deckle-edge'
import { HandDrawnArrow } from '@/components/graphics/hand-drawn-arrow'
import { HandDrawnCircle } from '@/components/graphics/hand-drawn-circle'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Annotation } from '@/components/shared/annotation'
import { features } from '@/lib/data/features'

export const Route = createFileRoute('/features')({
  component: FeaturesPage,
  head: () => ({
    meta: [
      { title: 'Features — Prismark' },
      { name: 'description', content: "Everything your agency needs. Nothing it doesn't." },
    ],
  }),
})

function ArchitecturalIllustration({ id }: { id: string }) {
  switch (id) {
    case 'projects-tasks':
      return (
        <div className="relative flex h-full w-full flex-col justify-between p-4 font-mono text-[11px] text-muted-foreground select-none">
          {/* Technical blueprint header */}
          <div className="flex items-center justify-between border-b border-[#262626] pb-2 text-[10px] text-[#7D7D7D]">
            <span>SHEET: PRJ-01</span>
            <span>SCALE: 1:1 VECTOR</span>
            <span>STATUS: ACTIVE</span>
          </div>

          {/* Blueprint vector canvas */}
          <div className="relative my-3 flex flex-1 flex-col justify-between overflow-hidden rounded border border-[#262626]/80 bg-[#070707] p-3">
            {/* Background vector grid */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="feat-grid-1" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#52A8FF" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#feat-grid-1)" />
            </svg>

            {/* Simulated board layout */}
            <div className="relative z-10 grid h-full grid-cols-3 gap-2">
              <div className="rounded border border-[#262626] bg-[#0E0E0E] p-2">
                <div className="mb-2 flex justify-between border-b border-[#262626] pb-1 text-[10px] text-[#A1A1A1]">
                  <span>TO DO</span>
                  <span>[4]</span>
                </div>
                <div className="mb-1.5 rounded border border-[#222] bg-[#161616] p-1.5">
                  <div className="font-sans text-[10px] font-medium text-foreground">
                    Type system
                  </div>
                  <div className="mt-0.5 text-[9px] text-[#7D7D7D]">#52 · Acme</div>
                </div>
                <div className="rounded border border-[#222] bg-[#161616] p-1.5">
                  <div className="font-sans text-[10px] font-medium text-foreground">
                    DNS routing
                  </div>
                  <div className="mt-0.5 text-[9px] text-[#7D7D7D]">#61 · Launch</div>
                </div>
              </div>

              <div className="relative rounded border border-[#52A8FF]/40 bg-[#0E0E0E] p-2">
                <div className="mb-2 flex justify-between border-b border-[#52A8FF]/30 pb-1 text-[10px] text-[#52A8FF]">
                  <span>DOING</span>
                  <span>[2]</span>
                </div>
                <div className="rounded border border-[#52A8FF]/30 bg-[#161616] p-1.5">
                  <div className="font-sans text-[10px] font-medium text-foreground">
                    Homepage hero
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-[9px] text-[#52A8FF]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#52A8FF]"></span>
                    git: pr#58
                  </div>
                </div>
              </div>

              <div className="rounded border border-[#262626] bg-[#0E0E0E] p-2 opacity-60">
                <div className="mb-2 flex justify-between border-b border-[#262626] pb-1 text-[10px] text-[#3DD68C]">
                  <span>DONE</span>
                  <span>[6]</span>
                </div>
                <div className="rounded border border-[#222] bg-[#161616] p-1.5 text-[#7D7D7D] line-through">
                  <div className="text-[10px]">Moodboard</div>
                  <div className="text-[9px]">#46</div>
                </div>
              </div>
            </div>

            {/* Handwritten note */}
            <div className="absolute right-3 bottom-2 z-20">
              <Annotation className="text-[15px] text-[#52A8FF]">synced with git</Annotation>
            </div>
          </div>

          <div className="flex justify-between text-[9px] text-[#666]">
            <span>DIM: 1440x900</span>
            <span>CROSS-REF: CONTEXT.md#TASK</span>
          </div>
        </div>
      )

    case 'crm-pipeline':
      return (
        <div className="relative flex h-full w-full flex-col justify-between p-4 font-mono text-[11px] text-muted-foreground select-none">
          <div className="flex items-center justify-between border-b border-[#262626] pb-2 text-[10px] text-[#7D7D7D]">
            <span>SHEET: CRM-02</span>
            <span>PIPELINE VELOCITY</span>
            <span>TOTAL: $96,500</span>
          </div>

          <div className="relative my-3 flex flex-1 flex-col justify-center overflow-hidden rounded border border-[#262626]/80 bg-[#070707] p-3">
            {/* Flow diagram vectors */}
            <div className="relative z-10 flex w-full items-center justify-between gap-1">
              <div className="flex-1 rounded border border-[#262626] bg-[#0E0E0E] p-2 text-center">
                <div className="text-[9px] text-[#7D7D7D]">LEAD</div>
                <div className="mt-0.5 text-[12px] font-semibold text-foreground">$22k</div>
                <div className="mt-1 text-[8px] text-[#666]">3 deals</div>
              </div>

              <div className="text-[#333]">→</div>

              <div className="flex-1 rounded border border-[#262626] bg-[#0E0E0E] p-2 text-center">
                <div className="text-[9px] text-[#7D7D7D]">CONTACT</div>
                <div className="mt-0.5 text-[12px] font-semibold text-foreground">$18k</div>
                <div className="mt-1 text-[8px] text-[#666]">2 deals</div>
              </div>

              <div className="text-[#333]">→</div>

              <div className="flex-1 rounded border border-[#262626] bg-[#0E0E0E] p-2 text-center">
                <div className="text-[9px] text-[#7D7D7D]">PROPOSAL</div>
                <div className="mt-0.5 text-[12px] font-semibold text-foreground">$41k</div>
                <div className="mt-1 text-[8px] text-[#666]">3 deals</div>
              </div>

              <div className="text-[#333]">→</div>

              <div className="relative flex-1 rounded border border-[#3DD68C]/50 bg-[#0E0E0E] p-2 text-center">
                <div className="text-[9px] text-[#3DD68C]">WON</div>
                <div className="mt-0.5 text-[12px] font-semibold text-[#3DD68C]">$15.5k</div>
                <div className="mt-1 text-[8px] text-[#3DD68C]/80">2 closed</div>
                <div className="pointer-events-none absolute -inset-1">
                  <HandDrawnCircle color="#3DD68C" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#1C1C1C] pt-3">
              <div className="font-sans text-[10px] text-foreground">
                Pinecone Dental <span className="text-[#3DD68C]">signed proposal ($6,500)</span>
              </div>
              <Annotation className="text-[14px] text-[#3DD68C]">auto-spins project</Annotation>
            </div>
          </div>

          <div className="flex justify-between text-[9px] text-[#666]">
            <span>CONVERSION: 64%</span>
            <span>CHART: DEALS_BY_STAGE</span>
          </div>
        </div>
      )

    case 'chat':
      return (
        <div className="relative flex h-full w-full flex-col justify-between p-4 font-mono text-[11px] text-muted-foreground select-none">
          <div className="flex items-center justify-between border-b border-[#262626] pb-2 text-[10px] text-[#7D7D7D]">
            <span>SHEET: CHAT-03</span>
            <span>DUAL-PERIMETER COMMS</span>
            <span>CHANNEL ARCHITECTURE</span>
          </div>

          <div className="relative my-3 flex flex-1 flex-col justify-between overflow-hidden rounded border border-[#262626]/80 bg-[#070707] p-3">
            <div className="space-y-3">
              {/* Internal Channel */}
              <div className="rounded border border-[#262626] bg-[#0E0E0E] p-2">
                <div className="mb-1 flex items-center justify-between text-[10px] text-[#7D7D7D]">
                  <span className="text-foreground"># engineering</span>
                  <span className="text-[9px]">INTERNAL ONLY</span>
                </div>
                <div className="font-sans text-[11px] text-muted-foreground">
                  <span className="font-mono text-[#52A8FF]">HM:</span> PR merged to main, deploying
                  worker.
                </div>
              </div>

              {/* Client Channel with Amber Eye */}
              <div className="relative rounded border border-[#F5A623]/40 bg-[#0E0E0E] p-2">
                <div className="mb-1 flex items-center justify-between text-[10px] text-[#F5A623]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="text-[12px]">👁</span> # chat-with-acme
                  </span>
                  <span className="py-0.2 rounded bg-[#F5A623]/20 px-1 text-[9px]">
                    CLIENT VISIBLE
                  </span>
                </div>
                <div className="font-sans text-[11px] text-foreground">
                  <span className="font-mono text-[#3DD68C]">Musa:</span> Hero layouts are ready for
                  your sign-off!
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-[#1C1C1C] pt-2">
              <div className="text-[9px] text-[#7D7D7D]">SECURITY: NO LEAK BOUNDARY</div>
              <Annotation className="text-[14px] text-[#F5A623]">
                amber eye = client inside
              </Annotation>
            </div>
          </div>

          <div className="flex justify-between text-[9px] text-[#666]">
            <span>PERMISSIONS: HARD-ISOLATION</span>
            <span>ADR: 0006-CLIENTS</span>
          </div>
        </div>
      )

    case 'documents-signing':
      return (
        <div className="relative flex h-full w-full flex-col justify-between p-4 font-mono text-[11px] text-muted-foreground select-none">
          <div className="flex items-center justify-between border-b border-[#262626] pb-2 text-[10px] text-[#7D7D7D]">
            <span>SHEET: DOC-04</span>
            <span>CONTRACT DRAFTING</span>
            <span>LEGAL INTEGRITY</span>
          </div>

          <div className="relative my-3 flex flex-1 flex-col justify-between overflow-hidden rounded border border-[#262626]/80 bg-[#070707] p-3">
            <div>
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <div className="font-sans text-[11px] font-semibold text-foreground">
                    Statement of Work #14
                  </div>
                  <div className="text-[9px] text-[#7D7D7D]">Acme Rebrand Phase 2</div>
                </div>
                <InkStamp
                  label="SIGNED"
                  variant="success"
                  className="origin-top-right scale-75"
                  rotation={-4}
                />
              </div>

              <div className="my-3 space-y-1.5 border-t border-b border-[#1C1C1C] py-2 font-sans text-[10px] text-[#888]">
                <div className="flex justify-between">
                  <span>1. Design System Tokens</span>
                  <span className="font-mono text-foreground">$12,000</span>
                </div>
                <div className="flex justify-between">
                  <span>2. Cloudflare Migration</span>
                  <span className="font-mono text-foreground">$8,000</span>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="text-[8px] text-[#555]">HASH: sha256:4f8e91...a12c</div>
                <div className="text-[8px] text-[#555]">TIMESTAMP: 2026-09-29T14:11:00Z</div>
              </div>
              <Annotation className="text-[14px] text-[#3DD68C]">audit trail included</Annotation>
            </div>
          </div>

          <div className="flex justify-between text-[9px] text-[#666]">
            <span>ESIGN: E-SIGN ACT COMPLIANT</span>
            <span>RECORD: IMMUTABLE</span>
          </div>
        </div>
      )

    case 'money-invoicing':
      return (
        <div className="relative flex h-full w-full flex-col justify-between p-4 font-mono text-[11px] text-muted-foreground select-none">
          <div className="flex items-center justify-between border-b border-[#262626] pb-2 text-[10px] text-[#7D7D7D]">
            <span>SHEET: LEDGER-05</span>
            <span>DOUBLE-ENTRY JOURNAL</span>
            <span>CHART OF ACCOUNTS</span>
          </div>

          <div className="relative my-3 flex flex-1 flex-col justify-between overflow-hidden rounded border border-[#262626]/80 bg-[#070707] p-3">
            <div>
              <div className="mb-2 flex items-center justify-between border-b border-[#262626] pb-1">
                <span className="text-[10px] text-[#A1A1A1]">ENTRY #1084</span>
                <span className="flex items-center gap-1 text-[9px] text-[#3DD68C]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3DD68C]"></span>
                  BALANCED
                </span>
              </div>

              <div className="space-y-1.5 text-[10px]">
                <div className="flex items-center justify-between text-foreground">
                  <span>DR: Stripe Clearing</span>
                  <span className="font-semibold tabular-nums">$12,000.00</span>
                </div>
                <div className="flex items-center justify-between pl-3 text-[#A1A1A1]">
                  <span>CR: Acme Revenue</span>
                  <span className="tabular-nums">$8,400.00</span>
                </div>
                <div className="flex items-center justify-between pl-3 text-[#A1A1A1]">
                  <span>CR: Musa Share</span>
                  <span className="tabular-nums">$3,000.00</span>
                </div>
                <div className="flex items-center justify-between pl-3 text-[#A1A1A1]">
                  <span>CR: Sara Comm</span>
                  <span className="tabular-nums">$600.00</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#1C1C1C] pt-2">
              <span className="text-[9px] text-[#666]">NET EQUALITY: $0.00 DELTA</span>
              <Annotation className="text-[14px] text-foreground">
                every cent accounted for
              </Annotation>
            </div>
          </div>

          <div className="flex justify-between text-[9px] text-[#666]">
            <span>LAW: BALANCED_POSTINGS</span>
            <span>ADR: 0004-LEDGER</span>
          </div>
        </div>
      )

    case 'client-portal':
      return (
        <div className="relative flex h-full w-full flex-col justify-between p-4 font-mono text-[11px] text-muted-foreground select-none">
          <div className="flex items-center justify-between border-b border-[#262626] pb-2 text-[10px] text-[#7D7D7D]">
            <span>SHEET: PORTAL-06</span>
            <span>CLIENT PERSPECTIVE</span>
            <span>WHITE-LABEL VIEW</span>
          </div>

          <div className="relative my-3 flex flex-1 flex-col justify-between overflow-hidden rounded border border-[#262626]/80 bg-[#070707] p-3">
            <div>
              <div className="flex items-center justify-between border-b border-[#262626] pb-2">
                <div className="font-sans text-[11px] font-semibold text-foreground">
                  Acme Rebrand
                </div>
                <div className="rounded bg-[#3DD68C]/10 px-2 py-0.5 text-[9px] text-[#3DD68C]">
                  ON TRACK
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="text-[10px] text-[#A1A1A1]">MILESTONES [3 of 4]</div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1A1A1A]">
                  <div className="h-full w-3/4 rounded-full bg-[#3DD68C]"></div>
                </div>

                <div className="mt-2 flex items-center justify-between rounded border border-[#262626] bg-[#0E0E0E] p-2">
                  <div className="font-sans text-[10px] text-foreground">Invoice #15 ($12,000)</div>
                  <button className="rounded bg-foreground px-2 py-1 text-[9px] font-semibold text-background">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#1C1C1C] pt-2">
              <span className="text-[9px] text-[#666]">AUTH: ZERO-FRICTION MAGIC LINK</span>
              <Annotation className="text-[14px] text-[#52A8FF]">clients love this view</Annotation>
            </div>
          </div>

          <div className="flex justify-between text-[9px] text-[#666]">
            <span>BRANDING: 100% WHITE-LABEL</span>
            <span>ADR: 0006-PORTAL</span>
          </div>
        </div>
      )

    default:
      return null
  }
}

function FeaturesPage() {
  return (
    <MarketingLayout>
      <div className="relative min-h-screen">
        <BlueprintGrid />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-32">
          {/* Header */}
          <div className="mx-auto mb-28 max-w-3xl text-center">
            <h1 className="text-[36px] font-semibold tracking-tight text-foreground md:text-[44px]">
              Everything your agency needs.
            </h1>
            <p className="mt-4 text-[18px] text-muted-foreground">
              Six core operational modules built into one unified ground. No plugins, no API duct
              tape.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Annotation>architectural breakdown</Annotation>
              <HandDrawnArrow direction="down" className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {/* Feature list */}
          <div className="space-y-32">
            {features.map((feature, idx) => {
              const isEven = idx % 2 === 0
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div
                    className={`flex flex-col ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    } items-center gap-12 md:gap-16`}
                  >
                    {/* Feature text copy */}
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="rounded border border-[#52A8FF]/30 px-2 py-0.5 font-mono text-[13px] text-[#52A8FF]">
                          MOD-0{idx + 1}
                        </span>
                        <h2 className="text-[20px] font-semibold text-foreground">
                          {feature.title}
                        </h2>
                      </div>

                      <p className="text-[18px] leading-snug font-medium text-[#EDEDED]">
                        {feature.headline}
                      </p>
                      <p className="text-[15px] leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>

                      <ul className="space-y-3 pt-2">
                        {feature.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start text-[14px] text-[#A1A1A1]">
                            <Check className="mt-0.5 mr-3 h-4 w-4 shrink-0 text-[#3DD68C]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Feature Vector Architectural Illustration */}
                    <div className="relative aspect-4/3 w-full max-w-lg flex-1 overflow-hidden rounded-lg border border-border/80 bg-[#0A0A0A] p-2 shadow-2xl">
                      <ArchitecturalIllustration id={feature.id} />
                    </div>
                  </div>

                  {/* Connecting divider */}
                  {idx < features.length - 1 && (
                    <div className="my-24">
                      <DeckleEdge />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Bottom call to action */}
          <div className="mt-32 border-t border-border pt-20 text-center">
            <h2 className="mb-4 text-[28px] font-semibold text-foreground">
              Ready to simplify your agency stack?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-[16px] text-muted-foreground">
              Replace five disjointed subscriptions with one purpose-built operating system.
            </p>
            <div className="flex flex-col items-center gap-3">
              <a
                href="/pricing"
                className="inline-flex h-12 items-center justify-center rounded-md bg-foreground px-8 text-[15px] font-medium text-background transition-colors hover:bg-white"
              >
                View pricing plans
              </a>
              <Annotation>no credit card required for 14-day trial</Annotation>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
