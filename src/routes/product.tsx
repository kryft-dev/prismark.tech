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
        {parts.map((p, i) => (
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
            </div>
          </article>
        ))}
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
