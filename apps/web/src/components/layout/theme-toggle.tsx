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
      aria-label={isDark ? 'Switch to warm paper mode' : 'Switch to midnight blueprint mode'}
      className="light:border-stone-300 light:bg-stone-100 light:text-stone-700 inline-flex items-center gap-1.5 rounded-full border border-stone-700/60 bg-stone-900/80 px-2.5 py-1 font-mono text-xs font-medium text-stone-300 transition-all hover:border-orange-500/80 hover:text-white dark:border-stone-700 dark:bg-stone-900/90 dark:text-stone-300"
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
