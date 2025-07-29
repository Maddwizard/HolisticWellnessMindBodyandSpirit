import React from 'react'
import { BookOpen, Heart, Users } from 'lucide-react'
import { FeatureSection } from '@/components/feature-section'

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-earth-900 mb-6">
              Wellness Resources
            </h1>
            <p className="text-xl text-earth-700 mb-8 max-w-3xl mx-auto">
              Access our comprehensive collection of faith-based wellness resources, 
              guides, and tools to support your holistic health journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Browse Resources
              </button>
              <button className="btn-outline">
                Learn More
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
              Access{' '}
              <span className="text-yellow-300">Wellness Tools</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Discover practical resources, guides, and tools to support your wellness journey. 
              Everything you need for mind, body, and spirit health.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary bg-white text-primary-600 hover:bg-white/90">
                Explore Resources
              </button>
              <button className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 