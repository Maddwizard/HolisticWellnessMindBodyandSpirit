import React from 'react'
import { Heart } from 'lucide-react'
import { FeatureSection } from '@/components/feature-section'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-earth-900 mb-6">
              About Our Mission
            </h1>
            <p className="text-xl text-earth-700 mb-8 max-w-3xl mx-auto">
              We&apos;re dedicated to helping believers achieve holistic wellness by integrating 
              faith, physical health, mental well-being, and spiritual growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Learn More
              </button>
              <button className="btn-outline">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureSection />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance">
              Join Our{' '}
              <span className="text-yellow-300">Mission</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Help us spread the message of faith-based wellness and support believers 
              on their journey to complete health and wholeness.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary bg-white text-primary-600 hover:bg-white/90">
                Get Involved
              </button>
              <button className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 