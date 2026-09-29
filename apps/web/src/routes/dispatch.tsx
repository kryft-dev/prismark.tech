import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dispatch')({
  beforeLoad: () => {
    throw redirect({ to: '/access' })
  },
})
