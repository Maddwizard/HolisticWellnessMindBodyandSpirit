'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { SupabaseProvider } from './supabase-provider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SupabaseProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </SupabaseProvider>
  )
} 