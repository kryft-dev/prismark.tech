import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageHead, SiteShell } from "@/components/site-shell";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact",
      "Start a conversation with Prismark about bringing work, clients and business operations into one workspace.",
    ),
  component: Contact,
});
function Contact() {
  const [name, setName] = useState("");
  const [studio, setStudio] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  function send(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Prismark enquiry — ${studio || name}`);
    const body = encodeURIComponent(
      `Hi Prismark,\n\n${note}\n\nName: ${name}\nStudio: ${studio}\nEmail: ${email}`,
    );
    window.location.href = `mailto:contact@prismark.tech?subject=${subject}&body=${body}`;
  }
  return (
    <SiteShell>
      <section className="page-lead contact-lead">
        <div className="wrap">
          <span className="eyebrow">Start here</span>
          <h1>
            Let’s talk about
            <br />
            <em>your studio.</em>
          </h1>
          <p>
            Tell us what you’re making, what’s getting in the way, and what a
            better working day might look like.
          </p>
        </div>
      </section>
      <section className="contact-body wrap">
        <div className="contact-aside">
          <Mail size={40} strokeWidth={1.3} />
          <h2>A note is a good start.</h2>
          <p>
            This form opens a draft in your email app. Review it there before
            sending.
          </p>
          <span className="handnote">we’d love to hear from you ↗</span>
        </div>
        <form className="contact-form" onSubmit={send}>
          <div className="form-row">
            <label>
              Your name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>
            <label>
              Studio name
              <input
                required
                value={studio}
                onChange={(e) => setStudio(e.target.value)}
                placeholder="Your studio"
              />
            </label>
          </div>
          <label>
            Work email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com"
            />
          </label>
          <label>
            What would you like to talk about?
            <textarea
              required
              rows={5}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tell us a little about your team and what you're looking for..."
            />
          </label>
          <Button type="submit" className="contact-submit">
            Open email draft <ArrowUpRight size={18} />
          </Button>
        </form>
      </section>
    </SiteShell>
  );
}
