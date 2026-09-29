'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('prismark-theme') !== 'light'
    }
    return true
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('prismark-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('prismark-theme', 'light')
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-2.5 py-1 font-mono text-xs font-medium text-slate-700 shadow-sm transition-all hover:border-slate-400 dark:border-white/[0.12] dark:bg-[#0D111A] dark:text-slate-300 dark:hover:border-orange-500/60 dark:hover:text-white"
    >
      {isDark ? (
        <>
          <Moon className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-[11px]">Midnight</span>
        </>
      ) : (
        <>
          <Sun className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-[11px]">Paper</span>
        </>
      )}
    </button>
  )
}
