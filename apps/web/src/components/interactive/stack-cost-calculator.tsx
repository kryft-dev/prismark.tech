'use client'

import { Check, Sparkles, TrendingDown, X } from 'lucide-react'
import { useState } from 'react'

const tools = [
  { name: 'Linear / Jira', role: 'Tasks & Sprints', price: 14 },
  { name: 'Slack Pro', role: 'Team Chat', price: 12.5 },
  { name: 'Harvest / QuickBooks', role: 'Invoicing & Time', price: 15 },
  { name: 'DocuSign Standard', role: 'SOW Signing', price: 25 },
  { name: 'Notion Plus', role: 'Specs & Docs', price: 12 },
  { name: 'Custom Client Portal', role: 'Client Air-Gap', price: 29 },
]

export function StackCostCalculator() {
  const [teamSize, setTeamSize] = useState(8)
  const [annualBilling, setAnnualBilling] = useState(true)

  const fragmentedPerUser = tools.reduce((acc, t) => acc + t.price, 0) // $107.50
  const prismarkBasePrice = annualBilling ? 39 : 49 // 20% discount on annual

  const totalFragmentedMonthly = fragmentedPerUser * teamSize
  const totalPrismarkMonthly = prismarkBasePrice * teamSize

  const annualFragmented = totalFragmentedMonthly * 12
  const annualPrismark = totalPrismarkMonthly * 12
  const netAnnualSavings = annualFragmented - annualPrismark

  return (
    <div className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md sm:p-10 dark:border-white/[0.1] dark:bg-[#0B0F19]/90">
      {/* Top Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6 border-b border-slate-800 pb-6 dark:border-white/[0.08]">
        <div>
          <span className="font-mono text-xs font-bold tracking-wider text-orange-400 uppercase">
            ROI &amp; Software Audit
          </span>
          <h3 className="mt-1 text-2xl font-bold text-white">
            Calculate your studio&apos;s annual savings.
          </h3>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            See the direct financial impact of consolidating your 6-tool subscription circus into
            Prismark.
          </p>
        </div>

        {/* Annual / Monthly Toggle */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-1.5 font-mono text-xs">
          <button
            type="button"
            onClick={() => setAnnualBilling(false)}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              !annualBilling
                ? 'bg-slate-800 font-bold text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnualBilling(true)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              annualBilling
                ? 'bg-orange-500 font-bold text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Annual</span>
            <span className="rounded bg-orange-400/30 px-1 text-[10px] text-white">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Team Size Slider */}
      <div className="mb-8 rounded-xl border border-slate-800 bg-slate-950/40 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="block text-sm font-semibold text-white">
              Active Studio Team Members
            </span>
            <span className="text-xs text-slate-400">
              Unlimited client guests and portal viewers are always complimentary.
            </span>
          </div>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-3xl font-extrabold text-orange-400">{teamSize}</span>
            <span className="text-xs text-slate-500">seats</span>
          </div>
        </div>

        <input
          type="range"
          min={3}
          max={40}
          value={teamSize}
          onChange={(e) => setTeamSize(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-orange-500"
        />
        <div className="mt-2 flex justify-between font-mono text-[11px] text-slate-500">
          <span>3 members (Boutique)</span>
          <span>15 members (Growth Studio)</span>
          <span>40+ members (Agency)</span>
        </div>
      </div>

      {/* Comparison Breakdown Cards */}
      <div className="mb-8 grid items-stretch gap-6 md:grid-cols-3">
        {/* Fragmented Stack */}
        <div className="flex flex-col justify-between rounded-xl border border-rose-500/20 bg-rose-950/10 p-6">
          <div>
            <div className="mb-2 flex items-center justify-between font-mono text-xs text-rose-400">
              <span className="font-bold uppercase">6-Tool Fragmented Stack</span>
              <X className="h-4 w-4" />
            </div>
            <div className="font-mono text-3xl font-bold text-rose-300">
              ${totalFragmentedMonthly.toLocaleString()}
              <span className="font-sans text-sm font-normal text-slate-400"> / mo</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Linear + Slack + Harvest + DocuSign + Notion + Client Portal add-ons.
            </p>
          </div>

          <div className="mt-6 border-t border-rose-500/20 pt-4 font-mono text-xs text-slate-400">
            ${annualFragmented.toLocaleString()} billed per year
          </div>
        </div>

        {/* Prismark Studio */}
        <div className="flex flex-col justify-between rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-6 shadow-lg ring-1 ring-emerald-500/20">
          <div>
            <div className="mb-2 flex items-center justify-between font-mono text-xs text-emerald-400">
              <span className="font-bold uppercase">Prismark Unified OS</span>
              <Check className="h-4 w-4" />
            </div>
            <div className="font-mono text-3xl font-bold text-emerald-300">
              ${totalPrismarkMonthly.toLocaleString()}
              <span className="font-sans text-sm font-normal text-slate-400"> / mo</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Tasks, client air-gaps, double-entry cashflow, and signing in one edge database.
            </p>
          </div>

          <div className="mt-6 border-t border-emerald-500/20 pt-4 font-mono text-xs text-slate-400">
            ${annualPrismark.toLocaleString()} billed per year
          </div>
        </div>

        {/* Net Savings Box */}
        <div className="flex flex-col justify-between rounded-xl border border-orange-500/40 bg-gradient-to-br from-orange-950/30 to-amber-950/20 p-6">
          <div>
            <div className="mb-2 flex items-center gap-1.5 font-mono text-xs font-bold text-orange-400 uppercase">
              <TrendingDown className="h-4 w-4" />
              <span>Annual Net Capital Saved</span>
            </div>
            <div className="font-mono text-3xl font-extrabold text-white sm:text-4xl">
              ${netAnnualSavings.toLocaleString()}
            </div>
            <p className="mt-2 font-sans text-xs leading-relaxed text-slate-300">
              Reinvested directly into engineering talent and studio profit margins instead of SaaS
              subscriptions.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-1.5 border-t border-orange-500/20 pt-4 font-mono text-xs text-orange-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Zero Zapier glue code needed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
