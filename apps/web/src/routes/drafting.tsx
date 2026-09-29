import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/drafting')({
  beforeLoad: () => {
    throw redirect({ to: '/product' })
  },
})
