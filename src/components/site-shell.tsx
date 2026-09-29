import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/product", label: "The workspace" },
  { to: "/studios", label: "For studios" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "Our approach" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const saved = localStorage.getItem("prismark-theme");
    const next = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, []);
  useEffect(() => setOpen(false), [path]);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("prismark-theme", next ? "dark" : "light");
  }
  return (
    <div className="site-shell min-h-screen bg-background text-foreground">
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="brand" aria-label="Prismark home">
            <span className="brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>
              prismark<span className="brand-period">.</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={path === item.to ? "nav-link active" : "nav-link"}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              title={dark ? "Light mode" : "Dark mode"}
            >
              {dark ? <Sun /> : <Moon />}
            </Button>
            <Button asChild className="header-cta">
              <Link to="/contact">
                Get in touch <ArrowRight />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu-button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {nav.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
            <Link to="/contact">
              Get in touch <ArrowRight size={18} />
            </Link>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <Link to="/" className="brand footer-brand">
              <span className="brand-mark" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span>
                prismark<span className="brand-period">.</span>
              </span>
            </Link>
            <p>Good work deserves a better place to happen.</p>
          </div>
          <div className="footer-links">
            <Link to="/product">Workspace</Link>
            <Link to="/studios">Studios</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">Approach</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-bottom flex flex-col sm:flex-row items-center justify-between gap-3 text-[var(--foreground)]">
            <span>
              © {new Date().getFullYear()} Prismark. Made for the people behind
              the projects.
            </span>
            <span>
              built by{" "}
              <a
                href="https://kryft.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline text-[var(--orange-field)] hover:opacity-80 transition-opacity"
              >
                Kryft
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} — Prismark` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — Prismark` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
export function ArrowLink({
  to,
  children,
  light = false,
}: {
  to: "/product" | "/studios" | "/pricing" | "/about" | "/contact";
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Button asChild className={light ? "paper-button" : "ink-button"}>
      <Link to={to}>
        {children}
        <ArrowRight size={18} />
      </Link>
    </Button>
  );
}
