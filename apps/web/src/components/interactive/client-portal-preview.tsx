'use client'

import { Check, CheckCircle2, Download, Eye, Lock, MessageSquare, Shield } from 'lucide-react'
import { useState } from 'react'

export function ClientPortalPreview() {
  const [activeTab, setActiveTab] = useState<'internal' | 'client'>('client')

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-2xl backdrop-blur-md dark:border-white/[0.1] dark:bg-[#0B0F19]/90">
      {/* Mode Toggle Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/40 px-6 py-4 dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">Client Air-Gap Perimeter</span>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">
            Two distinct views of the same database. Zero accidental data leaks.
          </p>
        </div>

        <div className="flex rounded-lg border border-slate-800 bg-slate-900/80 p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('client')}
            className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
              activeTab === 'client'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Client Portal View</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('internal')}
            className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
              activeTab === 'internal'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="h-3.5 w-3.5 text-amber-300" />
            <span>Studio Staff View</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8">
        {activeTab === 'client' ? (
          /* Client Portal View */
          <div className="animate-in space-y-6 duration-200 fade-in">
            {/* White-label Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-6">
              <div>
                <span className="font-mono text-[11px] font-bold tracking-wider text-blue-400 uppercase">
                  Arclight Capital Management · Client Access Room
                </span>
                <h3 className="mt-1 text-xl font-bold text-white">
                  Q4 Enterprise Trading Infrastructure
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Managed by Meridian Studio · Verified Edge Runtime
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-950/80 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
                  <Check className="h-3.5 w-3.5" />
                  <span>SOW Ratified</span>
                </span>
              </div>
            </div>

            {/* Client Deliverables List */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/40 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-400">DELIVERABLE 01</span>
                  <span className="rounded bg-emerald-900/60 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                    APPROVED
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">System Architecture & Schema</h4>
                <p className="font-sans text-xs leading-relaxed text-slate-400">
                  Complete technical specification and data sovereignty blueprint.
                </p>
                <div className="flex items-center justify-between border-t border-slate-800 pt-2 font-mono text-xs">
                  <span className="text-slate-400">PDF Document · 4.2 MB</span>
                  <button
                    type="button"
                    className="flex items-center gap-1 font-semibold text-blue-400 hover:underline"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/40 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-purple-400">
                    DELIVERABLE 02
                  </span>
                  <span className="rounded bg-blue-900/60 px-2 py-0.5 font-mono text-[10px] text-blue-400">
                    IN REVIEW
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">Edge Auth & API Gateway</h4>
                <p className="font-sans text-xs leading-relaxed text-slate-400">
                  Staging deployment running across Cloudflare global edge.
                </p>
                <div className="flex items-center justify-between border-t border-slate-800 pt-2 font-mono text-xs">
                  <span className="text-slate-400">Staging URL Ready</span>
                  <button
                    type="button"
                    className="flex items-center gap-1 font-semibold text-emerald-400 hover:underline"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Sign Off</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Channel with Gold Perimeter */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-amber-500/40 bg-amber-950/10 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-500/20 p-2 text-amber-400">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">
                    Gold-Perimeter Executive Channel
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Direct communication with Studio Director & Lead Architect.
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 font-mono text-xs text-white transition-colors hover:bg-slate-700"
              >
                Open Channel
              </button>
            </div>
          </div>
        ) : (
          /* Internal Studio Staff View */
          <div className="animate-in space-y-6 duration-200 fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-orange-500/40 bg-orange-950/20 p-6">
              <div>
                <span className="font-mono text-[11px] font-bold tracking-wider text-orange-400 uppercase">
                  INTERNAL CONFIDENTIAL // MERIDIAN STUDIO ONLY
                </span>
                <h3 className="mt-1 text-xl font-bold text-white">
                  Arclight Account Margins & Contractor Splits
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Hidden behind cryptographic air-gap. Never visible to Arclight members.
                </p>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-right font-mono">
                <span className="block text-[10px] text-slate-400 uppercase">
                  Net Studio Margin
                </span>
                <span className="text-lg font-bold text-emerald-400">$18,450 (61.5%)</span>
              </div>
            </div>

            {/* Internal Financial Breakdown */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase">
                  Gross Client Retainer
                </span>
                <div className="font-mono text-xl font-bold text-white">$30,000</div>
                <div className="font-sans text-[11px] text-slate-500">
                  Settled via Stripe Mercury
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase">
                  Contractor Profit Split (35%)
                </span>
                <div className="font-mono text-xl font-bold text-orange-400">$10,500</div>
                <div className="font-sans text-[11px] text-slate-500">
                  Elena Rostova + David Chen
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase">
                  Sales Closing Share (3.5%)
                </span>
                <div className="font-mono text-xl font-bold text-blue-400">$1,050</div>
                <div className="font-sans text-[11px] text-slate-500">
                  Marcus Vance (Originator)
                </div>
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/40 p-5">
              <span className="block font-mono text-xs font-bold text-slate-300">
                Internal Engineering Backchannel:
              </span>
              <p className="font-sans text-xs leading-relaxed text-slate-400">
                &quot;The client wants to add real-time order-book charts next week. Marcus will
                quote an additional $8,000 SOW change order before David begins
                implementation.&quot;
              </p>
              <div className="flex items-center gap-2 pt-2 font-mono text-[10px] text-emerald-400">
                <Lock className="h-3 w-3" />
                <span>Air-Gap protection active: Zero risk of accidental leakage</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
