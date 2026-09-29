import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CheckCircle2,
  LockKeyhole,
  MessageCircle,
  ReceiptText,
  Rows3,
} from "lucide-react";
import { ArrowLink, pageHead, SiteShell } from "@/components/site-shell";
import { PrismarkDashboard } from "@/components/dashboard/prismark-dashboard";

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
      <section className="product-parts wrap">
        {parts.map((p) => (
          <article className="product-part" key={p.n}>
            <div className="part-index">
              <span>{p.n} / 04</span>
              <p className="handnote">{p.mark}</p>
            </div>
            <div className="part-icon">
              <p.icon size={42} strokeWidth={1.35} />
              <ArrowUpRight size={22} />
            </div>
            <div className="part-copy">
              <h2>{p.title}</h2>
              <p>{p.text}</p>
              
              {/* Contextual mini dashboard screenshot preview for each feature */}
              <div
                className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-xs overflow-hidden"
                style={{
                  boxShadow: "0 10px 25px -5px color-mix(in srgb, var(--ink) 8%, transparent)",
                }}
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border)] text-[10px] font-mono text-[var(--muted-foreground)]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 font-bold text-[var(--foreground)]">
                      {p.n === "01" && "studio.prismark.tech/milestones/live-sprint"}
                      {p.n === "02" && "portal.prismark.tech/lumina-client-view"}
                      {p.n === "03" && "studio.prismark.tech/ledger/inv-2026-092"}
                      {p.n === "04" && "studio.prismark.tech/decisions/thread-48"}
                    </span>
                  </div>
                  <span className="text-[var(--orange-field)] font-bold uppercase tracking-wider">
                    {p.n === "01" && "75% Sprint Complete"}
                    {p.n === "02" && "Signed by CEO"}
                    {p.n === "03" && "$8,500.00 Settled"}
                    {p.n === "04" && "Approved Decision"}
                  </span>
                </div>

                {p.n === "01" && (
                  <div className="space-y-2">
                    <div className="p-2.5 bg-[var(--paper)] text-[var(--ink)] rounded flex items-center justify-between">
                      <span className="font-bold">Phase 03: Website Experience & Handoff</span>
                      <span className="px-2 py-0.5 bg-[var(--blue-field)] text-white text-[10px] font-bold rounded">In Review</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[var(--muted-foreground)] px-1">
                      <span>4 deliverable artifacts</span>
                      <span className="font-mono text-[var(--foreground)] font-bold">$6,000 Milestone</span>
                    </div>
                  </div>
                )}

                {p.n === "02" && (
                  <div className="space-y-2">
                    <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded flex items-center justify-between">
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">Milestone 02 Design Direction Sign-off</span>
                      <span className="text-[10px] font-mono text-emerald-600">Verified Signature</span>
                    </div>
                    <p className="text-[11px] text-[var(--muted-foreground)] px-1">
                      Client sees approved files and signed contracts. Internal drafts stay hidden.
                    </p>
                  </div>
                )}

                {p.n === "03" && (
                  <div className="space-y-2">
                    <div className="p-2.5 bg-[var(--secondary)]/60 rounded flex items-center justify-between font-mono">
                      <span>INV-2026-092 • Phase 02 Milestone</span>
                      <span className="font-bold text-[var(--foreground)]">$8,500.00 PAID</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[var(--muted-foreground)] px-1">
                      <span>Automated Stripe & ACH Reconciled</span>
                      <span className="text-emerald-600 font-bold">100% On Time</span>
                    </div>
                  </div>
                )}

                {p.n === "04" && (
                  <div className="space-y-2">
                    <div className="p-2.5 bg-[var(--card)] border border-[var(--border)] rounded">
                      <div className="font-bold text-[var(--foreground)]">Typography & Motion Refinement</div>
                      <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">Bound directly to Milestone 03 deliverables</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Interactive Workspace Exploration */}
      <section className="intro-band border-t border-[var(--border)]">
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
