import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  DollarSign,
  FileSpreadsheet,
  Lock,
  PieChart,
  Scale,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { LedgerLines } from '@/components/graphics/ledger-lines'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/ledger')({
  head: () => ({
    meta: [
      { title: 'Double-Entry Money Engine & Profit Splits — Prismark' },
      {
        name: 'description',
        content:
          'Append-only immutable financial ledger with automated contractor profit sharing, Stripe reconciliation, and certified accounting exports.',
      },
    ],
  }),
  component: LedgerPage,
})

const journalEntries = [
  {
    id: 'TXN-8841',
    date: '2026-09-28',
    description: 'Retainer Settlement // Northwind Creative Q4 SOW',
    debitAccount: '1010 Operating Cash (Mercury)',
    creditAccount: '4010 Retainer Revenue',
    amount: 1850000, // $18,500.00
    category: 'Client Revenue',
    status: 'SETTLED',
  },
  {
    id: 'TXN-8842',
    date: '2026-09-28',
    description: 'Contractor Share Disbursement (30%) // Elena Rostova',
    debitAccount: '5020 Contractor COGS',
    creditAccount: '2030 Contractor Payables',
    amount: 555000, // $5,550.00
    category: 'Profit Share',
    status: 'ACCRUED',
  },
  {
    id: 'TXN-8843',
    date: '2026-09-27',
    description: 'Sales Originator Commission (10%) // Marcus Vance',
    debitAccount: '5030 Sales Commission',
    creditAccount: '2040 Commission Payables',
    amount: 185000, // $1,850.00
    category: 'Commission',
    status: 'ACCRUED',
  },
  {
    id: 'TXN-8844',
    date: '2026-09-26',
    description: 'Cloudflare Enterprise Infrastructure Overhead',
    debitAccount: '6010 Cloud Hosting OpEx',
    creditAccount: '1010 Operating Cash (Mercury)',
    amount: 42000, // $420.00
    category: 'Overhead',
    status: 'SETTLED',
  },
]

export function LedgerPage() {
  const [filter, setFilter] = useState<'ALL' | 'Client Revenue' | 'Profit Share' | 'Commission'>(
    'ALL',
  )

  const filteredEntries =
    filter === 'ALL' ? journalEntries : journalEntries.filter((e) => e.category === filter)

  const formatCurrency = (minorUnits: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(minorUnits / 100)
  }

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-emerald-400">
            <DollarSign className="h-3.5 w-3.5" />
            <span>MODULE 02 // DOUBLE-ENTRY FINANCIAL RUNTIME</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-foreground sm:text-6xl">
            An immutable accounting engine built for{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              software studios.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-stone-400 sm:text-lg">
            Never guess which project made real cash. Prismark implements strict, append-only
            double-entry bookkeeping with automatic contractor profit splits and minor-unit
            precision directly in SQLite.
          </p>
        </div>

        {/* Top Metric Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-6 shadow-xl">
            <div className="mb-2 flex items-center justify-between text-stone-400">
              <span className="font-mono text-xs font-bold uppercase">Gross Studio Billings</span>
              <ArrowUpRight className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="font-mono text-3xl font-black text-white">$148,500</div>
            <div className="mt-2 flex items-center gap-2 font-mono text-xs text-stone-500">
              <span className="font-bold text-emerald-400">+24.2%</span>
              <span>vs previous quarter</span>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-6 shadow-xl">
            <div className="mb-2 flex items-center justify-between text-stone-400">
              <span className="font-mono text-xs font-bold uppercase">
                Contractor Splits Accrued
              </span>
              <PieChart className="h-4 w-4 text-orange-400" />
            </div>
            <div className="font-mono text-3xl font-black text-white">$44,550</div>
            <div className="mt-2 flex items-center gap-2 font-mono text-xs text-stone-500">
              <span>Automatic 30% milestone pool</span>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-6 shadow-xl">
            <div className="mb-2 flex items-center justify-between text-stone-400">
              <span className="font-mono text-xs font-bold uppercase">Ledger Balance Variance</span>
              <Scale className="h-4 w-4 text-blue-400" />
            </div>
            <div className="font-mono text-3xl font-black text-emerald-400">$0.00</div>
            <div className="mt-2 flex items-center gap-2 font-mono text-xs text-stone-500">
              <span>Immutable debit == credit proof</span>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-6 shadow-xl">
            <div className="mb-2 flex items-center justify-between text-stone-400">
              <span className="font-mono text-xs font-bold uppercase">Audit Status</span>
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="font-mono text-2xl font-black text-cyan-300">CERTIFIED</div>
            <div className="mt-2 flex items-center gap-2 font-mono text-xs text-stone-500">
              <span>Exportable for CPAs</span>
            </div>
          </div>
        </div>

        {/* Interactive Journal Console */}
        <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-6 shadow-2xl sm:p-10">
          <LedgerLines className="opacity-15" />

          <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                <span>Append-Only Journal Transactions</span>
                <InkStamp
                  label="IMMUTABLE"
                  variant="cobalt"
                  rotation={-1}
                  className="text-[10px]"
                />
              </h2>
              <p className="mt-1 text-xs text-stone-400">
                Zero delete mutations. Corrections are posted as compensating offset journals.
              </p>
            </div>

            <div className="flex gap-2">
              {(['ALL', 'Client Revenue', 'Profit Share', 'Commission'] as const).map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
                    filter === tab
                      ? 'border border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-10 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-stone-800 text-[11px] tracking-wider text-stone-500 uppercase">
                  <th className="px-3 py-3">Txn ID</th>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3">Description</th>
                  <th className="px-3 py-3">Debit Account</th>
                  <th className="px-3 py-3">Credit Account</th>
                  <th className="px-3 py-3 text-right">Amount</th>
                  <th className="px-3 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {filteredEntries.map((txn) => (
                  <tr key={txn.id} className="transition-colors hover:bg-stone-900/40">
                    <td className="px-3 py-4 font-bold text-orange-400">{txn.id}</td>
                    <td className="px-3 py-4 text-stone-400">{txn.date}</td>
                    <td className="px-3 py-4 font-medium text-white">{txn.description}</td>
                    <td className="px-3 py-4 text-cyan-300">{txn.debitAccount}</td>
                    <td className="px-3 py-4 text-purple-300">{txn.creditAccount}</td>
                    <td className="px-3 py-4 text-right font-bold text-emerald-400">
                      {formatCurrency(txn.amount)}
                    </td>
                    <td className="px-3 py-4 text-right">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          txn.status === 'SETTLED'
                            ? 'border border-emerald-500/40 bg-emerald-950/80 text-emerald-400'
                            : 'border border-amber-500/40 bg-amber-950/80 text-amber-400'
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Architectural Pillars */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="space-y-3 rounded-2xl border border-stone-800 bg-[#0B0F19]/60 p-6">
            <Lock className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Integer Minor Units</h3>
            <p className="font-sans text-xs leading-relaxed text-stone-400">
              Floating point math causes silent sub-cent compounding errors. Every ledger column
              stores cents as 64-bit integers with zero floating-point rounding drift.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-stone-800 bg-[#0B0F19]/60 p-6">
            <ArrowDownRight className="h-5 w-5 text-orange-400" />
            <h3 className="text-base font-bold text-white">Automated Profit Splits</h3>
            <p className="font-sans text-xs leading-relaxed text-stone-400">
              Assign contract shares to lead engineers, designers, and sales closers. When a client
              settles a milestone invoice, compensation entries balance automatically.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-stone-800 bg-[#0B0F19]/60 p-6">
            <FileSpreadsheet className="h-5 w-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">CPA & Tax Readiness</h3>
            <p className="font-sans text-xs leading-relaxed text-stone-400">
              One-click standard general ledger exports formatted directly for QuickBooks, Xero, or
              independent certified accountants.
            </p>
          </div>
        </div>

        {/* Feature List */}
        <div className="mt-12 space-y-4 rounded-2xl border border-stone-800 bg-[#070A12] p-8">
          <h3 className="text-lg font-bold text-white">Engine Specifications</h3>
          <div className="grid gap-3 font-mono text-xs text-stone-300 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Multi-currency support with fixed historical conversion locks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Stripe webhook idempotency keys to prevent duplicate billing entries</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Tax liability isolation for VAT, GST, and US state sales taxes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Cryptographic hash verification of every historical journal chunk</span>
            </div>
          </div>
        </div>

        {/* CTA Ribbon */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-stone-800 bg-gradient-to-r from-[#081512] to-[#0A101D] p-8 sm:flex-row">
          <div>
            <h3 className="text-xl font-bold text-white">
              End manual spreadsheet reconciliation forever.
            </h3>
            <p className="mt-1 text-xs text-stone-400">
              Give your studio real-time financial clarity with immutable double-entry precision.
            </p>
          </div>
          <Link
            to="/dispatch"
            className="shrink-0 rounded-md bg-emerald-600 px-5 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-emerald-500"
          >
            Deploy Studio Ledger →
          </Link>
        </div>
      </div>
    </MarketingLayout>
  )
}
