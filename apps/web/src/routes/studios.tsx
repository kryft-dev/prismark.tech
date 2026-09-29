import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/studios')({
  beforeLoad: () => {
    throw redirect({ to: '/showcase' })
  },
})
