import { createFileRoute } from '@tanstack/react-router'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { DeckleEdge } from '@/components/graphics/deckle-edge'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { changelog } from '@/lib/data/changelog'

export const Route = createFileRoute('/changelog')({
  component: ChangelogPage,
  head: () => ({
    meta: [
      { title: 'Changelog — Prismark' },
      { name: 'description', content: 'Everything we ship, as we ship it.' },
    ],
  }),
})

function ChangelogPage() {
  return (
    <MarketingLayout>
      <div className="relative min-h-screen">
        <BlueprintGrid />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <div className="mb-20">
            <h1 className="text-[24px] font-[600] tracking-tight">What's new</h1>
            <p className="mt-2 text-[16px] text-muted-foreground">
              Everything we ship, as we ship it.
            </p>
          </div>

          <div className="relative ml-4 space-y-16 border-l border-border pl-8">
            {changelog.map((entry, idx) => {
              let variant: 'info' | 'success' | 'warning' = 'info'
              if (entry.type === 'improved') variant = 'success'
              if (entry.type === 'fixed') variant = 'warning'

              return (
                <div key={idx} className="relative">
                  <div className="absolute top-1 -left-[41px] h-4 w-4 rounded-full border-2 border-border bg-background" />
                  <div className="mb-4 flex items-center gap-4">
                    <span className="font-mono text-[13px] text-muted-foreground">
                      {entry.date}
                    </span>
                    <InkStamp
                      label={entry.type.toUpperCase()}
                      variant={variant}
                      className="origin-left scale-75"
                      rotation={-2}
                    />
                    {entry.version && (
                      <span className="rounded bg-muted px-2 py-0.5 font-mono text-[13px]">
                        {entry.version}
                      </span>
                    )}
                  </div>
                  <h2 className="mb-2 text-[16px] font-[500]">{entry.title}</h2>
                  <div className="text-[15px] leading-relaxed whitespace-pre-wrap text-muted-foreground">
                    {entry.description}
                  </div>

                  {idx < changelog.length - 1 && (
                    <div className="mt-16 -ml-8 max-w-[200px] opacity-50">
                      <DeckleEdge />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
