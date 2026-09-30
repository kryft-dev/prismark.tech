import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, Plus, Layers, ShieldCheck, Wallet, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowLink, pageHead, SiteShell } from "@/components/site-shell";
import {
  FinancialLedgerScreenshot,
  MilestoneSignoffScreenshot,
  StudioCapacityHeatmapScreenshot,
} from "@/components/dashboard/studio-screenshots";

export const Route = createFileRoute("/pricing")({
  head: () =>
    pageHead(
      "Pricing",
      "Clear pricing for Prismark studio workspaces, with plans for growing teams and unlimited client guests.",
    ),
  component: Pricing,
});

const plans = [
  {
    name: "Starter",
    monthly: 35,
    annual: 29,
    features: [
      "Up to 5 studio members",
      "Projects and milestones",
      "Client portal",
      "Conversations and files",
    ],
  },
  {
    name: "Pro",
    monthly: 49,
    annual: 39,
    features: [
      "Unlimited studio members",
      "Everything in Starter",
      "Invoices and ledger",
      "Advanced studio reporting",
    ],
  },
  {
    name: "Enterprise",
    monthly: 89,
    annual: 79,
    features: [
      "Everything in Pro",
      "Custom domain options",
      "Priority onboarding",
      "Tailored support",
    ],
  },
];

function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [seats, setSeats] = useState(5);

  return (
    <SiteShell>
      <section className="page-lead pricing-lead">
        <div className="wrap">
          <span className="eyebrow">Straightforward pricing</span>
          <h1>
            Only your team
            <br />
            <em>takes a seat.</em>
          </h1>
          <p>
            Clients and guests are included. Choose a plan for the way your
            studio works.
          </p>
        </div>
      </section>

      <section className="pricing-body wrap">
        <div className="pricing-controls">
          <div>
            <span className="section-number">Estimate your workspace</span>
            <div className="seat-control">
              <Button
                variant="outline"
                size="icon"
                aria-label="Remove a member"
                onClick={() => setSeats(Math.max(1, seats - 1))}
              >
                <Minus />
              </Button>
              <strong>{seats}</strong>
              <Button
                variant="outline"
                size="icon"
                aria-label="Add a member"
                onClick={() => setSeats(Math.min(100, seats + 1))}
              >
                <Plus />
              </Button>
              <span>studio members</span>
            </div>
          </div>
          <div
            className="billing-switch"
            role="group"
            aria-label="Billing period"
          >
            <Button
              variant={!annual ? "default" : "ghost"}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </Button>
            <Button
              variant={annual ? "default" : "ghost"}
              onClick={() => setAnnual(true)}
            >
              Yearly <span className="save-note">Lower rate</span>
            </Button>
          </div>
        </div>

        <div className="plan-grid">
          {plans.map((plan, i) => (
            <article
              className={"plan " + (i === 1 ? "featured" : "")}
              key={plan.name}
            >
              <span className="plan-number">
                0{i + 1} / {plan.name}
              </span>
              <div className="plan-price">
                <strong>${annual ? plan.annual : plan.monthly}</strong>
                <span>/ member / month</span>
              </div>
              <p className="plan-estimate">
                ${(annual ? plan.annual : plan.monthly) * seats}/month for{" "}
                {seats} {seats === 1 ? "member" : "members"}
                {annual ? " · billed yearly" : ""}
              </p>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>
                    <Check size={17} />
                    {f}
                  </li>
                ))}
              </ul>
              <ArrowLink to="/contact" light={i === 1}>
                Discuss {plan.name}
              </ArrowLink>
            </article>
          ))}
        </div>

        {/* =========================================================================
            3 DEDICATED PRODUCTION STUDIO DASHBOARD SCREENSHOTS
            ========================================================================= */}
        <div className="mt-28 space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="section-number">Platform Features In Detail</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">
              Inside your studio <em>operating workspace.</em>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-2">
              All plans include pristine client portal views, milestone sign-offs, and multi-currency ledger reconciliations.
            </p>
          </div>

          {/* Screenshot 1 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--orange-field)] uppercase tracking-wider flex items-center gap-2">
                <Wallet size={14} /> 01 / STUDIO REVENUE RECOGNITION & RETAINER LEDGER
              </span>
              <span className="text-xs font-mono text-[var(--muted-foreground)]">Stripe Reconciled</span>
            </div>
            <FinancialLedgerScreenshot />
          </div>

          {/* Screenshot 2 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--orange-field)] uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={14} /> 02 / MILESTONE DELIVERABLES SIGN-OFF DOSSIER
              </span>
              <span className="text-xs font-mono text-[var(--muted-foreground)]">Client Portal Signed</span>
            </div>
            <MilestoneSignoffScreenshot />
          </div>

          {/* Screenshot 3 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--orange-field)] uppercase tracking-wider flex items-center gap-2">
                <Layers size={14} /> 03 / STUDIO DISCIPLINE WORKLOAD & MEMBER CAPACITY
              </span>
              <span className="text-xs font-mono text-[var(--muted-foreground)]">Real-time Sprint Grid</span>
            </div>
            <StudioCapacityHeatmapScreenshot />
          </div>
        </div>

        <p className="pricing-note mt-16">
          Plan prices are drawn from the existing Prismark site. Confirm
          availability and final terms with the Prismark team.
        </p>
      </section>
    </SiteShell>
  );
}
