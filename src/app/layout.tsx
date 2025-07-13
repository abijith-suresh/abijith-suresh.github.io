import { Analytics } from '@vercel/analytics/react'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'

import '@/styles/globals.css'
import Providers from '@/components/providers'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Abijith | Software Engineer & Tech Enthusiast',
  description:
    'Portfolio of Abijith, a software engineer based in Kochi, India. Passionate about web development, modern tech, and continuous learning.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico'
  }
}

/**
 * The root layout component for the entire application.
 * It sets up the HTML structure, applies global styles, and provides common components like Header, Footer, and Providers.
 * Handles font loading and metadata for the application.
 */
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          inter.variable
        )}
      >
        <Providers>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
