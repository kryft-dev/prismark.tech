import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/signin')({
  beforeLoad: () => {
    throw redirect({ to: '/login' })
  },
})
