import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, Send, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/access')({
  head: () => ({
    meta: [
      { title: 'Request Studio Access — Prismark' },
      {
        name: 'description',
        content:
          'Transmit studio intake requirements and request an early access key for your agency.',
      },
    ],
  }),
  component: AccessPage,
})

const existingTools = [
  'Linear / Jira',
  'Slack Pro',
  'QuickBooks / Harvest',
  'DocuSign',
  'Notion',
  'Copilot / Client Portal',
]

export function AccessPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    studioName: '',
    email: '',
    teamSize: '5-15',
    migrationFrom: [] as string[],
    notes: '',
  })

  const toggleTool = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      migrationFrom: prev.migrationFrom.includes(tool)
        ? prev.migrationFrom.filter((t) => t !== tool)
        : [...prev.migrationFrom, tool],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.studioName || !formData.email) return
    setSubmitted(true)
  }

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 pb-28 md:px-14">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-12 space-y-3 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-orange-600 dark:text-orange-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>EARLY ACCESS INTAKE</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Request studio onboarding.
            </h1>

            <p className="font-sans text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              We onboard new craft studios in cohorts to ensure white-glove migration assistance.
              Tell us about your agency:
            </p>
          </div>

          {/* Form / Submitted Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-12 dark:border-white/[0.08] dark:bg-[#0D111A]">
            {submitted ? (
              <div className="space-y-4 py-8 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="size-8" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Intake Request Received
                </h2>

                <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  We have queued an early access permit for{' '}
                  <strong className="text-orange-500">{formData.studioName}</strong>. Our
                  engineering team will dispatch your access key to{' '}
                  <strong className="text-blue-500">{formData.email}</strong> within 24 hours.
                </p>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="font-mono text-xs text-slate-500 underline underline-offset-4 hover:text-slate-800 dark:hover:text-white"
                  >
                    Submit another studio request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="studio-name"
                    className="mb-2 block font-mono text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300"
                  >
                    Studio / Agency Name
                  </label>
                  <input
                    id="studio-name"
                    type="text"
                    required
                    value={formData.studioName}
                    onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
                    placeholder="e.g. Meridian Labs"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="studio-email"
                    className="mb-2 block font-mono text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300"
                  >
                    Work Email
                  </label>
                  <input
                    id="studio-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="partner@yourstudio.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <span className="mb-2 block font-mono text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300">
                    Studio Team Size
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {['1-5', '6-15', '16-35', '35+'].map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setFormData({ ...formData, teamSize: size })}
                        className={`rounded-xl border py-2.5 font-mono text-xs font-semibold transition-all ${
                          formData.teamSize === size
                            ? 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400'
                            : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="mb-2 block font-mono text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300">
                    Current Tools You Want to Replace
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {existingTools.map((tool) => {
                      const selected = formData.migrationFrom.includes(tool)
                      return (
                        <button
                          type="button"
                          key={tool}
                          onClick={() => toggleTool(tool)}
                          className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-all ${
                            selected
                              ? 'border-blue-500 bg-blue-500/10 font-semibold text-blue-600 dark:text-blue-400'
                              : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-950'
                          }`}
                        >
                          {selected ? '✓ ' : '+ '}
                          {tool}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="studio-notes"
                    className="mb-2 block font-mono text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300"
                  >
                    Specific Workflow Needs (Optional)
                  </label>
                  <textarea
                    id="studio-notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about your current retainer structure or integration requirements..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-3.5 font-mono text-xs font-bold text-white shadow-xl shadow-orange-600/20 transition-all hover:scale-[1.01] hover:bg-orange-500"
                >
                  <Send className="h-4 w-4" />
                  <span>Transmit Studio Intake →</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
