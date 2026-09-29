import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'

import { AgencyLogos } from '@/components/brand/agency-logos'
import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { DeckleEdge } from '@/components/graphics/deckle-edge'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Annotation } from '@/components/shared/annotation'
import { StatStrip } from '@/components/shared/stat-strip'
import { Testimonial } from '@/components/shared/testimonial'
import { testimonials } from '@/lib/data/testimonials'

export const Route = createFileRoute('/customers')({
  component: CustomersPage,
  head: () => ({
    meta: [
      { title: 'Customers — Prismark' },
      { name: 'description', content: 'Agencies that run on Prismark.' },
    ],
  }),
})

function CustomersPage() {
  return (
    <MarketingLayout>
      <div className="relative min-h-screen">
        <BlueprintGrid />

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 sm:py-32">
          {/* Header */}
          <div className="mb-20 text-center">
            <h1 className="text-[32px] font-semibold tracking-tight text-foreground md:text-[40px]">
              Agencies that run on Prismark
            </h1>
            <p className="mt-4 text-[17px] text-muted-foreground">
              From boutique branding studios to full-stack digital consultancies.
            </p>
            <div className="mt-4 flex justify-center">
              <Annotation>agencies who run on sentences, not cells</Annotation>
            </div>
          </div>

          {/* Agency Logos */}
          <div className="mb-24">
            <AgencyLogos className="justify-center" />
          </div>

          <div className="my-16">
            <DeckleEdge />
          </div>

          {/* Metrics Strip */}
          <div className="mb-28 flex justify-center">
            <StatStrip
              stats={[
                { value: '2,400+', label: 'Agencies' },
                { value: '$180M', label: 'Invoiced' },
                { value: '12', label: 'Countries' },
                { value: '4.9', label: 'Average rating' },
              ]}
              className="justify-center"
            />
          </div>

          <div className="my-16">
            <DeckleEdge />
          </div>

          {/* Testimonials Feed */}
          <div className="relative mx-auto mb-32 max-w-2xl pl-6">
            {/* Vertical spine */}
            <div className="absolute top-4 bottom-4 left-[39px] z-0 w-px bg-border"></div>

            <div className="relative z-10 space-y-16">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-background py-2"
                >
                  <Testimonial {...testimonial} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-24 flex flex-col items-center gap-4 border-t border-border pt-16 text-center">
            <h2 className="text-[24px] font-semibold text-foreground">Ready to join them?</h2>
            <p className="text-[15px] text-muted-foreground">
              Join the waitlist and get onboarded with our founding batch.
            </p>
            <a
              href="/"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-[6px] bg-[#EDEDED] px-8 font-medium text-[#0A0A0A] transition-opacity hover:opacity-90"
            >
              Join the waitlist
            </a>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
