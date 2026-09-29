import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Check,
  Eye,
  FileCheck,
  FileSignature,
  Globe,
  Lock,
  MessageSquare,
  Shield,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/airgap')({
  head: () => ({
    meta: [
      { title: 'Client Air-Gap & Document Signing Portal — Prismark' },
      {
        name: 'description',
        content:
          'White-label client experience with dual-perimeter communication privacy, digital SOW signing desk, and zero internal data leakage.',
      },
    ],
  }),
  component: AirgapPage,
})

export function AirgapPage() {
  const [signed, setSigned] = useState(false)
  const [signerName, setSignerName] = useState('Sarah Jenkins')

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault()
    if (!signerName.trim()) return
    setSigned(true)
  }

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-blue-400">
            <Shield className="h-3.5 w-3.5" />
            <span>MODULE 03 // CLIENT AIR-GAP & SIGNING DESK</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-foreground sm:text-6xl">
            An uncompromising barrier between your{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              engineers and your clients.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-stone-400 sm:text-lg">
            Give enterprise clients the polished, white-label portal they expect while keeping your
            internal code reviews, contractor rate conversations, and rough drafts strictly
            invisible.
          </p>
        </div>

        {/* Interactive SOW Signing Simulator */}
        <div className="mb-16 grid items-start gap-8 lg:grid-cols-12">
          <div className="relative rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-6 shadow-2xl sm:p-10 lg:col-span-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <FileSignature className="h-5 w-5 text-blue-400" />
                <span className="font-mono text-xs font-bold tracking-wider text-white uppercase">
                  SOW-2026-094 // Production Scope of Work
                </span>
              </div>
              <InkStamp
                label={signed ? 'RATIFIED' : 'PENDING SIGNATURE'}
                variant={signed ? 'success' : 'warning'}
                rotation={-2}
                className="text-[10px]"
              />
            </div>

            {/* Document Content */}
            <div className="space-y-4 rounded-xl border border-stone-800/80 bg-[#070A12] p-6 font-sans text-xs leading-relaxed text-stone-300">
              <div className="flex justify-between border-b border-stone-800 pb-3 font-mono text-[11px] text-stone-400">
                <span>CLIENT: Arclight Capital Management</span>
                <span>TOTAL RETAINER: $36,000 USD</span>
              </div>

              <p className="text-sm font-medium text-white">
                Section 1.1 — Scope of Engineering Deliverables
              </p>
              <p className="text-stone-400">
                Prismark Studio certifies the delivery of high-throughput edge webhooks, custom data
                export pipelines, and automated quarterly financial reconciliation dashboards. All
                source code rights transfer to Client upon receipt of final milestone settlement.
              </p>

              <div className="space-y-1 rounded-lg border border-stone-800 bg-stone-900/60 p-4 font-mono text-[11px]">
                <div className="text-[10px] font-bold text-stone-400 uppercase">
                  Ratified Covenants:
                </div>
                <div className="text-emerald-400">✓ 99.99% Edge SLA Guarantee</div>
                <div className="text-emerald-400">✓ Zero Third-Party AI Data Scraping</div>
                <div className="text-emerald-400">✓ Isolated Single-Tenant Encrypted Keyvault</div>
              </div>

              {/* Signature Block */}
              <div className="mt-6 border-t border-stone-800 pt-4">
                {signed ? (
                  <div className="space-y-2 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-5">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
                      <Check className="h-4 w-4" />
                      <span>CRYPTOGRAPHICALLY RATIFIED BY {signerName.toUpperCase()}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px] text-stone-400">
                      <div>Timestamp: 2026-09-29 15:42:01 UTC</div>
                      <div>SHA-256 Digest: 8f9b2a...e7401c9a</div>
                      <div>Document locked. Invoicing schedule activated.</div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSign} className="space-y-4">
                    <div>
                      <span className="mb-1.5 block font-mono text-[11px] text-stone-400">
                        Authorized Client Signatory Name
                      </span>
                      <input
                        type="text"
                        value={signerName}
                        onChange={(e) => setSignerName(e.target.value)}
                        placeholder="Enter full legal name..."
                        className="w-full rounded-md border border-stone-700 bg-black/60 px-3.5 py-2 font-mono text-xs text-white placeholder:text-stone-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2.5 font-mono text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.01]"
                    >
                      Apply Digital Ratification Stamp →
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Air-Gap Perimeter Specs */}
          <div className="space-y-6 lg:col-span-5">
            <div className="space-y-4 rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-6 shadow-xl">
              <span className="font-mono text-xs font-bold tracking-wider text-blue-400 uppercase">
                AIR-GAP PERIMETER LOGIC
              </span>
              <h2 className="text-xl font-bold text-white">
                Two worlds. One database. Zero accidental leaks.
              </h2>
              <p className="font-sans text-xs leading-relaxed text-stone-400">
                Most platforms fail because staff accidentally paste internal comments where clients
                can see them. Prismark enforces strict architectural boundaries at the database
                layer.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 rounded-lg border border-stone-800 bg-stone-900/40 p-3">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                  <div>
                    <span className="block text-xs font-bold text-white">Staff-Only Vault</span>
                    <span className="text-[11px] text-stone-400">
                      Contractor profit splits, rough PR diffs, and internal banter remain 100%
                      air-gapped.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-stone-800 bg-stone-900/40 p-3">
                  <Eye className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <div>
                    <span className="block text-xs font-bold text-white">Client Portal View</span>
                    <span className="text-[11px] text-stone-400">
                      Clean milestones, signed SOWs, download links, and direct messaging with
                      agency leads.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-6 shadow-xl">
              <Globe className="h-5 w-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Custom Domain & White-Label</h3>
              <p className="font-sans text-xs leading-relaxed text-stone-400">
                Point your own domain (e.g. <code>portal.meridianlabs.co</code>). Custom logo, brand
                colors, automated email notifications, and zero Prismark watermarks on Agency tier.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/60 p-6">
            <FileCheck className="mb-3 h-5 w-5 text-emerald-400" />
            <h3 className="mb-2 text-base font-bold text-white">Automated SOW Invoicing</h3>
            <p className="font-sans text-xs leading-relaxed text-stone-400">
              As soon as a client signs an SOW milestone, Prismark automatically generates the
              corresponding Stripe payment link and logs the transaction.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/60 p-6">
            <MessageSquare className="mb-3 h-5 w-5 text-blue-400" />
            <h3 className="mb-2 text-base font-bold text-white">Dual-Perimeter Chat</h3>
            <p className="font-sans text-xs leading-relaxed text-stone-400">
              Client channels feature a persistent gold perimeter badge in the UI so your developers
              never confuse client channels with internal staff rooms.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/60 p-6">
            <Sparkles className="mb-3 h-5 w-5 text-orange-400" />
            <h3 className="mb-2 text-base font-bold text-white">Frictionless Client Auth</h3>
            <p className="font-sans text-xs leading-relaxed text-stone-400">
              Clients log in using 6-digit cryptographic magic OTP codes. No forgotten passwords,
              zero support tickets, and instant access to their files.
            </p>
          </div>
        </div>

        {/* CTA Ribbon */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-stone-800 bg-gradient-to-r from-[#08101E] to-[#0A1A18] p-8 sm:flex-row">
          <div>
            <h3 className="text-xl font-bold text-white">
              Upgrade your agency client experience today.
            </h3>
            <p className="mt-1 text-xs text-stone-400">
              Deliver the white-glove digital portal your enterprise clients expect.
            </p>
          </div>
          <Link
            to="/dispatch"
            className="shrink-0 rounded-md bg-blue-600 px-5 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-blue-500"
          >
            Provision Client Portal →
          </Link>
        </div>
      </div>
    </MarketingLayout>
  )
}
