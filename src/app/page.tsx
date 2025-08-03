import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'
import { Metadata } from 'next'
import { HeroSection } from '@/components/hero-section'
import { FeatureSection } from '@/components/feature-section'
import { TestimonialSection } from '@/components/testimonial-section'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { SEOStructuredData } from '@/components/seo-structured-data'

export const metadata: Metadata = {
  title: 'Holistic Wellness Mind Body Spirit | Transform Your Life with Biblical Wellness',
  description: 'Transform your life with holistic wellness principles grounded in biblical wisdom. Discover nutrition, exercise, mental health, and spiritual practices for complete mind, body, and spirit harmony.',
  keywords: [
    'holistic wellness',
    'mind body spirit',
    'Christian wellness',
    'biblical wellness',
    'holistic health',
    'wellness transformation',
    'spiritual wellness',
    'mental health wellness',
    'physical wellness',
    'Christian health practices'
  ],
  openGraph: {
    title: 'Holistic Wellness Mind Body Spirit | Transform Your Life with Biblical Wellness',
    description: 'Transform your life with holistic wellness principles grounded in biblical wisdom. Discover nutrition, exercise, mental health, and spiritual practices for complete mind, body, and spirit harmony.',
    url: 'https://holisticwellnessmindbodyspirit.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Holistic Wellness Mind Body Spirit - Transform Your Life',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Holistic Wellness Mind Body Spirit | Transform Your Life with Biblical Wellness',
    description: 'Transform your life with holistic wellness principles grounded in biblical wisdom. Discover nutrition, exercise, mental health, and spiritual practices for complete mind, body, and spirit harmony.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://holisticwellnessmindbodyspirit.com',
  },
}


export default function HomePage() {
  return (
    <>
      <SEOStructuredData 
        type="website" 
        data={{
          name: "Holistic Wellness Mind Body Spirit",
          url: "https://holisticwellnessmindbodyspirit.com",
          description: "Transform your life with holistic wellness principles grounded in biblical wisdom."
        }} 
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* Biblical Wellness Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
                Biblical Foundation for{' '}
                <span className="text-gradient">Holistic Wellness</span>
              </h2>
              <p className="text-lg text-earth-700 mb-8 leading-relaxed">
                &ldquo;Do you not know that your bodies are temples of the Holy Spirit, who is in you, 
                whom you have received from God? You are not your own; you were bought at a price. 
                Therefore honor God with your bodies.&rdquo; - 1 Corinthians 6:19-20
              </p>
              <p className="text-earth-600 mb-8 leading-relaxed">
                Our approach integrates timeless biblical wisdom with modern wellness practices. 
                We believe that true health encompasses mind, body, and spirit - all created by God 
                and designed to work in harmony.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/biblical-wellness" className="btn-primary">
                  Explore Biblical Wellness
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/about" className="btn-outline">
                  Learn Our Story
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Peaceful meditation and wellness"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-earth-900">100+ Bible Verses</p>
                    <p className="text-sm text-earth-600">On health & wellness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-secondary-600 mb-2">
                500+
              </div>
              <p className="text-earth-600">Wellness Resources</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-accent-600 mb-2">
                50+
              </div>
              <p className="text-earth-600">Expert Contributors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-600 mb-2">
                95%
              </div>
              <p className="text-earth-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Newsletter Signup Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-earth-900">
                Stay Connected with Weekly Wellness Wisdom
              </h2>
              <p className="text-lg text-earth-700 max-w-2xl mx-auto">
                Get biblical insights, wellness tips, and community updates delivered to your inbox every week.
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-earth-900">
              Start Your Holistic Wellness Journey Today
            </h2>
            <p className="text-lg text-earth-700 mb-8 leading-relaxed">
              Join our community of believers committed to honoring God with their bodies, minds, and spirits. 
              Discover the biblical foundation for true wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/membership" className="btn-primary">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/newsletter" className="btn-outline">
                Join Our Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  )
} 