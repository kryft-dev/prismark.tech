import React from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck2,
  FileText,
  FolderArchive,
  Layers,
  Lock,
  MessageSquareText,
  Paperclip,
  Plus,
  ReceiptText,
  Rows3,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

interface StudioWindowProps {
  title: string;
  urlPath: string;
  badge?: string;
  badgeColor?: "amber" | "cobalt" | "emerald" | "rose" | "purple";
  children: React.ReactNode;
  className?: string;
}

export function StudioConsoleFrame({
  title,
  urlPath,
  badge = "STUDIO LIVE",
  badgeColor = "amber",
  children,
  className = "",
}: StudioWindowProps) {
  const badgeClasses = {
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    cobalt: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  };

  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-[#121316] text-slate-100 overflow-hidden shadow-2xl transition-all duration-300 ${className}`}
      style={{
        boxShadow:
          "0 26px 52px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 35px -8px rgba(245, 158, 11, 0.12)",
      }}
    >
      {/* Studio Chrome Titlebar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#181A20] border-b border-slate-800 select-none gap-3">
        <div className="flex items-center gap-3">
          {/* Traffic light window dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0E0F12] border border-slate-800 rounded-md text-[11px] font-mono text-slate-400">
            <Lock size={10} className="text-emerald-400" />
            <span className="text-slate-500">https://</span>
            <span className="text-amber-400 font-bold">studio.prismark.tech</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">{urlPath}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span
            className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${badgeClasses[badgeColor]}`}
          >
            {badge}
          </span>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline font-medium">
            {title}
          </span>
        </div>
      </div>

      {/* Internal Studio Canvas */}
      <div className="p-4 sm:p-6 bg-[#121316] text-slate-200 text-xs">
        {children}
      </div>
    </div>
  );
}

/**
 * 1. Milestone Deliverables & Client Sign-off Console Screenshot
 */
export function MilestoneSignoffScreenshot() {
  const milestones = [
    {
      num: "01",
      name: "Discovery & Spatial Brand Architecture",
      status: "APPROVED & SIGNED",
      date: "Aug 15",
      payout: "$6,000",
      statusColor: "emerald",
      artifacts: 3,
    },
    {
      num: "02",
      name: "Interactive Prototypes & 3D Spatial Rig",
      status: "APPROVED & SIGNED",
      date: "Sep 04",
      payout: "$8,500",
      statusColor: "emerald",
      artifacts: 5,
    },
    {
      num: "03",
      name: "Production Web Experience & Design Handoff",
      status: "READY FOR CLIENT SIGN-OFF",
      date: "Oct 02",
      payout: "$6,000",
      statusColor: "amber",
      artifacts: 4,
    },
    {
      num: "04",
      name: "Staging Verification & Go-Live",
      status: "UPCOMING SPRINT",
      date: "Oct 24",
      payout: "$4,000",
      statusColor: "slate",
      artifacts: 2,
    },
  ];

  return (
    <StudioConsoleFrame
      title="Milestone Delivery & Automated Sign-off"
      urlPath="atelier-nord/lumina-labs/milestones"
      badge="PHASE 03 IN REVIEW"
      badgeColor="amber"
    >
      <div className="space-y-4 font-sans">
        {/* Active Project Header */}
        <div className="p-3.5 rounded-xl bg-[#1A1C23] border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-100">Lumina Labs Refresh</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold border border-blue-500/30">
                Fixed Fee + Retainer
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              Client: Lumina AI Corp • Engagement Total: $24,500 • Retainer: $4,500/mo
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-[11px] font-mono text-emerald-300 font-bold flex items-center gap-1.5">
              <UserCheck size={12} />
              <span>Signed-Off: $14,500 (59%)</span>
            </div>
          </div>
        </div>

        {/* Milestone Cards Stack */}
        <div className="space-y-2.5">
          {milestones.map((m, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-lg border transition-all ${
                m.statusColor === "amber"
                  ? "bg-[#1E1F28] border-amber-500/50 shadow-lg"
                  : "bg-[#161820] border-slate-800/80"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded bg-[#101115] border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-amber-400">
                    {m.num}
                  </span>
                  <span className="font-bold text-slate-200 text-sm">{m.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      m.statusColor === "emerald"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : m.statusColor === "amber"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {m.status}
                  </span>
                  <span className="font-mono font-bold text-slate-200 text-xs px-2 py-0.5 bg-[#0E0F12] rounded border border-slate-800">
                    {m.payout}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FileCheck2 size={12} className="text-slate-500" />
                  {m.artifacts} verified deliverable files & prototypes attached
                </span>
                <span className="font-mono text-slate-500">Target Date: {m.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudioConsoleFrame>
  );
}

/**
 * 2. Client Review Portal & Annotation Canvas Screenshot
 */
export function ClientReviewPortalScreenshot() {
  return (
    <StudioConsoleFrame
      title="Client Feedback Portal & Annotation Canvas"
      urlPath="portal/lumina-labs/review/v3-prototype"
      badge="CLIENT VIEW MODE"
      badgeColor="cobalt"
    >
      <div className="space-y-4 font-sans">
        {/* Canvas Frame */}
        <div className="p-4 rounded-xl bg-[#171922] border border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold text-[10px]">
                DELIVERABLE 03 / 04
              </span>
              <span className="font-bold text-slate-200">Interactive Web Experience & Spatial Canvas</span>
            </div>
            <span className="text-slate-400 font-mono text-[10px]">Figma + WebGL Live Embed</span>
          </div>

          {/* Interactive Annotation Thread */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-7 p-3 rounded-lg bg-[#0E0F12] border border-slate-800 font-mono text-[11px] text-slate-300 space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-[10px]">
                <span>PREVIEW: index-scene.tsx (60 FPS WebGL)</span>
                <span className="text-emerald-400">● 100% Responsive</span>
              </div>
              <div className="p-3 bg-[#15171F] rounded border border-slate-800 text-xs leading-relaxed space-y-1">
                <div className="text-amber-400 font-bold">Pin #1 (Pinned by Henrik - Lumina CEO):</div>
                <p className="text-slate-300 text-[11px]">
                  "The tactile hover interactions on the architecture models look incredible. Approved for Phase 03 release."
                </p>
              </div>
            </div>

            <div className="md:col-span-5 p-3 rounded-lg bg-[#1B1D27] border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-2">
                  Client Approval Status
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle2 size={13} />
                    <span>Visual Direction Approved</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle2 size={13} />
                    <span>Typography & Specs Signed</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400 font-semibold">
                    <Clock size={13} />
                    <span>Final Invoice Trigger Queued</span>
                  </div>
                </div>
              </div>

              <button className="mt-3 w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] rounded transition-colors shadow-sm">
                Generate Milestone 03 Invoice ($6,000)
              </button>
            </div>
          </div>
        </div>
      </div>
    </StudioConsoleFrame>
  );
}

/**
 * 3. Studio Financial Ledger & Retainer Burn Reconciler Screenshot
 */
export function FinancialLedgerScreenshot() {
  const invoices = [
    { id: "INV-2026-092", client: "Lumina Labs", milestone: "M02 Design Direction", amount: "$8,500.00", status: "PAID", date: "Sep 05" },
    { id: "INV-2026-088", client: "Kroma Spatial", milestone: "M01 Discovery & Brief", amount: "$6,000.00", status: "PAID", date: "Aug 20" },
    { id: "INV-2026-095", client: "Studio Monolith", milestone: "Retainer Oct 2026", amount: "$4,500.00", status: "UNBILLED", date: "Oct 01" },
    { id: "INV-2026-096", client: "Aethelred Foundry", milestone: "M03 Type Specimens", amount: "$5,200.00", status: "READY", date: "Oct 04" },
  ];

  return (
    <StudioConsoleFrame
      title="Studio Financial Ledger & Revenue Recognition"
      urlPath="atelier-nord/finance/ledger-q3"
      badge="STRIPE RECONCILED"
      badgeColor="emerald"
    >
      <div className="space-y-4 font-sans">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-lg bg-[#1A1C23] border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Q3 Invoiced</div>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">$68,200</div>
          </div>
          <div className="p-3 rounded-lg bg-[#1A1C23] border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Unbilled Retainers</div>
            <div className="text-lg font-bold font-mono text-amber-400 mt-0.5">$14,500</div>
          </div>
          <div className="p-3 rounded-lg bg-[#1A1C23] border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Avg Gross Margin</div>
            <div className="text-lg font-bold font-mono text-blue-400 mt-0.5">78.4%</div>
          </div>
          <div className="p-3 rounded-lg bg-[#1A1C23] border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Days to Payment</div>
            <div className="text-lg font-bold font-mono text-slate-200 mt-0.5">2.4 Days</div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-[#161820]">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-[#1A1C23] text-slate-400 border-b border-slate-800 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Invoice #</th>
                <th className="py-2.5 px-3">Client Studio</th>
                <th className="py-2.5 px-3">Milestone / Scope</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {invoices.map((inv, i) => (
                <tr key={i} className="hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-semibold text-slate-200">{inv.id}</td>
                  <td className="py-2.5 px-3 text-slate-300 font-bold">{inv.client}</td>
                  <td className="py-2.5 px-3 text-slate-400">{inv.milestone}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-100">{inv.amount}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        inv.status === "PAID"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : inv.status === "READY"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudioConsoleFrame>
  );
}

/**
 * 4. Studio Capacity & Discipline Allocation Heatmap Screenshot
 */
export function StudioCapacityHeatmapScreenshot() {
  const disciplines = [
    { role: "Spatial Architecture", lead: "Freja B.", allocated: "85%", sprint: "Nord Museum 3D", status: "Optimal" },
    { role: "Design Systems & UI", lead: "Alex M.", allocated: "92%", sprint: "Lumina Web App", status: "Optimal" },
    { role: "Creative Engineering", lead: "Kareem E.", allocated: "70%", sprint: "WebGL Shader Engine", status: "Available" },
    { role: "Editorial & Typography", lead: "Liam V.", allocated: "60%", sprint: "Specimen Book 2026", status: "Available" },
  ];

  return (
    <StudioConsoleFrame
      title="Studio Discipline Capacity & Sprint Allocations"
      urlPath="atelier-nord/workspaces/capacity-grid"
      badge="Q4 SPRINT 02"
      badgeColor="purple"
    >
      <div className="space-y-3.5 font-sans">
        <div className="text-[11px] font-mono text-slate-400 uppercase font-bold flex items-center justify-between pb-1 border-b border-slate-800">
          <span>Discipline Workload & Availability</span>
          <span className="text-purple-400">76% Studio Utilization</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-xs">
          {disciplines.map((d, i) => (
            <div key={i} className="p-3 rounded-lg bg-[#1A1C23] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100">{d.role}</span>
                <span className="text-amber-400 font-bold">{d.allocated}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded overflow-hidden">
                <div
                  className="bg-purple-400 h-full rounded"
                  style={{ width: d.allocated }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>Lead: {d.lead}</span>
                <span className="text-slate-300 font-semibold">{d.sprint}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudioConsoleFrame>
  );
}

/**
 * 5. Architecture & Spatial Blueprint Console Screenshot
 */
export function ArchitectureSpecConsoleScreenshot() {
  return (
    <StudioConsoleFrame
      title="Spatial Architecture Spec & Drawing Review"
      urlPath="atelier-nord/projects/spatial-nord-pavilion"
      badge="REV 04 APPROVED"
      badgeColor="emerald"
    >
      <div className="space-y-3 font-sans">
        <div className="p-3 rounded bg-[#1A1C23] border border-slate-800 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-100">Nord Pavilion / Drawing Set 04</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              Signed by Lead Architect
            </span>
          </div>
          <span className="text-slate-400 text-[10px]">Scale 1:50 • DWG & IFC Exported</span>
        </div>

        <div className="p-3 bg-[#14151C] rounded border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1.5">
          <div className="text-slate-400 flex justify-between text-[10px] border-b border-slate-800/80 pb-1">
            <span>Material Schedule & Load Specs</span>
            <span className="text-amber-400">Total Construction Budget: $420,000</span>
          </div>
          <div className="flex justify-between py-1">
            <span>01. Glulam Timber Portal Frames</span>
            <span className="text-slate-200 font-bold">PEFC Certified</span>
          </div>
          <div className="flex justify-between py-1">
            <span>02. Triple-Glazed Low-E Acoustic Glass</span>
            <span className="text-slate-200 font-bold">Ug = 0.5 W/m²K</span>
          </div>
          <div className="flex justify-between py-1">
            <span>03. Polished Terrazzo Stone Floor</span>
            <span className="text-slate-200 font-bold">Locally Sourced</span>
          </div>
        </div>
      </div>
    </StudioConsoleFrame>
  );
}
