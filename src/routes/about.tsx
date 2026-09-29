import { createFileRoute } from "@tanstack/react-router";
import { ArrowLink, pageHead, SiteShell } from "@/components/site-shell";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "Our approach",
      "Why Prismark is building a more thoughtful operating system for creative and technical studios.",
    ),
  component: About,
});
function About() {
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
          THE STUDIO TEAM BEHIND PRISMARK
          ========================================================================= */}
      <section className="intro-band border-t border-[var(--border)]">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="section-number">The People Behind the Desk</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold mt-3">
                Crafted by <em>studio operators.</em>
              </h2>
            </div>
            <p className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider">
              STOCKHOLM • LONDON • COPENHAGEN • BROOKLYN
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Arthur Pendelton",
                role: "Founder & Studio Architect",
                location: "Stockholm",
                bio: "Former partner at Nord Studio. Built Prismark after spending six years managing 30-person engagements across fragmented spreadsheets and messaging apps.",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
                initials: "AP",
                hasPhoto: true,
              },
              {
                name: "Amara Okafor",
                role: "Head of Systems & Engineering",
                location: "London",
                bio: "Distributed systems specialist. Previously built collaborative document infrastructure at Linear. Passionate about tactile, low-latency UI architecture.",
                image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&auto=format&fit=crop&q=80",
                initials: "AO",
                hasPhoto: true,
              },
              {
                name: "Liam Vance",
                role: "Principal Product Designer",
                location: "Brooklyn",
                bio: "Type and editorial design specialist. Directs the paper aesthetics, typography hierarchy, and human handwriting accents across the Prismark operating system.",
                initials: "LV",
                hasPhoto: false,
                initialBg: "bg-[var(--orange-field)]",
              },
              {
                name: "Chloé Dupont",
                role: "Director of Studio Partnerships",
                location: "Paris",
                bio: "Advises boutique digital consultancies, architecture offices, and multidisciplinary practices on client onboarding, billing flow, and retainer scalability.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
                initials: "CD",
                hasPhoto: true,
              },
              {
                name: "Kareem El-Sayed",
                role: "Lead Infrastructure Engineer",
                location: "Copenhagen",
                bio: "Specializes in secure multi-tenant client portals, real-time ledger reconciliations, and granular permission architectures.",
                initials: "KE",
                hasPhoto: false,
                initialBg: "bg-[var(--blue-field)]",
              },
              {
                name: "Nora Lind",
                role: "Client Experience & Research",
                location: "Stockholm",
                bio: "Studies agency-client dynamics to eliminate friction from approvals, contracts, and milestone deliverables without turning relationships into tickets.",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
                initials: "NL",
                hasPhoto: true,
              },
            ].map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between transition-all hover:border-[var(--foreground)]/50"
                style={{
                  boxShadow: "0 4px 18px -2px color-mix(in srgb, var(--ink) 5%, transparent)",
                }}
              >
                <div>
                  <div className="relative aspect-square w-full mb-6 rounded-md border-2 border-[var(--border)] overflow-hidden bg-[var(--paper)] flex items-center justify-center">
                    {m.hasPhoto && m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className={`w-28 h-28 rounded-full ${m.initialBg || "bg-[var(--blue-field)]"} text-white font-mono font-extrabold text-3xl flex items-center justify-center shadow-md border-4 border-[var(--card)]`}
                        aria-label={m.name}
                      >
                        {m.initials}
                      </div>
                    )}
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-[var(--card)] border border-[var(--border)] text-[10px] font-mono uppercase tracking-wider text-[var(--muted-foreground)] rounded">
                      {m.location}
                    </span>
                  </div>

                  <h4 className="text-xl font-extrabold text-[var(--foreground)] mb-1">
                    {m.name}
                  </h4>
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--orange-field)] mb-3">
                    {m.role}
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    {m.bio}
                  </p>
                </div>
              </div>
            ))}
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
