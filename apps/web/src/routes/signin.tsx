import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon, ArrowLeft } from 'lucide-react'
import { useCallback, useState } from 'react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { PaperClip } from '@/components/graphics/paper-clip'
import { Mark } from '@/components/mark'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

export const Route = createFileRoute('/signin')({
  head: () => ({ meta: [{ title: 'Sign in — Prismark Field Journal' }] }),
  component: SignIn,
})

const CODE_LENGTH = 6
const CODE_SLOTS = Array.from({ length: CODE_LENGTH }, (_, index) => index)

function SignIn() {
  const [email, setEmail] = useState<string | null>(null)
  const clearEmail = useCallback(() => setEmail(null), [])

  return (
    <main className="relative flex min-h-svh items-center justify-center bg-[#FBF9F4] px-5 py-10 text-[#18181B]">
      <BlueprintGrid variant="drafting" />

      <div className="w-full max-w-md pb-12">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to field journal</span>
          </Link>
        </div>

        <div className="paper-shadow-lg relative rounded-2xl border-2 border-[#D8CEBE] bg-white p-8 sm:p-10">
          <div className="absolute -top-3 right-8">
            <PaperClip variant="brass" />
          </div>

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
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const email = new FormData(event.currentTarget).get('email')
      if (typeof email === 'string') onSubmit(email.trim())
    },
    [onSubmit],
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex items-center justify-between">
        <Mark className="size-10" />
        <InkStamp label="ACCESS" variant="cobalt" rotation={-2} className="text-[10px]" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-stone-900">Sign in to Prismark</h1>
      <p className="mt-1 text-sm text-stone-600">
        We will dispatch a six-digit authentication code to your email.
      </p>

      <Field className="mt-6 gap-1.5">
        <FieldLabel
          htmlFor="email"
          className="font-mono text-xs font-bold text-stone-700 uppercase"
        >
          Agency Work Email
        </FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="name@youragency.com"
          className="h-11 rounded-md border border-[#D8CEBE] bg-[#FAF8F5] px-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none"
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        className="mt-5 w-full bg-[#18181B] py-3 font-mono text-xs font-bold tracking-wider text-[#FBF9F4] uppercase hover:bg-stone-800"
      >
        Send Access Code →
      </Button>

      <p className="mt-4 font-mono text-xs text-stone-500">
        Don't have a workspace yet? Workspaces are established via early waitlist invitation.
      </p>
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
        className="mb-4 flex items-center gap-1 font-mono text-xs text-stone-500 hover:text-stone-900"
      >
        <ChevronLeftIcon className="size-3.5" aria-hidden="true" />
        Use different email
      </button>

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">Check your inbox</h1>
        <InkStamp label="DISPATCHED" variant="emerald" rotation={-2} className="text-[10px]" />
      </div>

      <p className="text-sm text-stone-600">
        We sent an authentication code to{' '}
        <span className="font-semibold text-stone-900">{email}</span>. Valid for 10 minutes.
      </p>

      <Field className="mt-6 gap-3">
        <FieldLabel htmlFor="code" className="sr-only">
          Six-digit code
        </FieldLabel>
        <InputOTP
          id="code"
          name="code"
          maxLength={CODE_LENGTH}
          value={code}
          onChange={setCode}
          autoComplete="one-time-code"
          inputMode="numeric"
          pattern="[0-9]*"
          // oxlint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        >
          <InputOTPGroup className="justify-center gap-2">
            {CODE_SLOTS.map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="h-12 w-10 rounded-md border border-stone-300 bg-[#FAF8F5] font-mono text-xl text-stone-900 shadow-none data-[active=true]:border-stone-900 data-[active=true]:bg-white sm:w-11"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription className="mt-3 text-center font-mono text-xs text-stone-500">
          <button type="button" className="font-semibold text-blue-700 hover:underline">
            Request fresh code
          </button>
        </FieldDescription>
      </Field>
    </div>
  )
}
