import { createFileRoute } from '@tanstack/react-router'
import { Check } from 'lucide-react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { HandDrawnCircle } from '@/components/graphics/hand-drawn-circle'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Annotation } from '@/components/shared/annotation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { pricing } from '@/lib/data/pricing'

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: 'Pricing — Prismark' },
      { name: 'description', content: 'Simple, transparent pricing for agencies of all sizes.' },
    ],
  }),
})

function PricingPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <BlueprintGrid />
        <div className="mb-20 text-center">
          <h1 className="text-[24px] font-[600] tracking-tight">Simple, transparent pricing</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] text-muted-foreground">
            Everything your agency needs to operate efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {pricing.map((tier, idx) => (
            <div
              key={tier.name}
              className={`p-10 ${idx !== pricing.length - 1 ? 'md:border-r md:border-border' : ''} flex flex-col`}
            >
              <h2 className="text-[20px] font-[600]">{tier.name}</h2>
              <div className="relative mt-4 mb-6 inline-block">
                {tier.recommended && (
                  <>
                    <HandDrawnCircle className="pointer-events-none absolute -inset-4 text-[#F5A623] opacity-60" />
                    <div className="absolute -top-10 -right-24 rotate-3">
                      <Annotation>most agencies pick this one</Annotation>
                    </div>
                  </>
                )}
                <span className="text-[28px] font-[600] tracking-tight tabular-nums">
                  {tier.price}
                </span>
                <span className="ml-2 text-[14px] text-muted-foreground">/ {tier.period}</span>
              </div>

              <p className="mb-8 h-12 text-[15px] text-muted-foreground">{tier.description}</p>

              <ul className="mb-8 flex-1 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start text-[15px]">
                    <Check className="mr-3 h-5 w-5 shrink-0 text-[#3DD68C]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.recommended ? (
                <button className="h-11 w-full rounded-[6px] bg-[#EDEDED] font-medium text-[#0A0A0A] transition-opacity hover:opacity-90">
                  Start with {tier.name}
                </button>
              ) : (
                <button className="h-11 w-full rounded-[6px] border border-[#333333] bg-transparent font-medium text-foreground transition-colors hover:bg-muted/10">
                  Start with {tier.name}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-32 max-w-3xl">
          <h2 className="mb-8 text-[20px] font-[600]">Frequently asked questions</h2>
          <Accordion className="w-full">
            <AccordionItem value="item-1" className="border-border">
              <AccordionTrigger className="text-[16px] font-[500]">
                Can I change plans later?
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-muted-foreground">
                Absolutely. You can upgrade or downgrade your plan at any time. Prorated charges
                will be applied automatically.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-border">
              <AccordionTrigger className="text-[16px] font-[500]">
                Is there a free trial?
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-muted-foreground">
                Yes, all plans come with a 14-day free trial. No credit card required to start.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-border">
              <AccordionTrigger className="text-[16px] font-[500]">
                What counts as an active project?
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-muted-foreground">
                Any project that is not marked as archived or completed. You can have unlimited
                archived projects on all plans.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-border">
              <AccordionTrigger className="text-[16px] font-[500]">
                How does the double-entry ledger work?
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-muted-foreground">
                Our Pro and Agency plans include a full double-entry accounting backend that syncs
                automatically with your invoices and expenses, ensuring your books always balance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-border">
              <AccordionTrigger className="text-[16px] font-[500]">
                Do you offer custom integrations?
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-muted-foreground">
                Custom API access and dedicated integrations are available on the Agency plan.
                Contact our team to discuss your specific needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </MarketingLayout>
  )
}
