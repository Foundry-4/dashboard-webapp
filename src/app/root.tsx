import { Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { Providers } from './providers'

import type { ReactNode } from 'react'

import '@/styles/index.css'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon.png"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>NaMesaJá</title>

        <Meta />
      </head>
      <body>
        <Providers>{children}</Providers>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <Outlet />
}
