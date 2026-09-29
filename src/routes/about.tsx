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
