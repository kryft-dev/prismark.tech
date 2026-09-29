import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, Scale, TrendingDown, X } from 'lucide-react'
import { useState } from 'react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/compare')({
  head: () => ({
    meta: [
      { title: 'Prismark vs The 6-Tool Agency Circus — Prismark' },
      {
        name: 'description',
        content:
          'Compare Prismark against the fragmented stack of Linear, Slack, QuickBooks, DocuSign, Notion, and client portal add-ons.',
      },
    ],
  }),
  component: ComparePage,
})

const circusTools = [
  {
    id: 'linear',
    name: 'Linear / Jira',
    role: 'Tasks & Sprints',
    pricePerUser: 14,
    defaultChecked: true,
  },
  {
    id: 'slack',
    name: 'Slack Pro',
    role: 'Internal Chat',
    pricePerUser: 12.5,
    defaultChecked: true,
  },
  {
    id: 'harvest',
    name: 'Harvest / QuickBooks',
    role: 'Time & Invoicing',
    pricePerUser: 15,
    defaultChecked: true,
  },
  {
    id: 'docusign',
    name: 'DocuSign Standard',
    role: 'SOW Signing',
    pricePerUser: 25,
    defaultChecked: true,
  },
  {
    id: 'notion',
    name: 'Notion Plus',
    role: 'Knowledge Base',
    pricePerUser: 12,
    defaultChecked: true,
  },
  {
    id: 'portal',
    name: 'Custom Portal (Copilot)',
    role: 'Client Air-Gap',
    pricePerUser: 29,
    defaultChecked: true,
  },
]

const comparisonMatrix = [
  {
    category: 'Architecture & Tenancy',
    prismark:
      'Unified D1 SQLite database. Single source of state for tasks, cash, and client chats.',
    circus: '6 separate databases, 6 auth providers, brittle Zapier webhooks that fail silently.',
  },
  {
    category: 'Client Air-Gap Security',
    prismark:
      'Database-level membership perimeter. Zero risk of internal slack chatter leaking to clients.',
    circus:
      'Manual Slack guest channels or third-party portal embedding with frequent permission leaks.',
  },
  {
    category: 'Contractor Profit Splits',
    prismark:
      'Native double-entry ledger automatically calculates contractor cuts upon invoice settlement.',
    circus:
      'Manual spreadsheet math by the founder on Sunday nights, cross-referencing Stripe and Harvest.',
  },
  {
    category: 'Code & SOW Association',
    prismark:
      'GitHub PR merges advance tasks, update milestone percentages, and notify client portal.',
    circus: 'Developers must update Jira ticket, post in Slack, and send client email manually.',
  },
  {
    category: 'Data Sovereignty & Privacy',
    prismark: 'Zero AI scraping. Cryptographic tenant isolation on Cloudflare global edge.',
    circus:
      '6 independent vendor terms of service, multiple vendors training models on confidential drafts.',
  },
]

export function ComparePage() {
  const [teamSize, setTeamSize] = useState(10)
  const [selectedTools, setSelectedTools] = useState<string[]>(circusTools.map((t) => t.id))

  const toggleTool = (id: string) => {
    if (selectedTools.includes(id)) {
      setSelectedTools(selectedTools.filter((t) => t !== id))
    } else {
      setSelectedTools([...selectedTools, id])
    }
  }

  const circusCostPerUser = circusTools
    .filter((t) => selectedTools.includes(t.id))
    .reduce((sum, t) => sum + t.pricePerUser, 0)

  const totalCircusMonthly = circusCostPerUser * teamSize
  const prismarkMonthly = teamSize * 49 // Pro tier
  const monthlySavings = Math.max(0, totalCircusMonthly - prismarkMonthly)
  const annualSavings = monthlySavings * 12

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-orange-400">
            <Scale className="h-3.5 w-3.5" />
            <span>EXECUTIVE BRIEF // ARCHITECTURE COMPARISON</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-foreground sm:text-6xl">
            End the multi-vendor subscription tax and{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">
              context switching circus.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-stone-400 sm:text-lg">
            Boutique studios spend thousands of dollars each month tying together disconnected SaaS
            tools with brittle glue code. Here is the mathematical reality of switching to Prismark.
          </p>
        </div>

        {/* Interactive Cost & Stack Calculator */}
        <div className="mb-16 rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-6 shadow-2xl sm:p-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                <span>The Stack Audit Calculator</span>
                <InkStamp
                  label="VERIFIED SAVINGS"
                  variant="success"
                  rotation={-2}
                  className="text-[10px]"
                />
              </h2>
              <p className="mt-1 text-xs text-stone-400">
                Select your studio team size and current software subscriptions:
              </p>
            </div>

            {/* Team Size Slider */}
            <div className="flex items-center gap-4 rounded-xl border border-stone-800 bg-[#070A12] px-4 py-2">
              <span className="font-mono text-xs text-stone-400">Team Size:</span>
              <span className="w-8 font-mono text-base font-bold text-orange-400">{teamSize}</span>
              <input
                type="range"
                min={3}
                max={50}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-28 cursor-pointer accent-orange-500"
              />
            </div>
          </div>

          {/* Current Tools Checklist */}
          <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {circusTools.map((tool) => {
              const active = selectedTools.includes(tool.id)
              return (
                <button
                  type="button"
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  aria-label={`Toggle ${tool.name} stack cost`}
                  className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                    active
                      ? 'border-orange-500/60 bg-orange-950/20 text-white'
                      : 'border-stone-800 bg-[#070A12] text-stone-500 hover:border-stone-700'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold">{tool.name}</div>
                    <div className="font-sans text-xs text-stone-400">{tool.role}</div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="font-bold">${tool.pricePerUser}</span>
                    <span className="text-stone-500">/mo</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Savings Tally Dashboard */}
          <div className="grid items-center gap-6 rounded-xl border border-stone-800 bg-[#06080E] p-6 sm:p-8 md:grid-cols-3">
            <div>
              <span className="mb-1 block font-mono text-xs text-stone-500 uppercase">
                Current Circus Stack Cost
              </span>
              <div className="font-mono text-3xl font-black text-rose-400 line-through">
                ${totalCircusMonthly.toLocaleString()}/mo
              </div>
              <span className="mt-1 block font-mono text-[11px] text-stone-500">
                ${(totalCircusMonthly * 12).toLocaleString()} billed per year
              </span>
            </div>

            <div>
              <span className="mb-1 block font-mono text-xs text-stone-500 uppercase">
                Prismark Studio Cost (Pro)
              </span>
              <div className="font-mono text-3xl font-black text-emerald-400">
                ${prismarkMonthly.toLocaleString()}/mo
              </div>
              <span className="mt-1 block font-mono text-[11px] text-stone-500">
                All 6 capabilities unified into 1 runtime
              </span>
            </div>

            <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/20 p-4">
              <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400 uppercase">
                <TrendingDown className="h-4 w-4" />
                <span>Annual Net Capital Saved</span>
              </span>
              <div className="mt-1 font-mono text-2xl font-black text-white sm:text-3xl">
                ${annualSavings.toLocaleString()}
              </div>
              <span className="mt-1 block text-[11px] text-stone-400">
                Plus zero Zapier maintenance and zero context switching tax.
              </span>
            </div>
          </div>
        </div>

        {/* Deep Architectural Matrix */}
        <div className="mb-16 rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-6 shadow-2xl sm:p-10">
          <div className="mb-6 border-b border-stone-800 pb-4">
            <h2 className="text-xl font-bold text-white">System Architecture Comparison</h2>
            <p className="mt-1 text-xs text-stone-400">
              Why an integrated SQLite runtime fundamentally outperforms multi-tenant SaaS glue:
            </p>
          </div>

          <div className="space-y-6">
            {comparisonMatrix.map((item, idx) => (
              <div
                key={idx}
                className="grid items-center gap-4 rounded-xl border border-stone-800/80 bg-[#070A12] p-5 lg:grid-cols-12"
              >
                <div className="lg:col-span-3">
                  <span className="block font-mono text-xs font-bold text-orange-400 uppercase">
                    {item.category}
                  </span>
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4 lg:col-span-5">
                  <div className="mb-1 flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
                    <Check className="h-4 w-4" />
                    <span>PRISMARK UNIFIED RUNTIME</span>
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-stone-300">
                    {item.prismark}
                  </p>
                </div>

                <div className="rounded-lg border border-rose-500/30 bg-rose-950/10 p-4 lg:col-span-4">
                  <div className="mb-1 flex items-center gap-2 font-mono text-xs font-bold text-rose-400">
                    <X className="h-4 w-4" />
                    <span>THE 6-TOOL STACK</span>
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-stone-400">{item.circus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border-2 border-stone-800 bg-gradient-to-r from-[#0C1220] via-[#090D17] to-[#120D0A] p-8 shadow-2xl sm:p-12 md:flex-row">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-white">
              Ready to consolidate your agency operating system?
            </h3>
            <p className="mt-2 text-sm text-stone-400">
              Import your existing tasks and client records in under 15 minutes.
            </p>
          </div>

          <Link
            to="/dispatch"
            className="shrink-0 rounded-md bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 font-mono text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            Switch to Prismark Today →
          </Link>
        </div>
      </div>
    </MarketingLayout>
  )
}
