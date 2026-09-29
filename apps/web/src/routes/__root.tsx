import { TanStackDevtools } from '@tanstack/react-devtools'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { Toaster } from '@/components/ui/toast'
import { TooltipProvider } from '@/components/ui/tooltip'

import appCss from '../styles.css?url'

const devtoolsConfig = { position: 'bottom-right' } as const
const devtoolsPlugins = [{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }]

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Prismark — The agency operating system',
      },
      {
        name: 'description',
        content:
          'The app a small software agency runs itself on. Projects, tasks, chat, clients, money, and a portal where clients see their side of it.',
      },
      { name: 'theme-color', content: '#0A0A0A' },
      { property: 'og:site_name', content: 'Prismark' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Prismark — The agency operating system' },
      {
        property: 'og:description',
        content:
          'Projects, tasks, chat, clients, money, and a portal where clients see their side of it. One place. No spreadsheets.',
      },
      { property: 'og:url', content: 'https://prismark.tech' },
      { property: 'og:image', content: 'https://prismark.tech/og.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Prismark — The agency operating system' },
      {
        name: 'twitter:description',
        content: 'The app a small software agency runs itself on. Built for teams of ten.',
      },
      { name: 'twitter:image', content: 'https://prismark.tech/og.png' },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <TooltipProvider>
          <Toaster>{children}</Toaster>
        </TooltipProvider>
        {import.meta.env.DEV && (
          <TanStackDevtools config={devtoolsConfig} plugins={devtoolsPlugins} />
        )}
        <Scripts />
      </body>
    </html>
  )
}
