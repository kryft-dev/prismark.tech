import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Sign in to Prismark' }] }),
  component: SignIn,
})

const CODE_LENGTH = 6
const CODE_SLOTS = Array.from({ length: CODE_LENGTH }, (_, index) => index)

function SignIn() {
  // Email is set once a code has been requested. Until then, show the email step.
  const [email, setEmail] = useState<string | null>(null)
  const clearEmail = useCallback(() => setEmail(null), [])

  return (
    <main className="flex min-h-svh items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm pb-20">
        {email === null ? (
          <EmailStep onSubmit={setEmail} />
        ) : (
          <CodeStep email={email} onBack={clearEmail} />
        )}
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
      <div
        aria-hidden="true"
        className="mb-7 flex size-10 items-center justify-center rounded-[10px] bg-primary text-lg font-semibold text-primary-foreground"
      >
        P
      </div>
      <h1 className="text-[26px] leading-8 font-semibold tracking-tight">Sign in to Prismark</h1>
      <p className="mt-1 text-muted-foreground">
        We'll email you a six-digit code. No passwords here.
      </p>

      <Field className="mt-6 gap-1.5">
        <FieldLabel htmlFor="email" className="font-normal text-muted-foreground">
          Email
        </FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          className="h-10 bg-ground px-3 text-[15px]"
        />
      </Field>

      <Button type="submit" size="lg" className="mt-5 w-full text-[15px]">
        Send me a code
      </Button>

      <p className="mt-3 text-sm text-muted-foreground">
        Don't have an account? Someone at your company creates it for you.
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
        className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeftIcon className="size-3.5" aria-hidden="true" />
        Different email
      </button>
      <h1 className="text-[26px] leading-8 font-semibold tracking-tight">Check your email</h1>
      <p className="mt-1 text-muted-foreground">
        We sent a code to {email}. It works for 10 minutes.
      </p>

      <Field className="mt-5 gap-3">
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
          // The person just asked for this code. The cursor belongs here.
          // oxlint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        >
          <InputOTPGroup className="gap-2">
            {CODE_SLOTS.map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="h-13 w-11 rounded-lg border border-input font-mono text-[22px] shadow-none first:rounded-l-lg last:rounded-r-lg data-[active=true]:border-foreground data-[active=true]:ring-0"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription className="text-muted-foreground">
          <button type="button" className="font-medium text-info hover:underline">
            Send a new code
          </button>
        </FieldDescription>
      </Field>
    </div>
  )
}
