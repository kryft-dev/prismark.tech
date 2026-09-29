'use client'

import {
  CheckCircle2,
  Clock,
  Eye,
  FolderGit2,
  GitBranch,
  Kanban,
  Lock,
  Milestone,
  PieChart,
  ShieldCheck,
  User,
} from 'lucide-react'
import { useState } from 'react'

interface StudioTask {
  id: string
  title: string
  assignee: string
  role: string
  status: 'drafting' | 'review' | 'client' | 'done'
  githubPr?: string
  milestone: string
  airGapped: boolean
  subtasksTotal: number
  subtasksDone: number
}

const mockTasks: StudioTask[] = [
  {
    id: 'PRIS-104',
    title: 'Migrate D1 SQLite schemas to automated CI runner',
    assignee: 'David Chen',
    role: 'Staff Engineer',
    status: 'drafting',
    githubPr: 'core#241',
    milestone: 'M1: Architecture',
    airGapped: true,
    subtasksTotal: 3,
    subtasksDone: 2,
  },
  {
    id: 'PRIS-107',
    title: 'Dynamic PDF watermark generation on unsigned client SOWs',
    assignee: 'Elena Rostova',
    role: 'Security Lead',
    status: 'review',
    githubPr: 'core#244',
    milestone: 'M2: Core API',
    airGapped: true,
    subtasksTotal: 4,
    subtasksDone: 3,
  },
  {
    id: 'PRIS-102',
    title: 'Q3 Brand Identity Vector Pack Ratification',
    assignee: 'Meridian Studio',
    role: 'Lead Designer',
    status: 'client',
    milestone: 'M3: Portal Launch',
    airGapped: false,
    subtasksTotal: 2,
    subtasksDone: 2,
  },
  {
    id: 'PRIS-099',
    title: 'Automated 35% contractor profit split on Stripe settlement',
    assignee: 'Marcus Vance',
    role: 'Founder / Architect',
    status: 'done',
    githubPr: 'core#238',
    milestone: 'M1: Architecture',
    airGapped: true,
    subtasksTotal: 2,
    subtasksDone: 2,
  },
]

export function InteractiveSprintCanvas() {
  const [viewMode, setViewMode] = useState<'board' | 'milestones' | 'retainer'>('board')
  const [selectedTask, setSelectedTask] = useState<StudioTask>(mockTasks[0])

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-2xl backdrop-blur-md dark:border-white/[0.1] dark:bg-[#0B0F19]/90">
      {/* Top Studio Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/40 px-6 py-4 dark:border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="size-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-mono text-xs font-semibold text-slate-200">
              Active Sprint: Sprint 42 // Q4 Deliverables
            </span>
          </div>
          <span className="rounded border border-slate-700 bg-slate-800/60 px-2 py-0.5 font-mono text-[10px] text-slate-400 dark:border-slate-800">
            D1 Synced
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex rounded-lg border border-slate-800 bg-slate-900/80 p-0.5">
          <button
            type="button"
            onClick={() => setViewMode('board')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-xs font-medium transition-all ${
              viewMode === 'board'
                ? 'bg-orange-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Kanban className="h-3.5 w-3.5" />
            <span>Sprint Board</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('milestones')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-xs font-medium transition-all ${
              viewMode === 'milestones'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Milestone className="h-3.5 w-3.5" />
            <span>Milestone Burn-Up</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('retainer')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-xs font-medium transition-all ${
              viewMode === 'retainer'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PieChart className="h-3.5 w-3.5" />
            <span>Retainer Health</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {viewMode === 'board' && (
          <div className="grid gap-4 lg:grid-cols-4">
            {(
              [
                { id: 'drafting', title: 'In Drafting', count: 1, color: 'text-amber-400' },
                { id: 'review', title: 'Code Review', count: 1, color: 'text-blue-400' },
                { id: 'client', title: 'Client Sign-Off', count: 1, color: 'text-purple-400' },
                { id: 'done', title: 'Shipped & Paid', count: 1, color: 'text-emerald-400' },
              ] as const
            ).map((column) => {
              const colTasks = mockTasks.filter((t) => t.status === column.id)
              return (
                <div
                  key={column.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 dark:border-white/[0.06]"
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
                      <span className={`font-semibold ${column.color}`}>{column.title}</span>
                      <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                        {column.count}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {colTasks.map((task) => (
                        <button
                          type="button"
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className={`w-full rounded-lg border p-3 text-left transition-all ${
                            selectedTask.id === task.id
                              ? 'border-orange-500/80 bg-orange-950/20 shadow-md ring-1 ring-orange-500/30'
                              : 'border-slate-800/80 bg-slate-900/60 hover:border-slate-700'
                          }`}
                        >
                          <div className="mb-1.5 flex items-center justify-between font-mono text-[11px]">
                            <span className="font-bold text-orange-400">{task.id}</span>
                            {task.airGapped ? (
                              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                                <Lock className="h-2.5 w-2.5 text-amber-400" />
                                <span>Internal</span>
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                                <Eye className="h-2.5 w-2.5" />
                                <span>Client Portal</span>
                              </span>
                            )}
                          </div>

                          <p className="mb-2.5 text-xs leading-snug font-medium text-white">
                            {task.title}
                          </p>

                          <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3 text-slate-500" />
                              <span>{task.assignee.split(' ')[0]}</span>
                            </span>
                            {task.githubPr && (
                              <span className="flex items-center gap-1 text-blue-400">
                                <FolderGit2 className="h-3 w-3" />
                                <span>{task.githubPr}</span>
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-800/60 pt-2 text-center font-mono text-[10px] text-slate-500">
                    Auto-closed via Git Webhooks
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {viewMode === 'milestones' && (
          <div className="space-y-4">
            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-orange-400">M1: Architecture & Data Layer</span>
                <span className="font-bold text-emerald-400">100% · $15,000 USD</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-full bg-emerald-500" />
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span>Verified commits merged: 14</span>
                <span className="text-emerald-400">Stripe Invoiced & Settled</span>
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-blue-400">M2: Core Edge API & Auth Runtime</span>
                <span className="font-bold text-blue-400">75% · $25,000 USD</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-3/4 bg-blue-500" />
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span>3 of 4 sprint deliverables accepted</span>
                <span className="text-amber-400">Escrow Trigger Pending</span>
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-purple-400">
                  M3: Client Portal & Asset Delivery
                </span>
                <span className="font-bold text-slate-400">20% · $20,000 USD</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-1/5 bg-purple-500" />
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span>Design sign-off pending client feedback</span>
                <span>In Progress</span>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'retainer' && (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span>Monthly Retainer</span>
                <Clock className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="font-mono text-2xl font-bold text-white">$24,000 / mo</div>
              <div className="text-[11px] text-slate-400">Arclight Capital · Tier A Dev</div>
            </div>

            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span>Hours Realized</span>
                <GitBranch className="h-4 w-4 text-blue-400" />
              </div>
              <div className="font-mono text-2xl font-bold text-blue-400">74 of 100 hrs</div>
              <div className="text-[11px] text-slate-400">74% capacity · 6 days remaining</div>
            </div>

            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span>Contractor Margin</span>
                <ShieldCheck className="h-4 w-4 text-orange-400" />
              </div>
              <div className="font-mono text-2xl font-bold text-emerald-400">62.5% Net</div>
              <div className="text-[11px] text-slate-400">Double-entry ledger verified</div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Task Inspector Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 bg-slate-950/70 px-6 py-3 font-mono text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white">{selectedTask.id}:</span>
          <span className="text-slate-300">{selectedTask.title}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-300">
            Owner: {selectedTask.assignee} ({selectedTask.role})
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>
              Subtasks: {selectedTask.subtasksDone}/{selectedTask.subtasksTotal}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
