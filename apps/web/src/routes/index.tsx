import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Eye,
  FileCheck,
  FolderGit2,
  Lock,
  Scale,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'

import { AgencyLogos } from '@/components/brand/agency-logos'
import { ClientPortalPreview } from '@/components/interactive/client-portal-preview'
import { CommandPalette } from '@/components/interactive/command-palette'
import { InteractiveSprintCanvas } from '@/components/interactive/interactive-sprint-canvas'
import { StackCostCalculator } from '@/components/interactive/stack-cost-calculator'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Prismark — The Operating System for Craft Studios' },
      {
        name: 'description',
        content:
          'Unified edge workspace for software agencies, design consultancies, and craft studios. Sprint tracking, client air-gap portals, and double-entry accounting in one runtime.',
      },
    ],
  }),
  component: HomePage,
})

export function HomePage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 pb-28 md:px-14">
        {/* Hero Section */}
        <section className="mx-auto mb-16 max-w-4xl space-y-8 text-center sm:mb-24">
          {/* Subtle Announcement Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-medium text-orange-600 dark:text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Prismark 2.0 Engine Live on Cloudflare Global Edge</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl leading-[1.06] font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
            The operating system for{' '}
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-blue-500 bg-clip-text text-transparent">
              craft studios.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
            Replace the fragmented circus of Linear, Slack, QuickBooks, and DocuSign with one
            unified workspace for sprint execution, client air-gaps, and balanced double-entry
            accounting.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
            <Link
              to="/access"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 font-mono text-xs font-bold text-white shadow-xl shadow-orange-600/20 transition-all hover:scale-[1.02] hover:bg-orange-500 sm:w-auto"
            >
              <span>Request Studio Access</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/product"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-mono text-xs font-semibold text-slate-800 transition-colors hover:border-slate-400 sm:w-auto dark:border-white/[0.12] dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-white/[0.2]"
            >
              <span>Explore Platform Tour</span>
            </Link>
          </div>

          {/* Raycast-Inspired Command Palette Trigger Bar */}
          <div className="pt-6">
            <CommandPalette />
          </div>
        </section>

        {/* Agency Partner Marks */}
        <section className="mb-24 border-y border-slate-200 py-10 dark:border-white/[0.08]">
          <div className="mb-6 text-center">
            <span className="font-mono text-xs tracking-widest text-slate-400 uppercase dark:text-slate-500">
              Trusted by engineering consultancies and design studios globally
            </span>
          </div>
          <AgencyLogos />
        </section>

        {/* Interactive Sprint & Retainer Canvas */}
        <section className="mb-28">
          <div className="mb-8 max-w-2xl">
            <span className="font-mono text-xs font-bold tracking-wider text-orange-600 uppercase dark:text-orange-400">
              Live Operating Canvas
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              Sprint velocity linked directly to client deliverables.
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-400">
              Inspect active tickets, milestone burn-up curves, and retainer health in real-time.
              Click through stages below:
            </p>
          </div>

          <InteractiveSprintCanvas />
        </section>

        {/* 4 Core Pillars Bento Grid */}
        <section className="mb-28">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="font-mono text-xs font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
              System Capabilities
            </span>
            <h2 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-5xl dark:text-white">
              Everything your agency needs. Nothing you don&apos;t.
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base dark:text-slate-400">
              Designed around the real lifecycle of software and brand studios.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
            {/* Bento Card 1: Flight Desk */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-lg lg:col-span-7 dark:border-white/[0.08] dark:bg-[#0D111A]">
              <div>
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <FolderGit2 className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  Sprint Flight Desk with GitHub Bi-Directional Sync
                </h3>
                <p className="mb-6 font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Engineers link tasks to PRs and branch names. Merging code triggers Cloudflare
                  edge webhooks, advances task stages, and logs deliverable progress for the client
                  without manual updates.
                </p>

                <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950/60">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <span>Strict 1-level subtask tree prevents endless nesting</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <span>Open-to-anyone pool for available staff and contractors</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 font-mono text-xs text-orange-600 dark:border-white/[0.06] dark:text-orange-400">
                <Link
                  to="/product"
                  className="flex items-center gap-1 font-semibold hover:underline"
                >
                  <span>Learn about Flight Desk</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 2: Client Chambers */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-lg lg:col-span-5 dark:border-white/[0.08] dark:bg-[#0D111A]">
              <div>
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  Client Chambers &amp; Air-Gap Portal
                </h3>
                <p className="mb-6 font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Provide enterprise clients with a custom-domain white-label portal while keeping
                  contractor profit margins and internal developer PR banter mathematically
                  air-gapped.
                </p>

                <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950/60">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Lock className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                    <span>Zero risk of accidental internal Slack message leaks</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <FileCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>In-portal SOW digital signing desk with PDF watermarks</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 font-mono text-xs text-blue-600 dark:border-white/[0.06] dark:text-blue-400">
                <Link
                  to="/product"
                  className="flex items-center gap-1 font-semibold hover:underline"
                >
                  <span>Learn about Client Chambers</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 3: Money Engine */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-lg lg:col-span-6 dark:border-white/[0.08] dark:bg-[#0D111A]">
              <div>
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Scale className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  Append-Only Double-Entry Money Engine
                </h3>
                <p className="mb-6 font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Every retainer milestone generates immutable, balanced debit and credit entries
                  with integer minor-unit math. Automatic contractor profit splits disburse as soon
                  as Stripe clears.
                </p>

                <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950/60">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span>Developer Milestone Share:</span>
                    <span className="font-bold text-orange-500">35% ($5,250.00)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span>Studio Net Retained Cash:</span>
                    <span className="font-bold text-emerald-500">65% ($9,750.00)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 font-mono text-xs text-emerald-600 dark:border-white/[0.06] dark:text-emerald-400">
                <Link
                  to="/product"
                  className="flex items-center gap-1 font-semibold hover:underline"
                >
                  <span>Learn about Money Engine</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 4: Edge Runtime */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-lg lg:col-span-6 dark:border-white/[0.08] dark:bg-[#0D111A]">
              <div>
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  Zero Cold Starts &amp; Cryptographic Sovereignty
                </h3>
                <p className="mb-6 font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Deployed across 310+ Cloudflare edge nodes with D1 SQLite replication. Sub-20ms
                  response times worldwide with zero third-party AI scraping covenants.
                </p>

                <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950/60">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                    <span>Contractual pledge: Zero LLM training on confidential code</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Zap className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                    <span>WebCrypto 6-digit passwordless OTP authentication</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 font-mono text-xs text-purple-600 dark:border-white/[0.06] dark:text-purple-400">
                <Link
                  to="/product"
                  className="flex items-center gap-1 font-semibold hover:underline"
                >
                  <span>Explore Edge Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Interactive Air-Gap Simulator */}
        <section className="mb-28">
          <div className="mb-8 max-w-2xl">
            <span className="font-mono text-xs font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
              Interactive Privacy Demo
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              Toggle between Studio View and Client View.
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-400">
              See firsthand how Prismark maintains strict database isolation between internal staff
              banter and client deliverables:
            </p>
          </div>

          <ClientPortalPreview />
        </section>

        {/* Interactive Stack Cost Calculator */}
        <section className="mb-28">
          <StackCostCalculator />
        </section>

        {/* Testimonials / Field Quotes */}
        <section className="mb-28 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 sm:p-14 dark:border-white/[0.08] dark:bg-[#0A0D15]/80">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <div className="font-mono text-xs font-bold tracking-wider text-orange-500 uppercase">
              Verified Studio Dispatches
            </div>
            <blockquote className="font-sans text-xl leading-relaxed font-medium text-slate-900 sm:text-2xl dark:text-white">
              &quot;We replaced Linear, Slack guest channels, and Sunday evening spreadsheet
              reconciliation with Prismark. The client air-gap alone saved our agency from an
              embarrassing confidential margin leak.&quot;
            </blockquote>
            <div className="pt-2">
              <div className="text-sm font-bold text-slate-900 dark:text-white">Marcus Vance</div>
              <div className="font-mono text-xs text-slate-500">
                Founding Partner · Meridian Labs
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-[#0B0F19] to-slate-950 p-8 shadow-2xl sm:p-14 md:flex-row">
          <div className="max-w-xl space-y-2">
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to unify your studio operations?
            </h3>
            <p className="text-sm text-slate-300">
              Onboard your team and migrate existing client retainers in under 15 minutes.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
            <Link
              to="/access"
              className="w-full rounded-xl bg-orange-600 px-6 py-3.5 text-center font-mono text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-500 sm:w-auto"
            >
              Request Early Studio Key →
            </Link>
          </div>
        </section>
      </div>
    </MarketingLayout>
  )
}
