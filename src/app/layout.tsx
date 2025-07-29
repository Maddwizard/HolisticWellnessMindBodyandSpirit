import React from 'react'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Holistic Christian Wellness | Mind, Body & Spirit in Harmony',
    template: '%s | Holistic Christian Wellness'
  },
  description: 'Discover biblical principles for holistic wellness. Integrate faith, nutrition, exercise, and mental health for complete mind, body, and spirit transformation.',
  keywords: [
    'Christian wellness',
    'holistic health',
    'biblical nutrition',
    'faith-based wellness',
    'spiritual health',
    'Christian self-care',
    'biblical health practices',
    'mind body spirit',
    'Christian holistic wellness',
    'faith and fitness'
  ],
  authors: [{ name: 'Holistic Christian Wellness' }],
  creator: 'Holistic Christian Wellness',
  publisher: 'Holistic Christian Wellness',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://holistic-christian-wellness.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://holistic-christian-wellness.vercel.app',
    title: 'Holistic Christian Wellness | Mind, Body & Spirit in Harmony',
    description: 'Discover biblical principles for holistic wellness. Integrate faith, nutrition, exercise, and mental health for complete mind, body, and spirit transformation.',
    siteName: 'Holistic Christian Wellness',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Holistic Christian Wellness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Holistic Christian Wellness | Mind, Body & Spirit in Harmony',
    description: 'Discover biblical principles for holistic wellness. Integrate faith, nutrition, exercise, and mental health for complete mind, body, and spirit transformation.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f2751f" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
} 