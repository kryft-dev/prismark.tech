import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Annotation } from '@/components/shared/annotation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: 'Contact — Prismark' },
      { name: 'description', content: 'Get in touch with the Prismark team.' },
    ],
  }),
})

function validateContact(data: { name: string; email: string; message: string }) {
  const errors: Record<string, string> = {}
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email.trim() || !emailRegex.test(data.email.trim())) {
    errors.email = 'Valid email is required'
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }
  return errors
}

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsSuccess(false)

    const validationErrors = validateContact(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    // Fake submit
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({ name: '', email: '', message: '' })

      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <MarketingLayout>
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-[24px] font-[600] tracking-tight">Get in touch</h1>
            <p className="mb-12 text-[15px] text-muted-foreground">
              Have a question about Prismark, or want to see a demo? Send us a note.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-[14px] font-[500]">
                  Name
                </label>
                <Input
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="mt-1 text-[13px] text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-2 block text-[14px] font-[500]">
                  Email
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="mt-1 text-[13px] text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-[14px] font-[500]">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={errors.message ? 'border-red-500' : ''}
                />
                {errors.message && (
                  <p className="mt-1 text-[13px] text-red-500">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#EDEDED] text-[#0A0A0A] transition-colors hover:bg-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A]" />
                ) : (
                  'Send message'
                )}
              </Button>

              {isSuccess && (
                <div className="rounded-[6px] border border-green-500/20 bg-green-500/10 p-4 text-[14px] text-green-500">
                  Message sent! We'll get back to you within a day.
                </div>
              )}
            </form>
          </div>

          <div className="relative pt-12 md:pt-0">
            <div className="space-y-8 text-[15px]">
              <div>
                <h3 className="mb-1 font-[600]">Email us</h3>
                <a
                  href="mailto:hello@prismark.tech"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  hello@prismark.tech
                </a>
              </div>
              <div>
                <h3 className="mb-1 font-[600]">Response time</h3>
                <p className="text-muted-foreground">Usually within a day</p>
              </div>
            </div>

            <div className="absolute top-32 right-10 hidden rotate-6 md:block">
              <Annotation>we read every message</Annotation>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
