import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CircleDashed,
  FileCheck2,
  MessageSquareText,
  Quote,
  Star,
  Wallet,
} from "lucide-react";
import desk from "@/assets/studio-desk.jpg";
import { ArrowLink, pageHead, SiteShell } from "@/components/site-shell";
import { PrismarkDashboard } from "@/components/dashboard/prismark-dashboard";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "The agency operating system",
      "Prismark brings project work, client collaboration, conversations and money together in one considered workspace for studios.",
    ),
  component: Home,
});

const reviews = [
  {
    quote:
      "Before Prismark, our client reviews, milestones, and invoice reconciliations lived in three different universes. Clients now sign off on deliverables directly inside their clean portal, and invoices trigger automatically upon milestone completion. We cut 10+ hours of account management admin each week.",
    author: "David Peterson",
    role: "Co-Founder & Creative Partner",
    studio: "Archetype Design Co.",
    type: "Digital & Brand Studio",
    initials: "DP",
    outcome: "Saved 10 hrs/week per studio lead",
  },
  {
    quote:
      "The intentional line between our internal WIP drafts and the client view is the best feature any tool has ever built. Our engineers and designers have space to think and iterate without clients panicking, while clients get a pristine project dossier every Monday morning.",
    author: "Sarah Chen",
    role: "Managing Director",
    studio: "Atelier Nord",
    type: "Software Consultancy",
    initials: "SC",
    outcome: "Zero client miscommunications across 8 active engagements",
  },
  {
    quote:
      "Prismark completely transformed our retainer management. Clients see exactly how much sprint capacity has been delivered against milestones, and every invoice is tied to tangible work. We have eliminated awkward payment follow-up emails entirely.",
    author: "Marcus Reid",
    role: "Principal & Systems Lead",
    studio: "Fieldwork Interactive",
    type: "Product Agency",
    initials: "MR",
    outcome: "100% on-time milestone receivables in Q3",
  },
  {
    quote:
      "It’s the first studio platform that doesn’t feel like an enterprise spreadsheet or an oversimplified generic to-do list. It respects how modern multidisciplinary agencies actually run from discovery to final invoice.",
    author: "Elena Rodriguez",
    role: "Head of Delivery",
    studio: "Monolith Works",
    type: "Design & Engineering",
    initials: "ER",
    outcome: "+32% increase in billable hours captured",
  },
];

function Home() {
  return (
    <SiteShell>
      <section className="home-hero">
        <img
          src={desk}
          alt="Drafting papers and notes spread across a blue studio desk"
          className="hero-photo"
          width={1408}
          height={1104}
        />
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <span className="handnote hero-note">a better way to work ↘</span>
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              The studio operating system
            </span>
            <h1>
              Prismark<span className="hero-dot">.</span>
            </h1>
            <p>
              One place for the work, the people, the clients and the money
              behind your studio.
            </p>
            <div className="hero-buttons">
              <ArrowLink to="/product" light>
                Explore the workspace
              </ArrowLink>
              <Link to="/contact" className="hero-text-link">
                Talk to us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <span className="hero-index">
            A clearer picture of every project. <ArrowDownRight size={20} />
          </span>
        </div>
      </section>

      <section className="intro-band">
        <div className="wrap intro-grid">
          <span className="section-number">01 / The idea</span>
          <h2>
            Less tool-hopping.
            <br />
            <em>More making.</em>
          </h2>
          <div className="intro-aside">
            <p>
              The task board knows the milestone. The milestone knows the
              client. The invoice knows what shipped. Nothing has to be pieced
              together at the end of the week.
            </p>
            <span className="handnote">finally, one connected picture</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02 / INSIDE PRISMARK: INTERACTIVE STUDIO DASHBOARD SHOWCASE
          ========================================================================= */}
      <section className="blue-chapter">
        <div className="wrap">
          <div className="chapter-heading max-w-2xl mb-12">
            <span className="section-number">02 / Inside Prismark</span>
            <h2>A workspace with the whole story.</h2>
            <p>
              Experience the live studio operator console. Switch between delivery milestones, client-facing approval dossiers, real-time invoice ledgers, and context-bound decision threads.
            </p>
          </div>

          <div className="mt-8">
            <PrismarkDashboard initialTab="delivery" />
          </div>
        </div>
      </section>

      <section className="orange-chapter">
        <div className="wrap orange-grid">
          <div>
            <span className="section-number">03 / Built around trust</span>
            <h2>
              Everything in its <i>right place.</i>
            </h2>
          </div>
          <div className="orange-detail">
            <p>
              Your team sees the work behind the work. Your clients see the
              milestones, files and decisions that matter to them. Those two
              worlds stay intentionally separate.
            </p>
            <Link to="/studios" className="underlined-link">
              Find your fit <ArrowRight size={20} />
            </Link>
          </div>
          <div className="seal" aria-hidden="true">
            <Check size={34} />
            <span>clear by design</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          04 / VERIFIED STUDIO REVIEWS & STORIES
          ========================================================================= */}
      <section className="intro-band border-b border-[var(--border)]">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="section-number">04 / Verified Studio Reviews</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold mt-3">
                Trusted where <em>craft matters.</em>
              </h2>
            </div>
            <span className="handnote text-[var(--orange-field)] text-2xl -rotate-2">
              real feedback from the desk ↘
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="p-8 sm:p-10 rounded-lg border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between transition-all hover:border-[var(--foreground)]/50"
                style={{
                  boxShadow: "0 4px 20px -2px color-mix(in srgb, var(--ink) 6%, transparent)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-[var(--paper)] text-[var(--blue-field)] border border-[var(--border)] rounded">
                      {r.type}
                    </span>
                    <span className="text-xs font-mono text-[var(--muted-foreground)]">
                      {r.studio}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg leading-relaxed text-[var(--foreground)] mb-6 font-normal">
                    "{r.quote}"
                  </p>

                  <div className="p-3 bg-[var(--secondary)]/50 rounded border border-[var(--border)] text-xs font-mono mb-8">
                    <span className="text-[var(--orange-field)] font-bold">OUTCOME:</span>{" "}
                    <span className="text-[var(--foreground)]">{r.outcome}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--border)] flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full bg-[var(--blue-field)] text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-sm"
                    aria-label={r.author}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-[var(--foreground)]">
                      {r.author}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      {r.role} • {r.studio}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-band">
        <div className="wrap closing-grid">
          <span className="handnote">your next chapter starts here</span>
          <h2>
            Make room for
            <br />
            the good work.
          </h2>
          <ArrowLink to="/contact">Start a conversation</ArrowLink>
        </div>
      </section>
    </SiteShell>
  );
}
