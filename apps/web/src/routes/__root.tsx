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
        title: 'Prismark',
      },
      { name: 'theme-color', content: '#0A0A0A' },
      { property: 'og:image', content: 'https://prismark.tech/og.png' },
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
