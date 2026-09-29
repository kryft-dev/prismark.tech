import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Code2, PenTool, Shapes } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowLink, pageHead, SiteShell } from "@/components/site-shell";
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
  },
  {
    icon: PenTool,
    n: "02",
    title: "Design studios",
    text: "Give each review a place to land. Move from first direction to final sign-off with a client experience that feels considered.",
    cue: "Present beautifully.",
  },
  {
    icon: Shapes,
    n: "03",
    title: "Product agencies",
    text: "See the many threads of a complex engagement together: people, milestones, approvals, conversations and money.",
    cue: "Connect the dots.",
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
            </div>
            <span className="handnote">{s.cue}</span>
          </article>
        ))}
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
