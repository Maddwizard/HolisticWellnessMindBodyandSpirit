import React from 'react'
import { Users, Heart, BookOpen } from 'lucide-react'
import { FeatureSection } from '@/components/feature-section'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-earth-900 mb-6">
              Join Our Community
            </h1>
            <p className="text-xl text-earth-700 mb-8 max-w-3xl mx-auto">
              Connect with like-minded believers on the wellness journey. Share experiences, 
              find encouragement, and grow together in faith and health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Join Community
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
              Connect with{' '}
              <span className="text-yellow-300">Believers</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Join our supportive community of believers committed to holistic wellness. 
              Find encouragement, share your journey, and grow together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary bg-white text-primary-600 hover:bg-white/90">
                Join Today
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