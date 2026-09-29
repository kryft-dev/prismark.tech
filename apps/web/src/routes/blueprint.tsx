import { createFileRoute, Link } from '@tanstack/react-router'
import { Cpu } from 'lucide-react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/blueprint')({
  head: () => ({
    meta: [
      { title: 'Operating Blueprint & Architecture — Prismark' },
      {
        name: 'description',
        content:
          'Technical specifications of the Prismark agency runtime, D1 edge database, and zero-leak state machine.',
      },
    ],
  }),
  component: BlueprintPage,
})

const architecturalSpecs = [
  {
    code: 'SYS-01',
    name: 'Unified Workspace & Membership Tenancy',
    domain: 'AUTH & ACCESS',
    desc: 'Every person inside Prismark holds a Membership linked to an actor role (Owner, Admin, Staff, or Client). Database queries strictly filter by workspace membership ID, guaranteeing complete multi-tenant cryptographic isolation.',
    bullets: [
      '30-day sliding sessions with instant universal revocation',
      'Passwordless cryptographic OTP with zero stored password hashes',
      'Role-based permissions with automatic client air-gapping',
    ],
    tag: 'D1 SQLITE SCHEMA',
  },
  {
    code: 'SYS-02',
    name: 'GitHub Bi-Directional Issue Sync',
    domain: 'PROJECTS & SPRINT',
    desc: 'Tasks link directly to GitHub PRs and issues. When an engineer merges code on GitHub, Prismark captures the webhook, updates the milestone progress bar, and logs the completion in the client portal.',
    bullets: [
      'Auto-close GitHub issues when task dragged to Done',
      'Subtask hierarchical tree with 1-level restriction',
      'Open-to-anyone pool for unassigned agency tickets',
    ],
    tag: 'EDGE WEBHOOKS',
  },
  {
    code: 'SYS-03',
    name: 'Append-Only Double-Entry Ledger',
    domain: 'FINANCE & CASH',
    desc: 'Financial transactions never alter existing row balances. Every payment posts immutable balanced debit and credit journal entries with integer minor units, preventing rounding drift and audit discrepancies.',
    bullets: [
      'Automatic contractor project share splits (e.g. 25% to lead dev)',
      'Sales commission automated accruals upon Stripe payment settlement',
      'Full CSV/JSON journal export formatted for certified accountants',
    ],
    tag: 'STRICT DOUBLE-ENTRY',
  },
  {
    code: 'SYS-04',
    name: 'Dual-Perimeter Amber Eye Comms',
    domain: 'REAL-TIME COMMS',
    desc: 'Each project contains two distinct channels: #project-internal (team only) and #project-with-client (client channel). Client channels display an unmistakable glowing Amber Eye banner to prevent accidental secret leakage.',
    bullets: [
      'Zero client visibility into internal chats or ticket comments',
      'Real-time WebSockets / Durable Objects push delivery',
      'Interactive document approval and signed PDF delivery',
    ],
    tag: 'AIR-GAP ENFORCEMENT',
  },
]

export function BlueprintPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        {/* Blueprint Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-blue-400">
            <Cpu className="h-3.5 w-3.5" />
            <span>ARCHITECTURE // RUNTIME SPECIFICATION</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-foreground sm:text-6xl">
            The engineering blueprint of a{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-orange-400 bg-clip-text text-transparent">
              leak-proof studio.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-stone-400 sm:text-lg">
            Deep dive into the database schema, edge synchronization mechanics, and architectural
            covenants that power Prismark across Cloudflare global infrastructure.
          </p>
        </div>

        {/* Architecture Spec Sheets */}
        <div className="space-y-8">
          {architecturalSpecs.map((spec) => (
            <div
              key={spec.code}
              className="relative overflow-hidden rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-6 shadow-xl backdrop-blur-md sm:p-10"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="rounded border border-orange-500/40 bg-orange-950/60 px-2 py-0.5 font-mono text-xs font-bold text-orange-400">
                    {spec.code}
                  </span>
                  <span className="font-mono text-xs font-bold tracking-wider text-stone-400 uppercase">
                    {spec.domain}
                  </span>
                </div>
                <InkStamp label={spec.tag} variant="cobalt" rotation={-1} className="text-[10px]" />
              </div>

              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <h2 className="mb-3 text-2xl font-bold text-white">{spec.name}</h2>
                  <p className="font-sans text-sm leading-relaxed text-stone-300 sm:text-base">
                    {spec.desc}
                  </p>
                </div>

                <div className="space-y-2.5 rounded-xl border border-stone-800 bg-[#070A12] p-5 font-mono text-xs lg:col-span-5">
                  <span className="mb-1 block text-[10px] font-bold text-stone-500 uppercase">
                    VERIFIED COVENANTS
                  </span>
                  {spec.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-stone-300">
                      <span className="font-bold text-emerald-400">✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edge Infrastructure Ribbon */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border-2 border-stone-800 bg-gradient-to-r from-[#0C1220] via-[#090D17] to-[#120D0A] p-8 shadow-2xl sm:p-12 md:flex-row">
          <div className="max-w-xl">
            <span className="font-mono text-xs font-bold tracking-wider text-cyan-400 uppercase">
              EDGE INFRASTRUCTURE
            </span>
            <h3 className="mt-1 text-2xl font-bold text-white">
              Zero Cold Starts. Global Cloudflare D1 Replicas.
            </h3>
            <p className="mt-2 text-sm text-stone-400">
              Every request executes at the closest edge datacenter to your client, ensuring
              sub-20ms response times worldwide.
            </p>
          </div>

          <Link
            to="/dispatch"
            className="shrink-0 rounded-md bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 font-mono text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            Provision Early Studio Key →
          </Link>
        </div>
      </div>
    </MarketingLayout>
  )
}
