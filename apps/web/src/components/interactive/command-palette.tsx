'use client'

import {
  Check,
  CreditCard,
  FileCheck,
  FolderGit2,
  Lock,
  Search,
  Sliders,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export interface CommandAction {
  id: string
  title: string
  subtitle: string
  category: 'Sprints' | 'Air-Gap' | 'Finance' | 'Team'
  icon: typeof FileCheck
  shortcut?: string
  resultMsg: string
}

const defaultActions: CommandAction[] = [
  {
    id: 'act-sow',
    title: 'Draft SOW with 30% milestone split',
    subtitle: 'Generate deliverable scope and tie payouts to GitHub releases',
    category: 'Sprints',
    icon: FileCheck,
    shortcut: '⌘S',
    resultMsg: 'SOW drafted: 30% milestone payment linked to git merge hooks.',
  },
  {
    id: 'act-airgap',
    title: 'Lock client air-gap for Arclight Capital',
    subtitle: 'Hide internal developer PR diffs and contractor margin discussions',
    category: 'Air-Gap',
    icon: Lock,
    shortcut: '⌘L',
    resultMsg: 'Air-Gap perimeter locked: Arclight portal sees only ratified assets.',
  },
  {
    id: 'act-reconcile',
    title: 'Reconcile Stripe retainer settlement ($18,500)',
    subtitle: 'Post balanced debit/credit entries to cash and retainer accounts',
    category: 'Finance',
    icon: CreditCard,
    shortcut: '⌘R',
    resultMsg: 'Journal entry #8841 balanced: $18,500 posted with zero rounding drift.',
  },
  {
    id: 'act-pr',
    title: 'Link GitHub pull request #241 to sprint deliverable',
    subtitle: 'Auto-advance milestone completion upon merge to main branch',
    category: 'Sprints',
    icon: FolderGit2,
    shortcut: '⌘G',
    resultMsg: 'PR #241 linked. Milestone burn-up will update automatically upon merge.',
  },
  {
    id: 'act-client',
    title: 'Invite client stakeholder with passwordless OTP',
    subtitle: 'Issue single-use 6-digit access code for document signature',
    category: 'Air-Gap',
    icon: Users,
    shortcut: '⌘U',
    resultMsg: 'Access code dispatched: Client can sign SOW without creating an account.',
  },
  {
    id: 'act-payout',
    title: 'Disburse contractor profit share (35%)',
    subtitle: 'Transfer milestone compensation to lead developer account',
    category: 'Finance',
    icon: Sliders,
    shortcut: '⌘P',
    resultMsg: 'Disbursement queued: $5,550 scheduled for payout via Stripe Connect.',
  },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null)

  const openPalette = useCallback(() => setIsOpen(true), [])
  const closePalette = useCallback(() => {
    setIsOpen(false)
    setSearch('')
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const filtered = defaultActions.filter(
    (action) =>
      action.title.toLowerCase().includes(search.toLowerCase()) ||
      action.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      action.category.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSelect = (action: CommandAction) => {
    setActiveFeedback(action.resultMsg)
    setIsOpen(false)
    setTimeout(() => {
      setActiveFeedback(null)
    }, 4500)
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Trigger Bar (Raycast Style) */}
      <button
        type="button"
        onClick={openPalette}
        aria-label="Open studio command palette"
        className="group flex w-full items-center justify-between rounded-xl border border-slate-700/60 bg-slate-900/80 px-4 py-3.5 text-left shadow-2xl transition-all hover:border-orange-500/60 hover:shadow-orange-500/5 dark:border-white/[0.12] dark:bg-[#0D111A]/90"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-orange-500/10 p-1.5 text-orange-400 transition-colors group-hover:bg-orange-500/20">
            <Search className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-slate-300 dark:text-slate-300">
            Type a command or studio action...
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400 dark:text-slate-500">
          <kbd className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            ⌘K
          </kbd>
        </div>
      </button>

      {/* Instant Action Feedback Banner */}
      {activeFeedback && (
        <div className="mt-3 flex animate-in items-center gap-2.5 rounded-lg border border-emerald-500/40 bg-emerald-950/80 px-4 py-2.5 font-mono text-xs text-emerald-300 shadow-lg duration-200 fade-in slide-in-from-top-1">
          <Check className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{activeFeedback}</span>
        </div>
      )}

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex animate-in items-start justify-center bg-black/70 px-4 pt-24 backdrop-blur-md duration-150 fade-in">
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl dark:border-white/[0.12] dark:bg-[#0B0F19]"
            role="dialog"
            aria-modal="true"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-3.5 dark:border-white/[0.08]">
              <Search className="h-5 w-5 text-orange-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search studio commands (e.g. SOW, Air-Gap, Payout)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={closePalette}
                aria-label="Close command palette"
                className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Actions List */}
            <div className="max-h-80 space-y-1 overflow-y-auto p-2">
              {filtered.map((action) => {
                const Icon = action.icon
                return (
                  <button
                    type="button"
                    key={action.id}
                    onClick={() => handleSelect(action)}
                    className="group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-all hover:bg-slate-800/80 dark:hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-800 p-2 text-slate-300 transition-colors group-hover:text-orange-400 dark:bg-slate-800/80">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white transition-colors group-hover:text-orange-400">
                          {action.title}
                        </div>
                        <div className="font-sans text-[11px] text-slate-400">
                          {action.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400 uppercase dark:bg-slate-800/60">
                        {action.category}
                      </span>
                      {action.shortcut && (
                        <kbd className="rounded border border-slate-700 bg-slate-800/60 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 dark:border-slate-800">
                          {action.shortcut}
                        </kbd>
                      )}
                    </div>
                  </button>
                )
              })}

              {filtered.length === 0 && (
                <div className="py-8 text-center font-mono text-xs text-slate-500">
                  No matching studio actions found for &quot;{search}&quot;.
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/40 px-4 py-2 font-mono text-[11px] text-slate-500 dark:border-white/[0.08]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                <span>Prismark Studio Command Engine</span>
              </span>
              <span>Press ESC to dismiss</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
