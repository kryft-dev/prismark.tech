import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ChevronLeftIcon, KeyRound, Terminal } from 'lucide-react'
import { useCallback, useState } from 'react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { Mark } from '@/components/mark'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

export const Route = createFileRoute('/desk')({
  head: () => ({
    meta: [
      { title: 'Member Access Desk — Prismark' },
      {
        name: 'description',
        content:
          'Authenticate to your agency workspace using passwordless cryptographic one-time token.',
      },
    ],
  }),
  component: DeskPage,
})

const CODE_LENGTH = 6
const CODE_SLOTS = Array.from({ length: CODE_LENGTH }, (_, index) => index)

export function DeskPage() {
  const [email, setEmail] = useState<string | null>(null)
  const clearEmail = useCallback(() => setEmail(null), [])

  return (
    <main className="relative flex min-h-svh items-center justify-center bg-[#080B11] px-5 py-10 text-white">
      <BlueprintGrid variant="blueprint" />

      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600/10 blur-[130px]" />
        <div className="absolute top-1/3 right-1/4 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-md pb-12">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-stone-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Studio Command Deck</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-8 shadow-2xl backdrop-blur-md sm:p-10">
          {email === null ? (
            <EmailStep onSubmit={setEmail} />
          ) : (
            <CodeStep email={email} onBack={clearEmail} />
          )}
        </div>
      </div>
    </main>
  )
}

function EmailStep({ onSubmit }: { onSubmit: (email: string) => void }) {
  const [value, setValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (value.trim()) onSubmit(value.trim())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex items-center justify-between">
        <Mark className="size-10" />
        <InkStamp label="SECURE DESK" variant="cobalt" rotation={-2} className="text-[10px]" />
      </div>

      <h1 className="text-2xl font-black tracking-tight text-white">Sign in to Prismark</h1>
      <p className="mt-1.5 text-xs leading-relaxed text-stone-400">
        Passwordless cryptographic authentication. We will dispatch a 6-digit one-time token to your
        work inbox.
      </p>

      <div className="mt-6 space-y-2">
        <label
          htmlFor="agency-email"
          className="block font-mono text-xs font-bold tracking-wider text-stone-300 uppercase"
        >
          Agency Work Email
        </label>
        <input
          id="agency-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="developer@yourstudio.com"
          className="h-11 w-full rounded-md border border-stone-700 bg-black/60 px-3.5 font-mono text-xs text-white placeholder:text-stone-500 focus:border-orange-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-gradient-to-r from-orange-600 to-amber-600 py-3 font-mono text-xs font-bold tracking-wider text-white uppercase shadow-lg transition-transform hover:scale-[1.01]"
      >
        Dispatch Access Token →
      </button>

      <div className="mt-6 flex items-center gap-2.5 rounded-lg border border-stone-800 bg-[#070A12] p-3 font-mono text-[11px] text-stone-400">
        <KeyRound className="h-4 w-4 shrink-0 text-orange-400" />
        <span>Client portal guests use this same desk to access ratified SOWs.</span>
      </div>
    </form>
  )
}

function CodeStep({ email, onBack }: { email: string; onBack: () => void }) {
  const [code, setCode] = useState('')

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1 font-mono text-xs text-stone-400 transition-colors hover:text-white"
      >
        <ChevronLeftIcon className="size-3.5" aria-hidden="true" />
        <span>Use different email</span>
      </button>

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight text-white">Check your inbox</h1>
        <InkStamp label="DISPATCHED" variant="success" rotation={-2} className="text-[10px]" />
      </div>

      <p className="text-xs leading-relaxed text-stone-300">
        We sent an authentication code to <span className="font-bold text-orange-400">{email}</span>
        . Valid for 10 minutes.
      </p>

      <div className="mt-6 space-y-3">
        <span className="sr-only">Six-digit authentication code</span>
        <InputOTP
          maxLength={CODE_LENGTH}
          value={code}
          onChange={setCode}
          autoComplete="one-time-code"
          inputMode="numeric"
          pattern="[0-9]*"
        >
          <InputOTPGroup className="justify-center gap-2">
            {CODE_SLOTS.map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="h-12 w-10 rounded-md border border-stone-700 bg-black/60 font-mono text-xl text-white shadow-none data-[active=true]:border-orange-500 data-[active=true]:bg-stone-900 sm:w-11"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <div className="mt-4 text-center font-mono text-xs text-stone-400">
          Didn't receive it?{' '}
          <button type="button" className="font-semibold text-blue-400 hover:underline">
            Request fresh token
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 border-t border-stone-800 pt-4 font-mono text-[10px] text-stone-500">
          <Terminal className="h-3 w-3 text-cyan-400" />
          <span>Cloudflare KMS · Authenticated Edge Token</span>
        </div>
      </div>
    </div>
  )
}
