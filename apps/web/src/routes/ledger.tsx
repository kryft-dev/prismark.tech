import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/ledger')({
  beforeLoad: () => {
    throw redirect({ to: '/product' })
  },
})
