import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/airgap')({
  beforeLoad: () => {
    throw redirect({ to: '/product' })
  },
})
