import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/chronicle')({
  beforeLoad: () => {
    throw redirect({ to: '/changelog' })
  },
})
