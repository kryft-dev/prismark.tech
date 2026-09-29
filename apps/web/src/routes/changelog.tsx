import { createFileRoute } from '@tanstack/react-router'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { DeckleEdge } from '@/components/graphics/deckle-edge'
import { Highlighter } from '@/components/graphics/highlighter'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Annotation } from '@/components/shared/annotation'
import { changelogEntries } from '@/lib/data/changelog'

export const Route = createFileRoute('/changelog')({
  component: ChangelogPage,
  head: () => ({
    meta: [
      { title: 'Changelog & Field Diary — Prismark' },
      {
        name: 'description',
        content: 'Chronological timeline of features, improvements, and architectural releases.',
      },
    ],
  }),
})

export function ChangelogPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="drafting" />

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded border border-purple-300 bg-purple-50 px-3 py-1 font-mono text-xs font-bold text-purple-800">
            <span>CHRONOLOGY // RELEASE DIARY</span>
          </div>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-[#18181B] sm:text-5xl">
            The living field diary of <Highlighter variant="yellow">every release.</Highlighter>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-stone-700">
            We deploy updates continuously to Cloudflare Workers. Here is the chronological log of
            new capabilities, architectural enhancements, and refinements.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Annotation color="emerald" className="text-lg">
              updated weekly as we ship →
            </Annotation>
          </div>
        </div>

        {/* Timeline Entries */}
        <div className="relative max-w-3xl space-y-12">
          {/* Vertical spine timeline line */}
          <div className="pointer-events-none absolute top-4 bottom-4 left-4 w-0.5 bg-stone-300 sm:left-6" />

          {changelogEntries.map((entry, idx) => {
            const stampVariant =
              entry.type === 'new' ? 'emerald' : entry.type === 'improved' ? 'cobalt' : 'amber'

            return (
              <div key={idx} className="relative pl-12 sm:pl-16">
                {/* Timeline dot */}
                <div className="absolute top-5 left-2 size-4.5 rounded-full border-2 border-stone-800 bg-white sm:left-4" />

                <div className="paper-shadow rounded-xl border border-[#D8CEBE] bg-white p-6 sm:p-8">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="rounded border border-stone-300 bg-stone-100 px-2 py-0.5 font-mono text-xs font-bold text-stone-900">
                        v{entry.version}
                      </span>
                      <span className="font-mono text-xs text-stone-500">{entry.date}</span>
                    </div>

                    <InkStamp
                      label={entry.type.toUpperCase()}
                      variant={stampVariant}
                      rotation={idx % 2 === 0 ? -2 : 3}
                      className="text-[10px]"
                    />
                  </div>

                  <h2 className="mb-2 text-xl font-bold text-stone-900">{entry.title}</h2>
                  <p className="font-sans text-sm leading-relaxed text-stone-700 sm:text-base">
                    {entry.description}
                  </p>
                </div>

                {idx < changelogEntries.length - 1 && (
                  <div className="py-4">
                    <DeckleEdge color="#E2DBD0" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </MarketingLayout>
  )
}
