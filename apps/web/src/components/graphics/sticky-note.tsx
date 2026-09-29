import type { ComponentProps, ReactNode } from 'react'

import { WashiTape } from './washi-tape'

interface StickyNoteProps extends ComponentProps<'div'> {
  color?: 'yellow' | 'rose' | 'mint' | 'sky' | 'lilac'
  rotation?: number
  tape?: boolean
  tapeVariant?: 'yellow' | 'rose' | 'mint' | 'sky' | 'kraft'
  children: ReactNode
}

const STICKY_STYLES = {
  yellow: 'bg-[#FEF08A] text-[#713F12] border-[#FDE047] shadow-[0_4px_12px_rgba(202,138,4,0.15)]',
  rose: 'bg-[#FFE4E6] text-[#881337] border-[#FECDD3] shadow-[0_4px_12px_rgba(225,29,72,0.15)]',
  mint: 'bg-[#DCFCE7] text-[#14532D] border-[#BBF7D0] shadow-[0_4px_12px_rgba(5,150,105,0.15)]',
  sky: 'bg-[#E0F2FE] text-[#0C4A6E] border-[#BAE6FD] shadow-[0_4px_12px_rgba(37,99,235,0.15)]',
  lilac: 'bg-[#F3E8FF] text-[#581C87] border-[#E9D5FF] shadow-[0_4px_12px_rgba(124,58,237,0.15)]',
}

export function StickyNote({
  color = 'yellow',
  rotation = -1.5,
  tape = true,
  tapeVariant,
  className = '',
  children,
  ...props
}: StickyNoteProps) {
  const stickyStyle = STICKY_STYLES[color]
  const defaultTape =
    tapeVariant || (color === 'yellow' ? 'rose' : color === 'rose' ? 'mint' : 'yellow')

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`relative inline-block rounded-sm border p-4 font-handwritten text-lg leading-snug transition-transform hover:z-30 hover:scale-[1.02] sm:p-5 ${stickyStyle} ${className}`}
      {...props}
    >
      {tape && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <WashiTape variant={defaultTape} rotation={-rotation * 0.5} className="scale-75" />
        </div>
      )}
      {children}
    </div>
  )
}
