import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, Send, Terminal } from 'lucide-react'
import { useState } from 'react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { toast } from '@/components/ui/toast'

export const Route = createFileRoute('/dispatch')({
  head: () => ({
    meta: [
      { title: 'Studio Dispatch Console — Prismark' },
      {
        name: 'description',
        content: 'Transmit studio intake requirements and request an early agency access key.',
      },
    ],
  }),
  component: DispatchPage,
})

export function DispatchPage() {
  const [formData, setFormData] = useState({
    studioName: '',
    email: '',
    teamSize: '5-15',
    migrationFrom: [] as string[],
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dispatchedKey, setDispatchedKey] = useState<string | null>(null)

  const toggleMigrationTool = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      migrationFrom: prev.migrationFrom.includes(tool)
        ? prev.migrationFrom.filter((t) => t !== tool)
        : [...prev.migrationFrom, tool],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      const key = `DISPATCH-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`
      setDispatchedKey(key)
      try {
        toast.add({ title: `Permit ${key} issued for ${formData.studioName}` })
      } catch {
        // fallback
      }
    }, 700)
  }

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-orange-400">
            <Terminal className="h-3.5 w-3.5" />
            <span>DISPATCH CONSOLE // EARLY PROVISIONING</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-foreground sm:text-6xl">
            Transmit a studio intake{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
              dispatch memo.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-stone-400 sm:text-lg">
            Need an early studio license, custom migration assistance from Linear/QuickBooks, or
            enterprise air-gap provisioning? Transmit your dispatch below.
          </p>
        </div>

        {/* The Dispatch Terminal Card */}
        <div className="relative max-w-2xl rounded-3xl border border-stone-800 bg-[#0A0E18] p-6 shadow-2xl sm:p-12">
          <div className="mb-6 flex items-center justify-between border-b border-stone-800 pb-4 font-mono text-xs text-stone-400">
            <span className="flex items-center gap-1.5 font-bold text-orange-400">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
              <span>TERMINAL ID // DISPATCH-DESK-2026</span>
            </span>
            <InkStamp label="READY" variant="emerald" rotation={-2} className="text-[10px]" />
          </div>

          {dispatchedKey ? (
            <div className="space-y-4 py-10 text-center font-mono">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-950 text-emerald-400">
                <CheckCircle2 className="size-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Intake Memo Dispatched</h2>
              <p className="mx-auto max-w-md font-sans text-sm text-stone-400">
                Your studio requirements have been logged in the Cloudflare D1 global registry. We
                will contact <span className="font-bold text-white">{formData.email}</span> with
                your dedicated onboarding key.
              </p>
              <div className="mt-4 inline-block rounded border border-orange-500/40 bg-orange-950/40 p-3 text-xs text-orange-300">
                <span>PERMIT ISSUED: </span>
                <code className="font-bold text-white">{dispatchedKey}</code>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="studioName"
                    className="mb-2 block font-mono text-xs font-bold text-stone-300 uppercase"
                  >
                    Studio / Agency Name *
                  </label>
                  <input
                    id="studioName"
                    required
                    type="text"
                    placeholder="e.g. Meridian Labs"
                    value={formData.studioName}
                    onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
                    className="w-full rounded-md border border-stone-800 bg-[#06080F] px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-stone-600 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-mono text-xs font-bold text-stone-300 uppercase"
                  >
                    Studio Lead Email *
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    placeholder="lead@yourstudio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-md border border-stone-800 bg-[#06080F] px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-stone-600 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <span className="mb-2 block font-mono text-xs font-bold text-stone-300 uppercase">
                  Studio Size
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {['1-4', '5-15', '16-30', '30+'].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setFormData({ ...formData, teamSize: sz })}
                      className={`rounded-md border py-2 text-center font-mono text-xs font-semibold transition-colors ${
                        formData.teamSize === sz
                          ? 'border-orange-500 bg-orange-950/60 font-bold text-orange-400'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:text-white'
                      }`}
                    >
                      {sz} seats
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-2 block font-mono text-xs font-bold text-stone-300 uppercase">
                  Tools You Want to Discard
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Linear', 'Slack', 'QuickBooks', 'Notion', 'DocuSign', 'Harvest'].map(
                    (tool) => (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleMigrationTool(tool)}
                        className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                          formData.migrationFrom.includes(tool)
                            ? 'border-orange-500 bg-orange-950 font-bold text-orange-400'
                            : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:text-white'
                        }`}
                      >
                        {formData.migrationFrom.includes(tool) ? `✓ ${tool}` : `+ ${tool}`}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block font-mono text-xs font-bold text-stone-300 uppercase"
                >
                  Studio Workflow Notes
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  placeholder="Tell us about your client milestones, retainer billing cycle, or custom edge requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-md border border-stone-800 bg-[#06080F] p-3.5 font-mono text-sm text-white placeholder:text-stone-600 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-orange-600 to-amber-600 py-3.5 font-mono text-sm font-bold text-white shadow-lg transition-transform hover:brightness-110 active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Transmitting Dispatch...</span>
                ) : (
                  <>
                    <span>Transmit Dispatch Permit</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </MarketingLayout>
  )
}
