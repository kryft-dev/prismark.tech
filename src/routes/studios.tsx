import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Code2, PenTool, Shapes, Check, Layers, Building2, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowLink, pageHead, SiteShell } from "@/components/site-shell";
import { PrismarkDashboard } from "@/components/dashboard/prismark-dashboard";
import {
  MilestoneSignoffScreenshot,
  ClientReviewPortalScreenshot,
  ArchitectureSpecConsoleScreenshot,
  FinancialLedgerScreenshot,
} from "@/components/dashboard/studio-screenshots";

export const Route = createFileRoute("/studios")({
  head: () =>
    pageHead(
      "For studios",
      "Prismark is designed for software consultancies, design studios, architecture practices, and multidisciplinary agencies.",
    ),
  component: Studios,
});

const studios = [
  {
    icon: Code2,
    n: "01",
    title: "Software & engineering consultancies",
    text: "Keep sprint delivery, client sign-offs and project economics visible without pulling engineers into another reporting ritual.",
    cue: "Build clearly.",
    features: [
      "Sprint milestone burnup linked directly to client sign-offs",
      "Internal Git/technical discussions kept separate from client portal",
      "Fixed-bid milestone triggers and time-and-materials retainer tracking",
    ],
  },
  {
    icon: PenTool,
    n: "02",
    title: "Design & brand studios",
    text: "Give each review a place to land. Move from first direction to final sign-off with a client experience that feels considered.",
    cue: "Present beautifully.",
    features: [
      "Figma deliverable embeds with client approval history stamps",
      "Pristine asset download archive for clients with zero link rot",
      "Design revision caps and change-order invoice generation",
    ],
  },
  {
    icon: Building2,
    n: "03",
    title: "Spatial & architecture practices",
    text: "Review drawing sets, material schedules, and contractor submittals with an immutable client sign-off audit trail.",
    cue: "Craft space.",
    features: [
      "CAD/IFC drawing set approvals and revision logs",
      "Contractor submittal tracking and fee phase milestones",
      "Multi-discipline consultant fee breakdown and ledger",
    ],
  },
];

function Studios() {
  return (
    <SiteShell>
      <section className="page-lead studio-lead">
        <div className="wrap">
          <span className="eyebrow">Made for teams that make things</span>
          <h1>
            Built for the
            <br />
            <em>messy middle.</em>
          </h1>
          <p>
            For the studios where creative work, client relationships and
            business reality all share the same calendar.
          </p>
        </div>
      </section>

      {/* Archetype List with Integrated Screenshots */}
      <section className="studio-list wrap space-y-20 py-12">
        {/* Archetype 1 */}
        <article className="space-y-6">
          <div className="studio-row">
            <span className="studio-num">01</span>
            <Code2 size={45} strokeWidth={1.2} />
            <div>
              <h2>Software & engineering consultancies</h2>
              <p>Keep sprint delivery, client decisions and project economics visible without pulling engineers into another reporting ritual.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs text-[var(--foreground)]">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[var(--orange-field)] shrink-0 mt-0.5" />
                  <span>Sprint milestone burnup linked directly to client sign-offs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[var(--orange-field)] shrink-0 mt-0.5" />
                  <span>Internal Git/technical discussions kept separate from client portal</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[var(--orange-field)] shrink-0 mt-0.5" />
                  <span>Fixed-bid milestone triggers and time-and-materials retainer tracking</span>
                </li>
              </ul>
            </div>
            <span className="handnote">Build clearly.</span>
          </div>
          <MilestoneSignoffScreenshot />
        </article>

        {/* Archetype 2 */}
        <article className="space-y-6 pt-12 border-t border-[var(--border)]">
          <div className="studio-row">
            <span className="studio-num">02</span>
            <PenTool size={45} strokeWidth={1.2} />
            <div>
              <h2>Design & brand studios</h2>
              <p>Give each review a place to land. Move from first direction to final sign-off with a client experience that feels considered.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs text-[var(--foreground)]">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[var(--orange-field)] shrink-0 mt-0.5" />
                  <span>Figma deliverable embeds with client approval history stamps</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[var(--orange-field)] shrink-0 mt-0.5" />
                  <span>Pristine asset download archive for clients with zero link rot</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[var(--orange-field)] shrink-0 mt-0.5" />
                  <span>Design revision caps and change-order invoice generation</span>
                </li>
              </ul>
            </div>
            <span className="handnote">Present beautifully.</span>
          </div>
          <ClientReviewPortalScreenshot />
        </article>

        {/* Archetype 3 */}
        <article className="space-y-6 pt-12 border-t border-[var(--border)]">
          <div className="studio-row">
            <span className="studio-num">03</span>
            <Building2 size={45} strokeWidth={1.2} />
            <div>
              <h2>Spatial & architecture practices</h2>
              <p>Review drawing sets, material schedules, and contractor submittals with an immutable client sign-off audit trail.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs text-[var(--foreground)]">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[var(--orange-field)] shrink-0 mt-0.5" />
                  <span>CAD/IFC drawing set approvals and revision logs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[var(--orange-field)] shrink-0 mt-0.5" />
                  <span>Contractor submittal tracking and fee phase milestones</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-[var(--orange-field)] shrink-0 mt-0.5" />
                  <span>Multi-discipline consultant fee breakdown and ledger</span>
                </li>
              </ul>
            </div>
            <span className="handnote">Craft space.</span>
          </div>
          <ArchitectureSpecConsoleScreenshot />
        </article>
      </section>

      {/* Interactive Studio Archetypes Showcase */}
      <section className="intro-band border-t border-[var(--border)] py-20">
        <div className="wrap">
          <div className="max-w-2xl mb-12">
            <span className="section-number">Live Studio Environment</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3">
              One system. <em>Your studio flow.</em>
            </h2>
            <p className="text-[var(--muted-foreground)] mt-3 text-base sm:text-lg">
              Explore the studio console below. Test how milestone handoffs, client portals, and invoice ledgers operate in unison.
            </p>
          </div>
          <PrismarkDashboard initialTab="delivery" />
        </div>
      </section>

      <section className="studio-bottom">
        <div className="wrap">
          <span className="section-number">The common thread</span>
          <h2>
            More clarity for the team.
            <br />A better experience for the client.
          </h2>
          <ArrowLink to="/contact" light>
            Tell us about your studio
          </ArrowLink>
        </div>
      </section>
    </SiteShell>
  );
}
