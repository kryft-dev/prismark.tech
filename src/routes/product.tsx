import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CheckCircle2,
  LockKeyhole,
  MessageCircle,
  ReceiptText,
  Rows3,
  Layers,
  Sparkles,
} from "lucide-react";
import { ArrowLink, pageHead, SiteShell } from "@/components/site-shell";
import { PrismarkDashboard } from "@/components/dashboard/prismark-dashboard";
import {
  MilestoneSignoffScreenshot,
  ClientReviewPortalScreenshot,
  FinancialLedgerScreenshot,
  StudioCapacityHeatmapScreenshot,
} from "@/components/dashboard/studio-screenshots";

export const Route = createFileRoute("/product")({
  head: () =>
    pageHead(
      "The workspace",
      "Explore how Prismark connects project work, client portals, conversations, and studio finances.",
    ),
  component: Product,
});

const parts = [
  {
    n: "01",
    icon: Rows3,
    title: "Work that moves",
    text: "Bring tasks, milestones and reviews into the same view. Know what is moving, what needs a decision, and what is ready to share.",
    mark: "TASKS → MILESTONES",
  },
  {
    n: "02",
    icon: LockKeyhole,
    title: "A considered client view",
    text: "Give clients a clean view of progress, shared files and approvals. Keep internal conversations and finances on your side of the desk.",
    mark: "INTERNAL ≠ CLIENT",
  },
  {
    n: "03",
    icon: ReceiptText,
    title: "Money with context",
    text: "Connect invoices, payments, expenses and the ledger to the projects that generated them. Keep the story behind each number close.",
    mark: "WORK → INVOICE",
  },
  {
    n: "04",
    icon: MessageCircle,
    title: "Conversation in place",
    text: "Keep decisions beside the projects and milestones they belong to, not buried in another tab or lost in a separate thread.",
    mark: "DECISIONS STAY HERE",
  },
];

function Product() {
  return (
    <SiteShell>
      <section className="page-lead product-lead">
        <div className="wrap">
          <span className="eyebrow">The workspace / 01</span>
          <h1>
            One place.
            <br />
            <em>The whole picture.</em>
          </h1>
          <p>
            Not another tab in the stack. A connected place to run your studio
            from first conversation to final invoice.
          </p>
        </div>
      </section>

      {/* 4 Feature Deep-Dives with Standalone Screenshots */}
      <section className="product-parts wrap space-y-24 py-16">
        {/* Part 1 */}
        <article className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div className="flex items-center gap-3">
              <Rows3 size={28} className="text-[var(--blue-field)]" />
              <div>
                <span className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase">01 / 04 // TASKS → MILESTONES</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">Work that moves with clarity</h2>
              </div>
            </div>
            <span className="text-xs font-mono text-[var(--orange-field)] font-bold hidden sm:inline">MILESTONE PROGRESSION</span>
          </div>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
            Bring tasks, milestone deliverables and sign-offs into the same connected canvas. Know what is moving, what needs a decision, and what is ready to share with your clients.
          </p>
          <MilestoneSignoffScreenshot />
        </article>

        {/* Part 2 */}
        <article className="space-y-6 pt-12 border-t border-[var(--border)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div className="flex items-center gap-3">
              <LockKeyhole size={28} className="text-[var(--orange-field)]" />
              <div>
                <span className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase">02 / 04 // INTERNAL ≠ CLIENT PORTAL</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">A considered client review portal</h2>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-bold hidden sm:inline">ZERO ACCIDENTAL EXPOSURE</span>
          </div>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
            Give clients a clean view of progress, interactive file prototypes, and approval checkmarks. Keep internal rough drafts and studio financial notes securely on your side of the desk.
          </p>
          <ClientReviewPortalScreenshot />
        </article>

        {/* Part 3 */}
        <article className="space-y-6 pt-12 border-t border-[var(--border)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div className="flex items-center gap-3">
              <ReceiptText size={28} className="text-emerald-600" />
              <div>
                <span className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase">03 / 04 // WORK → INVOICE RECONCILER</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">Studio finances tied directly to work</h2>
              </div>
            </div>
            <span className="text-xs font-mono text-[var(--blue-field)] font-bold hidden sm:inline">STRIPE SYNCED</span>
          </div>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
            Connect invoices, milestone payments, retainers, and the studio ledger to the exact projects that generated them. Never scramble to remember what scope a payment was for.
          </p>
          <FinancialLedgerScreenshot />
        </article>

        {/* Part 4 */}
        <article className="space-y-6 pt-12 border-t border-[var(--border)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div className="flex items-center gap-3">
              <Layers size={28} className="text-purple-600" />
              <div>
                <span className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase">04 / 04 // CAPACITY & SPRINT HEATMAP</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">Studio discipline capacity & sprint flow</h2>
              </div>
            </div>
            <span className="text-xs font-mono text-purple-600 font-bold hidden sm:inline">WORKLOAD BALANCE</span>
          </div>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
            Know your studio's genuine availability across spatial architecture, digital design, and creative engineering before committing to client retainer timelines.
          </p>
          <StudioCapacityHeatmapScreenshot />
        </article>
      </section>

      {/* Interactive Workspace Exploration */}
      <section className="intro-band border-t border-[var(--border)] py-20">
        <div className="wrap">
          <div className="max-w-2xl mb-12">
            <span className="section-number">Live Workspace Demonstration</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3">
              The connected <em>studio console.</em>
            </h2>
            <p className="text-[var(--muted-foreground)] mt-3 text-base sm:text-lg">
              Explore the live operator interface below. Toggle between milestone deliverables, client-side views, and context-bound invoices.
            </p>
          </div>
          <PrismarkDashboard initialTab="delivery" />
        </div>
      </section>

      <section className="feature-end">
        <div className="wrap feature-end-inner">
          <CheckCircle2 size={42} />
          <h2>
            From “where did that go?”
            <br />
            to “we’ve got this.”
          </h2>
          <ArrowLink to="/contact" light>
            Let’s talk
          </ArrowLink>
        </div>
      </section>
    </SiteShell>
  );
}
