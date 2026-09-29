import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CircleDashed,
  FileCheck2,
  MessageSquareText,
  Wallet,
} from "lucide-react";
import desk from "@/assets/studio-desk.jpg";
import { ArrowLink, pageHead, SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "The agency operating system",
      "Prismark brings project work, client collaboration, conversations and money together in one considered workspace for studios.",
    ),
  component: Home,
});

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
      <section className="blue-chapter">
        <div className="wrap chapter-grid">
          <div className="chapter-heading">
            <span className="section-number">02 / Inside Prismark</span>
            <h2>A workspace with the whole story.</h2>
            <p>Four moving parts, designed to move together.</p>
            <ArrowLink to="/product" light>
              See how it works
            </ArrowLink>
          </div>
          <div className="system-paper">
            <div className="paper-top">
              <span>PROJECT FILE / STUDIO VIEW</span>
              <span>● IN MOTION</span>
            </div>
            <div className="paper-title">
              <span className="handnote">a week in the studio</span>
              <h3>Website refresh</h3>
              <span>Milestone 03 of 04</span>
            </div>
            <div className="progress-track">
              <span />
            </div>
            <div className="paper-list">
              <div>
                <CircleDashed />
                <span>
                  <strong>Work</strong>
                  <small>Design system handoff</small>
                </span>
                <b>In review</b>
              </div>
              <div>
                <FileCheck2 />
                <span>
                  <strong>Client</strong>
                  <small>Homepage direction</small>
                </span>
                <b>Approved</b>
              </div>
              <div>
                <MessageSquareText />
                <span>
                  <strong>Conversation</strong>
                  <small>Feedback on the final pass</small>
                </span>
                <b>2 notes</b>
              </div>
              <div>
                <Wallet />
                <span>
                  <strong>Money</strong>
                  <small>Milestone invoice</small>
                </span>
                <b>Ready</b>
              </div>
            </div>
            <div className="paper-foot">
              Workspace preview <span>↗</span>
            </div>
          </div>
          <span className="scribble-star" aria-hidden="true">
            ✳
          </span>
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
