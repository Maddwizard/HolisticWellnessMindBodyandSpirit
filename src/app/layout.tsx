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
    default: 'Holistic Wellness Mind Body Spirit | Christian Health & Wellness',
    template: '%s | Holistic Wellness Mind Body Spirit'
  },
  description: 'Transform your life with holistic wellness principles grounded in biblical wisdom. Discover nutrition, exercise, mental health, and spiritual practices for complete mind, body, and spirit harmony.',
  keywords: [
    'holistic wellness',
    'mind body spirit',
    'Christian wellness',
    'holistic health',
    'biblical nutrition',
    'faith-based wellness',
    'spiritual health',
    'Christian self-care',
    'biblical health practices',
    'mind body spirit wellness',
    'holistic wellness mind body spirit',
    'Christian holistic wellness',
    'faith and fitness',
    'wellness transformation',
    'biblical wellness principles',
    'spiritual wellness',
    'mental health wellness',
    'physical wellness',
    'holistic healing',
    'Christian health practices'
  ],
  authors: [{ name: 'Holistic Wellness Mind Body Spirit' }],
  creator: 'Holistic Wellness Mind Body Spirit',
  publisher: 'Holistic Wellness Mind Body Spirit',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://holisticwellnessmindbodyspirit.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://holisticwellnessmindbodyspirit.com',
    title: 'Holistic Wellness Mind Body Spirit | Christian Health & Wellness',
    description: 'Transform your life with holistic wellness principles grounded in biblical wisdom. Discover nutrition, exercise, mental health, and spiritual practices for complete mind, body, and spirit harmony.',
    siteName: 'Holistic Wellness Mind Body Spirit',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Holistic Wellness Mind Body Spirit - Christian Health & Wellness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Holistic Wellness Mind Body Spirit | Christian Health & Wellness',
    description: 'Transform your life with holistic wellness principles grounded in biblical wisdom. Discover nutrition, exercise, mental health, and spiritual practices for complete mind, body, and spirit harmony.',
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
  category: 'health',
  classification: 'wellness',
  other: {
    'geo.region': 'US',
    'geo.placename': 'United States',
    'geo.position': '36.1627;-86.7816',
    'ICBM': '36.1627, -86.7816',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Holistic Wellness Mind Body Spirit",
              "url": "https://holisticwellnessmindbodyspirit.com",
              "logo": "https://holisticwellnessmindbodyspirit.com/logo.png",
              "description": "Transform your life with holistic wellness principles grounded in biblical wisdom. Discover nutrition, exercise, mental health, and spiritual practices for complete mind, body, and spirit harmony.",
              "sameAs": [
                "https://facebook.com/holisticwellnessmindbodyspirit",
                "https://instagram.com/holisticwellnessmindbodyspirit",
                "https://twitter.com/holisticwellnessmbs"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "hello@holisticwellnessmindbodyspirit.com"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nashville",
                "addressRegion": "TN",
                "addressCountry": "US"
              },
              "foundingDate": "2024",
              "areaServed": "Worldwide",
              "serviceType": "Holistic Wellness Coaching",
              "category": "Health & Wellness"
            })
          }}
        />
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