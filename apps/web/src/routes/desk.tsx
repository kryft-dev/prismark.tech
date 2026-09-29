import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/desk')({
  beforeLoad: () => {
    throw redirect({ to: '/login' })
  },
})
