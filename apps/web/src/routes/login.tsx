import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ChevronLeftIcon, KeyRound, ShieldCheck } from 'lucide-react'
import { useState } from 'react'

import { Mark } from '@/components/mark'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

export const Route = createFileRoute('/login')({
  head: () => ({
    meta: [
      { title: 'Sign In to Studio — Prismark' },
      {
        name: 'description',
        content:
          'Authenticate to your agency workspace using passwordless cryptographic one-time token.',
      },
    ],
  }),
  component: LoginPage,
})

const CODE_LENGTH = 6
const CODE_SLOTS = Array.from({ length: CODE_LENGTH }, (_, index) => index)

export function LoginPage() {
  const [email, setEmail] = useState<string | null>(null)

  return (
    <main className="relative flex min-h-svh items-center justify-center bg-slate-50 px-5 py-12 text-slate-900 transition-colors dark:bg-[#080B11] dark:text-white">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[130px]" />
        <div className="absolute top-1/3 right-1/4 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Studio Home</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl backdrop-blur-md sm:p-10 dark:border-white/[0.08] dark:bg-[#0B0F19]">
          {email === null ? (
            <EmailStep onSubmit={setEmail} />
          ) : (
            <CodeStep email={email} onBack={() => setEmail(null)} />
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
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400">
          SECURE AUTH
        </span>
      </div>

      <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
        Sign in to Prismark
      </h1>
      <p className="mt-1.5 font-sans text-xs leading-relaxed text-slate-600 dark:text-slate-400">
        Passwordless cryptographic authentication. We will dispatch a 6-digit one-time token to your
        work inbox.
      </p>

      <div className="mt-6 space-y-2">
        <label
          htmlFor="login-email"
          className="block font-mono text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300"
        >
          Agency Work Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="developer@yourstudio.com"
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none dark:border-slate-800 dark:bg-black/60 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-orange-600 py-3 font-mono text-xs font-bold tracking-wider text-white uppercase shadow-lg transition-transform hover:scale-[1.01] hover:bg-orange-500"
      >
        Dispatch Access Token →
      </button>

      <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-[11px] text-slate-500 dark:border-slate-800 dark:bg-[#070A12] dark:text-slate-400">
        <KeyRound className="h-4 w-4 shrink-0 text-orange-500" />
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
        className="mb-4 flex items-center gap-1 font-mono text-xs text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
      >
        <ChevronLeftIcon className="size-3.5" aria-hidden="true" />
        <span>Use different email</span>
      </button>

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Check your inbox
        </h1>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
          DISPATCHED
        </span>
      </div>

      <p className="font-sans text-xs leading-relaxed text-slate-600 dark:text-slate-400">
        We sent an authentication token to{' '}
        <span className="font-bold text-orange-500">{email}</span>. Valid for 10 minutes.
      </p>

      <div className="mt-6 space-y-4">
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
                className="h-12 w-10 rounded-xl border border-slate-300 bg-slate-50 font-mono text-xl text-slate-900 shadow-none data-[active=true]:border-orange-500 data-[active=true]:bg-white sm:w-11 dark:border-slate-700 dark:bg-black/60 dark:text-white dark:data-[active=true]:bg-slate-900"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <div className="text-center font-mono text-xs text-slate-500">
          Didn&apos;t receive it?{' '}
          <button type="button" className="font-semibold text-blue-500 hover:underline">
            Request fresh token
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-slate-200 pt-4 font-mono text-[11px] text-slate-500 dark:border-slate-800">
          <ShieldCheck className="h-3.5 w-3.5 text-cyan-500" />
          <span>Cloudflare KMS · Authenticated Edge Session</span>
        </div>
      </div>
    </div>
  )
}
