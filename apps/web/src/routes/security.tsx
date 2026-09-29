import { createFileRoute, Link } from '@tanstack/react-router'
import {
  CheckCircle2,
  Database,
  EyeOff,
  KeyRound,
  Lock,
  Server,
  Shield,
  ShieldAlert,
} from 'lucide-react'

import { BlueprintGrid } from '@/components/graphics/blueprint-grid'
import { InkStamp } from '@/components/graphics/ink-stamp'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export const Route = createFileRoute('/security')({
  head: () => ({
    meta: [
      { title: 'Data Sovereignty & Zero AI Scraping — Prismark' },
      {
        name: 'description',
        content:
          'Absolute data sovereignty for boutique studios. Zero AI training scraping, cryptographic tenant isolation, and Cloudflare edge encryption.',
      },
    ],
  }),
  component: SecurityPage,
})

const securityGuarantees = [
  {
    icon: EyeOff,
    title: 'Zero AI Training Scraping',
    subtitle: 'COVENANT-01',
    description:
      'We explicitly forbid our infrastructure from feeding your confidential client SOWs, task discussions, codebase snippets, or billing amounts into foundation models. What happens in your studio stays in your studio.',
  },
  {
    icon: Database,
    title: 'D1 Cryptographic Tenant Isolation',
    subtitle: 'COVENANT-02',
    description:
      'Every query executes under a verified workspace membership token. Tenant boundaries are enforced in the SQL engine layer, making cross-tenant data leakage mathematically impossible.',
  },
  {
    icon: KeyRound,
    title: 'Passwordless WebCrypto OTP Auth',
    subtitle: 'COVENANT-03',
    description:
      'We never store plaintext passwords or bcrypt hashes that could be leaked in a database breach. Access is granted via cryptographically random 6-digit one-time tokens with instant global session revocation.',
  },
  {
    icon: Server,
    title: 'Global Edge Data Sovereignty',
    subtitle: 'COVENANT-04',
    description:
      'Data is distributed across Cloudflare global edge datacenters with strict encryption at rest and in transit (TLS 1.3 + AES-256-GCM). Certified compliance with GDPR, SOC 2, and CCPA standards.',
  },
]

export function SecurityPage() {
  return (
    <MarketingLayout>
      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-24 md:px-14">
        <BlueprintGrid variant="blueprint" />

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-cyan-400">
            <Shield className="h-3.5 w-3.5" />
            <span>SECURITY COVENANT // ZERO DATA SCRAPING</span>
          </div>

          <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-foreground sm:text-6xl">
            Your agency data belongs to you.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-orange-400 bg-clip-text text-transparent">
              Not an LLM training pipeline.
            </span>
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-stone-400 sm:text-lg">
            In an era where enterprise SaaS quietly changes terms of service to vacuum up customer
            data for model training, Prismark stands on cryptographic guarantees and contractual
            covenants.
          </p>
        </div>

        {/* Security Covenants Grid */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2">
          {securityGuarantees.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-8 shadow-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/40 p-2 text-cyan-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-orange-400">
                      {item.subtitle}
                    </span>
                  </div>
                  <InkStamp
                    label="VERIFIED"
                    variant="cobalt"
                    rotation={-1}
                    className="text-[10px]"
                  />
                </div>

                <h2 className="mb-2 text-xl font-bold text-white">{item.title}</h2>
                <p className="font-sans text-sm leading-relaxed text-stone-300">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Verification Checklist Sheet */}
        <div className="mb-16 rounded-2xl border border-stone-800 bg-[#0B0F19]/90 p-8 shadow-2xl sm:p-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                <Lock className="h-4 w-4 text-emerald-400" />
                <span>Cryptographic & Architectural Checklist</span>
              </h2>
              <p className="mt-1 text-xs text-stone-400">
                Audited against modern threat models for software consultancies and design agencies.
              </p>
            </div>
            <InkStamp
              label="ZERO-LEAK AUDIT"
              variant="success"
              rotation={-2}
              className="text-[10px]"
            />
          </div>

          <div className="grid gap-4 font-mono text-xs text-stone-300 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-stone-800 bg-[#070A12] p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <div>
                <span className="block font-bold text-white">Strict SQL Parameterization</span>
                <span className="text-[11px] text-stone-400">
                  All D1 SQLite queries use bound parameters. Zero raw string interpolation.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-stone-800 bg-[#070A12] p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <div>
                <span className="block font-bold text-white">Session Instant Revocation</span>
                <span className="text-[11px] text-stone-400">
                  Revoke contractor access across all edge datacenters in under 500ms.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-stone-800 bg-[#070A12] p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <div>
                <span className="block font-bold text-white">Role Air-Gap Guardrails</span>
                <span className="text-[11px] text-stone-400">
                  Clients cannot view internal billing rates or private staff channels under any
                  condition.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-stone-800 bg-[#070A12] p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <div>
                <span className="block font-bold text-white">Automated Daily Backups</span>
                <span className="text-[11px] text-stone-400">
                  Immutable point-in-time recovery archives replicated to geographically isolated
                  regions.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Incident Disclosure Statement */}
        <div className="flex items-start gap-5 rounded-2xl border border-stone-800 bg-[#070A12] p-8">
          <ShieldAlert className="mt-1 h-6 w-6 shrink-0 text-amber-400" />
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white">
              Vulnerability Disclosure & Security Research
            </h3>
            <p className="font-sans text-xs leading-relaxed text-stone-400">
              We welcome reports from ethical security researchers. If you discover a vulnerability
              or potential data leak vector in the Prismark edge runtime, please submit your
              findings directly to our security engineering team at{' '}
              <code className="text-cyan-400">security@prismark.tech</code>. We commit to a 24-hour
              response SLA.
            </p>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-stone-800 bg-gradient-to-r from-[#0C1220] via-[#090D17] to-[#120D0A] p-8 sm:flex-row">
          <div>
            <h3 className="text-xl font-bold text-white">
              Give your clients verifiable security assurances.
            </h3>
            <p className="mt-1 text-xs text-stone-400">
              Prismark architecture passes vendor risk assessments with ease.
            </p>
          </div>

          <Link
            to="/dispatch"
            className="shrink-0 rounded-md bg-cyan-600 px-5 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-cyan-500"
          >
            Request Security Whitepaper →
          </Link>
        </div>
      </div>
    </MarketingLayout>
  )
}
