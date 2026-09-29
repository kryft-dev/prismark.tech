import { useState } from "react";
import {
  CheckCircle2,
  CircleDashed,
  Clock,
  Download,
  Eye,
  FileCheck2,
  Lock,
  MessageSquareText,
  Plus,
  ReceiptText,
  Rows3,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

export type StudioTab = "delivery" | "client" | "ledger" | "conversations";

interface PrismarkDashboardProps {
  initialTab?: StudioTab;
  className?: string;
}

export function PrismarkDashboard({
  initialTab = "delivery",
  className = "",
}: PrismarkDashboardProps) {
  const [activeTab, setActiveTab] = useState<StudioTab>(initialTab);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(2);
  const [clientViewMode, setClientViewMode] = useState<"client" | "internal">("client");

  const milestones = [
    {
      id: "m1",
      number: "01",
      title: "Discovery & Brand Strategy",
      status: "Completed",
      due: "Aug 15",
      amount: "$6,000",
      invoiceStatus: "Paid",
      deliverablesCount: 3,
    },
    {
      id: "m2",
      number: "02",
      title: "Design System & Direction",
      status: "Completed",
      due: "Sep 04",
      amount: "$8,500",
      invoiceStatus: "Paid",
      deliverablesCount: 5,
    },
    {
      id: "m3",
      number: "03",
      title: "Website Experience & Prototypes",
      status: "In Progress",
      due: "Oct 02",
      amount: "$6,000",
      invoiceStatus: "Ready to Bill",
      deliverablesCount: 4,
    },
    {
      id: "m4",
      number: "04",
      title: "Production Build & Launch",
      status: "Upcoming",
      due: "Oct 24",
      amount: "$4,000",
      invoiceStatus: "Pending",
      deliverablesCount: 3,
    },
  ];

  return (
    <div
      className={`rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] overflow-hidden transition-all duration-300 ${className}`}
      style={{
        boxShadow:
          "0 28px 56px -12px color-mix(in srgb, var(--ink) 24%, transparent), 0 16px 28px -14px color-mix(in srgb, var(--ink) 18%, transparent), 0 0 0 1px var(--border)",
      }}
    >
      {/* Studio Desktop App Window Titlebar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--secondary)]/70 select-none gap-3">
        <div className="flex items-center gap-3">
          {/* Traffic light window controls */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block border border-black/20 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block border border-black/20 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block border border-black/20 shadow-sm" />
          </div>

          {/* Browser / Studio URL Address Bar */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[var(--card)] border border-[var(--border)] rounded-md text-[11px] font-mono text-[var(--muted-foreground)] min-w-[260px] md:min-w-[340px]">
            <span className="text-emerald-500 font-bold text-xs">🔒</span>
            <span>https://</span>
            <span className="font-bold text-[var(--blue-field)]">studio.prismark.tech</span>
            <span>/atelier-nord/</span>
            <span className="font-semibold text-[var(--foreground)]">{activeTab}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 ml-auto sm:ml-0">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-[var(--background)] border border-[var(--border)] rounded text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--orange-field)] animate-pulse" />
            <span className="font-semibold text-[var(--foreground)]">Studio Live</span>
            <span className="text-[var(--muted-foreground)] hidden md:inline">• M03 / 04</span>
          </div>

          <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 bg-[var(--paper)] text-[var(--ink)] border border-[var(--border)] rounded text-[11px] font-bold shadow-sm">
            <ShieldCheck size={13} className="text-[var(--blue-field)]" />
            <span>Client Signed-Off</span>
          </div>
        </div>
      </div>

      {/* Main Studio Frame Layout */}
      <div className="flex flex-col lg:flex-row min-h-[520px]">
        {/* Studio Left Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--secondary)]/30 flex flex-col justify-between">
          <div className="p-3.5 space-y-4">
            {/* Active Studio Engagement Card */}
            <div className="p-3 rounded bg-[var(--card)] border border-[var(--border)]">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">
                <span>Engagement</span>
                <span className="text-[var(--orange-field)] font-semibold">Active</span>
              </div>
              <div className="font-extrabold text-sm text-[var(--foreground)] leading-tight">
                Lumina Labs Refresh
              </div>
              <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                Brand System & Web App
              </div>
              <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[11px]">
                <span className="text-[var(--muted-foreground)]">Budget:</span>
                <span className="font-mono font-bold text-[var(--foreground)]">$24,500</span>
              </div>
            </div>

            {/* Studio Navigation Sections */}
            <div>
              <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                Studio Dossier
              </div>
              <nav className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-1">
                <button
                  onClick={() => setActiveTab("delivery")}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === "delivery"
                      ? "bg-[var(--blue-field)] text-white font-bold"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Rows3 size={15} />
                    <span>Work & Milestones</span>
                  </div>
                  <span className="text-[10px] opacity-80">3/4</span>
                </button>

                <button
                  onClick={() => setActiveTab("client")}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === "client"
                      ? "bg-[var(--blue-field)] text-white font-bold"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileCheck2 size={15} />
                    <span>Client Portal</span>
                  </div>
                  <span className="text-[10px] px-1 bg-[var(--orange-field)] text-white rounded font-mono font-bold">
                    Live
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("ledger")}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === "ledger"
                      ? "bg-[var(--blue-field)] text-white font-bold"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ReceiptText size={15} />
                    <span>Money & Ledger</span>
                  </div>
                  <span className="text-[10px] font-mono">$14.5k pd</span>
                </button>

                <button
                  onClick={() => setActiveTab("conversations")}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === "conversations"
                      ? "bg-[var(--blue-field)] text-white font-bold"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquareText size={15} />
                    <span>Decision Log</span>
                  </div>
                  <span className="text-[10px] opacity-80">4 notes</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Studio Member Avatars (Sidebar footer) */}
          <div className="hidden lg:block p-3.5 pt-0">
            <div className="p-3 rounded bg-[var(--card)] border border-[var(--border)]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-2 flex items-center justify-between">
                <span>Studio Team</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--blue-field)] text-white text-[10px] font-bold flex items-center justify-center">
                  AP
                </div>
                <div className="w-6 h-6 rounded-full bg-[var(--orange-field)] text-white text-[10px] font-bold flex items-center justify-center">
                  AO
                </div>
                <div className="w-6 h-6 rounded-full bg-[var(--paper)] text-[var(--ink)] text-[10px] font-bold flex items-center justify-center border border-[var(--border)]">
                  LV
                </div>
                <span className="text-[11px] text-[var(--muted-foreground)] ml-1 font-mono">
                  3 active
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dashboard Canvas Area */}
        <main className="flex-1 min-w-0 bg-[var(--card)] p-4 sm:p-6">
          {/* View: Work & Milestones */}
          {activeTab === "delivery" && (
            <div className="space-y-6">
              {/* Milestone progress header */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-[var(--paper)] text-[var(--ink)] border border-[var(--border)]">
                <div>
                  <span className="handnote text-[var(--orange-field)] text-lg block -rotate-1">
                    delivery timeline ↗
                  </span>
                  <h4 className="text-lg sm:text-xl font-extrabold">
                    Milestone 03: Website Experience & Prototypes
                  </h4>
                  <p className="text-xs text-[var(--ink)]/70 mt-0.5">
                    Target sign-off date: October 02, 2026 • 75% engagement progress
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[var(--blue-field)] text-white text-xs font-bold rounded">
                    ● In Client Review
                  </span>
                </div>
              </div>

              {/* Progress bar track */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-[var(--muted-foreground)]">
                  <span>OVERALL ENGAGEMENT COMPLETION</span>
                  <span className="font-mono text-[var(--foreground)]">75% (3/4 Milestones)</span>
                </div>
                <div className="h-2.5 w-full bg-[var(--secondary)] rounded-full overflow-hidden flex border border-[var(--border)]">
                  <div className="h-full bg-[var(--blue-field)] w-[50%]" />
                  <div className="h-full bg-[var(--orange-field)] w-[25%] animate-pulse" />
                  <div className="h-full bg-transparent w-[25%]" />
                </div>
              </div>

              {/* Milestones grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {milestones.map((m, idx) => (
                  <div
                    key={m.id}
                    onClick={() => setActiveMilestoneIndex(idx)}
                    className={`p-4 rounded border transition-all cursor-pointer ${
                      activeMilestoneIndex === idx
                        ? "border-[var(--blue-field)] bg-[var(--secondary)]/40 shadow-sm ring-1 ring-[var(--blue-field)]"
                        : "border-[var(--border)] hover:border-[var(--foreground)]/40 bg-[var(--card)]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="font-mono text-[var(--muted-foreground)]">
                        PHASE {m.number}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : m.status === "In Progress"
                            ? "bg-[var(--orange-field)] text-white"
                            : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-[var(--foreground)] mb-1">
                      {m.title}
                    </div>
                    <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] pt-2 border-t border-[var(--border)]">
                      <span>{m.deliverablesCount} key artifacts</span>
                      <span className="font-mono font-bold text-[var(--foreground)]">{m.amount}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Active Milestone Deliverable Tasks */}
              <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--secondary)]/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                    Milestone 03 Artifacts & Checklist
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)] font-mono">
                    Updated today at 11:42 AM
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[var(--card)] border border-[var(--border)] rounded flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <div>
                        <div className="font-bold text-[var(--foreground)]">
                          High-fidelity Homepage Motion Prototype
                        </div>
                        <div className="text-[11px] text-[var(--muted-foreground)]">
                          Figma canvas v3.4 • Reviewed by Arthur P.
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-600 rounded">
                      Client Approved
                    </span>
                  </div>

                  <div className="p-3 bg-[var(--card)] border border-[var(--border)] rounded flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CircleDashed size={16} className="text-[var(--orange-field)] shrink-0 animate-spin" />
                      <div>
                        <div className="font-bold text-[var(--foreground)]">
                          Interactive Pricing & Seat Calculator Component
                        </div>
                        <div className="text-[11px] text-[var(--muted-foreground)]">
                          Staging preview link shared with Lumina team
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[var(--orange-field)] text-white rounded">
                      In Review
                    </span>
                  </div>

                  <div className="p-3 bg-[var(--card)] border border-[var(--border)] rounded flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-[var(--muted-foreground)] shrink-0" />
                      <div>
                        <div className="font-bold text-[var(--foreground)]">
                          CMS Content Schema & Markdown Migration
                        </div>
                        <div className="text-[11px] text-[var(--muted-foreground)]">
                          Scheduled for handoff with Milestone 04
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--muted-foreground)]">
                      Queued
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View: Client Portal */}
          {activeTab === "client" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-lg bg-[var(--paper)] text-[var(--ink)] border border-[var(--border)]">
                <div>
                  <span className="handnote text-[var(--orange-field)] text-lg block -rotate-1">
                    client transparent portal ↘
                  </span>
                  <h4 className="text-lg font-extrabold">Lumina Labs Client Portal</h4>
                  <p className="text-xs text-[var(--ink)]/70">
                    Client guest view: No internal studio noise or unapproved draft chatter.
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-[var(--card)] p-1 rounded border border-[var(--border)]">
                  <button
                    onClick={() => setClientViewMode("client")}
                    className={`px-3 py-1 text-xs font-bold rounded cursor-pointer ${
                      clientViewMode === "client"
                        ? "bg-[var(--blue-field)] text-white"
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    Client View
                  </button>
                  <button
                    onClick={() => setClientViewMode("internal")}
                    className={`px-3 py-1 text-xs font-bold rounded cursor-pointer ${
                      clientViewMode === "internal"
                        ? "bg-[var(--blue-field)] text-white"
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    Studio Only
                  </button>
                </div>
              </div>

              {clientViewMode === "client" ? (
                <div className="space-y-4">
                  <div className="p-4 border border-[var(--border)] rounded-lg bg-[var(--card)] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        <span className="font-bold text-sm text-[var(--foreground)]">
                          Milestone 02 Sign-off Received
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[var(--muted-foreground)]">
                        Signed by Sarah Vance (Lumina CEO)
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      "Design System tokens and typography choices approved unconditionally. Staging access configured."
                    </p>
                    <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
                      <button className="px-3 py-1.5 bg-[var(--secondary)] hover:bg-[var(--secondary)]/80 text-xs font-bold rounded flex items-center gap-1.5 cursor-pointer">
                        <Download size={13} />
                        <span>Download Signed PDF</span>
                      </button>
                      <button className="px-3 py-1.5 bg-[var(--secondary)] hover:bg-[var(--secondary)]/80 text-xs font-bold rounded flex items-center gap-1.5 cursor-pointer">
                        <Eye size={13} />
                        <span>View Asset Archive (Figma)</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 border-2 border-dashed border-[var(--orange-field)] rounded-lg bg-[var(--secondary)]/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--orange-field)]">
                          Action Required from Client
                        </span>
                        <h5 className="font-bold text-sm text-[var(--foreground)] mt-0.5">
                          Review Milestone 03 Homepage Prototype
                        </h5>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1 max-w-md">
                          Please review the animated prototype and confirm final desktop/mobile responsive transitions.
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-[var(--orange-field)] hover:bg-[var(--orange-field)]/90 text-white font-bold text-xs rounded cursor-pointer shadow-sm">
                        Approve & Sign Milestone
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 border border-[var(--border)] rounded-lg bg-[var(--secondary)]/20 text-center space-y-2">
                  <Lock size={24} className="mx-auto text-[var(--orange-field)]" />
                  <div className="font-bold text-sm text-[var(--foreground)]">Internal Studio Workspace</div>
                  <p className="text-xs text-[var(--muted-foreground)] max-w-md mx-auto">
                    Internal scratch notes, contractor hourly rates, and preliminary work-in-progress drafts are securely hidden from client view.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* View: Money & Ledger */}
          {activeTab === "ledger" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded border border-[var(--border)] bg-[var(--secondary)]/30">
                  <div className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase">
                    Total Contract
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-[var(--foreground)] mt-1">
                    $24,500
                  </div>
                  <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">Fixed milestone scope</div>
                </div>
                <div className="p-4 rounded border border-[var(--border)] bg-emerald-500/5">
                  <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    Billed & Received
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                    $14,500
                  </div>
                  <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">M01 + M02 settled</div>
                </div>
                <div className="p-4 rounded border border-[var(--border)] bg-[var(--paper)] text-[var(--ink)]">
                  <div className="text-[11px] font-bold uppercase text-[var(--blue-field)]">
                    Upcoming Billing
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-[var(--blue-field)] mt-1">
                    $6,000
                  </div>
                  <div className="text-[11px] text-[var(--ink)]/70 mt-0.5">Milestone 03 upon sign-off</div>
                </div>
              </div>

              {/* Invoice table */}
              <div className="border border-[var(--border)] rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-[var(--secondary)]/50 border-b border-[var(--border)] font-bold text-xs uppercase tracking-wider text-[var(--muted-foreground)] flex justify-between items-center">
                  <span>Invoice Ledger</span>
                  <button className="px-3 py-1 bg-[var(--blue-field)] text-white text-xs font-bold rounded cursor-pointer hover:bg-[var(--blue-field)]/90">
                    + Create Invoice
                  </button>
                </div>
                <div className="divide-y divide-[var(--border)] text-xs">
                  <div className="p-3.5 flex items-center justify-between bg-[var(--card)]">
                    <div>
                      <span className="font-mono font-bold text-[var(--foreground)]">INV-2026-084</span>
                      <span className="text-[var(--muted-foreground)] ml-2">Phase 01 Deposit & Strategy</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-[var(--foreground)]">$6,000.00</span>
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold rounded text-[10px]">
                        Paid Aug 18
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center justify-between bg-[var(--card)]">
                    <div>
                      <span className="font-mono font-bold text-[var(--foreground)]">INV-2026-092</span>
                      <span className="text-[var(--muted-foreground)] ml-2">Phase 02 Design Direction Sign-off</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-[var(--foreground)]">$8,500.00</span>
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold rounded text-[10px]">
                        Paid Sep 06
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center justify-between bg-[var(--secondary)]/20">
                    <div>
                      <span className="font-mono font-bold text-[var(--orange-field)]">INV-2026-099</span>
                      <span className="text-[var(--foreground)] font-semibold ml-2">Phase 03 Prototype Delivery</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-[var(--foreground)]">$6,000.00</span>
                      <span className="px-2 py-0.5 bg-[var(--orange-field)] text-white font-bold rounded text-[10px]">
                        Draft Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View: Decision Log / Conversations */}
          {activeTab === "conversations" && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[var(--paper)] text-[var(--ink)] border border-[var(--border)]">
                <span className="handnote text-[var(--orange-field)] text-lg block -rotate-1">
                  decision memory ↗
                </span>
                <h4 className="text-lg font-extrabold">Studio Decision Trail</h4>
                <p className="text-xs text-[var(--ink)]/70">
                  Context is never lost. Decisions stay bound to the deliverables and milestones they affect.
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded border border-[var(--border)] bg-[var(--card)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--foreground)]">
                      Photography Direction Change
                    </span>
                    <span className="font-mono text-[10px] text-[var(--muted-foreground)]">
                      Sep 24 • 14:15
                    </span>
                  </div>
                  <p className="text-[var(--muted-foreground)]">
                    Client requested studio desk atmosphere with natural daylight over high-contrast dark renders. Updated hero art boards.
                  </p>
                  <div className="text-[10px] font-mono text-[var(--blue-field)] font-semibold pt-1">
                    Linked to: Milestone 03 / Homepage
                  </div>
                </div>

                <div className="p-3.5 rounded border border-[var(--border)] bg-[var(--card)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--foreground)]">
                      Typography Licensing Cleared
                    </span>
                    <span className="font-mono text-[10px] text-[var(--muted-foreground)]">
                      Sep 18 • 09:30
                    </span>
                  </div>
                  <p className="text-[var(--muted-foreground)]">
                    Confirmed web font licensing for Noto Sans subset and Caveat handwriting accents across production domain.
                  </p>
                  <div className="text-[10px] font-mono text-[var(--blue-field)] font-semibold pt-1">
                    Linked to: Milestone 02 / Design Tokens
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Studio Bottom Status Footer */}
      <div className="flex flex-wrap items-center justify-between px-5 py-2.5 border-t border-[var(--border)] bg-[var(--secondary)]/50 text-[11px] font-mono text-[var(--muted-foreground)]">
        <div className="flex items-center gap-3">
          <span className="text-[var(--foreground)] font-bold">Atelier Nord Studio Console</span>
          <span>•</span>
          <span>Prismark Studio OS v2.4</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Keyboard: [1] Milestones [2] Portal [3] Ledger [4] Decisions</span>
        </div>
      </div>
    </div>
  );
}
