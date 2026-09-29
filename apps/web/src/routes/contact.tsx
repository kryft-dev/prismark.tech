import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, Send } from 'lucide-react'
import { useState } from 'react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { Highlighter } from '@/components/graphics/highlighter'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { PaperClip } from '@/components/graphics/paper-clip'
import { WashiTape } from '@/components/graphics/washi-tape'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Annotation } from '@/components/shared/annotation'
import { toast } from '@/components/ui/toast'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: 'Dispatch Brief & Inquiry — Prismark' },
      {
        name: 'description',
        content: 'Send a dispatch memo to the Prismark engineering and onboarding team.',
      },
    ],
  }),
})

export function ContactPage() {
  const [formData, setFormData] = useState({
    agencyName: '',
    email: '',
    teamSize: '1-5',
    message: '',
    tools: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleTool = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter((t) => t !== tool)
        : [...prev.tools, tool],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      try {
        toast.add({ title: 'Brief dispatched to Prismark engineering desk!' })
      } catch {
        // fallback
      }
    }, 700)
  }

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="drafting" />

        <div className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded border border-amber-300 bg-amber-50 px-3 py-1 font-mono text-xs font-bold text-amber-800">
            <span>TRANSMISSION // DISPATCH DESK</span>
          </div>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-[#18181B] sm:text-5xl">
            Dispatch an inquiry to <Highlighter variant="yellow">the workshop.</Highlighter>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-stone-700">
            Need an early workspace key, custom migration assistance from Linear/QuickBooks, or an
            enterprise SLA? Fill out the brief memo below. We read every dispatch personally.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Annotation color="vermilion" className="text-lg">
              response time usually under 4 hours →
            </Annotation>
          </div>
        </div>

        {/* The Physical Brief Memo Form */}
        <div className="paper-shadow-lg relative mx-auto max-w-2xl rounded-2xl border-2 border-[#D8CEBE] bg-white p-6 sm:p-12">
          <div className="absolute -top-3 left-10">
            <PaperClip variant="brass" />
          </div>
          <div className="absolute -top-3 right-10">
            <WashiTape variant="rose" rotation={2} className="scale-75" />
          </div>

          <div className="mb-6 flex items-center justify-between border-b border-stone-200 pb-4">
            <span className="font-mono text-xs font-bold tracking-wider text-stone-500 uppercase">
              FORM REF: MEMO-DISPATCH-2026
            </span>
            <InkStamp label="INCOMING" variant="cobalt" rotation={-2} className="text-[10px]" />
          </div>

          {isSubmitted ? (
            <div className="space-y-4 py-12 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-emerald-300 bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="size-8" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">Dispatch Received</h2>
              <p className="mx-auto max-w-md text-sm text-stone-600 sm:text-base">
                Your agency inquiry has been logged in our physical registry. We will reply to{' '}
                <span className="font-semibold text-stone-900">{formData.email}</span> within 4
                hours.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-4 rounded-md border border-stone-300 bg-stone-100 px-4 py-2 font-mono text-xs font-bold text-stone-800 hover:bg-stone-200"
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="agencyName"
                    className="mb-2 block font-mono text-xs font-bold text-stone-700 uppercase"
                  >
                    Studio / Agency Name *
                  </label>
                  <input
                    id="agencyName"
                    required
                    type="text"
                    placeholder="e.g. Meridian Labs"
                    value={formData.agencyName}
                    onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                    className="w-full rounded-md border border-[#D8CEBE] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-800 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactEmail"
                    className="mb-2 block font-mono text-xs font-bold text-stone-700 uppercase"
                  >
                    Founder / Lead Email *
                  </label>
                  <input
                    id="contactEmail"
                    required
                    type="email"
                    placeholder="founder@studio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-md border border-[#D8CEBE] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-800 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <span className="mb-2 block font-mono text-xs font-bold text-stone-700 uppercase">
                  Studio Headcount
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {['1-5', '6-15', '16-40', '40+'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFormData({ ...formData, teamSize: size })}
                      className={`rounded-md border py-2 text-center font-mono text-xs font-semibold transition-colors ${
                        formData.teamSize === size
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-[#D8CEBE] bg-[#FAF8F5] text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-2 block font-mono text-xs font-bold text-stone-700 uppercase">
                  Tools You Currently Struggle With
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Linear',
                    'Slack',
                    'QuickBooks',
                    'Notion',
                    'Harvest',
                    'Google Drive',
                    'Monday.com',
                  ].map((tool) => (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => toggleTool(tool)}
                      className={`rounded-full border px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                        formData.tools.includes(tool)
                          ? 'border-rose-300 bg-rose-100 font-bold text-rose-800'
                          : 'border-stone-300 bg-[#FAF8F5] text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {formData.tools.includes(tool) ? `✓ ${tool}` : `+ ${tool}`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="briefMessage"
                  className="mb-2 block font-mono text-xs font-bold text-stone-700 uppercase"
                >
                  Project Notes or Questions
                </label>
                <textarea
                  id="briefMessage"
                  rows={4}
                  placeholder="Tell us about your team workflow, upcoming client milestones, or custom requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-md border border-[#D8CEBE] bg-[#FAF8F5] p-3.5 text-sm leading-relaxed text-stone-900 placeholder:text-stone-400 focus:border-stone-800 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#18181B] py-3.5 font-mono text-sm font-bold text-[#FBF9F4] shadow-md transition-all hover:bg-stone-800 active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sealing &amp; Dispatching...</span>
                  ) : (
                    <>
                      <span>Transmit Dispatch Brief</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </MarketingLayout>
  )
}
