import React from 'react'
import { Brain, Heart, Users, BookOpen } from 'lucide-react'
import { FeatureSection } from '@/components/feature-section'

export default function MentalHealthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-earth-900 mb-6">
              Mental Health & Faith
            </h1>
            <p className="text-xl text-earth-700 mb-8 max-w-3xl mx-auto">
              Discover how faith and mental wellness work together to create a balanced, 
              peaceful mind and a stronger spiritual foundation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Your Journey
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
              Nurture Your{' '}
              <span className="text-yellow-300">Mind & Spirit</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Find peace, clarity, and emotional wellness through faith-based mental health practices. 
              Begin your journey to inner peace today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary bg-white text-primary-600 hover:bg-white/90">
                Get Started Today
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