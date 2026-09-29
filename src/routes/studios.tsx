import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Code2, PenTool, Shapes, Check, Layers } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowLink, pageHead, SiteShell } from "@/components/site-shell";
import { PrismarkDashboard } from "@/components/dashboard/prismark-dashboard";

export const Route = createFileRoute("/studios")({
  head: () =>
    pageHead(
      "For studios",
      "Prismark is designed for software consultancies, design studios, and multidisciplinary agencies.",
    ),
  component: Studios,
});

const studios = [
  {
    icon: Code2,
    n: "01",
    title: "Software consultancies",
    text: "Keep delivery, client decisions and project economics visible without pulling engineers into another reporting ritual.",
    cue: "Build clearly.",
    features: [
      "Sprint milestone burnup linked directly to client sign-offs",
      "Internal Git/technical discussions kept separate from client portal",
      "Fixed-bid milestone triggers and time-and-materials retainer tracking",
    ],
    tab: "delivery" as const,
  },
  {
    icon: PenTool,
    n: "02",
    title: "Design studios",
    text: "Give each review a place to land. Move from first direction to final sign-off with a client experience that feels considered.",
    cue: "Present beautifully.",
    features: [
      "Figma deliverable embeds with client approval history stamps",
      "Pristine asset download archive for clients with zero link rot",
      "Design revision caps and change-order invoice generation",
    ],
    tab: "client" as const,
  },
  {
    icon: Shapes,
    n: "03",
    title: "Product agencies",
    text: "See the many threads of a complex engagement together: people, milestones, approvals, conversations and money.",
    cue: "Connect the dots.",
    features: [
      "Cross-discipline team capacity planning and role assignments",
      "Unified decision log mapping product changes to milestone delivery",
      "Multi-currency milestone invoices with automated receipt tracking",
    ],
    tab: "ledger" as const,
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

      <section className="studio-list wrap">
        {studios.map((s) => (
          <article className="studio-row" key={s.n}>
            <span className="studio-num">{s.n}</span>
            <s.icon size={45} strokeWidth={1.2} />
            <div>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs text-[var(--foreground)]">
                {s.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-[var(--orange-field)] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="handnote">{s.cue}</span>
          </article>
        ))}
      </section>

      {/* Interactive Studio Archetypes Showcase */}
      <section className="intro-band border-t border-[var(--border)]">
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
