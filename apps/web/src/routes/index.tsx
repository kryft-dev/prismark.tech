import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Activity,
  ArrowRight,
  DollarSign,
  Eye,
  FileCheck,
  GitBranch,
  Lock,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { AgencyLogos } from '@/components/brand/agency-logos'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { LedgerLines } from '@/components/graphics/ledger-lines'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { toast } from '@/components/ui/toast'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Prismark — The Agency Operating System' },
      {
        name: 'description',
        content:
          'Bespoke operating system for software studios. Real-time drafting board, balanced double-entry money ledger, and an air-gapped client portal.',
      },
    ],
  }),
  component: LandingPage,
})

type NodeId = 'inquiry' | 'sow' | 'task' | 'ledger' | 'airgap'

export function LandingPage() {
  const [activeNode, setActiveNode] = useState<NodeId>('task')
  const [contractValue, setContractValue] = useState(25000)
  const [devSharePct, setDevSharePct] = useState(25)
  const [portalMode, setPortalMode] = useState<'internal' | 'client'>('internal')
  const [dispatchDomain, setDispatchDomain] = useState('')
  const [keyGenerated, setKeyGenerated] = useState<string | null>(null)

  const devPayout = (contractValue * devSharePct) / 100
  const salesCommission = (contractValue * 5) / 100
  const agencyRetained = contractValue - devPayout - salesCommission

  const triggerToast = (msg: string) => {
    try {
      toast.add({ title: msg })
    } catch {
      // fallback
    }
  }

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dispatchDomain) return
    const key = `PRISMARK-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`
    setKeyGenerated(key)
    triggerToast(`Workspace key ${key} issued for ${dispatchDomain}`)
  }

  return (
    <MarketingLayout>
      {/* ─────────────────────────────────────────────────────────────
          1. TELEMETRY LIVE BAR (EDGE STUDIO RUNTIME)
      ───────────────────────────────────────────────────────────── */}
      <div className="border-b border-stone-800/80 bg-[#06080F]/90 px-4 py-2 font-mono text-[11px] text-stone-400">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="size-2 animate-ping rounded-full bg-emerald-500" />
              <span>EDGE RUNTIME // 184 ACTIVE STUDIOS</span>
            </span>
            <span className="hidden text-stone-600 sm:inline">|</span>
            <span className="hidden sm:inline">D1 REPLICATION: 11ms</span>
            <span className="hidden text-stone-600 md:inline">|</span>
            <span className="hidden md:inline">DOUBLE-ENTRY LEDGER: 100% BALANCED</span>
          </div>
          <div className="flex items-center gap-3 text-orange-400">
            <span>CLIENT AIR-GAP: ZERO DATA LEAKAGE</span>
            <span className="py-0.2 rounded border border-orange-500/40 bg-orange-950/80 px-1.5 text-[10px]">
              STRICT
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. THE STUDIO COMMAND DECK: LIVING OPERATING CANVAS
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pt-12 pb-24 md:px-14 md:pt-16 md:pb-32">
        {/* Ambient lighting cones */}
        <div className="ambient-orange-glow pointer-events-none absolute -top-24 -left-24 size-[500px] rounded-full opacity-60 blur-3xl" />
        <div className="ambient-blue-glow pointer-events-none absolute top-12 -right-24 size-[600px] rounded-full opacity-70 blur-3xl" />

        <div className="mx-auto max-w-[1440px]">
          {/* Main Title Strip */}
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-orange-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>STUDIO OPERATING HUD // V2.0</span>
              </div>
              <h1 className="text-4xl leading-[1.05] font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                The app your studio <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400 bg-clip-text text-transparent">
                  runs its work and money on.
                </span>
              </h1>
            </div>

            <p className="max-w-md font-sans text-base leading-relaxed text-stone-400 sm:text-lg">
              No spreadsheets. No disconnected Slack panic. Tasks, balanced ledger lines, real-time
              client chat, and an uncompromised client portal on one living canvas.
            </p>
          </div>

          {/* Interactive Operating Node Flow Header */}
          <div className="mb-8 rounded-2xl border border-stone-800/90 bg-[#0B0F19]/90 p-4 shadow-2xl backdrop-blur-md sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-stone-800 pb-3 font-mono text-xs text-stone-400">
              <span className="flex items-center gap-1.5 font-bold tracking-wider text-orange-400 uppercase">
                <Activity className="h-4 w-4 text-orange-400" />
                <span>INTERACTIVE AGENCY WORKFLOW PIPELINE</span>
              </span>
              <span className="hidden text-stone-500 sm:inline">
                [Click any node below to inspect live operations]
              </span>
            </div>

            {/* Pipeline Vector Nodes */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                {
                  id: 'inquiry',
                  label: '1. Lead Dispatch',
                  icon: Terminal,
                  color: 'text-amber-400 border-amber-500/50 bg-amber-950/30',
                },
                {
                  id: 'sow',
                  label: '2. Ratified SOW',
                  icon: FileCheck,
                  color: 'text-blue-400 border-blue-500/50 bg-blue-950/30',
                },
                {
                  id: 'task',
                  label: '3. Sprint Issue',
                  icon: GitBranch,
                  color: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/30',
                },
                {
                  id: 'ledger',
                  label: '4. Double Ledger',
                  icon: DollarSign,
                  color: 'text-orange-400 border-orange-500/50 bg-orange-950/30',
                },
                {
                  id: 'airgap',
                  label: '5. Client Air-Gap',
                  icon: Eye,
                  color: 'text-purple-400 border-purple-500/50 bg-purple-950/30',
                },
              ].map((node) => {
                const Icon = node.icon
                const isSelected = activeNode === node.id

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      setActiveNode(node.id as NodeId)
                      triggerToast(`Inspecting ${node.label}`)
                    }}
                    className={`flex items-center gap-2.5 rounded-lg border p-3 text-left font-mono text-xs font-bold transition-all ${
                      isSelected
                        ? `${node.color} scale-[1.02] shadow-lg ring-2 ring-orange-500/80`
                        : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700 hover:text-white'
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{node.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Dynamic Living Stage Container */}
          <div className="relative min-h-[460px] overflow-hidden rounded-2xl border border-stone-800 bg-[#0C111E]/95 p-6 shadow-2xl sm:p-10">
            {/* Ambient circuit grid backdrop */}
            <div
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #38BDF8 1px, transparent 1px), linear-gradient(to right, rgba(56,189,248,0.05) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <AnimatePresence mode="wait">
              {activeNode === 'inquiry' && (
                <motion.div
                  key="inquiry"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-amber-400 uppercase">
                        NODE 01 // LEAD INTAKE &amp; DISPATCH
                      </span>
                      <h3 className="mt-1 text-2xl font-bold text-white">
                        Inquiries Convert Directly to Scoped Proposals
                      </h3>
                    </div>
                    <InkStamp label="QUALIFIED" variant="amber" rotation={-2} className="text-xs" />
                  </div>

                  <div className="grid grid-cols-1 gap-6 font-mono text-xs md:grid-cols-3">
                    <div className="space-y-2 rounded-xl border border-stone-800 bg-[#080B12] p-4">
                      <span className="text-stone-500 uppercase">PROSPECT ENTITY</span>
                      <p className="text-sm font-bold text-white">Pinecone Systems Inc.</p>
                      <p className="text-stone-400">Budget: $35,000 · Sprint 01-04</p>
                    </div>
                    <div className="space-y-2 rounded-xl border border-stone-800 bg-[#080B12] p-4">
                      <span className="text-stone-500 uppercase">AUTOMATIC SOW DRAFT</span>
                      <p className="text-sm font-bold text-blue-400">NextGen iOS App Build</p>
                      <p className="text-stone-400">4 Milestones · Bi-weekly Billing</p>
                    </div>
                    <div className="space-y-2 rounded-xl border border-stone-800 bg-[#080B12] p-4">
                      <span className="text-stone-500 uppercase">ACTION TRIGGER</span>
                      <Link
                        to="/dispatch"
                        className="inline-flex items-center gap-1.5 pt-1 text-orange-400 hover:underline"
                      >
                        <span>Open Dispatch Console</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeNode === 'sow' && (
                <motion.div
                  key="sow"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-blue-400 uppercase">
                        NODE 02 // PROPOSAL &amp; NOTARIZED RATIFICATION
                      </span>
                      <h3 className="mt-1 text-2xl font-bold text-white">
                        Client Signs in Their Web Portal Without Account Fatigue
                      </h3>
                    </div>
                    <InkStamp
                      label="SIGNED SOW"
                      variant="cobalt"
                      rotation={1}
                      className="text-xs"
                    />
                  </div>

                  <div className="rounded-xl border border-blue-900/50 bg-[#070D1A] p-6 text-sm">
                    <div className="mb-4 flex items-center justify-between border-b border-blue-900/60 pb-3 font-mono text-xs text-stone-400">
                      <span>DOCUMENT: SOW-2026-PINECONE</span>
                      <span className="font-bold text-emerald-400">
                        DEPOSIT: $12,500 DUE UPON SIGN
                      </span>
                    </div>
                    <p className="font-serif text-base leading-relaxed text-stone-300 italic">
                      &ldquo;Pinecone Systems engages Prismark Studio to deliver Core Platform
                      Architecture. Milestones are released upon client verification directly via
                      the air-gapped portal.&rdquo;
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-blue-900/60 pt-4 font-mono text-xs">
                      <div>
                        <span className="block text-stone-500">AUTHORIZED SIGNER</span>
                        <span className="font-handwritten text-2xl text-blue-400">
                          Dr. Rachel Vance
                        </span>
                      </div>
                      <span className="rounded border border-emerald-500/40 bg-emerald-500/20 px-2 py-1 font-bold text-emerald-400">
                        ✓ CRYPTOGRAPHICALLY RATIFIED
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeNode === 'task' && (
                <motion.div
                  key="task"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
                        NODE 03 // WORKSPACE SPRINT DRAFTING
                      </span>
                      <h3 className="mt-1 text-2xl font-bold text-white">
                        Tasks Auto-Close Linked GitHub Issues Upon Merge
                      </h3>
                    </div>
                    <span className="rounded border border-emerald-500/40 bg-emerald-950 px-2.5 py-1 font-mono text-xs text-emerald-400">
                      SYNCED: GITHUB REPO
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-3">
                    <div className="rounded-xl border border-stone-800 bg-[#080B12] p-4">
                      <div className="mb-2 flex justify-between border-b border-stone-800 pb-2 font-bold text-stone-500">
                        <span>IN PROGRESS</span>
                        <span>[PR #42]</span>
                      </div>
                      <p className="font-sans text-sm font-bold text-white">Design Token System</p>
                      <p className="mt-1 text-stone-400">Assignee: @MusaKhan</p>
                    </div>

                    <div className="rounded-xl border border-amber-900/60 bg-[#120E0A] p-4">
                      <div className="mb-2 flex justify-between border-b border-amber-900/60 pb-2 font-bold text-amber-400">
                        <span>IN REVIEW</span>
                        <span>[MILESTONE 01]</span>
                      </div>
                      <p className="font-sans text-sm font-bold text-white">
                        Double-Entry Ledger API
                      </p>
                      <p className="mt-1 text-stone-400">Reviewer: @Hammad</p>
                    </div>

                    <div className="rounded-xl border border-emerald-900/60 bg-[#0A120E] p-4">
                      <div className="mb-2 flex justify-between border-b border-emerald-900/60 pb-2 font-bold text-emerald-400">
                        <span>COMPLETED</span>
                        <span>[MERGED]</span>
                      </div>
                      <p className="font-sans text-sm font-bold text-white line-through opacity-80">
                        Client Portal Air-Gap
                      </p>
                      <p className="mt-1 text-emerald-400">✓ Automated issue closed</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeNode === 'ledger' && (
                <motion.div
                  key="ledger"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-orange-400 uppercase">
                        NODE 04 // DOUBLE-ENTRY FINANCIAL ENGINE
                      </span>
                      <h3 className="mt-1 text-2xl font-bold text-white">
                        Every Paid Invoice Automatically Posts Balanced Journals
                      </h3>
                    </div>
                    <InkStamp
                      label="PAID VIA STRIPE"
                      variant="emerald"
                      rotation={-2}
                      className="text-xs"
                    />
                  </div>

                  <div className="relative overflow-hidden rounded-xl border border-stone-800 bg-[#080B12] p-6 font-mono text-xs">
                    <LedgerLines
                      lineSpacing={30}
                      marginRule={true}
                      lineColor="rgba(249, 115, 22, 0.12)"
                    />
                    <div className="relative z-10 space-y-2 pl-8">
                      <div className="flex justify-between border-b border-stone-800 pb-2 font-bold text-white">
                        <span>JOURNAL #409 · INVOICE #14 ($12,000 DEPOSIT)</span>
                        <span className="text-emerald-400">BALANCED DEBIT = CREDIT</span>
                      </div>
                      <div className="flex justify-between text-stone-200">
                        <span>DR · 1010 Operating Cash (Mercury Bank)</span>
                        <span className="font-bold text-emerald-400">$12,000.00</span>
                      </div>
                      <div className="flex justify-between pl-4 text-blue-400">
                        <span>CR · 2100 Musa Khan (25% Lead Dev Share)</span>
                        <span>$3,000.00</span>
                      </div>
                      <div className="flex justify-between pl-4 text-amber-400">
                        <span>CR · 2105 Sara Chen (5% Sales Commission)</span>
                        <span>$600.00</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-800 pt-1 pl-4 font-bold text-stone-400">
                        <span>CR · 4000 Studio Retained Earnings</span>
                        <span>$8,400.00</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeNode === 'airgap' && (
                <motion.div
                  key="airgap"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-purple-400 uppercase">
                        NODE 05 // CLIENT PORTAL ZERO-LEAK AIR-GAP
                      </span>
                      <h3 className="mt-1 text-2xl font-bold text-white">
                        Clients See Milestones &amp; Files — Never Internal Tasks
                      </h3>
                    </div>
                    <span className="flex items-center gap-1.5 rounded border border-amber-500/50 bg-amber-950/80 px-2.5 py-1 font-mono text-xs font-bold text-amber-400">
                      <Eye className="h-3.5 w-3.5" />
                      <span>THE AMBER EYE</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 font-mono text-xs md:grid-cols-2">
                    <div className="rounded-xl border border-stone-800 bg-[#080B12] p-4">
                      <span className="mb-2 block font-bold text-stone-500">
                        INTERNAL TEAM VIEW
                      </span>
                      <p className="font-sans text-stone-300">
                        See developer profit shares, open git branch PRs, internal chat
                        deliberations, and time entries.
                      </p>
                    </div>

                    <div className="rounded-xl border-2 border-amber-500/60 bg-[#140F08] p-4">
                      <span className="mb-2 block flex items-center gap-1 font-bold text-amber-400">
                        <Lock className="h-3.5 w-3.5" />
                        <span>AIR-GAPPED CLIENT VIEW</span>
                      </span>
                      <p className="font-sans text-stone-300">
                        Clients only see clean high-level milestone progress, downloadable
                        deliverables, contract signoff, and 1-click Stripe payments.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. REAL-TIME PROFIT & COMMISSION CALCULATOR
      ───────────────────────────────────────────────────────────── */}
      <section className="relative border-y border-stone-800/80 bg-[#070A12]/90 py-20 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left controls */}
            <div className="lg:col-span-5">
              <span className="font-mono text-xs font-bold tracking-wider text-orange-400 uppercase">
                FINANCIAL SIMULATION // DOUBLE-ENTRY ENGINE
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                Simulate your studio cash flow in real time.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-400">
                Prismark ends chaotic end-of-month spreadsheet reconciliation. Drag the sliders to
                see how contract revenue automatically balances into developer payouts and agency
                cash.
              </p>

              {/* Sliders */}
              <div className="mt-8 space-y-6">
                <div>
                  <div className="mb-2 flex justify-between font-mono text-xs text-stone-300">
                    <span>Project Contract Value</span>
                    <span className="text-sm font-bold text-emerald-400">
                      ${contractValue.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={100000}
                    step={1000}
                    value={contractValue}
                    onChange={(e) => setContractValue(Number(e.target.value))}
                    className="w-full cursor-pointer accent-orange-500"
                  />
                </div>

                <div>
                  <div className="mb-2 flex justify-between font-mono text-xs text-stone-300">
                    <span>Lead Developer Project Share</span>
                    <span className="text-sm font-bold text-blue-400">{devSharePct}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    step={1}
                    value={devSharePct}
                    onChange={(e) => setDevSharePct(Number(e.target.value))}
                    className="w-full cursor-pointer accent-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl border-2 border-stone-800 bg-[#0A0E18] p-6 shadow-2xl sm:p-10">
                <div className="mb-6 flex items-center justify-between border-b border-stone-800 pb-4">
                  <span className="font-mono text-xs font-bold text-stone-400 uppercase">
                    AUTO-GENERATED BALANCED LEDGER ENTRY
                  </span>
                  <InkStamp label="CR = DR" variant="emerald" rotation={-1} className="text-xs" />
                </div>

                <div className="mb-8 grid grid-cols-1 gap-4 font-mono sm:grid-cols-3">
                  <div className="rounded-xl border border-emerald-900/60 bg-[#08120B] p-4">
                    <span className="block text-xs text-stone-500">DEV PAYOUT</span>
                    <span className="mt-1 block text-2xl font-black text-emerald-400">
                      ${devPayout.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-stone-400">({devSharePct}% of contract)</span>
                  </div>

                  <div className="rounded-xl border border-amber-900/60 bg-[#120E08] p-4">
                    <span className="block text-xs text-stone-500">COMMISSION</span>
                    <span className="mt-1 block text-2xl font-black text-amber-400">
                      ${salesCommission.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-stone-400">(5% deal origination)</span>
                  </div>

                  <div className="rounded-xl border border-blue-900/60 bg-[#070D18] p-4">
                    <span className="block text-xs text-stone-500">STUDIO CASH</span>
                    <span className="mt-1 block text-2xl font-black text-blue-400">
                      ${agencyRetained.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-stone-400">retained operating profit</span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-stone-800 pt-4 font-mono text-xs">
                  <div className="flex justify-between font-bold text-white">
                    <span>DR · 1010 Operating Cash (Bank Deposit)</span>
                    <span>${contractValue.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between pl-4 text-stone-400">
                    <span>CR · 2100 Contractor Liability Account</span>
                    <span>${devPayout.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between pl-4 text-stone-400">
                    <span>CR · 2105 Sales Commission Liability</span>
                    <span>${salesCommission.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-800/80 pt-1 pl-4 font-bold text-stone-300">
                    <span>CR · 4000 Studio Creative Net Margin</span>
                    <span>${agencyRetained.toLocaleString()}.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE AIR-GAP SPLIT SLIDER: THE AMBER EYE IN ACTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-5 py-20 md:px-14 md:py-32">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-purple-400">
              <Eye className="h-3.5 w-3.5" />
              <span>AIR-GAP PERIMETER ENGINE</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
              One project. Two air-gapped realities.
            </h2>
          </div>

          {/* Toggle buttons */}
          <div className="flex rounded-lg border border-stone-800 bg-stone-900/60 p-1 font-mono text-xs font-bold">
            <button
              type="button"
              onClick={() => setPortalMode('internal')}
              className={`rounded px-4 py-2 transition-colors ${
                portalMode === 'internal'
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              1. Team View
            </button>
            <button
              type="button"
              onClick={() => setPortalMode('client')}
              className={`flex items-center gap-1.5 rounded px-4 py-2 transition-colors ${
                portalMode === 'client'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>2. Client View (The Amber Eye)</span>
            </button>
          </div>
        </div>

        {/* The View Display */}
        <div className="relative rounded-2xl border-2 border-stone-800 bg-[#090D17] p-6 shadow-2xl sm:p-10">
          {portalMode === 'internal' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3 font-mono text-xs text-stone-400">
                <span className="font-bold text-emerald-400">
                  FULL STUDIO ACCESS // REPO #PRJ-88
                </span>
                <span>INTERNAL CONFIDENTIAL</span>
              </div>
              <div className="grid grid-cols-1 gap-6 font-mono text-xs md:grid-cols-3">
                <div className="space-y-2 rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                  <span className="text-stone-500 uppercase">INTERNAL CHAT (AIR-GAPPED)</span>
                  <p className="font-sans text-sm text-stone-200">
                    "Hero render done. Margin on this milestone is 68%. Musa earns $3k once client
                    clicks approve."
                  </p>
                </div>
                <div className="space-y-2 rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                  <span className="text-stone-500 uppercase">GIT TICKETS &amp; ISSUES</span>
                  <p className="font-sans text-sm text-stone-200">
                    34 internal bug tickets, branch names, and database migrations.
                  </p>
                </div>
                <div className="space-y-2 rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                  <span className="text-stone-500 uppercase">PROFIT SHARE CALCULATIONS</span>
                  <p className="font-sans text-sm text-stone-200">
                    Automatic splits between developer pay, commission, and studio cash.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-amber-900/80 pb-3 font-mono text-xs text-amber-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <Eye className="h-4 w-4 text-amber-500" />
                  <span>CLIENT PORTAL: CLIENTS.YOURSTUDIO.COM</span>
                </span>
                <span className="rounded border border-amber-500/50 bg-amber-950 px-2 py-0.5">
                  GUEST ACCESS ACTIVE
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 font-mono text-xs md:grid-cols-3">
                <div className="space-y-2 rounded-xl border border-amber-500/40 bg-[#161009] p-4">
                  <span className="text-amber-400 uppercase">MILESTONE PHASES</span>
                  <p className="font-sans text-sm text-stone-200">
                    Phase 01: Architecture Complete (100%) · Phase 02: Design Review (Pending Client
                    Signoff)
                  </p>
                </div>
                <div className="space-y-2 rounded-xl border border-amber-500/40 bg-[#161009] p-4">
                  <span className="text-amber-400 uppercase">1-CLICK STRIPE PAYMENTS</span>
                  <p className="font-sans text-sm text-stone-200">
                    Invoice #14: $12,000.00 · Instant card or ACH payment with automatic PDF receipt
                    download.
                  </p>
                </div>
                <div className="space-y-2 rounded-xl border border-amber-500/40 bg-[#161009] p-4">
                  <span className="text-amber-400 uppercase">CLIENT CHANNEL</span>
                  <p className="font-sans text-sm text-stone-200">
                    Clean, dedicated communication channel. Zero internal tickets or developer
                    margin chatter visible.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. THE 6-TOOL CIRCUS COMPARISON ENGINE
      ───────────────────────────────────────────────────────────── */}
      <section className="relative border-t border-stone-800/80 bg-[#070A12]/90 py-20 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-14">
          <div className="mb-12 max-w-3xl">
            <span className="font-mono text-xs font-bold tracking-wider text-blue-400 uppercase">
              TOTAL COST &amp; FRICTION AUDIT
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-5xl">
              Retire the disconnected tool circus.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-400">
              Boutique agencies typically spend over $5,400 every year stitching together 6
              incompatible subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
            {/* The Disconnected Circus */}
            <div className="space-y-4 rounded-2xl border border-rose-900/60 bg-[#12080A] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-rose-900/60 pb-3">
                <span className="font-mono text-xs font-bold text-rose-400 uppercase">
                  THE DISCONNECTED 6-TOOL STACK
                </span>
                <span className="font-mono text-xs font-bold text-rose-500">$450+/mo</span>
              </div>
              <ul className="space-y-3 font-mono text-xs text-stone-300">
                <li className="flex items-center gap-2">
                  <span className="text-rose-500">✕</span>
                  <span>Linear ($10/seat) — Isolated from client view &amp; invoices</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500">✕</span>
                  <span>Slack ($8.75/seat) — Constant fear of leaking secrets to client</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500">✕</span>
                  <span>QuickBooks ($60/mo) — Disconnected from developer project shares</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500">✕</span>
                  <span>DocuSign ($40/mo) — External login barrier for client SOW signing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500">✕</span>
                  <span>Notion ($10/seat) — Chaotic unorganized project wiki sprawl</span>
                </li>
              </ul>
            </div>

            {/* The Prismark Integrated Deck */}
            <div className="space-y-4 rounded-2xl border-2 border-emerald-500/60 bg-[#07130B] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
                  PRISMARK STUDIO OPERATING SYSTEM
                </span>
                <span className="font-mono text-xs font-bold text-emerald-400">
                  1 Integrated Canvas
                </span>
              </div>
              <ul className="space-y-3 font-mono text-xs text-stone-200">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Task board automatically closes GitHub issues on merge</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Amber Eye guaranteed dual-channel privacy</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Native balanced double-entry accounting &amp; profit splits</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>In-portal document signing with digital hash notary</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Unlimited client guests at zero extra seat cost</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. STUDIO DISPATCH CONSOLE / EARLY REGISTRY TERMINAL
      ───────────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-5 py-20 md:px-14 md:py-32">
        <div className="relative overflow-hidden rounded-3xl border-2 border-stone-800 bg-[#0B0F19] p-8 shadow-2xl sm:p-14">
          <div className="ambient-orange-glow pointer-events-none absolute -right-24 -bottom-24 size-[500px] rounded-full opacity-50 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <span className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-orange-400 uppercase">
              <Terminal className="h-4 w-4 text-orange-400" />
              <span>TERMINAL DISPATCH // EARLY WORKSPACE PROVISIONING</span>
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
              Initialize your studio workspace.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-stone-400 sm:text-lg">
              We onboard software studios in rolling batches of 10. Early registry studios lock in
              lifetime early bird rates and priority migration support.
            </p>

            <form onSubmit={handleGenerateKey} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                required
                placeholder="studio.youragency.com"
                value={dispatchDomain}
                onChange={(e) => setDispatchDomain(e.target.value)}
                className="flex-1 rounded-md border border-stone-700 bg-black/60 px-4 py-3 font-mono text-sm text-white placeholder:text-stone-500 focus:border-orange-500 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 font-mono text-sm font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-95"
              >
                <span>Dispatch Permit</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {keyGenerated && (
              <div className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-950/60 p-4 font-mono text-xs text-emerald-300">
                <span className="block font-bold text-emerald-400">✓ ACCESS PERMIT GENERATED:</span>
                <code className="mt-1 block text-sm font-bold text-white">{keyGenerated}</code>
                <p className="mt-2 text-stone-400">
                  Recorded in Cloudflare D1 global registry. We will contact your studio lead
                  shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Partner Studio Marks */}
      <section className="border-t border-stone-800/80 bg-[#060810]/90 py-12">
        <div className="mx-auto max-w-[1440px] px-5 md:px-14">
          <AgencyLogos />
        </div>
      </section>
    </MarketingLayout>
  )
}
