import { createFileRoute } from "@tanstack/react-router";
import { ArrowLink, pageHead, SiteShell } from "@/components/site-shell";
import {
  MilestoneSignoffScreenshot,
  FinancialLedgerScreenshot,
} from "@/components/dashboard/studio-screenshots";
import { Globe, ShieldCheck, Sparkles, Building2, Layers, Compass } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "Our approach",
      "Why Prismark is building a more thoughtful operating system for creative and technical studios.",
    ),
  component: About,
});

function About() {
  const studioDirectory = [
    {
      name: "Atelier Nord",
      type: "Architecture & Spatial Practice",
      location: "Stockholm, SE",
      projectsCount: "14 Engagements",
      discipline: "Timber construction, public museums, civic spaces",
    },
    {
      name: "Koto Spatial",
      type: "3D & Industrial Design",
      location: "Copenhagen, DK",
      projectsCount: "22 Engagements",
      discipline: "Physical-digital interfaces, kinetic lighting, CAD systems",
    },
    {
      name: "Studio Monolith",
      type: "Digital Product Consultancy",
      location: "London, UK",
      projectsCount: "36 Engagements",
      discipline: "Design systems, fintech web applications, high-density UI",
    },
    {
      name: "Aethelred Foundry",
      type: "Type & Editorial Design",
      location: "Brooklyn, NY",
      projectsCount: "18 Engagements",
      discipline: "Custom type systems, variable font engineering, publishing",
    },
    {
      name: "Bureau Hyperion",
      type: "Multidisciplinary Brand Studio",
      location: "Paris, FR",
      projectsCount: "29 Engagements",
      discipline: "Global identity systems, luxury packaging, motion graphics",
    },
    {
      name: "Studio Veldt",
      type: "Urban & Landscape Research",
      location: "Zurich, CH",
      projectsCount: "12 Engagements",
      discipline: "Ecological site analysis, masterplanning, master drawing sets",
    },
  ];

  return (
    <SiteShell>
      <section className="page-lead about-lead">
        <div className="wrap">
          <span className="eyebrow">A note from the desk</span>
          <h1>
            Tools should make
            <br />
            room for <em>the work.</em>
          </h1>
          <p>
            Prismark starts with a simple belief: running a studio should feel
            as thoughtfully designed as the work it creates.
          </p>
        </div>
      </section>

      <section className="about-story wrap">
        <div className="story-margin">
          <span className="handnote">the thought behind Prismark ↘</span>
          <span className="story-rule" />
        </div>
        <div className="story-copy">
          <h2>Less friction. Better flow.</h2>
          <p>
            Projects don’t happen in isolated columns. A small decision changes
            a milestone. A milestone becomes an approval. That approval becomes
            an invoice. Yet most studios are asked to stitch that story together
            across a dozen disconnected tools.
          </p>
          <p>
            We’re building Prismark around those connections: a focused place
            where teams can do the work, clients can follow what matters, and
            the business can see the complete picture.
          </p>
          <blockquote>
            “The best systems leave more attention for the people using them.”
          </blockquote>
          <p>
            That’s the standard we’re designing toward. One thoughtful decision
            at a time.
          </p>
        </div>
      </section>

      {/* =========================================================================
          GLOBAL STUDIO PRACTICE DIRECTORY (EXPANDED REAL-WORLD NETWORK)
          ========================================================================= */}
      <section className="intro-band border-t border-[var(--border)] py-20">
        <div className="wrap space-y-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="section-number">The Studio Practice Network</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold mt-3">
                Powering leading <em>creative practices.</em>
              </h2>
            </div>
            <p className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider">
              STOCKHOLM • LONDON • COPENHAGEN • BROOKLYN • PARIS • ZURICH
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studioDirectory.map((studio, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between transition-all hover:border-[var(--foreground)]/50"
                style={{
                  boxShadow: "0 4px 18px -2px color-mix(in srgb, var(--ink) 5%, transparent)",
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-xl font-extrabold text-[var(--foreground)]">
                      {studio.name}
                    </h4>
                    <span className="px-2 py-0.5 bg-[var(--paper)] border border-[var(--border)] text-[10px] font-mono uppercase tracking-wider text-[var(--muted-foreground)] rounded shrink-0">
                      {studio.location}
                    </span>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--orange-field)] mb-2">
                    {studio.type}
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-4">
                    {studio.discipline}
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted-foreground)]">
                  <span>Tracked on Prismark</span>
                  <span className="font-bold text-[var(--foreground)]">{studio.projectsCount}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Embedded High Contrast Studio Console */}
          <div className="mt-12 space-y-4">
            <span className="text-xs font-mono text-[var(--orange-field)] font-bold uppercase tracking-wider">
              /// LIVE STUDIO OPERATING DOSSIER
            </span>
            <FinancialLedgerScreenshot />
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="wrap">
          <span className="section-number">Keep the conversation going</span>
          <h2>Tell us what your studio needs.</h2>
          <ArrowLink to="/contact" light>
            Get in touch
          </ArrowLink>
        </div>
      </section>
    </SiteShell>
  );
}
