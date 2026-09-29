import { createFileRoute } from '@tanstack/react-router'
import {
  CheckCircle2,
  Clock,
  Check,
  DollarSign,
  MessageCircle,
  FileText,
  Circle,
  CircleDot,
  ChevronDown,
} from 'lucide-react'
import { motion } from 'motion/react'

import { AgencyLogos } from '@/components/brand/agency-logos'
import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { DeckleEdge } from '@/components/graphics/deckle-edge'
import { HandDrawnArrow } from '@/components/graphics/hand-drawn-arrow'
import { HandDrawnCircle } from '@/components/graphics/hand-drawn-circle'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { LedgerLines } from '@/components/graphics/ledger-lines'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Annotation } from '@/components/shared/annotation'
import { SectionHeading } from '@/components/shared/section-heading'
import { StatStrip } from '@/components/shared/stat-strip'
import { Testimonial } from '@/components/shared/testimonial'
import { toast } from '@/components/ui/toast'
import { features } from '@/lib/data/features'
import { testimonials } from '@/lib/data/testimonials'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Prismark — The agency operating system' }] }),
  component: LandingPage,
})

function LandingPage() {
  const triggerToast = (msg: string) => {
    try {
      toast.add({ title: msg })
    } catch {
      // fallback
    }
  }

  return (
    <MarketingLayout>
      {/* 1. Hero */}
      <section className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-6 pt-32 pb-24 md:px-12">
        <BlueprintGrid />

        <div className="relative z-10 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[48px] leading-[1.1] font-semibold tracking-tight text-foreground md:text-[56px]"
          >
            The app your agency runs itself on.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-[20px] leading-relaxed text-[#A1A1A1]"
          >
            Projects, tasks, chat, clients, money, and a portal where clients see their side of it.
            One place. No spreadsheets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button className="rounded-md bg-foreground px-6 py-3 text-[15px] font-medium text-background transition-opacity hover:opacity-90">
              Join the waitlist
            </button>
            <button
              onClick={() =>
                document.getElementById('inbox')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="rounded-md border border-[#262626] bg-transparent px-6 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-[#1A1A1A]"
            >
              See how it works
            </button>

            <div className="ml-4 hidden items-center gap-3 md:flex">
              <HandDrawnArrow className="h-8 w-8 text-[#A1A1A1]" />
              <Annotation>everything in one place</Annotation>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 md:absolute md:right-12 md:bottom-24"
        >
          <img
            src="/mascot.png"
            alt="Prismark Mascot"
            className="h-[120px] w-[120px] object-contain opacity-90"
          />
        </motion.div>
      </section>

      {/* 2. Agency Logos */}
      <section className="mx-auto flex max-w-7xl flex-col items-center border-t border-[#1A1A1A] px-6 py-16 md:px-12 md:py-20">
        <Annotation className="mb-8">trusted by agencies who ship</Annotation>
        <AgencyLogos className="w-full max-w-5xl" />
      </section>

      <DeckleEdge />

      {/* 3. Product Preview — Inbox */}
      <section id="inbox" className="mx-auto max-w-4xl px-6 py-24 md:px-12">
        <SectionHeading
          title="Your inbox writes itself"
          subtitle="Everything that matters from across your agency, distilled into one sentence."
        />

        <div className="relative mt-12 pl-8">
          {/* Vertical spine */}
          <div className="absolute top-4 bottom-4 left-[23px] z-0 w-px bg-[#262626]"></div>

          <div className="relative z-10 space-y-12">
            {/* Entry 1 */}
            <div className="group flex items-start gap-6">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] text-[12px] font-medium text-foreground">
                AI
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[15px] text-foreground">
                    Acme Inc paid invoice 14, $12,000. Musa earns $3,000 as project share and Sara
                    $600 as commission.
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#3DD68C]">
                    <DollarSign className="h-3.5 w-3.5" /> paid via Stripe
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <button
                    onClick={() => triggerToast('Recorded in ledger')}
                    className="rounded-md border border-[#262626] px-3 py-1.5 text-[13px] transition-colors hover:bg-[#1A1A1A]"
                  >
                    Record in ledger
                  </button>
                  <span className="font-mono text-[12px] text-[#7D7D7D]">10m</span>
                </div>
              </div>
            </div>

            {/* Entry 2 */}
            <div className="group flex items-start gap-6">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] text-[12px] font-medium text-foreground">
                MK
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[15px] text-foreground">
                    Musa Khan finished "Homepage hero" and asked you to review it.
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#A1A1A1]">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Acme rebrand · Design milestone
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <button
                    onClick={() => triggerToast('Review opened')}
                    className="rounded-md border border-[#262626] px-3 py-1.5 text-[13px] transition-colors hover:bg-[#1A1A1A]"
                  >
                    Review
                  </button>
                  <span className="font-mono text-[12px] text-[#7D7D7D]">1h</span>
                </div>
              </div>
            </div>

            {/* Entry 3 */}
            <div className="group relative flex items-start gap-6">
              <div className="absolute top-6 -left-[140px] hidden md:block">
                <Annotation>one sentence, one action</Annotation>
                <HandDrawnArrow className="-mt-2 ml-24 h-6 w-6 rotate-12 text-[#A1A1A1]" />
              </div>

              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] text-[12px] font-medium text-foreground">
                PD
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[15px] text-foreground">
                    Pinecone Dental signed the proposal for "Booking site", $6,500.
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#3DD68C]">
                    <FileText className="h-3.5 w-3.5" /> signed by Rhea Kapoor
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <button
                    onClick={() => triggerToast('Project started')}
                    className="hover:bg-opacity-90 rounded-md border border-[#262626] bg-foreground px-3 py-1.5 text-[13px] text-background transition-colors"
                  >
                    Start project
                  </button>
                  <span className="font-mono text-[12px] text-[#7D7D7D]">2h</span>
                </div>
              </div>
            </div>

            {/* Entry 4 */}
            <div className="group flex items-start gap-6">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] text-[12px] font-medium text-foreground">
                OL
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[15px] text-foreground">
                    Orbit Labs has not paid invoice 9, $4,500. It was due 6 days ago.
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#FF6166]">
                    <Clock className="h-3.5 w-3.5" /> 6 days overdue
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <button
                    onClick={() => triggerToast('Reminder sent')}
                    className="rounded-md border border-[#262626] px-3 py-1.5 text-[13px] transition-colors hover:bg-[#1A1A1A]"
                  >
                    Send reminder
                  </button>
                  <span className="font-mono text-[12px] text-[#7D7D7D]">4h</span>
                </div>
              </div>
            </div>

            {/* Entry 5 */}
            <div className="group flex items-start gap-6">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] text-[12px] font-medium text-foreground">
                SA
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[15px] text-foreground">Sara Ali mentioned you in #sales.</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#A1A1A1]">
                    <MessageCircle className="h-3.5 w-3.5" /> "can we quote Bloom by Friday?"
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <button
                    onClick={() => triggerToast('Opening thread')}
                    className="rounded-md border border-[#262626] px-3 py-1.5 text-[13px] transition-colors hover:bg-[#1A1A1A]"
                  >
                    Reply
                  </button>
                  <span className="font-mono text-[12px] text-[#7D7D7D]">1d</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DeckleEdge />

      {/* 4. Product Preview — Task Board */}
      <section className="mx-auto max-w-7xl overflow-hidden px-6 py-24 md:px-12">
        <div className="mx-auto mb-12 flex max-w-4xl items-end justify-between">
          <SectionHeading
            title="Drag the work, not the process"
            subtitle="Built for agencies, connected to the tools you use."
            className="mb-0"
          />
          <div className="hidden flex-col items-center md:flex">
            <Annotation>syncs with GitHub</Annotation>
            <HandDrawnArrow className="mt-2 h-6 w-6 rotate-90 text-[#A1A1A1]" />
          </div>
        </div>

        {/* Mobile View: Single Column */}
        <div className="md:hidden">
          <div className="mb-6 flex items-center justify-between border-b border-[#262626] pb-4">
            <h3 className="flex items-center gap-2 text-[15px] font-medium">
              <Circle className="h-3 w-3 text-[#52A8FF]" /> Doing
            </h3>
            <div className="flex items-center gap-2 text-[14px] text-[#7D7D7D]">
              2 <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-3">
            {[
              { t: 'Homepage hero', m: 'Acme rebrand', i: 'MK', n: '#58', d: 'Today' },
              {
                t: 'Set up Next.js app and CI',
                m: 'Nova mobile app',
                i: 'JD',
                n: '#59',
                d: 'Oct 12',
              },
            ].map((task, i) => (
              <button
                key={i}
                type="button"
                className="group w-full cursor-pointer rounded-md border border-[#262626] bg-[#0A0A0A] p-4 text-left transition-colors hover:border-[#7D7D7D]"
                onClick={() => triggerToast(`Opened task ${task.n}`)}
              >
                <h4 className="mb-1 text-[16px] font-medium text-foreground">{task.t}</h4>
                <p className="mb-4 text-[14px] text-[#A1A1A1]">{task.m}</p>
                <div className="flex items-center justify-between">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] text-[11px] font-medium text-foreground">
                    {task.i}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] text-[#7D7D7D]">{task.d}</span>
                    <span className="font-mono text-[13px] text-[#7D7D7D]">{task.n}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop View: Kanban */}
        <div className="hidden grid-cols-4 gap-6 md:grid">
          {/* To Do */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-[15px] font-medium text-[#A1A1A1]">
                <Circle className="h-3 w-3 text-[#A1A1A1]" /> To do
              </h3>
              <span className="text-[13px] text-[#7D7D7D]">4</span>
            </div>
            <div className="space-y-3">
              {[
                { t: 'Type system', m: 'Acme rebrand', i: 'SA', n: '#60', d: 'Oct 14' },
                { t: 'Component sheet', m: 'Acme rebrand', i: 'SA', n: '#61', d: 'Oct 15' },
                { t: 'DNS and redirects', m: 'Nova mobile app', i: 'JD', n: '#62', d: 'Oct 16' },
                { t: 'Analytics', m: 'Orbit dashboard', i: 'MK', n: '#63', d: 'Oct 18' },
              ].map((task, i) => (
                <button
                  key={i}
                  type="button"
                  className="group w-full cursor-pointer rounded-md border border-[#262626] bg-[#0A0A0A] p-4 text-left transition-colors hover:border-[#7D7D7D]"
                  onClick={() => triggerToast(`Opened task ${task.n}`)}
                >
                  <h4 className="mb-1 text-[16px] font-medium text-foreground">{task.t}</h4>
                  <p className="mb-4 text-[14px] text-[#A1A1A1]">{task.m}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] text-[11px] font-medium text-foreground">
                      {task.i}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] text-[#7D7D7D]">{task.d}</span>
                      <span className="font-mono text-[13px] text-[#7D7D7D]">{task.n}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Doing */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-[15px] font-medium text-foreground">
                <CircleDot className="h-3 w-3 text-[#52A8FF]" /> Doing
              </h3>
              <span className="text-[13px] text-[#7D7D7D]">2</span>
            </div>
            <div className="space-y-3">
              {[
                { t: 'Homepage hero', m: 'Acme rebrand', i: 'MK', n: '#58', d: 'Today' },
                {
                  t: 'Set up Next.js app and CI',
                  m: 'Nova mobile app',
                  i: 'JD',
                  n: '#59',
                  d: 'Oct 12',
                },
              ].map((task, i) => (
                <button
                  key={i}
                  type="button"
                  className="group w-full cursor-pointer rounded-md border border-[#262626] bg-[#111] p-4 text-left transition-colors hover:border-[#7D7D7D]"
                  onClick={() => triggerToast(`Opened task ${task.n}`)}
                >
                  <h4 className="mb-1 text-[16px] font-medium text-foreground">{task.t}</h4>
                  <p className="mb-4 text-[14px] text-[#A1A1A1]">{task.m}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] text-[11px] font-medium text-foreground">
                      {task.i}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] text-[#7D7D7D]">{task.d}</span>
                      <span className="font-mono text-[13px] text-[#7D7D7D]">{task.n}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* In Review */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-[15px] font-medium text-[#A1A1A1]">
                <Clock className="h-3 w-3 text-[#F5A623]" /> In review
              </h3>
              <span className="text-[13px] text-[#7D7D7D]">2</span>
            </div>
            <div className="space-y-3">
              {[
                { t: 'Logo directions', m: 'Acme rebrand', i: 'SA', n: '#56', d: 'Oct 10' },
                { t: 'Fix crash on sign-in', m: 'Nova mobile app', i: 'JD', n: '#57', d: 'Oct 10' },
              ].map((task, i) => (
                <button
                  key={i}
                  type="button"
                  className="group w-full cursor-pointer rounded-md border border-[#262626] bg-[#0A0A0A] p-4 text-left transition-colors hover:border-[#7D7D7D]"
                  onClick={() => triggerToast(`Opened task ${task.n}`)}
                >
                  <h4 className="mb-1 text-[16px] font-medium text-foreground">{task.t}</h4>
                  <p className="mb-4 text-[14px] text-[#A1A1A1]">{task.m}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] text-[11px] font-medium text-foreground">
                      {task.i}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] text-[#7D7D7D]">{task.d}</span>
                      <span className="font-mono text-[13px] text-[#7D7D7D]">{task.n}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Done */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-[15px] font-medium text-[#A1A1A1]">
                <CheckCircle2 className="h-3 w-3 text-[#3DD68C]" /> Done
              </h3>
              <span className="text-[13px] text-[#7D7D7D]">3</span>
            </div>
            <div className="space-y-3 opacity-60 transition-opacity hover:opacity-100">
              {[
                { t: 'Homepage', m: 'Orbit dashboard', i: 'MK', n: '#46', d: 'Oct 5' },
                { t: 'Case study template', m: 'Acme rebrand', i: 'SA', n: '#47', d: 'Oct 4' },
                { t: 'Moodboard', m: 'Acme rebrand', i: 'SA', n: '#48', d: 'Oct 2' },
              ].map((task, i) => (
                <button
                  key={i}
                  type="button"
                  className="group w-full cursor-pointer rounded-md border border-[#262626] bg-[#0A0A0A] p-4 text-left transition-colors hover:border-[#7D7D7D]"
                  onClick={() => triggerToast(`Opened task ${task.n}`)}
                >
                  <h4 className="mb-1 text-[16px] font-medium text-[#A1A1A1] line-through">
                    {task.t}
                  </h4>
                  <p className="mb-4 text-[14px] text-[#7D7D7D]">{task.m}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] text-[11px] font-medium text-foreground">
                      {task.i}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] text-[#7D7D7D]">{task.d}</span>
                      <span className="font-mono text-[13px] text-[#7D7D7D]">{task.n}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product Preview — Money */}
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-12">
        <SectionHeading
          title="Every dollar, double-entry"
          subtitle="Real-time visibility into project profitability without waiting for accounting."
        />

        <StatStrip
          className="mb-12"
          stats={[
            { label: 'Cash in', value: '$31,500' },
            { label: 'Outstanding', value: '$24,500' },
            { label: 'Overdue', value: '$4,500' },
            { label: 'Owed to team', value: '$12,300' },
          ]}
        />

        <div className="relative overflow-hidden rounded-md border border-[#262626] bg-[#0A0A0A]">
          <LedgerLines lineSpacing={48} />

          <div className="flex items-center justify-between border-b border-[#262626] bg-[#0A0A0A] px-6 py-4">
            <h3 className="text-[15px] font-medium">By project, this month</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-[15px]">
              <thead>
                <tr className="text-[13px] text-[#A1A1A1]">
                  <th className="h-[48px] px-6 py-4 font-normal">Project</th>
                  <th className="h-[48px] px-6 py-4 text-right font-normal">Invoiced</th>
                  <th className="relative h-[48px] px-6 py-4 text-right font-normal">
                    Paid
                    <div className="absolute -top-1 -right-4 hidden md:block">
                      <InkStamp
                        label="PAID"
                        variant="success"
                        className="origin-bottom-left scale-75"
                      />
                    </div>
                  </th>
                  <th className="h-[48px] px-6 py-4 text-right font-normal">Spent</th>
                  <th className="h-[48px] px-6 py-4 text-right font-normal">Team share</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                <tr className="h-[48px] border-b border-[#262626]/50">
                  <td className="px-6 py-2 text-foreground">Acme rebrand</td>
                  <td className="px-6 py-2 text-right text-foreground">$24,000</td>
                  <td className="px-6 py-2 text-right text-foreground">$12,000</td>
                  <td className="px-6 py-2 text-right text-[#A1A1A1]">$340</td>
                  <td className="px-6 py-2 text-right text-[#A1A1A1]">$3,600</td>
                </tr>
                <tr className="h-[48px] border-b border-[#262626]/50">
                  <td className="px-6 py-2 text-foreground">Nova mobile app</td>
                  <td className="px-6 py-2 text-right text-foreground">$8,000</td>
                  <td className="px-6 py-2 text-right text-foreground">$16,000</td>
                  <td className="px-6 py-2 text-right text-[#A1A1A1]">$1,180</td>
                  <td className="px-6 py-2 text-right text-[#A1A1A1]">$4,200</td>
                </tr>
                <tr className="relative h-[48px] border-b border-[#262626]/50">
                  <td className="px-6 py-2 text-foreground">Orbit dashboard</td>
                  <td className="relative px-6 py-2 text-right text-[#FF6166]">
                    $4,500
                    <div className="absolute top-1/2 left-1/2 -ml-1 h-8 w-16 -translate-x-1/2 -translate-y-1/2">
                      <HandDrawnCircle color="#FF6166" />
                    </div>
                  </td>
                  <td className="px-6 py-2 text-right text-foreground">$3,500</td>
                  <td className="px-6 py-2 text-right text-[#A1A1A1]">$600</td>
                  <td className="px-6 py-2 text-right text-[#A1A1A1]">$1,050</td>
                </tr>
                <tr className="h-[48px]">
                  <td className="px-6 py-2 text-foreground">Prismark itself</td>
                  <td className="px-6 py-2 text-right text-[#A1A1A1]">-</td>
                  <td className="px-6 py-2 text-right text-[#A1A1A1]">-</td>
                  <td className="px-6 py-2 text-right text-[#A1A1A1]">$4,000</td>
                  <td className="px-6 py-2 text-right text-[#A1A1A1]">-</td>
                </tr>
              </tbody>
              <tfoot className="border-t border-[#262626] bg-[#111] font-medium tabular-nums">
                <tr className="h-[48px]">
                  <td className="px-6 py-2 text-foreground">Total</td>
                  <td className="px-6 py-2 text-right text-foreground">$36,500</td>
                  <td className="px-6 py-2 text-right text-foreground">$31,500</td>
                  <td className="px-6 py-2 text-right text-foreground">$6,120</td>
                  <td className="px-6 py-2 text-right text-foreground">$8,850</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Annotation className="flex items-center gap-2 text-[#FF6166]">
            <HandDrawnArrow
              direction="curved-right"
              className="mr-2 h-5 w-5 -scale-y-100 -rotate-90"
            />
            chase this one
          </Annotation>
        </div>
      </section>

      {/* 6. Product Preview — Client Portal */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-12">
        <SectionHeading
          title="What your clients see"
          subtitle="A premium, white-labeled experience that keeps them in the loop and out of your inbox."
        />

        <div className="relative mt-12">
          <div className="absolute -top-12 -right-8 hidden flex-col items-end md:flex">
            <Annotation>no tasks, no internal chat, just their project</Annotation>
            <HandDrawnArrow direction="down" className="mt-2 mr-12 h-6 w-6 text-[#A1A1A1]" />
          </div>

          <div className="flex min-h-[500px] flex-col overflow-hidden rounded-lg border border-[#262626] bg-[#0A0A0A] md:flex-row">
            {/* Sidebar */}
            <div className="flex w-full flex-col gap-6 border-b border-[#262626] p-4 md:w-[240px] md:border-r md:border-b-0">
              <div>
                <h3 className="text-[16px] font-semibold text-foreground">Prismark</h3>
                <p className="text-[13px] text-[#A1A1A1]">for Acme Inc</p>
              </div>

              <div className="space-y-1">
                <div className="rounded-md bg-[#1A1A1A] px-3 py-2 text-[14px] font-medium text-foreground">
                  Overview
                </div>
                <div className="flex justify-between rounded-md px-3 py-2 text-[14px] text-[#A1A1A1] hover:bg-[#1A1A1A]">
                  Messages{' '}
                  <span className="rounded bg-[#262626] px-1.5 py-0.5 text-[11px] text-foreground">
                    1
                  </span>
                </div>
                <div className="flex justify-between rounded-md px-3 py-2 text-[14px] text-[#A1A1A1] hover:bg-[#1A1A1A]">
                  Invoices{' '}
                  <span className="rounded bg-[#262626] px-1.5 py-0.5 text-[11px] text-foreground">
                    1
                  </span>
                </div>
                <div className="group relative flex cursor-pointer justify-between rounded-md px-3 py-2 text-[14px] text-[#A1A1A1] hover:bg-[#1A1A1A]">
                  Documents{' '}
                  <span className="rounded bg-[#262626] px-1.5 py-0.5 text-[11px] text-foreground">
                    1
                  </span>
                  <div className="absolute top-1 -right-8">
                    <InkStamp
                      label="SIGNED"
                      variant="success"
                      className="origin-left scale-[0.4]"
                    />
                  </div>
                </div>
                <div className="rounded-md px-3 py-2 text-[14px] text-[#A1A1A1] hover:bg-[#1A1A1A]">
                  Files
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-10">
              <div className="mb-10 flex items-center justify-between border-b border-[#262626] pb-6">
                <div>
                  <h2 className="text-[20px] font-semibold text-foreground">Acme rebrand</h2>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#3DD68C]"></span>
                    <span className="text-[13px] text-[#A1A1A1]">On track</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[13px] text-[#A1A1A1]">Budget</p>
                  <p className="mt-1 font-mono text-[15px] text-foreground">$24,000</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-[15px] font-medium text-foreground">Needs you</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-md border border-[#262626] p-4">
                      <div>
                        <p className="text-[14px] font-medium text-foreground">
                          Review Homepage hero
                        </p>
                        <p className="mt-1 text-[13px] text-[#A1A1A1]">Requested by Musa</p>
                      </div>
                      <button className="rounded bg-[#52A8FF] px-3 py-1.5 text-[13px] font-medium text-[#0A0A0A]">
                        Review
                      </button>
                    </div>
                    <div className="flex items-center justify-between rounded-md border border-[#262626] p-4">
                      <div>
                        <p className="text-[14px] font-medium text-foreground">Pay Invoice #14</p>
                        <p className="mt-1 text-[13px] text-[#A1A1A1]">Overdue by 2 days</p>
                      </div>
                      <button className="rounded bg-[#FF6166] px-3 py-1.5 text-[13px] font-medium text-[#0A0A0A]">
                        Pay $12k
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-[15px] font-medium text-foreground">Milestones</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#3DD68C]" />
                      <div className="flex-1">
                        <p className="text-[14px] text-foreground">Discovery & Strategy</p>
                      </div>
                      <span className="text-[13px] text-[#A1A1A1]">Completed Oct 1</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CircleDot className="h-5 w-5 text-[#52A8FF]" />
                      <div className="flex-1">
                        <p className="text-[14px] text-foreground">Brand Identity</p>
                        <div className="mt-2 h-1 w-full rounded-full bg-[#1A1A1A]">
                          <div className="h-full w-3/4 rounded-full bg-[#52A8FF]"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 opacity-50">
                      <Circle className="h-5 w-5 text-[#7D7D7D]" />
                      <div className="flex-1">
                        <p className="text-[14px] text-foreground">Web Design</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 opacity-50">
                      <Circle className="h-5 w-5 text-[#7D7D7D]" />
                      <div className="flex-1">
                        <p className="text-[14px] text-foreground">Handoff</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DeckleEdge />

      {/* 7. Feature Walkthrough */}
      <section className="mx-auto max-w-3xl px-6 py-24 md:px-12">
        <SectionHeading
          title="Everything you need to run the business."
          subtitle="A complete operating system designed for how modern agencies actually work."
        />

        <div className="relative mt-16 space-y-24">
          <div className="absolute top-12 bottom-12 left-6 z-0 hidden w-px bg-gradient-to-b from-transparent via-[#262626] to-transparent md:block"></div>

          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:gap-16"
            >
              <div className="flex hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] md:flex">
                <span className="font-mono text-[16px] text-[#A1A1A1]">{idx + 1}</span>
              </div>

              <div>
                <h3 className="mb-3 text-[20px] font-semibold text-foreground">{feature.title}</h3>
                <p className="mb-4 text-[16px] font-medium text-[#EDEDED]">{feature.headline}</p>
                <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-[#A1A1A1]">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2 text-[14px] text-[#7D7D7D]">
                      <Check className="h-3.5 w-3.5 text-[#262626]" /> {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. Social Proof */}
      <section className="relative mx-auto max-w-4xl bg-[#0A0A0A] px-6 py-24 md:px-12">
        <BlueprintGrid />
        <SectionHeading title="Agencies shipping on Prismark" className="mx-auto text-center" />

        <div className="relative mx-auto mt-16 max-w-2xl space-y-16 pl-6">
          <div className="absolute top-4 bottom-4 left-[39px] z-0 w-px bg-[#262626]"></div>

          {testimonials.map((t, i) => (
            <div key={i} className="relative z-10 bg-[#0A0A0A] py-2">
              <Testimonial {...t} />
            </div>
          ))}
        </div>
      </section>

      {/* 9. Stats Strip */}
      <section className="mx-auto max-w-4xl border-t border-[#1A1A1A] px-6 py-20 md:px-12">
        <StatStrip
          stats={[
            { label: 'Agencies', value: '2,400+' },
            { label: 'Invoiced', value: '$180M' },
            { label: 'Countries', value: '12' },
          ]}
          className="justify-center text-center md:justify-between md:text-left"
        />
      </section>

      {/* 10. Bottom CTA */}
      <section className="relative mx-auto max-w-3xl overflow-hidden border-t border-[#1A1A1A] px-6 py-32 text-center md:px-12">
        <img
          src="/mascot.png"
          alt="Mascot"
          className="mx-auto mb-8 h-[96px] w-[96px] object-contain opacity-90"
        />

        <h2 className="mb-6 text-[32px] font-semibold text-foreground md:text-[40px]">
          Run the agency. Skip the spreadsheets.
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-[16px] text-[#A1A1A1]">
          Join the waitlist and be first to try Prismark when it opens.
        </p>

        <div className="flex flex-col items-center gap-4">
          <button className="rounded-md bg-foreground px-8 py-4 text-[16px] font-medium text-background transition-opacity hover:opacity-90">
            Join the waitlist
          </button>

          <div className="mt-4">
            <Annotation className="flex items-center gap-2">
              <HandDrawnArrow direction="up" className="h-5 w-5 text-[#A1A1A1]" />
              we'll email you when it's ready
            </Annotation>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
