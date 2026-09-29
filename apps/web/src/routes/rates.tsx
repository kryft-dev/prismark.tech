import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/rates')({
  beforeLoad: () => {
    throw redirect({ to: '/pricing' })
  },
})
