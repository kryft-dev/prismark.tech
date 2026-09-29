import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/blueprint')({
  beforeLoad: () => {
    throw redirect({ to: '/product' })
  },
})
