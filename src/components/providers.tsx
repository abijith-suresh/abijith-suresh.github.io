'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'

/**
 * Provides theme and toaster context to the application.
 * Wraps the application with `ThemeProvider` from `next-themes` and includes a `ToasterProvider`.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
    >
      {children}
      <ToasterProvider />
    </ThemeProvider>
  )
}

/**
 * Client-side component to provide `sonner` toast notifications.
 * It sets the toaster theme based on the resolved theme from `next-themes`.
 */
function ToasterProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      position='top-right'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}
