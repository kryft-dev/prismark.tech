import { createFileRoute, Link } from '@tanstack/react-router'
import {
  CheckCircle2,
  FolderGit2,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Kanban,
  Milestone,
  Sliders,
  Terminal,
} from 'lucide-react'
import { useState } from 'react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/drafting')({
  head: () => ({
    meta: [
      { title: 'Drafting Board & Milestone Engine — Prismark' },
      {
        name: 'description',
        content:
          'Agency task management with bi-directional GitHub sync, one-level subtask hierarchies, and client air-gapped approvals.',
      },
    ],
  }),
  component: DraftingPage,
})

const columns = [
  { id: 'drafting', title: '1. In Drafting', count: 4, tag: 'IN PROGRESS' },
  { id: 'review', title: '2. Internal Review', count: 2, tag: 'CODE REVIEW' },
  { id: 'client', title: '3. Client Sign-Off', count: 1, tag: 'AIR-GAP APPROVAL' },
  { id: 'done', title: '4. Shipped & Settled', count: 9, tag: 'MERGED' },
]

const sampleTasks = [
  {
    id: 'PRIS-104',
    title: 'Migrate Cloudflare D1 migrations to automated CI runner',
    assignee: 'Marcus Vance',
    tag: 'Infra',
    column: 'drafting',
    github: 'kryft/core#241',
    progress: 60,
  },
  {
    id: 'PRIS-107',
    title: 'Client Portal PDF watermarking for unratified SOWs',
    assignee: 'Elena Rostova',
    tag: 'Security',
    column: 'drafting',
    github: 'kryft/core#244',
    progress: 30,
  },
  {
    id: 'PRIS-101',
    title: 'Stripe Webhook reconciliation for contractor profit split',
    assignee: 'David Chen',
    tag: 'Ledger',
    column: 'review',
    github: 'kryft/core#238',
    progress: 85,
  },
  {
    id: 'PRIS-098',
    title: 'Q3 Brand Identity Vector Pack Ratification',
    assignee: 'Meridian Studio',
    tag: 'Design',
    column: 'client',
    github: 'airgap/v2-deliverable',
    progress: 95,
  },
]

export function DraftingPage() {
  const [activeTab, setActiveTab] = useState<'board' | 'github' | 'milestones'>('board')
  const [selectedTask, setSelectedTask] = useState(sampleTasks[0])

  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-orange-400">
            <Kanban className="h-3.5 w-3.5" />
            <span>MODULE 01 // DRAFTING & SPRINT RUNTIME</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-foreground sm:text-6xl">
            Task execution wired directly into your{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">
              git repositories.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-stone-400 sm:text-lg">
            Replace chaotic Trello boards and generic Jira bloat with a high-density drafting desk
            designed specifically for software studios. Subtasks, GitHub branches, and client
            air-gaps all in one synchronized workspace.
          </p>
        </div>

        {/* Interactive Workspace Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('board')}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-semibold transition-all ${
                activeTab === 'board'
                  ? 'border border-orange-500/50 bg-orange-500/10 text-orange-400'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Kanban className="h-3.5 w-3.5" />
              <span>Agency Board</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('github')}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-semibold transition-all ${
                activeTab === 'github'
                  ? 'border border-blue-500/50 bg-blue-500/10 text-blue-400'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>GitHub Bi-Directional Link</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('milestones')}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-semibold transition-all ${
                activeTab === 'milestones'
                  ? 'border border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Milestone className="h-3.5 w-3.5" />
              <span>Milestone & SOW Burn-Up</span>
            </button>
          </div>

          <InkStamp label="D1 PERSISTENCE" variant="cobalt" rotation={-1} className="text-[10px]" />
        </div>

        {/* Tab 1: Interactive Board */}
        {activeTab === 'board' && (
          <div className="grid gap-6 lg:grid-cols-4">
            {columns.map((col) => (
              <div
                key={col.id}
                className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-5 shadow-xl"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between border-b border-stone-800/80 pb-3">
                    <span className="font-mono text-xs font-bold text-stone-300">{col.title}</span>
                    <span className="rounded bg-stone-800 px-2 py-0.5 font-mono text-[10px] text-stone-400">
                      {col.count}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {sampleTasks
                      .filter((t) => t.column === col.id)
                      .map((task) => (
                        <button
                          type="button"
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className={`w-full rounded-xl border p-4 text-left transition-all ${
                            selectedTask.id === task.id
                              ? 'border-orange-500 bg-orange-950/20 shadow-lg ring-1 ring-orange-500/40'
                              : 'border-stone-800 bg-stone-900/60 hover:border-stone-700'
                          }`}
                        >
                          <div className="mb-2 flex items-center justify-between gap-2 font-mono text-[11px]">
                            <span className="font-bold text-orange-400">{task.id}</span>
                            <span className="rounded bg-stone-800 px-1.5 py-0.5 text-[10px] text-stone-400">
                              {task.tag}
                            </span>
                          </div>
                          <p className="mb-3 text-sm leading-snug font-semibold text-white">
                            {task.title}
                          </p>
                          <div className="flex items-center justify-between font-mono text-[11px] text-stone-400">
                            <span>{task.assignee}</span>
                            <span className="flex items-center gap-1 text-blue-400">
                              <GitBranch className="h-3 w-3" />
                              {task.github.split('/')[1] || task.github}
                            </span>
                          </div>
                        </button>
                      ))}

                    {sampleTasks.filter((t) => t.column === col.id).length === 0 && (
                      <div className="rounded-xl border border-dashed border-stone-800/60 py-12 text-center font-mono text-xs text-stone-600">
                        No tasks in stage
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 border-t border-stone-800/80 pt-3 font-mono text-[10px] tracking-wider text-stone-500 uppercase">
                  {col.tag}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: GitHub Bi-Directional Link */}
        {activeTab === 'github' && (
          <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-8 shadow-2xl">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-6">
                <span className="font-mono text-xs font-bold tracking-wider text-blue-400 uppercase">
                  WEBHOOK PROTOCOL
                </span>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  When a pull request merges, the task closes automatically.
                </h2>
                <p className="font-sans text-sm leading-relaxed text-stone-300">
                  Never manually nudge team members to update Jira or Asana again. Prismark listens
                  to GitHub webhook payloads on Cloudflare Workers, automatically advancing task
                  stages and triggering contractor milestone disbursement calculations.
                </p>

                <div className="space-y-2 pt-2 font-mono text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>
                      Branch naming pattern: <code>feat/PRIS-104-d1-runner</code>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Auto-comments commit hash and PR review approvals on task thread</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Zero third-party middleware (direct GitHub app connection)</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-stone-800 bg-[#06080F] p-5 font-mono text-xs lg:col-span-6">
                <div className="mb-4 flex items-center justify-between border-b border-stone-800 pb-3 text-stone-400">
                  <span className="flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                    <span>edge-webhook-listener.ts</span>
                  </span>
                  <span className="text-emerald-400">200 OK (14ms)</span>
                </div>

                <div className="space-y-2 overflow-x-auto text-stone-300">
                  <div className="text-stone-500">
                    // Received GitHub Webhook: pull_request.closed
                  </div>
                  <div>
                    <span className="text-purple-400">event</span>:{' '}
                    <span className="text-green-300">&quot;pull_request.merged&quot;</span>
                  </div>
                  <div>
                    <span className="text-purple-400">pr_number</span>:{' '}
                    <span className="text-amber-300">241</span>
                  </div>
                  <div>
                    <span className="text-purple-400">target_branch</span>:{' '}
                    <span className="text-green-300">&quot;main&quot;</span>
                  </div>
                  <div className="mt-2 text-stone-500">// Automated Prismark State Transition</div>
                  <div className="font-bold text-cyan-300">
                    &gt; UPDATE tasks SET column = &apos;done&apos; WHERE id = &apos;PRIS-104&apos;;
                  </div>
                  <div className="font-bold text-cyan-300">
                    &gt; POST ledger_accrual (contractor_split: 35%, milestone: M2);
                  </div>
                  <div className="mt-2 font-bold text-emerald-400">
                    ✓ Task PRIS-104 closed. Client view updated without code leakage.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Milestones & SOW Burn-Up */}
        {activeTab === 'milestones' && (
          <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-8 shadow-2xl">
            <div className="mb-8 max-w-2xl">
              <span className="font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase">
                CONTRACTUAL TRUTH
              </span>
              <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                Link client deliverables directly to sprint milestones.
              </h2>
              <p className="mt-2 text-sm text-stone-300">
                Clients see high-level milestone progress bars in their air-gapped portal while your
                developers work in atomic GitHub branches.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-4 rounded-xl border border-stone-800 bg-[#070A12] p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-orange-400">MILESTONE 01</span>
                  <InkStamp label="PAID" variant="success" rotation={-2} className="text-[10px]" />
                </div>
                <h3 className="text-lg font-bold text-white">System Architecture & Schema</h3>
                <div className="h-2 w-full overflow-hidden rounded-full bg-stone-800">
                  <div className="h-full w-full bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between font-mono text-xs text-stone-400">
                  <span>100% Complete</span>
                  <span>$15,000 USD</span>
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-stone-800 bg-[#070A12] p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-400">MILESTONE 02</span>
                  <span className="rounded border border-blue-500/40 bg-blue-950/80 px-2 py-0.5 font-mono text-[10px] text-blue-400">
                    IN PROGRESS
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">Core Edge API & Auth Runtime</h3>
                <div className="h-2 w-full overflow-hidden rounded-full bg-stone-800">
                  <div className="h-full w-3/4 bg-blue-500" />
                </div>
                <div className="flex items-center justify-between font-mono text-xs text-stone-400">
                  <span>75% Complete</span>
                  <span>$25,000 USD</span>
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-stone-800 bg-[#070A12] p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-stone-500">MILESTONE 03</span>
                  <span className="rounded bg-stone-800 px-2 py-0.5 font-mono text-[10px] text-stone-400">
                    UPCOMING
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-300">Client Portal Deployment</h3>
                <div className="h-2 w-full overflow-hidden rounded-full bg-stone-800">
                  <div className="h-full w-0 bg-stone-700" />
                </div>
                <div className="flex items-center justify-between font-mono text-xs text-stone-500">
                  <span>0% Complete</span>
                  <span>$20,000 USD</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature Grid Details */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/60 p-6">
            <GitCommit className="mb-3 h-5 w-5 text-orange-400" />
            <h3 className="mb-2 text-base font-bold text-white">1-Level Subtask Tree</h3>
            <p className="font-sans text-xs leading-relaxed text-stone-400">
              Strictly prevent 8-level Jira inception traps. Every task has exactly one level of
              subtasks to keep sprint execution clean and focused.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/60 p-6">
            <GitPullRequest className="mb-3 h-5 w-5 text-blue-400" />
            <h3 className="mb-2 text-base font-bold text-white">Open-To-Anyone Pool</h3>
            <p className="font-sans text-xs leading-relaxed text-stone-400">
              Unassigned agency tickets stay in a priority queue where available staff or vetted
              contractors can claim them without meeting friction.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/60 p-6">
            <Sliders className="mb-3 h-5 w-5 text-emerald-400" />
            <h3 className="mb-2 text-base font-bold text-white">Dual-Speed Filters</h3>
            <p className="font-sans text-xs leading-relaxed text-stone-400">
              Switch between High-Density Engineering Table view and Visual Kanban board with a
              single keyboard shortcut (`V`).
            </p>
          </div>
        </div>

        {/* CTA Footer Ribbon */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-stone-800 bg-gradient-to-r from-[#0C1220] to-[#140D09] p-8 sm:flex-row">
          <div>
            <h3 className="text-xl font-bold text-white">
              Ready to link your tasks to real production commits?
            </h3>
            <p className="mt-1 text-xs text-stone-400">
              Prismark drafting runtime is ready to test on any git repository.
            </p>
          </div>
          <Link
            to="/dispatch"
            className="shrink-0 rounded-md bg-orange-600 px-5 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-orange-500"
          >
            Request Studio Key →
          </Link>
        </div>
      </div>
    </MarketingLayout>
  )
}
