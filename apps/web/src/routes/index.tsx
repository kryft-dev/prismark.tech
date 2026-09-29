import { createFileRoute } from '@tanstack/react-router'
import {
  CheckCircle2,
  Clock,
  Check,
  DollarSign,
  ArrowRight,
  Eye,
  PenTool,
  Sparkles,
  Layers,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'

import { AgencyLogos } from '@/components/brand/agency-logos'
import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { HandDrawnArrow } from '@/components/graphics/hand-drawn-arrow'
import { Highlighter } from '@/components/graphics/highlighter'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { LedgerLines } from '@/components/graphics/ledger-lines'
import { PaperClip } from '@/components/graphics/paper-clip'
import { StickyNote } from '@/components/graphics/sticky-note'
import { WashiTape } from '@/components/graphics/washi-tape'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Annotation } from '@/components/shared/annotation'
import { SectionHeading } from '@/components/shared/section-heading'
import { StatStrip } from '@/components/shared/stat-strip'
import { Testimonial } from '@/components/shared/testimonial'
import { toast } from '@/components/ui/toast'
import { testimonials } from '@/lib/data/testimonials'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Prismark — The Agency Operating System' },
      {
        name: 'description',
        content:
          'Bespoke operating system for software agencies. Tactile field journal for tasks, client channels, balanced double-entry ledger, and a real client portal.',
      },
    ],
  }),
  component: LandingPage,
})

export function LandingPage() {
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState<'board' | 'ledger' | 'chat' | 'sign' | 'pipeline'>(
    'board',
  )
  const [signedDoc, setSignedDoc] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Homepage hero 3D render',
      milestone: 'Acme Rebrand',
      owner: 'Musa',
      status: 'review',
    },
    {
      id: 2,
      title: 'Wireframe client onboarding',
      milestone: 'Pinecone App',
      owner: 'Sara',
      status: 'doing',
    },
    {
      id: 3,
      title: 'Export vector brand marks',
      milestone: 'Acme Rebrand',
      owner: 'Hammad',
      status: 'todo',
    },
    {
      id: 4,
      title: 'Double-entry ledger reconciliation',
      milestone: 'Internal',
      owner: 'Musa',
      status: 'done',
    },
  ])

  const triggerToast = (msg: string) => {
    try {
      toast.add({ title: msg })
    } catch {
      // fallback
    }
  }

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!waitlistEmail) return
    setWaitlistSubmitted(true)
    triggerToast(`Added ${waitlistEmail} to the early agency registry!`)
    setWaitlistEmail('')
  }

  const moveTask = (taskId: number) => {
    const nextStatus: Record<string, string> = {
      todo: 'doing',
      doing: 'review',
      review: 'done',
      done: 'todo',
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus[t.status] || 'todo' } : t)),
    )
    triggerToast('Task moved across the drafting board')
  }

  return (
    <MarketingLayout>
      {/* ─────────────────────────────────────────────────────────────
          1. HERO: ASYMMETRIC ARCHITECT FIELD DESK
      ───────────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] overflow-hidden px-5 pt-12 pb-20 sm:pt-20 sm:pb-32 md:px-14">
        <BlueprintGrid variant="drafting" />

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Bold Editorial & Specification Memo */}
          <div className="z-10 flex flex-col items-start lg:col-span-6">
            {/* Field specification tag */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-3.5 py-1 font-mono text-xs font-medium text-stone-700 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span>SPECIFICATION 2026 // FIELD JOURNAL V1</span>
            </div>

            <h1 className="text-4xl leading-[1.12] font-extrabold tracking-tight text-[#18181B] sm:text-5xl lg:text-6xl">
              The app your agency <Highlighter variant="yellow">runs itself on.</Highlighter>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-700 sm:text-xl">
              Projects, tasks, real-time client channels, balanced double-entry money ledger, and a
              client portal where clients see only their side. One physical desk. Zero chaotic
              spreadsheets.
            </p>

            {/* Hand-drawn annotation */}
            <div className="mt-4 flex items-center gap-2">
              <HandDrawnArrow direction="curved-right" className="h-8 w-8 shrink-0 text-blue-600" />
              <Annotation color="cobalt" className="text-lg sm:text-xl">
                everything your shop needs in one physical desk →
              </Annotation>
            </div>

            {/* Interactive Waitlist Desk Form */}
            <div className="mt-8 w-full max-w-md">
              <form
                onSubmit={handleWaitlistSubmit}
                className="paper-shadow relative flex flex-col gap-2 rounded-lg border border-[#DED7CB] bg-white p-2.5 sm:flex-row"
              >
                <div className="absolute -top-3 right-4">
                  <WashiTape variant="rose" rotation={2} className="scale-75" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@youragency.com"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-[#18181B] placeholder:text-stone-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[#18181B] px-5 py-2.5 text-sm font-semibold text-[#FBF9F4] shadow-sm transition-all hover:bg-stone-800 active:scale-95"
                >
                  <span>Request Key</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {waitlistSubmitted && (
                <div className="mt-3 flex items-center gap-2 font-mono text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Recorded in workspace registry! We will dispatch your access key.</span>
                </div>
              )}

              <div className="mt-4 flex items-center gap-4 font-mono text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 text-blue-600" />
                  Free 14-day trial
                </span>
                <span className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 text-blue-600" />
                  Passwordless OTP
                </span>
                <span className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 text-blue-600" />
                  No card required
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Tactile Physical Desk */}
          <div className="relative mt-8 lg:col-span-6 lg:mt-0">
            {/* The Drafting Board Canvas */}
            <div className="paper-shadow-lg relative mx-auto max-w-lg overflow-hidden rounded-xl border border-[#D8CEBE] bg-[#F5F0E6] p-4 sm:p-6 lg:max-w-none">
              {/* Drafting grid & corner brass screw accents */}
              <div className="absolute top-2 left-2 font-mono text-[9px] text-stone-400">
                [GRID: 5mm · DRAFTING DESK 01]
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-1.5">
                <InkStamp
                  label="PAID"
                  variant="emerald"
                  rotation={-5}
                  className="scale-75 text-[10px]"
                />
                <InkStamp
                  label="VERIFIED"
                  variant="cobalt"
                  rotation={3}
                  className="scale-75 text-[10px]"
                />
              </div>

              {/* Stacked Paper Sheets */}
              <div className="mt-6 flex flex-col gap-4">
                {/* Paper Sheet 1: Active Milestone Ticket with Brass Clip */}
                <div className="paper-shadow relative rounded-lg border border-[#E5DFD5] bg-white p-5 transition-transform hover:-translate-y-0.5">
                  <div className="absolute -top-3 left-6">
                    <PaperClip variant="brass" />
                  </div>
                  <div className="flex items-start justify-between gap-3 pt-2">
                    <div>
                      <span className="font-mono text-[11px] font-semibold tracking-wider text-rose-600 uppercase">
                        MILESTONE 02 // REBRAND
                      </span>
                      <h2 className="mt-0.5 text-base font-bold text-[#18181B]">
                        Brand Identity & Vector Assets
                      </h2>
                    </div>
                    <span className="rounded border border-blue-200 bg-blue-50 px-2 py-0.5 font-mono text-xs font-semibold text-blue-700">
                      IN REVIEW
                    </span>
                  </div>

                  {/* Progress bar styled as architectural ruler */}
                  <div className="mt-4">
                    <div className="mb-1 flex justify-between font-mono text-xs text-stone-500">
                      <span>Ruler completion</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full border border-stone-200 bg-stone-100">
                      <div className="h-full rounded-full bg-blue-600" style={{ width: '85%' }} />
                    </div>
                  </div>

                  {/* Quick interactive task list */}
                  <div className="mt-4 space-y-2 font-mono text-xs">
                    <div className="flex items-center gap-2 text-stone-800">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>SVG mark export & wordmark vectors</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-800">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Color token palette specification</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-500">
                      <Clock className="h-3.5 w-3.5 text-amber-600" />
                      <span>Client portal signoff & notary stamp</span>
                    </div>
                  </div>
                </div>

                {/* Paper Sheet 2: Double-Entry Accounting Ledger Slip */}
                <div className="paper-shadow relative overflow-hidden rounded-lg border border-[#E5DFD5] bg-white p-5">
                  <LedgerLines lineSpacing={32} marginRule={true} />
                  <div className="relative z-10 pl-8 sm:pl-10">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-stone-500 uppercase">
                        LEDGER JOURNAL ENTRY #1042
                      </span>
                      <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-xs font-bold text-emerald-700">
                        +$12,000.00 STRIPE
                      </span>
                    </div>

                    <div className="mt-3 space-y-1.5 font-mono text-xs text-stone-700">
                      <div className="flex justify-between">
                        <span>DR · 1010 Operating Cash</span>
                        <span className="font-semibold text-stone-900">$12,000.00</span>
                      </div>
                      <div className="flex justify-between text-blue-700">
                        <span>CR · 2100 Musa Project Share (25%)</span>
                        <span className="font-semibold">$3,000.00</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>CR · 2105 Sara Commission (5%)</span>
                        <span className="font-semibold">$600.00</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-200 pt-1 font-bold text-stone-900">
                        <span>CR · 4000 Agency Retained Income</span>
                        <span>$8,400.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Colorful Sticky Note */}
              <div className="absolute -bottom-2 -left-3 z-30 hidden sm:block">
                <StickyNote color="yellow" rotation={-3} className="max-w-[200px] text-sm">
                  "Client signed proposal! Automatically posted to double-entry ledger."
                </StickyNote>
              </div>

              {/* Mascot sitting on the field desk */}
              <div className="pointer-events-none absolute -right-4 -bottom-4 z-20 h-28 w-28 drop-shadow-md">
                <img
                  src="/mascot.png"
                  alt="Prismark drafting mascot"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. AGENCY IDENTITY SWATCHES (NO CARDS, PHYSICAL SWATCHES)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative border-y border-[#E5DFD5] bg-[#F7F3EB]/60 py-12">
        <div className="mx-auto max-w-[1440px] px-5 md:px-14">
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-wider text-stone-500 uppercase">
                PARTNER STUDIOS //
              </span>
              <span className="text-sm font-medium text-stone-700">
                Agencies who run client work without spreadsheets
              </span>
            </div>
            <Annotation color="amber" className="text-base sm:text-lg">
              "We dropped 4 separate tools the day we switched"
            </Annotation>
          </div>
          <AgencyLogos />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. THE 5-TAB INTERACTIVE FIELD JOURNAL (CORE PRODUCT SHOWCASE)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-5 py-20 md:px-14 md:py-32">
        <SectionHeading
          tag="FIELD MODULES"
          title="The Agency Operating System"
          subtitle="Click the physical binder tabs below to inspect how Prismark replaces disconnected tools with one cohesive drafting desk."
          annotation="touch any tab to inspect live data"
        />

        {/* Tabbed Binder Wrapper */}
        <div className="paper-shadow-lg relative mt-8 rounded-2xl border-2 border-[#D8CEBE] bg-[#F5F0E6] p-4 sm:p-8">
          {/* Top Physical Color-Coded Binder Tabs */}
          <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-[#D8CEBE] pb-4">
            <button
              type="button"
              onClick={() => setActiveTab('board')}
              className={`inline-flex items-center gap-2 rounded-t-lg border-t-2 px-4 py-2 font-mono text-xs font-bold transition-all sm:text-sm ${
                activeTab === 'board'
                  ? 'translate-y-0.5 border-blue-600 bg-white text-blue-700 shadow-sm'
                  : 'border-transparent bg-stone-200/80 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Layers className="h-4 w-4 text-blue-600" />
              <span>1. Drafting Board</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ledger')}
              className={`inline-flex items-center gap-2 rounded-t-lg border-t-2 px-4 py-2 font-mono text-xs font-bold transition-all sm:text-sm ${
                activeTab === 'ledger'
                  ? 'translate-y-0.5 border-emerald-600 bg-white text-emerald-800 shadow-sm'
                  : 'border-transparent bg-stone-200/80 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <DollarSign className="h-4 w-4 text-emerald-600" />
              <span>2. Money Ledger</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`inline-flex items-center gap-2 rounded-t-lg border-t-2 px-4 py-2 font-mono text-xs font-bold transition-all sm:text-sm ${
                activeTab === 'chat'
                  ? 'translate-y-0.5 border-amber-600 bg-white text-amber-800 shadow-sm'
                  : 'border-transparent bg-stone-200/80 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Eye className="h-4 w-4 text-amber-600" />
              <span>3. Amber Eye Wire</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sign')}
              className={`inline-flex items-center gap-2 rounded-t-lg border-t-2 px-4 py-2 font-mono text-xs font-bold transition-all sm:text-sm ${
                activeTab === 'sign'
                  ? 'translate-y-0.5 border-rose-600 bg-white text-rose-800 shadow-sm'
                  : 'border-transparent bg-stone-200/80 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <PenTool className="h-4 w-4 text-rose-600" />
              <span>4. Contract Desk</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pipeline')}
              className={`inline-flex items-center gap-2 rounded-t-lg border-t-2 px-4 py-2 font-mono text-xs font-bold transition-all sm:text-sm ${
                activeTab === 'pipeline'
                  ? 'translate-y-0.5 border-purple-600 bg-white text-purple-800 shadow-sm'
                  : 'border-transparent bg-stone-200/80 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span>5. Pipeline CRM</span>
            </button>
          </div>

          {/* Active Tab Screen Content */}
          <div className="paper-shadow min-h-[420px] rounded-xl border border-[#E5DFD5] bg-white p-5 sm:p-8">
            <AnimatePresence mode="wait">
              {/* TAB 1: DRAFTING BOARD */}
              {activeTab === 'board' && (
                <motion.div
                  key="board"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#18181B]">
                        Workspace Task Board // Synced with GitHub Issues
                      </h3>
                      <p className="font-mono text-sm text-stone-500">
                        Click any task card to progress it across columns. Moving to 'Done'
                        automatically closes the linked issue.
                      </p>
                    </div>
                    <span className="rounded border border-stone-300 bg-stone-100 px-2.5 py-1 font-mono text-xs text-stone-700">
                      4 active tasks
                    </span>
                  </div>

                  {/* 4 Interactive Columns */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {(['todo', 'doing', 'review', 'done'] as const).map((col) => {
                      const colNames = {
                        todo: 'To Do',
                        doing: 'In Progress',
                        review: 'In Review',
                        done: 'Completed',
                      }
                      const colColors = {
                        todo: 'border-stone-300 text-stone-700',
                        doing: 'border-blue-300 text-blue-700',
                        review: 'border-amber-300 text-amber-700',
                        done: 'border-emerald-300 text-emerald-700',
                      }

                      const colTasks = tasks.filter((t) => t.status === col)

                      return (
                        <div
                          key={col}
                          className="min-h-[220px] rounded-lg border border-stone-200 bg-[#FAF8F5] p-3"
                        >
                          <div
                            className={`mb-3 flex items-center justify-between border-b pb-2 font-mono text-xs font-bold uppercase ${colColors[col]}`}
                          >
                            <span>{colNames[col]}</span>
                            <span className="py-0.2 rounded border border-inherit bg-white px-1.5 text-[11px]">
                              {colTasks.length}
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            {colTasks.map((task) => (
                              <button
                                key={task.id}
                                type="button"
                                onClick={() => moveTask(task.id)}
                                className="paper-shadow-sm group w-full rounded-md border border-[#E5DFD5] bg-white p-3 text-left transition-all hover:scale-[1.02] hover:border-blue-400"
                              >
                                <span className="block font-mono text-[10px] tracking-wider text-rose-600 uppercase">
                                  {task.milestone}
                                </span>
                                <h4 className="mt-0.5 text-sm font-semibold text-[#18181B] group-hover:text-blue-700">
                                  {task.title}
                                </h4>
                                <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2 font-mono text-[11px] text-stone-500">
                                  <span>@{task.owner}</span>
                                  <span className="text-blue-600 group-hover:underline">
                                    Advance →
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* TAB 2: MONEY LEDGER */}
              {activeTab === 'ledger' && (
                <motion.div
                  key="ledger"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#18181B]">
                        Real Double-Entry Accounting // Balanced Journal
                      </h3>
                      <p className="font-mono text-sm text-stone-500">
                        Every invoice automatically posts balanced debits and credits. When paid,
                        developer project shares and sales commissions compute immediately.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <InkStamp label="PAID" variant="emerald" rotation={-2} className="text-xs" />
                      <InkStamp label="CR = DR" variant="cobalt" rotation={1} className="text-xs" />
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-lg border border-[#E5DFD5] bg-white p-6">
                    <LedgerLines lineSpacing={36} marginRule={true} />
                    <div className="relative z-10 space-y-4 pl-8 sm:pl-12">
                      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                        <span className="font-mono text-xs font-bold text-stone-700 uppercase">
                          JOURNAL ENTRY #2094 · INVOICE #14 PAYMENT (ACME CORP)
                        </span>
                        <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-sm font-extrabold text-emerald-700">
                          BALANCED: $12,000.00
                        </span>
                      </div>

                      <div className="space-y-2 font-mono text-sm">
                        <div className="flex justify-between bg-white/70 py-1">
                          <span className="text-stone-900">DR · 1010 Operating Bank (Mercury)</span>
                          <span className="font-bold text-stone-900">$12,000.00</span>
                        </div>
                        <div className="flex justify-between bg-white/70 py-1 pl-6 text-blue-700">
                          <span>CR · 2100 Musa Khan · Lead Developer Project Share (25%)</span>
                          <span className="font-semibold">$3,000.00</span>
                        </div>
                        <div className="flex justify-between bg-white/70 py-1 pl-6 text-amber-800">
                          <span>CR · 2105 Sara Chen · Sales Deal Commission (5%)</span>
                          <span className="font-semibold">$600.00</span>
                        </div>
                        <div className="flex justify-between bg-white/70 py-1 pl-6 text-emerald-800">
                          <span>CR · 4000 Agency Retained Creative Revenue</span>
                          <span className="font-bold">$8,400.00</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between border-t-2 border-stone-800 pt-3 font-mono text-sm font-extrabold">
                        <span>TOTAL BALANCED DEBITS &amp; CREDITS</span>
                        <span>$12,000.00 = $12,000.00</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: AMBER EYE WIRE */}
              {activeTab === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#18181B]">
                        The Amber Eye // Zero Accidental Client Leaks
                      </h3>
                      <p className="font-mono text-sm text-stone-500">
                        Every project has two separate channels. Internal team chat has complete
                        privacy. Client channels display a prominent Amber Eye badge so nobody
                        forgets who is in the room.
                      </p>
                    </div>
                    <span className="flex items-center gap-1.5 rounded border border-amber-300 bg-amber-100 px-2.5 py-1 font-mono text-xs font-bold text-amber-700">
                      <Eye className="h-3.5 w-3.5" />
                      <span>CLIENT READS THIS</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Internal Channel */}
                    <div className="rounded-lg border border-stone-300 bg-[#FAF8F5] p-4">
                      <div className="mb-3 flex items-center justify-between border-b pb-2 font-mono text-xs font-bold text-stone-600">
                        <span>#acme-rebrand-internal</span>
                        <span className="text-[11px] text-stone-400">Team Only</span>
                      </div>
                      <div className="space-y-3 font-sans text-sm">
                        <div className="rounded border border-stone-200 bg-white p-2.5">
                          <p className="text-xs font-semibold text-stone-800">Musa Khan</p>
                          <p className="mt-0.5 text-stone-700">
                            Hero render done. Do we show them the revised pricing model now or wait?
                          </p>
                        </div>
                        <div className="rounded border border-stone-200 bg-white p-2.5">
                          <p className="text-xs font-semibold text-stone-800">Sara Chen</p>
                          <p className="mt-0.5 text-stone-700">
                            Hold off until Friday demo. Let's finish the mobile responsiveness
                            first.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Client Channel with Amber Eye */}
                    <div className="rounded-lg border-2 border-amber-300 bg-amber-50/40 p-4">
                      <div className="mb-3 flex items-center justify-between border-b border-amber-200 pb-2 font-mono text-xs font-bold text-amber-900">
                        <span className="flex items-center gap-1.5">
                          <Eye className="h-4 w-4 text-amber-600" />
                          <span>#acme-with-client</span>
                        </span>
                        <span className="rounded bg-amber-200 px-2 py-0.5 text-[10px] text-amber-900">
                          CLIENT PORTAL LIVE
                        </span>
                      </div>
                      <div className="space-y-3 font-sans text-sm">
                        <div className="rounded border border-amber-200 bg-white p-2.5">
                          <p className="text-xs font-semibold text-amber-950">
                            Rhea Kapoor (Acme Inc)
                          </p>
                          <p className="mt-0.5 text-stone-800">
                            Loving the new vector mark! Can we get the Figma token export link?
                          </p>
                        </div>
                        <div className="rounded border border-amber-200 bg-white p-2.5">
                          <p className="text-xs font-semibold text-amber-950">
                            Hammad (Agency Owner)
                          </p>
                          <p className="mt-0.5 text-stone-800">
                            Just dropped into the Documents tab! You can review and approve directly
                            in the portal.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: CONTRACT DESK */}
              {activeTab === 'sign' && (
                <motion.div
                  key="sign"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#18181B]">
                        Client Portal Document Signing // Notary Not Required
                      </h3>
                      <p className="font-mono text-sm text-stone-500">
                        Send contracts, milestones, and proposals. Clients sign directly on the web
                        or phone. Try clicking to sign below!
                      </p>
                    </div>
                    {signedDoc ? (
                      <InkStamp
                        label="SIGNED &amp; RATIFIED"
                        variant="emerald"
                        rotation={-3}
                        className="text-xs"
                      />
                    ) : (
                      <InkStamp
                        label="AWAITING SIGNATURE"
                        variant="vermilion"
                        rotation={2}
                        className="text-xs"
                      />
                    )}
                  </div>

                  <div className="paper-shadow mx-auto max-w-xl rounded-lg border-2 border-stone-300 bg-white p-6">
                    <div className="mb-4 border-b border-stone-200 pb-3">
                      <span className="font-mono text-xs font-bold tracking-wider text-rose-600 uppercase">
                        PROJECT MASTER SERVICES AGREEMENT #PSA-88
                      </span>
                      <h4 className="mt-1 text-lg font-bold text-[#18181B]">
                        Acme Inc · Full Stack Platform Overhaul
                      </h4>
                    </div>

                    <p className="font-serif text-sm leading-relaxed text-stone-600">
                      "By executing this milestone agreement, Acme Inc authorizes Prismark Studio to
                      proceed with Sprint Phase 01. Invoicing occurs automatically via double-entry
                      journal upon milestone completion."
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-dashed border-stone-300 pt-4">
                      <div>
                        <span className="block font-mono text-[11px] text-stone-400">
                          AUTHORIZED CLIENT SIGNATORY
                        </span>
                        {signedDoc ? (
                          <div className="mt-1 font-handwritten text-3xl text-blue-700 select-none">
                            Rhea Kapoor
                          </div>
                        ) : (
                          <div className="mt-2 font-mono text-xs text-stone-400 italic">
                            [Awaiting digital ink click]
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSignedDoc(!signedDoc)
                          triggerToast(
                            signedDoc ? 'Signature revoked' : 'Contract signed & posted to ledger!',
                          )
                        }}
                        className={`rounded-md px-4 py-2 font-mono text-xs font-bold shadow-sm transition-all ${
                          signedDoc
                            ? 'border border-emerald-300 bg-emerald-100 text-emerald-800'
                            : 'bg-rose-600 text-white hover:bg-rose-700 active:scale-95'
                        }`}
                      >
                        {signedDoc ? '✓ Signed (Click to reset)' : '✍️ Click to Sign with Ink'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: PIPELINE CRM */}
              {activeTab === 'pipeline' && (
                <motion.div
                  key="pipeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#18181B]">
                        Agency Pipeline // Deals Flow Directly Into Projects
                      </h3>
                      <p className="font-mono text-sm text-stone-500">
                        Track opportunities through Lead, Contacted, Proposal, and Won. When you
                        mark a deal Won, Prismark automatically provisions the project repository,
                        channels, and milestones.
                      </p>
                    </div>
                    <span className="rounded border border-purple-300 bg-purple-100 px-2.5 py-1 font-mono text-xs font-bold text-purple-700">
                      PIPELINE TOTAL: $84,500
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      {
                        stage: '1. Lead',
                        count: 3,
                        val: '$18,000',
                        deal: 'Orbit AI · Brand Site',
                        client: 'Dr. Vance',
                      },
                      {
                        stage: '2. Contacted',
                        count: 2,
                        val: '$24,000',
                        deal: 'Veloce · iOS Design',
                        client: 'Elena Rostova',
                      },
                      {
                        stage: '3. Proposal',
                        count: 1,
                        val: '$12,500',
                        deal: 'Pinecone · Web App',
                        client: 'Mark S.',
                      },
                      {
                        stage: '4. Won',
                        count: 2,
                        val: '$30,000',
                        deal: 'Acme Inc · Full Rebrand',
                        client: 'Rhea Kapoor',
                      },
                    ].map((stg) => (
                      <div
                        key={stg.stage}
                        className="rounded-lg border border-stone-200 bg-[#FAF8F5] p-3.5"
                      >
                        <div className="mb-3 flex items-center justify-between border-b pb-2 font-mono text-xs font-bold text-stone-800">
                          <span>{stg.stage}</span>
                          <span className="text-purple-700">{stg.val}</span>
                        </div>
                        <div className="paper-shadow-sm rounded-md border border-[#E5DFD5] bg-white p-3">
                          <span className="font-mono text-[10px] text-stone-400 uppercase">
                            CLIENT: {stg.client}
                          </span>
                          <h4 className="mt-0.5 text-sm font-bold text-[#18181B]">{stg.deal}</h4>
                          <div className="mt-2 font-mono text-xs font-semibold text-emerald-700">
                            Deal Value: {stg.val}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. FIELD NOTES & TESTIMONIALS (STICKY NOTES PINBOARD)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative border-t border-[#E5DFD5] bg-[#F8F5EE]/80 py-20 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-14">
          <SectionHeading
            tag="FIELD DISPATCHES"
            title="Voices from the Workshop"
            subtitle="Read direct dispatches from boutique agency founders who migrated from messy combinations of Linear, Slack, QuickBooks, and Notion."
            annotation="authentic studio reviews"
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, idx) => (
              <Testimonial
                key={idx}
                name={t.name}
                role={t.role}
                agency={t.agency}
                quote={t.quote}
                highlight={idx % 2 === 0 ? 'Verified Founder' : '5-Star Studio'}
              />
            ))}
          </div>

          {/* Big Stat Strip */}
          <div className="paper-shadow mt-16 rounded-xl border border-[#E5DFD5] bg-white p-8">
            <StatStrip
              stats={[
                {
                  label: 'Invoiced Through Ledger',
                  value: '$4.8M+',
                  detail: 'zero accounting leakage',
                  accent: 'emerald',
                },
                {
                  label: 'Completed Deliverables',
                  value: '14,200+',
                  detail: 'synced with GitHub',
                  accent: 'cobalt',
                },
                {
                  label: 'Avg Client Invoice Pay Time',
                  value: '< 14 hrs',
                  detail: 'via instant Stripe pay',
                  accent: 'amber',
                },
                {
                  label: 'Client Leak Accidents',
                  value: '0',
                  detail: 'guaranteed by Amber Eye',
                  accent: 'vermilion',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. PHYSICAL INTAKE MEMO / BOTTOM WAITLIST CTA
      ───────────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-5 py-20 md:px-14 md:py-32">
        <div className="paper-shadow-lg relative overflow-hidden rounded-2xl border-2 border-[#D8CEBE] bg-[#ECE4D8] p-8 sm:p-14">
          <div className="absolute -top-3 left-10">
            <WashiTape variant="mint" rotation={-1.5} className="scale-90" />
          </div>

          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded border border-stone-300 bg-white/80 px-3 py-1 font-mono text-xs font-bold text-stone-700">
              <span>PRISMARK MEMORANDUM // 2026</span>
            </div>

            <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-[#18181B] sm:text-5xl">
              Ready to retire the spreadsheet circus?
            </h2>

            <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
              Join the private waitlist for early agency onboarding. Workspaces established during
              early access receive lifetime priority support and locked-in early rates.
            </p>

            <form
              onSubmit={handleWaitlistSubmit}
              className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="founder@youragency.com"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                className="paper-shadow-sm flex-1 rounded-md border border-[#C8BEAD] bg-white px-4 py-3 text-sm text-[#18181B] placeholder:text-stone-400 focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-md bg-[#18181B] px-6 py-3 font-mono text-sm font-bold text-[#FBF9F4] shadow-md transition-all hover:bg-stone-800 active:scale-95"
              >
                <span>Dispatch Access Request</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-4 flex items-center gap-2">
              <InkStamp
                label="EARLY BIRD TIER"
                variant="vermilion"
                rotation={-2}
                className="text-[10px]"
              />
              <span className="font-handwritten text-lg text-stone-600">
                we onboard agencies in rolling batches of 10
              </span>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
